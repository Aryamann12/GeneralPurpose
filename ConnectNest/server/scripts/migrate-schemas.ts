import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { LearningResourcesService } from '../src/learning-resources/learning-resources.service';
import { CppProblemsService } from '../src/cpp-problems/cpp-problems.service';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Migration script to refactor schemas:
 * 1. 10xiitian_Resources: Add notes, change total_hours to Number, fix status enum
 * 2. Books: Rename module to book_title, extract authors, rename topics to chapters, add notes, fix status enum
 * 3. CppProblems: Create new CppProblemListSchema from JSON structure
 */

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const learningResourcesService = app.get(LearningResourcesService);
  const cppProblemsService = app.get(CppProblemsService);

  console.log('Starting schema migration...\n');

  try {
    // 1. Migrate 10xiitian_Resources (GFG Course Progress)
    console.log('1. Migrating 10xiitian_Resources...');
    const gfgCourses = await learningResourcesService.findAllGFGCourses();
    let gfgUpdated = 0;

    for (const course of gfgCourses) {
      const updatedModules = course.modules.map((module: any) => {
        // Convert total_hours from "8+" to 8
        let totalHours = module.total_hours;
        if (typeof totalHours === 'string') {
          // Remove "+" and any non-numeric characters, then parse
          const numericValue = parseInt(totalHours.replace(/[^0-9]/g, ''), 10);
          totalHours = isNaN(numericValue) ? 0 : numericValue;
        }

        // Map status: "O" or "⭕" to 'In Progress', others to 'Not Started'
        let status = module.status;
        if (status === 'O' || status === '⭕' || status === 'In Progress') {
          status = 'In Progress';
        } else if (status === 'Completed' || status === '✓' || status === '✅') {
          status = 'Completed';
        } else {
          status = 'Not Started';
        }

        return {
          ...module,
          total_hours: totalHours,
          status: status,
          notes: module.notes || '',
        };
      });

      try {
        // Access the model through the service's private property
        const model = (learningResourcesService as any).gfgCourseProgressModel;
        await model.updateOne(
          { _id: course._id },
          { $set: { modules: updatedModules } },
        );
        gfgUpdated++;
      } catch (error: any) {
        console.log(`  ⚠ Error updating course ${course.track_name}: ${error.message}`);
      }
    }
    console.log(`  ✓ Updated ${gfgUpdated} GFG courses\n`);

    // 2. Migrate Books
    console.log('2. Migrating Books...');
    const books = await learningResourcesService.findAllBooks();
    let booksUpdated = 0;

    for (const book of books) {
      // Extract book title and authors from module field (old field name)
      const bookAny = book as any;
      const moduleText = bookAny.module || '';
      let bookTitle = moduleText;
      let authors: string[] = [];

      // Try to extract authors (format: "Title by Author1, Author2, ...")
      const byMatch = moduleText.match(/^(.+?)\s+by\s+(.+)$/i);
      if (byMatch) {
        bookTitle = byMatch[1].trim();
        const authorsText = byMatch[2].trim();
        // Split by comma and clean up
        authors = authorsText
          .split(',')
          .map((a) => a.trim())
          .filter((a) => a.length > 0);
      }

      // Update chapters (formerly topics) with notes and status mapping
      const chapters = (bookAny.topics || []).map((topic: any) => {
        // Map status: "O" or "⭕" to 'Reading', others appropriately
        let status = topic.status;
        if (status === 'O' || status === '⭕' || status === 'Reading') {
          status = 'Reading';
        } else if (status === 'Read' || status === '✓' || status === '✅') {
          status = 'Read';
        } else {
          status = 'To Read';
        }

        return {
          title: topic.title,
          status: status,
          notes: topic.notes || '',
        };
      });

      try {
        // Access the model through the service's private property
        const model = (learningResourcesService as any).bookModel;
        await model.updateOne(
          { _id: book._id },
          {
            $set: {
              book_title: bookTitle,
              authors: authors,
              chapters: chapters,
            },
            $unset: {
              module: '',
              topics: '',
            },
          },
        );
        booksUpdated++;
      } catch (error: any) {
        console.log(`  ⚠ Error updating book ${book._id}: ${error.message}`);
      }
    }
    console.log(`  ✓ Updated ${booksUpdated} books\n`);

    // 3. Migrate CppProblems from JSON to new schema
    console.log('3. Migrating CppProblems...');
    const basePath = path.join(__dirname, '../../../Aryamann_LifeTracker');
    const tleDataPath = path.join(
      basePath,
      'Resources/CP_TLE_LvL3_Course_Syllabus.json',
    );

    if (fs.existsSync(tleDataPath)) {
      const tleData = JSON.parse(fs.readFileSync(tleDataPath, 'utf-8'));
      let listsCreated = 0;

      // Process each dynamic key (e.g., "TLE_LvL3")
      for (const [listName, modules] of Object.entries(tleData)) {
        if (!Array.isArray(modules)) continue;

        const transformedModules = modules.map((module: any) => {
          const transformedTopics = (module.topics || []).map((topic: any) => {
            // Map status: "O" or "⭕" to 'Not Started' (default)
            let status = topic.status;
            if (status === 'O' || status === '⭕') {
              status = 'Not Started';
            } else if (status === 'Solving' || status === 'Solved' || status === 'Attempted') {
              // Keep valid enum values
            } else {
              status = 'Not Started';
            }

            return {
              title: topic.title,
              status: status,
              notes: topic.notes || '',
              question_image_url: topic.question_image_url,
              problem_link: topic.problem_link,
              difficulty: topic.difficulty,
            };
          });

          return {
            sr_no: module.sr_no,
            module_name: module.module,
            category: module.category,
            topics: transformedTopics,
          };
        });

        try {
          await cppProblemsService.createList({
            list_name: listName,
            description: `Migrated from ${listName}`,
            modules: transformedModules,
          });
          listsCreated++;
        } catch (error: any) {
          if (error.code === 11000) {
            // Duplicate key - update instead
            await cppProblemsService.updateList(listName, {
            modules: transformedModules,
          });
            listsCreated++;
          } else {
            console.log(`  ⚠ Error creating list ${listName}: ${error.message}`);
          }
        }
      }
      console.log(`  ✓ Created/Updated ${listsCreated} problem lists\n`);
    } else {
      console.log('  ⚠ TLE data file not found, skipping CppProblems migration\n');
    }

    console.log('\n✅ Schema migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();


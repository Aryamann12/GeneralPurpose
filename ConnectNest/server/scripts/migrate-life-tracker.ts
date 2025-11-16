import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import * as fs from 'fs';
import * as path from 'path';
import { GymProgressService } from '../src/gym-progress/gym-progress.service';
import { KitchenService } from '../src/kitchen/kitchen.service';
import { FridgeService } from '../src/fridge/fridge.service';
import { DevicesService } from '../src/devices/devices.service';
import { LearningResourcesService } from '../src/learning-resources/learning-resources.service';
import { CppProblemsService } from '../src/cpp-problems/cpp-problems.service';
import { EntertainmentService } from '../src/entertainment/entertainment.service';
import { CareerService } from '../src/career/career.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const gymProgressService = app.get(GymProgressService);
  const kitchenService = app.get(KitchenService);
  const fridgeService = app.get(FridgeService);
  const devicesService = app.get(DevicesService);
  const learningResourcesService = app.get(LearningResourcesService);
  const cppProblemsService = app.get(CppProblemsService);
  const entertainmentService = app.get(EntertainmentService);
  const careerService = app.get(CareerService);

  const basePath = path.join(__dirname, '../../../Aryamann_LifeTracker');

  console.log('Starting data migration...\n');

  try {
    // 1. Gym Progress
    console.log('Migrating Gym Progress...');
    const gymData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'Life_GymProgress.json'), 'utf-8'),
    );
    for (const session of gymData.gymProgress) {
      try {
        await gymProgressService.create(session);
      } catch (error) {
        console.log(`  Skipping duplicate session: ${session.date}`);
      }
    }
    console.log(`  ✓ Migrated ${gymData.gymProgress.length} gym sessions\n`);

    // 2. Kitchen
    console.log('Migrating Kitchen...');
    const kitchenData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'Life_Kitchen.json'), 'utf-8'),
    );
    for (const equipment of kitchenData.kitchenEquipment) {
      try {
        await kitchenService.createEquipment(equipment);
      } catch (error) {
        console.log(`  Skipping duplicate equipment: ${equipment.item_name}`);
      }
    }
    for (const utensil of kitchenData.utensils) {
      try {
        await kitchenService.createUtensil(utensil);
      } catch (error) {
        console.log(`  Skipping duplicate utensil: ${utensil.item_name}`);
      }
    }
    console.log(
      `  ✓ Migrated ${kitchenData.kitchenEquipment.length} equipment and ${kitchenData.utensils.length} utensils\n`,
    );

    // 3. Fridge
    console.log('Migrating Fridge...');
    const fridgeData = JSON.parse(
      fs.readFileSync(path.join(basePath, 'Life_Fridge.json'), 'utf-8'),
    );
    for (const item of fridgeData.fridgeItems) {
      try {
        await fridgeService.create(item);
      } catch (error) {
        console.log(`  Skipping duplicate item: ${item.item_name}`);
      }
    }
    console.log(`  ✓ Migrated ${fridgeData.fridgeItems.length} fridge items\n`);

    // 4. Devices
    console.log('Migrating Devices...');
    const devicesData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Life_Devices_Aryamann.json'),
        'utf-8',
      ),
    );
    for (const device of devicesData) {
      try {
        await devicesService.create(device);
      } catch (error) {
        console.log(`  Skipping duplicate device: ${device.device_name}`);
      }
    }
    console.log(`  ✓ Migrated ${devicesData.length} devices\n`);

    // 5. Learning Resources - GFG Courses
    console.log('Migrating Learning Resources...');
    const gfgData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Resources/ALL_10xiitian-CourseList.json'),
        'utf-8',
      ),
    );
    for (const [trackName, modules] of Object.entries(gfgData.GFG_Progress)) {
      if (trackName === 'Locked_Tracks') {
        // Skip locked tracks - not storing in MongoDB
        console.log('  Skipping locked tracks (not stored in database)\n');
      } else {
        try {
          await learningResourcesService.createGFGCourse({
            track_name: trackName,
            modules: modules as any[],
          });
        } catch (error) {
          console.log(`  Skipping duplicate track: ${trackName}`);
        }
      }
    }
    console.log('  ✓ Migrated GFG courses\n');

    // 6. Books
    console.log('Migrating Books...');
    const booksData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Resources/Books.json'),
        'utf-8',
      ),
    );
    let booksCount = 0;
    const books = Array.isArray(booksData) ? booksData : [booksData];
    for (const book of books) {
      try {
        await learningResourcesService.createBook(book);
        booksCount++;
      } catch (error) {
        console.log(`  Skipping duplicate book: ${book.module}`);
      }
    }
    console.log(`  ✓ Migrated ${booksCount} books\n`);

    // 6b. CodingNinjas Courses
    console.log('Migrating CodingNinjas Courses...');
    const codingNinjasPath = path.join(basePath, 'Resources/CPS_CodingNinjas');
    const codingNinjasFiles = [
      'BasicCpp.json',
      'CompetitiveProgramming.json',
      'SystemDesign.json',
    ];
    let codingNinjasCount = 0;
    for (const file of codingNinjasFiles) {
      try {
        const fileData = JSON.parse(
          fs.readFileSync(path.join(codingNinjasPath, file), 'utf-8'),
        );
        const courseType = file.replace('.json', '');
        
        // Handle different JSON structures
        let items: any[] = [];
        if (Array.isArray(fileData)) {
          items = fileData;
        } else if (typeof fileData === 'object') {
          // If it's an object, extract all arrays from it
          for (const key in fileData) {
            if (Array.isArray(fileData[key])) {
              items = items.concat(fileData[key]);
            }
          }
        }
        
        for (const item of items) {
          try {
            const courseData = {
              ...item,
              course_type: courseType,
            };
            await learningResourcesService.createCodingNinjasCourse(courseData);
            codingNinjasCount++;
          } catch (error) {
            // Skip duplicates silently
          }
        }
      } catch (error: any) {
        console.log(`  ⚠ Skipping ${file} due to error: ${error.message}`);
      }
    }
    console.log(`  ✓ Migrated ${codingNinjasCount} CodingNinjas courses\n`);

    // 6c. TLE Level 3 Courses
    console.log('Migrating TLE Level 3 Courses...');
    const tleData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Resources/CP_TLE_LvL3_Course_Syllabus.json'),
        'utf-8',
      ),
    );
    let tleCount = 0;
    if (tleData.TLE_LvL3 && Array.isArray(tleData.TLE_LvL3)) {
      for (const course of tleData.TLE_LvL3) {
        try {
          await learningResourcesService.createTLELevel3Course(course);
          tleCount++;
        } catch (error) {
          // Skip duplicates
        }
      }
    }
    console.log(`  ✓ Migrated ${tleCount} TLE Level 3 courses\n`);

    // 6d. Udemy Access
    console.log('Migrating Udemy Access...');
    const udemyData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Resources/ALL_Udemy.json'),
        'utf-8',
      ),
    );
    try {
      await learningResourcesService.createUdemyAccess(udemyData);
      console.log('  ✓ Migrated Udemy access\n');
    } catch (error) {
      console.log('  Skipping duplicate Udemy access\n');
    }

    // 7. Entertainment - Social Platforms & Dating Apps
    console.log('Migrating Social Platforms & Dating Apps...');
    const socialData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Entertainment/Life_SocialPlatforms.json'),
        'utf-8',
      ),
    );
    let socialCount = 0;
    if (socialData.SocialMedia && Array.isArray(socialData.SocialMedia)) {
      for (const platform of socialData.SocialMedia) {
        try {
          await entertainmentService.createSocialPlatformItem({
            ...platform,
            type: 'social',
          });
          socialCount++;
        } catch (error) {
          // Skip duplicates
        }
      }
    }
    if (socialData.DatingApps && Array.isArray(socialData.DatingApps)) {
      for (const app of socialData.DatingApps) {
        try {
          await entertainmentService.createSocialPlatformItem({
            ...app,
            type: 'dating',
          });
          socialCount++;
        } catch (error) {
          // Skip duplicates
        }
      }
    }
    console.log(`  ✓ Migrated ${socialCount} social platforms/dating apps\n`);

    // 7b. Streaming Apps
    console.log('Migrating Streaming Apps...');
    const streamingData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Entertainment/Life_SteamingApps_Music_Video.json'),
        'utf-8',
      ),
    );
    let streamingCount = 0;
    if (streamingData.access && Array.isArray(streamingData.access)) {
      for (const app of streamingData.access) {
        try {
          await entertainmentService.createStreamingApp(app);
          streamingCount++;
        } catch (error) {
          // Skip duplicates
        }
      }
    }
    console.log(`  ✓ Migrated ${streamingCount} streaming apps\n`);

    // 7c. Mobility
    console.log('Migrating Mobility...');
    const mobilityData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Entertainment/Life_Mobility.json'),
        'utf-8',
      ),
    );
    let mobilityCount = 0;
    if (Array.isArray(mobilityData)) {
      for (const mobility of mobilityData) {
        try {
          await entertainmentService.createMobility(mobility);
          mobilityCount++;
        } catch (error) {
          // Skip duplicates
        }
      }
    }
    console.log(`  ✓ Migrated ${mobilityCount} mobility items\n`);

    // 7d. Musical Instruments
    console.log('Migrating Musical Instruments...');
    const musicData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Entertainment/Life_MusicalInstruments.json'),
        'utf-8',
      ),
    );
    let musicCount = 0;
    if (Array.isArray(musicData)) {
      for (const instrument of musicData) {
        try {
          await entertainmentService.createMusicalInstrument(instrument);
          musicCount++;
        } catch (error) {
          // Skip duplicates
        }
      }
    } else {
      try {
        await entertainmentService.createMusicalInstrument(musicData);
        musicCount++;
      } catch (error) {
        // Skip duplicates
      }
    }
    console.log(`  ✓ Migrated ${musicCount} musical instruments\n`);

    // 8. Career
    console.log('Migrating Career...');
    const careerData = JSON.parse(
      fs.readFileSync(
        path.join(basePath, 'Career_companies&CEOS.json'),
        'utf-8',
      ),
    );
    for (const company of careerData) {
      try {
        await careerService.create(company);
      } catch (error) {
        console.log(`  Skipping duplicate company: ${company.CompanyName}`);
      }
    }
    console.log(`  ✓ Migrated ${careerData.length} companies\n`);

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

bootstrap();


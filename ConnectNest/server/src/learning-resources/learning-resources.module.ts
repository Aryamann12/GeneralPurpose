import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LearningResourcesController } from './learning-resources.controller';
import { LearningResourcesService } from './learning-resources.service';
import {
  GFGCourseProgress,
  GFGCourseProgressSchema,
} from './schemas/gfg-course-progress.schema';
import { UdemyAccess, UdemyAccessSchema } from './schemas/udemy-access.schema';
import { Book, BookSchema } from './schemas/book.schema';
import {
  CodingNinjasCourse,
  CodingNinjasCourseSchema,
} from './schemas/coding-ninjas-course.schema';
import {
  TLELevel3Course,
  TLELevel3CourseSchema,
} from './schemas/tle-level3-course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GFGCourseProgress.name, schema: GFGCourseProgressSchema },
      { name: UdemyAccess.name, schema: UdemyAccessSchema },
      { name: Book.name, schema: BookSchema },
      { name: CodingNinjasCourse.name, schema: CodingNinjasCourseSchema },
      { name: TLELevel3Course.name, schema: TLELevel3CourseSchema },
    ]),
  ],
  controllers: [LearningResourcesController],
  providers: [LearningResourcesService],
})
export class LearningResourcesModule {}


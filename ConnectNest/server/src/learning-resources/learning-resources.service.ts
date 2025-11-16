import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGFGCourseProgressDto } from './dto/create-gfg-course-progress.dto';
import { CreateBookDto } from './dto/create-book.dto';
import { GFGCourseProgress, GFGCourseProgressDocument } from './schemas/gfg-course-progress.schema';
import { UdemyAccess, UdemyAccessDocument } from './schemas/udemy-access.schema';
import { Book, BookDocument } from './schemas/book.schema';
import { CodingNinjasCourse, CodingNinjasCourseDocument } from './schemas/coding-ninjas-course.schema';
import { TLELevel3Course, TLELevel3CourseDocument } from './schemas/tle-level3-course.schema';

@Injectable()
export class LearningResourcesService {
  constructor(
    @InjectModel(GFGCourseProgress.name)
    private readonly gfgCourseProgressModel: Model<GFGCourseProgressDocument>,
    @InjectModel(UdemyAccess.name)
    private readonly udemyAccessModel: Model<UdemyAccessDocument>,
    @InjectModel(Book.name)
    private readonly bookModel: Model<BookDocument>,
    @InjectModel(CodingNinjasCourse.name)
    private readonly codingNinjasCourseModel: Model<CodingNinjasCourseDocument>,
    @InjectModel(TLELevel3Course.name)
    private readonly tleLevel3CourseModel: Model<TLELevel3CourseDocument>,
  ) {}

  // GFG Course Progress methods
  findAllGFGCourses() {
    return this.gfgCourseProgressModel.find().lean().exec();
  }

  createGFGCourse(createDto: CreateGFGCourseProgressDto) {
    const created = new this.gfgCourseProgressModel(createDto);
    return created.save();
  }

  findOneGFGCourse(trackName: string) {
    return this.gfgCourseProgressModel.findOne({ track_name: trackName }).lean().exec();
  }

  // Udemy Access methods
  findAllUdemyAccess() {
    return this.udemyAccessModel.find().lean().exec();
  }

  createUdemyAccess(data: any) {
    const created = new this.udemyAccessModel(data);
    return created.save();
  }

  // Book methods
  findAllBooks() {
    return this.bookModel.find().lean().exec();
  }

  createBook(createDto: CreateBookDto) {
    const created = new this.bookModel(createDto);
    return created.save();
  }

  findOneBook(id: string) {
    return this.bookModel.findById(id).lean().exec();
  }

  // CodingNinjas Course methods
  findAllCodingNinjasCourses() {
    return this.codingNinjasCourseModel.find().lean().exec();
  }

  findOneCodingNinjasCourse(id: string) {
    return this.codingNinjasCourseModel.findById(id).lean().exec();
  }

  createCodingNinjasCourse(data: any) {
    const created = new this.codingNinjasCourseModel(data);
    return created.save();
  }

  // TLE Level3 Course methods
  findAllTLELevel3Courses() {
    return this.tleLevel3CourseModel.find().lean().exec();
  }

  findOneTLELevel3Course(id: string) {
    return this.tleLevel3CourseModel.findById(id).lean().exec();
  }

  createTLELevel3Course(data: any) {
    const created = new this.tleLevel3CourseModel(data);
    return created.save();
  }
}


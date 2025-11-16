import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LearningResourcesService } from './learning-resources.service';
import { CreateGFGCourseProgressDto } from './dto/create-gfg-course-progress.dto';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('learning-resources')
export class LearningResourcesController {
  constructor(
    private readonly learningResourcesService: LearningResourcesService,
  ) {}

  // GFG Course Progress endpoints
  @Get('gfg-courses')
  findAllGFGCourses() {
    return this.learningResourcesService.findAllGFGCourses();
  }

  @Post('gfg-courses')
  createGFGCourse(@Body() createDto: CreateGFGCourseProgressDto) {
    return this.learningResourcesService.createGFGCourse(createDto);
  }

  @Get('gfg-courses/:trackName')
  findOneGFGCourse(@Param('trackName') trackName: string) {
    return this.learningResourcesService.findOneGFGCourse(trackName);
  }

  // Udemy Access endpoints
  @Get('udemy-access')
  findAllUdemyAccess() {
    return this.learningResourcesService.findAllUdemyAccess();
  }

  // Book endpoints
  @Get('books')
  findAllBooks() {
    return this.learningResourcesService.findAllBooks();
  }

  @Post('books')
  createBook(@Body() createDto: CreateBookDto) {
    return this.learningResourcesService.createBook(createDto);
  }

  @Get('books/:id')
  findOneBook(@Param('id') id: string) {
    return this.learningResourcesService.findOneBook(id);
  }

  // CodingNinjas Course endpoints
  @Get('coding-ninjas-courses')
  findAllCodingNinjasCourses() {
    return this.learningResourcesService.findAllCodingNinjasCourses();
  }

  @Get('coding-ninjas-courses/:id')
  findOneCodingNinjasCourse(@Param('id') id: string) {
    return this.learningResourcesService.findOneCodingNinjasCourse(id);
  }

  // TLE Level3 Course endpoints
  @Get('tle-level3-courses')
  findAllTLELevel3Courses() {
    return this.learningResourcesService.findAllTLELevel3Courses();
  }

  @Get('tle-level3-courses/:id')
  findOneTLELevel3Course(@Param('id') id: string) {
    return this.learningResourcesService.findOneTLELevel3Course(id);
  }
}


import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CppProblemsService } from './cpp-problems.service';
import { CreateCppProblemDto } from './dto/create-cpp-problem.dto';
import { UpdateCppProblemDto } from './dto/update-cpp-problem.dto';
import { CreateCppProblemListDto } from './dto/create-cpp-problem-list.dto';

@Controller('cpp-problems')
export class CppProblemsController {
  constructor(private readonly cppProblemsService: CppProblemsService) {}

  // CppProblemList endpoints (must come before :id routes to avoid conflicts)
  @Get('lists/all')
  findAllLists() {
    return this.cppProblemsService.findAllLists();
  }

  @Post('lists')
  createList(@Body() createDto: CreateCppProblemListDto) {
    return this.cppProblemsService.createList(createDto);
  }

  @Get('lists/:listName')
  findOneList(@Param('listName') listName: string) {
    return this.cppProblemsService.findOneList(listName);
  }

  @Put('lists/:listName')
  updateList(
    @Param('listName') listName: string,
    @Body() updateDto: Partial<CreateCppProblemListDto>,
  ) {
    return this.cppProblemsService.updateList(listName, updateDto);
  }

  @Delete('lists/:listName')
  removeList(@Param('listName') listName: string) {
    return this.cppProblemsService.removeList(listName);
  }

  @Delete('lists')
  deleteAllLists() {
    return this.cppProblemsService.deleteAllLists();
  }

  // Individual CppProblem endpoints
  @Get()
  findAll() {
    return this.cppProblemsService.findAll();
  }

  @Post()
  create(@Body() createCppProblemDto: CreateCppProblemDto) {
    return this.cppProblemsService.create(createCppProblemDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cppProblemsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCppProblemDto: UpdateCppProblemDto,
  ) {
    return this.cppProblemsService.update(id, updateCppProblemDto);
  }

  @Delete('all')
  deleteAll() {
    return this.cppProblemsService.deleteAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cppProblemsService.remove(id);
  }
}


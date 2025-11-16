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

@Controller('cpp-problems')
export class CppProblemsController {
  constructor(private readonly cppProblemsService: CppProblemsService) {}

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

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cppProblemsService.remove(id);
  }

  @Delete()
  deleteAll() {
    return this.cppProblemsService.deleteAll();
  }
}


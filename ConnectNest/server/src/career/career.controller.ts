import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { CareerService } from './career.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('career')
export class CareerController {
  constructor(private readonly careerService: CareerService) {}

  @Get()
  findAll() {
    return this.careerService.findAll();
  }

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.careerService.create(createCompanyDto);
  }

  @Get(':companyName')
  findOne(@Param('companyName') companyName: string) {
    return this.careerService.findOne(companyName);
  }

  @Put(':companyName')
  update(
    @Param('companyName') companyName: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.careerService.update(companyName, updateCompanyDto);
  }

  @Delete(':companyName')
  remove(@Param('companyName') companyName: string) {
    return this.careerService.remove(companyName);
  }

  @Delete()
  deleteAll() {
    return this.careerService.deleteAll();
  }
}


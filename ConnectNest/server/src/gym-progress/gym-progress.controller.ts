import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { GymProgressService } from './gym-progress.service';
import { CreateGymProgressDto } from './dto/create-gym-progress.dto';
import { UpdateGymProgressDto } from './dto/update-gym-progress.dto';

@Controller('gym-progress')
export class GymProgressController {
  constructor(private readonly gymProgressService: GymProgressService) {}

  @Get()
  findAll() {
    return this.gymProgressService.findAll();
  }

  @Post()
  create(@Body() createGymProgressDto: CreateGymProgressDto) {
    return this.gymProgressService.create(createGymProgressDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gymProgressService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateGymProgressDto: UpdateGymProgressDto,
  ) {
    return this.gymProgressService.update(id, updateGymProgressDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gymProgressService.remove(id);
  }

  @Delete()
  deleteAll() {
    return this.gymProgressService.deleteAll();
  }
}


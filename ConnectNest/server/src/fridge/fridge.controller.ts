import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { FridgeService } from './fridge.service';
import { CreateFridgeItemDto } from './dto/create-fridge-item.dto';
import { UpdateFridgeItemDto } from './dto/update-fridge-item.dto';

@Controller('fridge')
export class FridgeController {
  constructor(private readonly fridgeService: FridgeService) {}

  @Get()
  findAll() {
    return this.fridgeService.findAll();
  }

  @Post()
  create(@Body() createFridgeItemDto: CreateFridgeItemDto) {
    return this.fridgeService.create(createFridgeItemDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fridgeService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateFridgeItemDto: UpdateFridgeItemDto,
  ) {
    return this.fridgeService.update(id, updateFridgeItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.fridgeService.remove(id);
  }

  @Delete()
  deleteAll() {
    return this.fridgeService.deleteAll();
  }
}


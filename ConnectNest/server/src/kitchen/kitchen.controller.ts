import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { KitchenService } from './kitchen.service';
import { CreateKitchenEquipmentDto } from './dto/create-kitchen-equipment.dto';
import { UpdateKitchenEquipmentDto } from './dto/update-kitchen-equipment.dto';
import { CreateUtensilDto } from './dto/create-utensil.dto';
import { UpdateUtensilDto } from './dto/update-utensil.dto';

@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  // Kitchen Equipment endpoints
  @Get('equipment')
  findAllEquipment() {
    return this.kitchenService.findAllEquipment();
  }

  @Post('equipment')
  createEquipment(@Body() createKitchenEquipmentDto: CreateKitchenEquipmentDto) {
    return this.kitchenService.createEquipment(createKitchenEquipmentDto);
  }

  @Get('equipment/:id')
  findOneEquipment(@Param('id') id: string) {
    return this.kitchenService.findOneEquipment(id);
  }

  @Put('equipment/:id')
  updateEquipment(
    @Param('id') id: string,
    @Body() updateKitchenEquipmentDto: UpdateKitchenEquipmentDto,
  ) {
    return this.kitchenService.updateEquipment(id, updateKitchenEquipmentDto);
  }

  @Delete('equipment/:id')
  removeEquipment(@Param('id') id: string) {
    return this.kitchenService.removeEquipment(id);
  }

  // Utensil endpoints
  @Get('utensils')
  findAllUtensils() {
    return this.kitchenService.findAllUtensils();
  }

  @Post('utensils')
  createUtensil(@Body() createUtensilDto: CreateUtensilDto) {
    return this.kitchenService.createUtensil(createUtensilDto);
  }

  @Get('utensils/:id')
  findOneUtensil(@Param('id') id: string) {
    return this.kitchenService.findOneUtensil(id);
  }

  @Put('utensils/:id')
  updateUtensil(
    @Param('id') id: string,
    @Body() updateUtensilDto: UpdateUtensilDto,
  ) {
    return this.kitchenService.updateUtensil(id, updateUtensilDto);
  }

  @Delete('utensils/:id')
  removeUtensil(@Param('id') id: string) {
    return this.kitchenService.removeUtensil(id);
  }
}


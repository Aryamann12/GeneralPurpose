import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
} from '@nestjs/common';
import { WardrobeService } from './wardrobe.service';
import { CreateWardrobeDto } from './dto/create-wardrobe.dto';
import { UpdateWardrobeDto } from './dto/update-wardrobe.dto';

@Controller('wardrobe')
export class WardrobeController {
  constructor(private readonly wardrobeService: WardrobeService) {}

  // Item endpoints
  @Get('items')
  findAllItems() {
    return this.wardrobeService.findAllItems();
  }

  @Post('items')
  createItem(@Body() createWardrobeDto: CreateWardrobeDto) {
    return this.wardrobeService.create({ ...createWardrobeDto, type: 'item' });
  }

  @Get('items/:id')
  findOneItem(@Param('id') id: string) {
    return this.wardrobeService.findOneItem(id);
  }

  @Put('items/:id')
  updateItem(
    @Param('id') id: string,
    @Body() updateWardrobeDto: UpdateWardrobeDto,
  ) {
    return this.wardrobeService.updateItem(id, updateWardrobeDto);
  }

  @Delete('items/:id')
  removeItem(@Param('id') id: string) {
    return this.wardrobeService.removeItem(id);
  }

  // Outfit endpoints
  @Get('outfits')
  findAllOutfits() {
    return this.wardrobeService.findAllOutfits();
  }

  @Post('outfits')
  createOutfit(@Body() createWardrobeDto: CreateWardrobeDto) {
    return this.wardrobeService.create({ ...createWardrobeDto, type: 'outfit' });
  }

  @Get('outfits/:id')
  findOneOutfit(@Param('id') id: string) {
    return this.wardrobeService.findOneOutfit(id);
  }

  @Put('outfits/:id')
  updateOutfit(
    @Param('id') id: string,
    @Body() updateWardrobeDto: UpdateWardrobeDto,
  ) {
    return this.wardrobeService.updateOutfit(id, updateWardrobeDto);
  }

  @Delete('outfits/:id')
  removeOutfit(@Param('id') id: string) {
    return this.wardrobeService.removeOutfit(id);
  }
}


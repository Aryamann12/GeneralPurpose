import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWardrobeDto } from './dto/create-wardrobe.dto';
import { UpdateWardrobeDto } from './dto/update-wardrobe.dto';
import { Wardrobe, WardrobeDocument } from './schemas/wardrobe.schema';

@Injectable()
export class WardrobeService {
  constructor(
    @InjectModel(Wardrobe.name)
    private readonly wardrobeModel: Model<WardrobeDocument>,
  ) {}

  // Find all items
  findAllItems() {
    return this.wardrobeModel.find({ type: 'item' }).lean().exec();
  }

  // Find all outfits
  findAllOutfits() {
    return this.wardrobeModel.find({ type: 'outfit' }).lean().exec();
  }

  // Create item or outfit
  create(createWardrobeDto: CreateWardrobeDto) {
    const created = new this.wardrobeModel(createWardrobeDto);
    return created.save();
  }

  // Find one item by id
  findOneItem(id: string) {
    return this.wardrobeModel.findOne({ type: 'item', id }).lean().exec();
  }

  // Find one outfit by outfit_id
  findOneOutfit(id: string) {
    return this.wardrobeModel
      .findOne({ type: 'outfit', outfit_id: id })
      .lean()
      .exec();
  }

  // Update item
  updateItem(id: string, updateWardrobeDto: UpdateWardrobeDto) {
    return this.wardrobeModel
      .findOneAndUpdate(
        { type: 'item', id },
        { $set: updateWardrobeDto },
        { new: true },
      )
      .lean()
      .exec();
  }

  // Update outfit
  updateOutfit(id: string, updateWardrobeDto: UpdateWardrobeDto) {
    return this.wardrobeModel
      .findOneAndUpdate(
        { type: 'outfit', outfit_id: id },
        { $set: updateWardrobeDto },
        { new: true },
      )
      .lean()
      .exec();
  }

  // Remove item
  removeItem(id: string) {
    return this.wardrobeModel.findOneAndDelete({ type: 'item', id }).lean().exec();
  }

  // Remove outfit
  removeOutfit(id: string) {
    return this.wardrobeModel
      .findOneAndDelete({ type: 'outfit', outfit_id: id })
      .lean()
      .exec();
  }

  // Generic create method
  createWardrobe(data: any) {
    const created = new this.wardrobeModel(data);
    return created.save();
  }
}


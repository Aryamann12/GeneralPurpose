import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFridgeItemDto } from './dto/create-fridge-item.dto';
import { UpdateFridgeItemDto } from './dto/update-fridge-item.dto';
import { FridgeItem, FridgeItemDocument } from './schemas/fridge-item.schema';

@Injectable()
export class FridgeService {
  constructor(
    @InjectModel(FridgeItem.name)
    private readonly fridgeItemModel: Model<FridgeItemDocument>,
  ) {}

  findAll() {
    return this.fridgeItemModel.find().lean().exec();
  }

  create(createFridgeItemDto: CreateFridgeItemDto) {
    const createdFridgeItem = new this.fridgeItemModel(createFridgeItemDto);
    return createdFridgeItem.save();
  }

  findOne(id: string) {
    return this.fridgeItemModel.findById(id).lean().exec();
  }

  update(id: string, updateFridgeItemDto: UpdateFridgeItemDto) {
    return this.fridgeItemModel
      .findByIdAndUpdate(id, { $set: updateFridgeItemDto }, { new: true })
      .lean()
      .exec();
  }

  remove(id: string) {
    return this.fridgeItemModel.findByIdAndDelete(id).lean().exec();
  }

  async deleteAll() {
    const result = await this.fridgeItemModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }
}


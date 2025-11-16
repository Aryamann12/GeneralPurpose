import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item, ItemDocument } from './schemas/item.schema';

@Injectable()
export class ItemsService {
  constructor(
    @InjectModel(Item.name) private readonly itemModel: Model<ItemDocument>,
  ) {}

  findAll() {
    return this.itemModel.find().lean().exec();
  }

  create(createItemDto: CreateItemDto) {
    const createdItem = new this.itemModel(createItemDto);
    return createdItem.save();
  }

  findOne(id: string) {
    return this.itemModel.findById(id).lean().exec();
  }

  update(id: string, updateItemDto: UpdateItemDto) {
    return this.itemModel
      .findByIdAndUpdate(id, { $set: updateItemDto }, { new: true })
      .lean()
      .exec();
  }

  remove(id: string) {
    return this.itemModel.findByIdAndDelete(id).lean().exec();
  }

  async deleteAll() {
    const result = await this.itemModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }
}

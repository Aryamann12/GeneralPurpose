import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateGymProgressDto } from './dto/create-gym-progress.dto';
import { UpdateGymProgressDto } from './dto/update-gym-progress.dto';
import { GymProgress, GymProgressDocument } from './schemas/gym-progress.schema';

@Injectable()
export class GymProgressService {
  constructor(
    @InjectModel(GymProgress.name)
    private readonly gymProgressModel: Model<GymProgressDocument>,
  ) {}

  findAll() {
    return this.gymProgressModel.find().lean().exec();
  }

  create(createGymProgressDto: CreateGymProgressDto) {
    const createdGymProgress = new this.gymProgressModel(createGymProgressDto);
    return createdGymProgress.save();
  }

  findOne(id: string) {
    return this.gymProgressModel.findById(id).lean().exec();
  }

  update(id: string, updateGymProgressDto: UpdateGymProgressDto) {
    return this.gymProgressModel
      .findByIdAndUpdate(id, { $set: updateGymProgressDto }, { new: true })
      .lean()
      .exec();
  }

  remove(id: string) {
    return this.gymProgressModel.findByIdAndDelete(id).lean().exec();
  }

  async deleteAll() {
    const result = await this.gymProgressModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }
}


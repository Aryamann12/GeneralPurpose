import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAIResourceDto } from './dto/create-ai-resource.dto';
import { UpdateAIResourceDto } from './dto/update-ai-resource.dto';
import { AIResource, AIResourceDocument } from './schemas/ai-resource.schema';

@Injectable()
export class AITrackerService {
  constructor(
    @InjectModel(AIResource.name)
    private readonly aiResourceModel: Model<AIResourceDocument>,
  ) {}

  findAll() {
    return this.aiResourceModel.find().lean().exec();
  }

  create(createAIResourceDto: CreateAIResourceDto) {
    const createdAIResource = new this.aiResourceModel(createAIResourceDto);
    return createdAIResource.save();
  }

  findOne(id: string) {
    return this.aiResourceModel.findOne({ id }).lean().exec();
  }

  update(id: string, updateAIResourceDto: UpdateAIResourceDto) {
    return this.aiResourceModel
      .findOneAndUpdate({ id }, { $set: updateAIResourceDto }, { new: true })
      .lean()
      .exec();
  }

  remove(id: string) {
    return this.aiResourceModel.findOneAndDelete({ id }).lean().exec();
  }

  async deleteAll() {
    const result = await this.aiResourceModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }

  findByResourceType(resourceType: string) {
    return this.aiResourceModel.find({ resourceType }).lean().exec();
  }
}


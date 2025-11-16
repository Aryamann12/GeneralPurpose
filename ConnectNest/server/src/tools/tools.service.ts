import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateToolDto } from './dto/create-tool.dto';
import { Tool, ToolDocument } from './schemas/tool.schema';

@Injectable()
export class ToolsService {
  constructor(
    @InjectModel(Tool.name) private readonly toolModel: Model<ToolDocument>,
  ) {}

  findAll() {
    return this.toolModel.find().lean().exec();
  }

  async upsertBatch(createToolDtos: CreateToolDto[]) {
    if (!createToolDtos.length) {
      return {
        inserted: 0,
        modified: 0,
        matched: 0,
        upserted: 0,
      };
    }

    const operations = createToolDtos.map((tool) => ({
      updateOne: {
        filter: { id: tool.id },
        update: {
          $set: tool,
        },
        upsert: true,
      },
    }));

    const result = await this.toolModel.bulkWrite(operations, {
      ordered: false,
    });

    return {
      inserted: result.insertedCount ?? 0,
      modified: result.modifiedCount ?? 0,
      matched: result.matchedCount ?? 0,
      upserted: result.upsertedCount ?? 0,
    };
  }

  async deleteAll() {
    const result = await this.toolModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }
}

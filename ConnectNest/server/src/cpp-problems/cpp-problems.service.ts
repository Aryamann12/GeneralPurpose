import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCppProblemDto } from './dto/create-cpp-problem.dto';
import { UpdateCppProblemDto } from './dto/update-cpp-problem.dto';
import { CppProblem, CppProblemDocument } from './schemas/cpp-problem.schema';

@Injectable()
export class CppProblemsService {
  constructor(
    @InjectModel(CppProblem.name)
    private readonly cppProblemModel: Model<CppProblemDocument>,
  ) {}

  findAll() {
    return this.cppProblemModel.find().lean().exec();
  }

  create(createCppProblemDto: CreateCppProblemDto) {
    const createdCppProblem = new this.cppProblemModel(createCppProblemDto);
    return createdCppProblem.save();
  }

  findOne(id: string) {
    return this.cppProblemModel.findOne({ id }).lean().exec();
  }

  update(id: string, updateCppProblemDto: UpdateCppProblemDto) {
    return this.cppProblemModel
      .findOneAndUpdate({ id }, { $set: updateCppProblemDto }, { new: true })
      .lean()
      .exec();
  }

  remove(id: string) {
    return this.cppProblemModel.findOneAndDelete({ id }).lean().exec();
  }

  async deleteAll() {
    const result = await this.cppProblemModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }
}


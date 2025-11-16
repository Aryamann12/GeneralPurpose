import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCppProblemDto } from './dto/create-cpp-problem.dto';
import { UpdateCppProblemDto } from './dto/update-cpp-problem.dto';
import { CreateCppProblemListDto } from './dto/create-cpp-problem-list.dto';
import { CppProblem, CppProblemDocument } from './schemas/cpp-problem.schema';
import { CppProblemList, CppProblemListDocument } from './schemas/cpp-problem-list.schema';

@Injectable()
export class CppProblemsService {
  constructor(
    @InjectModel(CppProblem.name)
    private readonly cppProblemModel: Model<CppProblemDocument>,
    @InjectModel(CppProblemList.name)
    private readonly cppProblemListModel: Model<CppProblemListDocument>,
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

  // CppProblemList methods
  findAllLists() {
    return this.cppProblemListModel.find().lean().exec();
  }

  createList(createDto: CreateCppProblemListDto) {
    const created = new this.cppProblemListModel(createDto);
    return created.save();
  }

  findOneList(listName: string) {
    return this.cppProblemListModel.findOne({ list_name: listName }).lean().exec();
  }

  updateList(listName: string, updateDto: Partial<CreateCppProblemListDto>) {
    return this.cppProblemListModel
      .findOneAndUpdate({ list_name: listName }, { $set: updateDto }, { new: true })
      .lean()
      .exec();
  }

  removeList(listName: string) {
    return this.cppProblemListModel.findOneAndDelete({ list_name: listName }).lean().exec();
  }

  async deleteAllLists() {
    const result = await this.cppProblemListModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }
}


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, CompanyDocument } from './schemas/company.schema';

@Injectable()
export class CareerService {
  constructor(
    @InjectModel(Company.name)
    private readonly companyModel: Model<CompanyDocument>,
  ) {}

  findAll() {
    return this.companyModel.find().lean().exec();
  }

  create(createCompanyDto: CreateCompanyDto) {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  findOne(companyName: string) {
    return this.companyModel.findOne({ CompanyName: companyName }).lean().exec();
  }

  update(companyName: string, updateCompanyDto: UpdateCompanyDto) {
    return this.companyModel
      .findOneAndUpdate(
        { CompanyName: companyName },
        { $set: updateCompanyDto },
        { new: true },
      )
      .lean()
      .exec();
  }

  remove(companyName: string) {
    return this.companyModel
      .findOneAndDelete({ CompanyName: companyName })
      .lean()
      .exec();
  }

  async deleteAll() {
    const result = await this.companyModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }
}


import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device, DeviceDocument } from './schemas/device.schema';

@Injectable()
export class DevicesService {
  constructor(
    @InjectModel(Device.name)
    private readonly deviceModel: Model<DeviceDocument>,
  ) {}

  findAll() {
    return this.deviceModel.find().lean().exec();
  }

  create(createDeviceDto: CreateDeviceDto) {
    const createdDevice = new this.deviceModel(createDeviceDto);
    return createdDevice.save();
  }

  findOne(id: string) {
    return this.deviceModel.findById(id).lean().exec();
  }

  update(id: string, updateDeviceDto: UpdateDeviceDto) {
    return this.deviceModel
      .findByIdAndUpdate(id, { $set: updateDeviceDto }, { new: true })
      .lean()
      .exec();
  }

  remove(id: string) {
    return this.deviceModel.findByIdAndDelete(id).lean().exec();
  }

  async deleteAll() {
    const result = await this.deviceModel.deleteMany({});
    return {
      deletedCount: result.deletedCount ?? 0,
    };
  }
}


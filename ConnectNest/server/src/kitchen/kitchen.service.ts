import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateKitchenEquipmentDto } from './dto/create-kitchen-equipment.dto';
import { UpdateKitchenEquipmentDto } from './dto/update-kitchen-equipment.dto';
import { CreateUtensilDto } from './dto/create-utensil.dto';
import { UpdateUtensilDto } from './dto/update-utensil.dto';
import {
  KitchenEquipment,
  KitchenEquipmentDocument,
} from './schemas/kitchen-equipment.schema';
import { Utensil, UtensilDocument } from './schemas/utensil.schema';

@Injectable()
export class KitchenService {
  constructor(
    @InjectModel(KitchenEquipment.name)
    private readonly kitchenEquipmentModel: Model<KitchenEquipmentDocument>,
    @InjectModel(Utensil.name)
    private readonly utensilModel: Model<UtensilDocument>,
  ) {}

  // Kitchen Equipment methods
  findAllEquipment() {
    return this.kitchenEquipmentModel.find().lean().exec();
  }

  createEquipment(createKitchenEquipmentDto: CreateKitchenEquipmentDto) {
    const createdEquipment = new this.kitchenEquipmentModel(
      createKitchenEquipmentDto,
    );
    return createdEquipment.save();
  }

  findOneEquipment(id: string) {
    return this.kitchenEquipmentModel.findById(id).lean().exec();
  }

  updateEquipment(id: string, updateKitchenEquipmentDto: UpdateKitchenEquipmentDto) {
    return this.kitchenEquipmentModel
      .findByIdAndUpdate(id, { $set: updateKitchenEquipmentDto }, { new: true })
      .lean()
      .exec();
  }

  removeEquipment(id: string) {
    return this.kitchenEquipmentModel.findByIdAndDelete(id).lean().exec();
  }

  // Utensil methods
  findAllUtensils() {
    return this.utensilModel.find().lean().exec();
  }

  createUtensil(createUtensilDto: CreateUtensilDto) {
    const createdUtensil = new this.utensilModel(createUtensilDto);
    return createdUtensil.save();
  }

  findOneUtensil(id: string) {
    return this.utensilModel.findById(id).lean().exec();
  }

  updateUtensil(id: string, updateUtensilDto: UpdateUtensilDto) {
    return this.utensilModel
      .findByIdAndUpdate(id, { $set: updateUtensilDto }, { new: true })
      .lean()
      .exec();
  }

  removeUtensil(id: string) {
    return this.utensilModel.findByIdAndDelete(id).lean().exec();
  }
}


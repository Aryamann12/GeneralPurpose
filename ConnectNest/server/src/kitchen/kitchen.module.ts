import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { KitchenController } from './kitchen.controller';
import { KitchenService } from './kitchen.service';
import {
  KitchenEquipment,
  KitchenEquipmentSchema,
} from './schemas/kitchen-equipment.schema';
import { Utensil, UtensilSchema } from './schemas/utensil.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: KitchenEquipment.name, schema: KitchenEquipmentSchema },
      { name: Utensil.name, schema: UtensilSchema },
    ]),
  ],
  controllers: [KitchenController],
  providers: [KitchenService],
})
export class KitchenModule {}


import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FridgeController } from './fridge.controller';
import { FridgeService } from './fridge.service';
import { FridgeItem, FridgeItemSchema } from './schemas/fridge-item.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: FridgeItem.name, schema: FridgeItemSchema },
    ]),
  ],
  controllers: [FridgeController],
  providers: [FridgeService],
})
export class FridgeModule {}


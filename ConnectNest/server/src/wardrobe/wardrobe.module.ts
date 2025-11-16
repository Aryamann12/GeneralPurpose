import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WardrobeController } from './wardrobe.controller';
import { WardrobeService } from './wardrobe.service';
import { Wardrobe, WardrobeSchema } from './schemas/wardrobe.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Wardrobe.name, schema: WardrobeSchema },
    ]),
  ],
  controllers: [WardrobeController],
  providers: [WardrobeService],
})
export class WardrobeModule {}


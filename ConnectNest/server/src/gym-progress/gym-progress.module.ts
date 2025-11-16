import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GymProgressController } from './gym-progress.controller';
import { GymProgressService } from './gym-progress.service';
import { GymProgress, GymProgressSchema } from './schemas/gym-progress.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: GymProgress.name, schema: GymProgressSchema },
    ]),
  ],
  controllers: [GymProgressController],
  providers: [GymProgressService],
})
export class GymProgressModule {}


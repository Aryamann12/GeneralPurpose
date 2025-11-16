import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AITrackerController } from './ai-tracker.controller';
import { AITrackerService } from './ai-tracker.service';
import { AIResource, AIResourceSchema } from './schemas/ai-resource.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AIResource.name, schema: AIResourceSchema },
    ]),
  ],
  controllers: [AITrackerController],
  providers: [AITrackerService],
})
export class AITrackerModule {}


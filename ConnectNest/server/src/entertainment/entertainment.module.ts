import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EntertainmentController } from './entertainment.controller';
import { EntertainmentService } from './entertainment.service';
import { Mobility, MobilitySchema } from './schemas/mobility.schema';
import {
  MusicalInstrument,
  MusicalInstrumentSchema,
} from './schemas/musical-instrument.schema';
import {
  SocialPlatformItem,
  SocialPlatformItemSchema,
} from './schemas/social-platform-item.schema';
import {
  StreamingApp,
  StreamingAppSchema,
} from './schemas/streaming-app.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Mobility.name, schema: MobilitySchema },
      { name: MusicalInstrument.name, schema: MusicalInstrumentSchema },
      { name: SocialPlatformItem.name, schema: SocialPlatformItemSchema },
      { name: StreamingApp.name, schema: StreamingAppSchema },
    ]),
  ],
  controllers: [EntertainmentController],
  providers: [EntertainmentService],
})
export class EntertainmentModule {}


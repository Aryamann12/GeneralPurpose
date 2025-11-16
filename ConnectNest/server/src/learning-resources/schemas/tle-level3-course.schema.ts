import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TopicProgress } from './topic-progress.schema';

export type TLELevel3CourseDocument = HydratedDocument<TLELevel3Course>;

@Schema({
  timestamps: true,
})
export class TLELevel3Course {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  module!: string;

  @Prop({ type: [Object], required: true })
  topics!: TopicProgress[];
}

export const TLELevel3CourseSchema =
  SchemaFactory.createForClass(TLELevel3Course);


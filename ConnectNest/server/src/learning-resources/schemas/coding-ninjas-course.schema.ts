import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TopicProgress } from './topic-progress.schema';

export type CodingNinjasCourseDocument =
  HydratedDocument<CodingNinjasCourse>;

@Schema({
  timestamps: true,
})
export class CodingNinjasCourse {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  course_type!: string; // 'BasicCpp', 'CompetitiveProgramming', 'SystemDesign'

  @Prop({ type: String })
  module?: string;

  @Prop({ type: String })
  week?: string;

  @Prop({ type: String })
  title?: string; // For BasicCpp

  @Prop({ type: [Object] })
  topics?: TopicProgress[];
}

export const CodingNinjasCourseSchema =
  SchemaFactory.createForClass(CodingNinjasCourse);


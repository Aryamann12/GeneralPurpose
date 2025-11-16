import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@Schema({ _id: false })
export class ExerciseEntry {
  @Prop({ required: true })
  exercise!: string;

  @Prop({ required: true })
  progress!: string;

  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  sets!: number | string;
}

export const ExerciseEntrySchema = SchemaFactory.createForClass(ExerciseEntry);


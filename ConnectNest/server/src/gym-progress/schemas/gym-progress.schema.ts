import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ExerciseEntry, ExerciseEntrySchema } from './exercise-entry.schema';

export type GymProgressDocument = HydratedDocument<GymProgress>;

@Schema({
  timestamps: true,
  collection: 'gym-progress', // Explicit collection name
})
export class GymProgress {
  @Prop({ required: true })
  date!: string;

  @Prop({ type: String, default: null })
  location?: string | null;

  @Prop({ type: [ExerciseEntrySchema], required: true })
  push!: ExerciseEntry[];

  @Prop({ type: [ExerciseEntrySchema], required: true })
  pull!: ExerciseEntry[];

  @Prop({ type: [ExerciseEntrySchema], required: true })
  legs!: ExerciseEntry[];
}

export const GymProgressSchema = SchemaFactory.createForClass(GymProgress);


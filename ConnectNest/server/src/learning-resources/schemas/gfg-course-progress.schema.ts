import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { ModuleProgress } from './module-progress.schema';

export type GFGCourseProgressDocument = HydratedDocument<GFGCourseProgress>;

@Schema({
  timestamps: true,
  collection: '10xiitian_Resources', // Explicit collection name to avoid "gfgcourseprogresses"
})
export class GFGCourseProgress {
  @Prop({ required: true, unique: true })
  track_name!: string;

  @Prop({ type: [Object], required: true })
  modules!: ModuleProgress[];
}

export const GFGCourseProgressSchema =
  SchemaFactory.createForClass(GFGCourseProgress);


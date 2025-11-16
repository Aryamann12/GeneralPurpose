import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type StreamingAppDocument = HydratedDocument<StreamingApp>;

@Schema({
  timestamps: true,
  strict: false, // Preserve all fields from source JSON, even if not explicitly defined
})
export class StreamingApp {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  type!: string;
}

export const StreamingAppSchema = SchemaFactory.createForClass(StreamingApp);


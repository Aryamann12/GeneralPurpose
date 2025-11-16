import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UdemyAccessDocument = HydratedDocument<UdemyAccess>;

@Schema({
  timestamps: true,
  collection: 'udemycourses', // Explicit collection name
})
export class UdemyAccess {
  @Prop({ required: true })
  platform!: string;

  @Prop({ required: true })
  access_type!: string;

  @Prop({ required: true })
  coverage!: string;

  @Prop({ required: true })
  status!: string;
}

export const UdemyAccessSchema = SchemaFactory.createForClass(UdemyAccess);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MusicalInstrumentDocument = HydratedDocument<MusicalInstrument>;

@Schema({
  timestamps: true,
  strict: false, // Preserve all fields from source JSON, even if not explicitly defined
})
export class MusicalInstrument {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ type: Object, required: true })
  details!: {
    accessories: string[];
  };
}

export const MusicalInstrumentSchema =
  SchemaFactory.createForClass(MusicalInstrument);


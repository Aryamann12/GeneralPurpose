import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MobilityDocument = HydratedDocument<Mobility>;

@Schema({
  timestamps: true,
  collection: 'mobilities', // Explicit collection name to match AryamannLifeVars.mobilities
  strict: false, // Preserve all fields from source JSON, even if not explicitly defined
})
export class Mobility {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ type: String })
  device_name?: string;

  @Prop({ type: String })
  purpose?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [String] })
  usage?: string[];

  @Prop({ type: Object })
  details?: {
    availability?: string;
    notes?: string;
  };
}

export const MobilitySchema = SchemaFactory.createForClass(Mobility);


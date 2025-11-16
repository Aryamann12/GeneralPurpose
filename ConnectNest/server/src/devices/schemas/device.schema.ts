import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({
  timestamps: true,
  strict: false, // Preserve all fields from source JSON, even if not explicitly defined
})
export class Device {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true })
  device_name!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: Number })
  bought_year?: number;

  @Prop({ type: String })
  chipset?: string;

  @Prop({ type: Object })
  specs?: {
    processor?: string;
    ram?: string;
    graphics?: string;
    note?: string;
  };

  @Prop({ type: [String] })
  compatible_with?: string[];
}

export const DeviceSchema = SchemaFactory.createForClass(Device);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type KitchenEquipmentDocument = HydratedDocument<KitchenEquipment>;

@Schema({
  timestamps: true,
})
export class KitchenEquipment {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true })
  item_name!: string;

  @Prop({ required: true })
  model_details!: string;

  @Prop({ required: true })
  location!: string;

  @Prop({ type: String, default: null })
  purchase_date?: string | null;

  @Prop({ type: String, default: null })
  warranty_expiry?: string | null;

  @Prop({ required: true })
  usage_frequency!: string;

  @Prop({ required: true })
  notes!: string;
}

export const KitchenEquipmentSchema =
  SchemaFactory.createForClass(KitchenEquipment);


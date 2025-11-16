import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type FridgeItemDocument = HydratedDocument<FridgeItem>;

@Schema({
  timestamps: true,
})
export class FridgeItem {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  item_name!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true })
  quantity!: string;

  @Prop({ required: true })
  storage_shelf!: string;

  @Prop({ required: true })
  expiry_date!: string;

  @Prop({ required: true })
  status!: string;

  @Prop({ required: true })
  priority_to_consume!: string;

  @Prop({ required: true })
  notes!: string;
}

export const FridgeItemSchema = SchemaFactory.createForClass(FridgeItem);


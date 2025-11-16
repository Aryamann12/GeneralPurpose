import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UtensilDocument = HydratedDocument<Utensil>;

@Schema({
  timestamps: true,
})
export class Utensil {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true })
  item_name!: string;

  @Prop({ required: true })
  quantity!: number;

  @Prop({ required: true })
  location!: string;

  @Prop({ required: true })
  notes!: string;
}

export const UtensilSchema = SchemaFactory.createForClass(Utensil);


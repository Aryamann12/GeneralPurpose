import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type WardrobeDocument = HydratedDocument<Wardrobe>;

@Schema({
  timestamps: true,
  collection: 'wardrobe', // Single collection for both items and outfits
})
export class Wardrobe {
  @Prop({ required: true })
  type!: 'item' | 'outfit'; // Distinguish between item and outfit

  // For items
  @Prop({
    match: /^[A-Z]{1,2}[0-9]{3,}$/,
  })
  id?: string; // Item ID

  @Prop()
  name?: string; // Item name

  @Prop()
  color?: string;

  @Prop({
    enum: ['casual', 'formal', 'semi_formal', 'athletic', 'lounge'],
  })
  style?: string;

  @Prop()
  material?: string;

  @Prop({
    enum: ['new', 'good', 'worn', 'needs_repair'],
  })
  condition?: string;

  @Prop({ type: Date, default: null })
  last_worn?: Date | null;

  @Prop({ type: Number, default: 0, min: 0 })
  wash_count?: number;

  @Prop()
  category?: string;

  // For outfits
  @Prop({
    match: /^O[0-9]{3,}$/,
  })
  outfit_id?: string; // Outfit ID

  @Prop({ type: [String], minlength: 1 })
  items?: string[]; // Array of item IDs for outfits

  @Prop()
  occasion?: string; // For outfits
}

export const WardrobeSchema = SchemaFactory.createForClass(Wardrobe);


import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SocialPlatformItemDocument = HydratedDocument<SocialPlatformItem>;

@Schema({
  timestamps: true,
  collection: 'socialplatforms', // Single collection for both social platforms and dating apps
  strict: false, // Preserve all fields from source JSON, even if not explicitly defined
})
export class SocialPlatformItem {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  type!: 'social' | 'dating'; // Distinguish between social platform and dating app

  @Prop({ type: String })
  purpose?: string; // For social platforms

  @Prop({ type: String })
  notes?: string; // For dating apps

  @Prop({ type: String })
  caution?: string; // For dating apps
}

export const SocialPlatformItemSchema =
  SchemaFactory.createForClass(SocialPlatformItem);


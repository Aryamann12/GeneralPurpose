import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UsageLimit } from './usage-limit.schema';
import { ModelUsage } from './model-usage.schema';

export type AIResourceDocument = HydratedDocument<AIResource>;

@Schema({
  timestamps: true,
})
export class AIResource {
  @Prop({ required: true, unique: true })
  id!: string;

  @Prop({ required: true })
  serviceName!: string;

  @Prop({ required: true })
  provider!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ type: Object, required: true })
  planDetails!: {
    planType: string;
    renewalInfo: string;
  };

  @Prop({ type: Object, required: true })
  usageTracking!: {
    trackingMethod: string;
    limits: UsageLimit[];
    modelSpecificUsage?: ModelUsage[];
  };

  @Prop({ required: true })
  notes!: string;

  @Prop({
    required: true,
    enum: ['limitedFreeTier', 'paidOrProvided', 'freeToUse'],
  })
  resourceType!: string;
}

export const AIResourceSchema = SchemaFactory.createForClass(AIResource);


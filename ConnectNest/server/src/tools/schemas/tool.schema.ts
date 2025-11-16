import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Tool {
  @Prop({
    required: true,
    unique: true,
    index: true,
    trim: true,
  })
  id!: string;

  @Prop({
    required: true,
    trim: true,
  })
  name!: string;

  @Prop({
    required: true,
    trim: true,
  })
  category!: string;

  @Prop({
    trim: true,
  })
  description?: string;

  @Prop({
    type: [String],
    default: [],
  })
  connections!: string[];

  @Prop({
    required: true,
    trim: true,
  })
  color!: string;

  @Prop({
    trim: true,
  })
  logo?: string;
}

export type ToolDocument = HydratedDocument<Tool>;
export const ToolSchema = SchemaFactory.createForClass(Tool);

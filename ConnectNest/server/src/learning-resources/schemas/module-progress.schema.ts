import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ModuleProgress {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  module!: string;

  @Prop({ required: true, type: Number })
  total_hours!: number;

  @Prop({ required: true })
  completed_percentage!: number;

  @Prop({
    required: true,
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  })
  status!: 'Not Started' | 'In Progress' | 'Completed';

  @Prop({ type: String, default: '' })
  notes!: string;
}

export const ModuleProgressSchema = SchemaFactory.createForClass(ModuleProgress);


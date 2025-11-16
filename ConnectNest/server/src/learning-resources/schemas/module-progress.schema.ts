import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ModuleProgress {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  module!: string;

  @Prop({ required: true })
  total_hours!: string;

  @Prop({ required: true })
  completed_percentage!: number;

  @Prop({ required: true })
  status!: string;
}

export const ModuleProgressSchema = SchemaFactory.createForClass(ModuleProgress);


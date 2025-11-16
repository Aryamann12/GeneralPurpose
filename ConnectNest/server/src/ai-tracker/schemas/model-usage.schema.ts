import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ModelUsage {
  @Prop({ required: true })
  modelName!: string;

  @Prop({ required: true })
  used!: number;

  @Prop({ required: true })
  total!: number;

  @Prop({ required: true })
  unit!: string;
}


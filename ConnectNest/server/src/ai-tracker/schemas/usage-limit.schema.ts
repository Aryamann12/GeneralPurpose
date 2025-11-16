import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class UsageLimit {
  @Prop({ required: true })
  type!: string;

  @Prop({ required: true })
  used!: number;

  @Prop({ required: true })
  total!: number;

  @Prop({ required: true })
  unit!: string;

  @Prop({ required: true })
  resets!: string;
}


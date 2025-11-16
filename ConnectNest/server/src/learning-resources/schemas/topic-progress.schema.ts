import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class TopicProgress {
  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  status!: string;
}

export const TopicProgressSchema = SchemaFactory.createForClass(TopicProgress);


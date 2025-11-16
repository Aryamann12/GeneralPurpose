import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
export class TopicProgress {
  @Prop({ required: true })
  title!: string;

  @Prop({
    required: true,
    type: String,
    enum: ['To Read', 'Reading', 'Read', 'Not Started', 'In Progress', 'Completed'],
    default: 'Not Started',
  })
  status!: 'To Read' | 'Reading' | 'Read' | 'Not Started' | 'In Progress' | 'Completed';

  @Prop({ type: String, default: '' })
  notes!: string;
}

export const TopicProgressSchema = SchemaFactory.createForClass(TopicProgress);


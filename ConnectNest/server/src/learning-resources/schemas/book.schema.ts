import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { TopicProgress } from './topic-progress.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema({
  timestamps: true,
})
export class Book {
  @Prop({ required: true })
  sr_no!: number;

  @Prop({ required: true })
  category!: string;

  @Prop({ type: String })
  subcategory?: string;

  @Prop({ required: true })
  module!: string;

  @Prop({ type: [Object], required: true })
  topics!: TopicProgress[];
}

export const BookSchema = SchemaFactory.createForClass(Book);


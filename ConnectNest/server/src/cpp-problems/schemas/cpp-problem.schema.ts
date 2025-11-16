import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CppProblemDocument = HydratedDocument<CppProblem>;

@Schema({
  timestamps: true,
})
export class CppProblem {
  @Prop({ required: true, unique: true })
  id!: string;

  @Prop({ required: true })
  title!: string;

  @Prop({ required: true })
  category!: string;

  @Prop({ required: true, enum: ['Easy', 'Medium', 'Hard'] })
  difficulty!: 'Easy' | 'Medium' | 'Hard';

  @Prop({ required: true })
  notes!: string;

  @Prop({ required: true })
  code!: string;

  @Prop({ type: String })
  imageUrl?: string;
}

export const CppProblemSchema = SchemaFactory.createForClass(CppProblem);


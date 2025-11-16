import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CppProblemListDocument = HydratedDocument<CppProblemList>;

@Schema({ _id: false })
export class Problem {
  @Prop({ required: true })
  title!: string;

  @Prop({
    type: String,
    enum: ['Not Started', 'Solving', 'Solved', 'Attempted'],
    default: 'Not Started',
  })
  status!: 'Not Started' | 'Solving' | 'Solved' | 'Attempted';

  @Prop({ type: String, default: '' })
  notes!: string;

  @Prop({ type: String })
  question_image_url?: string;

  @Prop({ type: String })
  problem_link?: string;

  @Prop({
    type: String,
    enum: ['Easy', 'Medium', 'Hard', 'Expert'],
  })
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export const ProblemSchema = SchemaFactory.createForClass(Problem);

@Schema({ _id: false })
export class ProblemModule {
  @Prop({ type: Number })
  sr_no?: number;

  @Prop({ required: true })
  module_name!: string;

  @Prop({ type: String })
  category?: string;

  @Prop({ type: [Object], default: [] })
  topics!: Problem[];
}

export const ProblemModuleSchema = SchemaFactory.createForClass(ProblemModule);

@Schema({
  timestamps: true,
})
export class CppProblemList {
  @Prop({ required: true, unique: true })
  list_name!: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: [Object], default: [] })
  modules!: ProblemModule[];
}

export const CppProblemListSchema = SchemaFactory.createForClass(CppProblemList);


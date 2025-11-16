import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CppProblemsController } from './cpp-problems.controller';
import { CppProblemsService } from './cpp-problems.service';
import {
  CppProblem,
  CppProblemSchema,
} from './schemas/cpp-problem.schema';
import {
  CppProblemList,
  CppProblemListSchema,
} from './schemas/cpp-problem-list.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CppProblem.name, schema: CppProblemSchema },
      { name: CppProblemList.name, schema: CppProblemListSchema },
    ]),
  ],
  controllers: [CppProblemsController],
  providers: [CppProblemsService],
})
export class CppProblemsModule {}


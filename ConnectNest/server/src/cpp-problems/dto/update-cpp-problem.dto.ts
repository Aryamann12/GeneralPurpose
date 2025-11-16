import { PartialType } from '@nestjs/mapped-types';
import { CreateCppProblemDto } from './create-cpp-problem.dto';

export class UpdateCppProblemDto extends PartialType(CreateCppProblemDto) {}


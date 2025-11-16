import { IsString, IsArray, ValidateNested, IsOptional, IsEnum, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ProblemDto {
  @IsString()
  title!: string;

  @IsEnum(['Not Started', 'Solving', 'Solved', 'Attempted'])
  @IsOptional()
  status?: 'Not Started' | 'Solving' | 'Solved' | 'Attempted';

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  question_image_url?: string;

  @IsOptional()
  @IsString()
  problem_link?: string;

  @IsOptional()
  @IsEnum(['Easy', 'Medium', 'Hard', 'Expert'])
  difficulty?: 'Easy' | 'Medium' | 'Hard' | 'Expert';
}

export class ProblemModuleDto {
  @IsOptional()
  @IsNumber()
  sr_no?: number;

  @IsString()
  module_name!: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProblemDto)
  topics!: ProblemDto[];
}

export class CreateCppProblemListDto {
  @IsString()
  list_name!: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProblemModuleDto)
  modules!: ProblemModuleDto[];
}


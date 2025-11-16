import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ExerciseEntryDto {
  @IsString()
  exercise!: string;

  @IsString()
  progress!: string;

  sets!: number | string;
}

export class CreateGymProgressDto {
  @IsString()
  date!: string;

  @IsString()
  @IsOptional()
  location?: string | null;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseEntryDto)
  push!: ExerciseEntryDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseEntryDto)
  pull!: ExerciseEntryDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExerciseEntryDto)
  legs!: ExerciseEntryDto[];
}


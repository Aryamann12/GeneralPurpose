import { IsString, IsArray, ValidateNested, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class ModuleProgressDto {
  sr_no!: number;
  module!: string;
  @IsNumber()
  total_hours!: number;
  completed_percentage!: number;
  @IsEnum(['Not Started', 'In Progress', 'Completed'])
  status!: 'Not Started' | 'In Progress' | 'Completed';
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateGFGCourseProgressDto {
  @IsString()
  track_name!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleProgressDto)
  modules!: ModuleProgressDto[];
}


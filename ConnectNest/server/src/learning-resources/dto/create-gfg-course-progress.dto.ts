import { IsString, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ModuleProgressDto {
  sr_no!: number;
  module!: string;
  total_hours!: string;
  completed_percentage!: number;
  status!: string;
}

export class CreateGFGCourseProgressDto {
  @IsString()
  track_name!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModuleProgressDto)
  modules!: ModuleProgressDto[];
}


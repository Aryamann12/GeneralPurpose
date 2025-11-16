import { IsString, IsNumber, IsArray, ValidateNested, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

export class TopicProgressDto {
  title!: string;
  @IsEnum(['To Read', 'Reading', 'Read', 'Not Started', 'In Progress', 'Completed'])
  status!: 'To Read' | 'Reading' | 'Read' | 'Not Started' | 'In Progress' | 'Completed';
  @IsOptional()
  @IsString()
  notes?: string;
}

export class CreateBookDto {
  @IsNumber()
  sr_no!: number;

  @IsString()
  category!: string;

  @IsOptional()
  @IsString()
  subcategory?: string;

  @IsString()
  book_title!: string;

  @IsArray()
  @IsString({ each: true })
  authors!: string[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicProgressDto)
  chapters!: TopicProgressDto[];
}


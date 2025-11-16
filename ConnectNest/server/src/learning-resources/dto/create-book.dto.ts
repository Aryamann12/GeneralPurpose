import { IsString, IsNumber, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TopicProgressDto {
  title!: string;
  status!: string;
}

export class CreateBookDto {
  @IsNumber()
  sr_no!: number;

  @IsString()
  category!: string;

  @IsString()
  module!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TopicProgressDto)
  topics!: TopicProgressDto[];
}


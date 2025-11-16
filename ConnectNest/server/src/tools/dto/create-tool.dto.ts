import { IsArray, IsHexColor, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateToolDto {
  @IsString()
  @MaxLength(100)
  id!: string;

  @IsString()
  @MaxLength(120)
  name!: string;

  @IsString()
  @MaxLength(80)
  category!: string;

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  description?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  connections?: string[];

  @IsHexColor()
  color!: string;

  @IsString()
  @IsOptional()
  logo?: string;
}

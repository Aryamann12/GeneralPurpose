import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateItemDto {
  @IsString()
  @IsOptional()
  @MaxLength(120)
  name?: string;

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  description?: string;
}


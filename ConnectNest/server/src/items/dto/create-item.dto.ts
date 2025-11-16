import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @MaxLength(120)
  name!: string;

  @IsString()
  @IsOptional()
  @MaxLength(1024)
  description?: string;
}

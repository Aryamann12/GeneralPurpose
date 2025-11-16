import { IsString, IsEnum, IsOptional } from 'class-validator';

export class CreateCppProblemDto {
  @IsString()
  id!: string;

  @IsString()
  title!: string;

  @IsString()
  category!: string;

  @IsEnum(['Easy', 'Medium', 'Hard'])
  difficulty!: 'Easy' | 'Medium' | 'Hard';

  @IsString()
  notes!: string;

  @IsString()
  code!: string;

  @IsString()
  @IsOptional()
  imageUrl?: string;
}


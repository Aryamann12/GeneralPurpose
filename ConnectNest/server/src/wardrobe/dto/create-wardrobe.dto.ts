import {
  IsString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsDateString,
  IsArray,
  Min,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateWardrobeDto {
  @IsEnum(['item', 'outfit'])
  type!: 'item' | 'outfit';

  // For items
  @IsString()
  @Matches(/^[A-Z]{1,2}[0-9]{3,}$/)
  @IsOptional()
  id?: string;

  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  color?: string;

  @IsEnum(['casual', 'formal', 'semi_formal', 'athletic', 'lounge'])
  @IsOptional()
  style?: string;

  @IsString()
  @IsOptional()
  material?: string;

  @IsEnum(['new', 'good', 'worn', 'needs_repair'])
  @IsOptional()
  condition?: string;

  @IsDateString()
  @IsOptional()
  last_worn?: Date | null;

  @IsNumber()
  @Min(0)
  @IsOptional()
  wash_count?: number;

  @IsString()
  @IsOptional()
  category?: string;

  // For outfits
  @IsString()
  @Matches(/^O[0-9]{3,}$/)
  @IsOptional()
  outfit_id?: string;

  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @IsOptional()
  items?: string[];

  @IsString()
  @IsOptional()
  occasion?: string;
}


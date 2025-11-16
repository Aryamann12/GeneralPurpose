import { IsString, IsNumber } from 'class-validator';

export class CreateUtensilDto {
  @IsNumber()
  sr_no!: number;

  @IsString()
  category!: string;

  @IsString()
  item_name!: string;

  @IsNumber()
  quantity!: number;

  @IsString()
  location!: string;

  @IsString()
  notes!: string;
}


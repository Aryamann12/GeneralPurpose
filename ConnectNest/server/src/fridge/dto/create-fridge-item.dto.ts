import { IsString, IsNumber } from 'class-validator';

export class CreateFridgeItemDto {
  @IsNumber()
  sr_no!: number;

  @IsString()
  item_name!: string;

  @IsString()
  category!: string;

  @IsString()
  quantity!: string;

  @IsString()
  storage_shelf!: string;

  @IsString()
  expiry_date!: string;

  @IsString()
  status!: string;

  @IsString()
  priority_to_consume!: string;

  @IsString()
  notes!: string;
}


import { IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateKitchenEquipmentDto {
  @IsNumber()
  sr_no!: number;

  @IsString()
  category!: string;

  @IsString()
  item_name!: string;

  @IsString()
  model_details!: string;

  @IsString()
  location!: string;

  @IsString()
  @IsOptional()
  purchase_date?: string | null;

  @IsString()
  @IsOptional()
  warranty_expiry?: string | null;

  @IsString()
  usage_frequency!: string;

  @IsString()
  notes!: string;
}


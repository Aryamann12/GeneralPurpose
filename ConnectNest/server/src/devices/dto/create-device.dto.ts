import { IsString, IsNumber, IsOptional, IsObject, IsArray } from 'class-validator';

export class DeviceSpecsDto {
  @IsString()
  @IsOptional()
  processor?: string;

  @IsString()
  @IsOptional()
  ram?: string;

  @IsString()
  @IsOptional()
  graphics?: string;

  @IsString()
  @IsOptional()
  note?: string;
}

export class CreateDeviceDto {
  @IsNumber()
  sr_no!: number;

  @IsString()
  category!: string;

  @IsString()
  device_name!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  bought_year?: number;

  @IsString()
  @IsOptional()
  chipset?: string;

  @IsObject()
  @IsOptional()
  specs?: DeviceSpecsDto;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  compatible_with?: string[];
}


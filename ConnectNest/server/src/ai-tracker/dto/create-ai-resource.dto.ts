import {
  IsString,
  IsEnum,
  IsArray,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class PlanDetailsDto {
  @IsString()
  planType!: string;

  @IsString()
  renewalInfo!: string;
}

export class UsageLimitDto {
  @IsString()
  type!: string;

  used!: number;

  total!: number;

  @IsString()
  unit!: string;

  @IsString()
  resets!: string;
}

export class ModelUsageDto {
  @IsString()
  modelName!: string;

  used!: number;

  total!: number;

  @IsString()
  unit!: string;
}

export class UsageTrackingDto {
  @IsString()
  trackingMethod!: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UsageLimitDto)
  limits!: UsageLimitDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ModelUsageDto)
  @IsOptional()
  modelSpecificUsage?: ModelUsageDto[];
}

export class CreateAIResourceDto {
  @IsString()
  id!: string;

  @IsString()
  serviceName!: string;

  @IsString()
  provider!: string;

  @IsString()
  category!: string;

  @IsObject()
  @ValidateNested()
  @Type(() => PlanDetailsDto)
  planDetails!: PlanDetailsDto;

  @IsObject()
  @ValidateNested()
  @Type(() => UsageTrackingDto)
  usageTracking!: UsageTrackingDto;

  @IsString()
  notes!: string;

  @IsEnum(['limitedFreeTier', 'paidOrProvided', 'freeToUse'])
  resourceType!: string;
}


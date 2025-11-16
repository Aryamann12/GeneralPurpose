import { PartialType } from '@nestjs/mapped-types';
import { CreateKitchenEquipmentDto } from './create-kitchen-equipment.dto';

export class UpdateKitchenEquipmentDto extends PartialType(
  CreateKitchenEquipmentDto,
) {}


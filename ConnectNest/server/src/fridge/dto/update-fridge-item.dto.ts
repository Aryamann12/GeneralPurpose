import { PartialType } from '@nestjs/mapped-types';
import { CreateFridgeItemDto } from './create-fridge-item.dto';

export class UpdateFridgeItemDto extends PartialType(CreateFridgeItemDto) {}


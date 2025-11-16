import { PartialType } from '@nestjs/mapped-types';
import { CreateGymProgressDto } from './create-gym-progress.dto';

export class UpdateGymProgressDto extends PartialType(CreateGymProgressDto) {}


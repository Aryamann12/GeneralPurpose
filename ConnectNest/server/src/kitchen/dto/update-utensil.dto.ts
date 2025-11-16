import { PartialType } from '@nestjs/mapped-types';
import { CreateUtensilDto } from './create-utensil.dto';

export class UpdateUtensilDto extends PartialType(CreateUtensilDto) {}


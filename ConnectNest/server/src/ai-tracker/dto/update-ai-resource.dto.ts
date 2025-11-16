import { PartialType } from '@nestjs/mapped-types';
import { CreateAIResourceDto } from './create-ai-resource.dto';

export class UpdateAIResourceDto extends PartialType(CreateAIResourceDto) {}


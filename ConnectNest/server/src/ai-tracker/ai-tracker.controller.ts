import {
  Body,
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  Query,
} from '@nestjs/common';
import { AITrackerService } from './ai-tracker.service';
import { CreateAIResourceDto } from './dto/create-ai-resource.dto';
import { UpdateAIResourceDto } from './dto/update-ai-resource.dto';

@Controller('ai-tracker')
export class AITrackerController {
  constructor(private readonly aiTrackerService: AITrackerService) {}

  @Get()
  findAll(@Query('resourceType') resourceType?: string) {
    if (resourceType) {
      return this.aiTrackerService.findByResourceType(resourceType);
    }
    return this.aiTrackerService.findAll();
  }

  @Post()
  create(@Body() createAIResourceDto: CreateAIResourceDto) {
    return this.aiTrackerService.create(createAIResourceDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aiTrackerService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateAIResourceDto: UpdateAIResourceDto,
  ) {
    return this.aiTrackerService.update(id, updateAIResourceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aiTrackerService.remove(id);
  }

  @Delete()
  deleteAll() {
    return this.aiTrackerService.deleteAll();
  }
}


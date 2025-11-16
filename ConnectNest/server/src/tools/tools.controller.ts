import { Body, Controller, Post, Delete, ParseArrayPipe, Get } from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Get()
  findAll() {
    return this.toolsService.findAll();
  }

  @Post('batch')
  upsertBatch(
    @Body(new ParseArrayPipe({ items: CreateToolDto, whitelist: true }))
    createToolDtos: CreateToolDto[],
  ) {
    return this.toolsService.upsertBatch(createToolDtos);
  }

  @Delete()
  deleteAll() {
    return this.toolsService.deleteAll();
  }
}

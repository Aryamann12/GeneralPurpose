import { Controller, Get, Param } from '@nestjs/common';
import { EntertainmentService } from './entertainment.service';

@Controller('entertainment')
export class EntertainmentController {
  constructor(private readonly entertainmentService: EntertainmentService) {}

  @Get('mobility')
  findAllMobility() {
    return this.entertainmentService.findAllMobility();
  }

  @Get('mobility/:id')
  findOneMobility(@Param('id') id: string) {
    return this.entertainmentService.findOneMobility(id);
  }

  @Get('musical-instruments')
  findAllMusicalInstruments() {
    return this.entertainmentService.findAllMusicalInstruments();
  }

  @Get('musical-instruments/:id')
  findOneMusicalInstrument(@Param('id') id: string) {
    return this.entertainmentService.findOneMusicalInstrument(id);
  }

  @Get('social-platforms')
  findAllSocialPlatforms() {
    return this.entertainmentService.findSocialPlatforms();
  }

  @Get('dating-apps')
  findAllDatingApps() {
    return this.entertainmentService.findDatingApps();
  }

  @Get('social-platforms/:id')
  findOneSocialPlatformItem(@Param('id') id: string) {
    return this.entertainmentService.findOneSocialPlatformItem(id);
  }

  @Get('streaming-apps')
  findAllStreamingApps() {
    return this.entertainmentService.findAllStreamingApps();
  }

  @Get('streaming-apps/:id')
  findOneStreamingApp(@Param('id') id: string) {
    return this.entertainmentService.findOneStreamingApp(id);
  }
}


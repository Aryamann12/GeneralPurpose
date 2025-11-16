import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Mobility, MobilityDocument } from './schemas/mobility.schema';
import {
  MusicalInstrument,
  MusicalInstrumentDocument,
} from './schemas/musical-instrument.schema';
import {
  SocialPlatformItem,
  SocialPlatformItemDocument,
} from './schemas/social-platform-item.schema';
import {
  StreamingApp,
  StreamingAppDocument,
} from './schemas/streaming-app.schema';

@Injectable()
export class EntertainmentService {
  constructor(
    @InjectModel(Mobility.name)
    private readonly mobilityModel: Model<MobilityDocument>,
    @InjectModel(MusicalInstrument.name)
    private readonly musicalInstrumentModel: Model<MusicalInstrumentDocument>,
    @InjectModel(SocialPlatformItem.name)
    private readonly socialPlatformItemModel: Model<SocialPlatformItemDocument>,
    @InjectModel(StreamingApp.name)
    private readonly streamingAppModel: Model<StreamingAppDocument>,
  ) {}

  // Mobility methods
  findAllMobility() {
    return this.mobilityModel.find().lean().exec();
  }

  findOneMobility(id: string) {
    return this.mobilityModel.findById(id).lean().exec();
  }

  // MusicalInstrument methods
  findAllMusicalInstruments() {
    return this.musicalInstrumentModel.find().lean().exec();
  }

  findOneMusicalInstrument(id: string) {
    return this.musicalInstrumentModel.findById(id).lean().exec();
  }

  // SocialPlatformItem methods (merged social platforms and dating apps)
  findAllSocialPlatformItems() {
    return this.socialPlatformItemModel.find().lean().exec();
  }

  findSocialPlatforms() {
    return this.socialPlatformItemModel.find({ type: 'social' }).lean().exec();
  }

  findDatingApps() {
    return this.socialPlatformItemModel.find({ type: 'dating' }).lean().exec();
  }

  findOneSocialPlatformItem(id: string) {
    return this.socialPlatformItemModel.findById(id).lean().exec();
  }

  // StreamingApp methods
  findAllStreamingApps() {
    return this.streamingAppModel.find().lean().exec();
  }

  findOneStreamingApp(id: string) {
    return this.streamingAppModel.findById(id).lean().exec();
  }

  createSocialPlatformItem(data: any) {
    const created = new this.socialPlatformItemModel(data);
    return created.save();
  }

  createStreamingApp(data: any) {
    const created = new this.streamingAppModel(data);
    return created.save();
  }

  createMobility(data: any) {
    const created = new this.mobilityModel(data);
    return created.save();
  }

  createMusicalInstrument(data: any) {
    const created = new this.musicalInstrumentModel(data);
    return created.save();
  }
}


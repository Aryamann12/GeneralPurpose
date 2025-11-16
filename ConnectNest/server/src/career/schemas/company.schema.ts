import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({
  timestamps: true,
})
export class Company {
  @Prop({ required: true, unique: true })
  CompanyName!: string;

  @Prop({ required: true })
  IndustryOrSector!: string;

  @Prop({ required: true })
  FoundedYear!: number;

  @Prop({ type: [String], required: true })
  Founders!: string[];

  @Prop({ required: true })
  HeadquartersLocation!: string;

  @Prop({ required: true })
  CompanyHistorySummary!: string;

  @Prop({ type: [String], required: true })
  NotableProductsOrServices!: string[];

  @Prop({ required: true })
  MarketCap!: string;

  @Prop({ required: true })
  AnnualRevenue!: string;

  @Prop({ required: true })
  GlobalPresence!: string;

  @Prop({ type: [String], required: true })
  StrategicFocusAreas!: string[];

  @Prop({ type: [String], required: true })
  RecentMajorNews!: string[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  Competitors!: string | string[];

  @Prop({ type: [String], required: true })
  CompanyCultureTraits!: string[];

  @Prop({ required: true })
  VisionOrMissionStatement!: string;

  @Prop({ required: true })
  CEOName!: string;

  @Prop({ required: true })
  CEOBirthdate!: string;

  @Prop({ required: true })
  CEOBirthplace!: string;

  @Prop({ type: [String], required: true })
  CEOEducation!: string[];

  @Prop({ type: [String], required: true })
  PreviousRoles!: string[];

  @Prop({ required: true })
  YearBecameCEO!: string;

  @Prop({ required: true })
  LeadershipStyle!: string;

  @Prop({ type: [String], required: true })
  KeyPersonalityTraits!: string[];

  @Prop({ type: [String], required: true })
  CEOAchievements!: string[];

  @Prop({ required: true })
  CEOPublicReputation!: string;

  @Prop({ required: true })
  CEONetWorth!: string;

  @Prop({ type: MongooseSchema.Types.Mixed })
  CEOAwards!: string | string[];

  @Prop({ type: [String], required: true })
  CEOQuotes!: string[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  CEOPhilanthropyFocus!: string | string[];

  @Prop({ required: true })
  CEOControversies!: string;

  @Prop({ required: true })
  CEOImpactOnCompanyStrategy!: string;

  @Prop({ type: [String], required: true })
  CompanyGrowthUnderCurrentCEO!: string[];

  @Prop({ type: MongooseSchema.Types.Mixed })
  CEOEmployeeApprovalRating!: string | string[];

  @Prop({ required: true })
  CEOInterestsAndHobbies!: string;

  @Prop({ required: true })
  CEOPersonalBrandKeywords!: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);


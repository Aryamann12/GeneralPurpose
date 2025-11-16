import { IsString, IsNumber, IsArray } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  CompanyName!: string;

  @IsString()
  IndustryOrSector!: string;

  @IsNumber()
  FoundedYear!: number;

  @IsArray()
  @IsString({ each: true })
  Founders!: string[];

  @IsString()
  HeadquartersLocation!: string;

  @IsString()
  CompanyHistorySummary!: string;

  @IsArray()
  @IsString({ each: true })
  NotableProductsOrServices!: string[];

  @IsString()
  MarketCap!: string;

  @IsString()
  AnnualRevenue!: string;

  @IsString()
  GlobalPresence!: string;

  @IsArray()
  @IsString({ each: true })
  StrategicFocusAreas!: string[];

  @IsArray()
  @IsString({ each: true })
  RecentMajorNews!: string[];

  Competitors!: string | string[];

  @IsArray()
  @IsString({ each: true })
  CompanyCultureTraits!: string[];

  @IsString()
  VisionOrMissionStatement!: string;

  @IsString()
  CEOName!: string;

  @IsString()
  CEOBirthdate!: string;

  @IsString()
  CEOBirthplace!: string;

  @IsArray()
  @IsString({ each: true })
  CEOEducation!: string[];

  @IsArray()
  @IsString({ each: true })
  PreviousRoles!: string[];

  @IsString()
  YearBecameCEO!: string;

  @IsString()
  LeadershipStyle!: string;

  @IsArray()
  @IsString({ each: true })
  KeyPersonalityTraits!: string[];

  @IsArray()
  @IsString({ each: true })
  CEOAchievements!: string[];

  @IsString()
  CEOPublicReputation!: string;

  @IsString()
  CEONetWorth!: string;

  CEOAwards!: string | string[];

  @IsArray()
  @IsString({ each: true })
  CEOQuotes!: string[];

  CEOPhilanthropyFocus!: string | string[];

  @IsString()
  CEOControversies!: string;

  @IsString()
  CEOImpactOnCompanyStrategy!: string;

  @IsArray()
  @IsString({ each: true })
  CompanyGrowthUnderCurrentCEO!: string[];

  CEOEmployeeApprovalRating!: string | string[];

  @IsString()
  CEOInterestsAndHobbies!: string;

  @IsString()
  CEOPersonalBrandKeywords!: string;
}


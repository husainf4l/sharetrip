import { IsString, IsOptional, IsArray, IsNumber, IsBoolean, IsEnum, IsDateString, Min, Max, ArrayMinSize } from 'class-validator';

export enum TourCategory {
  SHARE_TRIP = 'SHARE_TRIP',
  PRIVATE = 'PRIVATE',
  GROUP = 'GROUP',
  TOURS_SIGHTSEEING = 'TOURS_SIGHTSEEING',
  CULTURE_EXPERIENCES = 'CULTURE_EXPERIENCES',
  ADVENTURE_OUTDOORS = 'ADVENTURE_OUTDOORS',
  FOOD_TOURS = 'FOOD_TOURS',
  WALKING_TOURS = 'WALKING_TOURS',
}

export enum CancellationPolicy {
  FLEXIBLE = 'flexible',
  STANDARD = 'standard',
  STRICT = 'strict',
}

export class CreateTourDto {
  @IsString()
  title: string;

  @IsString()
  city: string;

  @IsString()
  country: string;

  @IsEnum(TourCategory)
  category: TourCategory;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsDateString({}, { each: true })
  startTimes: string[];

  @IsNumber()
  @Min(1)
  basePrice: number; // Price in cents

  @IsOptional()
  @IsString()
  currency?: string = 'USD';

  @IsNumber()
  @Min(1)
  minGroup: number;

  @IsNumber()
  @Min(1)
  maxGroup: number;

  @IsNumber()
  @Min(1)
  durationMins: number;

  @IsString()
  language: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  languages?: string[] = [];

  @IsOptional()
  @IsBoolean()
  isPayWhatYouWant?: boolean = false;

  @IsOptional()
  @IsString()
  status?: string = 'draft';

  // Enhanced filtering fields
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  travelStyles?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  accessibility?: string[] = [];

  @IsOptional()
  @IsString()
  startWindow?: string;

  @IsOptional()
  @IsBoolean()
  instantBook?: boolean = false;

  @IsOptional()
  @IsEnum(CancellationPolicy)
  cancellationPolicy?: CancellationPolicy = CancellationPolicy.STANDARD;

  // Location details
  @IsOptional()
  @IsNumber()
  latitude?: number;

  @IsOptional()
  @IsNumber()
  longitude?: number;

  @IsOptional()
  @IsString()
  meetingPoint?: string;

  // SEO and searchability
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  searchKeywords?: string[] = [];

  // Additional tour details
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  whatsIncluded?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  whatsExcluded?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  requirements?: string[] = [];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  highlights?: string[] = [];

  @IsOptional()
  @IsString()
  itinerary?: string;

  @IsOptional()
  @IsString()
  difficulty?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  ageRestriction?: number;
}

import { IsOptional, IsString, IsNumber, IsBoolean, IsArray, IsEnum, Min, Max, IsDateString } from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { TourCategory } from './create-tour.dto';

export class TourQueryDto {
  // Pagination
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @Max(100)
  limit?: number = 10;

  // Search
  @IsOptional()
  @IsString()
  search?: string;

  // Location filters
  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  country?: string;

  // Category filter
  @IsOptional()
  @IsEnum(TourCategory)
  category?: TourCategory;

  // Price range
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  maxPrice?: number;

  // Group size
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  minGroup?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  maxGroup?: number;

  // Duration
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  minDuration?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  maxDuration?: number;

  // Language
  @IsOptional()
  @IsString()
  language?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : value ? [value] : [])
  languages?: string[];

  // Travel styles
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : value ? [value] : [])
  travelStyles?: string[];

  // Accessibility
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : value ? [value] : [])
  accessibility?: string[];

  // Start window
  @IsOptional()
  @IsString()
  startWindow?: string;

  // Instant book
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  instantBook?: boolean;

  // Host rating
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  @Max(5)
  minHostRating?: number;

  // Deal states
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isDropIn?: boolean;

  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  isEarlyBird?: boolean;

  // Status
  @IsOptional()
  @IsString()
  status?: string;

  // Sorting
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';

  // Date filters
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  // Tags
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @Transform(({ value }) => Array.isArray(value) ? value : value ? [value] : [])
  tags?: string[];
}

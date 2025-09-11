import { IsOptional, IsString, IsNumber, IsEnum, Min, Max, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus } from './create-booking.dto';

export class BookingQueryDto {
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

  // Filters
  @IsOptional()
  @IsString()
  tourId?: string;

  @IsOptional()
  @IsString()
  travelerId?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  // Price range
  @IsOptional()
  @Type(() => Number)
  @Min(0)
  minPrice?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(0)
  maxPrice?: number;

  // Headcount
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  minHeadcount?: number;

  @IsOptional()
  @Type(() => Number)
  @Min(1)
  maxHeadcount?: number;

  // Date filters
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  // Sorting
  @IsOptional()
  @IsString()
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}

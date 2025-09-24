import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  IsArray,
  IsObject,
  Min,
  Max,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateAccommodationDto {
  // Updated to allow additional fields
  @ApiProperty({ description: 'Title of the accommodation' })
  @IsString()
  title: string;

  @ApiPropertyOptional({ description: 'Description of the accommodation' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Category ID of the accommodation' })
  @IsString()
  categoryId: string;

  @ApiProperty({ description: 'City where the accommodation is located' })
  @IsString()
  city: string;

  @ApiProperty({ description: 'Country where the accommodation is located' })
  @IsString()
  country: string;

  @ApiPropertyOptional({ description: 'Address of the accommodation' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Latitude coordinate' })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({ description: 'Longitude coordinate' })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiProperty({ description: 'Base price in cents' })
  @IsNumber()
  @Min(0)
  basePrice: number;

  @ApiPropertyOptional({ description: 'Currency code', default: 'USD' })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ description: 'Maximum number of guests' })
  @IsNumber()
  @Min(1)
  maxGuests: number;

  @ApiPropertyOptional({ description: 'Number of bedrooms' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bedrooms?: number;

  @ApiPropertyOptional({ description: 'Number of bathrooms' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  bathrooms?: number;

  @ApiPropertyOptional({ description: 'Amenities available' })
  @IsOptional()
  amenities?: any;

  @ApiPropertyOptional({ description: 'Images of the accommodation' })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiPropertyOptional({ description: 'Room types available' })
  @IsOptional()
  @IsArray()
  roomTypes?: any[]; // Complex RoomType objects

  @ApiPropertyOptional({ description: 'Languages spoken by host' })
  @IsOptional()
  @IsArray()
  languagesSpoken?: string[];

  @ApiPropertyOptional({ description: 'Neighborhood highlights' })
  @IsOptional()
  @IsArray()
  neighborhoodHighlights?: string[];

  @ApiPropertyOptional({ description: 'Room size in square meters' })
  @IsOptional()
  roomSize?: any; // JSON field - can be number or complex object

  @ApiPropertyOptional({ description: 'Check-in and check-out times' })
  @IsOptional()
  @IsObject()
  checkInOutTimes?: {
    checkInTime?: string;
    checkOutTime?: string;
    earlyCheckIn?: boolean;
    lateCheckOut?: boolean;
    earlyCheckInFee?: number;
    lateCheckOutFee?: number;
  };

  @ApiPropertyOptional({ description: 'Cancellation policy' })
  @IsOptional()
  @IsString()
  cancellationPolicy?: string;

  @ApiPropertyOptional({ description: 'Safety compliance information' })
  @IsOptional()
  @IsObject()
  safetyCompliance?: {
    smokeDetectors?: boolean;
    carbonMonoxideDetectors?: boolean;
    firstAidKit?: boolean;
    fireExtinguishers?: boolean;
    securityCameras?: boolean;
    emergencyContact?: string;
  };

  @ApiPropertyOptional({ description: 'Star rating (1-5)' })
  @IsOptional()
  starRating?: any; // JSON field - can be number or complex object

  @ApiPropertyOptional({ description: 'Host ID (set automatically)' })
  @IsOptional()
  @IsString()
  hostId?: string;

  @ApiPropertyOptional({ description: 'Whether the accommodation is available', default: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({ description: 'Status of the accommodation', default: 'active' })
  @IsOptional()
  @IsString()
  status?: string;
}
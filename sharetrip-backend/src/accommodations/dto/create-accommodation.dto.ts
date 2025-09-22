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
  @IsObject()
  amenities?: any;

  @ApiPropertyOptional({ description: 'Images of the accommodation' })
  @IsOptional()
  @IsArray()
  images?: string[];

  @ApiPropertyOptional({ description: 'Whether the accommodation is available', default: true })
  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;

  @ApiPropertyOptional({ description: 'Status of the accommodation', default: 'active' })
  @IsOptional()
  @IsString()
  status?: string;
}
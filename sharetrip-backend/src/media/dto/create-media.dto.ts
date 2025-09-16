import { IsString, IsEnum, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export class CreateMediaDto {
  @ApiProperty({
    description: 'ID of the tour this media belongs to',
    example: '17ee3bd4-8220-4e84-9456-bd35e62149a1'
  })
  @IsString()
  @IsNotEmpty()
  tourId: string;

  @ApiProperty({
    description: 'Type of media',
    enum: MediaType,
    example: MediaType.IMAGE
  })
  @IsEnum(MediaType)
  type: MediaType;

  @ApiProperty({
    description: 'Storage key from presigned upload',
    example: 'tours/uuid/1234567890-uuid.jpg'
  })
  @IsString()
  @IsNotEmpty()
  storageKey: string;

  @ApiProperty({
    description: 'Optional direct URL (if not using storageKey)',
    example: 'https://bucket.s3.region.amazonaws.com/tours/uuid/file.jpg',
    required: false
  })
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty({
    description: 'Alt text for accessibility',
    example: 'Beautiful mountain view during sunset',
    required: false
  })
  @IsOptional()
  @IsString()
  alt?: string;

  @ApiProperty({
    description: 'Poster/thumbnail URL for videos',
    example: 'https://bucket.s3.region.amazonaws.com/tours/uuid/thumbnail.jpg',
    required: false
  })
  @IsOptional()
  @IsString()
  poster?: string;
}

export class MediaResponseDto {
  @ApiProperty({
    description: 'Media ID',
    example: '12345678-1234-1234-1234-123456789012'
  })
  id: string;

  @ApiProperty({
    description: 'Media type',
    enum: MediaType,
    example: MediaType.IMAGE
  })
  type: MediaType;

  @ApiProperty({
    description: 'Public URL of the media file',
    example: 'https://bucket.s3.region.amazonaws.com/tours/uuid/file.jpg'
  })
  src: string;

  @ApiProperty({
    description: 'Alt text for accessibility',
    example: 'Beautiful mountain view during sunset',
    required: false
  })
  alt?: string;

  @ApiProperty({
    description: 'Poster/thumbnail URL for videos',
    example: 'https://bucket.s3.region.amazonaws.com/tours/uuid/thumbnail.jpg',
    required: false
  })
  poster?: string;

  @ApiProperty({
    description: 'Creation timestamp',
    example: '2025-01-15T10:30:00.000Z'
  })
  createdAt: Date;
}
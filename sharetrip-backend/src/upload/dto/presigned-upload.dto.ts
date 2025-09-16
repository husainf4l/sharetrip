import { IsString, IsOptional, IsNotEmpty, Matches } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePresignedUploadDto {
  @ApiProperty({
    description: 'Original file name with extension',
    example: 'tour-image.jpg'
  })
  @IsString()
  @IsNotEmpty()
  fileName: string;

  @ApiProperty({
    description: 'MIME type of the file (must start with "image/")',
    example: 'image/jpeg'
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^image\//, { message: 'Only image files are allowed' })
  contentType: string;

  @ApiProperty({
    description: 'Optional tour ID to associate the media with',
    example: 'uuid-tour-id',
    required: false
  })
  @IsOptional()
  @IsString()
  tourId?: string;
}

export class PresignedUploadResponseDto {
  @ApiProperty({
    description: 'Presigned URL for uploading the file',
    example: 'https://bucket.s3.region.amazonaws.com/key?X-Amz-Algorithm=...'
  })
  uploadUrl: string;

  @ApiProperty({
    description: 'Public URL where the file will be accessible after upload',
    example: 'https://bucket.s3.region.amazonaws.com/tours/uuid/file.jpg'
  })
  publicUrl: string;

  @ApiProperty({
    description: 'Storage key/path of the file',
    example: 'tours/uuid/1234567890-uuid.jpg'
  })
  key: string;

  @ApiProperty({
    description: 'URL expiration time in seconds',
    example: 3600,
    required: false
  })
  expiresIn?: number;
}
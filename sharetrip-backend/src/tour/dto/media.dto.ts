import { IsString, IsEnum } from 'class-validator';

export enum MediaType {
  IMAGE = 'image',
  VIDEO = 'video',
}

export class TourMediaDto {
  @IsString()
  id: string;

  @IsString()
  url: string;

  @IsEnum(MediaType)
  type: MediaType;

  @IsString()
  tourId: string;
}

export class UploadMediaResponseDto {
  message: string;
  uploadedCount: number;
  media: {
    url: string;
    type: string;
  }[];
}

export class DeleteMediaResponseDto {
  message: string;
}
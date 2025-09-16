import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '../common/s3/s3.service';
import { CreateMediaDto, MediaResponseDto, MediaType } from './dto/create-media.dto';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
  ) {}

  async createMedia(createMediaDto: CreateMediaDto): Promise<MediaResponseDto> {
    const { tourId, type, storageKey, url } = createMediaDto;

    // Verify tour exists
    const tour = await this.prisma.tour.findUnique({
      where: { id: tourId },
      select: { id: true },
    });

    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }

    // Generate public URL if not provided
    const publicUrl = url || this.generatePublicUrl(storageKey);

    try {
      const media = await this.prisma.tourMedia.create({
        data: {
          tourId,
          type,
          url: publicUrl,
        },
      });

      return this.transformToResponseDto(media, createMediaDto.alt, createMediaDto.poster);
    } catch (error) {
      throw new BadRequestException(`Failed to create media: ${error.message}`);
    }
  }

  async getTourMedia(tourId: string): Promise<MediaResponseDto[]> {
    // Verify tour exists
    const tour = await this.prisma.tour.findUnique({
      where: { id: tourId },
      select: { id: true },
    });

    if (!tour) {
      throw new NotFoundException(`Tour with ID ${tourId} not found`);
    }

    const media = await this.prisma.tourMedia.findMany({
      where: { tourId },
    });

    return media.map(item => this.transformToResponseDto(item));
  }

  async deleteMedia(mediaId: string): Promise<void> {
    const media = await this.prisma.tourMedia.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new NotFoundException(`Media with ID ${mediaId} not found`);
    }

    try {
      // Delete from storage if S3
      const storageType = this.configService.get<string>('MEDIA_STORAGE', 's3');
      if (storageType === 's3' && media.url) {
        try {
          await this.s3Service.deleteFile(media.url);
        } catch (error) {
          console.warn(`Failed to delete file from S3: ${error.message}`);
        }
      }

      // Delete from database
      await this.prisma.tourMedia.delete({
        where: { id: mediaId },
      });
    } catch (error) {
      throw new BadRequestException(`Failed to delete media: ${error.message}`);
    }
  }

  private generatePublicUrl(storageKey: string): string {
    const storageType = this.configService.get<string>('MEDIA_STORAGE', 's3');

    if (storageType === 's3') {
      return this.s3Service.getPublicUrl(storageKey);
    } else {
      const baseUrl = this.configService.get<string>('BASE_URL', 'http://localhost:3003');
      return `${baseUrl}/uploads/${storageKey}`;
    }
  }

  private transformToResponseDto(media: any, alt?: string, poster?: string): MediaResponseDto {
    return {
      id: media.id,
      type: media.type as MediaType,
      src: media.url,
      alt: alt || `${media.type} for tour`,
      poster: poster || undefined,
      createdAt: new Date(), // Since TourMedia doesn't have createdAt, use current time
    };
  }

  async getMediaById(mediaId: string): Promise<MediaResponseDto> {
    const media = await this.prisma.tourMedia.findUnique({
      where: { id: mediaId },
    });

    if (!media) {
      throw new NotFoundException(`Media with ID ${mediaId} not found`);
    }

    return this.transformToResponseDto(media);
  }

  async updateMedia(mediaId: string, updateData: Partial<CreateMediaDto>): Promise<MediaResponseDto> {
    const existingMedia = await this.prisma.tourMedia.findUnique({
      where: { id: mediaId },
    });

    if (!existingMedia) {
      throw new NotFoundException(`Media with ID ${mediaId} not found`);
    }

    const updatedMedia = await this.prisma.tourMedia.update({
      where: { id: mediaId },
      data: {
        ...updateData,
        url: updateData.storageKey ? this.generatePublicUrl(updateData.storageKey) : existingMedia.url,
      },
    });

    return this.transformToResponseDto(updatedMedia);
  }
}
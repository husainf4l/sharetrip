import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, Accommodation } from '@prisma/client';
import { CreateAccommodationDto, UpdateAccommodationDto } from './dto';
import { S3Service } from '../common/s3/s3.service';

@Injectable()
export class AccommodationsService {
  constructor(
    private prisma: PrismaService,
    private s3Service: S3Service,
  ) {}

  async getCategories(): Promise<Category[]> {
    return this.prisma.category.findMany({
      orderBy: {
        type: 'asc',
      },
    });
  }

  async getCategoryByType(type: string): Promise<Category> {
    const category = await this.prisma.category.findUnique({
      where: { type },
    });

    if (!category) {
      throw new NotFoundException(`Category with type "${type}" not found`);
    }

    return category;
  }

  async getAccommodationsByCategory(categoryType: string): Promise<Accommodation[]> {
    const category = await this.prisma.category.findUnique({
      where: { type: categoryType },
    });

    if (!category) {
      throw new NotFoundException(`Category with type "${categoryType}" not found`);
    }

    return this.prisma.accommodation.findMany({
      where: {
        categoryId: category.id,
        isPublished: true,
        isAvailable: true,
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAllAccommodations(): Promise<Accommodation[]> {
    return this.prisma.accommodation.findMany({
      where: {
        isAvailable: true,
        status: 'active',
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async getAccommodationById(id: string): Promise<Accommodation> {
    const accommodation = await this.prisma.accommodation.findUnique({
      where: { id, isPublished: true },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        category: true,
        bookings: {
          where: {
            status: 'confirmed',
          },
          select: {
            checkIn: true,
            checkOut: true,
          },
        },
      },
    });

    if (!accommodation) {
      throw new NotFoundException(`Accommodation with ID "${id}" not found`);
    }

    return accommodation;
  }

  async createAccommodation(createAccommodationDto: CreateAccommodationDto, hostId: string, photos?: Express.Multer.File[]): Promise<Accommodation> {
    // Handle images: prioritize uploaded photos, fall back to images from DTO
    let imageUrls: string[] = [];

    if (photos && photos.length > 0) {
      // Upload photos from files
      try {
        const uploadPromises = photos.map(photo => this.s3Service.uploadFile(photo, 'accommodations'));
        imageUrls = await Promise.all(uploadPromises);
      } catch (error) {
        console.error('Failed to upload accommodation photos:', error);
        // Continue without photos if upload fails
      }
    } else if (createAccommodationDto.images && createAccommodationDto.images.length > 0) {
      // Use images from DTO if no files were uploaded
      imageUrls = createAccommodationDto.images;
    }

    // Remove images from DTO data before creating accommodation
    const { images, ...accommodationData } = createAccommodationDto;

    const accommodation = await this.prisma.accommodation.create({
      data: {
        ...accommodationData,
        hostId,
        isPublished: true,
        currency: createAccommodationDto.currency || 'USD',
        isAvailable: createAccommodationDto.isAvailable ?? true,
        status: createAccommodationDto.status || 'active',
        images: imageUrls.length > 0 ? imageUrls : undefined,
      },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        category: true,
      },
    });

    return accommodation;
  }

  async updateAccommodation(id: string, updateAccommodationDto: UpdateAccommodationDto, hostId: string): Promise<Accommodation> {
    // First check if the accommodation exists and belongs to the host
    const existingAccommodation = await this.prisma.accommodation.findUnique({
      where: { id },
      select: { hostId: true },
    });

    if (!existingAccommodation) {
      throw new NotFoundException(`Accommodation with ID "${id}" not found`);
    }

    if (existingAccommodation.hostId !== hostId) {
      throw new ForbiddenException('You can only update your own accommodations');
    }

    const accommodation = await this.prisma.accommodation.update({
      where: { id },
      data: updateAccommodationDto,
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        category: true,
      },
    });

    return accommodation;
  }

  async deleteAccommodation(id: string, hostId: string): Promise<void> {
    // First check if the accommodation exists and belongs to the host
    const existingAccommodation = await this.prisma.accommodation.findUnique({
      where: { id },
      select: { hostId: true },
    });

    if (!existingAccommodation) {
      throw new NotFoundException(`Accommodation with ID "${id}" not found`);
    }

    if (existingAccommodation.hostId !== hostId) {
      throw new ForbiddenException('You can only delete your own accommodations');
    }

    await this.prisma.accommodation.delete({
      where: { id },
    });
  }

  async getHostAccommodations(hostId: string): Promise<Accommodation[]> {
    return this.prisma.accommodation.findMany({
      where: { hostId },
      include: {
        host: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        category: true,
        bookings: {
          select: {
            id: true,
            status: true,
            checkIn: true,
            checkOut: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}

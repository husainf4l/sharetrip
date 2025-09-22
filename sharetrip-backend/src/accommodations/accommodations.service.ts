import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, Accommodation } from '@prisma/client';
import { CreateAccommodationDto, UpdateAccommodationDto } from './dto';

@Injectable()
export class AccommodationsService {
  constructor(private prisma: PrismaService) {}

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
      where: { id },
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

  async createAccommodation(createAccommodationDto: CreateAccommodationDto, hostId: string): Promise<Accommodation> {
    const accommodation = await this.prisma.accommodation.create({
      data: {
        ...createAccommodationDto,
        hostId,
        currency: createAccommodationDto.currency || 'USD',
        isAvailable: createAccommodationDto.isAvailable ?? true,
        status: createAccommodationDto.status || 'active',
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

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Category, Accommodation } from '@prisma/client';

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
}

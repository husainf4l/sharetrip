import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToWishlistDto, WishlistResponseDto } from './dto';

@Injectable()
export class WishlistService {
  constructor(private prisma: PrismaService) {}

  async getWishlist(userId: string): Promise<WishlistResponseDto> {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
      include: {
        tours: {
          include: {
            tour: {
              select: {
                id: true,
                title: true,
                city: true,
                country: true,
                basePrice: true,
                currency: true,
                category: true,
                description: true,
                media: {
                  select: {
                    id: true,
                    url: true,
                    type: true,
                  },
                },
              },
            },
          },
          orderBy: { addedAt: 'desc' },
        },
      },
    });

    if (!wishlist) {
      // Create empty wishlist if it doesn't exist
      const newWishlist = await this.prisma.wishlist.create({
        data: { userId },
        include: {
          tours: {
            include: {
              tour: {
                select: {
                  id: true,
                  title: true,
                  city: true,
                  country: true,
                  basePrice: true,
                  currency: true,
                  category: true,
                  description: true,
                  media: {
                    select: {
                      id: true,
                      url: true,
                      type: true,
                    },
                  },
                },
              },
            },
            orderBy: { addedAt: 'desc' },
          },
        },
      });
      return this.formatWishlistResponse(newWishlist);
    }

    return this.formatWishlistResponse(wishlist);
  }

  async addToWishlist(userId: string, addToWishlistDto: AddToWishlistDto): Promise<WishlistResponseDto> {
    const { tourId } = addToWishlistDto;

    // Verify tour exists
    const tour = await this.prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    // Get or create wishlist
    let wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      wishlist = await this.prisma.wishlist.create({
        data: { userId },
      });
    }

    // Check if tour is already in wishlist
    const existingItem = await this.prisma.wishlistItem.findUnique({
      where: {
        wishlistId_tourId: {
          wishlistId: wishlist.id,
          tourId,
        },
      },
    });

    if (existingItem) {
      throw new ConflictException('Tour is already in your wishlist');
    }

    // Add tour to wishlist
    await this.prisma.wishlistItem.create({
      data: {
        wishlistId: wishlist.id,
        tourId,
      },
    });

    return this.getWishlist(userId);
  }

  async removeFromWishlist(userId: string, tourId: string): Promise<WishlistResponseDto> {
    // Find the wishlist
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    // Find and remove the wishlist item
    const wishlistItem = await this.prisma.wishlistItem.findUnique({
      where: {
        wishlistId_tourId: {
          wishlistId: wishlist.id,
          tourId,
        },
      },
    });

    if (!wishlistItem) {
      throw new NotFoundException('Tour not found in wishlist');
    }

    await this.prisma.wishlistItem.delete({
      where: { id: wishlistItem.id },
    });

    return this.getWishlist(userId);
  }

  async clearWishlist(userId: string): Promise<void> {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });

    if (wishlist) {
      await this.prisma.wishlistItem.deleteMany({
        where: { wishlistId: wishlist.id },
      });
    }
  }

  async isInWishlist(userId: string, tourId: string): Promise<boolean> {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { userId },
    });

    if (!wishlist) {
      return false;
    }

    const item = await this.prisma.wishlistItem.findUnique({
      where: {
        wishlistId_tourId: {
          wishlistId: wishlist.id,
          tourId,
        },
      },
    });

    return !!item;
  }

  private formatWishlistResponse(wishlist: any): WishlistResponseDto {
    return {
      id: wishlist.id,
      userId: wishlist.userId,
      tours: wishlist.tours.map(item => ({
        id: item.id,
        tourId: item.tourId,
        tour: item.tour,
        addedAt: item.addedAt,
      })),
      createdAt: wishlist.createdAt,
      updatedAt: wishlist.updatedAt,
    };
  }
}
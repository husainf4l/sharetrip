import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddToCartDto, UpdateCartItemDto, ApplyPromoCodeDto, CartResponseDto } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: string): Promise<CartResponseDto> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            tour: {
              select: {
                id: true,
                title: true,
                city: true,
                country: true,
                basePrice: true,
                currency: true,
                maxGroup: true,
                minGroup: true,
              },
            },
          },
        },
      },
    });

    if (!cart) {
      // Create empty cart if it doesn't exist
      const newCart = await this.prisma.cart.create({
        data: { userId },
        include: {
          items: {
            include: {
              tour: {
                select: {
                  id: true,
                  title: true,
                  city: true,
                  country: true,
                  basePrice: true,
                  currency: true,
                  maxGroup: true,
                  minGroup: true,
                },
              },
            },
          },
        },
      });
      return this.formatCartResponse(newCart);
    }

    return this.formatCartResponse(cart);
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<CartResponseDto> {
    const { tourId, quantity, headcount, startTime } = addToCartDto;

    // Verify tour exists and is available
    const tour = await this.prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    if (tour.status !== 'published' && tour.status !== 'approved') {
      // Also check trimmed status to handle whitespace issues
      const trimmedStatus = tour.status?.trim().toLowerCase();
      if (trimmedStatus !== 'published' && trimmedStatus !== 'approved') {
        throw new BadRequestException('Tour is not available for booking');
      }
    }

    // Check availability
    await this.checkTourAvailability(tourId, headcount);

    // Get or create cart
    let cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await this.prisma.cart.create({
        data: { userId },
      });
    }

    // Check if item already exists in cart
    const existingItem = await this.prisma.cartItem.findUnique({
      where: {
        cartId_tourId: {
          cartId: cart.id,
          tourId,
        },
      },
    });

    if (existingItem) {
      // Update existing item
      await this.prisma.cartItem.update({
        where: { id: existingItem.id },
        data: {
          quantity: existingItem.quantity + quantity,
          headcount,
          startTime: startTime ? new Date(startTime) : null,
        },
      });
    } else {
      // Add new item
      await this.prisma.cartItem.create({
        data: {
          cartId: cart.id,
          tourId,
          quantity,
          headcount,
          priceAtAdd: tour.basePrice,
          startTime: startTime ? new Date(startTime) : null,
        },
      });
    }

    // Recalculate cart total
    await this.recalculateCartTotal(cart.id);

    return this.getCart(userId);
  }

  async updateCartItem(
    userId: string,
    itemId: string,
    updateDto: UpdateCartItemDto,
  ): Promise<CartResponseDto> {
    const { quantity, headcount, startTime } = updateDto;

    // Find the cart item and verify ownership
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.cart.userId !== userId) {
      throw new BadRequestException('Unauthorized to modify this cart item');
    }

    // Check availability
    await this.checkTourAvailability(cartItem.tourId, headcount);

    // Update the item
    await this.prisma.cartItem.update({
      where: { id: itemId },
      data: {
        quantity,
        headcount,
        startTime: startTime ? new Date(startTime) : null,
      },
    });

    // Recalculate cart total
    await this.recalculateCartTotal(cartItem.cartId);

    return this.getCart(userId);
  }

  async removeFromCart(userId: string, itemId: string): Promise<CartResponseDto> {
    // Find the cart item and verify ownership
    const cartItem = await this.prisma.cartItem.findUnique({
      where: { id: itemId },
      include: { cart: true },
    });

    if (!cartItem) {
      throw new NotFoundException('Cart item not found');
    }

    if (cartItem.cart.userId !== userId) {
      throw new BadRequestException('Unauthorized to modify this cart item');
    }

    // Remove the item
    await this.prisma.cartItem.delete({
      where: { id: itemId },
    });

    // Recalculate cart total
    await this.recalculateCartTotal(cartItem.cartId);

    return this.getCart(userId);
  }

  async clearCart(userId: string): Promise<void> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (cart) {
      await this.prisma.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      await this.prisma.cart.update({
        where: { id: cart.id },
        data: { total: 0, discount: 0, promoCode: null },
      });
    }
  }

  async applyPromoCode(userId: string, promoDto: ApplyPromoCodeDto): Promise<CartResponseDto> {
    const { promoCode } = promoDto;

    // For now, implement a simple promo code logic
    // In a real application, you'd have a PromoCode table
    const validPromoCodes = {
      'SAVE10': 0.1, // 10% discount
      'SAVE20': 0.2, // 20% discount
      'WELCOME': 0.15, // 15% discount
    };

    const discountRate = validPromoCodes[promoCode.toUpperCase()];

    if (!discountRate) {
      throw new BadRequestException('Invalid promo code');
    }

    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    if (cart.items.length === 0) {
      throw new BadRequestException('Cart is empty');
    }

    // Calculate subtotal
    const subtotal = cart.items.reduce(
      (sum, item) => sum + (item.priceAtAdd * item.quantity),
      0,
    );

    const discount = Math.round(subtotal * discountRate);

    await this.prisma.cart.update({
      where: { id: cart.id },
      data: {
        promoCode: promoCode.toUpperCase(),
        discount,
        total: subtotal - discount,
      },
    });

    return this.getCart(userId);
  }

  async removePromoCode(userId: string): Promise<CartResponseDto> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    await this.prisma.cart.update({
      where: { id: cart.id },
      data: {
        promoCode: null,
        discount: 0,
      },
    });

    await this.recalculateCartTotal(cart.id);

    return this.getCart(userId);
  }

  private async checkTourAvailability(tourId: string, requestedHeadcount: number): Promise<void> {
    const tour = await this.prisma.tour.findUnique({
      where: { id: tourId },
    });

    if (!tour) {
      throw new NotFoundException('Tour not found');
    }

    // Count confirmed bookings
    const confirmedBookings = await this.prisma.booking.findMany({
      where: {
        tourId,
        status: 'confirmed',
      },
      select: { headcount: true },
    });

    const totalConfirmedHeadcount = confirmedBookings.reduce(
      (sum, booking) => sum + booking.headcount,
      0,
    );

    const availableSpots = tour.maxGroup - totalConfirmedHeadcount;

    if (requestedHeadcount > availableSpots) {
      throw new BadRequestException(
        `Not enough spots available. Only ${availableSpots} spots left for this tour.`,
      );
    }
  }

  private async recalculateCartTotal(cartId: string): Promise<void> {
    const cart = await this.prisma.cart.findUnique({
      where: { id: cartId },
      include: { items: true },
    });

    if (!cart) return;

    const subtotal = cart.items.reduce(
      (sum, item) => sum + (item.priceAtAdd * item.quantity),
      0,
    );

    const total = subtotal - cart.discount;

    await this.prisma.cart.update({
      where: { id: cartId },
      data: { total: Math.max(0, total) },
    });
  }

  private formatCartResponse(cart: any): CartResponseDto {
    return {
      id: cart.id,
      userId: cart.userId,
      items: cart.items.map(item => ({
        id: item.id,
        tourId: item.tourId,
        tour: item.tour,
        quantity: item.quantity,
        headcount: item.headcount,
        priceAtAdd: item.priceAtAdd,
        startTime: item.startTime,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      })),
      promoCode: cart.promoCode,
      discount: cart.discount,
      total: cart.total,
      createdAt: cart.createdAt,
      updatedAt: cart.updatedAt,
    };
  }
}
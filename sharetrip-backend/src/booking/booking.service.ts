import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto, UpdateBookingDto, BookingQueryDto, BookingStatus } from './dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class BookingService {
  constructor(private prisma: PrismaService) {}

  async create(createBookingDto: CreateBookingDto, travelerId: string) {
    try {
      // Verify tour exists and is available
      const tour = await this.prisma.tour.findUnique({
        where: { id: createBookingDto.tourId },
        include: {
          guide: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!tour) {
        throw new NotFoundException('Tour not found');
      }

      if (tour.status !== 'published') {
        throw new BadRequestException('Tour is not available for booking');
      }

      // Verify traveler exists
      const traveler = await this.prisma.user.findUnique({
        where: { id: travelerId },
      });

      if (!traveler) {
        throw new NotFoundException('Traveler not found');
      }

      // Check if traveler is trying to book their own tour
      if (tour.guide.userId === travelerId) {
        throw new BadRequestException('You cannot book your own tour');
      }

      // Check group size constraints
      if (createBookingDto.headcount < tour.minGroup || createBookingDto.headcount > tour.maxGroup) {
        throw new BadRequestException(
          `Headcount must be between ${tour.minGroup} and ${tour.maxGroup}`
        );
      }

      // Calculate price at booking (tour base price * headcount)
      const priceAtBooking = tour.basePrice * createBookingDto.headcount;

      // Check for existing booking by same traveler for same tour
      const existingBooking = await this.prisma.booking.findFirst({
        where: {
          tourId: createBookingDto.tourId,
          travelerId,
          status: {
            in: ['pending', 'confirmed'],
          },
        },
      });

      if (existingBooking) {
        throw new ConflictException('You already have a booking for this tour');
      }

      const booking = await this.prisma.booking.create({
        data: {
          tourId: createBookingDto.tourId,
          travelerId,
          headcount: createBookingDto.headcount,
          priceAtBooking,
          status: 'pending',
        },
        include: {
          tour: {
            include: {
              guide: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true,
                    },
                  },
                },
              },
              media: true,
            },
          },
          traveler: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return booking;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException('Invalid tour or traveler ID');
        }
      }
      throw error;
    }
  }

  async findAll(query: BookingQueryDto) {
    const {
      page = 1,
      limit = 10,
      tourId,
      travelerId,
      status,
      minPrice,
      maxPrice,
      minHeadcount,
      maxHeadcount,
      startDate,
      endDate,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = query;

    const skip = (page - 1) * limit;

    // Build where clause
    const where: Prisma.BookingWhereInput = {};

    if (tourId) {
      where.tourId = tourId;
    }

    if (travelerId) {
      where.travelerId = travelerId;
    }

    if (status) {
      where.status = status;
    }

    // Price range
    if (minPrice !== undefined || maxPrice !== undefined) {
      where.priceAtBooking = {};
      if (minPrice !== undefined) where.priceAtBooking.gte = minPrice;
      if (maxPrice !== undefined) where.priceAtBooking.lte = maxPrice;
    }

    // Headcount range
    if (minHeadcount !== undefined || maxHeadcount !== undefined) {
      where.headcount = {};
      if (minHeadcount !== undefined) where.headcount.gte = minHeadcount;
      if (maxHeadcount !== undefined) where.headcount.lte = maxHeadcount;
    }

    // Date filters
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate);
      if (endDate) where.createdAt.lte = new Date(endDate);
    }

    // Build order by
    const orderBy: Prisma.BookingOrderByWithRelationInput = {};
    orderBy[sortBy] = sortOrder;

    const [bookings, total] = await Promise.all([
      this.prisma.booking.findMany({
        where,
        skip,
        take: limit,
        orderBy,
        include: {
          tour: {
            include: {
              guide: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true,
                    },
                  },
                },
              },
              media: true,
            },
          },
          traveler: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      }),
      this.prisma.booking.count({ where }),
    ]);

    return {
      data: bookings,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        tour: {
          include: {
            guide: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
            media: true,
            bookings: {
              where: {
                status: 'confirmed',
              },
              select: {
                id: true,
                headcount: true,
              },
            },
          },
        },
        traveler: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async findByTraveler(travelerId: string, query: BookingQueryDto) {
    const bookingsQuery = { ...query, travelerId };
    return this.findAll(bookingsQuery);
  }

  async findByTour(tourId: string, query: BookingQueryDto) {
    const bookingsQuery = { ...query, tourId };
    return this.findAll(bookingsQuery);
  }

  async update(id: string, updateBookingDto: UpdateBookingDto, userId?: string) {
    // Verify booking exists
    const existingBooking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        tour: {
          include: {
            guide: true,
          },
        },
        traveler: true,
      },
    });

    if (!existingBooking) {
      throw new NotFoundException('Booking not found');
    }

    // Authorization check: only the traveler can update their booking
    if (userId && existingBooking.travelerId !== userId) {
      throw new BadRequestException('You do not have permission to update this booking');
    }

    // Validate headcount if being updated
    if (updateBookingDto.headcount !== undefined) {
      if (updateBookingDto.headcount < existingBooking.tour.minGroup ||
          updateBookingDto.headcount > existingBooking.tour.maxGroup) {
        throw new BadRequestException(
          `Headcount must be between ${existingBooking.tour.minGroup} and ${existingBooking.tour.maxGroup}`
        );
      }

      // Recalculate price if headcount changes
      const newPrice = existingBooking.tour.basePrice * updateBookingDto.headcount;
      updateBookingDto = { ...updateBookingDto, priceAtBooking: newPrice } as any;
    }

    try {
      const booking = await this.prisma.booking.update({
        where: { id },
        data: updateBookingDto,
        include: {
          tour: {
            include: {
              guide: {
                include: {
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true,
                    },
                  },
                },
              },
              media: true,
            },
          },
          traveler: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
        },
      });

      return booking;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Booking not found');
        }
      }
      throw error;
    }
  }

  async remove(id: string, userId?: string) {
    // Verify booking exists
    const existingBooking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        tour: true,
        traveler: true,
      },
    });

    if (!existingBooking) {
      throw new NotFoundException('Booking not found');
    }



    // Only allow deletion of pending bookings
    if (existingBooking.status !== 'pending') {
      throw new BadRequestException('Only pending bookings can be deleted');
    }

    try {
      await this.prisma.booking.delete({
        where: { id },
      });

      return { message: 'Booking deleted successfully' };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Booking not found');
        }
      }
      throw error;
    }
  }

  async confirmBooking(id: string, userId: string) {
    // Only tour guide can confirm bookings
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        tour: {
          include: {
            guide: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.tour.guide.userId !== userId) {
      throw new BadRequestException('Only the tour guide can confirm bookings');
    }

    if (booking.status !== 'pending') {
      throw new BadRequestException('Only pending bookings can be confirmed');
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'confirmed' },
      include: {
        tour: {
          include: {
            guide: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
            media: true,
          },
        },
        traveler: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
  }

  async cancelBooking(id: string, userId: string) {
    // Both traveler and guide can cancel bookings
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        tour: {
          include: {
            guide: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.travelerId !== userId && booking.tour.guide.userId !== userId) {
      throw new BadRequestException('You do not have permission to cancel this booking');
    }

    if (booking.status === 'cancelled') {
      throw new BadRequestException('Booking is already cancelled');
    }

    if (booking.status === 'completed') {
      throw new BadRequestException('Cannot cancel a completed booking');
    }

    return this.prisma.booking.update({
      where: { id },
      data: { status: 'cancelled' },
      include: {
        tour: {
          include: {
            guide: {
              include: {
                user: {
                  select: {
                    id: true,
                    name: true,
                    email: true,
                    image: true,
                  },
                },
              },
            },
            media: true,
          },
        },
        traveler: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });
  }

  async getBookingStats(tourId?: string, guideId?: string) {
    const where: Prisma.BookingWhereInput = {};

    if (tourId) {
      where.tourId = tourId;
    }

    if (guideId) {
      where.tour = {
        guide: {
          userId: guideId,
        },
      };
    }

    const bookings = await this.prisma.booking.findMany({
      where,
      select: {
        status: true,
        priceAtBooking: true,
        headcount: true,
        createdAt: true,
      },
    });

    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === 'confirmed').length;
    const cancelledBookings = bookings.filter(b => b.status === 'cancelled').length;
    const totalRevenue = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + b.priceAtBooking, 0);
    const totalParticipants = bookings
      .filter(b => b.status === 'confirmed')
      .reduce((sum, b) => sum + b.headcount, 0);

    return {
      totalBookings,
      confirmedBookings,
      cancelledBookings,
      totalRevenue,
      totalParticipants,
      confirmationRate: totalBookings > 0 ? Math.round((confirmedBookings / totalBookings) * 100) : 0,
      averageBookingValue: confirmedBookings > 0 ? Math.round(totalRevenue / confirmedBookings) : 0,
      averageGroupSize: confirmedBookings > 0 ? Math.round(totalParticipants / confirmedBookings) : 0,
    };
  }

  private async validateStatusTransition(currentStatus: string, newStatus: string, isGuide: boolean) {
    const validTransitions = {
      pending: ['confirmed', 'cancelled'],
      confirmed: ['cancelled', 'completed'],
      cancelled: [], // Cannot change from cancelled
      completed: [], // Cannot change from completed
    };

    if (!validTransitions[currentStatus]?.includes(newStatus)) {
      throw new BadRequestException(`Cannot change booking status from ${currentStatus} to ${newStatus}`);
    }

    // Only guides can confirm bookings
    if (newStatus === 'confirmed' && !isGuide) {
      throw new BadRequestException('Only tour guides can confirm bookings');
    }

    // Only guides can mark bookings as completed
    if (newStatus === 'completed' && !isGuide) {
      throw new BadRequestException('Only tour guides can mark bookings as completed');
    }
  }
}

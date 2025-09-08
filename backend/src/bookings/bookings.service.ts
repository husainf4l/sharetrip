import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookingDto, UpdateBookingDto, BookingFiltersDto, BookingResponseDto } from './dto/booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async createBooking(bookingData: CreateBookingDto, travelerId: string): Promise<BookingResponseDto> {
    try {
      const { tourId, headcount, specialRequests } = bookingData;

      // Validate inputs
      if (!tourId || !travelerId || !headcount) {
        throw new Error('Missing required booking data: tourId, travelerId, and headcount are required');
      }

      if (headcount < 1 || headcount > 20) {
        throw new Error('Invalid headcount. Must be between 1 and 20');
      }

      // Verify user exists
      const user = await this.prisma.user.findUnique({
        where: { id: travelerId }
      });

      if (!user) {
        throw new Error('User not found');
      }

      // Get tour details
      const tour = await this.prisma.tour.findUnique({
        where: { id: tourId },
        include: { 
          guide: true,
          bookings: {
            where: {
              status: { in: ['pending', 'confirmed'] }
            }
          }
        }
      });

      if (!tour) {
        throw new Error('Tour not found');
      }

      if (tour.status !== 'active') {
        throw new Error('Tour is not available for booking');
      }

      // Check if user already has a booking for this tour
      const existingBooking = await this.prisma.booking.findFirst({
        where: {
          tourId,
          travelerId,
          status: { in: ['pending', 'confirmed'] }
        }
      });

      if (existingBooking) {
        throw new Error('You already have a booking for this tour');
      }

      // Check capacity
      const currentBookings = tour.bookings.reduce((sum: number, booking: any) => sum + booking.headcount, 0);
      if (currentBookings + headcount > tour.maxGroup) {
        throw new Error('Not enough spots available for this group size');
      }

      // Validate tour pricing
      if (!tour.basePrice || tour.basePrice <= 0) {
        throw new Error('Invalid tour pricing');
      }

      // Calculate price
      const priceAtBooking = tour.basePrice * headcount;

      const booking = await this.prisma.booking.create({
        data: {
          tourId,
          travelerId,
          headcount,
          priceAtBooking,
          status: tour.instantBook ? 'confirmed' : 'pending'
        },
        include: {
          tour: {
            select: {
              title: true,
              city: true,
              startTimes: true,
              guide: {
                select: {
                  user: {
                    select: {
                      name: true
                    }
                  }
                }
              }
            }
          }
        }
      });

      return {
        success: true,
        booking,
        message: tour.instantBook ? 'Booking confirmed!' : 'Booking pending host approval'
      };

    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  }

  async getBookingsByTraveler(travelerId: string, filters?: BookingFiltersDto) {
    try {
      const where: any = { travelerId };

      if (filters?.status) {
        where.status = { in: filters.status };
      }

      if (filters?.tourId) {
        where.tourId = filters.tourId;
      }

      if (filters?.startDate || filters?.endDate) {
        where.createdAt = {};
        if (filters.startDate) {
          where.createdAt.gte = new Date(filters.startDate);
        }
        if (filters.endDate) {
          where.createdAt.lte = new Date(filters.endDate);
        }
      }

      const page = filters?.page || 1;
      const limit = filters?.limit || 20;
      const skip = (page - 1) * limit;

      const [bookings, total] = await Promise.all([
        this.prisma.booking.findMany({
          where,
          include: {
            tour: {
              select: {
                id: true,
                title: true,
                city: true,
                country: true,
                startTimes: true,
                basePrice: true,
                currency: true,
                guide: {
                  select: {
                    user: {
                      select: {
                        id: true,
                        name: true,
                        image: true
                      }
                    }
                  }
                }
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit
        }),
        this.prisma.booking.count({ where })
      ]);

      return {
        bookings,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  }

  async getBookingsByHost(hostUserId: string, filters?: BookingFiltersDto) {
    try {
      // Get guide profile
      const guide = await this.prisma.guideProfile.findUnique({
        where: { userId: hostUserId }
      });

      if (!guide) {
        throw new Error('Guide profile not found');
      }

      const where: any = {
        tour: {
          guideId: guide.id
        }
      };

      if (filters?.status) {
        where.status = { in: filters.status };
      }

      if (filters?.tourId) {
        where.tourId = filters.tourId;
      }

      if (filters?.startDate || filters?.endDate) {
        where.createdAt = {};
        if (filters.startDate) {
          where.createdAt.gte = new Date(filters.startDate);
        }
        if (filters.endDate) {
          where.createdAt.lte = new Date(filters.endDate);
        }
      }

      const page = filters?.page || 1;
      const limit = filters?.limit || 20;
      const skip = (page - 1) * limit;

      const [bookings, total] = await Promise.all([
        this.prisma.booking.findMany({
          where,
          include: {
            tour: {
              select: {
                id: true,
                title: true,
                city: true,
                startTimes: true
              }
            },
            traveler: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true
              }
            }
          },
          orderBy: { createdAt: 'desc' },
          skip,
          take: limit
        }),
        this.prisma.booking.count({ where })
      ]);

      return {
        bookings,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      };
    } catch (error) {
      console.error('Error fetching host bookings:', error);
      throw error;
    }
  }

  async getBookingById(bookingId: string, userId: string) {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          tour: {
            include: {
              guide: {
                select: {
                  userId: true,
                  user: {
                    select: {
                      id: true,
                      name: true,
                      email: true,
                      image: true
                    }
                  }
                }
              }
            }
          },
          traveler: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true
            }
          }
        }
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      // Check if user has permission to view this booking
      const isOwner = booking.travelerId === userId;
      const isHost = booking.tour.guide.userId === userId;

      if (!isOwner && !isHost) {
        throw new Error('You do not have permission to view this booking');
      }

      return booking;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  }

  async updateBooking(bookingId: string, updateData: UpdateBookingDto, userId: string): Promise<BookingResponseDto> {
    try {
      const booking = await this.prisma.booking.findUnique({
        where: { id: bookingId },
        include: {
          tour: {
            include: {
              guide: {
                select: {
                  userId: true
                }
              }
            }
          }
        }
      });

      if (!booking) {
        throw new Error('Booking not found');
      }

      // Check permissions
      const isOwner = booking.travelerId === userId;
      const isHost = booking.tour.guide.userId === userId;

      if (!isOwner && !isHost) {
        throw new Error('You do not have permission to update this booking');
      }

      // Validate status transitions
      if (updateData.status) {
        const validTransitions: Record<string, string[]> = {
          'pending': ['confirmed', 'cancelled'],
          'confirmed': ['completed', 'cancelled'],
          'cancelled': [], // Cannot change from cancelled
          'completed': [] // Cannot change from completed
        };

        const allowedStatuses = validTransitions[booking.status] || [];
        if (!allowedStatuses.includes(updateData.status)) {
          throw new Error(`Invalid status transition from ${booking.status} to ${updateData.status}`);
        }

        // Only hosts can confirm bookings
        if (updateData.status === 'confirmed' && !isHost) {
          throw new Error('Only hosts can confirm bookings');
        }
      }

      const updatedBooking = await this.prisma.booking.update({
        where: { id: bookingId },
        data: updateData,
        include: {
          tour: {
            select: {
              title: true,
              city: true
            }
          }
        }
      });

      return {
        success: true,
        booking: updatedBooking,
        message: `Booking ${updateData.status || 'updated'} successfully`
      };

    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  }

  async cancelBooking(bookingId: string, userId: string): Promise<BookingResponseDto> {
    return this.updateBooking(bookingId, { status: 'cancelled' }, userId);
  }

  async getBookingStats(userId: string, isHost: boolean = false) {
    try {
      let where: any;

      if (isHost) {
        const guide = await this.prisma.guideProfile.findUnique({
          where: { userId }
        });

        if (!guide) {
          throw new Error('Guide profile not found');
        }

        where = {
          tour: {
            guideId: guide.id
          }
        };
      } else {
        where = { travelerId: userId };
      }

      const [total, pending, confirmed, completed, cancelled] = await Promise.all([
        this.prisma.booking.count({ where }),
        this.prisma.booking.count({ where: { ...where, status: 'pending' } }),
        this.prisma.booking.count({ where: { ...where, status: 'confirmed' } }),
        this.prisma.booking.count({ where: { ...where, status: 'completed' } }),
        this.prisma.booking.count({ where: { ...where, status: 'cancelled' } })
      ]);

      return {
        total,
        pending,
        confirmed,
        completed,
        cancelled
      };
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      throw error;
    }
  }
}

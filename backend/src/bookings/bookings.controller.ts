import { Controller, Get, Post, Put, Body, Param, Query, UseGuards, Req } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateBookingDto, UpdateBookingDto, BookingFiltersDto } from './dto/booking.dto';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @Post(':tourId')
  @UseGuards(JwtAuthGuard)
  async createBooking(
    @Param('tourId') tourId: string,
    @Body() createBookingDto: CreateBookingDto,
    @Req() req: any
  ) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }

      const bookingData = {
        ...createBookingDto,
        tourId
      };

      return await this.bookingsService.createBooking(bookingData, req.user.sub);
    } catch (error) {
      console.error('Booking creation error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create booking';
      throw new Error(errorMessage);
    }
  }

  @Get('my-bookings')
  @UseGuards(JwtAuthGuard)
  async getMyBookings(@Query() filters: BookingFiltersDto, @Req() req: any) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }

      return await this.bookingsService.getBookingsByTraveler(req.user.sub, filters);
    } catch (error) {
      console.error('Error fetching user bookings:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch bookings';
      throw new Error(errorMessage);
    }
  }

  @Get('host/bookings')
  @UseGuards(JwtAuthGuard)
  async getHostBookings(@Query() filters: BookingFiltersDto, @Req() req: any) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }

      return await this.bookingsService.getBookingsByHost(req.user.sub, filters);
    } catch (error) {
      console.error('Error fetching host bookings:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch host bookings';
      throw new Error(errorMessage);
    }
  }

  @Get('stats')
  @UseGuards(JwtAuthGuard)
  async getBookingStats(@Query('isHost') isHost: string, @Req() req: any) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }

      const isHostBool = isHost === 'true';
      return await this.bookingsService.getBookingStats(req.user.sub, isHostBool);
    } catch (error) {
      console.error('Error fetching booking stats:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch booking stats';
      throw new Error(errorMessage);
    }
  }

  @Get(':bookingId')
  @UseGuards(JwtAuthGuard)
  async getBookingById(@Param('bookingId') bookingId: string, @Req() req: any) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }

      return await this.bookingsService.getBookingById(bookingId, req.user.sub);
    } catch (error) {
      console.error('Error fetching booking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to fetch booking';
      throw new Error(errorMessage);
    }
  }

  @Put(':bookingId')
  @UseGuards(JwtAuthGuard)
  async updateBooking(
    @Param('bookingId') bookingId: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Req() req: any
  ) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }

      return await this.bookingsService.updateBooking(bookingId, updateBookingDto, req.user.sub);
    } catch (error) {
      console.error('Error updating booking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to update booking';
      throw new Error(errorMessage);
    }
  }

  @Post(':bookingId/cancel')
  @UseGuards(JwtAuthGuard)
  async cancelBooking(@Param('bookingId') bookingId: string, @Req() req: any) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }

      return await this.bookingsService.cancelBooking(bookingId, req.user.sub);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to cancel booking';
      throw new Error(errorMessage);
    }
  }
}

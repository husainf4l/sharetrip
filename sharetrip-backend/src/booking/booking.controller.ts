import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto, UpdateBookingDto, BookingQueryDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBookingDto: CreateBookingDto, @Request() req) {
    const travelerId = req.user.id;
    return this.bookingService.create(createBookingDto, travelerId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: BookingQueryDto, @Request() req) {
    // Only allow admins to view all bookings
    // For now, restrict to user's own bookings unless they are a HOST or admin
    const userId = req.user.id;
    const userRole = req.user.role;
    
    if (userRole !== 'HOST' && userRole !== 'EXPLORER') {
      // Regular travelers can only see their own bookings
      query.travelerId = userId;
    }
    
    return this.bookingService.findAll(query);
  }

  @Get('my-bookings')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findMyBookings(@Query() query: BookingQueryDto, @Request() req) {
    const travelerId = req.user.id;
    return this.bookingService.findByTraveler(travelerId, query);
  }

  @Get('tour/:tourId')
  @HttpCode(HttpStatus.OK)
  async findByTour(@Param('tourId') tourId: string, @Query() query: BookingQueryDto) {
    return this.bookingService.findByTour(tourId, query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.bookingService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateBookingDto: UpdateBookingDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.bookingService.update(id, updateBookingDto, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.bookingService.remove(id, userId);
  }

  // Additional endpoints for business operations

  @Post(':id/confirm')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async confirmBooking(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.bookingService.confirmBooking(id, userId);
  }

  @Post(':id/cancel')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async cancelBooking(@Param('id') id: string, @Request() req) {
    const userId = req.user.id;
    return this.bookingService.cancelBooking(id, userId);
  }

  @Get('stats/tour/:tourId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getTourBookingStats(@Param('tourId') tourId: string, @Request() req) {
    // TODO: Check if user owns the tour or is admin
    return this.bookingService.getBookingStats(tourId);
  }

  @Get('stats/guide')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getGuideBookingStats(@Request() req) {
    // TODO: Extract guideId from authenticated user
    const guideId = req.user.id; // Assuming user has guide profile
    return this.bookingService.getBookingStats(undefined, guideId);
  }

  @Get('stats/global')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getGlobalBookingStats(@Request() req) {
    // TODO: Check if user is admin
    return this.bookingService.getBookingStats();
  }

  // Bulk operations (for admin/guide use)

  @Post('bulk-confirm')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async bulkConfirm(@Body() bookingIds: string[], @Request() req) {
    const userId = req.user.id;
    // TODO: Implement bulk operations
    // For now, process individually
    const results: any[] = [];
    for (const bookingId of bookingIds) {
      try {
        const result = await this.bookingService.confirmBooking(bookingId, userId);
        results.push({ bookingId, success: true, data: result });
      } catch (error) {
        results.push({ bookingId, success: false, error: error.message });
      }
    }
    return { results };
  }

  @Post('bulk-cancel')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async bulkCancel(@Body() bookingIds: string[], @Request() req) {
    const userId = req.user.id;
    // TODO: Implement bulk operations
    const results: any[] = [];
    for (const bookingId of bookingIds) {
      try {
        const result = await this.bookingService.cancelBooking(bookingId, userId);
        results.push({ bookingId, success: true, data: result });
      } catch (error) {
        results.push({ bookingId, success: false, error: error.message });
      }
    }
    return { results };
  }
}

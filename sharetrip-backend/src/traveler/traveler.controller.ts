import {
  Controller,
  Get,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TravelerService } from './traveler.service';
import {
  TravelerDashboardDto,
  TravelerStatsDto,
  TripBookingDto,
  RecentActivityDto,
  FavoriteDestinationDto,
  TravelerProfileDto,
} from './dto';

@ApiTags('traveler')
@Controller('traveler')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TravelerController {
  constructor(private readonly travelerService: TravelerService) {}

  @Get('dashboard')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get traveler dashboard data' })
  @ApiResponse({
    status: 200,
    description: 'Dashboard data retrieved successfully',
    type: TravelerDashboardDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getDashboard(@Request() req): Promise<TravelerDashboardDto> {
    return this.travelerService.getDashboardData(req.user.id);
  }

  @Get('stats')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get traveler statistics' })
  @ApiResponse({
    status: 200,
    description: 'Statistics retrieved successfully',
    type: TravelerStatsDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getStats(@Request() req): Promise<TravelerStatsDto> {
    return this.travelerService.getStats(req.user.id);
  }

  @Get('bookings/upcoming')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get upcoming bookings' })
  @ApiResponse({
    status: 200,
    description: 'Upcoming bookings retrieved successfully',
    type: [TripBookingDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getUpcomingBookings(@Request() req): Promise<TripBookingDto[]> {
    return this.travelerService.getUpcomingBookings(req.user.id);
  }

  @Get('activity/recent')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get recent activity' })
  @ApiResponse({
    status: 200,
    description: 'Recent activity retrieved successfully',
    type: [RecentActivityDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getRecentActivity(@Request() req): Promise<RecentActivityDto[]> {
    return this.travelerService.getRecentActivity(req.user.id);
  }

  @Get('destinations/favorites')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get favorite destinations' })
  @ApiResponse({
    status: 200,
    description: 'Favorite destinations retrieved successfully',
    type: [FavoriteDestinationDto],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getFavoriteDestinations(@Request() req): Promise<FavoriteDestinationDto[]> {
    return this.travelerService.getFavoriteDestinations(req.user.id);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get traveler profile' })
  @ApiResponse({
    status: 200,
    description: 'Profile retrieved successfully',
    type: TravelerProfileDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getProfile(@Request() req): Promise<TravelerProfileDto> {
    return this.travelerService.getProfile(req.user.id);
  }
}

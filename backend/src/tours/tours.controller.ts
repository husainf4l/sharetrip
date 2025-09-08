// @ts-ignore
import { Controller, Get, Query, Post, Body, Put, Param, UseGuards, Req, Delete } from '@nestjs/common';
import { ToursService } from './tours.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma.service';

@Controller('tours')
export class ToursController {
  constructor(
    private readonly toursService: ToursService,
    private readonly prisma: PrismaService
  ) {}

  @Get('health')
  async healthCheck() {
    try {
      // Test database connection
      await this.prisma.user.findFirst();
      return { status: 'ok', database: 'connected', timestamp: new Date().toISOString() };
    } catch (error) {
      console.error('Health check failed:', error);
      return { 
        status: 'error', 
        database: 'disconnected', 
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString() 
      };
    }
  }

  @Get('filter')
  async filter(@Query() query: any) {
    // Legacy endpoint - expected query params: city, minPrice, maxPrice, tags, startDate, endDate
    return this.toursService.filterTours(query);
  }

  @Post('share-tours/filter')
  async filterShareTours(@Body() filters: any) {
    // New comprehensive filtering endpoint for Share Tours
    return this.toursService.filterShareTours(filters);
  }

  @Get('share-tours/filter')
  async filterShareToursGet(@Query() query: any) {
    // GET version of share tours filtering with query params
    const filters = {
      cities: query.cities ? query.cities.split(',') : undefined,
      countries: query.countries ? query.countries.split(',') : undefined,
      startDate: query.startDate,
      endDate: query.endDate,
      flexibleDays: query.flexibleDays ? Number(query.flexibleDays) : undefined,
      startWindows: query.startWindows ? query.startWindows.split(',') : undefined,
      durations: query.durations ? query.durations.split(',') : undefined,
      groupSizes: query.groupSizes ? query.groupSizes.split(',') : undefined,
      minPrice: query.minPrice ? Number(query.minPrice) : undefined,
      maxPrice: query.maxPrice ? Number(query.maxPrice) : undefined,
      maxPriceAtFull: query.maxPriceAtFull === 'true',
      languages: query.languages ? query.languages.split(',') : undefined,
      travelStyles: query.travelStyles ? query.travelStyles.split(',') : undefined,
      accessibility: query.accessibility ? query.accessibility.split(',') : undefined,
      instantBook: query.instantBook === 'true',
      minHostRating: query.minHostRating ? Number(query.minHostRating) : undefined,
      dropInsOnly: query.dropInsOnly === 'true',
      earlyBird: query.earlyBird === 'true',
      payWhatYouWant: query.payWhatYouWant === 'true',
      cancellationPolicies: query.cancellationPolicies ? query.cancellationPolicies.split(',') : undefined,
      sortBy: query.sortBy,
      page: query.page ? Number(query.page) : 1,
      limit: query.limit ? Number(query.limit) : 20
    };
    
    return this.toursService.filterShareTours(filters);
  }

  @Get('match')
  async match(@Query('userId') userId: string) {
    return this.toursService.matchForUser(userId);
  }

  @Get('share-tours/quickfilters')
  async getQuickFilters() {
    try {
      // Return available filter options for UI
      return {
        cities: await this.getAvailableCities(),
        countries: await this.getAvailableCountries(),
        languages: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese'],
        travelStyles: ['relaxed', 'adventurous', 'foodie', 'culture', 'nightlife', 'family'],
        accessibility: ['wheelchair-friendly', 'low-walking', 'kid-friendly', 'women-only'],
        durations: ['30-60m', '1-2h', '3-4h', 'full-day'],
        groupSizes: ['2-5', '6-10', '10-16'],
        startWindows: ['morning', 'afternoon', 'evening'],
        cancellationPolicies: ['flexible', 'standard', 'strict'],
        sortOptions: [
          { value: 'compatible', label: 'Most compatible' },
          { value: 'price_low', label: 'Price: Low to High' },
          { value: 'price_high', label: 'Price: High to Low' },
          { value: 'spots_left', label: 'Spots left' },
          { value: 'starting_soon', label: 'Starting soon' },
          { value: 'rating', label: 'Highest rated' }
        ]
      };
    } catch (error) {
      // Return mock data if database is not available
      return {
        cities: ['Paris', 'London', 'Barcelona', 'Rome', 'Amsterdam', 'Berlin', 'Prague', 'Vienna'],
        countries: ['France', 'United Kingdom', 'Spain', 'Italy', 'Netherlands', 'Germany', 'Czech Republic', 'Austria'],
        languages: ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese', 'Japanese', 'Chinese'],
        travelStyles: ['relaxed', 'adventurous', 'foodie', 'culture', 'nightlife', 'family'],
        accessibility: ['wheelchair-friendly', 'low-walking', 'kid-friendly', 'women-only'],
        durations: ['30-60m', '1-2h', '3-4h', 'full-day'],
        groupSizes: ['2-5', '6-10', '10-16'],
        startWindows: ['morning', 'afternoon', 'evening'],
        cancellationPolicies: ['flexible', 'standard', 'strict'],
        sortOptions: [
          { value: 'compatible', label: 'Most compatible' },
          { value: 'price_low', label: 'Price: Low to High' },
          { value: 'price_high', label: 'Price: High to Low' },
          { value: 'spots_left', label: 'Spots left' },
          { value: 'starting_soon', label: 'Starting soon' },
          { value: 'rating', label: 'Highest rated' }
        ]
      };
    }
  }

  private async getAvailableCities() {
    try {
      // Get unique cities from active share tours
      const cities = await this.toursService['prisma'].tour.findMany({
        where: { 
          category: 'SHARE_TRIP',
          status: 'active'
        },
        select: { city: true },
        distinct: ['city']
      });
      return cities.map((c: { city: string }) => c.city).sort();
    } catch (error) {
      // Return mock data if database is not available
      return ['Paris', 'London', 'Barcelona', 'Rome', 'Amsterdam', 'Berlin', 'Prague', 'Vienna'];
    }
  }

  private async getAvailableCountries() {
    try {
      // Get unique countries from active share tours
      const countries = await this.toursService['prisma'].tour.findMany({
        where: { 
          category: 'SHARE_TRIP',
          status: 'active'
        },
        select: { country: true },
        distinct: ['country']
      });
      return countries.map((c: { country: string }) => c.country).sort();
    } catch (error) {
      // Return mock data if database is not available
      return ['France', 'United Kingdom', 'Spain', 'Italy', 'Netherlands', 'Germany', 'Czech Republic', 'Austria'];
    }
  }

  // Host-specific endpoints
  @Post('host/create')
  @UseGuards(JwtAuthGuard)
  async createTour(@Body() body: any, @Req() req: any) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }
      
      // Basic validation
      if (!body.title || !body.city || !body.country) {
        throw new Error('Missing required fields: title, city, and country are required');
      }

      const tourData = {
        ...body,
        guideId: req.user.sub
      };
      return await this.toursService.createTour(tourData);
    } catch (error) {
      console.error('Error creating tour:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create tour';
      throw new Error(errorMessage);
    }
  }

  @Get('host/my-tours')
  @UseGuards(JwtAuthGuard)
  async getMyTours(@Req() req: any) {
    return this.toursService.getToursByGuide(req.user.sub);
  }

  @Put('host/:tourId')
  @UseGuards(JwtAuthGuard)
  async updateTour(@Param('tourId') tourId: string, @Body() body: any, @Req() req: any) {
    return this.toursService.updateTour(tourId, body, req.user.sub);
  }

  // @Delete('host/:tourId')
  @Post('host/:tourId/delete')
  @UseGuards(JwtAuthGuard)
  async deleteTour(@Param('tourId') tourId: string, @Req() req: any) {
    try {
      if (!req.user?.sub) {
        throw new Error('User authentication failed');
      }
      return await this.toursService.deleteTour(tourId, req.user.sub);
    } catch (error) {
      console.error('Error deleting tour:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to delete tour';
      throw new Error(errorMessage);
    }
  }
}

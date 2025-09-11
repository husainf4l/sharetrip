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
import { TourService } from './tour.service';
import { CreateTourDto, UpdateTourDto, TourQueryDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('tours')
export class TourController {
  constructor(private readonly tourService: TourService) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createTourDto: CreateTourDto, @Request() req) {
    const userId = req.user.id;
    return this.tourService.create(createTourDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: TourQueryDto) {
    return this.tourService.findAll(query);
  }

  @Get('guide/:guideId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findByGuide(
    @Param('guideId') guideId: string,
    @Query() query: TourQueryDto,
    @Request() req,
  ) {
    // Optional: Check if user owns the guide profile
    return this.tourService.findByGuide(guideId, query);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id') id: string) {
    return this.tourService.findOne(id);
  }

  @Get(':id/stats')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getStats(@Param('id') id: string, @Request() req) {
    // TODO: Check if user owns the tour or is admin
    return this.tourService.getTourStats(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateTourDto: UpdateTourDto,
    @Request() req,
  ) {
    // TODO: Extract guideId from authenticated user and verify ownership
    const guideId = req.user.guideProfile?.id;
    return this.tourService.update(id, updateTourDto, guideId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string, @Request() req) {
    // TODO: Extract guideId from authenticated user and verify ownership
    const guideId = req.user.guideProfile?.id;
    return this.tourService.remove(id, guideId);
  }

  // Additional endpoints for better REST API practices

  @Get(':id/bookings')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getTourBookings(@Param('id') id: string, @Request() req) {
    // TODO: Check if user owns the tour or is admin
    const tour = await this.tourService.findOne(id);
    return tour.bookings;
  }


  @Get(':id/media')
  @HttpCode(HttpStatus.OK)
  async getTourMedia(@Param('id') id: string) {
    const tour = await this.tourService.findOne(id);
    return tour.media;
  }
}

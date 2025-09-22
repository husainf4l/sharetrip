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
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { FilesInterceptor } from '@nestjs/platform-express';
import { TourService } from './tour.service';
import { CreateTourDto, UpdateTourDto, TourQueryDto, TourCategory } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { CartService } from '../cart/cart.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { AddToCartDto } from '../cart/dto';

@Controller('tours')
export class TourController {
  constructor(
    private readonly tourService: TourService,
    private readonly cartService: CartService,
    private readonly wishlistService: WishlistService,
    private readonly prisma: PrismaService,
  ) {}

  @Post('create')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('photos', 10))
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() body: any, 
    @UploadedFiles() photos: Express.Multer.File[],
    @Request() req
  ) {
    // Filter out file-related fields from body to get clean DTO data
    const { photos: _, coverPhoto: __, ...cleanBody } = body;
    
    // Parse string arrays that were sent as JSON
    const tourData = {
      ...cleanBody,
      startTimes: JSON.parse(cleanBody.startTimes || '[]'),
      languages: JSON.parse(cleanBody.languages || '[]'),
      travelStyles: JSON.parse(cleanBody.travelStyles || '[]'),
      accessibility: JSON.parse(cleanBody.accessibility || '[]'),
      tags: JSON.parse(cleanBody.tags || '[]'),
      searchKeywords: JSON.parse(cleanBody.searchKeywords || '[]'),
      whatsIncluded: JSON.parse(cleanBody.whatsIncluded || '[]'),
      whatsExcluded: JSON.parse(cleanBody.whatsExcluded || '[]'),
      requirements: JSON.parse(cleanBody.requirements || '[]'),
      highlights: JSON.parse(cleanBody.highlights || '[]'),
      // Convert string numbers to numbers
      basePrice: parseInt(cleanBody.basePrice),
      minGroup: parseInt(cleanBody.minGroup),
      maxGroup: parseInt(cleanBody.maxGroup),
      durationMins: parseInt(cleanBody.durationMins),
      latitude: cleanBody.latitude ? parseFloat(cleanBody.latitude) : undefined,
      longitude: cleanBody.longitude ? parseFloat(cleanBody.longitude) : undefined,
      ageRestriction: cleanBody.ageRestriction ? parseInt(cleanBody.ageRestriction) : undefined,
      // Convert string booleans to booleans
      isPayWhatYouWant: cleanBody.isPayWhatYouWant === 'true',
      instantBook: cleanBody.instantBook === 'true',
    };

    // Transform and validate the DTO
    const createTourDto = plainToClass(CreateTourDto, tourData);
    const errors = await validate(createTourDto);
    
    if (errors.length > 0) {
      const errorMessages = errors.map(error => 
        Object.values(error.constraints || {}).join(', ')
      ).join('; ');
      throw new BadRequestException(`Validation failed: ${errorMessages}`);
    }

    const userId = req.user.id;
    return this.tourService.create(createTourDto, userId);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: TourQueryDto) {
    return this.tourService.findAll(query);
  }

  @Get('categories/:category/tours')
  @HttpCode(HttpStatus.OK)
  async findByCategory(@Param('category') category: string, @Query() query: TourQueryDto) {
    return this.tourService.findAll({ ...query, category: category.toUpperCase() as TourCategory });
  }

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  async getCategories() {
    return Object.values(TourCategory);
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

  @Get('my-tours')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async findMyTours(@Query() query: TourQueryDto, @Request() req) {
    const userId = req.user.id;
    const userRole = req.user.role;
    
    // For HOST users, find tours by their guide profile
    if (userRole === 'HOST') {
      const user = await this.prisma.user.findUnique({
        where: { id: userId },
        include: { guideProfile: true },
      });
      
      if (user?.guideProfile) {
        return this.tourService.findByGuide(user.guideProfile.id, query);
      }
    }
    
    // For other users, return empty result
    return { data: [], meta: { page: 1, limit: 10, total: 0, totalPages: 0 } };
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

  @Post(':id/media')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('files', 10)) // Allow up to 10 files
  @HttpCode(HttpStatus.CREATED)
  async uploadTourMedia(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Request() req,
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }

    // Validate file types
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4'];
    for (const file of files) {
      if (!allowedTypes.includes(file.mimetype)) {
        throw new BadRequestException(
          `File type ${file.mimetype} not allowed. Allowed types: ${allowedTypes.join(', ')}`
        );
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        throw new BadRequestException('File size too large. Maximum size: 10MB');
      }
    }

    // TODO: Implement media upload
    // return this.tourService.uploadTourMedia(id, files, req.user.id);
    throw new BadRequestException('Media upload not implemented yet');
  }

  @Delete(':id/media/:mediaId')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTourMedia(
    @Param('id') id: string,
    @Param('mediaId') mediaId: string,
    @Request() req,
  ) {
    // TODO: Implement media deletion
    // return this.tourService.deleteTourMedia(id, mediaId, req.user.id);
    throw new BadRequestException('Media deletion not implemented yet');
  }

  // Cart and Wishlist endpoints

  @Post(':id/add-to-cart')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addToCart(
    @Param('id') tourId: string,
    @Body() addToCartDto: AddToCartDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.cartService.addToCart(userId, { ...addToCartDto, tourId });
  }

  @Post(':id/add-to-wishlist')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async addToWishlist(@Param('id') tourId: string, @Request() req) {
    const userId = req.user.id;
    return this.wishlistService.addToWishlist(userId, { tourId });
  }

  @Delete(':id/remove-from-wishlist')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async removeFromWishlist(@Param('id') tourId: string, @Request() req) {
    const userId = req.user.id;
    return this.wishlistService.removeFromWishlist(userId, tourId);
  }

  @Get(':id/wishlist-status')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async getWishlistStatus(@Param('id') tourId: string, @Request() req) {
    const userId = req.user.id;
    const isInWishlist = await this.wishlistService.isInWishlist(userId, tourId);
    return { isInWishlist };
  }
}

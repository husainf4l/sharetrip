import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Query,
  Body,
  UseGuards,
  Request,
  HttpStatus,
  HttpCode,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AccommodationsService } from './accommodations.service';
import { Category, Accommodation } from '@prisma/client';
import { CreateAccommodationDto, UpdateAccommodationDto } from './dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('accommodations')
@Controller('accommodations')
export class AccommodationsController {
  constructor(private readonly accommodationsService: AccommodationsService) {}

  @Get('categories')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all accommodation categories' })
  @ApiResponse({
    status: 200,
    description: 'Categories retrieved successfully',
    type: [Object],
  })
  async getCategories(): Promise<Category[]> {
    return this.accommodationsService.getCategories();
  }

  @Get('categories/:type')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get category by type' })
  @ApiResponse({
    status: 200,
    description: 'Category retrieved successfully',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  async getCategoryByType(@Param('type') type: string): Promise<Category> {
    return this.accommodationsService.getCategoryByType(type);
  }

  @Get('categories/:type/accommodations')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get accommodations by category type' })
  @ApiResponse({
    status: 200,
    description: 'Accommodations retrieved successfully',
    type: [Object],
  })
  @ApiResponse({
    status: 404,
    description: 'Category not found',
  })
  async getAccommodationsByCategory(
    @Param('type') categoryType: string,
  ): Promise<Accommodation[]> {
    return this.accommodationsService.getAccommodationsByCategory(categoryType);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all accommodations' })
  @ApiResponse({
    status: 200,
    description: 'Accommodations retrieved successfully',
    type: [Object],
  })
  async getAllAccommodations(): Promise<Accommodation[]> {
    return this.accommodationsService.getAllAccommodations();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get accommodation by ID' })
  @ApiResponse({
    status: 200,
    description: 'Accommodation retrieved successfully',
    type: Object,
  })
  @ApiResponse({
    status: 404,
    description: 'Accommodation not found',
  })
  async getAccommodationById(@Param('id') id: string): Promise<Accommodation> {
    return this.accommodationsService.getAccommodationById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FilesInterceptor('photos', 10))
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new accommodation' })
  @ApiResponse({
    status: 201,
    description: 'Accommodation created successfully',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async createAccommodation(
    @Body() createAccommodationDto: CreateAccommodationDto,
    @UploadedFiles() photos: Express.Multer.File[],
    @Request() req,
  ): Promise<Accommodation> {
    const hostId = req.user.id;
    return this.accommodationsService.createAccommodation(createAccommodationDto, hostId, photos);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an accommodation' })
  @ApiResponse({
    status: 200,
    description: 'Accommodation updated successfully',
    type: Object,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not your accommodation',
  })
  @ApiResponse({
    status: 404,
    description: 'Accommodation not found',
  })
  async updateAccommodation(
    @Param('id') id: string,
    @Body() updateAccommodationDto: UpdateAccommodationDto,
    @Request() req,
  ): Promise<Accommodation> {
    const hostId = req.user.id;
    return this.accommodationsService.updateAccommodation(id, updateAccommodationDto, hostId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an accommodation' })
  @ApiResponse({
    status: 204,
    description: 'Accommodation deleted successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - not your accommodation',
  })
  @ApiResponse({
    status: 404,
    description: 'Accommodation not found',
  })
  async deleteAccommodation(
    @Param('id') id: string,
    @Request() req,
  ): Promise<void> {
    const hostId = req.user.id;
    return this.accommodationsService.deleteAccommodation(id, hostId);
  }

  @Get('my-accommodations')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get accommodations for the authenticated host' })
  @ApiResponse({
    status: 200,
    description: 'Host accommodations retrieved successfully',
    type: [Object],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  async getMyAccommodations(@Request() req): Promise<Accommodation[]> {
    const hostId = req.user.id;
    return this.accommodationsService.getHostAccommodations(hostId);
  }
}

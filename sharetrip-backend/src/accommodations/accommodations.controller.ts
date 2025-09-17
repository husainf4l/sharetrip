import {
  Controller,
  Get,
  Param,
  Query,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AccommodationsService } from './accommodations.service';
import { Category, Accommodation } from '@prisma/client';

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
}

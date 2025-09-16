import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { MediaService } from './media.service';
import { CreateMediaDto, MediaResponseDto } from './dto/create-media.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { GetUser } from '../auth/decorators/get-user.decorator';

@ApiTags('media')
@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Create media record after successful upload' })
  @ApiResponse({
    status: 201,
    description: 'Media record created successfully',
    type: MediaResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid request data' })
  @ApiResponse({ status: 404, description: 'Tour not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async createMedia(
    @Body(ValidationPipe) createMediaDto: CreateMediaDto,
    @GetUser('id') userId: string,
  ): Promise<MediaResponseDto> {
    return this.mediaService.createMedia(createMediaDto);
  }

  @Get('tour/:tourId')
  @HttpCode(HttpStatus.OK)
  async getTourMedia(
    @Param('tourId') tourId: string,
  ): Promise<MediaResponseDto[]> {
    return this.mediaService.getTourMedia(tourId);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getMedia(
    @Param('id') id: string,
  ): Promise<MediaResponseDto> {
    return this.mediaService.getMediaById(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAuthGuard)
  async updateMedia(
    @Param('id') id: string,
    @Body(ValidationPipe) updateData: Partial<CreateMediaDto>,
    @GetUser('id') userId: string,
  ): Promise<MediaResponseDto> {
    return this.mediaService.updateMedia(id, updateData);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  async deleteMedia(
    @Param('id') id: string,
    @GetUser('id') userId: string,
  ): Promise<void> {
    return this.mediaService.deleteMedia(id);
  }
}
import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  ValidationPipe,
  Put,
  Param,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
  Headers,
  Req,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from '../common/upload/upload.service';
import {
  CreatePresignedUploadDto,
  PresignedUploadResponseDto,
} from './dto/presigned-upload.dto';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('presign')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Generate presigned upload URL' })
  @ApiResponse({
    status: 200,
    description: 'Presigned upload URL generated successfully',
    type: PresignedUploadResponseDto,
    example: {
      uploadUrl: 'https://bucket.s3.region.amazonaws.com/key?X-Amz-Algorithm=...',
      publicUrl: 'https://bucket.s3.region.amazonaws.com/key',
      key: 'tours/tour-123/1234567890-uuid.jpg',
      expiresIn: 3600
    }
  })
  @ApiResponse({ status: 400, description: 'Invalid request or unsupported file type' })
  async createPresignedUpload(
    @Body(ValidationPipe) createPresignedUploadDto: CreatePresignedUploadDto,
  ): Promise<PresignedUploadResponseDto> {
    const { fileName, contentType, tourId } = createPresignedUploadDto;

    try {
      const result = await this.uploadService.generatePresignedUpload(
        fileName,
        contentType,
        tourId,
      );

      return result;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Put('local/*')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  async uploadFileLocally(
    @Param() params: any,
    @UploadedFile() file: Express.Multer.File,
    @Headers('content-type') contentType: string,
    @Headers('content-length') contentLength: string,
    @Req() request: any,
  ): Promise<{ success: boolean; publicUrl: string }> {
    const key = Object.keys(params)[0] || '';
    // Only allow local uploads when storage type is local
    if (this.uploadService.getStorageType() !== 'local') {
      throw new BadRequestException('Local uploads not enabled');
    }

    if (!file) {
      throw new BadRequestException('No file provided');
    }

    // Validate content type
    if (!file.mimetype.startsWith('image/')) {
      throw new BadRequestException('Only image files are allowed');
    }

    // Validate file size
    if (contentLength) {
      this.uploadService.validateFileSize(parseInt(contentLength, 10));
    }

    // For this example, we'll just return a success response
    // In a real implementation, you'd save the file to local storage
    const baseUrl = `${request.protocol}://${request.get('host')}`;
    const publicUrl = `${baseUrl}/uploads/${decodeURIComponent(key)}`;

    return {
      success: true,
      publicUrl,
    };
  }

  @Post('config')
  @HttpCode(HttpStatus.OK)
  getUploadConfig() {
    return {
      storageType: this.uploadService.getStorageType(),
      config: this.uploadService.getConfig(),
    };
  }
}
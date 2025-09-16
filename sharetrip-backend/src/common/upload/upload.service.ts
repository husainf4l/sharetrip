import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Service } from '../s3/s3.service';

export interface PresignedUploadResponse {
  uploadUrl: string;
  publicUrl: string;
  key: string;
  expiresIn?: number;
}

export interface UploadConfig {
  maxFileSize: number;
  allowedMimeTypes: string[];
  expirationTime: number;
}

@Injectable()
export class UploadService {
  private uuidv4: () => string;
  private readonly storageType: 's3' | 'local';
  private readonly config: UploadConfig;

  constructor(
    private readonly configService: ConfigService,
    private readonly s3Service: S3Service,
  ) {
    this.storageType = this.configService.get<'s3' | 'local'>('MEDIA_STORAGE', 's3');
    this.config = {
      maxFileSize: this.configService.get<number>('MAX_FILE_SIZE', 50 * 1024 * 1024), // 50MB default
      allowedMimeTypes: ['image/'], // Allow any image type
      expirationTime: this.configService.get<number>('UPLOAD_EXPIRATION', 3600), // 1 hour
    };

    // Dynamic import for UUID to handle ES module compatibility
    import('uuid').then(({ v4: uuidv4 }) => {
      this.uuidv4 = uuidv4;
    }).catch(err => {
      console.error('Failed to load UUID module:', err);
    });
  }

  async generatePresignedUpload(
    fileName: string,
    contentType: string,
    tourId?: string,
  ): Promise<PresignedUploadResponse> {
    // Validate MIME type (only check if starts with 'image/')
    if (!this.isValidMimeType(contentType)) {
      throw new Error(`Invalid content type: ${contentType}. Only images are allowed.`);
    }

    const fileExtension = this.getFileExtension(fileName);
    const uniqueKey = this.generateStorageKey(fileExtension, tourId);

    if (this.storageType === 's3') {
      return this.generateS3PresignedUpload(uniqueKey, contentType);
    } else {
      return this.generateLocalUpload(uniqueKey);
    }
  }

  private isValidMimeType(contentType: string): boolean {
    return this.config.allowedMimeTypes.some(allowed =>
      contentType.toLowerCase().startsWith(allowed.toLowerCase())
    );
  }

  private getFileExtension(fileName: string): string {
    const lastDot = fileName.lastIndexOf('.');
    if (lastDot === -1) return '';
    return fileName.substring(lastDot);
  }

  private generateStorageKey(extension: string, tourId?: string): string {
    const uuid = this.uuidv4();
    const timestamp = Date.now();

    if (tourId) {
      return `tours/${tourId}/${timestamp}-${uuid}${extension}`;
    }

    return `uploads/${timestamp}-${uuid}${extension}`;
  }

  private async generateS3PresignedUpload(
    key: string,
    contentType: string,
  ): Promise<PresignedUploadResponse> {
    try {
      const uploadUrl = await this.s3Service.generatePresignedUploadUrl(
        key,
        contentType,
        this.config.expirationTime,
        this.config.maxFileSize,
      );

      const publicUrl = this.s3Service.getPublicUrl(key);

      return {
        uploadUrl,
        publicUrl,
        key,
        expiresIn: this.config.expirationTime,
      };
    } catch (error) {
      throw new Error(`Failed to generate S3 presigned URL: ${error.message}`);
    }
  }

  private generateLocalUpload(key: string): PresignedUploadResponse {
    const baseUrl = this.configService.get<string>('BASE_URL', 'http://localhost:3003');

    return {
      uploadUrl: `${baseUrl}/api/upload/local/${encodeURIComponent(key)}`,
      publicUrl: `${baseUrl}/uploads/${key}`,
      key,
      expiresIn: this.config.expirationTime,
    };
  }

  validateFileSize(contentLength: number): void {
    if (contentLength > this.config.maxFileSize) {
      throw new Error(
        `File size ${contentLength} bytes exceeds maximum allowed size of ${this.config.maxFileSize} bytes`
      );
    }
  }

  getStorageType(): 's3' | 'local' {
    return this.storageType;
  }

  getConfig(): UploadConfig {
    return { ...this.config };
  }
}
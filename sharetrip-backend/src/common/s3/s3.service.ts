import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client | null;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    // Don't throw error if credentials are missing - handle gracefully
    if (!accessKeyId || !secretAccessKey) {
      console.warn('AWS credentials not configured - S3 functionality will be disabled');
      this.s3Client = null;
      this.bucketName = '';
      return;
    }

    try {
      this.s3Client = new S3Client({
        region,
        credentials: {
          accessKeyId,
          secretAccessKey,
        },
      });
      this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME') || '';
    } catch (error) {
      console.error('Failed to initialize S3 client:', error);
      this.s3Client = null;
      this.bucketName = '';
    }
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'tours'): Promise<string> {
    if (!this.s3Client) {
      throw new Error('S3 client not initialized - AWS credentials not configured');
    }

    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    const uploadParams = {
      Bucket: this.bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read' as const, // Makes the file publicly accessible
    };

    try {
      const command = new PutObjectCommand(uploadParams);
      await this.s3Client.send(command);

      // Return the public URL
      return `https://${this.bucketName}.s3.amazonaws.com/${fileName}`;
    } catch (error) {
      throw new Error(`Failed to upload file: ${error.message}`);
    }
  }

  async uploadMultipleFiles(files: Express.Multer.File[], folder: string = 'tours'): Promise<string[]> {
    const uploadPromises = files.map(file => this.uploadFile(file, folder));
    return Promise.all(uploadPromises);
  }

  async deleteFile(fileUrl: string): Promise<void> {
    if (!this.s3Client) {
      throw new Error('S3 client not initialized - AWS credentials not configured');
    }

    try {
      const key = fileUrl.split('.com/')[1];
      const deleteParams = {
        Bucket: this.bucketName,
        Key: key,
      };

      const command = new DeleteObjectCommand(deleteParams);
      await this.s3Client.send(command);
    } catch (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  }

  getSignedUrl(key: string, expiresIn: number = 3600): Promise<string> {
    if (!this.s3Client) {
      throw new Error('S3 client not initialized - AWS credentials not configured');
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  async generatePresignedUploadUrl(
    key: string,
    contentType: string,
    expiresIn: number = 3600,
    maxFileSize?: number,
  ): Promise<string> {
    if (!this.s3Client) {
      throw new Error('S3 client not initialized - AWS credentials not configured');
    }

    const conditions: any[] = [
      ['content-length-range', 0, maxFileSize || 50 * 1024 * 1024], // Default 50MB
    ];

    if (contentType) {
      conditions.push(['starts-with', '$Content-Type', contentType.split('/')[0] + '/']);
    }

    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
      ContentType: contentType,
      ACL: 'public-read',
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }

  getPublicUrl(key: string): string {
    const region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    return `https://${this.bucketName}.s3.${region}.amazonaws.com/${key}`;
  }
}
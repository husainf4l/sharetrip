import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(private configService: ConfigService) {
    const region = this.configService.get<string>('AWS_REGION') || 'us-east-1';
    const accessKeyId = this.configService.get<string>('AWS_ACCESS_KEY_ID');
    const secretAccessKey = this.configService.get<string>('AWS_SECRET_ACCESS_KEY');

    if (!accessKeyId || !secretAccessKey) {
      throw new Error('AWS credentials not configured');
    }

    this.s3Client = new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });
    this.bucketName = this.configService.get<string>('AWS_BUCKET_NAME') || '';
  }

  async uploadFile(file: Express.Multer.File, folder: string = 'tours'): Promise<string> {
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
    const command = new PutObjectCommand({
      Bucket: this.bucketName,
      Key: key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }
}
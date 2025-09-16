import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { S3Module } from '../s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [UploadService],
  exports: [UploadService],
})
export class UploadModule {}
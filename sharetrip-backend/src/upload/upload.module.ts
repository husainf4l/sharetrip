import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadModule as CommonUploadModule } from '../common/upload/upload.module';

@Module({
  imports: [CommonUploadModule],
  controllers: [UploadController],
})
export class UploadModule {}
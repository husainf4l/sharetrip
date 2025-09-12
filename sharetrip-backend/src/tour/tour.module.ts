import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../common/s3';

@Module({
  imports: [PrismaModule, S3Module],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}

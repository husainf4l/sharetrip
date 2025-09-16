import { Module } from '@nestjs/common';
import { TourService } from './tour.service';
import { TourController } from './tour.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { S3Module } from '../common/s3';
import { CartModule } from '../cart/cart.module';
import { WishlistModule } from '../wishlist/wishlist.module';

@Module({
  imports: [PrismaModule, S3Module, CartModule, WishlistModule],
  controllers: [TourController],
  providers: [TourService],
  exports: [TourService],
})
export class TourModule {}

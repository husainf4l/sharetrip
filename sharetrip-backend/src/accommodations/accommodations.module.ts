import { Module } from '@nestjs/common';
import { AccommodationsController } from './accommodations.controller';
import { AccommodationsService } from './accommodations.service';

@Module({
  controllers: [AccommodationsController],
  providers: [AccommodationsService],
  exports: [AccommodationsService],
})
export class AccommodationsModule {}

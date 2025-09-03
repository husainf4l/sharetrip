import { Module } from '@nestjs/common';
import { ToursService } from './tours.service';
import { ToursController } from './tours.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ToursController],
  providers: [ToursService, PrismaService],
})
export class ToursModule {}

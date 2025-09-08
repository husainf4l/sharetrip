import { Module } from '@nestjs/common';
import { ToursModule } from './tours/tours.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { HealthController } from './health.controller';

@Module({
  imports: [ToursModule, AuthModule, OnboardingModule, UsersModule, BookingsModule],
  controllers: [HealthController],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

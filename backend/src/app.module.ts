import { Module } from '@nestjs/common';
import { ToursModule } from './tours/tours.module';
import { PrismaService } from './prisma.service';
import { AuthModule } from './auth/auth.module';
import { OnboardingModule } from './onboarding/onboarding.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ToursModule, AuthModule, OnboardingModule, UsersModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class AppModule {}

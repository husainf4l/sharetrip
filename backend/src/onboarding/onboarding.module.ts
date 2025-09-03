import { Module } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';
import { OnboardingController } from './onboarding.controller';
import { PrismaService } from '../prisma.service';
import { OtpService } from '../utils/otp.service';
import { StripeService } from '../utils/stripe.service';

@Module({
  providers: [OnboardingService, PrismaService, OtpService, StripeService],
  controllers: [OnboardingController],
  exports: [OnboardingService],
})
export class OnboardingModule {}

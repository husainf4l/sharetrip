import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OnboardingService } from './onboarding.service';

@Controller('onboarding')
export class OnboardingController {
  constructor(private svc: OnboardingService) {}

  @Post('save-step')
  async saveStep(@Body() body: any) {
    // body: { userId, stepNumber, data }
    return this.svc.saveStep(body.userId, body.stepNumber, body.data);
  }

  @Post('send-phone-otp')
  async sendPhoneOtp(@Body() body: any) {
    return this.svc.sendPhoneOtp(body.userId, body.phone);
  }

  @Post('verify-phone-otp')
  async verifyPhoneOtp(@Body() body: any) {
    return this.svc.verifyPhoneOtp(body.userId, body.phone, body.code);
  }

  @Post('submit-kyc')
  async submitKyc(@Body() body: any) {
    // body includes KYC fields and uploaded file references
    return this.svc.submitKyc(body.userId, body.kycData);
  }

  @Post('create-stripe-onboarding')
  async createStripeOnboarding(@Body() body: any) {
    return this.svc.createStripeOnboarding(body.userId, body.returnUrl);
  }

  @Get('status/:userId')
  async status(@Param('userId') userId: string) {
    return this.svc.getStatus(userId);
  }
}

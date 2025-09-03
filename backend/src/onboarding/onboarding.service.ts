import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OtpService } from '../utils/otp.service';
import { StripeService } from '../utils/stripe.service';

@Injectable()
export class OnboardingService {
  constructor(private prisma: PrismaService, private otp: OtpService, private stripe: StripeService) {}

  async saveStep(userId: string, stepNumber: number, data: any) {
    const app = await this.prisma.hostApplication.upsert({ where: { userId }, update: { data: { ...data }, currentStep: stepNumber }, create: { userId, data, currentStep: stepNumber } });
    return { ok: true, application: app };
  }

  async sendPhoneOtp(userId: string, phone: string) {
    return this.otp.sendOtp(userId, phone);
  }

  async verifyPhoneOtp(userId: string, phone: string, code: string) {
    const ok = await this.otp.verifyOtp(userId, phone, code);
    if (ok) {
      await this.prisma.hostApplication.update({ where: { userId }, data: { phoneVerified: true } }).catch(() => null);
    }
    return { ok };
  }

  async submitKyc(userId: string, kycData: any) {
    // store KYC draft data; real storage would save to S3 and flag for review
    await this.prisma.hostApplication.update({ where: { userId }, data: { kycSubmitted: true, data: { kyc: kycData } } });
    return { ok: true };
  }

  async createStripeOnboarding(userId: string, returnUrl: string) {
    const link = await this.stripe.createAccountLink(userId, returnUrl);
    return { url: link };
  }

  async getStatus(userId: string) {
    const app = await this.prisma.hostApplication.findUnique({ where: { userId } });
    return { application: app };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class StripeService {
  constructor(private prisma: PrismaService) {}

  async createAccountLink(userId: string, returnUrl: string) {
    // In production call Stripe to create account and onboarding link.
    // For scaffold: create a pseudo-account id and store it.
    const fakeAccountId = `acct_${userId.slice(0,8)}`;
    await this.prisma.guideProfile.updateMany({ where: { userId }, data: { stripeAccountId: fakeAccountId } }).catch(() => null);
    return `${returnUrl}?stripe_account=${fakeAccountId}`;
  }

  async handleWebhook(payload: any) {
    // stub: process account.updated events
    return true;
  }
}

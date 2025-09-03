import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as argon2 from 'argon2';
import { randomInt } from 'crypto';

@Injectable()
export class OtpService {
  constructor(private prisma: PrismaService) {}

  async sendOtp(userId: string, phone: string) {
    const code = ('' + randomInt(100000, 999999));
    const codeHash = await argon2.hash(code);
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await this.prisma.phoneOtp.create({ data: { userId, phone, codeHash, expiresAt } });
    // In production: send via Twilio
    console.log(`[otp] sending ${code} to ${phone}`);
    return { ok: true };
  }

  async verifyOtp(userId: string, phone: string, code: string) {
    const recs = await this.prisma.phoneOtp.findMany({ where: { userId, phone, expiresAt: { gt: new Date() } }, orderBy: { createdAt: 'desc' } });
    for (const r of recs) {
      try {
        const ok = await argon2.verify(r.codeHash, code);
        if (ok) return true;
      } catch (err) {}
    }
    return false;
  }
}

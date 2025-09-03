import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as argon2 from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { randomBytes } from 'crypto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async signup(data: { name?: string; email: string; password: string; wantToHost?: boolean }) {
    const existing = await this.prisma.user.findUnique({ where: { email: data.email } });
    if (existing) throw new BadRequestException('Email already in use');

    const hash = await argon2.hash(data.password, { type: argon2.argon2id });
    const user = await this.prisma.user.create({ data: { name: data.name, email: data.email, passwordHash: hash, role: 'traveler' } });

    if (data.wantToHost) {
      await this.prisma.hostApplication.create({ data: { userId: user.id, status: 'draft', data: {} } });
    }

    // create email verification token
    const token = randomBytes(24).toString('hex');
    const tokenHash = await argon2.hash(token);
    await this.prisma.verificationToken.create({ data: { userId: user.id, tokenHash, type: 'email_verify', expiresAt: new Date(Date.now() + 30 * 60 * 1000) } });

    return { user, verificationToken: token };
  }

  async verifyEmail(token: string) {
    // find token by scanning verification tokens and verifying hash
    const tokens = await this.prisma.verificationToken.findMany({ where: { type: 'email_verify', used: false } });
    for (const t of tokens) {
      try {
        const ok = await argon2.verify(t.tokenHash, token);
        if (ok) {
          if (t.expiresAt < new Date()) throw new BadRequestException('Token expired');
          await this.prisma.user.update({ where: { id: t.userId }, data: { emailVerified: true, emailVerifiedAt: new Date() } });
          await this.prisma.verificationToken.update({ where: { id: t.id }, data: { used: true } });
          return { ok: true };
        }
      } catch (err) {
        // continue
      }
    }
    throw new BadRequestException('Invalid token');
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Invalid credentials');
    if (!user.passwordHash) throw new UnauthorizedException('No local password set');
    const ok = await argon2.verify(user.passwordHash, password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    // Generate tokens
    const payload = { sub: user.id, email: user.email };
    const accessToken = this.jwt.sign(payload, { expiresIn: '15m' });
    const refreshToken = this.jwt.sign(payload, { expiresIn: '7d' });

    // Store refresh token hash
    const refreshHash = await argon2.hash(refreshToken);
    await this.prisma.refreshToken.create({ data: { userId: user.id, tokenHash: refreshHash, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) } });

    return { user, accessToken, refreshToken };
  }

  async createPasswordReset(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return { ok: true };
    const token = randomBytes(24).toString('hex');
    const tokenHash = await argon2.hash(token);
    await this.prisma.verificationToken.create({ data: { userId: user.id, tokenHash, type: 'password_reset', expiresAt: new Date(Date.now() + 30 * 60 * 1000) } });
    return { token };
  }

  async createEmailVerification(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) return { ok: true };
    if (user.emailVerified) return { ok: true };
    const token = randomBytes(24).toString('hex');
    const tokenHash = await argon2.hash(token);
    await this.prisma.verificationToken.create({ data: { userId: user.id, tokenHash, type: 'email_verify', expiresAt: new Date(Date.now() + 30 * 60 * 1000) } });
    return { token };
  }

  async resetPassword(token: string, newPassword: string) {
    const tokens = await this.prisma.verificationToken.findMany({ where: { type: 'password_reset', used: false } });
    for (const t of tokens) {
      try {
        const ok = await argon2.verify(t.tokenHash, token);
        if (ok) {
          if (t.expiresAt < new Date()) throw new BadRequestException('Token expired');
          const hash = await argon2.hash(newPassword, { type: argon2.argon2id });
          await this.prisma.user.update({ where: { id: t.userId }, data: { passwordHash: hash } });
          await this.prisma.verificationToken.update({ where: { id: t.id }, data: { used: true } });
          // revoke existing refresh tokens
          await this.prisma.refreshToken.updateMany({ where: { userId: t.userId }, data: { revoked: true } });
          return { ok: true };
        }
      } catch (err) { }
    }
    throw new BadRequestException('Invalid token');
  }
}

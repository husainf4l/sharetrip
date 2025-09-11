import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import { Role } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { RegisterDto, LoginDto, AuthResponseDto, UserResponseDto } from './dto';
import { JwtPayload } from './strategies/jwt.strategy';

export interface UserProfileDto {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  image?: string | null;
  travelStyle?: string | null;
  createdAt: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponseDto> {
    const { email, password, name, role, travelStyle } = registerDto;

    // Check if user already exists
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Use transaction to create user and guide profile if needed
    const result = await this.prisma.$transaction(async (prisma) => {
      // Create user
      const user = await prisma.user.create({
        data: {
          email,
          name,
          passwordHash,
          role: role || 'TRAVELER',
          travelStyle,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          image: true,
          createdAt: true,
        },
      });

      // If user is a HOST, create guide profile automatically
      if (user.role === 'HOST') {
        await prisma.guideProfile.create({
          data: {
            userId: user.id,
            bio: null,
            kycStatus: 'unverified',
            payoutMethod: null,
            stripeAccountId: null,
            ratingAvg: 0,
            toursCount: 0,
          },
        });
      }

      return user;
    });

    // Generate tokens
    const payload: JwtPayload = {
      sub: result.id,
      email: result.email,
      role: result.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '15m',
      issuer: 'sharetrip-backend',
      audience: 'sharetrip-app',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
      issuer: 'sharetrip-backend',
      audience: 'sharetrip-app',
    });

    // Store refresh token in database
    await this.storeRefreshToken(result.id, refreshToken);

    return {
      accessToken,
      refreshToken,
      user: new UserResponseDto({
        ...result,
        name: result.name ?? undefined,
        image: result.image ?? undefined,
      }),
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const { email, password } = loginDto;

    // Find user
    const user = await this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        passwordHash: true,
        createdAt: true,
      },
    });

    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate tokens
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '15m',
      issuer: 'sharetrip-backend',
      audience: 'sharetrip-app',
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
      issuer: 'sharetrip-backend',
      audience: 'sharetrip-app',
    });

    // Store refresh token
    await this.storeRefreshToken(user.id, refreshToken);

    const { passwordHash, ...userWithoutPassword } = user;

    return {
      accessToken,
      refreshToken,
      user: new UserResponseDto({
        ...userWithoutPassword,
        name: userWithoutPassword.name ?? undefined,
        image: userWithoutPassword.image ?? undefined,
      }),
    };
  }

  async refreshToken(refreshToken: string): Promise<AuthResponseDto> {
    try {
      const payload = this.jwtService.verify(refreshToken) as JwtPayload;

      // Check if refresh token exists and is not revoked
      const tokenRecord = await this.prisma.refreshToken.findFirst({
        where: {
          userId: payload.sub,
          revoked: false,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!tokenRecord) {
        throw new UnauthorizedException('Invalid refresh token');
      }

      // Get user
      const user = await this.prisma.user.findUnique({
        where: { id: payload.sub },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          image: true,
          createdAt: true,
        },
      });

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Generate new tokens
      const newPayload: JwtPayload = {
        sub: user.id,
        email: user.email,
        role: user.role,
      };

      const accessToken = this.jwtService.sign(newPayload, {
        expiresIn: this.configService.get<string>('JWT_EXPIRES_IN') || '15m',
        issuer: 'sharetrip-backend',
        audience: 'sharetrip-app',
      });

      const newRefreshToken = this.jwtService.sign(newPayload, {
        expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
        issuer: 'sharetrip-backend',
        audience: 'sharetrip-app',
      });

      // Revoke old refresh token and store new one
      await this.prisma.refreshToken.update({
        where: { id: tokenRecord.id },
        data: { revoked: true },
      });

      await this.storeRefreshToken(user.id, newRefreshToken);

      return {
        accessToken,
        refreshToken: newRefreshToken,
        user: new UserResponseDto({
          ...user,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        }),
      };
    } catch (error) {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async logout(userId: string): Promise<void> {
    // Revoke all refresh tokens for the user
    await this.prisma.refreshToken.updateMany({
      where: {
        userId,
        revoked: false,
      },
      data: {
        revoked: true,
      },
    });
  }

  async getProfile(userId: string): Promise<UserProfileDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        travelStyle: true,
        createdAt: true,
        guideProfile: {
          select: {
            id: true,
            bio: true,
            kycStatus: true,
            payoutMethod: true,
            stripeAccountId: true,
            ratingAvg: true,
            toursCount: true,
          },
        },
      },
    });

    if (!user) {
      throw new BadRequestException('User not found');
    }

    return user as UserProfileDto;
  }

  private async storeRefreshToken(userId: string, token: string): Promise<void> {
    const tokenHash = await bcrypt.hash(token, 10);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

    await this.prisma.refreshToken.create({
      data: {
        userId,
        tokenHash,
        expiresAt,
      },
    });
  }

  async validateUser(payload: JwtPayload) {
    return await this.prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        image: true,
        travelStyle: true,
        createdAt: true,
      },
    });
  }
}

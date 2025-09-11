import { Exclude } from 'class-transformer';
import { Role } from '@prisma/client';

export class UserResponseDto {
  id: string;
  name?: string;
  email: string;
  image?: string;
  role: Role;
  travelStyle?: string;
  createdAt: Date;

  @Exclude()
  passwordHash?: string;

  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}

export class UserProfileDto {
  id: string;
  email: string;
  name?: string | null;
  role: Role;
  image?: string | null;
  travelStyle?: string | null;
  createdAt: Date;
  guideProfile?: {
    id: string;
    bio?: string | null;
    kycStatus: string;
    payoutMethod?: string | null;
    stripeAccountId?: string | null;
    ratingAvg?: number | null;
    toursCount: number;
  } | null;
}

export class AuthResponseDto {
  user: UserResponseDto;
  accessToken: string;
  refreshToken: string;
}

export class TokenResponseDto {
  accessToken: string;
  refreshToken: string;
}

export enum Role {
  TRAVELER = 'TRAVELER',
  HOST = 'HOST',
  EXPLORER = 'EXPLORER'
}

export enum KycStatus {
  UNVERIFIED = 'unverified',
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}

export interface GuideProfile {
  id: string;
  bio: string | null;
  kycStatus: KycStatus;
  payoutMethod: string | null;
  stripeAccountId: string | null;
  ratingAvg: number;
  toursCount: number;
}

export interface RegisterDto {
  name?: string;
  email: string;
  password: string;
  role?: Role;
  travelStyle?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  image?: string | null;
  travelStyle?: string;
  createdAt?: string;
  guideProfile?: GuideProfile;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

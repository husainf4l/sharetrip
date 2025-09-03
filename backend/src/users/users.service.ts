import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async getUserById(userId: string) {
    return this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        guideProfile: true,
        preferences: true,
        hostApplication: true
      }
    });
  }

  async updateUserProfile(userId: string, data: any) {
    return this.prisma.user.update({
      where: { id: userId },
      data
    });
  }

  async updateUserPreferences(userId: string, data: any) {
    return this.prisma.preference.upsert({
      where: { userId },
      update: data,
      create: { userId, ...data }
    });
  }

  async createHostApplication(userId: string) {
    return this.prisma.hostApplication.create({
      data: { userId, status: 'draft', data: {} }
    });
  }

  async getHostDashboard(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        guideProfile: {
          include: {
            tours: {
              include: {
                _count: {
                  select: { bookings: true }
                }
              }
            }
          }
        }
      }
    });

    if (!user?.guideProfile) {
      throw new Error('User is not a host');
    }

    return user.guideProfile;
  }
}

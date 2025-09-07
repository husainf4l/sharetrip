import { Controller, Get, Post, Put, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PrismaService } from '../prisma.service';

@Controller('users')
export class UsersController {
  constructor(private prisma: PrismaService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Req() req: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.sub },
      include: {
        guideProfile: true,
        preferences: true,
        hostApplication: true,
        _count: {
          select: {
            bookings: true,
            stories: true
          }
        }
      }
    });

    if (!user) {
      throw new Error('User not found');
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      emailVerified: user.emailVerified,
      languages: user.languages,
      ageRange: user.ageRange,
      travelStyle: user.travelStyle,
      image: user.image,
      createdAt: user.createdAt,
      guideProfile: user.guideProfile,
      preferences: user.preferences,
      hostApplication: user.hostApplication,
      stats: {
        totalBookings: user._count.bookings,
        totalStories: user._count.stories
      }
    };
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  async updateProfile(@Req() req: any, @Body() body: any) {
    const { name, languages, ageRange, travelStyle, image } = body;

    const user = await this.prisma.user.update({
      where: { id: req.user.sub },
      data: {
        name,
        languages,
        ageRange,
        travelStyle,
        image
      }
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      languages: user.languages,
      ageRange: user.ageRange,
      travelStyle: user.travelStyle,
      image: user.image
    };
  }

  @Put('preferences')
  @UseGuards(JwtAuthGuard)
  async updatePreferences(@Req() req: any, @Body() body: any) {
    const preferences = await this.prisma.preference.upsert({
      where: { userId: req.user.sub },
      update: body,
      create: { userId: req.user.sub, ...body }
    });

    return preferences;
  }

  @Post('become-host')
  @UseGuards(JwtAuthGuard)
  async becomeHost(@Req() req: any) {
    // Check if user already has a host application
    const existingApp = await this.prisma.hostApplication.findUnique({
      where: { userId: req.user.sub }
    });

    if (existingApp) {
      return { message: 'Host application already exists', application: existingApp };
    }

    // Create host application
    const application = await this.prisma.hostApplication.create({
      data: { userId: req.user.sub, status: 'draft', data: {} }
    });

    // Update user role to include host capabilities
    await this.prisma.user.update({
      where: { id: req.user.sub },
      data: { role: 'HOST' }
    });

    return {
      message: 'Host application created successfully',
      application,
      nextSteps: [
        'Complete your profile information',
        'Verify your phone number',
        'Submit identification documents',
        'Set up payment methods',
        'Create your first tour'
      ]
    };
  }

  @Get('host/dashboard')
  @UseGuards(JwtAuthGuard)
  async getHostDashboard(@Req() req: any) {
    const user = await this.prisma.user.findUnique({
      where: { id: req.user.sub },
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
        },
        hostApplication: true
      }
    });

    if (!user || !user.guideProfile) {
      throw new Error('User is not a host');
    }

    const guideProfile = user.guideProfile;
    const tours = guideProfile.tours;

    // Calculate stats
    const totalTours = tours.length;
    const activeTours = tours.filter((t: any) => t.status === 'active').length;
    const totalBookings = tours.reduce((sum: number, tour: any) => sum + tour._count.bookings, 0);
    const totalRevenue = await this.prisma.booking.aggregate({
      where: {
        tour: {
          guideId: guideProfile.id
        },
        status: 'confirmed'
      },
      _sum: {
        priceAtBooking: true
      }
    });

    return {
      profile: {
        id: guideProfile.id,
        bio: guideProfile.bio,
        ratingAvg: guideProfile.ratingAvg,
        toursCount: guideProfile.toursCount,
        kycStatus: guideProfile.kycStatus,
        payoutMethod: guideProfile.payoutMethod
      },
      stats: {
        totalTours,
        activeTours,
        totalBookings,
        totalRevenue: totalRevenue._sum.priceAtBooking || 0
      },
      tours: tours.map((tour: any) => ({
        id: tour.id,
        title: tour.title,
        status: tour.status,
        bookingsCount: tour._count.bookings,
        basePrice: tour.basePrice
      })),
      application: user.hostApplication
    };
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface TravelerStats {
  totalTrips: number;
  upcomingTrips: number;
  totalSpent: number;
  favoriteDestinations: number;
}

export interface TripBooking {
  id: string;
  tourId: string;
  tourTitle: string;
  guideId: string;
  guideName: string;
  guideImage: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number;
  status: string;
  totalPrice: number;
  currency: string;
  groupSize: number;
  meetingPoint: string;
  tourImage: string;
  category: string;
}

export interface RecentActivity {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  tourId?: string;
  tourTitle?: string;
}

export interface FavoriteDestination {
  id: string;
  city: string;
  country: string;
  image: string;
  visitCount: number;
  lastVisited: string;
  upcomingTrips: number;
}

export interface TravelerProfile {
  id: string;
  name: string;
  email: string;
  image: string;
  joinedDate: string;
  totalTrips: number;
  reviewsGiven: number;
  averageRating: number;
  preferredLanguages: string[];
  travelStyles: string[];
}

export interface TravelerDashboard {
  stats: TravelerStats;
  upcomingBookings: TripBooking[];
  recentActivity: RecentActivity[];
  favoriteDestinations: FavoriteDestination[];
  profile: TravelerProfile;
}

@Injectable()
export class TravelerService {
  constructor(private prisma: PrismaService) {}

  async getDashboardData(userId: string): Promise<TravelerDashboard> {
    const [stats, upcomingBookings, recentActivity, favoriteDestinations, profile] = await Promise.all([
      this.getStats(userId),
      this.getUpcomingBookings(userId),
      this.getRecentActivity(userId),
      this.getFavoriteDestinations(userId),
      this.getProfile(userId),
    ]);

    return {
      stats,
      upcomingBookings,
      recentActivity,
      favoriteDestinations,
      profile,
    };
  }

  async getStats(userId: string): Promise<TravelerStats> {
    const [totalBookings, upcomingBookings, totalSpent] = await Promise.all([
      this.prisma.booking.count({
        where: { travelerId: userId },
      }),
      this.prisma.booking.count({
        where: {
          travelerId: userId,
          status: 'confirmed',
        },
      }),
      this.prisma.booking.aggregate({
        where: {
          travelerId: userId,
          status: 'confirmed',
        },
        _sum: {
          priceAtBooking: true,
        },
      }),
    ]);

    // Get favorite destinations count (simplified - could be based on booking frequency)
    const favoriteDestinations = await this.prisma.booking.groupBy({
      by: ['tourId'],
      where: { travelerId: userId },
      _count: true,
      orderBy: {
        _count: {
          tourId: 'desc',
        },
      },
      take: 10,
    });

    return {
      totalTrips: totalBookings,
      upcomingTrips: upcomingBookings,
      totalSpent: Math.round((totalSpent._sum.priceAtBooking || 0) / 100), // Convert cents to dollars
      favoriteDestinations: favoriteDestinations.length,
    };
  }

  async getUpcomingBookings(userId: string): Promise<TripBooking[]> {
    const bookings = await this.prisma.booking.findMany({
      where: {
        travelerId: userId,
        status: 'confirmed',
      },
      include: {
        tour: {
          include: {
            guide: {
              include: {
                user: true,
              },
            },
            media: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    // Filter upcoming bookings (those with future dates)
    const upcomingBookings = bookings.filter(booking => {
      // Since startTimes is JSON, we need to handle it differently
      // For now, we'll consider bookings created recently as upcoming
      const daysSinceBooking = (new Date().getTime() - booking.createdAt.getTime()) / (1000 * 60 * 60 * 24);
      return daysSinceBooking < 30; // Consider bookings from last 30 days as upcoming
    });

    return upcomingBookings.map(booking => ({
      id: booking.id,
      tourId: booking.tour.id,
      tourTitle: booking.tour.title,
      guideId: booking.tour.guide.user.id,
      guideName: booking.tour.guide.user.name || 'Unknown Guide',
      guideImage: booking.tour.guide.user.image || '/images/default-guide.jpg',
      destination: `${booking.tour.city}, ${booking.tour.country}`,
      startDate: booking.createdAt.toISOString(), // Use booking date as start date for now
      endDate: new Date(
        booking.createdAt.getTime() + booking.tour.durationMins * 60000
      ).toISOString(),
      duration: booking.tour.durationMins,
      status: booking.status,
      totalPrice: Math.round(booking.priceAtBooking / 100), // Convert cents to dollars
      currency: booking.tour.currency,
      groupSize: booking.headcount,
      meetingPoint: booking.tour.meetingPoint || 'TBD',
      tourImage: booking.tour.media?.[0]?.url || '/images/default-tour.jpg',
      category: booking.tour.category,
    }));
  }

  async getRecentActivity(userId: string): Promise<RecentActivity[]> {
    // Get recent bookings
    const recentBookings = await this.prisma.booking.findMany({
      where: { travelerId: userId },
      include: {
        tour: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
    });

    return recentBookings.map(booking => ({
      id: `booking-${booking.id}`,
      type: 'booking',
      title: `Booked ${booking.tour.title}`,
      description: `Successfully booked ${booking.tour.title}`,
      timestamp: booking.createdAt.toISOString(),
      tourId: booking.tour.id,
      tourTitle: booking.tour.title,
    }));
  }

  async getFavoriteDestinations(userId: string): Promise<FavoriteDestination[]> {
    // Get most visited destinations based on booking count
    const destinationStats = await this.prisma.booking.groupBy({
      by: ['tourId'],
      where: { travelerId: userId },
      _count: {
        tourId: true,
      },
      orderBy: {
        _count: {
          tourId: 'desc',
        },
      },
      take: 8,
    });

    const destinations = await Promise.all(
      destinationStats.map(async (stat) => {
        const booking = await this.prisma.booking.findFirst({
          where: {
            travelerId: userId,
            tourId: stat.tourId,
          },
          include: {
            tour: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        });

        if (!booking) return null;

        const upcomingTrips = await this.prisma.booking.count({
          where: {
            travelerId: userId,
            tourId: stat.tourId,
            status: 'confirmed',
            // Remove the JSON field filter for now
          },
        });

        return {
          id: stat.tourId,
          city: booking.tour.city,
          country: booking.tour.country,
          image: '/images/default-destination.jpg', // Use default image since media is not included
          visitCount: stat._count.tourId,
          lastVisited: booking.createdAt.toISOString(),
          upcomingTrips,
        };
      })
    );

    return destinations.filter(Boolean) as FavoriteDestination[];
  }

  async getProfile(userId: string): Promise<TravelerProfile> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        _count: {
          select: {
            bookings: true,
          },
        },
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Calculate average rating from reviews (simplified)
    const averageRating = 4.5; // This would be calculated from actual reviews

    return {
      id: user.id,
      name: user.name || 'Anonymous Traveler',
      email: user.email,
      image: user.image || '/images/default-user.jpg',
      joinedDate: user.createdAt.toISOString(),
      totalTrips: user._count.bookings,
      reviewsGiven: Math.floor(user._count.bookings * 0.7), // Estimate based on bookings
      averageRating,
      preferredLanguages: ['English'], // This would come from user preferences
      travelStyles: user.travelStyle ? [user.travelStyle] : ['General'],
    };
  }
}

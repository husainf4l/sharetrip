import { ApiProperty } from '@nestjs/swagger';

export class TravelerStatsDto {
  @ApiProperty()
  totalTrips: number;

  @ApiProperty()
  upcomingTrips: number;

  @ApiProperty()
  totalSpent: number;

  @ApiProperty()
  favoriteDestinations: number;
}

export class TripBookingDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  tourId: string;

  @ApiProperty()
  tourTitle: string;

  @ApiProperty()
  guideId: string;

  @ApiProperty()
  guideName: string;

  @ApiProperty()
  guideImage: string;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;

  @ApiProperty()
  duration: number;

  @ApiProperty()
  status: string;

  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  currency: string;

  @ApiProperty()
  groupSize: number;

  @ApiProperty()
  meetingPoint: string;

  @ApiProperty()
  tourImage: string;

  @ApiProperty()
  category: string;
}

export class RecentActivityDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  timestamp: string;

  @ApiProperty({ required: false })
  tourId?: string;

  @ApiProperty({ required: false })
  tourTitle?: string;
}

export class FavoriteDestinationDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  country: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  visitCount: number;

  @ApiProperty()
  lastVisited: string;

  @ApiProperty()
  upcomingTrips: number;
}

export class TravelerProfileDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  joinedDate: string;

  @ApiProperty()
  totalTrips: number;

  @ApiProperty()
  reviewsGiven: number;

  @ApiProperty()
  averageRating: number;

  @ApiProperty({ type: [String] })
  preferredLanguages: string[];

  @ApiProperty({ type: [String] })
  travelStyles: string[];
}

export class TravelerDashboardDto {
  @ApiProperty({ type: TravelerStatsDto })
  stats: TravelerStatsDto;

  @ApiProperty({ type: [TripBookingDto] })
  upcomingBookings: TripBookingDto[];

  @ApiProperty({ type: [RecentActivityDto] })
  recentActivity: RecentActivityDto[];

  @ApiProperty({ type: [FavoriteDestinationDto] })
  favoriteDestinations: FavoriteDestinationDto[];

  @ApiProperty({ type: TravelerProfileDto })
  profile: TravelerProfileDto;
}

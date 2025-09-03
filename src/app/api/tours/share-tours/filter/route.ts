import { NextRequest, NextResponse } from 'next/server';

// Mock data for share tours - tours that are available for sharing/joining
const mockShareTours = [
  {
    id: '1',
    title: 'Rome Colosseum & Forum Walking Tour',
    city: 'Rome',
    country: 'Italy',
    description: 'Join our group tour to explore ancient Rome\'s most iconic landmarks with skip-the-line access.',
    media: [
      { url: 'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&h=600&fit=crop', type: 'image' }
    ],
    currentPrice: 45,
    maxGroupPrice: 35,
    basePrice: 5000,
    spotsLeft: 3,
    confirmedBookings: 9,
    maxGroup: 12,
    durationMins: 180,
    hostRating: 4.9,
    isDropIn: false,
    isEarlyBird: true,
    isPayWhatYouWant: false,
    progressPercentage: '75.0',
    guide: {
      user: {
        name: 'Marco Rossi',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    },
    startTimes: ['2025-01-15T14:00:00Z', '2025-01-17T10:00:00Z'],
    travelStyles: ['culture', 'adventurous'],
    accessibility: ['wheelchair-accessible'],
    language: 'English',
    languages: ['English', 'Italian']
  },
  {
    id: '2',
    title: 'Barcelona Tapas Food Tour',
    city: 'Barcelona',
    country: 'Spain',
    description: 'Share an authentic tapas experience through Barcelona\'s best local bars and restaurants.',
    media: [
      { url: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop', type: 'image' }
    ],
    currentPrice: 65,
    maxGroupPrice: 55,
    basePrice: 7500,
    spotsLeft: 5,
    confirmedBookings: 7,
    maxGroup: 12,
    durationMins: 210,
    hostRating: 4.8,
    isDropIn: true,
    isEarlyBird: false,
    isPayWhatYouWant: false,
    progressPercentage: '58.3',
    guide: {
      user: {
        name: 'Carlos Rodriguez',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    },
    startTimes: ['2025-01-16T19:00:00Z', '2025-01-18T19:30:00Z'],
    travelStyles: ['foodie', 'relaxed'],
    accessibility: [],
    language: 'English',
    languages: ['English', 'Spanish']
  },
  {
    id: '3',
    title: 'Tokyo Street Food Adventure',
    city: 'Tokyo',
    country: 'Japan',
    description: 'Explore hidden street food gems in Tokyo\'s vibrant neighborhoods with fellow food lovers.',
    media: [
      { url: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop', type: 'image' }
    ],
    currentPrice: 80,
    maxGroupPrice: 70,
    basePrice: 9000,
    spotsLeft: 2,
    confirmedBookings: 8,
    maxGroup: 10,
    durationMins: 240,
    hostRating: 4.9,
    isDropIn: false,
    isEarlyBird: false,
    isPayWhatYouWant: false,
    progressPercentage: '80.0',
    guide: {
      user: {
        name: 'Yuki Tanaka',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    },
    startTimes: ['2025-01-20T18:00:00Z', '2025-01-22T18:00:00Z'],
    travelStyles: ['foodie', 'adventurous'],
    accessibility: [],
    language: 'English',
    languages: ['English', 'Japanese']
  },
  {
    id: '4',
    title: 'Paris Seine Sunset Cruise',
    city: 'Paris',
    country: 'France',
    description: 'Join a romantic sunset cruise along the Seine River with panoramic views of Paris landmarks.',
    media: [
      { url: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop', type: 'image' }
    ],
    currentPrice: 55,
    maxGroupPrice: 45,
    basePrice: 6000,
    spotsLeft: 8,
    confirmedBookings: 12,
    maxGroup: 20,
    durationMins: 90,
    hostRating: 4.7,
    isDropIn: false,
    isEarlyBird: true,
    isPayWhatYouWant: false,
    progressPercentage: '60.0',
    guide: {
      user: {
        name: 'Sophie Dubois',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    },
    startTimes: ['2025-01-19T19:30:00Z', '2025-01-21T19:45:00Z'],
    travelStyles: ['relaxed', 'culture'],
    accessibility: ['wheelchair-accessible'],
    language: 'English',
    languages: ['English', 'French']
  },
  {
    id: '5',
    title: 'Amsterdam Bike & Canals Tour',
    city: 'Amsterdam',
    country: 'Netherlands',
    description: 'Cycle through Amsterdam\'s charming streets and canals with a group of fellow travelers.',
    media: [
      { url: 'https://images.unsplash.com/photo-1534351590666-13e3e963b3b6?w=800&h=600&fit=crop', type: 'image' }
    ],
    currentPrice: 40,
    maxGroupPrice: 32,
    basePrice: 4500,
    spotsLeft: 4,
    confirmedBookings: 11,
    maxGroup: 15,
    durationMins: 150,
    hostRating: 4.6,
    isDropIn: true,
    isEarlyBird: false,
    isPayWhatYouWant: false,
    progressPercentage: '73.3',
    guide: {
      user: {
        name: 'Jan van der Berg',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      }
    },
    startTimes: ['2025-01-18T14:00:00Z', '2025-01-20T10:00:00Z'],
    travelStyles: ['adventurous', 'relaxed'],
    accessibility: [],
    language: 'English',
    languages: ['English', 'Dutch']
  },
  {
    id: '6',
    title: 'Lisbon Fado & Wine Night',
    city: 'Lisbon',
    country: 'Portugal',
    description: 'Experience authentic Fado music with wine tasting in Lisbon\'s traditional neighborhoods.',
    media: [
      { url: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop', type: 'image' }
    ],
    currentPrice: 50,
    maxGroupPrice: 42,
    basePrice: 5500,
    spotsLeft: 6,
    confirmedBookings: 6,
    maxGroup: 12,
    durationMins: 180,
    hostRating: 4.8,
    isDropIn: false,
    isEarlyBird: false,
    isPayWhatYouWant: true,
    progressPercentage: '50.0',
    guide: {
      user: {
        name: 'Maria Santos',
        image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      }
    },
    startTimes: ['2025-01-17T20:00:00Z', '2025-01-19T20:30:00Z'],
    travelStyles: ['culture', 'nightlife'],
    accessibility: [],
    language: 'English',
    languages: ['English', 'Portuguese']
  },
  {
    id: '7',
    title: 'London Pub Crawl Experience',
    city: 'London',
    country: 'United Kingdom',
    description: 'Join locals and travelers for an authentic London pub crawl through historic pubs.',
    media: [
      { url: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop', type: 'image' }
    ],
    currentPrice: 35,
    maxGroupPrice: 28,
    basePrice: 3800,
    spotsLeft: 10,
    confirmedBookings: 5,
    maxGroup: 15,
    durationMins: 240,
    hostRating: 4.5,
    isDropIn: true,
    isEarlyBird: false,
    isPayWhatYouWant: false,
    progressPercentage: '33.3',
    guide: {
      user: {
        name: 'James Wright',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    },
    startTimes: ['2025-01-16T20:00:00Z', '2025-01-18T20:00:00Z'],
    travelStyles: ['nightlife', 'relaxed'],
    accessibility: [],
    language: 'English',
    languages: ['English']
  },
  {
    id: '8',
    title: 'Berlin Alternative Culture Walk',
    city: 'Berlin',
    country: 'Germany',
    description: 'Discover Berlin\'s underground art scene and alternative culture with like-minded travelers.',
    media: [
      { url: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop', type: 'image' }
    ],
    currentPrice: 30,
    maxGroupPrice: 25,
    basePrice: 3200,
    spotsLeft: 7,
    confirmedBookings: 8,
    maxGroup: 15,
    durationMins: 210,
    hostRating: 4.7,
    isDropIn: false,
    isEarlyBird: true,
    isPayWhatYouWant: false,
    progressPercentage: '53.3',
    guide: {
      user: {
        name: 'Anna Mueller',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
      }
    },
    startTimes: ['2025-01-21T15:00:00Z', '2025-01-23T15:00:00Z'],
    travelStyles: ['culture', 'adventurous'],
    accessibility: [],
    language: 'English',
    languages: ['English', 'German']
  }
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract search parameters
    const search = searchParams.get('search')?.toLowerCase();
    const cities = searchParams.get('cities')?.split(',').filter(Boolean);
    const countries = searchParams.get('countries')?.split(',').filter(Boolean);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const durations = searchParams.get('durations')?.split(',').filter(Boolean);
    const groupSizes = searchParams.get('groupSizes')?.split(',').filter(Boolean);
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const languages = searchParams.get('languages')?.split(',').filter(Boolean);
    const travelStyles = searchParams.get('travelStyles')?.split(',').filter(Boolean);
    const accessibility = searchParams.get('accessibility')?.split(',').filter(Boolean);
    const instantBook = searchParams.get('instantBook') === 'true';
    const minHostRating = searchParams.get('minHostRating');
    const dropInsOnly = searchParams.get('dropInsOnly') === 'true';
    const earlyBird = searchParams.get('earlyBird') === 'true';
    const payWhatYouWant = searchParams.get('payWhatYouWant') === 'true';
    const sortBy = searchParams.get('sortBy') || 'compatible';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    let filteredTours = [...mockShareTours];

    // Apply filters
    if (search) {
      filteredTours = filteredTours.filter(tour =>
        tour.title.toLowerCase().includes(search) ||
        tour.city.toLowerCase().includes(search) ||
        tour.country.toLowerCase().includes(search) ||
        tour.description.toLowerCase().includes(search)
      );
    }

    if (cities && cities.length > 0) {
      filteredTours = filteredTours.filter(tour =>
        cities.includes(tour.city.toLowerCase())
      );
    }

    if (countries && countries.length > 0) {
      filteredTours = filteredTours.filter(tour =>
        countries.includes(tour.country.toLowerCase())
      );
    }

    if (durations && durations.length > 0) {
      filteredTours = filteredTours.filter(tour => {
        const hours = Math.ceil(tour.durationMins / 60);
        return durations.some(duration => {
          if (duration === '0-2' && hours <= 2) return true;
          if (duration === '2-4' && hours > 2 && hours <= 4) return true;
          if (duration === '4+' && hours > 4) return true;
          return false;
        });
      });
    }

    if (groupSizes && groupSizes.length > 0) {
      filteredTours = filteredTours.filter(tour => {
        return groupSizes.some(size => {
          if (size === 'small' && tour.maxGroup <= 8) return true;
          if (size === 'medium' && tour.maxGroup > 8 && tour.maxGroup <= 15) return true;
          if (size === 'large' && tour.maxGroup > 15) return true;
          return false;
        });
      });
    }

    if (minPrice) {
      filteredTours = filteredTours.filter(tour => tour.currentPrice >= Number(minPrice));
    }

    if (maxPrice) {
      filteredTours = filteredTours.filter(tour => tour.currentPrice <= Number(maxPrice));
    }

    if (languages && languages.length > 0) {
      filteredTours = filteredTours.filter(tour =>
        tour.languages?.some(lang => 
          languages.includes(lang.toLowerCase())
        )
      );
    }

    if (travelStyles && travelStyles.length > 0) {
      filteredTours = filteredTours.filter(tour =>
        tour.travelStyles?.some(style => 
          travelStyles.includes(style.toLowerCase())
        )
      );
    }

    if (accessibility && accessibility.length > 0) {
      filteredTours = filteredTours.filter(tour =>
        tour.accessibility?.some(access => 
          accessibility.includes(access.toLowerCase())
        )
      );
    }

    if (dropInsOnly) {
      filteredTours = filteredTours.filter(tour => tour.isDropIn);
    }

    if (earlyBird) {
      filteredTours = filteredTours.filter(tour => tour.isEarlyBird);
    }

    if (payWhatYouWant) {
      filteredTours = filteredTours.filter(tour => tour.isPayWhatYouWant);
    }

    if (minHostRating) {
      filteredTours = filteredTours.filter(tour => 
        tour.hostRating && tour.hostRating >= Number(minHostRating)
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price_low':
        filteredTours.sort((a, b) => a.currentPrice - b.currentPrice);
        break;
      case 'price_high':
        filteredTours.sort((a, b) => b.currentPrice - a.currentPrice);
        break;
      case 'spots_left':
        filteredTours.sort((a, b) => a.spotsLeft - b.spotsLeft);
        break;
      case 'starting_soon':
        filteredTours.sort((a, b) => {
          const aTime = new Date(a.startTimes[0] || 0).getTime();
          const bTime = new Date(b.startTimes[0] || 0).getTime();
          return aTime - bTime;
        });
        break;
      case 'rating':
        filteredTours.sort((a, b) => (b.hostRating || 0) - (a.hostRating || 0));
        break;
      case 'compatible':
      default:
        // Sort by a combination of spots left and rating
        filteredTours.sort((a, b) => {
          const aScore = (a.hostRating || 0) * 0.3 + (1 - a.spotsLeft / a.maxGroup) * 0.7;
          const bScore = (b.hostRating || 0) * 0.3 + (1 - b.spotsLeft / b.maxGroup) * 0.7;
          return bScore - aScore;
        });
        break;
    }

    // Apply pagination
    const totalCount = filteredTours.length;
    const totalPages = Math.ceil(totalCount / limit);
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedTours = filteredTours.slice(startIndex, endIndex);

    return NextResponse.json({
      tours: paginatedTours,
      pagination: {
        page,
        limit,
        total: totalCount,
        pages: totalPages
      }
    });

  } catch (error) {
    console.error('Share Tours Filter API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
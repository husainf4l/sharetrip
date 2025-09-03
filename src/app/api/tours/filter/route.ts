import { NextRequest, NextResponse } from 'next/server';

// Mock data for tours - in a real app, this would come from a database
const mockTours = [
  {
    id: '1',
    title: 'City Food Tour in Lisbon',
    city: 'Lisbon',
    country: 'Portugal',
    priceCents: 4000,
    category: 'Food & Drink',
    description: 'Embark on an unforgettable culinary journey through the vibrant streets of Lisbon. Discover authentic Portuguese flavors, hidden local gems, and centuries-old traditions.',
    rating: 4.8,
    reviews: 1234,
    duration: '3 hours',
    maxGroupSize: 15,
    groupSize: '15',
    language: 'English',
    badge: 'Bestseller',
    isInstantConfirmation: true,
    isFreeCancellation: true,
    isSkipTheLine: false,
    accessibility: true,
    images: [
      'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Maria Santos',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviews: 342,
      responseTime: 'within 1 hour',
      languages: ['English', 'Portuguese', 'Spanish'],
    },
    highlights: [
      'Authentic Portuguese cuisine tasting',
      'Visit to traditional local markets',
      'Expert local guide with 10+ years experience',
      'Small group of maximum 15 people',
      'Free cancellation up to 24 hours',
    ],
  },
  {
    id: '2',
    title: 'Historic Walking Tour',
    city: 'Barcelona',
    country: 'Spain',
    priceCents: 3000,
    category: 'Walking Tours',
    description: 'Explore Barcelona\'s rich history and architecture on this comprehensive walking tour through the Gothic Quarter and beyond.',
    rating: 4.9,
    reviews: 890,
    duration: '2.5 hours',
    maxGroupSize: 12,
    groupSize: '12',
    language: 'English',
    badge: 'Popular',
    isInstantConfirmation: false,
    isFreeCancellation: true,
    isSkipTheLine: true,
    accessibility: false,
    images: [
      'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Carlos Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviews: 156,
      responseTime: 'within 30 minutes',
      languages: ['English', 'Spanish', 'Catalan'],
    },
    highlights: [
      'Gothic Quarter exploration',
      'Historic architecture insights',
      'Local history and culture',
      'Small group experience',
    ],
  },
  {
    id: '3',
    title: 'Nightlife Experience',
    city: 'Barcelona',
    country: 'Spain',
    priceCents: 2500,
    category: 'Nightlife',
    description: 'Experience Barcelona\'s vibrant nightlife scene with expert guidance through the best bars, clubs, and entertainment venues.',
    rating: 4.7,
    reviews: 567,
    duration: '4 hours',
    maxGroupSize: 8,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1545128485-c400e7702796?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Luna Martinez',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      reviews: 89,
      responseTime: 'within 2 hours',
      languages: ['English', 'Spanish'],
    },
    highlights: [
      'Best nightlife spots in Barcelona',
      'Cocktail tasting experience',
      'VIP access to exclusive venues',
      'Safe and fun atmosphere',
    ],
  },
  {
    id: '4',
    title: 'Rome Ancient History Tour',
    city: 'Rome',
    country: 'Italy',
    priceCents: 4500,
    category: 'Culture & History',
    description: 'Journey through 2,000 years of history at Rome\'s most iconic ancient sites including the Colosseum, Roman Forum, and Palatine Hill.',
    rating: 4.9,
    reviews: 2156,
    duration: '4 hours',
    maxGroupSize: 20,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Marco Rossi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviews: 445,
      responseTime: 'within 45 minutes',
      languages: ['English', 'Italian', 'French'],
    },
    highlights: [
      'Colosseum guided tour',
      'Roman Forum exploration',
      'Ancient history insights',
      'Skip-the-line tickets included',
    ],
  },
  {
    id: '5',
    title: 'Paris Seine River Cruise',
    city: 'Paris',
    country: 'France',
    priceCents: 5500,
    category: 'Culture & History',
    description: 'Enjoy a romantic cruise along the Seine River with stunning views of Paris\' most famous landmarks and monuments.',
    rating: 4.8,
    reviews: 1876,
    duration: '1.5 hours',
    maxGroupSize: 25,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Sophie Dubois',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviews: 267,
      responseTime: 'within 1 hour',
      languages: ['English', 'French'],
    },
    highlights: [
      'Seine River cruise',
      'Paris landmarks views',
      'Audio guide included',
      'Champagne option available',
    ],
  },
  {
    id: '6',
    title: 'Amsterdam Canal Boat Tour',
    city: 'Amsterdam',
    country: 'Netherlands',
    priceCents: 3500,
    category: 'Culture & History',
    description: 'Discover Amsterdam\'s beautiful canals and historic architecture on this relaxing boat tour through the city\'s famous waterways.',
    rating: 4.7,
    reviews: 1432,
    duration: '1 hour',
    maxGroupSize: 15,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1534351590666-13e3e963b3b6?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1583316174775-bd6dc0e11f1d?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Jan van der Berg',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      reviews: 198,
      responseTime: 'within 30 minutes',
      languages: ['English', 'Dutch'],
    },
    highlights: [
      'Amsterdam canals tour',
      'Historic architecture',
      'Local commentary',
      'Photo opportunities',
    ],
  },
  {
    id: '7',
    title: 'Tokyo Street Food Adventure',
    city: 'Tokyo',
    country: 'Japan',
    priceCents: 5000,
    category: 'Food & Drink',
    description: 'Experience Tokyo\'s incredible street food scene with visits to hidden gems, food stalls, and local favorites.',
    rating: 4.9,
    reviews: 2341,
    duration: '3.5 hours',
    maxGroupSize: 10,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Yuki Tanaka',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviews: 312,
      responseTime: 'within 2 hours',
      languages: ['English', 'Japanese'],
    },
    highlights: [
      'Authentic street food tasting',
      'Hidden local gems',
      'Food culture insights',
      'Small group experience',
    ],
  },
  {
    id: '8',
    title: 'Santorini Sunset Photography',
    city: 'Santorini',
    country: 'Greece',
    priceCents: 6000,
    category: 'Photography',
    description: 'Capture stunning sunset photos at Santorini\'s most picturesque locations with professional photography guidance.',
    rating: 4.8,
    reviews: 987,
    duration: '2 hours',
    maxGroupSize: 8,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Dimitris Papadopoulos',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviews: 145,
      responseTime: 'within 1 hour',
      languages: ['English', 'Greek'],
    },
    highlights: [
      'Sunset photography session',
      'Professional guidance',
      'Best viewpoints access',
      'Photo editing tips',
    ],
  },
  {
    id: '9',
    title: 'New York City Highlights',
    city: 'New York',
    country: 'USA',
    priceCents: 6500,
    category: 'Culture & History',
    description: 'Experience the best of New York City with visits to Times Square, Central Park, and iconic Manhattan landmarks.',
    rating: 4.6,
    reviews: 3456,
    duration: '6 hours',
    maxGroupSize: 15,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1485871981521-5b1fd3805b6d?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      rating: 4.7,
      reviews: 523,
      responseTime: 'within 30 minutes',
      languages: ['English'],
    },
    highlights: [
      'Times Square visit',
      'Central Park exploration',
      'Manhattan landmarks',
      'Local insights',
    ],
  },
  {
    id: '10',
    title: 'Machu Picchu Day Hike',
    city: 'Cusco',
    country: 'Peru',
    priceCents: 7500,
    category: 'Adventure',
    description: 'Trek to the ancient Incan citadel of Machu Picchu with experienced guides and breathtaking Andean scenery.',
    rating: 4.9,
    reviews: 876,
    duration: '8 hours',
    maxGroupSize: 12,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1526392060635-9d6019884377?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Carlos Mendoza',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      rating: 4.9,
      reviews: 234,
      responseTime: 'within 3 hours',
      languages: ['English', 'Spanish'],
    },
    highlights: [
      'Machu Picchu visit',
      'Incan history insights',
      'Andean scenery',
      'Guided hiking experience',
    ],
  },
  {
    id: '11',
    title: 'Venice Gondola Ride',
    city: 'Venice',
    country: 'Italy',
    priceCents: 4000,
    category: 'Culture & History',
    description: 'Experience Venice\'s romantic canals on a traditional gondola ride with a skilled gondolier and local commentary.',
    rating: 4.7,
    reviews: 1654,
    duration: '45 minutes',
    maxGroupSize: 6,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1514890547357-aad4b983dff3?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Giovanni Bianchi',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      rating: 4.6,
      reviews: 178,
      responseTime: 'within 1 hour',
      languages: ['English', 'Italian'],
    },
    highlights: [
      'Traditional gondola ride',
      'Venice canals experience',
      'Local history commentary',
      'Romantic atmosphere',
    ],
  },
  {
    id: '12',
    title: 'Sydney Opera House Tour',
    city: 'Sydney',
    country: 'Australia',
    priceCents: 7000,
    category: 'Culture & History',
    description: 'Take a behind-the-scenes tour of the iconic Sydney Opera House and learn about its architecture and history.',
    rating: 4.8,
    reviews: 1234,
    duration: '2 hours',
    maxGroupSize: 20,
    language: 'English',
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1507608869274-d3177c8bb4c7?w=800&h=600&fit=crop',
    ],
    host: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      rating: 4.8,
      reviews: 289,
      responseTime: 'within 45 minutes',
      languages: ['English'],
    },
    highlights: [
      'Opera House backstage tour',
      'Architectural insights',
      'Performance history',
      'Harbour views',
    ],
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const destination = searchParams.get('destination')?.toLowerCase();
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const minRating = searchParams.get('minRating');
    const categories = searchParams.get('categories')?.split(',');
    const duration = searchParams.get('duration');
    const groupSize = searchParams.get('groupSize');
    const languages = searchParams.get('languages')?.split(',');

    let filteredTours = [...mockTours];

    // Filter by destination
    if (destination) {
      filteredTours = filteredTours.filter(tour =>
        tour.title.toLowerCase().includes(destination) ||
        tour.city.toLowerCase().includes(destination) ||
        tour.country.toLowerCase().includes(destination)
      );
    }

    // Filter by categories
    if (categories && categories.length > 0) {
      filteredTours = filteredTours.filter(tour =>
        tour.category && categories.includes(tour.category)
      );
    }

    // Filter by duration (mock implementation)
    if (duration) {
      // This would need actual duration data in the mock tours
      // For now, we'll skip this filter
    }

    // Filter by group size (mock implementation)
    if (groupSize) {
      // This would need actual group size data in the mock tours
      // For now, we'll skip this filter
    }

    // Filter by languages (mock implementation)
    if (languages && languages.length > 0) {
      // This would need actual language data in the mock tours
      // For now, we'll skip this filter
    }

    // Filter by price range
    if (minPrice) {
      filteredTours = filteredTours.filter(tour => tour.priceCents / 100 >= Number(minPrice));
    }
    if (maxPrice) {
      filteredTours = filteredTours.filter(tour => tour.priceCents / 100 <= Number(maxPrice));
    }

    // Filter by rating (mock implementation - since we don't have rating data)
    if (minRating) {
      // This would need actual rating data in the mock tours
      // For now, we'll skip this filter
    }

    // Add some randomization to make results more dynamic
    const shuffled = filteredTours.sort(() => 0.5 - Math.random());
    const result = shuffled.slice(0, Math.min(20, shuffled.length));

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';

interface GetYourGuideTour {
  id: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  price: {
    amount: number;
    currency: string;
  };
  rating: number;
  reviewCount: number;
  images: string[];
  categories: string[];
  languages: string[];
  meetingPoint: string;
  included: string[];
  excluded: string[];
  cancellationPolicy: string;
  maxGroupSize: number;
  minAge: number;
  difficulty: string;
}

export async function POST(request: NextRequest) {
  try {
    const { location, activity, date } = await request.json();

    // GetYourGuide API integration
    // In production, you would use the actual GetYourGuide API
    // For now, we'll simulate the API response with mock data

    const mockTours: GetYourGuideTour[] = [
      {
        id: "gyg-paris-eiffel",
        title: "Eiffel Tower Skip-the-Line Tour with Seine River Cruise",
        description: "Experience the iconic Eiffel Tower with priority access and enjoy a romantic Seine River cruise. Perfect for first-time visitors to Paris.",
        location: "Paris, France",
        duration: "4 hours",
        price: {
          amount: 89,
          currency: "EUR"
        },
        rating: 4.5,
        reviewCount: 2847,
        images: [
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=400&h=250&fit=crop"
        ],
        categories: ["Sightseeing", "Culture", "Photography"],
        languages: ["English", "French", "Spanish"],
        meetingPoint: "Eiffel Tower, Champ de Mars entrance",
        included: [
          "Skip-the-line Eiffel Tower access",
          "Seine River cruise",
          "Professional guide",
          "Headset for groups",
          "Hotel pickup (selected areas)"
        ],
        excluded: [
          "Gratuities",
          "Food and drinks",
          "Personal expenses"
        ],
        cancellationPolicy: "Free cancellation up to 24 hours before",
        maxGroupSize: 25,
        minAge: 0,
        difficulty: "Easy"
      },
      {
        id: "gyg-lisbon-food",
        title: "Authentic Portuguese Food Tour in Alfama",
        description: "Discover Lisbon's culinary heritage with local specialties, fresh seafood, and traditional pastries. Visit hidden gems and local markets.",
        location: "Lisbon, Portugal",
        duration: "3.5 hours",
        price: {
          amount: 65,
          currency: "EUR"
        },
        rating: 4.7,
        reviewCount: 1256,
        images: [
          "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=250&fit=crop"
        ],
        categories: ["Food & Drink", "Culture", "Walking Tour"],
        languages: ["English", "Portuguese"],
        meetingPoint: "Rossio Square, near the fountain",
        included: [
          "Local guide",
          "Traditional Portuguese meal",
          "Wine tasting",
          "Market visit",
          "Recipe demonstration"
        ],
        excluded: [
          "Transportation",
          "Additional beverages",
          "Tips"
        ],
        cancellationPolicy: "Free cancellation up to 48 hours before",
        maxGroupSize: 12,
        minAge: 12,
        difficulty: "Moderate"
      },
      {
        id: "gyg-rome-colosseum",
        title: "Colosseum and Roman Forum Guided Tour",
        description: "Step back in time with our expert archaeologist guide. Explore the Colosseum, Roman Forum, and Palatine Hill with skip-the-line access.",
        location: "Rome, Italy",
        duration: "3 hours",
        price: {
          amount: 75,
          currency: "EUR"
        },
        rating: 4.6,
        reviewCount: 3421,
        images: [
          "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400&h=250&fit=crop",
          "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=400&h=250&fit=crop"
        ],
        categories: ["History", "Sightseeing", "Archaeology"],
        languages: ["English", "Italian", "French"],
        meetingPoint: "Colosseum entrance (skip-the-line meeting point)",
        included: [
          "Skip-the-line access",
          "Professional archaeologist guide",
          "Headset for groups",
          "Colosseum, Forum, Palatine Hill",
          "Detailed explanations"
        ],
        excluded: [
          "Transportation",
          "Food and drinks",
          "Vatican Museums (separate tour)"
        ],
        cancellationPolicy: "Free cancellation up to 24 hours before",
        maxGroupSize: 30,
        minAge: 0,
        difficulty: "Moderate"
      }
    ];

    // Filter tours based on search criteria
    let filteredTours = mockTours;

    if (location) {
      filteredTours = filteredTours.filter(tour =>
        tour.location.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (activity) {
      filteredTours = filteredTours.filter(tour =>
        tour.title.toLowerCase().includes(activity.toLowerCase()) ||
        tour.categories.some(cat => cat.toLowerCase().includes(activity.toLowerCase()))
      );
    }

    return NextResponse.json({
      success: true,
      tours: filteredTours,
      total: filteredTours.length
    });

  } catch (error) {
    console.error('GetYourGuide search error:', error);
    return NextResponse.json(
      { error: 'Failed to search tours' },
      { status: 500 }
    );
  }
}

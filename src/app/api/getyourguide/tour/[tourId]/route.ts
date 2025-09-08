import { NextRequest, NextResponse } from 'next/server';

interface GetYourGuideTourDetails {
  id: string;
  title: string;
  description: string;
  overview: string;
  highlights: string[];
  itinerary: Array<{
    time: string;
    activity: string;
    description: string;
  }>;
  location: string;
  duration: string;
  price: {
    amount: number;
    currency: string;
    originalPrice?: number;
  };
  rating: number;
  reviewCount: number;
  images: string[];
  categories: string[];
  languages: string[];
  meetingPoint: string;
  included: string[];
  excluded: string[];
  requirements: string[];
  cancellationPolicy: string;
  maxGroupSize: number;
  minAge: number;
  difficulty: string;
  host: {
    name: string;
    bio: string;
    languages: string[];
    rating: number;
    reviewCount: number;
  };
  reviews: Array<{
    id: string;
    author: string;
    rating: number;
    date: string;
    comment: string;
    helpful: number;
  }>;
  availability: Array<{
    date: string;
    times: string[];
    available: boolean;
  }>;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ tourId: string }> }
) {
  try {
    const resolvedParams = await params;
    const { tourId } = resolvedParams;

    // GetYourGuide API integration
    // In production, you would fetch real data from GetYourGuide API
    // For now, we'll return detailed mock data

    const mockTourDetails: Record<string, GetYourGuideTourDetails> = {
      "gyg-paris-eiffel": {
        id: "gyg-paris-eiffel",
        title: "Eiffel Tower Skip-the-Line Tour with Seine River Cruise",
        description: "Experience the iconic Eiffel Tower with priority access and enjoy a romantic Seine River cruise. Perfect for first-time visitors to Paris.",
        overview: "Join our expert guide for an unforgettable day in Paris. Skip the long lines at the Eiffel Tower and ascend to the top for breathtaking views. Continue your adventure with a relaxing cruise along the Seine River, passing under historic bridges and admiring the city's most beautiful monuments.",
        highlights: [
          "Skip-the-line access to Eiffel Tower",
          "Ascend to the top observation deck",
          "Seine River cruise with commentary",
          "Professional English-speaking guide",
          "Small group experience (max 25 people)"
        ],
        itinerary: [
          {
            time: "09:00",
            activity: "Meeting Point",
            description: "Meet your guide at the Champ de Mars entrance to the Eiffel Tower"
          },
          {
            time: "09:15-11:00",
            activity: "Eiffel Tower Visit",
            description: "Skip-the-line access and guided tour of the iconic landmark"
          },
          {
            time: "11:00-12:30",
            activity: "Seine River Cruise",
            description: "Relaxing cruise with audio commentary about Paris landmarks"
          },
          {
            time: "12:30",
            activity: "Tour Ends",
            description: "Drop-off near your hotel or continue exploring Paris"
          }
        ],
        location: "Paris, France",
        duration: "4 hours",
        price: {
          amount: 89,
          currency: "EUR",
          originalPrice: 105
        },
        rating: 4.5,
        reviewCount: 2847,
        images: [
          "https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=500&fit=crop",
          "https://images.unsplash.com/photo-1549144511-f099e773c147?w=800&h=500&fit=crop"
        ],
        categories: ["Sightseeing", "Culture", "Photography"],
        languages: ["English", "French", "Spanish"],
        meetingPoint: "Eiffel Tower, Champ de Mars entrance (look for guide with red umbrella)",
        included: [
          "Skip-the-line Eiffel Tower access",
          "Seine River cruise (1 hour)",
          "Professional guide",
          "Headset for groups over 8 people",
          "Hotel pickup/drop-off (selected central areas)"
        ],
        excluded: [
          "Gratuities (optional)",
          "Food and drinks",
          "Personal expenses",
          "Transportation to/from meeting point"
        ],
        requirements: [
          "Comfortable walking shoes",
          "Valid ID for minors",
          "Weather-appropriate clothing"
        ],
        cancellationPolicy: "Free cancellation up to 24 hours before the tour starts",
        maxGroupSize: 25,
        minAge: 0,
        difficulty: "Easy",
        host: {
          name: "Marie Dubois",
          bio: "Paris native and licensed tour guide with 8 years of experience. Marie specializes in French history and culture, bringing the City of Light to life for visitors from around the world.",
          languages: ["English", "French", "Spanish"],
          rating: 4.8,
          reviewCount: 1247
        },
        reviews: [
          {
            id: "rev1",
            author: "Sarah M.",
            rating: 5,
            date: "2024-09-15",
            comment: "Absolutely amazing experience! The skip-the-line access saved us hours of waiting. Marie was incredibly knowledgeable and made the history come alive.",
            helpful: 12
          },
          {
            id: "rev2",
            author: "John D.",
            rating: 5,
            date: "2024-09-10",
            comment: "Perfect way to see Paris. The Seine cruise was the highlight of our trip. Highly recommend!",
            helpful: 8
          }
        ],
        availability: [
          {
            date: "2024-09-25",
            times: ["09:00", "11:00", "14:00"],
            available: true
          },
          {
            date: "2024-09-26",
            times: ["09:00", "11:00", "14:00"],
            available: true
          }
        ]
      }
    };

    const tourDetails = mockTourDetails[tourId];

    if (!tourDetails) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      tour: tourDetails
    });

  } catch (error) {
    console.error('GetYourGuide tour details error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tour details' },
      { status: 500 }
    );
  }
}

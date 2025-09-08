import { NextRequest, NextResponse } from 'next/server';

interface BookingRequest {
  tourId: string;
  headcount: number;
  specialRequests?: string;
  selectedDate?: string;
  getYourGuideData?: {
    gygTourId: string;
    gygPrice: number;
    gygCurrency: string;
    gygBookingReference?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const body: BookingRequest = await request.json();
    const { tourId, headcount, specialRequests, selectedDate, getYourGuideData } = body;

    // Get the authorization token from the request headers
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    // Prepare booking data
    const bookingData = {
      headcount: parseInt(headcount.toString()),
      specialRequests,
      selectedDate,
      // Include GetYourGuide data if provided
      ...(getYourGuideData && {
        getYourGuideData: {
          ...getYourGuideData,
          // Generate a booking reference if not provided
          gygBookingReference: getYourGuideData.gygBookingReference ||
            `GYG-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
        }
      })
    };

    // Forward the request to the backend
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003';
    const response = await fetch(`${backendUrl}/tours/book/${tourId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.message || 'Failed to create booking' },
        { status: response.status }
      );
    }

    const bookingResult = await response.json();

    // If GetYourGuide data is provided, we could also create a booking with GetYourGuide
    // In a real implementation, you would call GetYourGuide's booking API here
    if (getYourGuideData) {
      try {
        // Simulate GetYourGuide booking creation
        console.log('Creating GetYourGuide booking:', {
          gygTourId: getYourGuideData.gygTourId,
          headcount,
          selectedDate,
          totalPrice: getYourGuideData.gygPrice * headcount,
          currency: getYourGuideData.gygCurrency,
          bookingReference: getYourGuideData.gygBookingReference
        });

        // In production, you would make an actual API call to GetYourGuide
        // const gygResponse = await fetch('https://api.getyourguide.com/v2/bookings', {
        //   method: 'POST',
        //   headers: {
        //     'Authorization': `Bearer ${process.env.GETYOURGUIDE_API_KEY}`,
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        //     tour_id: getYourGuideData.gygTourId,
        //     date: selectedDate,
        //     participants: headcount,
        //     customer: { /* customer data */ }
        //   })
        // });

      } catch (gygError) {
        console.error('GetYourGuide booking error:', gygError);
        // Don't fail the entire booking if GYG fails, just log it
      }
    }

    return NextResponse.json({
      success: true,
      booking: bookingResult,
      getYourGuideReference: getYourGuideData?.gygBookingReference
    });

  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

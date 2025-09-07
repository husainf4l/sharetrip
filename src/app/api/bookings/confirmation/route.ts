import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const bookingId = searchParams.get('bookingId');

  if (!bookingId) {
    return NextResponse.json(
      { error: 'Booking ID is required' },
      { status: 400 }
    );
  }

  // In a real application, you would fetch this data from your database
  // For now, we'll return mock data based on the bookingId
  const mockBooking = {
    bookingId: bookingId,
    tourTitle: "Authentic Portuguese Food Tour",
    tourImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop",
    tourLocation: "Lisbon, Portugal",
    tourDate: "2024-09-20",
    tourDuration: "3 hours",
    participants: 2,
    totalPrice: 90,
    hostName: "Maria Santos",
    hostEmail: "maria.santos@email.com",
    hostPhone: "+351 912 345 678",
    meetingPoint: "Rossio Square, Lisbon Main Entrance",
    specialRequests: "Vegetarian options needed",
    status: "confirmed",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(mockBooking);
}

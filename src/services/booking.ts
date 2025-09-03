interface BookingData {
  headcount: number;
  specialRequests?: string;
  selectedDate?: string;
}

interface BookingResponse {
  success: boolean;
  booking?: any;
  error?: string;
}

export const createBooking = async (
  tourId: string,
  bookingData: BookingData
): Promise<BookingResponse> => {
  try {
    // Get the auth token from localStorage
    const token = localStorage.getItem('accessToken');

    if (!token) {
      return {
        success: false,
        error: 'Please log in to book a tour'
      };
    }

    const response = await fetch(`/api/tours/${tourId}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        error: errorData.error || 'Failed to create booking'
      };
    }

    const booking = await response.json();
    return {
      success: true,
      booking
    };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.'
    };
  }
};

export const getUserBookings = async (): Promise<any[]> => {
  try {
    const token = localStorage.getItem('accessToken');

    if (!token) {
      throw new Error('Please log in to view bookings');
    }

    const response = await fetch('/api/tours/my-bookings', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch bookings');
    }

    return await response.json();
  } catch (error) {
    console.error('Get bookings error:', error);
    throw error;
  }
};

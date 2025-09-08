import { authService } from './auth.service';
import { handleApiError, createApiError } from '../utils/errorHandler';

interface BookingData {
  headcount: number;
  specialRequests?: string;
  selectedDate?: string;
  getYourGuideData?: {
    gygTourId: string;
    gygPrice: number;
    gygCurrency: string;
  };
}

interface BookingResponse {
  success: boolean;
  booking?: Record<string, unknown>;
  message?: string;
  error?: string;
}

export const createBooking = async (
  tourId: string,
  bookingData: BookingData
): Promise<BookingResponse> => {
  try {
    if (!authService.isAuthenticated()) {
      return {
        success: false,
        error: 'Please log in to book a tour'
      };
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003/api';
    const response = await fetch(`${backendUrl}/bookings/${tourId}`, {
      method: 'POST',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify({
        headcount: bookingData.headcount,
        specialRequests: bookingData.specialRequests,
        selectedDate: bookingData.selectedDate,
        getYourGuideData: bookingData.getYourGuideData
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = createApiError(response, errorData.error || errorData.message);
      return {
        success: false,
        error: handleApiError(apiError)
      };
    }

    const result = await response.json();
    return {
      success: true,
      booking: result.booking,
      message: result.message
    };
  } catch (error) {
    console.error('Booking error:', error);
    return {
      success: false,
      error: error instanceof Error ? handleApiError(error) : 'Network error. Please try again.'
    };
  }
};

export const getUserBookings = async (filters?: {
  status?: string[];
  page?: number;
  limit?: number;
}): Promise<{ bookings: Record<string, unknown>[]; totalPages: number; totalCount: number }> => {
  try {
    if (!authService.isAuthenticated()) {
      throw new Error('Please log in to view bookings');
    }

    const params = new URLSearchParams();
    if (filters?.status) params.set('status', filters.status.join(','));
    if (filters?.page) params.set('page', filters.page.toString());
    if (filters?.limit) params.set('limit', filters.limit.toString());

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003/api';
    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await fetch(`${backendUrl}/bookings/my-bookings${queryString}`, {
      method: 'GET',
      headers: authService.getAuthHeaders(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = createApiError(response, errorData.error || errorData.message);
      throw new Error(handleApiError(apiError));
    }

    return await response.json();
  } catch (error) {
    console.error('Get bookings error:', error);
    throw error;
  }
};

export const updateBookingStatus = async (bookingId: string, status: string): Promise<Record<string, unknown>> => {
  try {
    if (!authService.isAuthenticated()) {
      throw new Error('Please log in to update booking');
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003/api';
    const response = await fetch(`${backendUrl}/bookings/${bookingId}`, {
      method: 'PUT',
      headers: authService.getAuthHeaders(),
      body: JSON.stringify({ status })
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = createApiError(response, errorData.error || errorData.message);
      throw new Error(handleApiError(apiError));
    }

    return await response.json();
  } catch (error) {
    console.error('Update booking error:', error);
    throw error;
  }
};

export const cancelBooking = async (bookingId: string): Promise<Record<string, unknown>> => {
  try {
    if (!authService.isAuthenticated()) {
      throw new Error('Please log in to cancel booking');
    }

    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003/api';
    const response = await fetch(`${backendUrl}/bookings/${bookingId}/cancel`, {
      method: 'POST',
      headers: authService.getAuthHeaders()
    });

    if (!response.ok) {
      const errorData = await response.json();
      const apiError = createApiError(response, errorData.error || errorData.message);
      throw new Error(handleApiError(apiError));
    }

    return await response.json();
  } catch (error) {
    console.error('Cancel booking error:', error);
    throw error;
  }
};

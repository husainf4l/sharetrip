export interface CreateBookingDto {
  tourId: string;
  headcount: number;
  specialRequests?: string;
}

export interface UpdateBookingDto {
  status?: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  specialRequests?: string;
}

export interface BookingFiltersDto {
  status?: string[];
  tourId?: string;
  travelerId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface BookingResponseDto {
  success: boolean;
  booking?: any;
  message: string;
}

import { handleApiError, createApiError } from '../utils/errorHandler';

interface TourFilters {
  cities?: string[];
  countries?: string[];
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  languages?: string[];
  travelStyles?: string[];
  sortBy?: string;
  page?: number;
  limit?: number;
}

class TourService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003/api';
  }

  async searchTours(filters: TourFilters) {
    try {
      const response = await fetch(`${this.baseUrl}/tours/share-tours/filter`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filters)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        const apiError = createApiError(response, errorData.error || errorData.message);
        throw new Error(handleApiError(apiError));
      }

      return await response.json();
    } catch (error) {
      console.error('Tour search error:', error);
      throw error;
    }
  }

  async getFilterOptions() {
    try {
      const response = await fetch(`${this.baseUrl}/tours/share-tours/quickfilters`);
      
      if (!response.ok) {
        const errorData = await response.json();
        const apiError = createApiError(response, errorData.error || errorData.message);
        throw new Error(handleApiError(apiError));
      }

      return await response.json();
    } catch (error) {
      console.error('Filter options error:', error);
      throw error;
    }
  }

  async getTourById(tourId: string) {
    try {
      const response = await fetch(`${this.baseUrl}/tours/${tourId}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        const apiError = createApiError(response, errorData.error || errorData.message);
        throw new Error(handleApiError(apiError));
      }

      return await response.json();
    } catch (error) {
      console.error('Get tour error:', error);
      throw error;
    }
  }
}

export const tourService = new TourService();
export type { TourFilters };
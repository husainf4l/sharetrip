import { handleApiError, createApiError } from '../utils/errorHandler';
import { CreateTourDto, Tour, TourQueryDto, ToursResponse } from '../types/tour';

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

  async getAllTours(query?: TourQueryDto): Promise<ToursResponse> {
    try {
      const params = new URLSearchParams();
      
      if (query) {
        if (query.category) params.append('category', query.category);
        if (query.city) params.append('city', query.city);
        if (query.country) params.append('country', query.country);
        if (query.search) params.append('search', query.search);
        if (query.minPrice) params.append('minPrice', query.minPrice.toString());
        if (query.maxPrice) params.append('maxPrice', query.maxPrice.toString());
        if (query.minGroup) params.append('minGroup', query.minGroup.toString());
        if (query.maxGroup) params.append('maxGroup', query.maxGroup.toString());
        if (query.minDuration) params.append('minDuration', query.minDuration.toString());
        if (query.maxDuration) params.append('maxDuration', query.maxDuration.toString());
        if (query.language) params.append('language', query.language);
        if (query.languages?.length) params.append('languages', query.languages.join(','));
        if (query.travelStyles?.length) params.append('travelStyles', query.travelStyles.join(','));
        if (query.accessibility?.length) params.append('accessibility', query.accessibility.join(','));
        if (query.startWindow) params.append('startWindow', query.startWindow);
        if (query.instantBook !== undefined) params.append('instantBook', query.instantBook.toString());
        if (query.minHostRating) params.append('minHostRating', query.minHostRating.toString());
        if (query.isDropIn !== undefined) params.append('isDropIn', query.isDropIn.toString());
        if (query.isEarlyBird !== undefined) params.append('isEarlyBird', query.isEarlyBird.toString());
        if (query.status) params.append('status', query.status);
        if (query.startDate) params.append('startDate', query.startDate);
        if (query.endDate) params.append('endDate', query.endDate);
        if (query.tags?.length) params.append('tags', query.tags.join(','));
        if (query.page) params.append('page', query.page.toString());
        if (query.limit) params.append('limit', query.limit.toString());
        if (query.sortBy) params.append('sortBy', query.sortBy);
        if (query.sortOrder) params.append('sortOrder', query.sortOrder);
      }

      const queryString = params.toString();
      const url = queryString ? `/tours?${queryString}` : '/tours';
      
      const response = await fetch(`${this.baseUrl}${url}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        const apiError = createApiError(response, errorData.error || errorData.message);
        throw new Error(handleApiError(apiError));
      }

      return await response.json();
    } catch (error) {
      console.error('Get all tours error:', error);
      throw error;
    }
  }

  async createTour(tourData: CreateTourDto): Promise<Tour> {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${this.baseUrl}/tours/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tourData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        const apiError = createApiError(response, errorData.error || errorData.message);
        throw new Error(handleApiError(apiError));
      }

      return await response.json();
    } catch (error) {
      console.error('Create tour error:', error);
      throw error;
    }
  }

  async updateTour(tourId: string, tourData: Partial<CreateTourDto>): Promise<Tour> {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${this.baseUrl}/tours/${tourId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tourData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        const apiError = createApiError(response, errorData.error || errorData.message);
        throw new Error(handleApiError(apiError));
      }

      return await response.json();
    } catch (error) {
      console.error('Update tour error:', error);
      throw error;
    }
  }
}

export const tourService = new TourService();
export type { TourFilters };
import { handleApiError, createApiError } from '../utils/errorHandler';
import { CreateTourDto, Tour, TourQueryDto, ToursResponse, CancellationPolicy } from '../types/tour';

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
        let errorData: any = null;
        
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.log('Failed to parse error response as JSON:', parseError);
          try {
            const rawResponse = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${rawResponse}`);
          } catch (textError) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        }
        
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
        let errorData: any = null;
        
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.log('Failed to parse error response as JSON:', parseError);
          try {
            const rawResponse = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${rawResponse}`);
          } catch (textError) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        }
        
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
        let errorData: any = null;
        
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.log('Failed to parse error response as JSON:', parseError);
          try {
            const rawResponse = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${rawResponse}`);
          } catch (textError) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        }
        
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
        let errorData: any = null;
        
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.log('Failed to parse error response as JSON:', parseError);
          try {
            const rawResponse = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${rawResponse}`);
          } catch (textError) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        }
        
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
      console.log('Auth token exists:', !!token);
      console.log('Auth token length:', token?.length || 0);
      
      if (!token) {
        throw new Error('Authentication token not found');
      }

      // If there are photos, use FormData for multipart upload
      if (tourData.photos && tourData.photos.length > 0) {
        const formData = new FormData();
        
        // Add tour data as individual form fields instead of JSON
        formData.append('title', tourData.title);
        formData.append('city', tourData.city);
        formData.append('country', tourData.country);
        formData.append('category', tourData.category);
        if (tourData.description) formData.append('description', tourData.description);
        
        // Add arrays as JSON strings
        formData.append('startTimes', JSON.stringify(tourData.startTimes));
        console.log('startTimes being sent:', tourData.startTimes);
        formData.append('languages', JSON.stringify(tourData.languages || []));
        formData.append('travelStyles', JSON.stringify(tourData.travelStyles || []));
        formData.append('accessibility', JSON.stringify(tourData.accessibility || []));
        formData.append('tags', JSON.stringify(tourData.tags || []));
        formData.append('searchKeywords', JSON.stringify(tourData.searchKeywords || []));
        formData.append('whatsIncluded', JSON.stringify(tourData.whatsIncluded || []));
        formData.append('whatsExcluded', JSON.stringify(tourData.whatsExcluded || []));
        formData.append('requirements', JSON.stringify(tourData.requirements || []));
        formData.append('highlights', JSON.stringify(tourData.highlights || []));
        
        // Add primitive fields
        formData.append('basePrice', tourData.basePrice.toString());
        formData.append('currency', tourData.currency || 'USD');
        formData.append('minGroup', tourData.minGroup.toString());
        formData.append('maxGroup', tourData.maxGroup.toString());
        formData.append('durationMins', tourData.durationMins.toString());
        formData.append('language', tourData.language);
        formData.append('isPayWhatYouWant', (tourData.isPayWhatYouWant || false).toString());
        formData.append('status', tourData.status || 'draft');
        formData.append('startWindow', tourData.startWindow || 'morning');
        formData.append('instantBook', (tourData.instantBook || false).toString());
        formData.append('cancellationPolicy', tourData.cancellationPolicy || 'standard');
        
        // Add optional fields
        if (tourData.latitude) formData.append('latitude', tourData.latitude.toString());
        if (tourData.longitude) formData.append('longitude', tourData.longitude.toString());
        if (tourData.meetingPoint) formData.append('meetingPoint', tourData.meetingPoint);
        if (tourData.itinerary) formData.append('itinerary', tourData.itinerary);
        if (tourData.difficulty) formData.append('difficulty', tourData.difficulty);
        if (tourData.ageRestriction) formData.append('ageRestriction', tourData.ageRestriction);
        
        // Add photos
        tourData.photos.forEach((photo, index) => {
          formData.append('photos', photo);
        });
        
        // Add cover photo if specified
        if (tourData.coverPhoto) {
          formData.append('coverPhoto', tourData.coverPhoto);
        }

        const response = await fetch(`${this.baseUrl}/tours/create`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
            // Don't set Content-Type, let browser set it with boundary for FormData
          },
          body: formData
        });
        
        console.log('Request URL:', `${this.baseUrl}/tours/create`);
        console.log('Request headers:', {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data (auto-generated)'
        });
        console.log('FormData contents:');
        // Iterate over FormData entries manually for better compatibility
        const formDataObj: { [key: string]: any } = {};
        formData.forEach((value, key) => {
          formDataObj[key] = value;
          if (value instanceof File) {
            console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
          } else {
            console.log(`${key}: ${key === 'startTimes' || key.includes('whats') || key.includes('requirements') || key.includes('highlights') ? JSON.parse(value as string) : value}`);
          }
        });
        
        if (!response.ok) {
          console.log('Response status:', response.status);
          console.log('Response status text:', response.statusText);
          console.log('Response headers: [Headers object - detailed logging disabled for compatibility]');
          
          let errorData: any = null;
          let rawResponse: string = '';
          
          try {
            errorData = await response.json();
            console.log('Error response data:', errorData);
            console.log('Error details:', JSON.stringify(errorData, null, 2));
          } catch (parseError) {
            console.log('Failed to parse error response as JSON, trying text:', parseError);
            try {
              rawResponse = await response.text();
              console.log('Raw error response:', rawResponse);
            } catch (textError) {
              console.log('Failed to read error response as text:', textError);
            }
          }
          
          if (errorData) {
            const apiError = createApiError(response, errorData.error || errorData.message);
            throw new Error(handleApiError(apiError));
          } else if (rawResponse) {
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${rawResponse}`);
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        }

        return await response.json();
      } else {
        // Original JSON-only approach for tours without photos
        const response = await fetch(`${this.baseUrl}/tours/create`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(tourData)
        });
        
        console.log('Request URL:', `${this.baseUrl}/tours/create`);
        console.log('Request headers:', {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        console.log('Request body:', JSON.stringify(tourData, null, 2));
        
        if (!response.ok) {
          console.log('Response status:', response.status);
          console.log('Response status text:', response.statusText);
          console.log('Response headers: [Headers object - detailed logging disabled for compatibility]');
          
          let errorData: any = null;
          let rawResponse: string = '';
          
          try {
            errorData = await response.json();
            console.log('Error response data:', errorData);
            console.log('Error details:', JSON.stringify(errorData, null, 2));
          } catch (parseError) {
            console.log('Failed to parse error response as JSON, trying text:', parseError);
            try {
              rawResponse = await response.text();
              console.log('Raw error response:', rawResponse);
            } catch (textError) {
              console.log('Failed to read error response as text:', textError);
            }
          }
          
          if (errorData) {
            const apiError = createApiError(response, errorData.error || errorData.message);
            throw new Error(handleApiError(apiError));
          } else if (rawResponse) {
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${rawResponse}`);
          } else {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        }

        return await response.json();
      }
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
        let errorData: any = null;
        
        try {
          errorData = await response.json();
        } catch (parseError) {
          console.log('Failed to parse error response as JSON:', parseError);
          try {
            const rawResponse = await response.text();
            throw new Error(`HTTP ${response.status}: ${response.statusText} - ${rawResponse}`);
          } catch (textError) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }
        }
        
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
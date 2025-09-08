// API Service for direct backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003/api';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}, isRetry = false): Promise<any> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header if token exists
    const token = localStorage.getItem('accessToken');
    if (token) {
      (config.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Handle token expiration - try to refresh token once
        if (response.status === 401 && !isRetry) {
          const refreshToken = localStorage.getItem('refreshToken');
          if (refreshToken) {
            try {
              const refreshResponse = await this.refreshAccessToken();
              if (refreshResponse.accessToken) {
                // Retry the original request with new token
                localStorage.setItem('accessToken', refreshResponse.accessToken);
                return this.request(endpoint, options, true);
              }
            } catch (refreshError) {
              console.error('Token refresh failed:', refreshError);
              // Refresh failed, clear tokens
              localStorage.removeItem('accessToken');
              localStorage.removeItem('refreshToken');
            }
          }
        }

        // Provide more specific error messages for common HTTP status codes
        let errorMessage = data.message || `HTTP error! status: ${response.status}`;

        if (response.status === 401) {
          errorMessage = data.message || "Token has expired. Please log in again.";
        } else if (response.status === 403) {
          errorMessage = data.message || "Forbidden - You don't have permission";
        } else if (response.status === 404) {
          errorMessage = data.message || "Not found - The requested resource doesn't exist";
        } else if (response.status >= 500) {
          errorMessage = data.message || "Server error - Please try again later";
        }

        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      // Handle network errors and other fetch failures
      if (error instanceof TypeError && error.message.includes('fetch')) {
        // Network error - backend might be down
        console.warn('Network error - backend server may be unavailable:', url);
        throw new Error('Unable to connect to server. Please check your internet connection and try again.');
      }

      // Log and re-throw other errors (like HTTP errors from above)
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication methods
  async login(credentials: { email: string; password: string }) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: { name: string; email: string; password: string; wantToHost?: boolean }) {
    const endpoint = userData.wantToHost ? '/auth/signup/host' : '/auth/signup/traveler';
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  async verifyEmail(token: string) {
    return this.request('/auth/verify-email', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  async getCurrentUser() {
    const response = await this.request('/auth/me', {
      method: 'GET',
    });

    // The backend returns { user: {...}, message: "..." }
    // We need to return just the user object
    return response.user || response;
  }

  async refreshAccessToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    return this.request('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    });
  }

  async requestPasswordReset(email: string) {
    return this.request('/auth/password/request', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(token: string, password: string) {
    return this.request('/auth/password/reset', {
      method: 'POST',
      body: JSON.stringify({ token, password }),
    });
  }

  async resendVerification(email: string) {
    return this.request('/auth/resend-verify', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  }

  // GetYourGuide integration
  async searchGetYourGuideTours(query: { location?: string; activity?: string; date?: string }) {
    return this.request('/getyourguide/search', {
      method: 'POST',
      body: JSON.stringify(query),
    });
  }

  async getGetYourGuideTourDetails(tourId: string) {
    return this.request(`/getyourguide/tour/${tourId}`, {
      method: 'GET',
    });
  }

  async createBookingWithGetYourGuide(data: { 
    tourId: string; 
    headcount: number; 
    specialRequests?: string;
    getYourGuideData?: Record<string, unknown>;
  }) {
    return this.request(`/bookings/${data.tourId}`, {
      method: 'POST',
      body: JSON.stringify({
        headcount: data.headcount,
        specialRequests: data.specialRequests,
        getYourGuideData: data.getYourGuideData
      }),
    });
  }

  async sendPhoneOtp(data: { userId: string; phone: string }) {
    return this.request('/onboarding/send-phone-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async verifyPhoneOtp(data: { userId: string; phone: string; code: string }) {
    return this.request('/onboarding/verify-phone-otp', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async submitKyc(data: { userId: string; documents: Record<string, unknown>[] }) {
    return this.request('/onboarding/submit-kyc', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async setupPayout(data: { userId: string; stripeToken: string }) {
    return this.request('/onboarding/setup-payout', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async saveStep(data: { userId: string; stepNumber: number; data: Record<string, unknown> }) {
    return this.request('/onboarding/save-step', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
  // Health check to verify backend connectivity
  async checkBackendHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return { status: 'healthy', message: 'Backend is running' };
      } else {
        return { status: 'unhealthy', message: `Backend responded with status ${response.status}` };
      }
    } catch (error: unknown) {
      console.error('Health check failed:', error);
      return { status: 'unavailable', message: 'Unable to connect to backend server' };
    }
  }
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;

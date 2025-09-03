// API Service for direct backend communication
const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003';

class ApiService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_BASE_URL;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
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
      (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        // Provide more specific error messages for common HTTP status codes
        let errorMessage = data.message || `HTTP error! status: ${response.status}`;

        if (response.status === 401) {
          errorMessage = data.message || "Unauthorized - Please log in again";
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
    return this.request('/auth/signup', {
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

  // Onboarding methods
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

  async submitKyc(data: { userId: string; documents: any[] }) {
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
}

// Export a singleton instance
export const apiService = new ApiService();
export default apiService;

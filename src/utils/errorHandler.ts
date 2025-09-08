export const handleApiError = (error: { status?: number; message?: string }): string => {
  if (error.status === 401) {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    window.location.href = '/login';
    return 'Session expired. Please log in again.';
  }
  
  if (error.status === 403) {
    return 'You do not have permission to perform this action';
  }
  
  if (error.status === 404) {
    return 'The requested resource was not found';
  }
  
  if (error.status === 409) {
    return 'You already have a booking for this tour';
  }

  if (error.status === 422) {
    return 'Invalid data provided. Please check your input.';
  }

  if (error.status === 429) {
    return 'Too many requests. Please try again later.';
  }

  if (error.status && error.status >= 500) {
    return 'Server error. Please try again later.';
  }
  
  return error.message || 'An unexpected error occurred';
};

export class ApiError extends Error {
  status: number;
  
  constructor(message: string, status: number) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
  }
}

export const createApiError = (response: Response, message?: string): ApiError => {
  return new ApiError(
    message || `HTTP ${response.status}: ${response.statusText}`,
    response.status
  );
};

export const isApiError = (error: unknown): error is ApiError => {
  return error instanceof ApiError;
};
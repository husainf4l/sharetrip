# ShareTrip Frontend Integration Report

_Generated on September 8, 2025_

## 🎯 Executive Summary

This report provides a comprehensive guide for frontend developers to integrate with the ShareTrip backend booking system. The backend has been restructured with a dedicated booking module, improved error handling, and enhanced API endpoints.

---

## 🏗️ Backend Architecture Overview

### **Current Module Structure**

```
src/
├── auth/           # Authentication & JWT
├── bookings/       # 🆕 Dedicated booking module
├── tours/          # Tour management
├── users/          # User profiles & preferences
├── onboarding/     # Host onboarding flow
└── utils/          # Shared utilities
```

### **Database Schema**

```sql
-- Core entities for frontend integration
User (id, name, email, role, image)
Tour (id, title, city, country, basePrice, maxGroup, status)
Booking (id, tourId, travelerId, status, headcount, priceAtBooking)
GuideProfile (id, userId, bio, ratingAvg)
```

---

## 🔌 API Endpoints Reference

### **🔐 Authentication Endpoints**

```javascript
// Base URL: http://localhost:3003/api

// User signup
POST / auth / signup / traveler;
Body: {
  name, email, password;
}

// User login
POST / auth / login;
Body: {
  email, password;
}
Returns: {
  accessToken, refreshToken, user;
}

// Get current user
GET / auth / me;
Headers: {
  Authorization: "Bearer <token>";
}
```

### **🎫 Tour Endpoints**

```javascript
// Get tours with filters
GET /tours/share-tours/filter?cities=Paris&minPrice=50&maxPrice=200
POST /tours/share-tours/filter
Body: { cities: ["Paris"], minPrice: 50, maxPrice: 200 }

// Get quick filter options
GET /tours/share-tours/quickfilters
Returns: { cities: [], countries: [], languages: [] }

// Host endpoints
POST /tours/host/create
PUT /tours/host/:tourId
GET /tours/host/my-tours
```

### **📅 Booking Endpoints (New Module)**

```javascript
// Create booking
POST /bookings/:tourId
Body: { headcount: 2, specialRequests: "Dietary restrictions" }
Headers: { Authorization: "Bearer <token>" }

// Get user bookings
GET /bookings/my-bookings?status=confirmed&page=1&limit=10
Headers: { Authorization: "Bearer <token>" }

// Get host bookings
GET /bookings/host/bookings?tourId=123&status=pending
Headers: { Authorization: "Bearer <token>" }

// Update booking status
PUT /bookings/:bookingId
Body: { status: "confirmed" }
Headers: { Authorization: "Bearer <token>" }

// Cancel booking
POST /bookings/:bookingId/cancel
Headers: { Authorization: "Bearer <token>" }

// Get booking statistics
GET /bookings/stats?isHost=false
Headers: { Authorization: "Bearer <token>" }
```

---

## 💻 Frontend Implementation Guide

### **1. Authentication Flow**

```typescript
// types/auth.ts
interface User {
  id: string;
  name: string;
  email: string;
  role: "TRAVELER" | "HOST" | "EXPLORER";
  image?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

// services/auth.service.ts
class AuthService {
  async login(email: string, password: string) {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Login failed");
    }

    const data = await response.json();
    localStorage.setItem("token", data.accessToken);
    return data;
  }

  async getCurrentUser() {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.json();
  }
}
```

### **2. Booking Management**

```typescript
// types/booking.ts
interface Booking {
  id: string;
  tourId: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  headcount: number;
  priceAtBooking: number;
  createdAt: string;
  tour: {
    title: string;
    city: string;
    startTimes: string[];
  };
}

interface CreateBookingDto {
  headcount: number;
  specialRequests?: string;
}

// services/booking.service.ts
class BookingService {
  private getAuthHeaders() {
    const token = localStorage.getItem("token");
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  }

  async createBooking(tourId: string, booking: CreateBookingDto) {
    const response = await fetch(`/api/bookings/${tourId}`, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(booking),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Booking failed");
    }

    return response.json();
  }

  async getUserBookings(filters?: {
    status?: string[];
    page?: number;
    limit?: number;
  }) {
    const params = new URLSearchParams();
    if (filters?.status) params.set("status", filters.status.join(","));
    if (filters?.page) params.set("page", filters.page.toString());
    if (filters?.limit) params.set("limit", filters.limit.toString());

    const response = await fetch(`/api/bookings/my-bookings?${params}`, {
      headers: this.getAuthHeaders(),
    });

    return response.json();
  }

  async updateBookingStatus(bookingId: string, status: string) {
    const response = await fetch(`/api/bookings/${bookingId}`, {
      method: "PUT",
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ status }),
    });

    return response.json();
  }

  async cancelBooking(bookingId: string) {
    const response = await fetch(`/api/bookings/${bookingId}/cancel`, {
      method: "POST",
      headers: this.getAuthHeaders(),
    });

    return response.json();
  }
}
```

### **3. Tour Discovery**

```typescript
// services/tour.service.ts
class TourService {
  async searchTours(filters: {
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
  }) {
    const response = await fetch("/api/tours/share-tours/filter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filters),
    });

    return response.json();
  }

  async getFilterOptions() {
    const response = await fetch("/api/tours/share-tours/quickfilters");
    return response.json();
  }
}
```

---

## 🎨 React Components Examples

### **Booking Form Component**

```tsx
// components/BookingForm.tsx
import React, { useState } from "react";
import { BookingService } from "../services/booking.service";

interface BookingFormProps {
  tourId: string;
  maxGroup: number;
  basePrice: number;
  onSuccess: (booking: any) => void;
}

export const BookingForm: React.FC<BookingFormProps> = ({
  tourId,
  maxGroup,
  basePrice,
  onSuccess,
}) => {
  const [headcount, setHeadcount] = useState(1);
  const [specialRequests, setSpecialRequests] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bookingService = new BookingService();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await bookingService.createBooking(tourId, {
        headcount,
        specialRequests: specialRequests || undefined,
      });

      onSuccess(result.booking);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Booking failed");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = basePrice * headcount;

  return (
    <form onSubmit={handleSubmit} className="booking-form">
      <h3>Book This Tour</h3>

      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label>Number of People</label>
        <select
          value={headcount}
          onChange={(e) => setHeadcount(Number(e.target.value))}
        >
          {Array.from({ length: maxGroup }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Special Requests (Optional)</label>
        <textarea
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          placeholder="Dietary restrictions, accessibility needs, etc."
        />
      </div>

      <div className="price-summary">
        <p>Total: ${(totalPrice / 100).toFixed(2)}</p>
      </div>

      <button type="submit" disabled={loading} className="book-button">
        {loading ? "Booking..." : "Book Now"}
      </button>
    </form>
  );
};
```

### **User Bookings Dashboard**

```tsx
// components/UserBookings.tsx
import React, { useState, useEffect } from "react";
import { BookingService } from "../services/booking.service";

export const UserBookings: React.FC = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  const bookingService = new BookingService();

  useEffect(() => {
    loadBookings();
  }, [filter]);

  const loadBookings = async () => {
    try {
      const filters = filter === "all" ? {} : { status: [filter] };
      const result = await bookingService.getUserBookings(filters);
      setBookings(result.bookings);
    } catch (error) {
      console.error("Failed to load bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    try {
      await bookingService.cancelBooking(bookingId);
      loadBookings(); // Refresh list
    } catch (error) {
      console.error("Failed to cancel booking:", error);
    }
  };

  if (loading) return <div>Loading bookings...</div>;

  return (
    <div className="user-bookings">
      <h2>My Bookings</h2>

      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={filter === "pending" ? "active" : ""}
        >
          Pending
        </button>
        <button
          onClick={() => setFilter("confirmed")}
          className={filter === "confirmed" ? "active" : ""}
        >
          Confirmed
        </button>
      </div>

      <div className="bookings-list">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <h3>{booking.tour.title}</h3>
            <p>{booking.tour.city}</p>
            <p>
              Status:{" "}
              <span className={`status-${booking.status}`}>
                {booking.status}
              </span>
            </p>
            <p>People: {booking.headcount}</p>
            <p>Total: ${(booking.priceAtBooking / 100).toFixed(2)}</p>

            {booking.status === "pending" && (
              <button
                onClick={() => handleCancelBooking(booking.id)}
                className="cancel-button"
              >
                Cancel Booking
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
```

---

## ⚠️ Error Handling Guide

### **Common Error Scenarios**

```typescript
// utils/errorHandler.ts
export const handleApiError = (error: any) => {
  if (error.status === 401) {
    // Redirect to login
    localStorage.removeItem("token");
    window.location.href = "/login";
    return;
  }

  if (error.status === 403) {
    return "You do not have permission to perform this action";
  }

  if (error.status === 404) {
    return "The requested resource was not found";
  }

  if (error.status === 409) {
    return "You already have a booking for this tour";
  }

  return error.message || "An unexpected error occurred";
};

// Example usage in components
try {
  await bookingService.createBooking(tourId, bookingData);
} catch (error) {
  const errorMessage = handleApiError(error);
  setError(errorMessage);
}
```

### **Expected Error Messages**

- `"User authentication failed"` - Invalid/expired token
- `"Tour not found"` - Invalid tour ID
- `"You already have a booking for this tour"` - Duplicate booking
- `"Not enough spots available"` - Tour at capacity
- `"Invalid headcount. Must be between 1 and 20"` - Validation error

---

## 🔄 State Management (Redux/Zustand)

### **Booking Store Example (Zustand)**

```typescript
// stores/bookingStore.ts
import { create } from "zustand";
import { BookingService } from "../services/booking.service";

interface BookingStore {
  bookings: Booking[];
  loading: boolean;
  error: string | null;

  fetchBookings: () => Promise<void>;
  createBooking: (tourId: string, data: CreateBookingDto) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  clearError: () => void;
}

export const useBookingStore = create<BookingStore>((set, get) => ({
  bookings: [],
  loading: false,
  error: null,

  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      const bookingService = new BookingService();
      const result = await bookingService.getUserBookings();
      set({ bookings: result.bookings, loading: false });
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to fetch bookings",
        loading: false,
      });
    }
  },

  createBooking: async (tourId: string, data: CreateBookingDto) => {
    set({ loading: true, error: null });
    try {
      const bookingService = new BookingService();
      await bookingService.createBooking(tourId, data);
      // Refresh bookings list
      await get().fetchBookings();
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to create booking",
        loading: false,
      });
      throw error; // Re-throw for component handling
    }
  },

  cancelBooking: async (bookingId: string) => {
    try {
      const bookingService = new BookingService();
      await bookingService.cancelBooking(bookingId);
      // Update local state
      set((state) => ({
        bookings: state.bookings.map((booking) =>
          booking.id === bookingId
            ? { ...booking, status: "cancelled" }
            : booking
        ),
      }));
    } catch (error) {
      set({
        error:
          error instanceof Error ? error.message : "Failed to cancel booking",
      });
    }
  },

  clearError: () => set({ error: null }),
}));
```

---

## 🎨 CSS Styling Guide

### **Booking Status Indicators**

```css
/* styles/booking-status.css */
.status-pending {
  color: #f59e0b;
  background: #fef3c7;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-confirmed {
  color: #10b981;
  background: #d1fae5;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-cancelled {
  color: #ef4444;
  background: #fee2e2;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}

.status-completed {
  color: #6b7280;
  background: #f3f4f6;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.875rem;
  font-weight: 500;
}
```

### **Booking Form Styles**

```css
/* styles/booking-form.css */
.booking-form {
  max-width: 400px;
  padding: 24px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 4px;
  font-weight: 500;
  color: #374151;
}

.form-group select,
.form-group textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 14px;
}

.price-summary {
  background: #f9fafb;
  padding: 12px;
  border-radius: 4px;
  margin: 16px 0;
}

.book-button {
  width: 100%;
  background: #3b82f6;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
}

.book-button:disabled {
  background: #9ca3af;
  cursor: not-allowed;
}

.error-message {
  background: #fee2e2;
  color: #dc2626;
  padding: 8px 12px;
  border-radius: 4px;
  margin-bottom: 16px;
  font-size: 14px;
}
```

---

## 🧪 Testing Recommendations

### **API Testing**

```typescript
// tests/bookingService.test.ts
import { BookingService } from "../services/booking.service";

describe("BookingService", () => {
  const bookingService = new BookingService();

  beforeEach(() => {
    // Mock localStorage
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(() => "mock-token"),
        setItem: jest.fn(),
        removeItem: jest.fn(),
      },
      writable: true,
    });
  });

  it("should create booking successfully", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          success: true,
          booking: { id: "123", status: "pending" },
          message: "Booking created successfully",
        }),
    });

    const result = await bookingService.createBooking("tour-123", {
      headcount: 2,
      specialRequests: "Vegetarian meals",
    });

    expect(result.success).toBe(true);
    expect(result.booking.id).toBe("123");
  });

  it("should handle booking errors", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      json: () =>
        Promise.resolve({
          error: "You already have a booking for this tour",
        }),
    });

    await expect(
      bookingService.createBooking("tour-123", { headcount: 2 })
    ).rejects.toThrow("You already have a booking for this tour");
  });
});
```

---

## 🚀 Deployment Considerations

### **Environment Variables**

```typescript
// config/environment.ts
export const config = {
  apiBaseUrl: process.env.REACT_APP_API_BASE_URL || "http://localhost:3003/api",
  environment: process.env.NODE_ENV || "development",
};

// Usage in services
const response = await fetch(`${config.apiBaseUrl}/bookings/${tourId}`, {
  // ... request options
});
```

### **Production Optimizations**

1. **API Request Caching**

   ```typescript
   // Add request caching for tour filters
   const cachedFilters = useMemo(() => {
     return tourService.getFilterOptions();
   }, []);
   ```

2. **Error Boundary**

   ```tsx
   // components/ErrorBoundary.tsx
   class ErrorBoundary extends React.Component {
     // Handle booking-related errors gracefully
   }
   ```

3. **Loading States**
   ```tsx
   // Use skeleton screens for booking lists
   const BookingSkeleton = () => (
     <div className="animate-pulse">{/* Skeleton content */}</div>
   );
   ```

---

## 📱 Mobile Considerations

### **Responsive Design**

```css
/* Mobile-first booking form */
@media (max-width: 640px) {
  .booking-form {
    margin: 16px;
    padding: 16px;
  }

  .booking-card {
    padding: 12px;
    margin-bottom: 12px;
  }
}
```

### **Touch-Friendly Interactions**

```css
.book-button {
  min-height: 44px; /* iOS recommended touch target */
  font-size: 16px; /* Prevent zoom on iOS */
}
```

---

## ✅ Implementation Checklist

### **Phase 1: Core Booking**

- [ ] Set up authentication service
- [ ] Implement booking creation form
- [ ] Add booking status display
- [ ] Handle error scenarios

### **Phase 2: User Management**

- [ ] User bookings dashboard
- [ ] Booking filtering and search
- [ ] Cancellation flow
- [ ] Email notifications (optional)

### **Phase 3: Host Features**

- [ ] Host booking management
- [ ] Booking confirmation flow
- [ ] Revenue tracking
- [ ] Guest communication

### **Phase 4: Advanced Features**

- [ ] Real-time booking updates
- [ ] Payment integration
- [ ] Booking analytics
- [ ] Mobile app (React Native)

---

## 🎯 Next Steps

1. **Start with authentication** - Get user login/signup working
2. **Implement basic booking flow** - Tour booking and status display
3. **Add user dashboard** - View and manage bookings
4. **Test error scenarios** - Ensure robust error handling
5. **Optimize for mobile** - Responsive design and touch interactions

This report provides everything needed to successfully integrate with the ShareTrip booking backend. The new dedicated booking module makes the API more intuitive and the improved error handling will make debugging much easier! 🚀

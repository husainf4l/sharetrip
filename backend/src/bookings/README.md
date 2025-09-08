# Bookings Module

A dedicated module for handling tour booking operations in the ShareTrip backend.

## Overview

The Bookings module separates booking-related functionality from the Tours module, providing better organization and separation of concerns.

## Structure

```
src/bookings/
├── dto/
│   └── booking.dto.ts          # Data Transfer Objects
├── bookings.controller.ts      # HTTP endpoints
├── bookings.service.ts         # Business logic
├── bookings.module.ts          # Module definition
├── index.ts                    # Exports
└── README.md                   # This file
```

## API Endpoints

### Create Booking

```
POST /api/bookings/:tourId
Body: { headcount: number, specialRequests?: string }
Headers: Authorization: Bearer <token>
```

### Get User Bookings

```
GET /api/bookings/my-bookings?status=pending,confirmed&page=1&limit=20
Headers: Authorization: Bearer <token>
```

### Get Host Bookings

```
GET /api/bookings/host/bookings?tourId=<id>&status=pending&page=1&limit=20
Headers: Authorization: Bearer <token>
```

### Get Booking Details

```
GET /api/bookings/:bookingId
Headers: Authorization: Bearer <token>
```

### Update Booking

```
PUT /api/bookings/:bookingId
Body: { status?: 'confirmed' | 'cancelled' | 'completed', specialRequests?: string }
Headers: Authorization: Bearer <token>
```

### Cancel Booking

```
POST /api/bookings/:bookingId/cancel
Headers: Authorization: Bearer <token>
```

### Get Booking Stats

```
GET /api/bookings/stats?isHost=false
Headers: Authorization: Bearer <token>
```

## Features

### ✅ Validation & Security

- JWT authentication required for all endpoints
- Input validation for all booking data
- User permission checks (owner/host only)
- Booking capacity limits
- Duplicate booking prevention

### ✅ Status Management

- Pending → Confirmed/Cancelled
- Confirmed → Completed/Cancelled
- Status transition validation
- Host-only confirmation rights

### ✅ Comprehensive Queries

- Filter by status, date range, tour
- Pagination support
- Detailed booking information
- Related data inclusion (tour, user details)

### ✅ Error Handling

- Specific error messages
- Proper HTTP status codes
- Console logging for debugging

## Usage Examples

### Create a Booking

```typescript
const response = await fetch("/api/bookings/tour-123", {
  method: "POST",
  headers: {
    Authorization: "Bearer your-jwt-token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    headcount: 2,
    specialRequests: "Vegetarian meals please",
  }),
});
```

### Get User's Bookings

```typescript
const bookings = await fetch(
  "/api/bookings/my-bookings?status=confirmed&page=1",
  {
    headers: {
      Authorization: "Bearer your-jwt-token",
    },
  }
);
```

### Host Confirms Booking

```typescript
const response = await fetch("/api/bookings/booking-456", {
  method: "PUT",
  headers: {
    Authorization: "Bearer host-jwt-token",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    status: "confirmed",
  }),
});
```

## Data Models

### CreateBookingDto

```typescript
{
  tourId: string;
  headcount: number;
  specialRequests?: string;
}
```

### BookingResponseDto

```typescript
{
  success: boolean;
  booking?: BookingEntity;
  message: string;
}
```

### BookingFiltersDto

```typescript
{
  status?: string[];
  tourId?: string;
  travelerId?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}
```

## Migration from Tours Module

The following endpoints have been moved from `/api/tours` to `/api/bookings`:

- `POST /api/tours/book/:tourId` → `POST /api/bookings/:tourId`
- `GET /api/tours/my-bookings` → `GET /api/bookings/my-bookings`
- `GET /api/tours/host/:tourId/bookings` → `GET /api/bookings/host/bookings`

## Benefits

1. **Separation of Concerns**: Tours and bookings have distinct responsibilities
2. **Better Organization**: Easier to find and maintain booking-related code
3. **Scalability**: Easier to add booking-specific features
4. **Testing**: More focused unit tests
5. **API Clarity**: Clear endpoint naming and structure

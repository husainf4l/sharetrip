# ShareTrip Backend - Authentication System

## Overview

This is the backend API for ShareTrip, built with NestJS, TypeScript, and Prisma. The authentication system provides secure user registration, email verification, and login functionality.

## Features

- ✅ User registration with optional email verification
- ✅ Secure password hashing with Argon2
- ✅ JWT-based authentication with access and refresh tokens
- ✅ Email verification system (optional)
- ✅ Password reset functionality
- ✅ Role-based user management
- ✅ PostgreSQL database with Prisma ORM

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Authentication**: JWT + Argon2
- **Validation**: class-validator

## Setup

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sharetripx/backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**

   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Update the `.env` file with your configuration:
   ```env
   DATABASE_URL=postgresql://username:password@localhost:5432/sharetrip
   JWT_SECRET=your-super-secret-jwt-key-here
   PORT=3003
   ```

4. **Database Setup**

   Generate Prisma client and run migrations:
   ```bash
   npm run prisma:generate
   npm run prisma:migrate
   ```

5. **Start the Development Server**
   ```bash
   npm run start:dev
   ```

   The server will start on `http://localhost:3003`

## API Endpoints

### Authentication Endpoints

All endpoints are prefixed with `/api/auth`

#### 1. User Registration

**POST** `/api/auth/signup`

Register a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword123",
  "wantToHost": false
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "user-uuid",
    "email": "john@example.com",
    "name": "John Doe"
  },
  "verificationToken": "verification-token-here"
}
```

#### 2. Email Verification

**POST** `/api/auth/verify-email`

Verify user's email address using the token from signup.

**Request Body:**
```json
{
  "token": "verification-token-from-signup"
}
```

**Response (201 Created):**
```json
{
  "ok": true
}
```

#### 3. User Login

**POST** `/api/auth/login`

Authenticate user and receive JWT tokens.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword123"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "accessToken": "jwt-access-token",
  "refreshToken": "jwt-refresh-token"
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid credentials

#### 4. Get Current User

**GET** `/api/auth/me`

Check if user is authenticated and get current user information.

**Request Headers:**
```
Authorization: Bearer <jwt-access-token>
```

**Response (200 OK - Authenticated):**
```json
{
  "user": {
    "id": "user-uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "traveler",
    "emailVerified": true,
    "createdAt": "2025-09-02T21:00:00.000Z"
  },
  "authenticated": true
}
```

**Response (200 OK - Not Authenticated):**
```json
{
  "authenticated": false,
  "message": "Auth check endpoint working",
  "note": "Send JWT token in Authorization header to get user info"
}
```

#### 4. Password Reset Request

**POST** `/api/auth/password/request`

Request a password reset token.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

#### 5. Password Reset

**POST** `/api/auth/password/reset`

Reset password using the reset token.

**Request Body:**
```json
{
  "token": "password-reset-token",
  "password": "newpassword123"
}
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

#### 6. Resend Verification Email

**POST** `/api/auth/resend-verify`

Resend email verification token.

**Request Body:**
```json
{
  "email": "john@example.com"
}
```

**Response (200 OK):**
```json
{
  "ok": true
}
```

#### 7. Get Current User

**GET** `/api/auth/me`

Check authentication status and get current user information.

**Request Headers:**
```
Authorization: Bearer <jwt-access-token>
```

**Response (200 OK):**
```json
{
  "authenticated": false,
  "message": "Auth check endpoint working",
  "note": "Send JWT token in Authorization header to get user info"
}
```

## Authentication Flow

### 1. User Registration Flow

```mermaid
graph TD
    A[POST /api/auth/signup] --> B[Validate Input]
    B --> C[Check Email Uniqueness]
    C --> D[Hash Password with Argon2]
    D --> E[Create User in Database]
    E --> F[Generate Verification Token]
    F --> G[Send Verification Email]
    G --> H[Return User + Token]
```

### 2. Login Flow

```mermaid
graph TD
    A[POST /api/auth/login] --> B[Validate Credentials]
    B --> C[Check Email Exists]
    C --> D[Verify Password Hash]
    D --> E[Generate JWT Tokens]
    E --> F[Store Refresh Token]
    F --> G[Return Tokens]
```

## Database Schema

### User Model

```prisma
model User {
  id              String    @id @default(uuid())
  name            String?
  email           String?   @unique
  passwordHash    String?
  emailVerified   Boolean   @default(false)
  emailVerifiedAt DateTime?
  role            String    @default("traveler")
  createdAt       DateTime  @default(now())

  refreshTokens      RefreshToken[]
  verificationTokens VerificationToken[]
}
```

### VerificationToken Model

```prisma
model VerificationToken {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  tokenHash String
  type      String   // email_verify | password_reset
  expiresAt DateTime
  used      Boolean  @default(false)
}
```

### RefreshToken Model

```prisma
model RefreshToken {
  id           String   @id @default(uuid())
  user         User     @relation(fields: [userId], references: [id])
  userId       String
  tokenHash    String
  expiresAt    DateTime
  revoked      Boolean  @default(false)
}
```

## Security Features

### Password Security
- Passwords are hashed using Argon2 (industry standard)
- Salted and computationally expensive hashing
- No plain text passwords stored

### Token Security
- JWT access tokens (15-minute expiry)
- JWT refresh tokens (7-day expiry)
- Refresh tokens are hashed before storage
- Automatic token revocation on password reset

### Email Verification
- Optional before login (users can login immediately after signup)
- Time-limited verification tokens (30 minutes)
- One-time use tokens
- Secure token hashing

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `400 Bad Request`: Validation errors, expired tokens
- `401 Unauthorized`: Invalid credentials
- `404 Not Found`: User not found
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Server errors

## Development

### Available Scripts

```bash
# Development server
npm run start:dev

# Production build
npm run build

# Start production server
npm run start

# Run tests
npm test

# Database operations
npm run prisma:generate
npm run prisma:migrate
npm run prisma:studio
```

### Project Structure

```
src/
├── auth/
│   ├── auth.controller.ts    # Authentication endpoints
│   ├── auth.service.ts       # Authentication business logic
│   └── auth.module.ts        # Auth module configuration
├── utils/
│   ├── mailer.service.ts     # Email service (console logging)
│   ├── otp.service.ts        # OTP generation
│   └── stripe.service.ts     # Payment processing
├── prisma.service.ts         # Database service
├── main.ts                   # Application entry point
└── app.module.ts            # Root module
```

## Testing the API

### Using cURL

```bash
# 1. Sign up
curl -X POST http://localhost:3003/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'

# 2. Login (no email verification needed)
curl -X POST http://localhost:3003/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# 3. Check authentication status
curl -X GET http://localhost:3003/api/auth/me

# Optional: Verify email later if needed
curl -X POST http://localhost:3003/api/auth/verify-email \
  -H "Content-Type: application/json" \
  -d '{"token":"your-verification-token"}'
```

### Using Postman

1. Import the API endpoints
2. Set base URL to `http://localhost:3003/api`
3. Test each endpoint with appropriate request bodies

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Required |
| `JWT_SECRET` | Secret key for JWT signing | Required |
| `PORT` | Server port | 3333 |
| `NODE_ENV` | Environment mode | development |

## Contributing

1. Follow the existing code style
2. Add tests for new features
3. Update documentation
4. Create pull requests with clear descriptions

## License

This project is licensed under the MIT License.

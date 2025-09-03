import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003';

// Routes that require authentication
const protectedRoutes = [
  '/dashboard',
  '/become-host',
  '/profile',
  '/bookings',
  '/settings',
  '/account'
];

// Routes that are public (no auth required)
const publicRoutes = [
  '/',
  '/tours',
  '/share-tours',
  '/auth/login',
  '/auth/signup',
  '/auth/verify-email',
  '/auth/password'
];

// API routes that don't need middleware processing
const apiRoutes = [
  '/api/auth/login',
  '/api/auth/signup',
  '/api/auth/verify-email',
  '/api/auth/password',
  '/api/onboarding',
  '/api/tours/filter'
];

async function validateToken(token: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    return response.ok;
  } catch (error) {
    console.error('Token validation failed:', error);
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for API routes, static files, and Next.js internals
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.') ||
    apiRoutes.some(route => pathname.startsWith(route))
  ) {
    return NextResponse.next();
  }

  // Check if the route requires authentication
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route + '/'));

  // If it's a protected route, check for authentication
  if (isProtectedRoute) {
    const accessToken = request.cookies.get('accessToken')?.value;

    if (!accessToken) {
      // No token found, redirect to login
      const loginUrl = new URL('/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    // Validate the token with the backend
    const isValidToken = await validateToken(accessToken);

    if (!isValidToken) {
      // Token is invalid, clear it and redirect to login
      const response = NextResponse.redirect(new URL('/auth/login', request.url));
      response.cookies.delete('accessToken');
      response.cookies.delete('refreshToken');
      return response;
    }

    // Token is valid, continue
    return NextResponse.next();
  }

  // For public routes or routes that don't match our patterns, continue normally
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files with extensions
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)',
  ],
};

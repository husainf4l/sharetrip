import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would verify the user's session/token
    // and return their profile information

    // For now, return a mock user object
    const mockUser = {
      id: 'user_123',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'TRAVELER',
      createdAt: new Date().toISOString(),
    };

    return NextResponse.json(mockUser);
  } catch (error) {
    console.error('Auth me error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

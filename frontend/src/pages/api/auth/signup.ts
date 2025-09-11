import { NextRequest, NextResponse } from 'next/server';

export default async function handler(req: NextRequest) {
  if (req.method !== 'POST') return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
  
  try {
    const body = await req.json();
    
    // Default to TRAVELER role for backward compatibility
    const requestBody = {
      ...body,
      role: body.role || 'TRAVELER'
    };

    // Use the new register endpoint
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3003'}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });
    
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error('Signup API error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

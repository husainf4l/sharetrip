import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { key, filename, contentType, size } = await request.json();

    // Validate input
    if (!key || !filename || !contentType || !size) {
      return NextResponse.json(
        { error: 'Missing required fields: key, filename, contentType, size' },
        { status: 400 }
      );
    }

    // Generate public URL
    // In production, this would be your CDN domain
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3004';
    const url = `${baseUrl}/uploads/${key}`;

    // Create media record
    const mediaRecord = {
      id: `media_${Date.now()}_${Math.random().toString(36).substring(2, 15)}`,
      url,
      key,
      filename,
      contentType,
      size,
      type: contentType.startsWith('image/') ? 'image' : 'video',
      uploadedAt: new Date().toISOString(),
    };

    // In a real application, you would save this to your database
    // For now, we'll just return the media record

    return NextResponse.json(mediaRecord);

  } catch (error) {
    console.error('Media registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = parseInt(searchParams.get('offset') || '0');

    // In a real application, you would fetch from your database
    // For now, return empty array
    const media: unknown[] = [];

    return NextResponse.json({
      media,
      total: 0,
      limit,
      offset,
    });

  } catch (error) {
    console.error('Media fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
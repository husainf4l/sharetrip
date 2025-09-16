import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { filename, contentType, size } = await request.json();

    // Validate input
    if (!filename || !contentType || !size) {
      return NextResponse.json(
        { error: 'Missing required fields: filename, contentType, size' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (size > maxSize) {
      return NextResponse.json(
        { error: 'File size too large. Maximum 10MB allowed.' },
        { status: 400 }
      );
    }

    // Validate content type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only images and videos are allowed.' },
        { status: 400 }
      );
    }

    // Generate unique key
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = filename.split('.').pop();
    const key = `uploads/${timestamp}-${randomId}.${fileExtension}`;

    // For development/demo purposes, we'll use a mock upload URL
    // In production, this would integrate with your cloud storage provider
    const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3004';
    const uploadUrl = `${baseUrl}/api/upload/${key}`;

    return NextResponse.json({
      uploadUrl,
      key,
      fields: {
        'Content-Type': contentType,
        'x-amz-acl': 'public-read',
      },
    });

  } catch (error) {
    console.error('Presign error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
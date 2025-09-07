import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const headersList = await headers()
    const authorization = headersList.get('authorization')

    if (!authorization) {
      return NextResponse.json(
        { error: 'Authorization header required' },
        { status: 401 }
      )
    }

    // Extract token from "Bearer <token>"
    const token = authorization.split(' ')[1]
    if (!token) {
      return NextResponse.json(
        { error: 'Invalid authorization format' },
        { status: 401 }
      )
    }

    // Transform the frontend data to match backend expectations
    const tourData = {
      title: body.title,
      city: body.city,
      country: body.country,
      category: body.category,
      description: body.description,
      basePrice: Math.round(body.basePrice * 100), // Convert to cents
      minGroup: body.minGroup,
      maxGroup: body.maxGroup,
      durationMins: body.durationMins,
      language: body.primaryLanguage,
      languages: [body.primaryLanguage, ...body.additionalLanguages],
      isPayWhatYouWant: body.isPayWhatYouWant,
      travelStyles: body.travelStyles,
      accessibility: body.accessibility,
      startWindow: body.availability?.timeSlots?.[0] || 'morning',
      instantBook: body.instantBook,
      cancellationPolicy: body.cancellationPolicy,
      isEarlyBird: body.isEarlyBird,
      meetingPoint: body.meetingPoint,
      tags: body.tags,
      searchKeywords: body.searchKeywords,
      
      // Additional fields from the comprehensive form
      highlights: body.highlights?.filter((h: string) => h.trim()),
      whatsIncluded: body.whatsIncluded?.filter((w: string) => w.trim()),
      whatsNotIncluded: body.whatsNotIncluded?.filter((w: string) => w.trim()),
      whatToBring: body.whatToBring?.filter((w: string) => w.trim()),
      importantInfo: body.importantInfo?.filter((i: string) => i.trim()),
      itinerary: body.itinerary,
      ageRestrictions: body.ageRestrictions,
      fitnessLevel: body.fitnessLevel,
      weatherPolicy: body.weatherPolicy,
      earlyBirdDiscount: body.earlyBirdDiscount,
      
      // Set default values for required backend fields
      startTimes: body.startTimes?.map((time: string) => {
        const today = new Date()
        const [hours, minutes] = time.split(':')
        const startTime = new Date(today)
        startTime.setHours(parseInt(hours), parseInt(minutes), 0, 0)
        return startTime.toISOString()
      }) || [],
      
      status: 'pending_review' // Tours start in review state
    }

    // Make request to backend API
    const backendResponse = await fetch(`${process.env.BACKEND_URL}/tours/host/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(tourData)
    })

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}))
      return NextResponse.json(
        { 
          error: 'Failed to create tour',
          details: errorData.message || 'Unknown error occurred'
        },
        { status: backendResponse.status }
      )
    }

    const createdTour = await backendResponse.json()

    return NextResponse.json({
      success: true,
      tour: createdTour,
      message: 'Tour created successfully and submitted for review'
    })

  } catch (error) {
    console.error('Error creating tour:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle OPTIONS for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}

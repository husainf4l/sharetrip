const API = process.env.NEXT_PUBLIC_API_URL!

export interface ParsedIntent {
  destination: {
    city: string
    country: string
  }
  dates?: {
    from: string
    to: string
  }
  durationDays?: number
  party: {
    adults: number
    children: number
  }
  budget?: number
  interests: string[]
}

export interface Plan {
  id: string
  summary: {
    destination: string
    duration: string
    totalBudget: number
    highlights: string[]
  }
  hotels: HotelItem[]
  days: DayPlan[]
  tours: TourItem[]
}

export interface HotelItem {
  id: string
  name: string
  image: string
  price: number
  currency: string
  score: number
  tags: string[]
  url: string
}

export interface TourItem {
  id: string
  title: string
  image: string
  duration: string
  price: number
  currency: string
  dayFit: string
  url: string
}

export interface DayPlan {
  date: string
  slots: TimeSlot[]
}

export interface TimeSlot {
  time: 'morning' | 'lunch' | 'afternoon' | 'evening'
  title: string
  lat?: number
  lng?: number
  durationMin?: number
  notes?: string
  address?: string
}

class APIError extends Error {
  constructor(message: string, public status: number) {
    super(message)
    this.name = 'APIError'
  }
}

async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new APIError(`HTTP error! status: ${response.status}`, response.status)
    }

    return response.json()
  } catch (error) {
    if (error instanceof APIError) throw error
    throw new APIError('Network error occurred', 0)
  }
}

export async function parseIntent(text: string): Promise<ParsedIntent> {
  return fetchAPI<ParsedIntent>('/ai/parse-intent', {
    method: 'POST',
    body: JSON.stringify({ text }),
    cache: 'no-store',
  })
}

export async function createPlan(payload: ParsedIntent): Promise<Plan> {
  return fetchAPI<Plan>('/ai/plan', {
    method: 'POST',
    body: JSON.stringify(payload),
    cache: 'no-store',
  })
}

export async function getPlan(id: string): Promise<Plan> {
  return fetchAPI<Plan>(`/ai/plan/${id}`, {
    cache: 'no-store',
  })
}

export async function refinePlan(id: string, changes: string): Promise<Plan> {
  return fetchAPI<Plan>('/ai/refine', {
    method: 'POST',
    body: JSON.stringify({ planId: id, changes }),
    cache: 'no-store',
  })
}

export { APIError }
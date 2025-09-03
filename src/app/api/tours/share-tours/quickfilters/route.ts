import { NextResponse } from 'next/server';

// Mock filter options for share tours
const mockFilterOptions = {
  cities: [
    'Amsterdam',
    'Barcelona', 
    'Berlin',
    'Lisbon',
    'London',
    'Paris',
    'Rome',
    'Tokyo'
  ],
  countries: [
    'France',
    'Germany', 
    'Italy',
    'Japan',
    'Netherlands',
    'Portugal',
    'Spain',
    'United Kingdom'
  ],
  languages: [
    'English',
    'French',
    'German',
    'Italian',
    'Japanese',
    'Dutch',
    'Portuguese',
    'Spanish'
  ],
  travelStyles: [
    'adventurous',
    'culture',
    'foodie',
    'nightlife',
    'relaxed'
  ],
  accessibility: [
    'wheelchair-accessible',
    'hearing-accessible',
    'vision-accessible'
  ],
  durations: [
    '0-2',
    '2-4', 
    '4+'
  ],
  groupSizes: [
    'small',
    'medium',
    'large'
  ],
  startWindows: [
    'morning',
    'afternoon',
    'evening',
    'flexible'
  ],
  cancellationPolicies: [
    'free-cancellation',
    'partial-refund',
    'no-refund'
  ],
  sortOptions: [
    { value: 'compatible', label: 'Most compatible' },
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'spots_left', label: 'Spots left' },
    { value: 'starting_soon', label: 'Starting soon' },
    { value: 'rating', label: 'Highest rated' }
  ]
};

export async function GET() {
  try {
    return NextResponse.json(mockFilterOptions);
  } catch (error) {
    console.error('Share Tours QuickFilters API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
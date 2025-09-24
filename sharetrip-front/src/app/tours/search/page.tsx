'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import SearchBar from '@/components/search/SearchBar'
import { formatMinor } from '@/utils/money'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import {
  StarIcon,
  HeartIcon,
  FilterIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  LanguagesIcon,
  TicketIcon,
  CarIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL!

interface Tour {
  id: string
  title: string
  image: string
  location: string
  category: string
  duration: string
  rating: number
  reviewCount: number
  price: number
  currency: string
  originalPrice?: number
  features: string[]
  badges: string[]
  languages: string[]
  groupSize?: string
}

interface SearchFilters {
  city: string
  dateFrom: string
  dateTo: string
  adults: number
  children: number
  priceRange: [number, number]
  categories: string[]
  duration: string[]
  features: string[]
  languages: string[]
}

const FEATURE_ICONS = {
  'skip-line': TicketIcon,
  'private': UsersIcon,
  'pickup': CarIcon,
  'guide': UsersIcon
}

const CATEGORIES = [
  'Cultural & Historical',
  'Food & Drink',
  'Adventure & Sports',
  'Museums & Galleries',
  'Nature & Wildlife',
  'Entertainment',
  'Transportation',
  'Walking Tours'
]

const DURATIONS = [
  'Up to 1 hour',
  '1-3 hours',
  '3-6 hours',
  'Full day (6+ hours)',
  'Multi-day'
]

const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'German',
  'Italian',
  'Portuguese',
  'Chinese',
  'Japanese'
]

function ToursSearchContent() {
  const searchParams = useSearchParams()
  const [tours, setTours] = useState<Tour[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState('recommended')
  const [hasMore, setHasMore] = useState(true)

  const [filters, setFilters] = useState<SearchFilters>({
    city: searchParams.get('city') || '',
    dateFrom: searchParams.get('dateFrom') || '',
    dateTo: searchParams.get('dateTo') || '',
    adults: parseInt(searchParams.get('adults') || '2'),
    children: parseInt(searchParams.get('children') || '0'),
    priceRange: [0, 500],
    categories: [],
    duration: [],
    features: [],
    languages: []
  })

  useEffect(() => {
    fetchTours()
  }, [searchParams, sortBy])

  const fetchTours = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', sortBy)

      const response = await fetch(`${API}/api/tours?${params.toString()}`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch tours')
      }

      const data = await response.json()
      setTours(data.tours || [])
      setHasMore(data.hasMore || false)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load tours')
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = async () => {
    if (!hasMore || isLoading) return

    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set('offset', tours.length.toString())
      params.set('sort', sortBy)

      const response = await fetch(`${API}/api/tours?${params.toString()}`)
      const data = await response.json()

      setTours(prev => [...prev, ...(data.tours || [])])
      setHasMore(data.hasMore || false)
    } catch (error) {
      console.error('Failed to load more tours:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <SearchBar defaultTab="tours" className="max-w-2xl mx-auto" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-3 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm border p-6 space-y-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">Filters</h2>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden"
                >
                  ✕
                </Button>
              </div>

              {/* Date Range */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Dates</h3>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="date"
                    value={filters.dateFrom}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateFrom: e.target.value }))}
                    className="text-sm"
                  />
                  <Input
                    type="date"
                    value={filters.dateTo}
                    onChange={(e) => setFilters(prev => ({ ...prev, dateTo: e.target.value }))}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Travelers */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Travelers</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-xs text-gray-600">Adults</label>
                    <Input
                      type="number"
                      min="1"
                      value={filters.adults}
                      onChange={(e) => setFilters(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
                      className="text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600">Children</label>
                    <Input
                      type="number"
                      min="0"
                      value={filters.children}
                      onChange={(e) => setFilters(prev => ({ ...prev, children: parseInt(e.target.value) }))}
                      className="text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Price per person</h3>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                  max={500}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}+</span>
                </div>
              </div>

              {/* Categories */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Categories</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {CATEGORIES.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.categories.includes(category)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, categories: [...prev.categories, category] }))
                          } else {
                            setFilters(prev => ({ ...prev, categories: prev.categories.filter(c => c !== category) }))
                          }
                        }}
                      />
                      <span className="text-sm">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Duration</h3>
                <div className="space-y-2">
                  {DURATIONS.map(duration => (
                    <label key={duration} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.duration.includes(duration)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, duration: [...prev.duration, duration] }))
                          } else {
                            setFilters(prev => ({ ...prev, duration: prev.duration.filter(d => d !== duration) }))
                          }
                        }}
                      />
                      <span className="text-sm">{duration}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Features</h3>
                <div className="space-y-2">
                  {[
                    'Skip the line',
                    'Private group',
                    'Hotel pickup',
                    'Audio guide',
                    'Free cancellation',
                    'Instant confirmation'
                  ].map(feature => (
                    <label key={feature} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.features.includes(feature)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, features: [...prev.features, feature] }))
                          } else {
                            setFilters(prev => ({ ...prev, features: prev.features.filter(f => f !== feature) }))
                          }
                        }}
                      />
                      <span className="text-sm">{feature}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Languages</h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {LANGUAGES.map(language => (
                    <label key={language} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.languages.includes(language)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, languages: [...prev.languages, language] }))
                          } else {
                            setFilters(prev => ({ ...prev, languages: prev.languages.filter(l => l !== language) }))
                          }
                        }}
                      />
                      <span className="text-sm">{language}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-9">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden gap-2"
                >
                  <FilterIcon className="w-4 h-4" />
                  Filters
                </Button>

                <div className="text-sm text-gray-600">
                  {isLoading ? 'Searching...' : `${tours.length} tours found`}
                </div>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1"
                >
                  <option value="recommended">Recommended</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Guest Rating</option>
                  <option value="duration">Duration</option>
                </select>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Tours Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tours.map((tour) => (
                <div key={tour.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow group">
                  <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
                    <Image
                      src={tour.image}
                      alt={tour.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-200"
                      loading="lazy"
                    />
                    <button
                      className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <HeartIcon className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>

                    {/* Badges on image */}
                    <div className="absolute top-3 left-3 flex flex-col gap-1">
                      {tour.badges.slice(0, 2).map((badge, index) => (
                        <Badge key={index} className="bg-white/90 text-gray-900 text-xs px-2 py-1">
                          {badge}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <Badge variant="outline" className="text-xs mb-2">
                            {tour.category}
                          </Badge>
                          <h3 className="font-semibold text-gray-900 line-clamp-2 hover:text-blue-600">
                            <Link href={`/tours/${tour.id}`}>
                              {tour.title}
                            </Link>
                          </h3>
                          <div className="flex items-center gap-1 text-sm text-gray-600">
                            <MapPinIcon className="w-3 h-3" />
                            {tour.location}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-sm">{tour.rating}</span>
                          </div>
                          <p className="text-xs text-gray-500">({tour.reviewCount})</p>
                        </div>
                      </div>

                      {/* Tour details */}
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          <span>{tour.duration}</span>
                        </div>
                        {tour.groupSize && (
                          <div className="flex items-center gap-1">
                            <UsersIcon className="w-3 h-3" />
                            <span>{tour.groupSize}</span>
                          </div>
                        )}
                        {tour.languages.length > 0 && (
                          <div className="flex items-center gap-1">
                            <LanguagesIcon className="w-3 h-3" />
                            <span>{tour.languages.slice(0, 2).join(', ')}</span>
                          </div>
                        )}
                      </div>

                      {/* Features */}
                      {tour.features.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {tour.features.slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs px-1.5 py-0.5">
                              {feature}
                            </Badge>
                          ))}
                          {tour.features.length > 3 && (
                            <Badge variant="secondary" className="text-xs px-1.5 py-0.5">
                              +{tour.features.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-end justify-between pt-2 border-t border-gray-100">
                      <div>
                        {tour.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">
                            {formatMinor(tour.originalPrice, tour.currency)}
                          </p>
                        )}
                        <p className="text-xl font-bold">
                          {formatMinor(tour.price, tour.currency)}
                        </p>
                        <p className="text-sm text-gray-600">per person</p>
                      </div>

                      <Button asChild>
                        <Link href={`/tours/${tour.id}`}>
                          Book now
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && tours.length > 0 && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMore}
                  disabled={isLoading}
                  variant="outline"
                  className="gap-2"
                >
                  {isLoading ? 'Loading...' : 'Load more tours'}
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && tours.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MapPinIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No tours found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search criteria or dates
                </p>
                <Button variant="outline">
                  Modify search
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ToursSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <ToursSearchContent />
    </Suspense>
  )
}
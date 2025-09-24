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
  SortAscIcon,
  SortDescIcon,
  MapPinIcon,
  WifiIcon,
  CarIcon,
  UtensilsIcon,
  DumbbellIcon,
  WavesIcon
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const API = process.env.NEXT_PUBLIC_API_URL!

interface Hotel {
  id: string
  name: string
  image: string
  location: string
  rating: number
  score: number
  reviewCount: number
  price: number
  currency: string
  originalPrice?: number
  amenities: string[]
  badges: string[]
  distance?: number
}

interface SearchFilters {
  city: string
  dateFrom: string
  dateTo: string
  adults: number
  children: number
  priceRange: [number, number]
  rating: number[]
  amenities: string[]
  propertyType: string[]
  dealTypes: string[]
}

const AMENITY_ICONS = {
  wifi: WifiIcon,
  parking: CarIcon,
  breakfast: UtensilsIcon,
  fitness: DumbbellIcon,
  pool: WavesIcon
}

function StaysSearchContent() {
  const searchParams = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])
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
    priceRange: [0, 1000],
    rating: [],
    amenities: [],
    propertyType: [],
    dealTypes: []
  })

  useEffect(() => {
    fetchHotels()
  }, [searchParams, sortBy])

  const fetchHotels = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set('sort', sortBy)

      const response = await fetch(`${API}/api/accommodations?${params.toString()}`, {
        cache: 'no-store'
      })

      if (!response.ok) {
        throw new Error('Failed to fetch hotels')
      }

      const data = await response.json()
      setHotels(data.accommodations || [])
      setHasMore(data.hasMore || false)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load hotels')
    } finally {
      setIsLoading(false)
    }
  }

  const loadMore = async () => {
    if (!hasMore || isLoading) return

    try {
      const params = new URLSearchParams(searchParams.toString())
      params.set('offset', hotels.length.toString())
      params.set('sort', sortBy)

      const response = await fetch(`${API}/api/accommodations?${params.toString()}`)
      const data = await response.json()

      setHotels(prev => [...prev, ...(data.accommodations || [])])
      setHasMore(data.hasMore || false)
    } catch (error) {
      console.error('Failed to load more hotels:', error)
    }
  }

  const getSortLabel = () => {
    switch (sortBy) {
      case 'price_asc': return 'Price: Low to High'
      case 'price_desc': return 'Price: High to Low'
      case 'rating': return 'Guest Rating'
      case 'distance': return 'Distance'
      default: return 'Recommended'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <SearchBar defaultTab="hotels" className="max-w-2xl mx-auto" />
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

              {/* Guests */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Guests</h3>
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
                <h3 className="font-medium text-sm">Price per night</h3>
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                  max={1000}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>${filters.priceRange[0]}</span>
                  <span>${filters.priceRange[1]}+</span>
                </div>
              </div>

              {/* Star Rating */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Star Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.rating.includes(rating)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, rating: [...prev.rating, rating] }))
                          } else {
                            setFilters(prev => ({ ...prev, rating: prev.rating.filter(r => r !== rating) }))
                          }
                        }}
                      />
                      <div className="flex items-center gap-1">
                        {[...Array(rating)].map((_, i) => (
                          <StarIcon key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        ))}
                        {[...Array(5 - rating)].map((_, i) => (
                          <StarIcon key={i} className="w-3 h-3 text-gray-300" />
                        ))}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities */}
              <div className="space-y-3">
                <h3 className="font-medium text-sm">Amenities</h3>
                <div className="space-y-2">
                  {Object.entries(AMENITY_ICONS).map(([amenity, Icon]) => (
                    <label key={amenity} className="flex items-center gap-2 cursor-pointer">
                      <Checkbox
                        checked={filters.amenities.includes(amenity)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFilters(prev => ({ ...prev, amenities: [...prev.amenities, amenity] }))
                          } else {
                            setFilters(prev => ({ ...prev, amenities: prev.amenities.filter(a => a !== amenity) }))
                          }
                        }}
                      />
                      <Icon className="w-4 h-4 text-gray-600" />
                      <span className="text-sm capitalize">{amenity}</span>
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
                  {isLoading ? 'Searching...' : `${hotels.length} properties found`}
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
                  <option value="distance">Distance</option>
                </select>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {/* Hotels Grid */}
            <div className="space-y-4">
              {hotels.map((hotel) => (
                <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
                    {/* Image */}
                    <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                        loading="lazy"
                      />
                      <button
                        className="absolute top-3 right-3 w-8 h-8 bg-white/80 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                        aria-label="Add to wishlist"
                      >
                        <HeartIcon className="w-4 h-4 text-gray-600 hover:text-red-500" />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="md:col-span-2 space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                              <Link href={`/stays/${hotel.id}`}>
                                {hotel.name}
                              </Link>
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <MapPinIcon className="w-3 h-3" />
                              {hotel.location}
                              {hotel.distance && (
                                <span className="ml-2">• {hotel.distance}km from center</span>
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1">
                                <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                <span className="font-medium">{hotel.score}</span>
                              </div>
                              <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                                {hotel.score >= 9 ? 'Exceptional' :
                                 hotel.score >= 8 ? 'Very Good' :
                                 hotel.score >= 7 ? 'Good' : 'Fair'}
                              </Badge>
                            </div>
                            <p className="text-xs text-gray-500">{hotel.reviewCount} reviews</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex items-center gap-2">
                          {hotel.amenities.slice(0, 4).map((amenity, index) => {
                            const Icon = AMENITY_ICONS[amenity as keyof typeof AMENITY_ICONS]
                            return Icon ? (
                              <Icon key={index} className="w-4 h-4 text-gray-400" title={amenity} />
                            ) : (
                              <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                                {amenity}
                              </Badge>
                            )
                          })}
                          {hotel.amenities.length > 4 && (
                            <span className="text-xs text-gray-500">
                              +{hotel.amenities.length - 4} more
                            </span>
                          )}
                        </div>

                        {/* Badges */}
                        {hotel.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {hotel.badges.map((badge, index) => (
                              <Badge key={index} className="bg-green-100 text-green-800 text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-end justify-between pt-2">
                        <div className="text-right">
                          {hotel.originalPrice && (
                            <p className="text-sm text-gray-500 line-through">
                              {formatMinor(hotel.originalPrice, hotel.currency)}
                            </p>
                          )}
                          <p className="text-xl font-bold">
                            {formatMinor(hotel.price, hotel.currency)}
                          </p>
                          <p className="text-sm text-gray-600">per night</p>
                        </div>

                        <Button asChild>
                          <Link href={`/stays/${hotel.id}`}>
                            See availability
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            {hasMore && hotels.length > 0 && (
              <div className="text-center mt-8">
                <Button
                  onClick={loadMore}
                  disabled={isLoading}
                  variant="outline"
                  className="gap-2"
                >
                  {isLoading ? 'Loading...' : 'Load more hotels'}
                </Button>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && hotels.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <MapPinIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hotels found
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

export default function StaysSearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading search results...</p>
        </div>
      </div>
    }>
      <StaysSearchContent />
    </Suspense>
  )
}
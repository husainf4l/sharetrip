import { type HotelItem } from '@/lib/api'
import { formatMinor } from '@/utils/money'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { HeartIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface HotelsGridProps {
  items: HotelItem[]
}

export default function HotelsGrid({ items }: HotelsGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No hotels found for this plan</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommended Hotels</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((hotel) => (
          <div key={hotel.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow group">
            <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
              <Image
                src={hotel.image}
                alt={hotel.name}
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
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-1">
                <h3 className="font-medium text-gray-900 line-clamp-2">
                  {hotel.name}
                </h3>

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.score}</span>
                  </div>
                  <Badge variant="secondary" className="px-2 py-0.5 text-xs">
                    {hotel.score >= 9 ? 'Exceptional' :
                     hotel.score >= 8 ? 'Very Good' :
                     hotel.score >= 7 ? 'Good' : 'Fair'}
                  </Badge>
                </div>

                {hotel.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {hotel.tags.slice(0, 2).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-1.5 py-0.5">
                        {tag}
                      </Badge>
                    ))}
                    {hotel.tags.length > 2 && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                        +{hotel.tags.length - 2}
                      </Badge>
                    )}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="text-right">
                  <p className="text-xs text-gray-500">From</p>
                  <p className="font-semibold text-lg">
                    {formatMinor(hotel.price, hotel.currency)}
                  </p>
                  <p className="text-xs text-gray-500">per night</p>
                </div>

                <Button asChild className="w-full" size="sm">
                  {hotel.url.startsWith('http') ? (
                    <a href={hotel.url} target="_blank" rel="noopener noreferrer">
                      View Hotel
                    </a>
                  ) : (
                    <Link href={hotel.url}>
                      View Hotel
                    </Link>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
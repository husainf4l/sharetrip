import { type TourItem } from '@/lib/api'
import { formatMinor } from '@/utils/money'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ClockIcon } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

interface ToursGridProps {
  items: TourItem[]
}

export default function ToursGrid({ items }: ToursGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No tours found for this plan</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Recommended Tours & Activities</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((tour) => (
          <div key={tour.id} className="bg-white rounded-2xl shadow-sm border hover:shadow-md transition-shadow group">
            <div className="relative aspect-[4/3] rounded-t-2xl overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-200"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className="bg-white/90 text-gray-900 text-xs px-2 py-1">
                  <ClockIcon className="w-3 h-3 mr-1" />
                  {tour.duration}
                </Badge>
                {tour.dayFit && (
                  <Badge variant="secondary" className="bg-blue-500/90 text-white text-xs px-2 py-1">
                    {tour.dayFit}
                  </Badge>
                )}
              </div>
            </div>

            <div className="p-4 space-y-3">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-900 line-clamp-2 min-h-[2.5rem]">
                  {tour.title}
                </h3>

                <div className="text-right">
                  <p className="text-xs text-gray-500">From</p>
                  <p className="font-semibold text-lg">
                    {formatMinor(tour.price, tour.currency)}
                  </p>
                  <p className="text-xs text-gray-500">per person</p>
                </div>
              </div>

              <Button asChild className="w-full" size="sm">
                {tour.url.startsWith('http') ? (
                  <a href={tour.url} target="_blank" rel="noopener noreferrer">
                    Book Tour
                  </a>
                ) : (
                  <Link href={tour.url}>
                    Book Tour
                  </Link>
                )}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
'use client'

import { highlight } from '@/utils/search'
import { Badge } from '@/components/ui/badge'
import { ClockIcon, MapPinIcon, ImageIcon } from 'lucide-react'

export interface AutocompleteOption {
  id: string
  type: 'recent' | 'destination' | 'hotel' | 'tour'
  title: string
  subtitle?: string
  image?: string
  price?: {
    amount: number
    currency: string
  }
  badge?: string
  metadata?: {
    country?: string
    flag?: string
    count?: number
  }
}

interface AutocompleteListProps {
  options: AutocompleteOption[]
  query: string
  selectedIndex: number
  onSelect: (option: AutocompleteOption) => void
  onMouseEnter: (index: number) => void
}

export default function AutocompleteList({
  options,
  query,
  selectedIndex,
  onSelect,
  onMouseEnter
}: AutocompleteListProps) {
  if (options.length === 0) return null

  const groupedOptions = options.reduce((acc, option, index) => {
    if (!acc[option.type]) acc[option.type] = []
    acc[option.type].push({ ...option, originalIndex: index })
    return acc
  }, {} as Record<string, (AutocompleteOption & { originalIndex: number })[]>)

  const sectionLabels = {
    recent: 'Recent searches',
    destination: 'Popular destinations',
    hotel: 'Hotels',
    tour: 'Tours & Activities'
  }

  return (
    <div className="py-2">
      {Object.entries(groupedOptions).map(([type, sectionOptions]) => (
        <div key={type}>
          <div className="px-3 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide border-b border-gray-100">
            {sectionLabels[type as keyof typeof sectionLabels]}
          </div>

          <div role="listbox">
            {sectionOptions.map((option, sectionIndex) => (
              <div
                key={option.id}
                role="option"
                aria-selected={selectedIndex === option.originalIndex}
                className={`px-3 py-3 cursor-pointer flex items-center gap-3 border-b border-gray-50 last:border-b-0 ${
                  selectedIndex === option.originalIndex
                    ? 'bg-blue-50 text-blue-900'
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onSelect(option)}
                onMouseEnter={() => onMouseEnter(option.originalIndex)}
              >
                {/* Icon or Image */}
                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                  {option.image ? (
                    <img
                      src={option.image}
                      alt={option.title}
                      className="w-full h-full object-cover"
                    />
                  ) : option.type === 'recent' ? (
                    <ClockIcon className="w-4 h-4 text-gray-400" />
                  ) : option.type === 'destination' ? (
                    <div className="text-lg">
                      {option.metadata?.flag || '📍'}
                    </div>
                  ) : option.type === 'hotel' ? (
                    <div className="text-lg">🏨</div>
                  ) : (
                    <div className="text-lg">🎯</div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4
                      className="font-medium text-sm text-gray-900 truncate"
                      dangerouslySetInnerHTML={{
                        __html: highlight(option.title, query)
                      }}
                    />
                    {option.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {option.badge}
                      </Badge>
                    )}
                  </div>

                  {option.subtitle && (
                    <p className="text-xs text-gray-500 truncate">
                      {option.subtitle}
                    </p>
                  )}

                  {option.metadata?.count && (
                    <p className="text-xs text-gray-500">
                      {option.metadata.count.toLocaleString()} properties
                    </p>
                  )}
                </div>

                {/* Price */}
                {option.price && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">From</p>
                    <p className="font-semibold text-sm">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: option.price.currency
                      }).format(option.price.amount)}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
import { type Plan } from '@/lib/api'
import { formatMinor } from '@/utils/money'
import { Badge } from '@/components/ui/badge'
import { MapPinIcon, CalendarIcon, DollarSignIcon } from 'lucide-react'

interface SummaryHeaderProps {
  summary: Plan['summary']
}

export default function SummaryHeader({ summary }: SummaryHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 space-y-4">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <MapPinIcon className="w-6 h-6 text-blue-600" />
          {summary.destination}
        </h1>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <CalendarIcon className="w-4 h-4" />
            <span>{summary.duration}</span>
          </div>

          <div className="flex items-center gap-1">
            <DollarSignIcon className="w-4 h-4" />
            <span>Budget: {formatMinor(summary.totalBudget, 'USD')}</span>
          </div>
        </div>
      </div>

      {summary.highlights.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-700">Trip Highlights</h3>
          <div className="flex flex-wrap gap-2">
            {summary.highlights.map((highlight, index) => (
              <Badge key={index} variant="secondary" className="bg-white/70 text-gray-700">
                {highlight}
              </Badge>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
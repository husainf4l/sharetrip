import { type DayPlan } from '@/lib/api'
import { Badge } from '@/components/ui/badge'
import { ClockIcon, MapPinIcon, CopyIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface ItineraryTimelineProps {
  day: DayPlan
}

const TIME_LABELS = {
  morning: 'Morning',
  lunch: 'Lunch',
  afternoon: 'Afternoon',
  evening: 'Evening'
} as const

const TIME_ICONS = {
  morning: '🌅',
  lunch: '🍽️',
  afternoon: '☀️',
  evening: '🌆'
} as const

export default function ItineraryTimeline({ day }: ItineraryTimelineProps) {
  const copyAddress = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address)
    } catch (error) {
      console.error('Failed to copy address:', error)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const groupedSlots = day.slots.reduce((acc, slot) => {
    if (!acc[slot.time]) acc[slot.time] = []
    acc[slot.time].push(slot)
    return acc
  }, {} as Record<string, typeof day.slots>)

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900">
        {formatDate(day.date)}
      </h3>

      <div role="list" className="space-y-6">
        {(Object.keys(TIME_LABELS) as Array<keyof typeof TIME_LABELS>).map((timeSlot) => {
          const slots = groupedSlots[timeSlot]
          if (!slots?.length) return null

          return (
            <div key={timeSlot} className="relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-sm" role="img" aria-label={TIME_LABELS[timeSlot]}>
                    {TIME_ICONS[timeSlot]}
                  </span>
                </div>
                <h4 className="text-base font-medium text-gray-900">
                  {TIME_LABELS[timeSlot]}
                </h4>
              </div>

              <div role="list" className="ml-11 space-y-4">
                {slots.map((slot, index) => (
                  <div
                    key={`${timeSlot}-${index}`}
                    role="listitem"
                    className="bg-white rounded-lg border p-4 hover:shadow-sm transition-shadow"
                  >
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <h5 className="font-medium text-gray-900">
                          {slot.title}
                        </h5>

                        <div className="flex flex-wrap gap-2">
                          {slot.durationMin && (
                            <Badge variant="outline" className="text-xs gap-1">
                              <ClockIcon className="w-3 h-3" />
                              {slot.durationMin < 60
                                ? `${slot.durationMin}m`
                                : `${Math.floor(slot.durationMin / 60)}h ${slot.durationMin % 60}m`
                              }
                            </Badge>
                          )}
                        </div>

                        {slot.notes && (
                          <p className="text-sm text-gray-600">
                            {slot.notes}
                          </p>
                        )}

                        {slot.address && (
                          <div className="flex items-start gap-2">
                            <MapPinIcon className="w-4 h-4 text-gray-400 mt-0.5" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-gray-600 break-words">
                                {slot.address}
                              </p>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="px-2 py-1 h-auto"
                              onClick={() => copyAddress(slot.address!)}
                              title="Copy address"
                            >
                              <CopyIcon className="w-3 h-3" />
                              <span className="sr-only">Copy address</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
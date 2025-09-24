'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { refinePlan } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { WandIcon } from 'lucide-react'

interface RefineBoxProps {
  planId: string
}

export default function RefineBox({ planId }: RefineBoxProps) {
  const [changes, setChanges] = useState('')
  const [isRefining, setIsRefining] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleRefine = async () => {
    if (!changes.trim()) return

    setIsRefining(true)
    setError(null)

    try {
      await refinePlan(planId, changes)
      setChanges('')
      router.refresh()
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to refine plan')
    } finally {
      setIsRefining(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl border p-6 space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <WandIcon className="w-5 h-5 text-purple-600" />
          Refine Your Plan
        </h3>
        <p className="text-sm text-gray-600">
          Tell us what you'd like to change or add to your itinerary
        </p>
      </div>

      <div className="space-y-3">
        <Textarea
          value={changes}
          onChange={(e) => setChanges(e.target.value)}
          placeholder="I'd like to add more museums, or change the hotel to something closer to the city center, or add a cooking class on day 3..."
          className="min-h-[100px] resize-none"
          disabled={isRefining}
        />

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <Button
          onClick={handleRefine}
          disabled={!changes.trim() || isRefining}
          className="w-full gap-2"
        >
          {isRefining ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Refining plan...
            </>
          ) : (
            <>
              <WandIcon className="w-4 h-4" />
              Refine plan
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
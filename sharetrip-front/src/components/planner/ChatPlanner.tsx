'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { parseIntent, createPlan, type ParsedIntent } from '@/lib/api'
import { Button } from '@/components/ui/button'
import ParsedChips from './ParsedChips'

export default function ChatPlanner() {
  const [text, setText] = useState('')
  const [parsed, setParsed] = useState<ParsedIntent | null>(null)
  const [isParsingIntent, setIsParsingIntent] = useState(false)
  const [isCreatingPlan, setIsCreatingPlan] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleParseIntent = async () => {
    if (!text.trim()) return

    setIsParsingIntent(true)
    setError(null)

    try {
      const result = await parseIntent(text)
      setParsed(result)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to parse intent')
    } finally {
      setIsParsingIntent(false)
    }
  }

  const handleCreatePlan = async () => {
    if (!parsed) return

    setIsCreatingPlan(true)
    setError(null)

    try {
      const plan = await createPlan(parsed)
      router.push(`/planner/${plan.id}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to create plan')
    } finally {
      setIsCreatingPlan(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold">Plan Your Perfect Trip</h1>
        <p className="text-gray-600">Tell us about your dream vacation and we'll create a personalized itinerary</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="trip-text" className="block text-sm font-medium mb-2">
            Describe your trip
          </label>
          <textarea
            id="trip-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="I want to visit Paris for 5 days in June with 2 adults. We love art, food, and history. Budget around $3000."
            className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isParsingIntent || isCreatingPlan}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {!parsed ? (
          <Button
            onClick={handleParseIntent}
            disabled={!text.trim() || isParsingIntent}
            className="w-full"
          >
            {isParsingIntent ? 'Understanding your request...' : 'Understand my request'}
          </Button>
        ) : (
          <div className="space-y-4">
            <ParsedChips
              parsed={parsed}
              onChange={setParsed}
              disabled={isCreatingPlan}
            />

            <Button
              onClick={handleCreatePlan}
              disabled={isCreatingPlan}
              className="w-full"
            >
              {isCreatingPlan ? 'Creating your plan...' : 'Create my plan'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
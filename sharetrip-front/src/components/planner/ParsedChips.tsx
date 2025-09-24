'use client'

import { useState } from 'react'
import { type ParsedIntent } from '@/lib/api'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { CalendarIcon, MapPinIcon, UsersIcon, DollarSignIcon, HeartIcon } from 'lucide-react'

interface ParsedChipsProps {
  parsed: ParsedIntent
  onChange: (updated: ParsedIntent) => void
  disabled?: boolean
}

export default function ParsedChips({ parsed, onChange, disabled = false }: ParsedChipsProps) {
  const [isEditingDestination, setIsEditingDestination] = useState(false)
  const [isEditingDates, setIsEditingDates] = useState(false)
  const [isEditingParty, setIsEditingParty] = useState(false)
  const [isEditingBudget, setIsEditingBudget] = useState(false)
  const [isEditingInterests, setIsEditingInterests] = useState(false)

  const [tempValues, setTempValues] = useState({
    city: parsed.destination.city,
    country: parsed.destination.country,
    dateFrom: parsed.dates?.from || '',
    dateTo: parsed.dates?.to || '',
    durationDays: parsed.durationDays?.toString() || '',
    adults: parsed.party.adults.toString(),
    children: parsed.party.children.toString(),
    budget: parsed.budget?.toString() || '',
    interests: parsed.interests.join(', ')
  })

  const updateDestination = () => {
    onChange({
      ...parsed,
      destination: {
        city: tempValues.city,
        country: tempValues.country
      }
    })
    setIsEditingDestination(false)
  }

  const updateDates = () => {
    const updated = { ...parsed }

    if (tempValues.dateFrom && tempValues.dateTo) {
      updated.dates = {
        from: tempValues.dateFrom,
        to: tempValues.dateTo
      }
      delete updated.durationDays
    } else if (tempValues.durationDays) {
      updated.durationDays = parseInt(tempValues.durationDays)
      delete updated.dates
    }

    onChange(updated)
    setIsEditingDates(false)
  }

  const updateParty = () => {
    onChange({
      ...parsed,
      party: {
        adults: parseInt(tempValues.adults) || 1,
        children: parseInt(tempValues.children) || 0
      }
    })
    setIsEditingParty(false)
  }

  const updateBudget = () => {
    onChange({
      ...parsed,
      budget: tempValues.budget ? parseInt(tempValues.budget) : undefined
    })
    setIsEditingBudget(false)
  }

  const updateInterests = () => {
    onChange({
      ...parsed,
      interests: tempValues.interests
        .split(',')
        .map(i => i.trim())
        .filter(Boolean)
    })
    setIsEditingInterests(false)
  }

  return (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">Review your trip details:</h3>

      <div className="flex flex-wrap gap-2">
        {/* Destination */}
        <Popover open={isEditingDestination} onOpenChange={setIsEditingDestination}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              className="gap-1"
            >
              <MapPinIcon className="w-4 h-4" />
              {parsed.destination.city}, {parsed.destination.country}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <label className="text-sm font-medium">Destination</label>
              <Input
                placeholder="City"
                value={tempValues.city}
                onChange={(e) => setTempValues(prev => ({ ...prev, city: e.target.value }))}
              />
              <Input
                placeholder="Country"
                value={tempValues.country}
                onChange={(e) => setTempValues(prev => ({ ...prev, country: e.target.value }))}
              />
              <Button size="sm" onClick={updateDestination}>Update</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Dates/Duration */}
        <Popover open={isEditingDates} onOpenChange={setIsEditingDates}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              className="gap-1"
            >
              <CalendarIcon className="w-4 h-4" />
              {parsed.dates
                ? `${parsed.dates.from} to ${parsed.dates.to}`
                : `${parsed.durationDays} days`
              }
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <label className="text-sm font-medium">Dates or Duration</label>
              <Input
                type="date"
                placeholder="From"
                value={tempValues.dateFrom}
                onChange={(e) => setTempValues(prev => ({ ...prev, dateFrom: e.target.value }))}
              />
              <Input
                type="date"
                placeholder="To"
                value={tempValues.dateTo}
                onChange={(e) => setTempValues(prev => ({ ...prev, dateTo: e.target.value }))}
              />
              <div className="text-center text-sm text-gray-500">or</div>
              <Input
                type="number"
                placeholder="Duration (days)"
                value={tempValues.durationDays}
                onChange={(e) => setTempValues(prev => ({ ...prev, durationDays: e.target.value }))}
              />
              <Button size="sm" onClick={updateDates}>Update</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Party */}
        <Popover open={isEditingParty} onOpenChange={setIsEditingParty}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              className="gap-1"
            >
              <UsersIcon className="w-4 h-4" />
              {parsed.party.adults} adults
              {parsed.party.children > 0 && `, ${parsed.party.children} children`}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <label className="text-sm font-medium">Travelers</label>
              <Input
                type="number"
                min="1"
                placeholder="Adults"
                value={tempValues.adults}
                onChange={(e) => setTempValues(prev => ({ ...prev, adults: e.target.value }))}
              />
              <Input
                type="number"
                min="0"
                placeholder="Children"
                value={tempValues.children}
                onChange={(e) => setTempValues(prev => ({ ...prev, children: e.target.value }))}
              />
              <Button size="sm" onClick={updateParty}>Update</Button>
            </div>
          </PopoverContent>
        </Popover>

        {/* Budget */}
        {(parsed.budget || tempValues.budget) && (
          <Popover open={isEditingBudget} onOpenChange={setIsEditingBudget}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                disabled={disabled}
                className="gap-1"
              >
                <DollarSignIcon className="w-4 h-4" />
                ${parsed.budget?.toLocaleString() || 'Not set'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <label className="text-sm font-medium">Budget (USD)</label>
                <Input
                  type="number"
                  placeholder="Total budget"
                  value={tempValues.budget}
                  onChange={(e) => setTempValues(prev => ({ ...prev, budget: e.target.value }))}
                />
                <Button size="sm" onClick={updateBudget}>Update</Button>
              </div>
            </PopoverContent>
          </Popover>
        )}

        {/* Interests */}
        <Popover open={isEditingInterests} onOpenChange={setIsEditingInterests}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              disabled={disabled}
              className="gap-1"
            >
              <HeartIcon className="w-4 h-4" />
              {parsed.interests.length} interests
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="space-y-2">
              <label className="text-sm font-medium">Interests</label>
              <Input
                placeholder="art, food, history, museums..."
                value={tempValues.interests}
                onChange={(e) => setTempValues(prev => ({ ...prev, interests: e.target.value }))}
              />
              <div className="flex flex-wrap gap-1">
                {parsed.interests.map((interest, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
              <Button size="sm" onClick={updateInterests}>Update</Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}
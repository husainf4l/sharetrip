'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { debounce, getRecentSearches, addRecentSearch } from '@/utils/search'
import { parseFreeText, filtersToSearchParams } from '@/utils/query-parse'
import AutocompleteList, { type AutocompleteOption } from './AutocompleteList'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { SearchIcon, XIcon, LoaderIcon } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL!

interface SearchBarProps {
  defaultTab?: 'hotels' | 'tours'
  onTabChange?: (tab: 'hotels' | 'tours') => void
  placeholder?: string
  className?: string
}

export default function SearchBar({
  defaultTab = 'hotels',
  onTabChange,
  placeholder,
  className = ''
}: SearchBarProps) {
  const [activeTab, setActiveTab] = useState<'hotels' | 'tours'>(defaultTab)
  const [query, setQuery] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [options, setOptions] = useState<AutocompleteOption[]>([])
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const abortControllerRef = useRef<AbortController | null>(null)

  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const q = searchParams.get('q')
    const type = searchParams.get('type')

    if (q) setQuery(q)
    if (type === 'hotels' || type === 'tours') {
      setActiveTab(type)
    }
  }, [searchParams])

  const fetchSuggestions = useCallback(async (searchQuery: string, type: 'hotels' | 'tours') => {
    if (!searchQuery.trim()) {
      setOptions(getRecentSearches().map(search => ({
        id: `recent-${search.query}-${search.type}`,
        type: 'recent',
        title: search.query,
        subtitle: search.type === 'hotels' ? 'Hotels' : 'Tours & Activities'
      })))
      return
    }

    // Cancel previous request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
    }

    abortControllerRef.current = new AbortController()
    setIsLoading(true)

    try {
      // Mock API calls - replace with real endpoints
      const [popularDestinations, exactMatches] = await Promise.all([
        fetch(`${API}/api/destinations/popular?q=${encodeURIComponent(searchQuery)}`, {
          signal: abortControllerRef.current.signal
        }).then(r => r.ok ? r.json() : { destinations: [] }).catch(() => ({ destinations: [] })),

        fetch(`${API}/api/${type === 'hotels' ? 'accommodations' : 'tours'}/search?q=${encodeURIComponent(searchQuery)}&limit=3`, {
          signal: abortControllerRef.current.signal
        }).then(r => r.ok ? r.json() : { items: [] }).catch(() => ({ items: [] }))
      ])

      const suggestions: AutocompleteOption[] = []

      // Add recent searches
      const recentSearches = getRecentSearches()
        .filter(search =>
          search.query.toLowerCase().includes(searchQuery.toLowerCase()) &&
          search.type === type
        )
        .slice(0, 2)

      recentSearches.forEach(search => {
        suggestions.push({
          id: `recent-${search.query}`,
          type: 'recent',
          title: search.query,
          subtitle: search.type === 'hotels' ? 'Hotels' : 'Tours & Activities'
        })
      })

      // Add popular destinations
      if (popularDestinations.destinations) {
        popularDestinations.destinations.slice(0, 3).forEach((dest: any) => {
          suggestions.push({
            id: `dest-${dest.id}`,
            type: 'destination',
            title: dest.name,
            subtitle: dest.country,
            metadata: {
              country: dest.country,
              flag: dest.flag,
              count: dest.propertiesCount
            }
          })
        })
      }

      // Add exact matches
      if (exactMatches.items) {
        exactMatches.items.forEach((item: any) => {
          suggestions.push({
            id: item.id,
            type: type === 'hotels' ? 'hotel' : 'tour',
            title: item.name || item.title,
            subtitle: item.location || item.category,
            image: item.image,
            price: item.price ? {
              amount: item.price,
              currency: item.currency || 'USD'
            } : undefined,
            badge: item.badge
          })
        })
      }

      setOptions(suggestions)
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        return // Request was cancelled
      }
      console.error('Failed to fetch suggestions:', error)
      setOptions([])
    } finally {
      setIsLoading(false)
    }
  }, [])

  const debouncedFetch = useCallback(debounce(fetchSuggestions, 200), [fetchSuggestions])

  useEffect(() => {
    if (isOpen) {
      debouncedFetch(query, activeTab)
    }
  }, [query, activeTab, isOpen, debouncedFetch])

  const handleTabChange = (tab: 'hotels' | 'tours') => {
    setActiveTab(tab)
    setSelectedIndex(-1)
    onTabChange?.(tab)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    setSelectedIndex(-1)
  }

  const handleInputFocus = () => {
    setIsOpen(true)
  }

  const handleInputBlur = (e: React.FocusEvent) => {
    // Delay closing to allow for option clicks
    setTimeout(() => {
      if (!containerRef.current?.contains(document.activeElement)) {
        setIsOpen(false)
      }
    }, 200)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % Math.max(options.length, 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex(prev => prev <= 0 ? options.length - 1 : prev - 1)
        break
      case 'Enter':
        e.preventDefault()
        if (selectedIndex >= 0 && options[selectedIndex]) {
          handleSelect(options[selectedIndex])
        } else {
          handleSubmit()
        }
        break
      case 'Escape':
        setIsOpen(false)
        inputRef.current?.blur()
        break
    }
  }

  const handleSelect = (option: AutocompleteOption) => {
    if (option.type === 'recent' || option.type === 'destination') {
      setQuery(option.title)
      addRecentSearch(option.title, activeTab)
      navigateToResults(option.title)
    } else {
      // Navigate directly to the item
      const path = activeTab === 'hotels' ? `/stays/${option.id}` : `/tours/${option.id}`
      router.push(path)
    }
    setIsOpen(false)
  }

  const handleSubmit = () => {
    if (!query.trim()) return

    addRecentSearch(query, activeTab)
    navigateToResults(query)
    setIsOpen(false)
  }

  const navigateToResults = (searchQuery: string) => {
    const parsed = parseFreeText(searchQuery)
    const params = filtersToSearchParams(parsed, activeTab)
    params.set('q', searchQuery)

    const basePath = activeTab === 'hotels' ? '/stays/search' : '/tours/search'
    router.push(`${basePath}?${params.toString()}`)
  }

  const clearQuery = () => {
    setQuery('')
    setOptions([])
    inputRef.current?.focus()
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Tabs */}
      <div className="flex bg-gray-100 rounded-t-2xl p-1 mb-0">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-xl transition-colors ${
            activeTab === 'hotels'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabChange('hotels')}
        >
          Hotels
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-xl transition-colors ${
            activeTab === 'tours'
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
          onClick={() => handleTabChange('tours')}
        >
          Tours
        </button>
      </div>

      {/* Search Input */}
      <div className="relative bg-white rounded-b-2xl shadow-lg border border-gray-200">
        <div className="flex items-center">
          <SearchIcon className="absolute left-4 w-5 h-5 text-gray-400" />

          <Input
            ref={inputRef}
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            onKeyDown={handleKeyDown}
            placeholder={
              placeholder ||
              (activeTab === 'hotels'
                ? 'Search hotels, destinations, or "Paris 3 nights pool spa"'
                : 'Search tours, activities, or "Rome food tour skip line"')
            }
            className="pl-12 pr-20 py-4 border-0 text-lg bg-transparent focus:ring-0 focus:outline-none"
            role="combobox"
            aria-expanded={isOpen}
            aria-controls="search-listbox"
            aria-autocomplete="list"
          />

          <div className="absolute right-4 flex items-center gap-2">
            {isLoading && (
              <LoaderIcon className="w-4 h-4 text-gray-400 animate-spin" />
            )}

            {query && (
              <button
                onClick={clearQuery}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Clear search"
              >
                <XIcon className="w-4 h-4 text-gray-400" />
              </button>
            )}

            <Button
              onClick={handleSubmit}
              disabled={!query.trim()}
              size="sm"
              className="px-4"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Autocomplete Dropdown */}
        {isOpen && (
          <div
            id="search-listbox"
            className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-2xl shadow-xl max-h-96 overflow-y-auto z-50 mt-1"
          >
            <AutocompleteList
              options={options}
              query={query}
              selectedIndex={selectedIndex}
              onSelect={handleSelect}
              onMouseEnter={setSelectedIndex}
            />
          </div>
        )}
      </div>
    </div>
  )
}
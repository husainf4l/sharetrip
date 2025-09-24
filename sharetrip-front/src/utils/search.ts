export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function highlight(text: string, query: string): string {
  if (!query.trim()) return text

  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
  return text.replace(regex, '<mark class="bg-yellow-200 px-0.5 rounded">$1</mark>')
}

const RECENT_SEARCHES_KEY = 'recentSearches'
const MAX_RECENT_SEARCHES = 5

export interface RecentSearch {
  query: string
  type: 'hotels' | 'tours'
  timestamp: number
}

export function getRecentSearches(): RecentSearch[] {
  if (typeof window === 'undefined') return []

  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY)
    if (!stored) return []

    const searches = JSON.parse(stored) as RecentSearch[]
    return searches
      .filter(search => Date.now() - search.timestamp < 7 * 24 * 60 * 60 * 1000) // 7 days
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_RECENT_SEARCHES)
  } catch {
    return []
  }
}

export function addRecentSearch(query: string, type: 'hotels' | 'tours'): void {
  if (typeof window === 'undefined') return
  if (!query.trim()) return

  try {
    const searches = getRecentSearches()
    const existing = searches.findIndex(s => s.query === query && s.type === type)

    if (existing >= 0) {
      searches[existing].timestamp = Date.now()
    } else {
      searches.unshift({
        query,
        type,
        timestamp: Date.now()
      })
    }

    const filtered = searches
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, MAX_RECENT_SEARCHES)

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered))
  } catch {
    // Silently fail if localStorage is not available
  }
}

export function clearRecentSearches(): void {
  if (typeof window === 'undefined') return

  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY)
  } catch {
    // Silently fail
  }
}
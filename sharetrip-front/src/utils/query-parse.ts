export interface ParsedFilters {
  city?: string
  dateFrom?: string
  dateTo?: string
  durationDays?: number
  adults?: number
  children?: number
  keywords: string[]
}

const MONTH_NAMES = {
  jan: '01', january: '01',
  feb: '02', february: '02',
  mar: '03', march: '03',
  apr: '04', april: '04',
  may: '05',
  jun: '06', june: '06',
  jul: '07', july: '07',
  aug: '08', august: '08',
  sep: '09', september: '09',
  oct: '10', october: '10',
  nov: '11', november: '11',
  dec: '12', december: '12'
}

const HOTEL_AMENITY_KEYWORDS = [
  'pool', 'spa', 'wifi', 'breakfast', 'gym', 'fitness', 'parking', 'restaurant',
  'bar', 'beach', 'ocean', 'view', 'balcony', 'kitchen', 'kitchenette', 'ac',
  'air conditioning', 'elevator', 'accessible', 'pet friendly', 'smoking'
]

const TOUR_FEATURE_KEYWORDS = [
  'private', 'group', 'small group', 'pickup', 'hotel pickup', 'skip the line',
  'skip line', 'fast track', 'guide', 'audio guide', 'guided', 'self guided',
  'walking', 'bus', 'bike', 'boat', 'cruise', 'food', 'wine', 'tasting'
]

export function parseFreeText(text: string): ParsedFilters {
  const result: ParsedFilters = { keywords: [] }
  const lowerText = text.toLowerCase()

  // Extract city names (simple approach - looks for "in [city]" or cities at start)
  const cityPatterns = [
    /(?:in|to|visit(?:ing)?)\s+([a-zA-Z\s]+?)(?:\s|$|,|\d)/,
    /^([a-zA-Z\s]+?)(?:\s|$|,|\d)/
  ]

  for (const pattern of cityPatterns) {
    const match = lowerText.match(pattern)
    if (match && match[1]) {
      const city = match[1].trim()
      if (city.length > 2 && city.length < 30) {
        result.city = city
        break
      }
    }
  }

  // Extract duration
  const durationPatterns = [
    /(\d+)\s*(?:days?|nights?)/,
    /for\s+(\d+)\s*(?:days?|nights?)/,
    /(\d+)\s*(?:day|night)\s*(?:trip|stay|visit)/
  ]

  for (const pattern of durationPatterns) {
    const match = lowerText.match(pattern)
    if (match && match[1]) {
      result.durationDays = parseInt(match[1])
      break
    }
  }

  // Extract dates
  const datePatterns = [
    // June 10-17, Jun 10-17
    /(\w+)\s+(\d{1,2})\s*[-–]\s*(\d{1,2})/,
    // June 10 to June 17
    /(\w+)\s+(\d{1,2})\s+to\s+(\w+)\s+(\d{1,2})/,
    // 10-17 June
    /(\d{1,2})\s*[-–]\s*(\d{1,2})\s+(\w+)/
  ]

  for (const pattern of datePatterns) {
    const match = lowerText.match(pattern)
    if (match) {
      const currentYear = new Date().getFullYear()

      if (match.length === 4) { // Pattern 1
        const monthName = match[1].toLowerCase()
        const startDay = match[2]
        const endDay = match[3]
        const month = MONTH_NAMES[monthName as keyof typeof MONTH_NAMES]

        if (month) {
          result.dateFrom = `${currentYear}-${month}-${startDay.padStart(2, '0')}`
          result.dateTo = `${currentYear}-${month}-${endDay.padStart(2, '0')}`
          break
        }
      } else if (match.length === 5) { // Pattern 2
        const startMonth = MONTH_NAMES[match[1].toLowerCase() as keyof typeof MONTH_NAMES]
        const endMonth = MONTH_NAMES[match[3].toLowerCase() as keyof typeof MONTH_NAMES]

        if (startMonth && endMonth) {
          result.dateFrom = `${currentYear}-${startMonth}-${match[2].padStart(2, '0')}`
          result.dateTo = `${currentYear}-${endMonth}-${match[4].padStart(2, '0')}`
          break
        }
      }
    }
  }

  // Extract travelers
  const travelerPatterns = [
    /(\d+)\s*adults?/,
    /(\d+)\s*people/,
    /(\d+)\s*travelers?/
  ]

  for (const pattern of travelerPatterns) {
    const match = lowerText.match(pattern)
    if (match && match[1]) {
      result.adults = parseInt(match[1])
      break
    }
  }

  const childrenMatch = lowerText.match(/(\d+)\s*(?:children|kids?|child)/)
  if (childrenMatch && childrenMatch[1]) {
    result.children = parseInt(childrenMatch[1])
  }

  // Extract keywords
  const allKeywords = [...HOTEL_AMENITY_KEYWORDS, ...TOUR_FEATURE_KEYWORDS]
  const foundKeywords = allKeywords.filter(keyword =>
    lowerText.includes(keyword)
  )

  result.keywords = foundKeywords

  return result
}

export function filtersToSearchParams(
  filters: ParsedFilters,
  type: 'hotels' | 'tours'
): URLSearchParams {
  const params = new URLSearchParams()

  if (filters.city) params.set('city', filters.city)
  if (filters.dateFrom) params.set('dateFrom', filters.dateFrom)
  if (filters.dateTo) params.set('dateTo', filters.dateTo)
  if (filters.durationDays) params.set('duration', filters.durationDays.toString())
  if (filters.adults) params.set('adults', filters.adults.toString())
  if (filters.children) params.set('children', filters.children.toString())

  // Map keywords to type-specific filters
  if (type === 'hotels') {
    const hotelKeywords = filters.keywords.filter(k => HOTEL_AMENITY_KEYWORDS.includes(k))
    hotelKeywords.forEach(keyword => {
      switch (keyword) {
        case 'pool':
          params.set('amenity_pool', 'true')
          break
        case 'spa':
          params.set('amenity_spa', 'true')
          break
        case 'wifi':
          params.set('amenity_wifi', 'true')
          break
        case 'breakfast':
          params.set('amenity_breakfast', 'true')
          break
        case 'parking':
          params.set('amenity_parking', 'true')
          break
        case 'gym':
        case 'fitness':
          params.set('amenity_fitness', 'true')
          break
        case 'ac':
        case 'air conditioning':
          params.set('amenity_ac', 'true')
          break
        case 'pet friendly':
          params.set('amenity_pet_friendly', 'true')
          break
      }
    })
  } else {
    const tourKeywords = filters.keywords.filter(k => TOUR_FEATURE_KEYWORDS.includes(k))
    tourKeywords.forEach(keyword => {
      switch (keyword) {
        case 'private':
          params.set('type', 'private')
          break
        case 'group':
        case 'small group':
          params.set('type', 'group')
          break
        case 'pickup':
        case 'hotel pickup':
          params.set('feature_pickup', 'true')
          break
        case 'skip the line':
        case 'skip line':
        case 'fast track':
          params.set('feature_skip_line', 'true')
          break
        case 'guided':
          params.set('feature_guided', 'true')
          break
        case 'food':
        case 'wine':
        case 'tasting':
          params.set('category', 'food-drink')
          break
      }
    })
  }

  return params
}
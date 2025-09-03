'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import TopBar, { createDefaultQuickFilters } from '../../components/ShareTours/TopBar';
import FiltersPanel from '../../components/ShareTours/FiltersPanel';
import ShareToursGrid from '../../components/ShareTours/ShareToursGrid';
import AdBanner from '../../components/AdBanner';

interface ShareTourFilters {
  cities?: string[];
  countries?: string[];
  startDate?: string;
  endDate?: string;
  flexibleDays?: number;
  startWindows?: string[];
  durations?: string[];
  groupSizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  maxPriceAtFull?: boolean;
  languages?: string[];
  travelStyles?: string[];
  accessibility?: string[];
  instantBook?: boolean;
  minHostRating?: number;
  dropInsOnly?: boolean;
  earlyBird?: boolean;
  payWhatYouWant?: boolean;
  cancellationPolicies?: string[];
  sortBy?: string;
  page?: number;
  limit?: number;
}

export default function ShareToursPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<ShareTourFilters>({
    sortBy: 'compatible',
    page: 1,
    limit: 20
  });
  const [tours, setTours] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [availableOptions, setAvailableOptions] = useState({
    cities: [],
    countries: [],
    languages: [],
    travelStyles: [],
    accessibility: [],
    durations: [],
    groupSizes: [],
    startWindows: [],
    cancellationPolicies: [],
    sortOptions: []
  });

  // Fetch available filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        const response = await fetch('/api/tours/share-tours/quickfilters');
        if (response.ok) {
          const options = await response.json();
          setAvailableOptions(options);
        }
      } catch (error) {
        console.error('Failed to fetch filter options:', error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch tours with current filters
  const fetchTours = useCallback(async () => {
    setIsLoading(true);
    try {
      const queryParams = new URLSearchParams();
      
      // Add search query if present
      if (searchQuery.trim()) {
        queryParams.append('search', searchQuery.trim());
      }

      // Add all filters as query parameters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (Array.isArray(value)) {
            if (value.length > 0) {
              queryParams.append(key, value.join(','));
            }
          } else {
            queryParams.append(key, value.toString());
          }
        }
      });

      const response = await fetch(`/api/tours/share-tours/filter?${queryParams.toString()}`);
      
      if (response.ok) {
        const data = await response.json();
        setTours(data.tours || []);
        setTotalCount(data.pagination?.total || 0);
        setTotalPages(data.pagination?.pages || 0);
      } else {
        console.error('Failed to fetch tours:', response.statusText);
        setTours([]);
        setTotalCount(0);
        setTotalPages(0);
      }
    } catch (error) {
      console.error('Error fetching tours:', error);
      setTours([]);
      setTotalCount(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, filters]);

  // Initial load and filter changes
  useEffect(() => {
    fetchTours();
  }, [fetchTours]);

  // Quick filter handlers
  const quickFilters = useMemo(() => createDefaultQuickFilters({
    cities: availableOptions.cities,
    groupSizes: availableOptions.groupSizes,
    durations: availableOptions.durations
  }), [availableOptions]);

  const handleQuickFilterChange = useCallback((key: string, value: string | { min?: number; max?: number } | boolean | undefined) => {
    setFilters(prev => {
      const newFilters = { ...prev, page: 1 }; // Reset to first page when filtering
      
      switch (key) {
        case 'city':
          newFilters.cities = (typeof value === 'string' && value) ? [value] : undefined;
          break;
        case 'startDate':
          newFilters.startDate = typeof value === 'string' ? value : undefined;
          break;
        case 'groupSize':
          newFilters.groupSizes = (typeof value === 'string' && value) ? [value] : undefined;
          break;
        case 'priceRange':
          if (typeof value === 'object' && value !== null) {
            newFilters.minPrice = value.min;
            newFilters.maxPrice = value.max;
          } else {
            newFilters.minPrice = undefined;
            newFilters.maxPrice = undefined;
          }
          break;
        default:
          break;
      }
      
      return newFilters;
    });
  }, []);

  // Set quick filter values from current filters
  const quickFilterValues = useMemo(() => {
    return quickFilters.map(filter => ({
      ...filter,
      value: (() => {
        switch (filter.key) {
          case 'city':
            return filters.cities?.[0] || '';
          case 'startDate':
            return filters.startDate || '';
          case 'groupSize':
            return filters.groupSizes?.[0] || '';
          case 'priceRange':
            return {
              min: filters.minPrice,
              max: filters.maxPrice
            };
          default:
            return filter.value;
        }
      })()
    }));
  }, [quickFilters, filters]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearch = useCallback(() => {
    fetchTours();
  }, [fetchTours]);

  const handleFiltersChange = useCallback((newFilters: Partial<ShareTourFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  }, []);

  const handleSortChange = useCallback((sortBy: string) => {
    setFilters(prev => ({ ...prev, sortBy, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters(prev => ({ ...prev, page }));
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters(prev => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        quickFilters={quickFilterValues}
        onQuickFilterChange={handleQuickFilterChange}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6">
          {/* Filters Panel */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block lg:w-80 flex-shrink-0`}>
            <FiltersPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              availableOptions={availableOptions}
              onClose={() => setShowFilters(false)}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <ShareToursGrid
              tours={tours}
              totalCount={totalCount}
              currentPage={filters.page || 1}
              totalPages={totalPages}
              sortBy={filters.sortBy || 'compatible'}
              onSortChange={handleSortChange}
              onPageChange={handlePageChange}
              onToggleFilters={toggleFilters}
              showFiltersButton={true}
              isLoading={isLoading}
            />
            
            {/* Ad Banner for Share Tours */}
            <AdBanner category="default" className="mt-8" />
          </div>
        </div>
      </div>

      {/* Mobile Filters Overlay */}
      {showFilters && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setShowFilters(false)} />
          <div className="relative bg-white w-full max-w-sm ml-auto">
            <FiltersPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
              availableOptions={availableOptions}
              onClose={() => setShowFilters(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
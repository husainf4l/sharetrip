"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { tourService } from "@/services/tour.service";
import { Tour, ToursResponse, TourQueryDto, TourCategory } from "@/types/tour";
import TopBar, {
  createDefaultQuickFilters,
} from "../../components/ShareTours/TopBar";
import FiltersPanel from "../../components/ShareTours/FiltersPanel";
import ShareToursGrid from "../../components/ShareTours/ShareToursGrid";
import AdBanner from "../../components/AdBanner";

interface ShareTour {
  id: string;
  title: string;
  city: string;
  country: string;
  description?: string;
  media?: Array<{ url: string; type: string }>;
  currentPrice: number;
  maxGroupPrice?: number;
  basePrice: number;
  spotsLeft: number;
  confirmedBookings: number;
  maxGroup: number;
  durationMins: number;
  hostRating?: number;
  isDropIn?: boolean;
  isEarlyBird?: boolean;
  isPayWhatYouWant?: boolean;
  progressPercentage: string;
  guide?: {
    user?: {
      name: string;
      image?: string;
    };
  };
  startTimes: string[];
  travelStyles?: string[];
  accessibility?: string[];
  language: string;
  languages?: string[];
  startDate: string;
  endDate: string;
  duration: number;
  category: string;
  images: string[];
  tags: string[];
  instantBook: boolean;
  cancellationPolicy: string;
}

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
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<TourQueryDto>({
    sortBy: "createdAt",
    sortOrder: "desc",
    page: 1,
    limit: 20,
    category: TourCategory.SHARE_TRIP, // Filter for share trips only
  });
  const [tours, setTours] = useState<ShareTour[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [availableOptions, setAvailableOptions] = useState<{
    cities: string[];
    countries: string[];
    languages: string[];
    travelStyles: string[];
    accessibility: string[];
    durations: string[];
    groupSizes: string[];
    startWindows: string[];
    cancellationPolicies: string[];
    sortOptions: { value: string; label: string }[];
  }>({
    cities: [],
    countries: [],
    languages: [],
    travelStyles: [],
    accessibility: [],
    durations: [],
    groupSizes: [],
    startWindows: [],
    cancellationPolicies: [],
    sortOptions: [],
  });

  // Fetch available filter options
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        // Use the real filter options from tourService or set defaults
        setAvailableOptions({
          cities: ["New York", "Paris", "London", "Tokyo", "Rome"], // Could be fetched from API
          countries: ["USA", "France", "UK", "Japan", "Italy"],
          languages: ["English", "Spanish", "French", "German", "Italian"],
          travelStyles: ["Adventure", "Culture", "Food", "Nature", "History"],
          accessibility: [
            "Wheelchair accessible",
            "Audio guide",
            "Visual aids",
          ],
          durations: ["1-2 hours", "3-4 hours", "5+ hours", "Full day"],
          groupSizes: ["1-5", "6-10", "11-20", "20+"],
          startWindows: ["Morning", "Afternoon", "Evening"],
          cancellationPolicies: ["flexible", "standard", "strict"],
          sortOptions: [
            { value: "recommended", label: "Recommended" },
            { value: "price", label: "Price" },
            { value: "rating", label: "Rating" },
            { value: "duration", label: "Duration" },
          ],
        });
      } catch (error) {
        console.error("Failed to set filter options:", error);
      }
    };

    fetchFilterOptions();
  }, []);

  // Fetch tours with current filters
  const fetchTours = useCallback(async () => {
    setIsLoading(true);
    try {
      const query: TourQueryDto = {
        ...filters,
        search: searchQuery.trim() || undefined,
        category: TourCategory.SHARE_TRIP, // Only share trips
      };

      const response: ToursResponse = await tourService.getAllTours(query);

      // Convert API tours to ShareTours format if needed
      const shareToursFormat: ShareTour[] = response.data.map((tour) => ({
        id: tour.id,
        title: tour.title,
        city: tour.city,
        country: tour.country,
        currentPrice: tour.basePrice / 100, // Convert cents to dollars
        basePrice: tour.basePrice / 100,
        currency: tour.currency,
        spotsLeft: tour.maxGroup - (tour._count?.bookings || 0),
        maxSpots: tour.maxGroup,
        confirmedBookings: tour._count?.bookings || 0,
        progressPercentage: `${
          ((tour._count?.bookings || 0) / tour.maxGroup) * 100
        }`,
        startDate: tour.startTimes[0] || new Date().toISOString(),
        endDate: tour.startTimes[0] || new Date().toISOString(), // Assuming single day tour
        duration: tour.durationMins,
        category: tour.category,
        description: tour.description,
        guide: tour.guide
          ? {
              user: tour.guide.user
                ? {
                    name: tour.guide.user.name,
                    image: tour.guide.user.image || undefined,
                  }
                : undefined,
            }
          : undefined,
        images: tour.media.map((m) => m.url),
        tags: tour.tags,
        travelStyles: tour.travelStyles,
        accessibility: tour.accessibility,
        languages: tour.languages,
        instantBook: tour.instantBook,
        cancellationPolicy: tour.cancellationPolicy,
        // Add missing required properties
        maxGroup: tour.maxGroup,
        durationMins: tour.durationMins,
        startTimes: tour.startTimes,
        language: tour.language,
        hostRating: tour.hostRating,
        isDropIn: tour.isDropIn,
        isEarlyBird: tour.isEarlyBird,
        isPayWhatYouWant: tour.isPayWhatYouWant,
      }));

      setTours(shareToursFormat);
      setTotalCount(response.meta.total);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error("Error fetching tours:", error);
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
  const quickFilters = useMemo(
    () =>
      createDefaultQuickFilters({
        cities: availableOptions.cities,
        groupSizes: availableOptions.groupSizes,
        durations: availableOptions.durations,
      }),
    [availableOptions]
  );

  const handleQuickFilterChange = useCallback(
    (
      key: string,
      value: string | { min?: number; max?: number } | boolean | undefined
    ) => {
      setFilters((prev) => {
        const newFilters = { ...prev, page: 1 }; // Reset to first page when filtering

        switch (key) {
          case "city":
            newFilters.city =
              typeof value === "string" && value ? value : undefined;
            break;
          case "startDate":
            newFilters.startDate =
              typeof value === "string" ? value : undefined;
            break;
          case "groupSize":
            // Parse group size range like "1-5" into min/max
            if (typeof value === "string" && value) {
              const [min, max] = value.split("-").map(Number);
              newFilters.minGroup = min;
              newFilters.maxGroup = max;
            } else {
              newFilters.minGroup = undefined;
              newFilters.maxGroup = undefined;
            }
            break;
          case "priceRange":
            if (typeof value === "object" && value !== null) {
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
    },
    []
  );

  // Set quick filter values from current filters
  const quickFilterValues = useMemo(() => {
    return quickFilters.map((filter) => ({
      ...filter,
      value: (() => {
        switch (filter.key) {
          case "city":
            return filters.city || "";
          case "startDate":
            return filters.startDate || "";
          case "groupSize":
            // Convert min/max group to range string
            if (filters.minGroup && filters.maxGroup) {
              return `${filters.minGroup}-${filters.maxGroup}`;
            }
            return "";
          case "priceRange":
            return {
              min: filters.minPrice,
              max: filters.maxPrice,
            };
          default:
            return filter.value;
        }
      })(),
    }));
  }, [quickFilters, filters]);

  const handleSearchChange = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const handleSearch = useCallback(() => {
    fetchTours();
  }, [fetchTours]);

  const handleFiltersChange = useCallback(
    (newFilters: Partial<ShareTourFilters>) => {
      setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
    },
    []
  );

  const handleSortChange = useCallback((sortBy: string) => {
    setFilters((prev) => ({ ...prev, sortBy, page: 1 }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  }, []);

  const toggleFilters = useCallback(() => {
    setShowFilters((prev) => !prev);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Top Bar */}
      <TopBar
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        quickFilters={quickFilterValues}
        onQuickFilterChange={handleQuickFilterChange}
        onSearch={handleSearch}
        isLoading={isLoading}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Filters Panel */}
          <div
            className={`${
              showFilters ? "block" : "hidden"
            } lg:block lg:w-80 flex-shrink-0`}
          >
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
              sortBy={filters.sortBy || "compatible"}
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
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="relative bg-white/95 backdrop-blur-xl w-full max-w-sm ml-auto border-l border-gray-200/60 shadow-2xl">
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

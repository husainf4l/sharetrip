"use client";

import { useState, useCallback } from "react";
import ShareTourCard from "./ShareTourCard";
import {
  ChevronDownIcon,
  FunnelIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";

interface Tour {
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
}

interface ShareToursGridProps {
  tours: Tour[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  sortBy: string;
  onSortChange: (sort: string) => void;
  onPageChange: (page: number) => void;
  onToggleFilters?: () => void;
  showFiltersButton?: boolean;
  isLoading?: boolean;
}

const sortOptions = [
  { value: "compatible", label: "Most compatible" },
  { value: "price_low", label: "Price: Low to High" },
  { value: "price_high", label: "Price: High to Low" },
  { value: "spots_left", label: "Spots left" },
  { value: "starting_soon", label: "Starting soon" },
  { value: "rating", label: "Highest rated" },
];

export default function ShareToursGrid({
  tours,
  totalCount,
  currentPage,
  totalPages,
  sortBy,
  onSortChange,
  onPageChange,
  onToggleFilters,
  showFiltersButton = true,
  isLoading = false,
}: ShareToursGridProps) {
  const [wishlistedTours, setWishlistedTours] = useState<Set<string>>(
    new Set()
  );
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);

  const handleToggleWishlist = useCallback((tourId: string) => {
    setWishlistedTours((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tourId)) {
        newSet.delete(tourId);
      } else {
        newSet.add(tourId);
      }
      return newSet;
    });
  }, []);

  const handleSortSelect = useCallback(
    (value: string) => {
      onSortChange(value);
      setSortDropdownOpen(false);
    },
    [onSortChange]
  );

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;
    const startPage = Math.max(
      1,
      currentPage - Math.floor(maxVisiblePages / 2)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    // Previous button
    if (currentPage > 1) {
      buttons.push(
        <button
          key="prev"
          onClick={() => onPageChange(currentPage - 1)}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50"
        >
          Previous
        </button>
      );
    }

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-2 text-sm font-medium border ${
            i === currentPage
              ? "bg-blue-600 text-white border-blue-600"
              : "text-gray-700 bg-white border-gray-300 hover:bg-gray-50"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    if (currentPage < totalPages) {
      buttons.push(
        <button
          key="next"
          onClick={() => onPageChange(currentPage + 1)}
          className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50"
        >
          Next
        </button>
      );
    }

    return buttons;
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-6 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-sm animate-pulse"
            >
              <div className="h-56 bg-gray-200" />
              <div className="p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded-lg w-32" />
                <div className="h-6 bg-gray-200 rounded-lg w-full" />
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="h-4 bg-gray-200 rounded w-16" />
                    <div className="h-4 bg-gray-200 rounded w-12" />
                  </div>
                  <div className="h-4 bg-gray-200 rounded w-8" />
                </div>
                <div className="h-10 bg-gray-200 rounded-2xl w-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">
            {totalCount.toLocaleString()} Share Tours
          </h2>

          {showFiltersButton && (
            <button
              onClick={onToggleFilters}
              className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 lg:hidden"
            >
              <FunnelIcon className="w-4 h-4" />
              <span>Filters</span>
            </button>
          )}
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <button
            onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
            className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <AdjustmentsHorizontalIcon className="w-4 h-4" />
            <span>
              {sortOptions.find((opt) => opt.value === sortBy)?.label}
            </span>
            <ChevronDownIcon
              className={`w-4 h-4 transition-transform ${
                sortDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {sortDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
              {sortOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSortSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg ${
                    sortBy === option.value
                      ? "bg-blue-50 text-blue-700"
                      : "text-gray-700"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Tours Grid */}
      {tours.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour, index) => (
            <div
              key={tour.id}
              className="animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ShareTourCard
                tour={tour}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlistedTours.has(tour.id)}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <FunnelIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tours found
            </h3>
            <p className="text-gray-500">
              Try adjusting your filters or search criteria to find more tours.
            </p>
          </div>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2 pt-6">
          <div className="flex items-center">{renderPaginationButtons()}</div>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-center text-sm text-gray-500">
        Showing {(currentPage - 1) * 20 + 1}-
        {Math.min(currentPage * 20, totalCount)} of{" "}
        {totalCount.toLocaleString()} results
      </div>

      {/* Close sort dropdown when clicking outside */}
      {sortDropdownOpen && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setSortDropdownOpen(false)}
        />
      )}
    </div>
  );
}

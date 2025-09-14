"use client";

import { useEffect, useState, useCallback } from "react";
import { tourService } from "@/services/tour.service";
import { Tour, ToursResponse, TourQueryDto } from "@/types/tour";
import {
  AdjustmentsHorizontalIcon,
  MapIcon,
  ViewColumnsIcon,
} from "@heroicons/react/24/outline";

// Convert API Tour to TourCard format
function convertTourForCard(tour: Tour) {
  return {
    id: tour.id,
    title: tour.title,
    city: tour.city,
    country: tour.country,
    priceCents: tour.basePrice, // basePrice is already in cents
    description: tour.description,
    rating: tour.guide.ratingAvg || 4.5,
    reviews: tour.guide.toursCount || 0,
    image:
      tour.media[0]?.url ||
      `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&q=80`,
    badge: tour.status === "active" ? null : tour.status,
    duration: `${Math.floor(tour.durationMins / 60)}h ${
      tour.durationMins % 60
    }m`,
    groupSize: `${tour.minGroup}-${tour.maxGroup} people`,
    language: tour.language,
    category: tour.category,
    isInstantConfirmation: tour.instantBook,
    isFreeCancellation: tour.cancellationPolicy === "flexible",
    isSkipTheLine: false,
    accessibility: tour.accessibility?.length > 0,
  };
}

export default function ToursPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recommended");
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [showFilters, setShowFilters] = useState(false);

  const itemsPerPage = 12;

  const loadTours = useCallback(async () => {
    setIsLoading(true);
    try {
      const query: TourQueryDto = {
        page: currentPage,
        limit: itemsPerPage,
        search: searchQuery || undefined,
        sortBy: sortBy === "recommended" ? undefined : sortBy,
        sortOrder: "desc",
      };

      const response: ToursResponse = await tourService.getAllTours(query);

      setTours(response.data);
      setTotalResults(response.meta.total);
      setTotalPages(response.meta.totalPages);
    } catch (error) {
      console.error("Error loading tours:", error);
      setTours([]);
      setTotalResults(0);
      setTotalPages(0);
    } finally {
      setIsLoading(false);
    }
  }, [currentPage, searchQuery, sortBy]);

  useEffect(() => {
    loadTours();
  }, [loadTours]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const convertedTours = tours.map(convertTourForCard);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-md">
                  <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Discover Amazing Tours
            </h1>
            <p className="text-gray-600">
              {totalResults} tours found • Book instantly with availability
              check
            </p>
          </div>

          {/* Search and Controls */}
          <div className="mt-4 lg:mt-0 flex flex-col sm:flex-row gap-4">
            <a
              href="/check-availability"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-center"
            >
              Check Availability
            </a>

            <div className="relative">
              <input
                type="text"
                placeholder="Search tours..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                Filters
              </button>

              <button
                onClick={() =>
                  setViewMode(viewMode === "grid" ? "map" : "grid")
                }
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {viewMode === "grid" ? (
                  <MapIcon className="w-5 h-5" />
                ) : (
                  <ViewColumnsIcon className="w-5 h-5" />
                )}
                {viewMode === "grid" ? "Map" : "Grid"}
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="recommended">Recommended</option>
                <option value="price">Price: Low to High</option>
                <option value="rating">Rating</option>
                <option value="createdAt">Newest</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tours Grid */}
        {tours.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tours found
            </h3>
            <p className="text-gray-600">
              Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
              {convertedTours.map((tour) => {
                // Inline simple tour card since TourCard has complex dependencies
                return (
                  <div
                    key={tour.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48">
                      <img
                        src={tour.image}
                        alt={tour.title}
                        className="w-full h-full object-cover"
                      />
                      {tour.badge && (
                        <span className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm">
                          {tour.badge}
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-semibold text-gray-900 line-clamp-2">
                          {tour.title}
                        </h3>
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {tour.city}, {tour.country}
                      </p>

                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <span>⭐ {tour.rating}</span>
                        <span>•</span>
                        <span>{tour.duration}</span>
                        <span>•</span>
                        <span>{tour.groupSize}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            ${(tour.priceCents / 100).toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-500 ml-1">
                            per person
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <a
                            href={`/tours/${tour.id}`}
                            className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                          >
                            View Details
                          </a>
                          <a
                            href={`/check-availability?tourId=${tour.id}`}
                            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            Book Now
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>

                  <span className="px-4 py-2 text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

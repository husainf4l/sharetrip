"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import FiltersSidebar from "@/components/FiltersSidebar";
import TourCard from "@/components/TourCard";
import AdBanner from "@/components/AdBanner";
import {
  AdjustmentsHorizontalIcon,
  MapIcon,
  ViewColumnsIcon,
  FunnelIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  HeartIcon,
  BookmarkIcon,
  ShareIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface Tour {
  id: string;
  title: string;
  city: string;
  country: string;
  priceCents: number;
  description?: string;
  rating?: number;
  reviews?: number;
  image?: string;
  badge?: string;
  duration?: string;
  groupSize?: string;
  language?: string;
  category?: string;
}

export default function ToursPage() {
  const [results, setResults] = useState<Tour[]>([]);
  const [filteredResults, setFilteredResults] = useState<Tour[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [sortBy, setSortBy] = useState("recommended");
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [urlCategory, setUrlCategory] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const itemsPerPage = 12;

  // Ref to store current filtered results for sorting without dependency issues
  const filteredResultsRef = useRef<Tour[]>([]);

  // Update ref whenever filteredResults changes
  useEffect(() => {
    filteredResultsRef.current = filteredResults;
  }, [filteredResults]);

  const getDescription = useCallback((title: string): string => {
    if (title.toLowerCase().includes("food")) {
      return "Discover authentic local flavors and culinary traditions on this immersive food experience.";
    } else if (
      title.toLowerCase().includes("historic") ||
      title.toLowerCase().includes("walking")
    ) {
      return "Explore centuries of history and culture with an expert local guide through charming streets.";
    } else if (title.toLowerCase().includes("nightlife")) {
      return "Experience the vibrant nightlife scene with locals who know the best hidden gems and hotspots.";
    } else if (
      title.toLowerCase().includes("museum") ||
      title.toLowerCase().includes("art")
    ) {
      return "Immerse yourself in world-class art collections and cultural masterpieces with expert commentary.";
    } else if (
      title.toLowerCase().includes("adventure") ||
      title.toLowerCase().includes("outdoor")
    ) {
      return "Embark on thrilling outdoor adventures and create unforgettable memories in nature.";
    }
    return "An unforgettable experience that will create lasting memories of your time in this amazing destination.";
  }, []);

  const getImage = useCallback((idx: number): string => {
    const images = [
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop",
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop",
    ];
    return images[idx % images.length];
  }, []);

  const load = useCallback(
    async (q: Record<string, string> = {}) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams(q);
        const res = await fetch(`/api/tours/filter?${params.toString()}`);
        const data = await res.json();

        // Enhanced data with more realistic information
        const enhancedData = data.map((tour: Tour, idx: number) => ({
          ...tour,
          rating: 4.2 + Math.random() * 0.8,
          reviews: Math.floor(Math.random() * 1500) + 50,
          description: getDescription(tour.title),
          image: getImage(idx),
          badge:
            idx === 0
              ? "Bestseller"
              : idx === 1
              ? "New"
              : idx < 4
              ? "Popular"
              : null,
          duration: ["2 hours", "3 hours", "4 hours", "6 hours", "Full day"][
            idx % 5
          ],
          groupSize: ["Private", "Small group", "Medium group", "Large group"][
            idx % 4
          ],
          language: ["English", "Spanish", "French", "German", "Italian"][
            idx % 5
          ],
          category: [
            "Food & Drink",
            "Culture & History",
            "Adventure",
            "Art & Museums",
            "Nature",
          ][idx % 5],
        }));

        setResults(enhancedData);
        setFilteredResults(enhancedData);
        setTotalResults(enhancedData.length);
      } catch (error) {
        console.error("Error loading tours:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [getDescription, getImage]
  );

  const handleSearch = useCallback(
    (searchParams: Record<string, string>) => {
      setSearchQuery(searchParams.destination || "");
      setSearchInput(searchParams.destination || "");
      load(searchParams);
    },
    [load]
  );

  const handleGallerySearch = useCallback(() => {
    if (searchInput.trim()) {
      handleSearch({ destination: searchInput.trim() });
    }
  }, [searchInput, handleSearch]);

  const handleQuickFilter = useCallback(
    (filter: string) => {
      setSearchInput(filter);
      handleSearch({ destination: filter });
    },
    [handleSearch]
  );

  const handleFiltersChange = useCallback(
    (filterParams: Record<string, string>) => {
      let filtered = [...results];

      // Apply filters
      if (filterParams.minPrice) {
        filtered = filtered.filter(
          (tour) => tour.priceCents / 100 >= Number(filterParams.minPrice)
        );
      }
      if (filterParams.maxPrice) {
        filtered = filtered.filter(
          (tour) => tour.priceCents / 100 <= Number(filterParams.maxPrice)
        );
      }
      if (filterParams.minRating) {
        filtered = filtered.filter(
          (tour) => (tour.rating || 0) >= Number(filterParams.minRating)
        );
      }
      if (filterParams.categories) {
        const categories = filterParams.categories.split(",");
        filtered = filtered.filter(
          (tour) => tour.category && categories.includes(tour.category)
        );
      }
      if (filterParams.duration) {
        filtered = filtered.filter(
          (tour) =>
            tour.duration &&
            tour.duration.includes(filterParams.duration.split("-")[0])
        );
      }

      setFilteredResults(filtered);
      setTotalResults(filtered.length);
      setCurrentPage(1);
    },
    [results]
  );

  const handleSort = useCallback((sortType: string) => {
    const sorted = [...filteredResultsRef.current];

    switch (sortType) {
      case "price_low":
        sorted.sort((a, b) => a.priceCents - b.priceCents);
        break;
      case "price_high":
        sorted.sort((a, b) => b.priceCents - a.priceCents);
        break;
      case "rating":
        sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case "newest":
        sorted.sort((a, b) => b.id.localeCompare(a.id));
        break;
      default:
        // Recommended - mix of rating and popularity
        sorted.sort(
          (a, b) =>
            (b.rating || 0) * 1.2 +
            Math.random() -
            ((a.rating || 0) * 1.2 + Math.random())
        );
    }

    setFilteredResults(sorted);
  }, []); // No dependencies to avoid infinite loop

  useEffect(() => {
    load();
  }, [load]);

  // Handle URL parameters for category filtering
  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const categoryParam = urlParams.get("category");
      if (categoryParam) {
        setUrlCategory(categoryParam);
        // Load tours with category filter
        load({ categories: categoryParam });
      }
    }
  }, []);

  // Apply sorting when results are loaded or when sortBy changes
  useEffect(() => {
    if (results.length > 0) {
      handleSort(sortBy);
    }
  }, [sortBy, results.length]); // Depend on results.length instead of handleSort

  const paginatedResults = filteredResults.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredResults.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Gallery Hero Section */}
        <section className="mb-12">
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Large Featured Image */}
            <div className="lg:col-span-2 lg:row-span-2 relative group cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop"
                  alt="Scenic landscape"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">Explore Nature</h3>
                  <p className="text-sm opacity-90">Adventure awaits</p>
                </div>
              </div>
            </div>

            {/* Medium Image */}
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=450&fit=crop"
                  alt="Cultural experience"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-bold">Culture</h4>
                  <p className="text-xs opacity-90">Rich heritage</p>
                </div>
              </div>
            </div>

            {/* Small Image 1 */}
            <div className="relative group cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&h=450&fit=crop"
                  alt="Nightlife"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-bold">Nightlife</h4>
                  <p className="text-xs opacity-90">Vibrant scenes</p>
                </div>
              </div>
            </div>

            {/* Medium Image 2 */}
            <div className="md:col-span-2 lg:col-span-1 relative group cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=600&h=450&fit=crop"
                  alt="Food experience"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-bold">Culinary</h4>
                  <p className="text-xs opacity-90">Local flavors</p>
                </div>
              </div>
            </div>

            {/* Small Image 2 */}
            <div className="md:col-span-2 lg:col-span-1 relative group cursor-pointer overflow-hidden rounded-3xl">
              <div className="aspect-[4/3] relative">
                <img
                  src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=450&fit=crop"
                  alt="Adventure"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h4 className="text-lg font-bold">Adventure</h4>
                  <p className="text-xs opacity-90">Thrilling experiences</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search Bar Overlay */}
          <div className="relative mt-8">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Find your next adventure
                  </h2>
                  <p className="text-gray-600">
                    Discover unique experiences around the world
                  </p>
                </div>

                {/* Quick Search */}
                <div className="flex flex-wrap gap-3 justify-center mb-6">
                  {[
                    "Food tours",
                    "Walking tours",
                    "Museums",
                    "Cultural sites",
                    "Day trips",
                    "Adventure",
                    "Nightlife",
                    "Photography",
                  ].map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleQuickFilter(filter)}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Main Search Bar */}
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleGallerySearch();
                      }
                    }}
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleGallerySearch}
                    className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl"
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Results Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
          <div className="animate-slide-right">
            <h1 className="text-4xl font-bold text-gradient mb-3">
              {urlCategory
                ? `${urlCategory} Experiences`
                : searchQuery
                ? `Experiences in ${searchQuery}`
                : "Experiences in Europe"}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className="flex items-center gap-1">
                <EyeIcon className="w-4 h-4" />
                {totalResults.toLocaleString()} experiences
              </span>
              <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md font-medium">
                Live
              </span>
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-md font-medium">
                Deals
              </span>
              {urlCategory && (
                <>
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-md font-medium">
                    ↪ {urlCategory}
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4 animate-fade-up">
            {/* Enhanced View Mode Toggle */}
            <div className="glass rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all hover-lift ${
                  viewMode === "grid"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <ViewColumnsIcon className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("map")}
                className={`p-2 rounded-md transition-all hover-lift ${
                  viewMode === "map"
                    ? "bg-blue-500 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <MapIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Enhanced Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="glass appearance-none px-4 py-2.5 pr-10 focus-ring hover-lift cursor-pointer"
              >
                <option value="recommended">✨ Recommended</option>
                <option value="price_low">💰 Price: Low to High</option>
                <option value="price_high">💎 Price: High to Low</option>
                <option value="rating">⭐ Highest Rated</option>
                <option value="newest">🆕 Newest</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-500" />
              </div>
            </div>

            {/* Enhanced Filters Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="btn btn-outline lg:hidden hover-glow"
            >
              <FunnelIcon className="w-4 h-4" />
              Filters
            </button>

            {/* Quick Actions */}
            <div className="hidden lg:flex items-center gap-2">
              <button className="p-2 glass rounded-lg hover-lift transition-all group">
                <HeartIcon className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
              </button>
              <button className="p-2 glass rounded-lg hover-lift transition-all group">
                <BookmarkIcon className="w-5 h-5 text-gray-600 group-hover:text-blue-500" />
              </button>
              <button className="p-2 glass rounded-lg hover-lift transition-all group">
                <ShareIcon className="w-5 h-5 text-gray-600 group-hover:text-green-500" />
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Quick Filters */}
        <div className="mb-8 animate-slide-right">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm font-semibold text-gradient flex items-center gap-2">
              <StarIcon className="w-4 h-4" />
              Quick filters:
            </span>
            {[
              {
                label: "💰 Under $50",
                value: "0-50",
                type: "price",
                color: "green",
              },
              {
                label: "🔄 Free cancellation",
                value: "free_cancellation",
                type: "feature",
                color: "blue",
              },
              {
                label: "⚡ Instant confirmation",
                value: "instant",
                type: "feature",
                color: "yellow",
              },
              {
                label: "👥 Small group",
                value: "small_group",
                type: "feature",
                color: "purple",
              },
              {
                label: "⭐ Highly rated",
                value: "highly_rated",
                type: "rating",
                color: "orange",
              },
              {
                label: "🚶 Walking Tours",
                value: "Walking Tours",
                type: "category",
                color: "teal",
              },
              {
                label: "🍽️ Food & Drink",
                value: "Food & Drink",
                type: "category",
                color: "red",
              },
              {
                label: "🏛️ Culture & History",
                value: "Culture & History",
                type: "category",
                color: "indigo",
              },
            ].map((filter, index) => (
              <button
                key={filter.value}
                onClick={() => {
                  if (filter.type === "category") {
                    setUrlCategory(filter.value);
                    load({ categories: filter.value });
                  }
                }}
                className={`stagger-item px-4 py-2 glass rounded-full text-sm font-medium hover-lift transition-all ${
                  urlCategory === filter.value
                    ? "bg-blue-500 text-white shadow-lg scale-105"
                    : "hover:bg-blue-50 hover:text-blue-700"
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:block ${showFilters ? "block" : "hidden"}`}>
            <div className="glass-elevated p-6 sticky top-24 animate-fade-up">
              <FiltersSidebar
                onChange={handleFiltersChange}
                initialCategory={urlCategory}
              />
            </div>
          </div>

          {/* Enhanced Results Section */}
          <section className="lg:col-span-3">
            {isLoading ? (
              <div className="grid-auto-fit">
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="skeleton card-elevated stagger-item"
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    <div className="h-64 skeleton bg-gray-200 rounded-t-2xl"></div>
                    <div className="p-6 space-y-3">
                      <div className="skeleton skeleton-text w-3/4"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="flex justify-between">
                        <div className="skeleton skeleton-text w-20"></div>
                        <div className="skeleton skeleton-text w-24"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : paginatedResults.length === 0 ? (
              <div className="text-center py-16 animate-fade-up">
                <div className="w-32 h-32 glass-elevated rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
                  <AdjustmentsHorizontalIcon className="w-16 h-16 text-gray-400" />
                </div>
                <h3 className="text-2xl font-bold text-gradient mb-4">
                  No experiences found
                </h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  We couldn't find any experiences matching your criteria. Try
                  adjusting your filters or exploring different options.
                </p>
                <button
                  onClick={() => {
                    setFilteredResults(results);
                    setTotalResults(results.length);
                    setUrlCategory("");
                    if (typeof window !== "undefined") {
                      const url = new URL(window.location.href);
                      url.searchParams.delete("category");
                      window.history.replaceState({}, "", url.toString());
                    }
                  }}
                  className="btn btn-primary px-8 py-3 hover-glow"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                {/* Enhanced Tours Grid */}
                <div className="grid-auto-fit gap-8 animate-fade-up">
                  {paginatedResults.map((tour, index) => (
                    <div
                      key={tour.id}
                      className="stagger-item"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                      <TourCard tour={tour} />
                    </div>
                  ))}
                </div>

                {/* Ad Banner */}
                <AdBanner category={urlCategory} />

                {/* Enhanced Pagination */}
                {totalPages > 1 && (
                  <div className="mt-16 flex justify-center animate-fade-up">
                    <div className="glass-elevated p-2 flex items-center gap-2 hover-lift">
                      <button
                        onClick={() =>
                          setCurrentPage(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="px-6 py-3 text-gray-700 font-medium hover:bg-white/50 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover-scale"
                      >
                        Previous
                      </button>

                      <div className="flex items-center gap-1 mx-2">
                        {[...Array(Math.min(5, totalPages))].map((_, i) => {
                          const pageNum =
                            Math.max(
                              1,
                              Math.min(totalPages - 4, currentPage - 2)
                            ) + i;
                          return (
                            <button
                              key={pageNum}
                              onClick={() => setCurrentPage(pageNum)}
                              className={`w-12 h-12 rounded-xl font-semibold transition-all hover-scale ${
                                currentPage === pageNum
                                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-110"
                                  : "hover:bg-white/60 text-gray-700"
                              }`}
                            >
                              {pageNum}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() =>
                          setCurrentPage(Math.min(totalPages, currentPage + 1))
                        }
                        disabled={currentPage === totalPages}
                        className="px-6 py-3 text-gray-700 font-medium hover:bg-white/50 rounded-xl transition-all disabled:opacity-40 disabled:cursor-not-allowed hover-scale"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}

                {/* Enhanced Load More Button */}
                {currentPage === totalPages &&
                  filteredResults.length > itemsPerPage && (
                    <div className="mt-16 text-center animate-fade-up">
                      <button className="btn btn-outline px-12 py-4 text-lg hover-glow hover-lift">
                        ✨ Discover more experiences
                      </button>
                    </div>
                  )}
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

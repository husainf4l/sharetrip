"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AdBanner from "@/components/AdBanner";
import { ImageGallery, GalleryImage } from "@/components/ImageGallery";
import {
  StarIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  CheckIcon,
  ExclamationTriangleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  CalendarIcon,
  UsersIcon,
  GlobeAltIcon,
  ChatBubbleLeftIcon,
  PhotoIcon,
  ArrowRightIcon,
  ShieldCheckIcon,
  TruckIcon,
  CurrencyDollarIcon,
  InformationCircleIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";
import { createBooking } from "../../../services/booking";

interface Tour {
  id: string;
  title: string;
  city: string;
  country: string;
  priceCents: number;
  description?: string;
  rating?: number;
  reviews?: number;
  duration?: string;
  maxGroupSize?: number;
  images?: string[];
  galleryImages?: GalleryImage[];
  category?: string;
  language?: string;
  host?: {
    name: string;
    avatar: string;
    rating: number;
    reviews: number;
    responseTime: string;
    languages: string[];
  };
  highlights?: string[];
  itinerary?: Array<{
    time: string;
    title: string;
    description: string;
  }>;
  reviewList?: Array<{
    id: string;
    user: {
      name: string;
      avatar: string;
      country: string;
    };
    rating: number;
    date: string;
    comment: string;
    helpful: number;
  }>;
}

interface SimilarTour {
  id: string;
  title: string;
  city: string;
  country: string;
  priceCents: number;
  rating: number;
  reviews: number;
  image: string;
  duration: string;
}

export default function TourDetailPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [similarTours, setSimilarTours] = useState<SimilarTour[]>([]);
  const [activeTab, setActiveTab] = useState<
    "overview" | "reviews" | "itinerary"
  >("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [getYourGuideTours, setGetYourGuideTours] = useState<any[]>([]);
  const [selectedGygTour, setSelectedGygTour] = useState<any>(null);
  const [showGygModal, setShowGygModal] = useState(false);

  const router = useRouter();

  // Handle params properly for both Next.js 14 and 15
  const resolvedParams = "then" in params ? use(params) : params;
  const tourId = resolvedParams?.id;

  useEffect(() => {
    async function load() {
      // Validate tour ID
      if (!tourId || typeof tourId !== "string") {
        setError("Invalid tour ID");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const res = await fetch(`/api/tours/filter`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch tours: ${res.status} ${res.statusText}`
          );
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format from server");
        }

        const found = data.find((t: Tour) => t.id === tourId);

        if (!found) {
          setError("Tour not found");
          setIsLoading(false);
          return;
        }

        // Create gallery images in the proper format - Using local images
        const galleryImages: GalleryImage[] = [
          {
            id: "1",
            src: "/images/tour-1.jpg",
            alt: `${found?.title || "Tour"} - Main experience`,
            title: `Experience ${found?.title || "this amazing tour"}`,
            width: 1200,
            height: 800,
          },
          {
            id: "2",
            src: "/images/tour-2.jpg",
            alt: `${found?.title || "Tour"} - Local culture`,
            title: "Immerse yourself in local culture and traditions",
            width: 1200,
            height: 800,
          },
          {
            id: "3",
            src: "/images/tour-3.jpg",
            alt: `${found?.title || "Tour"} - Scenic views`,
            title: "Breathtaking views and photo opportunities",
            width: 1200,
            height: 800,
          },
          {
            id: "4",
            src: "/images/tour-4.jpg",
            alt: `${found?.title || "Tour"} - Adventure moments`,
            title: "Unforgettable adventure moments and expert guidance",
            width: 1200,
            height: 800,
          },
        ];

        // Enhanced tour data with more details
        const enhancedTour: Tour = {
          ...(found || data[0]),
          rating: 4.8,
          reviews: 1247,
          duration: "3 hours",
          maxGroupSize: 15,
          category: "Food & Drink",
          language: "English",
          images: galleryImages.map((img) => img.src),
          galleryImages, // Add gallery images for our new component
          description:
            "Embark on an unforgettable culinary journey through the vibrant streets of Lisbon. Discover authentic Portuguese flavors, hidden local gems, and centuries-old traditions that make this city's food scene truly unique. Your expert local guide will take you to the best traditional tascas, pastel de nata bakeries, and fresh seafood markets.",
          host: {
            name: "Maria Santos",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            rating: 4.9,
            reviews: 342,
            responseTime: "within 1 hour",
            languages: ["English", "Portuguese", "Spanish"],
          },
          highlights: [
            "Authentic Portuguese cuisine tasting",
            "Visit to traditional local markets",
            "Expert local guide with 10+ years experience",
            "Small group of maximum 15 people",
            "Free cancellation up to 24 hours",
            "Pickup from central Lisbon locations",
          ],
          itinerary: [
            {
              time: "10:00 AM",
              title: "Meeting Point & Welcome",
              description:
                "Meet your guide at the designated meeting point in central Lisbon. Get to know the group and receive a brief introduction to the day's culinary adventure.",
            },
            {
              time: "10:30 AM",
              title: "Traditional Pastéis de Belém",
              description:
                "Visit the famous Pastéis de Belém bakery to taste the original custard tarts, a Lisbon specialty since 1837.",
            },
            {
              time: "11:30 AM",
              title: "Mercado da Ribeira Food Market",
              description:
                "Explore Lisbon's largest fresh food market, sampling local cheeses, cured meats, and fresh seafood.",
            },
            {
              time: "1:00 PM",
              title: "Traditional Portuguese Lunch",
              description:
                "Enjoy a traditional Portuguese lunch at a local family-run restaurant, featuring bacalhau and other regional specialties.",
            },
          ],
          reviewList: [
            {
              id: "1",
              user: {
                name: "Sarah Johnson",
                avatar:
                  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
                country: "USA",
              },
              rating: 5,
              date: "2024-01-15",
              comment:
                "Absolutely incredible experience! Maria was an amazing guide with such deep knowledge of Lisbon's food culture. The tastings were authentic and the stories behind each dish made it so much more meaningful.",
              helpful: 12,
            },
            {
              id: "2",
              user: {
                name: "David Chen",
                avatar:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
                country: "Canada",
              },
              rating: 5,
              date: "2024-01-10",
              comment:
                "Perfect way to experience Lisbon's culinary scene. Small group size made it intimate and personal. Highly recommend!",
              helpful: 8,
            },
          ],
        };

        setTour(enhancedTour);

        // Load similar tours
        const similar = data
          .filter((t: Tour) => t.id !== resolvedParams.id)
          .slice(0, 4)
          .map((t: Tour) => ({
            id: t.id,
            title: t.title,
            city: t.city,
            country: t.country,
            priceCents: t.priceCents,
            rating: 4.5 + Math.random() * 0.4,
            reviews: Math.floor(Math.random() * 500) + 50,
            image: `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&q=80`,
            duration: "3 hours",
          }));

        setSimilarTours(similar);

        // Load GetYourGuide tours for this location
        try {
          const gygResponse = await fetch(
            `/api/getyourguide/search?location=${encodeURIComponent(
              enhancedTour.city + ", " + enhancedTour.country
            )}&activity=${encodeURIComponent(enhancedTour.title)}`
          );
          if (gygResponse.ok) {
            const gygData = await gygResponse.json();
            if (gygData.success) {
              setGetYourGuideTours(gygData.tours.slice(0, 3)); // Show top 3 results
            }
          }
        } catch (gygError) {
          console.log("GetYourGuide integration not available:", gygError);
        }
      } catch (error) {
        console.error("Error loading tour:", error);
        setError(
          error instanceof Error ? error.message : "Failed to load tour"
        );
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, [tourId]); // tourId already contains the resolved params.id value

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const calculateTotal = () => {
    return ((tour?.priceCents || 0) * guests) / 100;
  };

  const handleBookNow = async () => {
    if (!tour || !selectedDate) {
      setBookingError("Please select a date for your booking");
      return;
    }

    setIsBooking(true);
    setBookingError(null);

    try {
      const result = await createBooking(tourId, {
        headcount: guests,
        selectedDate,
        specialRequests: "", // Could add a special requests field later
      });

      if (result.success && result.booking) {
        // Redirect to booking confirmation page
        router.push(
          `/bookings/confirmation?bookingId=${
            result.booking.id || result.booking.bookingId
          }`
        );
      } else {
        setBookingError(result.error || "Failed to create booking");
      }
    } catch (error) {
      setBookingError("An unexpected error occurred. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-6 w-1/3"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="h-96 bg-gray-200 rounded-2xl mb-4"></div>
                <div className="flex gap-2 mb-8">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-20 h-20 bg-gray-200 rounded-lg"
                    ></div>
                  ))}
                </div>
                <div className="h-12 bg-gray-200 rounded mb-4"></div>
                <div className="h-32 bg-gray-200 rounded mb-8"></div>
              </div>
              <div className="lg:col-span-1">
                <div className="h-80 bg-gray-200 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {error === "Tour not found"
              ? "Tour not found"
              : "Error loading tour"}
          </h2>
          <p className="text-gray-600 mb-4">
            {error === "Tour not found"
              ? "The tour you're looking for doesn't exist."
              : "There was an error loading the tour. Please try again."}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Try again
            </button>
            <Link
              href="/tours"
              className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700"
            >
              Browse all tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Tour not found
          </h2>
          <p className="text-gray-600 mb-4">
            The tour you're looking for doesn't exist.
          </p>
          <Link
            href="/tours"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse all tours
          </Link>
        </div>
      </div>
    );
  }

  const images = tour.images || [
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop",
  ];

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Back Navigation */}
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/tours"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors text-sm lg:text-base"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Back to Tours
              </Link>
              <div className="flex items-center gap-3 lg:gap-4">
                <button
                  onClick={handleWishlist}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="w-5 h-5 lg:w-6 lg:h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                  )}
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <ShareIcon className="w-5 h-5 lg:w-6 lg:h-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* GetYourGuide-style Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
            {/* Tour Title and Info */}
            <div className="mb-4 lg:mb-6 animate-fade-up">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  {tour.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  ⭐ Bestseller
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold text-green-700 bg-green-100 border border-green-300 shadow-sm">
                  🎯 Recommended
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-3 lg:mb-4 leading-tight tracking-tight">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-3 lg:gap-6 text-sm lg:text-base text-gray-600 mb-4">
                <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors">
                  <MapPinIcon className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600" />
                  <span className="font-semibold text-blue-800">
                    {tour.city}, {tour.country}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-yellow-50 px-3 py-2 rounded-full border border-yellow-200 hover:bg-yellow-100 transition-colors">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarSolidIcon
                        key={i}
                        className={`w-3 h-3 lg:w-4 lg:h-4 ${
                          i < Math.floor(tour.rating || 0)
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-yellow-800">
                    {tour.rating}
                  </span>
                  <span className="font-medium text-yellow-700">
                    ({tour.reviews?.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-full border border-green-200 hover:bg-green-100 transition-colors">
                  <ClockIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-600" />
                  <span className="font-semibold text-green-800">
                    {tour.duration}
                  </span>
                </div>
              </div>
            </div>

            {/* GetYourGuide-style Image Gallery */}
            {tour.galleryImages && (
              <div className="animate-scale-in">
                <ImageGallery
                  images={tour.galleryImages}
                  showLightbox={true}
                  className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200 mb-6 lg:mb-8 hover:shadow-3xl transition-all duration-500"
                />
              </div>
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Key Info Section */}
          <div className="py-6 lg:py-8 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 lg:gap-8">
              <div className="flex-1 min-w-0">
                {/* Breadcrumb */}
                <nav className="mb-4">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Link
                      href="/"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Home
                    </Link>
                    <span>/</span>
                    <Link
                      href="/tours"
                      className="hover:text-blue-600 transition-colors"
                    >
                      Experiences
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900 font-medium">
                      {tour.title}
                    </span>
                  </div>
                </nav>

                {/* Key Info Badges */}
                <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 lg:mb-6">
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 lg:px-4 lg:py-3 rounded-full text-sm font-medium">
                    <ClockIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="hidden sm:inline">{tour.duration}</span>
                    <span className="sm:hidden">
                      {tour.duration?.split(" ")[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-2 lg:px-4 lg:py-3 rounded-full text-sm font-medium">
                    <UsersIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="hidden sm:inline">
                      Max {tour.maxGroupSize} people
                    </span>
                    <span className="sm:hidden">Max {tour.maxGroupSize}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 lg:px-4 lg:py-3 rounded-full text-sm font-medium">
                    <GlobeAltIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                    {tour.language}
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-3 py-2 lg:px-4 lg:py-3 rounded-full text-sm font-medium">
                    <StarIcon className="w-4 h-4 lg:w-5 lg:h-5" />
                    <span className="hidden sm:inline">Highly Rated</span>
                    <span className="sm:hidden">Top Rated</span>
                  </div>
                </div>
              </div>

              {/* GetYourGuide-style Booking Card */}
              <div className="lg:w-96 lg:flex-shrink-0">
                <div className="sticky top-24 bg-white/95 rounded-3xl shadow-2xl border border-gray-100 p-6 lg:p-8 hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-1 backdrop-blur-sm">
                  {/* Price Section with Enhanced Styling */}
                  <div className="mb-4 lg:mb-6 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                    <div className="flex items-baseline gap-2 lg:gap-3 mb-2">
                      <span className="text-3xl lg:text-4xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        ${(tour.priceCents / 100).toFixed(0)}
                      </span>
                      <span className="text-gray-600 font-medium text-sm lg:text-base">
                        per person
                      </span>
                      <div className="ml-auto bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-bold">
                        💰 Best Price
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <StarSolidIcon
                            key={i}
                            className="w-4 h-4 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="font-bold text-gray-900">
                        {tour.rating}
                      </span>
                      <span className="text-gray-600">
                        ({tour.reviews?.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>

                  {/* Trust Indicators with Premium Styling */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-2xl mb-4 lg:mb-6 border border-green-200">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 lg:gap-4 text-sm">
                      <div className="flex items-center gap-2 text-green-700">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <ShieldCheckIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Free cancellation</span>
                      </div>
                      <div className="flex items-center gap-2 text-green-700">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <TruckIcon className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold">Pickup included</span>
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Form Fields */}
                  <div className="space-y-4 mb-6">
                    {/* Date Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                        <CalendarIcon className="w-4 h-4 text-blue-600" />
                        Select your date
                      </label>
                      <div className="relative">
                        <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-600 z-10" />
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition-all duration-300 text-base font-medium bg-white hover:border-blue-300 hover:shadow-lg"
                        />
                      </div>
                    </div>

                    {/* Guest Selection */}
                    <div>
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-900 mb-3">
                        <UsersIcon className="w-4 h-4 text-purple-600" />
                        Number of travelers
                      </label>
                      <div className="relative">
                        <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-600 z-10" />
                        <select
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-100 focus:border-purple-500 appearance-none transition-all duration-300 text-base font-medium bg-white hover:border-purple-300 hover:shadow-lg cursor-pointer"
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <option key={num} value={num}>
                              {num} {num === 1 ? "traveler" : "travelers"}
                            </option>
                          ))}
                        </select>
                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                          <svg
                            className="w-5 h-5 text-purple-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Premium Book Now Button */}
                  <button
                    onClick={handleBookNow}
                    disabled={isBooking || !selectedDate}
                    className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:from-blue-700 hover:via-purple-700 hover:to-blue-800 text-white font-bold py-4 lg:py-5 px-6 rounded-2xl text-base lg:text-lg mb-4 lg:mb-6 transform hover:scale-[1.02] transition-all duration-300 shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isBooking ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Creating booking...
                        </>
                      ) : (
                        <>
                          <span>🎯 Book now</span>
                          <ArrowRightIcon className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </button>

                  <div className="text-center text-sm text-gray-600 mb-4 flex items-center justify-center gap-2">
                    <ShieldCheckIcon className="w-4 h-4 text-green-600" />
                    <span>Secure booking • No charges until confirmation</span>
                  </div>

                  {/* Enhanced Status Messages */}
                  {bookingSuccess && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl animate-scale-in">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-green-800 font-bold">
                            🎉 Booking confirmed!
                          </p>
                          <p className="text-green-700 text-sm">
                            Check your email for confirmation details.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingError && (
                    <div className="mb-4 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl animate-scale-in">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <ExclamationTriangleIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-red-800 font-bold">
                            Booking failed
                          </p>
                          <p className="text-red-700 text-sm">{bookingError}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Enhanced Price Breakdown */}
                  <div className="border-t border-gray-200 pt-4 space-y-3 bg-gray-50 rounded-2xl p-4 -mx-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600 flex items-center gap-2">
                        <CurrencyDollarIcon className="w-4 h-4" />$
                        {(tour.priceCents / 100).toFixed(0)} × {guests}{" "}
                        {guests === 1 ? "traveler" : "travelers"}
                      </span>
                      <span className="text-gray-900 font-semibold">
                        ${((tour.priceCents * guests) / 100).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">Service fee</span>
                      <span className="text-gray-900 font-semibold">$0</span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg pt-3 border-t border-gray-300">
                      <span className="text-gray-900">Total</span>
                      <span className="text-gray-900 text-xl">
                        ${calculateTotal().toFixed(0)}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 text-center flex items-center justify-center gap-1">
                      <ShieldCheckIcon className="w-3 h-3 text-green-600" />
                      All taxes and fees included • Best price guaranteed
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Content Tabs with Professional Design */}
          <div className="py-6 lg:py-8">
            <div className="bg-white/95 rounded-3xl shadow-2xl border border-gray-100 p-6 lg:p-8 hover:shadow-3xl transition-all duration-500 backdrop-blur-sm">
              <div className="border-b border-gray-200 mb-6 lg:mb-8">
                <nav className="flex space-x-6 lg:space-x-8 overflow-x-auto">
                  {[
                    { id: "overview", label: "Overview", icon: CheckIcon },
                    { id: "itinerary", label: "Itinerary", icon: ClockIcon },
                    {
                      id: "reviews",
                      label: "Reviews",
                      icon: ChatBubbleLeftIcon,
                    },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`flex items-center gap-2 py-3 lg:py-4 px-4 lg:px-6 border-b-3 font-bold text-sm lg:text-base whitespace-nowrap transition-all duration-300 rounded-t-2xl ${
                        activeTab === tab.id
                          ? "border-blue-600 text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg transform -translate-y-1"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <tab.icon className="w-4 h-4 lg:w-5 lg:h-5 flex-shrink-0" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  {/* Description */}
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">
                      About this experience
                    </h2>
                    <p className="text-gray-700 text-lg leading-relaxed">
                      {tour.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  {tour.highlights && (
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        Highlights
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {tour.highlights.map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <CheckIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Enhanced What to Expect Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-xl border border-blue-200 p-6 lg:p-8 hover:shadow-2xl transition-all duration-500">
                      <h3 className="text-xl lg:text-2xl font-black text-blue-900 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-500 rounded-xl flex items-center justify-center">
                          <ClockIcon className="w-5 h-5 text-white" />
                        </div>
                        What to Expect
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all">
                          <div className="w-3 h-3 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-bold text-blue-900 mb-2">
                              Professional Guide
                            </h4>
                            <p className="text-blue-800 text-sm leading-relaxed">
                              Expert local guide with extensive knowledge of the
                              area
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all">
                          <div className="w-3 h-3 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-bold text-blue-900 mb-2">
                              Small Groups
                            </h4>
                            <p className="text-blue-800 text-sm leading-relaxed">
                              Intimate experience with maximum{" "}
                              {tour.maxGroupSize || 12} participants
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-all">
                          <div className="w-3 h-3 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <h4 className="font-bold text-blue-900 mb-2">
                              All Inclusive
                            </h4>
                            <p className="text-blue-800 text-sm leading-relaxed">
                              Everything included - no hidden costs or surprises
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl shadow-xl border border-green-200 p-6 lg:p-8 hover:shadow-2xl transition-all duration-500">
                      <h3 className="text-xl lg:text-2xl font-black text-green-900 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center">
                          <MapPinIcon className="w-5 h-5 text-white" />
                        </div>
                        Location Details
                      </h3>
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm">
                          <h4 className="font-bold text-green-900 mb-3">
                            Meeting Point
                          </h4>
                          <p className="text-green-800 text-sm mb-3 leading-relaxed">
                            Central location, easy to find
                          </p>
                          <div className="bg-blue-100 p-3 rounded-xl text-sm text-blue-800 font-medium border border-blue-200">
                            📍 Detailed location will be provided after booking
                          </div>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm">
                          <h4 className="font-bold text-green-900 mb-2">
                            Duration
                          </h4>
                          <p className="text-green-800 text-sm leading-relaxed">
                            Approximately {tour.duration} of immersive
                            experience
                          </p>
                        </div>
                        <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-sm">
                          <h4 className="font-bold text-green-900 mb-2">
                            Accessibility
                          </h4>
                          <p className="text-green-800 text-sm leading-relaxed">
                            Please contact us for accessibility information
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Important Information */}
                  <div className="card-getyourguide p-4 lg:p-6">
                    <h3 className="text-lg lg:text-xl font-bold text-getyourguide-dark mb-4 lg:mb-6 flex items-center gap-2">
                      <InformationCircleIcon className="w-5 h-5 lg:w-6 lg:h-6 text-getyourguide-blue" />
                      Important Information
                    </h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">
                          What to Bring
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            Comfortable walking shoes
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            Weather-appropriate clothing
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            Camera for photos
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckIcon className="w-4 h-4 text-green-500 flex-shrink-0" />
                            Valid ID or passport
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">
                          Know Before You Go
                        </h4>
                        <ul className="space-y-2">
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <InformationCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            Tour operates rain or shine
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <InformationCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            Please arrive 15 minutes early
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <InformationCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            Minimum age requirement: 12 years
                          </li>
                          <li className="flex items-center gap-2 text-sm text-gray-600">
                            <InformationCircleIcon className="w-4 h-4 text-blue-500 flex-shrink-0" />
                            Free cancellation up to 24h before
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Safety & Hygiene */}
                  <div className="card-getyourguide p-4 lg:p-6 bg-gradient-to-br from-green-50 to-blue-50">
                    <h3 className="text-lg lg:text-xl font-bold text-getyourguide-dark mb-4 lg:mb-6 flex items-center gap-2">
                      <ShieldCheckIcon className="w-5 h-5 lg:w-6 lg:h-6 text-getyourguide-green" />
                      Safety & Hygiene
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="text-center p-3 lg:p-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <ShieldCheckIcon className="w-5 h-5 lg:w-6 lg:h-6 text-green-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                          Safety First
                        </h4>
                        <p className="text-sm text-gray-600">
                          All safety protocols followed according to local
                          guidelines
                        </p>
                      </div>
                      <div className="text-center p-3 lg:p-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <UsersIcon className="w-5 h-5 lg:w-6 lg:h-6 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                          Small Groups
                        </h4>
                        <p className="text-sm text-gray-600">
                          Limited group sizes for a more personal experience
                        </p>
                      </div>
                      <div className="text-center p-3 lg:p-4">
                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <HeartIcon className="w-5 h-5 lg:w-6 lg:h-6 text-orange-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">
                          Expert Care
                        </h4>
                        <p className="text-sm text-gray-600">
                          Professional guides trained in safety and first aid
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Host Information */}
                  {tour.host && (
                    <div className="card-getyourguide-elevated p-4 lg:p-8">
                      <h3 className="text-lg lg:text-xl font-bold text-getyourguide-dark mb-4 lg:mb-6 flex items-center gap-2">
                        <UserIcon className="w-5 h-5 lg:w-6 lg:h-6 text-getyourguide-blue" />
                        Meet your host
                      </h3>
                      <div className="flex flex-col sm:flex-row items-start gap-4 lg:gap-6">
                        <img
                          src={tour.host.avatar}
                          alt={tour.host.name}
                          className="w-20 h-20 lg:w-24 lg:h-24 rounded-full object-cover shadow-lg flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                            <div className="min-w-0">
                              <h4 className="text-xl lg:text-2xl font-bold text-getyourguide-dark mb-1">
                                {tour.host.name}
                              </h4>
                              <div className="flex items-center gap-1 mb-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <StarSolidIcon
                                      key={i}
                                      className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400"
                                    />
                                  ))}
                                </div>
                                <span className="font-semibold text-getyourguide-dark ml-1 text-sm lg:text-base">
                                  {tour.host.rating}
                                </span>
                                <span className="text-gray-500 text-sm">
                                  (127 reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600 mb-4 text-base lg:text-lg leading-relaxed">
                            Professional local guide with 10+ years of
                            experience showing visitors the best of {tour.city}.
                            Passionate about sharing local culture, history, and
                            hidden gems that only locals know about.
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-sm">
                            <div className="flex items-center gap-2 text-gray-600">
                              <ChatBubbleLeftIcon className="w-4 h-4 lg:w-5 lg:h-5 text-getyourguide-blue" />
                              <span className="font-medium">
                                Responds {tour.host.responseTime}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <GlobeAltIcon className="w-4 h-4 lg:w-5 lg:h-5 text-getyourguide-green" />
                              <span className="font-medium">
                                {tour.host.languages.join(", ")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <StarIcon className="w-4 h-4 lg:w-5 lg:h-5 text-yellow-500" />
                              <span className="font-medium">
                                Highly rated guide
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600">
                              <ShieldCheckIcon className="w-4 h-4 lg:w-5 lg:h-5 text-green-500" />
                              <span className="font-medium">Verified host</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "itinerary" && tour.itinerary && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Tour itinerary
                  </h2>
                  <div className="space-y-6">
                    {tour.itinerary.map((item, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                            {idx + 1}
                          </div>
                          {idx < tour.itinerary!.length - 1 && (
                            <div className="w-0.5 h-16 bg-gray-300 mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-6">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                              {item.title}
                            </h3>
                            <span className="text-sm text-gray-500 font-medium">
                              {item.time}
                            </span>
                          </div>
                          <p className="text-gray-700 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && tour.reviewList && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      Guest reviews
                    </h2>
                    <div className="flex items-center gap-2">
                      <StarSolidIcon className="w-5 h-5 text-yellow-400" />
                      <span className="font-bold text-lg">{tour.rating}</span>
                      <span className="text-gray-600">
                        ({tour.reviewList.length} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    {tour.reviewList.map((review) => (
                      <div
                        key={review.id}
                        className="bg-white border border-gray-200 rounded-xl p-6"
                      >
                        <div className="flex items-start gap-4">
                          <Image
                            src={review.user.avatar}
                            alt={review.user.name}
                            width={50}
                            height={50}
                            className="rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <div>
                                <h4 className="font-semibold text-gray-900">
                                  {review.user.name}
                                </h4>
                                <p className="text-sm text-gray-600">
                                  {review.user.country}
                                </p>
                              </div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <StarSolidIcon
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-gray-700 mb-3 leading-relaxed">
                              {review.comment}
                            </p>
                            <div className="flex items-center justify-between text-sm text-gray-500">
                              <span>
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                              <button className="flex items-center gap-1 hover:text-gray-700">
                                <span>👍 Helpful ({review.helpful})</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Similar Tours */}
          <div className="py-6 lg:py-8 border-t border-gray-200">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">
              Similar experiences
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {similarTours.map((similarTour) => (
                <Link
                  key={similarTour.id}
                  href={`/tours/${similarTour.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-40 lg:h-48">
                      <Image
                        src={similarTour.image}
                        alt={similarTour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3 lg:p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm lg:text-base">
                        {similarTour.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPinIcon className="w-3 h-3 lg:w-4 lg:h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-xs lg:text-sm text-gray-600 truncate">
                          {similarTour.city}, {similarTour.country}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <StarSolidIcon className="w-3 h-3 lg:w-4 lg:h-4 text-yellow-400" />
                          <span className="text-xs lg:text-sm font-medium">
                            {similarTour.rating}
                          </span>
                          <span className="text-xs lg:text-sm text-gray-600">
                            ({similarTour.reviews})
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 text-sm lg:text-base">
                            From ${(similarTour.priceCents / 100).toFixed(0)}
                          </div>
                          <div className="text-xs lg:text-sm text-gray-600">
                            {similarTour.duration}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* GetYourGuide Tours Section */}
          {getYourGuideTours.length > 0 && (
            <div className="mt-8 lg:mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <GlobeAltIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h2 className="text-xl lg:text-2xl font-bold text-gray-900">
                    More Options from GetYourGuide
                  </h2>
                  <p className="text-gray-600 text-sm lg:text-base">
                    Compare and book from trusted local providers
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {getYourGuideTours.map((gygTour) => (
                  <div
                    key={gygTour.id}
                    className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    onClick={() => {
                      setSelectedGygTour(gygTour);
                      setShowGygModal(true);
                    }}
                  >
                    <div className="relative h-40 lg:h-48">
                      <Image
                        src={gygTour.images[0]}
                        alt={gygTour.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        GetYourGuide
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-sm lg:text-base">
                        {gygTour.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPinIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600 truncate">
                          {gygTour.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                          <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {gygTour.rating}
                          </span>
                          <span className="text-sm text-gray-600">
                            ({gygTour.reviewCount})
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          {gygTour.duration}
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900 text-lg">
                            {gygTour.price.currency} {gygTour.price.amount}
                          </div>
                          <div className="text-xs text-green-600 font-medium">
                            Free cancellation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ad Banner */}
          <AdBanner category={tour?.category?.toLowerCase()} className="mt-8" />
        </div>
      </div>

      {/* GetYourGuide Modal */}
      {showGygModal && selectedGygTour && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <GlobeAltIcon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    GetYourGuide Experience
                  </h3>
                  <p className="text-sm text-gray-600">
                    Book through GetYourGuide for instant confirmation
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowGygModal(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Tour Details */}
                <div>
                  <div className="relative h-64 mb-6 rounded-xl overflow-hidden">
                    <Image
                      src={selectedGygTour.images[0]}
                      alt={selectedGygTour.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    {selectedGygTour.title}
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-2">
                      <MapPinIcon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">
                        {selectedGygTour.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">
                        {selectedGygTour.duration}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UsersIcon className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700">
                        Max {selectedGygTour.maxGroupSize} people
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarSolidIcon className="w-5 h-5 text-yellow-400" />
                      <span className="text-gray-700">
                        {selectedGygTour.rating} ({selectedGygTour.reviewCount}{" "}
                        reviews)
                      </span>
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What's Included
                    </h4>
                    <ul className="space-y-1">
                      {selectedGygTour.included.map(
                        (item: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-2">
                      What's Not Included
                    </h4>
                    <ul className="space-y-1">
                      {selectedGygTour.excluded.map(
                        (item: string, index: number) => (
                          <li
                            key={index}
                            className="flex items-center gap-2 text-sm text-gray-600"
                          >
                            <XMarkIcon className="w-4 h-4 text-red-600 flex-shrink-0" />
                            {item}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>

                {/* Booking Form */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-2">
                      {selectedGygTour.price.currency}{" "}
                      {selectedGygTour.price.amount}
                    </div>
                    <div className="text-sm text-gray-600">per person</div>
                    {selectedGygTour.price.originalPrice && (
                      <div className="text-sm text-red-600 line-through mt-1">
                        Was {selectedGygTour.price.currency}{" "}
                        {selectedGygTour.price.originalPrice}
                      </div>
                    )}
                  </div>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Date
                      </label>
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Number of Travelers
                      </label>
                      <select
                        value={guests}
                        onChange={(e) => setGuests(parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      >
                        {[...Array(selectedGygTour.maxGroupSize)].map(
                          (_, i) => (
                            <option key={i + 1} value={i + 1}>
                              {i + 1} {i + 1 === 1 ? "traveler" : "travelers"}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (!selectedDate) {
                        alert("Please select a date");
                        return;
                      }

                      setIsBooking(true);
                      try {
                        const result = await createBooking(tourId, {
                          headcount: guests,
                          selectedDate,
                          specialRequests: "",
                          getYourGuideData: {
                            gygTourId: selectedGygTour.id,
                            gygPrice: selectedGygTour.price.amount,
                            gygCurrency: selectedGygTour.price.currency,
                          },
                        });

                        if (result.success) {
                          setShowGygModal(false);
                          router.push(
                            `/bookings/confirmation?bookingId=${
                              result.booking?.id || "gyg-" + selectedGygTour.id
                            }`
                          );
                        } else {
                          alert(result.error || "Booking failed");
                        }
                      } catch (error) {
                        alert("An error occurred while booking");
                      } finally {
                        setIsBooking(false);
                      }
                    }}
                    disabled={isBooking || !selectedDate}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isBooking ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Book with GetYourGuide
                        <ArrowRightIcon className="w-5 h-5 inline ml-2" />
                      </>
                    )}
                  </button>

                  <div className="mt-4 text-center text-sm text-gray-600">
                    <ShieldCheckIcon className="w-4 h-4 text-green-600 inline mr-1" />
                    Free cancellation • Instant confirmation • Secure booking
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

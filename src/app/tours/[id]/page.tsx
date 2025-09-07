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
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(0);
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
  }, [tourId]);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const openLightbox = (index: number) => {
    setLightboxImage(index);
    setShowLightbox(true);
  };

  const closeLightbox = () => {
    setShowLightbox(false);
  };

  const nextImage = () => {
    setLightboxImage((prev) => (prev + 1) % (tour?.images?.length || 1));
  };

  const prevImage = () => {
    setLightboxImage(
      (prev) =>
        (prev - 1 + (tour?.images?.length || 1)) % (tour?.images?.length || 1)
    );
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
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <Link
                href="/tours"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
              >
                <ChevronLeftIcon className="w-4 h-4" />
                Back to Tours
              </Link>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleWishlist}
                  className="p-2 text-gray-600 hover:text-red-500 transition-colors"
                >
                  {isWishlisted ? (
                    <HeartSolidIcon className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartIcon className="w-6 h-6" />
                  )}
                </button>
                <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                  <ShareIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* GetYourGuide-style Hero Section */}
        <div className="bg-white">
          <div className="max-w-7xl mx-auto px-6 py-4">
            {/* Tour Title and Info */}
            <div className="mb-4">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="badge-getyourguide">{tour.category}</span>
                <span className="badge-bestseller">Bestseller</span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-getyourguide-dark mb-4 leading-tight">
                {tour.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-getyourguide-gray mb-4">
                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5 text-getyourguide-blue" />
                  <span className="font-medium">
                    {tour.city}, {tour.country}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <StarSolidIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(tour.rating || 0)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-getyourguide-dark">
                    {tour.rating}
                  </span>
                  <span className="font-medium">
                    ({tour.reviews?.toLocaleString()} reviews)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-getyourguide-blue" />
                  <span className="font-medium">{tour.duration}</span>
                </div>
              </div>
            </div>

            {/* GetYourGuide-style Image Gallery */}
            {tour.galleryImages && (
              <ImageGallery
                images={tour.galleryImages}
                showLightbox={true}
                className="rounded-xl overflow-hidden"
              />
            )}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Key Info Section */}
          <div className="py-8 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
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
                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-3 rounded-full text-sm font-medium">
                    <ClockIcon className="w-5 h-5" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-4 py-3 rounded-full text-sm font-medium">
                    <UsersIcon className="w-5 h-5" />
                    Max {tour.maxGroupSize} people
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-3 rounded-full text-sm font-medium">
                    <GlobeAltIcon className="w-5 h-5" />
                    {tour.language}
                  </div>
                  <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-3 rounded-full text-sm font-medium">
                    <StarIcon className="w-5 h-5" />
                    Highly Rated
                  </div>
                </div>
              </div>

              {/* GetYourGuide-style Booking Card */}
              <div className="lg:w-96">
                <div className="card-getyourguide-elevated p-8 sticky top-24 shadow-xl">
                  {/* Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className="text-4xl font-bold text-getyourguide-dark">
                        ${(tour.priceCents / 100).toFixed(0)}
                      </span>
                      <span className="text-getyourguide-gray font-medium">
                        per person
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-getyourguide-gray">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                      <span className="font-semibold">{tour.rating}</span>
                      <span>({tour.reviews?.toLocaleString()} reviews)</span>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="bg-green-50 p-4 rounded-xl mb-6">
                    <div className="flex items-center gap-4 text-sm text-getyourguide-gray">
                      <div className="flex items-center gap-2">
                        <ShieldCheckIcon className="w-5 h-5 text-getyourguide-green" />
                        <span className="font-medium">Free cancellation</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TruckIcon className="w-5 h-5 text-getyourguide-green" />
                        <span className="font-medium">Pickup available</span>
                      </div>
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div className="mb-4">
                    <label className="block text-sm font-bold text-getyourguide-dark mb-3">
                      Select date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-getyourguide-blue" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-getyourguide-blue focus:border-getyourguide-blue transition-all"
                      />
                    </div>
                  </div>

                  {/* Guest Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-bold text-getyourguide-dark mb-3">
                      Number of travelers
                    </label>
                    <div className="relative">
                      <UsersIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-getyourguide-blue" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-10 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-getyourguide-blue focus:border-getyourguide-blue appearance-none transition-all"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                          <option key={num} value={num}>
                            {num} {num === 1 ? "traveler" : "travelers"}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Book Now Button */}
                  <button
                    onClick={handleBookNow}
                    disabled={isBooking || !selectedDate}
                    className="w-full btn-getyourguide-primary py-4 text-lg font-bold mb-6 transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isBooking ? "Creating booking..." : "Book now"}
                  </button>

                  <div className="text-center text-sm text-gray-600 mb-4">
                    You won't be charged yet
                  </div>

                  {/* Booking Status Messages */}
                  {bookingSuccess && (
                    <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <CheckIcon className="w-5 h-5 text-green-600" />
                        <div>
                          <p className="text-green-800 font-semibold">
                            Booking confirmed!
                          </p>
                          <p className="text-green-700 text-sm">
                            Check your email for confirmation details.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {bookingError && (
                    <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <div className="flex items-center gap-2">
                        <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                        <div>
                          <p className="text-red-800 font-semibold">
                            Booking failed
                          </p>
                          <p className="text-red-700 text-sm">{bookingError}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Price Breakdown */}
                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        ${(tour.priceCents / 100).toFixed(0)} × {guests}{" "}
                        {guests === 1 ? "traveler" : "travelers"}
                      </span>
                      <span className="text-gray-900 font-medium">
                        ${((tour.priceCents * guests) / 100).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center font-bold text-lg pt-2 border-t border-gray-100">
                      <span>Total</span>
                      <span>${calculateTotal().toFixed(0)}</span>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Includes all taxes and fees
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Tabs */}
          <div className="py-8">
            <div className="border-b border-gray-200 mb-8">
              <nav className="flex space-x-8">
                {[
                  { id: "overview", label: "Overview", icon: CheckIcon },
                  { id: "itinerary", label: "Itinerary", icon: ClockIcon },
                  { id: "reviews", label: "Reviews", icon: ChatBubbleLeftIcon },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
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

                {/* What to Expect */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="card-getyourguide p-6">
                    <h3 className="text-xl font-bold text-getyourguide-dark mb-4 flex items-center gap-2">
                      <ClockIcon className="w-6 h-6 text-getyourguide-blue" />
                      What to Expect
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-getyourguide-blue rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Professional Guide
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Expert local guide with extensive knowledge of the
                            area
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-getyourguide-green rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            Small Groups
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Intimate experience with maximum{" "}
                            {tour.maxGroupSize || 12} participants
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-getyourguide-orange rounded-full mt-2 flex-shrink-0"></div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            All Inclusive
                          </h4>
                          <p className="text-gray-600 text-sm">
                            Everything included - no hidden costs or surprises
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-getyourguide p-6">
                    <h3 className="text-xl font-bold text-getyourguide-dark mb-4 flex items-center gap-2">
                      <MapPinIcon className="w-6 h-6 text-getyourguide-green" />
                      Location Details
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Meeting Point
                        </h4>
                        <p className="text-gray-600 text-sm mb-2">
                          Central location, easy to find
                        </p>
                        <div className="bg-blue-50 p-3 rounded-lg text-sm text-blue-800">
                          📍 Detailed location will be provided after booking
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Duration
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Approximately {tour.duration} of immersive experience
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">
                          Accessibility
                        </h4>
                        <p className="text-gray-600 text-sm">
                          Please contact us for accessibility information
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Information */}
                <div className="card-getyourguide p-6">
                  <h3 className="text-xl font-bold text-getyourguide-dark mb-4 flex items-center gap-2">
                    <InformationCircleIcon className="w-6 h-6 text-getyourguide-blue" />
                    Important Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        What to Bring
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckIcon className="w-4 h-4 text-green-500" />
                          Comfortable walking shoes
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckIcon className="w-4 h-4 text-green-500" />
                          Weather-appropriate clothing
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckIcon className="w-4 h-4 text-green-500" />
                          Camera for photos
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckIcon className="w-4 h-4 text-green-500" />
                          Valid ID or passport
                        </li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Know Before You Go
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                          Tour operates rain or shine
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                          Please arrive 15 minutes early
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                          Minimum age requirement: 12 years
                        </li>
                        <li className="flex items-center gap-2 text-sm text-gray-600">
                          <InformationCircleIcon className="w-4 h-4 text-blue-500" />
                          Free cancellation up to 24h before
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Safety & Hygiene */}
                <div className="card-getyourguide p-6 bg-gradient-to-br from-green-50 to-blue-50">
                  <h3 className="text-xl font-bold text-getyourguide-dark mb-4 flex items-center gap-2">
                    <ShieldCheckIcon className="w-6 h-6 text-getyourguide-green" />
                    Safety & Hygiene
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <ShieldCheckIcon className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Safety First
                      </h4>
                      <p className="text-sm text-gray-600">
                        All safety protocols followed according to local
                        guidelines
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <UsersIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Small Groups
                      </h4>
                      <p className="text-sm text-gray-600">
                        Limited group sizes for a more personal experience
                      </p>
                    </div>
                    <div className="text-center p-4">
                      <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <HeartIcon className="w-6 h-6 text-orange-600" />
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">
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
                  <div className="card-getyourguide-elevated p-8">
                    <h3 className="text-xl font-bold text-getyourguide-dark mb-4 flex items-center gap-2">
                      <UserIcon className="w-6 h-6 text-getyourguide-blue" />
                      Meet your host
                    </h3>
                    <div className="flex items-start gap-6">
                      <img
                        src={tour.host.avatar}
                        alt={tour.host.name}
                        className="w-24 h-24 rounded-full object-cover shadow-lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <h4 className="text-2xl font-bold text-getyourguide-dark">
                              {tour.host.name}
                            </h4>
                            <div className="flex items-center gap-1 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <StarSolidIcon
                                    key={i}
                                    className="w-4 h-4 text-yellow-400"
                                  />
                                ))}
                              </div>
                              <span className="font-semibold text-getyourguide-dark ml-1">
                                {tour.host.rating}
                              </span>
                              <span className="text-gray-500">
                                (127 reviews)
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-4 text-lg">
                          Professional local guide with 10+ years of experience
                          showing visitors the best of {tour.city}. Passionate
                          about sharing local culture, history, and hidden gems
                          that only locals know about.
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <ChatBubbleLeftIcon className="w-5 h-5 text-getyourguide-blue" />
                            <span className="font-medium">
                              Responds {tour.host.responseTime}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <GlobeAltIcon className="w-5 h-5 text-getyourguide-green" />
                            <span className="font-medium">
                              {tour.host.languages.join(", ")}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <StarIcon className="w-5 h-5 text-yellow-500" />
                            <span className="font-medium">
                              Highly rated guide
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <ShieldCheckIcon className="w-5 h-5 text-green-500" />
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

          {/* Similar Tours */}
          <div className="py-8 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Similar experiences
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarTours.map((similarTour) => (
                <Link
                  key={similarTour.id}
                  href={`/tours/${similarTour.id}`}
                  className="group block"
                >
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative h-48">
                      <Image
                        src={similarTour.image}
                        alt={similarTour.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                        {similarTour.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPinIcon className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">
                          {similarTour.city}, {similarTour.country}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm font-medium">
                            {similarTour.rating}
                          </span>
                          <span className="text-sm text-gray-600">
                            ({similarTour.reviews})
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">
                            From ${(similarTour.priceCents / 100).toFixed(0)}
                          </div>
                          <div className="text-sm text-gray-600">
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

          {/* Ad Banner */}
          <AdBanner category={tour?.category?.toLowerCase()} className="mt-8" />
        </div>
      </div>
    </>
  );
}

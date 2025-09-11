"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { tourService } from "@/services/tour.service";
import { Tour } from "@/types/tour";
import {
  StarIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  CheckIcon,
  CalendarIcon,
  UsersIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  UserIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

interface TourDetailPageProps {
  params: Promise<{ id: string }> | { id: string };
}

export default function TourDetailPage({ params }: TourDetailPageProps) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [isBooking, setIsBooking] = useState(false);

  const router = useRouter();

  // Handle params properly for both Next.js 14 and 15
  const resolvedParams = "then" in params ? use(params) : params;
  const tourId = resolvedParams?.id;

  useEffect(() => {
    async function loadTour() {
      if (!tourId || typeof tourId !== "string") {
        setError("Invalid tour ID");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const tourData = await tourService.getTourById(tourId);
        setTour(tourData);
      } catch (error) {
        console.error("Error loading tour:", error);
        setError("Failed to load tour details");
      } finally {
        setIsLoading(false);
      }
    }

    loadTour();
  }, [tourId]);

  const handleBooking = async () => {
    if (!tour) return;
    
    setIsBooking(true);
    try {
      // This would integrate with your booking service
      console.log("Booking tour:", { tourId, guests, selectedDate });
      // await bookingService.createBooking({ tourId, guests, selectedDate });
      alert("Booking feature will be implemented with the booking system");
    } catch (error) {
      console.error("Booking error:", error);
    } finally {
      setIsBooking(false);
    }
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded-lg mb-6"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6 h-fit">
                <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Tour not found"}
          </h1>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  const mainImage = tour.media[0]?.url || `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80`;
  const rating = tour.guide.ratingAvg || 4.5;
  const pricePerPerson = tour.basePrice / 100;
  const duration = `${Math.floor(tour.durationMins / 60)}h ${tour.durationMins % 60}m`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to tours
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tour.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{tour.city}, {tour.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                  <span>{rating}</span>
                  <span>({tour.guide.toursCount} tours)</span>
                </div>
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4" />
                  <span>{duration}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 mt-4 lg:mt-0">
              <button
                onClick={handleWishlist}
                className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
              </button>
              <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <ShareIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Image */}
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <img
              src={mainImage}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            {tour.media.length > 1 && (
              <div className="absolute bottom-4 right-4">
                <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                  +{tour.media.length - 1} more photos
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Overview */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
              <p className="text-gray-600 leading-relaxed">
                {tour.description || "Experience this amazing tour with our expert guide."}
              </p>
            </div>

            {/* Tour Details */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Tour Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Duration</div>
                    <div className="text-gray-600">{duration}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <UserGroupIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Group Size</div>
                    <div className="text-gray-600">{tour.minGroup}-{tour.maxGroup} people</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Language</div>
                    <div className="text-gray-600">{tour.language}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <CheckIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium">Category</div>
                    <div className="text-gray-600">{tour.category}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Guide Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Meet Your Guide</h2>
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  {tour.guide.user.image ? (
                    <img 
                      src={tour.guide.user.image} 
                      alt={tour.guide.user.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-8 h-8 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">{tour.guide.user.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                    <span>{tour.guide.ratingAvg} rating</span>
                    <span>•</span>
                    <span>{tour.guide.toursCount} tours</span>
                  </div>
                  {tour.guide.bio && (
                    <p className="text-gray-600 text-sm">{tour.guide.bio}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="bg-white rounded-lg shadow-md p-6 h-fit sticky top-8">
            <div className="mb-6">
              <div className="text-3xl font-bold text-gray-900">
                ${pricePerPerson}
                <span className="text-lg font-normal text-gray-600 ml-1">per person</span>
              </div>
            </div>

            {/* Date Selection */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <div className="relative">
                <CalendarIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Guests Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Guests
              </label>
              <div className="relative">
                <UsersIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from({ length: tour.maxGroup - tour.minGroup + 1 }, (_, i) => tour.minGroup + i).map(num => (
                    <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total */}
            <div className="border-t border-gray-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total</span>
                <span className="text-xl font-bold">${(pricePerPerson * guests).toFixed(2)}</span>
              </div>
            </div>

            {/* Book Button */}
            <button
              onClick={handleBooking}
              disabled={isBooking || !selectedDate}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              {isBooking ? "Processing..." : "Book Now"}
            </button>

            <p className="text-xs text-gray-500 mt-3 text-center">
              Free cancellation up to 24 hours before the experience
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

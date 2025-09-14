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
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
  CheckCircleIcon as CheckCircleSolidIcon,
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
            <div className="h-96 bg-gray-200 rounded-lg mb-6"></div>
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

  const mainImage =
    tour.media[0]?.url ||
    `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop&q=80`;
  const rating = tour.guide.ratingAvg || 4.5;
  const pricePerPerson = tour.basePrice / 100;
  const duration = `${Math.floor(tour.durationMins / 60)}h ${
    tour.durationMins % 60
  }m`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to tours
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section - GetYourGuide Style */}
        <div className="mb-8">
          {/* Title and Rating Section */}
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-800">
                  Traveler favorite
                </span>
                <span className="text-sm text-gray-500">
                  One of our top activities
                </span>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {tour.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <StarSolidIcon className="w-5 h-5 text-yellow-400" />
                  <span className="font-semibold">{rating}</span>
                  <span>({tour.guide.toursCount} reviews)</span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPinIcon className="w-5 h-5" />
                  <span>
                    {tour.city}, {tour.country}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5" />
                  <span>{duration}</span>
                </div>

                <div className="flex items-center gap-2">
                  <UserGroupIcon className="w-5 h-5" />
                  <span>
                    {tour.minGroup}-{tour.maxGroup} people
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mt-4 lg:mt-0">
              <button
                onClick={handleWishlist}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-5 h-5 text-red-500" />
                ) : (
                  <HeartIcon className="w-5 h-5" />
                )}
                Save
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <ShareIcon className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          {/* Main Image Gallery */}
          <div className="relative h-80 lg:h-96 rounded-xl overflow-hidden mb-4">
            <img
              src={mainImage}
              alt={tour.title}
              className="w-full h-full object-cover"
            />
            {tour.media.length > 1 && (
              <div className="absolute bottom-4 right-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-sm">
                +{tour.media.length - 1} more photos
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {tour.media.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {tour.media.slice(1, 5).map((media, index) => (
                <div
                  key={index}
                  className="aspect-video rounded-lg overflow-hidden"
                >
                  <img
                    src={media.url}
                    alt={`${tour.title} ${index + 2}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Main Content Layout - GetYourGuide Style */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About this activity */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About this activity
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Duration {duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleSolidIcon className="w-5 h-5 text-green-500" />
                  <span className="text-gray-600">Free cancellation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-gray-400" />
                  <span className="text-gray-600">Check availability</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                {tour.description ||
                  "Experience this amazing tour with our expert guide. Discover the beauty and culture of the destination while enjoying a personalized experience tailored to your interests."}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Highlights
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircleSolidIcon className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Expert local guide with deep knowledge
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleSolidIcon className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Small group experience (max {tour.maxGroup} people)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleSolidIcon className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Authentic local experiences and insights
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleSolidIcon className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Flexible scheduling and personalized itinerary
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleSolidIcon className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Hotel pickup and drop-off included
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircleSolidIcon className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">
                    Cultural immersion and local interactions
                  </span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                What's included
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <CheckCircleSolidIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Expert local guide</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleSolidIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">
                    Hotel pickup and drop-off
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleSolidIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Transportation</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleSolidIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Entrance fees</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleSolidIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Bottled water</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleSolidIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">Wi-Fi on board</span>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Important information
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <InformationCircleIcon className="w-5 h-5 text-blue-500" />
                  What to bring
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-7">
                  <li>Passport or ID card</li>
                  <li>Comfortable walking shoes</li>
                  <li>Sunscreen and hat</li>
                  <li>Bottled water</li>
                  <li>Camera for memorable photos</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <InformationCircleIcon className="w-5 h-5 text-orange-500" />
                  Know before you go
                </h3>
                <ul className="list-disc list-inside text-gray-700 space-y-1 ml-7">
                  <li>Children under 12 must be accompanied by an adult</li>
                  <li>Wheelchair accessible options available upon request</li>
                  <li>Weather appropriate clothing recommended</li>
                  <li>
                    Minimum {tour.minGroup} people required for tour to operate
                  </li>
                </ul>
              </div>
            </div>

            {/* Meet Your Guide */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Meet your guide
              </h2>
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                  {tour.guide.user.image ? (
                    <img
                      src={tour.guide.user.image}
                      alt={tour.guide.user.name}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-10 h-10 text-gray-400" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {tour.guide.user.name}
                  </h3>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                      <span className="font-medium">
                        {tour.guide.ratingAvg}
                      </span>
                      <span>({tour.guide.toursCount} tours)</span>
                    </div>
                    <span>•</span>
                    <span>Languages: {tour.language}</span>
                  </div>
                  {tour.guide.bio && (
                    <p className="text-gray-700 leading-relaxed">
                      {tour.guide.bio}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Customer Reviews */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Customer reviews
                </h2>
                <div className="flex items-center gap-2">
                  <StarSolidIcon className="w-5 h-5 text-yellow-400" />
                  <span className="text-lg font-semibold">{rating}</span>
                  <span className="text-gray-600">
                    ({tour.guide.toursCount} reviews)
                  </span>
                </div>
              </div>

              {/* Review Summary */}
              <div className="grid grid-cols-3 gap-6 mb-8 p-6 bg-gray-50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    4.9/5
                  </div>
                  <div className="text-sm text-gray-600">Guide</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    5.0/5
                  </div>
                  <div className="text-sm text-gray-600">Transportation</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    4.8/5
                  </div>
                  <div className="text-sm text-gray-600">Value for money</div>
                </div>
              </div>

              {/* Sample Reviews */}
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Sarah M.
                      </div>
                      <div className="text-sm text-gray-600">
                        United States • September 2024
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    "Amazing experience! Our guide was incredibly knowledgeable
                    and made the tour so much more meaningful. The
                    transportation was comfortable and on time. Highly
                    recommend!"
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Ahmed K.
                      </div>
                      <div className="text-sm text-gray-600">
                        Jordan • August 2024
                      </div>
                    </div>
                    <div className="ml-auto flex items-center gap-1">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm font-medium">5</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    "Perfect way to explore the local culture. The guide shared
                    so many interesting stories and took us to places we
                    wouldn't have found on our own. Great value for money!"
                  </p>
                </div>
              </div>

              <div className="text-center mt-6">
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  See more reviews ({tour.guide.toursCount})
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Booking Widget */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 sticky top-8">
              {/* Price */}
              <div className="mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  ${pricePerPerson}
                  <span className="text-lg font-normal text-gray-600">
                    {" "}
                    per person
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  Total: ${(pricePerPerson * guests).toFixed(2)}
                </div>
              </div>

              {/* Date Selection */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Select participants and date
                </label>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-700 mb-1">
                      Participants
                    </label>
                    <div className="relative">
                      <UsersIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <select
                        value={guests}
                        onChange={(e) => setGuests(Number(e.target.value))}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      >
                        {Array.from(
                          { length: tour.maxGroup - tour.minGroup + 1 },
                          (_, i) => tour.minGroup + i
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num} participant{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Button */}
              <button
                onClick={() =>
                  router.push(
                    `/check-availability?tourId=${tourId}&date=${selectedDate}&guests=${guests}`
                  )
                }
                disabled={!selectedDate}
                className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors mb-4"
              >
                Check availability & Book
              </button>

              {/* Trust Indicators */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <CheckCircleSolidIcon className="w-4 h-4 text-green-500" />
                  <span>Free cancellation up to 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleSolidIcon className="w-4 h-4 text-green-500" />
                  <span>Check availability first</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircleSolidIcon className="w-4 h-4 text-green-500" />
                  <span>Instant confirmation</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 mt-6 pt-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">
                    ${pricePerPerson} × {guests} participants
                  </span>
                  <span className="font-semibold">
                    ${(pricePerPerson * guests).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold mt-2">
                  <span>Total</span>
                  <span>${(pricePerPerson * guests).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

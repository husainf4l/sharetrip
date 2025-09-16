import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  StarIcon,
  HeartIcon,
  ClockIcon,
  UsersIcon,
  MapPinIcon,
  UserGroupIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";
import { createBooking } from "../services/booking";
import { Tour as TourType } from "../types/tour";
import { useCart } from "../contexts/CartContext";

const getCategoryDisplayName = (category: string): string => {
  const categoryMap: Record<string, string> = {
    SHARE_TRIP: "Shared Experience",
    PRIVATE: "Private Tour",
    GROUP: "Group Tour",
    TOURS_SIGHTSEEING: "Tours & Sightseeing",
    CULTURE_EXPERIENCES: "Culture Experiences",
    ADVENTURE_OUTDOORS: "Adventure & Outdoors",
    FOOD_TOURS: "Food Tours",
    WALKING_TOURS: "Walking Tours",
  };
  return categoryMap[category] || category;
};

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
  isInstantConfirmation?: boolean;
  isFreeCancellation?: boolean;
  isSkipTheLine?: boolean;
  accessibility?: boolean;
}

export default function TourCard({ tour }: { tour: Tour | TourType }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isBooking, setIsBooking] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);

  const { addToCart, addToWishlist, removeFromWishlist, wishlistItems } =
    useCart();

  // Check if tour is in wishlist
  const isWishlisted = wishlistItems.some((item) => item.id === tour.id);

  // Handle different property names for rating and price
  const rating = (tour as Tour).rating || (tour as TourType).hostRating || 4.5;
  const reviews = (tour as Tour).reviews || 100;
  const price = (tour as Tour).priceCents || (tour as TourType).basePrice || 0;
  const image =
    (tour as Tour).image ||
    (tour as TourType).media?.[0]?.url ||
    `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=300&fit=crop&q=80`;
  const badge = (tour as Tour).badge;
  const duration =
    (tour as Tour).duration ||
    `${Math.floor(((tour as TourType).durationMins || 120) / 60)}h ${
      ((tour as TourType).durationMins || 120) % 60
    }m`;
  const groupSize =
    (tour as Tour).groupSize ||
    `${(tour as TourType).minGroup}-${(tour as TourType).maxGroup}`;
  const isInstantConfirmation =
    (tour as Tour).isInstantConfirmation || (tour as TourType).instantBook;
  const isFreeCancellation =
    (tour as Tour).isFreeCancellation ||
    (tour as TourType).cancellationPolicy === "flexible";
  const isSkipTheLine = (tour as Tour).isSkipTheLine;

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (isWishlisted) {
      removeFromWishlist(tour.id);
    } else {
      addToWishlist({
        id: tour.id,
        title: tour.title,
        price: price, // Keep original price format
        currency: "USD",
        image: image,
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart({
      id: tour.id,
      title: tour.title,
      price: price, // Keep original price format
      currency: "USD",
      image: image,
    });
  };

  const handleBookNow = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsBooking(true);
    setBookingError(null);

    try {
      const result = await createBooking(tour.id, {
        headcount: 1, // Default to 1 person for quick booking
        selectedDate: new Date().toISOString().split("T")[0], // Today's date as default
      });

      if (result.success) {
        setBookingSuccess(true);
        // Reset success message after 3 seconds
        setTimeout(() => setBookingSuccess(false), 3000);
      } else {
        setBookingError(result.error || "Failed to book tour");
      }
    } catch {
      setBookingError("An unexpected error occurred");
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <Link href={`/tours/${tour.id}`} className="group block">
      <article className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2 border border-gray-100 hover:border-blue-200">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          <Image
            src={image}
            alt={tour.title}
            fill
            className={`object-cover group-hover:scale-110 transition-all duration-700 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
          )}

          {/* Compact Badge */}
          {badge && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">
              {badge}
            </div>
          )}

          {/* Compact Category Badge */}
          {tour.category && (
            <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-medium text-gray-700">
              {getCategoryDisplayName(tour.category)}
            </div>
          )}

          {/* Compact Wishlist Button */}
          <button
            onClick={handleWishlist}
            className="absolute top-8 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-all duration-200 group shadow-md"
          >
            {isWishlisted ? (
              <HeartSolidIcon className="w-5 h-5 text-red-500" />
            ) : (
              <HeartIcon className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
            )}
          </button>

          {/* Compact Rating Badge */}
          <div className="absolute bottom-2 left-2 bg-white/90 rounded px-2 py-1 shadow-sm">
            <div className="flex items-center gap-1">
              <StarIcon className="w-3 h-3 text-yellow-400 fill-current" />
              <span className="font-semibold text-xs">{rating.toFixed(1)}</span>
              <span className="text-gray-500 text-xs">({reviews})</span>
            </div>
          </div>

          {/* Quick Info Overlay */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                {duration && (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <ClockIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{duration}</span>
                  </div>
                )}
                {groupSize && (
                  <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                    <UsersIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{groupSize}</span>
                  </div>
                )}
              </div>
              <button className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition-colors shadow-lg">
                View Details
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-2 font-medium">
            <MapPinIcon className="w-4 h-4" />
            <span>
              {tour.city}, {tour.country}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-bold text-lg text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
            {tour.title}
          </h3>

          {/* Description */}
          {tour.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {tour.description}
            </p>
          )}

          {/* Tour Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2 mb-3">
              {tour.category && (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {getCategoryDisplayName(tour.category)}
                </span>
              )}
              {isInstantConfirmation && (
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  ⚡ Instant
                </span>
              )}
              {isFreeCancellation && (
                <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">
                  🎟️ Free cancel
                </span>
              )}
              {isSkipTheLine && (
                <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">
                  ⏰ Skip line
                </span>
              )}
            </div>

            {/* Additional Info Grid */}
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
              {duration && (
                <div className="flex items-center gap-1">
                  <ClockIcon className="w-4 h-4 text-gray-400" />
                  <span>{duration}</span>
                </div>
              )}
              {tour.language && (
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>{tour.language}</span>
                </div>
              )}
              {groupSize && (
                <div className="flex items-center gap-1">
                  <UserGroupIcon className="w-4 h-4 text-gray-400" />
                  <span>Max {groupSize}</span>
                </div>
              )}
              {tour.accessibility && (
                <div className="flex items-center gap-1">
                  <span className="text-blue-500">♿</span>
                  <span>Accessible</span>
                </div>
              )}
            </div>
          </div>

          {/* Price and Action Buttons */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-sm text-gray-500">From</span>
                <span className="text-2xl font-bold text-gray-900">
                  ${(price / 100).toFixed(0)}
                </span>
              </div>
              <div className="text-sm text-gray-500">per person</div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                <ShoppingBagIcon className="w-4 h-4" />
                <span className="text-sm">Add to Cart</span>
              </button>
              <button
                onClick={handleBookNow}
                disabled={isBooking}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
              >
                {isBooking ? "Booking..." : "Book now"}
              </button>
            </div>
          </div>

          {/* Booking Status Messages */}
          {bookingSuccess && (
            <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800 text-sm font-medium">
                ✅ Booking successful! Check your email for confirmation.
              </p>
            </div>
          )}

          {bookingError && (
            <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm font-medium">
                ❌ {bookingError}
              </p>
            </div>
          )}
        </div>
      </article>
    </Link>
  );
}

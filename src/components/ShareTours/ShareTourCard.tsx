"use client";

import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

interface ShareTourCardProps {
  tour: {
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
  };
  onToggleWishlist?: (tourId: string) => void;
  isWishlisted?: boolean;
}

export default function ShareTourCard({
  tour,
  onToggleWishlist,
  isWishlisted = false,
}: ShareTourCardProps) {
  const imageUrl = tour.media?.[0]?.url || "/placeholder-tour.jpg";
  const progress = parseFloat(tour.progressPercentage);
  const hasDiscount = tour.currentPrice < tour.basePrice / 100;
  const nextStartTime = tour.startTimes[0]
    ? new Date(tour.startTimes[0])
    : null;

  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(date);
  };

  const getBadgeColor = (style: string) => {
    const colors: Record<string, string> = {
      relaxed: "bg-green-100 text-green-800",
      adventurous: "bg-orange-100 text-orange-800",
      foodie: "bg-yellow-100 text-yellow-800",
      culture: "bg-purple-100 text-purple-800",
      nightlife: "bg-pink-100 text-pink-800",
      family: "bg-blue-100 text-blue-800",
    };
    return colors[style] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300/60 w-full max-w-sm mx-auto">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-100">
        <Image
          src={imageUrl}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Minimal gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        {/* Minimal Badges - only show the most important one */}
        <div className="absolute top-4 left-4">
          {tour.isDropIn && (
            <span className="text-xs px-3 py-1.5 bg-red-500/95 backdrop-blur-sm text-white rounded-full font-semibold shadow-lg">
              Drop-in
            </span>
          )}
          {!tour.isDropIn && tour.isEarlyBird && (
            <span className="text-xs px-3 py-1.5 bg-green-500/95 backdrop-blur-sm text-white rounded-full font-semibold shadow-lg">
              Early Bird
            </span>
          )}
          {!tour.isDropIn && !tour.isEarlyBird && tour.isPayWhatYouWant && (
            <span className="text-xs px-3 py-1.5 bg-blue-500/95 backdrop-blur-sm text-white rounded-full font-semibold shadow-lg">
              Pay What You Want
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist?.(tour.id)}
          className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-700" />
          )}
        </button>

        {/* Price Overlay */}
        <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl">
          <div className="text-lg font-bold">
            ${tour.currentPrice.toFixed(0)}
          </div>
        </div>
      </div>

      {/* Minimal Content */}
      <div className="p-6">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-500 mb-3">
          <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="font-medium">
            {tour.city}, {tour.country}
          </span>
        </div>

        {/* Title */}
        <Link href={`/tours/${tour.id}`} className="block">
          <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight text-lg">
            {tour.title}
          </h3>
        </Link>

        {/* Essential Info Row */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1.5" />
              <span className="font-medium">
                {formatDuration(tour.durationMins)}
              </span>
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="w-4 h-4 mr-1.5" />
              <span className="font-medium">
                {tour.confirmedBookings}/{tour.maxGroup}
              </span>
            </div>
          </div>

          {/* Rating */}
          {tour.hostRating && tour.hostRating > 0 && (
            <div className="flex items-center">
              <StarIcon className="w-4 h-4 text-amber-400 fill-current mr-1" />
              <span className="font-semibold text-gray-900">
                {tour.hostRating.toFixed(1)}
              </span>
            </div>
          )}
        </div>

        {/* Minimal CTA */}
        <Link
          href={`/tours/${tour.id}`}
          className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

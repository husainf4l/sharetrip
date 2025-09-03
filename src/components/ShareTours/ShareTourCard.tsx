'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HeartIcon, StarIcon, ClockIcon, UserGroupIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

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
      }
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

export default function ShareTourCard({ tour, onToggleWishlist, isWishlisted = false }: ShareTourCardProps) {
  const imageUrl = tour.media?.[0]?.url || '/placeholder-tour.jpg';
  const progress = parseFloat(tour.progressPercentage);
  const hasDiscount = tour.currentPrice < (tour.basePrice / 100);
  const nextStartTime = tour.startTimes[0] ? new Date(tour.startTimes[0]) : null;
  
  const formatDuration = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    }).format(date);
  };

  const getBadgeColor = (style: string) => {
    const colors: Record<string, string> = {
      'relaxed': 'bg-green-100 text-green-800',
      'adventurous': 'bg-orange-100 text-orange-800', 
      'foodie': 'bg-yellow-100 text-yellow-800',
      'culture': 'bg-purple-100 text-purple-800',
      'nightlife': 'bg-pink-100 text-pink-800',
      'family': 'bg-blue-100 text-blue-800'
    };
    return colors[style] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="card hover-lift animate-fade-up stagger-item group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={imageUrl}
          alt={tour.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Compact Badges Overlay */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1 max-w-[80%]">
          {tour.isDropIn && (
            <span className="text-xs px-2 py-1 bg-red-500 text-white rounded font-medium">
              Drop-in
            </span>
          )}
          {tour.isEarlyBird && (
            <span className="text-xs px-2 py-1 bg-green-500 text-white rounded font-medium">
              Early
            </span>
          )}
          {tour.isPayWhatYouWant && (
            <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded font-medium">
              PWYW
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist?.(tour.id)}
          className="absolute top-3 right-3 p-2 rounded-full glass hover-scale transition-all"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="w-5 h-5 text-red-500" />
          ) : (
            <HeartIcon className="w-5 h-5 text-gray-700" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Location */}
        <div className="flex items-center text-sm text-gray-600 mb-2">
          <MapPinIcon className="w-4 h-4 mr-1" />
          {tour.city}, {tour.country}
        </div>

        {/* Title */}
        <Link href={`/tours/${tour.id}`} className="block">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {tour.title}
          </h3>
        </Link>

        {/* Host Info */}
        {tour.guide?.user && (
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-gray-200 rounded-full overflow-hidden mr-2">
                {tour.guide.user.image ? (
                  <Image
                    src={tour.guide.user.image}
                    alt={tour.guide.user.name}
                    width={24}
                    height={24}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
              </div>
              <span className="text-sm text-gray-600">{tour.guide.user.name}</span>
            </div>
            
            {tour.hostRating && tour.hostRating > 0 && (
              <div className="flex items-center ml-2">
                <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium ml-1">{tour.hostRating.toFixed(1)}</span>
              </div>
            )}
          </div>
        )}

        {/* Travel Styles */}
        {tour.travelStyles && tour.travelStyles.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {tour.travelStyles.slice(0, 2).map((style) => (
              <span
                key={style}
                className={`text-xs px-2 py-1 rounded-full font-medium ${getBadgeColor(style)}`}
              >
                {style}
              </span>
            ))}
            {tour.travelStyles.length > 2 && (
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                +{tour.travelStyles.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Enhanced Tour Details */}
        <div className="mb-3">
          {/* Accessibility and Features */}
          {tour.accessibility && tour.accessibility.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-2">
              {tour.accessibility.map((feature) => (
                <span key={feature} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded font-medium">
                  {feature === 'wheelchair_accessible' ? '♿ Accessible' : 
                   feature === 'audio_guide' ? '🎧 Audio guide' :
                   feature === 'skip_the_line' ? '⏰ Skip line' : feature}
                </span>
              ))}
            </div>
          )}
          
          {/* Primary Tour Info */}
          <div className="flex items-center text-sm text-gray-600 mb-2 flex-wrap gap-4">
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              {formatDuration(tour.durationMins)}
            </div>
            <div className="flex items-center">
              <UserGroupIcon className="w-4 h-4 mr-1" />
              {tour.confirmedBookings}/{tour.maxGroup}
            </div>
            {tour.languages && tour.languages.length > 0 && (
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {tour.languages[0]}
                {tour.languages.length > 1 && ` +${tour.languages.length - 1}`}
              </span>
            )}
          </div>
          
          {/* Additional Features */}
          <div className="flex flex-wrap gap-1">
            {tour.isDropIn && (
              <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded-full">
                🔄 Drop-in available
              </span>
            )}
            {tour.isEarlyBird && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                🐦 Early bird pricing
              </span>
            )}
            {tour.isPayWhatYouWant && (
              <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full">
                💎 Pay what you want
              </span>
            )}
          </div>
        </div>

        {/* Next Start Time */}
        {nextStartTime && (
          <div className="text-sm text-gray-600 mb-3">
            Next: {formatDate(nextStartTime)}
          </div>
        )}

        {/* Group Progress Bar */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-gray-700">Group Progress</span>
            <span className="text-sm text-gray-600">{progress}% full</span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 mt-1">
            {tour.spotsLeft} spots left
          </div>
        </div>

        {/* Pricing */}
        <div className="flex justify-between items-end">
          <div className="flex flex-col">
            <div className="flex items-center space-x-2">
              {hasDiscount && (
                <span className="text-sm text-gray-500 line-through">
                  ${(tour.basePrice / 100).toFixed(0)}
                </span>
              )}
              <span className="text-xl font-bold text-gray-900">
                ${tour.currentPrice.toFixed(0)}
              </span>
              <span className="text-sm text-gray-600">per person</span>
            </div>
            {tour.maxGroupPrice && tour.maxGroupPrice !== tour.currentPrice && (
              <div className="text-xs text-green-600 mt-1">
                ${tour.maxGroupPrice.toFixed(0)} when group fills
              </div>
            )}
          </div>

          <Link
            href={`/tours/${tour.id}`}
            className="btn btn-primary px-4 py-2 text-sm hover-glow"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
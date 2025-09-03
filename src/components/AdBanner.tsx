'use client';

import Link from 'next/link';
import Image from 'next/image';
import { StarIcon, ClockIcon, UserGroupIcon } from '@heroicons/react/24/outline';

interface AdTour {
  id: string;
  title: string;
  location: string;
  image: string;
  price: number;
  rating: number;
  reviews: number;
  duration: string;
  badge?: string;
  badgeColor?: string;
  href: string;
}

interface AdBannerProps {
  category?: string;
  className?: string;
}

export default function AdBanner({ category, className = '' }: AdBannerProps) {
  // Different ads for different categories
  const getAdsForCategory = (cat?: string): AdTour[] => {
    const allAds: Record<string, AdTour[]> = {
      culture: [
        {
          id: 'rome-colosseum-tour',
          title: 'Skip-the-Line Colosseum & Roman Forum',
          location: 'Rome, Italy',
          image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop',
          price: 45,
          rating: 4.9,
          reviews: 2156,
          duration: '3 hours',
          badge: 'Bestseller',
          badgeColor: 'bg-orange-500',
          href: '/tours/rome-colosseum-tour'
        },
        {
          id: 'paris-louvre-tour',
          title: 'Louvre Museum Skip-the-Line Tour',
          location: 'Paris, France',
          image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=250&fit=crop',
          price: 65,
          rating: 4.8,
          reviews: 1876,
          duration: '2.5 hours',
          badge: 'Popular',
          badgeColor: 'bg-blue-500',
          href: '/tours/paris-louvre-tour'
        }
      ],
      food: [
        {
          id: 'lisbon-food-tour',
          title: 'Authentic Portuguese Food Tour',
          location: 'Lisbon, Portugal',
          image: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop',
          price: 40,
          rating: 4.8,
          reviews: 1234,
          duration: '3 hours',
          badge: 'Hot',
          badgeColor: 'bg-red-500',
          href: '/tours/lisbon-food-tour'
        },
        {
          id: 'tokyo-street-food',
          title: 'Tokyo Street Food Adventure',
          location: 'Tokyo, Japan',
          image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=250&fit=crop',
          price: 50,
          rating: 4.9,
          reviews: 2341,
          duration: '4 hours',
          badge: 'New',
          badgeColor: 'bg-green-500',
          href: '/tours/tokyo-street-food'
        }
      ],
      walking: [
        {
          id: 'barcelona-gothic-walk',
          title: 'Barcelona Gothic Quarter Walking Tour',
          location: 'Barcelona, Spain',
          image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=250&fit=crop',
          price: 30,
          rating: 4.9,
          reviews: 890,
          duration: '2.5 hours',
          badge: 'Trending',
          badgeColor: 'bg-purple-500',
          href: '/tours/barcelona-gothic-walk'
        },
        {
          id: 'amsterdam-canal-walk',
          title: 'Amsterdam Canal District Walk',
          location: 'Amsterdam, Netherlands',
          image: 'https://images.unsplash.com/photo-1534351590666-13e3e963b3b6?w=400&h=250&fit=crop',
          price: 25,
          rating: 4.7,
          reviews: 1432,
          duration: '2 hours',
          badge: 'Local Favorite',
          badgeColor: 'bg-indigo-500',
          href: '/tours/amsterdam-canal-walk'
        }
      ],
      adventure: [
        {
          id: 'dubai-desert-safari',
          title: 'Dubai Desert Safari with BBQ Dinner',
          location: 'Dubai, UAE',
          image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop',
          price: 75,
          rating: 4.6,
          reviews: 987,
          duration: '6 hours',
          badge: 'Adventure',
          badgeColor: 'bg-orange-600',
          href: '/tours/dubai-desert-safari'
        },
        {
          id: 'santorini-sailing',
          title: 'Santorini Sunset Sailing Tour',
          location: 'Santorini, Greece',
          image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=250&fit=crop',
          price: 85,
          rating: 4.8,
          reviews: 654,
          duration: '5 hours',
          badge: 'Romantic',
          badgeColor: 'bg-pink-500',
          href: '/tours/santorini-sailing'
        }
      ],
      default: [
        {
          id: 'featured-tour-1',
          title: 'Paris Eiffel Tower Skip-the-Line Tour',
          location: 'Paris, France',
          image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=250&fit=crop',
          price: 55,
          rating: 4.8,
          reviews: 3245,
          duration: '2 hours',
          badge: 'Featured',
          badgeColor: 'bg-blue-600',
          href: '/tours/paris-eiffel-tour'
        },
        {
          id: 'featured-tour-2',
          title: 'New York City Highlights Tour',
          location: 'New York, USA',
          image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=250&fit=crop',
          price: 65,
          rating: 4.6,
          reviews: 2876,
          duration: '4 hours',
          badge: 'Trending',
          badgeColor: 'bg-green-600',
          href: '/tours/new-york-highlights'
        }
      ]
    };

    return allAds[cat || 'default'] || allAds.default;
  };

  const ads = getAdsForCategory(category);

  return (
    <div className={`bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl p-6 my-8 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gradient">
          🌟 Featured {category ? category.charAt(0).toUpperCase() + category.slice(1) : ''} Experiences
        </h3>
        <span className="text-sm text-gray-500 bg-white/60 px-3 py-1 rounded-full">
          Sponsored
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ads.map((ad) => (
          <Link
            key={ad.id}
            href={ad.href}
            className="card hover-lift hover-glow group bg-white/80 backdrop-blur-sm border border-white/50"
          >
            <div className="relative h-40 overflow-hidden">
              <Image
                src={ad.image}
                alt={ad.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Badge */}
              {ad.badge && (
                <div className={`absolute top-3 left-3 ${ad.badgeColor} text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg`}>
                  {ad.badge}
                </div>
              )}

              {/* Price */}
              <div className="absolute top-3 right-3 bg-white/90 text-gray-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                ${ad.price}
              </div>

              {/* Location overlay */}
              <div className="absolute bottom-3 left-3 text-white">
                <div className="text-sm font-medium opacity-90">{ad.location}</div>
              </div>
            </div>

            <div className="p-4">
              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                {ad.title}
              </h4>
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{ad.rating}</span>
                    <span className="text-gray-500">({ad.reviews.toLocaleString()})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-4 h-4" />
                    <span>{ad.duration}</span>
                  </div>
                </div>
                <button className="text-blue-600 font-semibold hover:text-blue-700 transition-colors">
                  Book Now →
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          href="/tours"
          className="btn btn-primary px-6 py-2 hover-glow inline-flex items-center gap-2"
        >
          View All Tours
          <span>🚀</span>
        </Link>
      </div>
    </div>
  );
}
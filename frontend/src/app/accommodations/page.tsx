"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  StarIcon,
  HeartIcon,
  MapPinIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  UsersIcon,
  ChevronDownIcon,
  WifiIcon,
  TruckIcon,
  HomeIcon,
  CakeIcon,
  SparklesIcon,
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

const accommodationTypes = [
  {
    id: "hotels",
    name: "Hotels",
    description: "Luxury hotels, boutique stays, and budget-friendly options",
    icon: "🏨",
    gradient: "from-blue-600 to-purple-700",
    count: 12,
  },
  {
    id: "apartments",
    name: "Apartments",
    description: "Self-catering apartments and serviced residences",
    icon: "🏢",
    gradient: "from-green-600 to-teal-700",
    count: 6,
  },
  {
    id: "resorts",
    name: "Resorts",
    description: "All-inclusive resorts with world-class facilities",
    icon: "🏖️",
    gradient: "from-cyan-600 to-blue-700",
    count: 6,
  },
  {
    id: "villas",
    name: "Villas",
    description: "Private villas and luxury homes",
    icon: "🏘️",
    gradient: "from-purple-600 to-pink-700",
    count: 6,
  },
  {
    id: "motels",
    name: "Motels",
    description: "Convenient roadside accommodations",
    icon: "🏪",
    gradient: "from-orange-600 to-red-700",
    count: 7,
  },
  {
    id: "chalets",
    name: "Chalets",
    description: "Mountain chalets and alpine retreats",
    icon: "🏔️",
    gradient: "from-gray-600 to-slate-700",
    count: 6,
  },
  {
    id: "treehouses",
    name: "Treehouses",
    description: "Unique treehouse accommodations",
    icon: "🌳",
    gradient: "from-green-700 to-emerald-800",
    count: 6,
  },
  {
    id: "guest-houses",
    name: "Guest Houses",
    description: "Charming guest houses and B&Bs",
    icon: "🏠",
    gradient: "from-yellow-600 to-orange-700",
    count: 6,
  },
  {
    id: "vacation-homes",
    name: "Vacation Homes",
    description: "Entire homes for your vacation stay",
    icon: "🏡",
    gradient: "from-cyan-600 to-blue-700",
    count: 6,
  },
  {
    id: "caravans",
    name: "Caravans",
    description: "Mobile homes and caravan experiences",
    icon: "🚐",
    gradient: "from-orange-600 to-red-700",
    count: 6,
  },
];

export default function AccommodationsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    accommodationType: "",
  });

  const type = searchParams?.get("type");

  useEffect(() => {
    if (type && accommodationTypes.some((acc) => acc.id === type)) {
      // Redirect to specific accommodation type page
      router.push(`/accommodations/${type}`);
    }
  }, [type, router]);

  const toggleWishlist = (accommodationId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(accommodationId)) {
      newWishlisted.delete(accommodationId);
    } else {
      newWishlisted.add(accommodationId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    if (searchFilters.accommodationType) {
      router.push(`/accommodations/${searchFilters.accommodationType}`);
    }
  };

  // Featured accommodations from different types
  const featuredAccommodations = [
    {
      id: "featured-1",
      name: "Grand Cyprus Hotel",
      type: "Hotel",
      location: "Nicosia, Cyprus",
      price: "$120",
      rating: 4.8,
      reviews: 1247,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      amenities: ["WiFi", "Pool", "Restaurant"],
    },
    {
      id: "featured-2",
      name: "Mediterranean Villa Retreat",
      type: "Vacation Home",
      location: "Paphos Coast, Cyprus",
      price: "$200",
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
      amenities: ["Private Pool", "Sea Views", "Kitchen"],
    },
    {
      id: "featured-3",
      name: "Luxury Coastal Caravan",
      type: "Caravan",
      location: "Ayia Napa Beach, Cyprus",
      price: "$80",
      rating: 4.7,
      reviews: 92,
      image:
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=300&fit=crop",
      amenities: ["Beach Access", "Kitchen", "WiFi"],
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-4 h-4" />;
      case "parking":
        return <TruckIcon className="w-4 h-4" />;
      case "pool":
      case "private pool":
        return <HomeIcon className="w-4 h-4" />;
      case "restaurant":
      case "kitchen":
        return <CakeIcon className="w-4 h-4" />;
      default:
        return <SparklesIcon className="w-4 h-4" />;
    }
  };

  // If type parameter is provided and valid, show loading while redirecting
  if (type && accommodationTypes.some((acc) => acc.id === type)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            Redirecting to{" "}
            {accommodationTypes.find((acc) => acc.id === type)?.name}...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-cyan-600 to-blue-700">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Accommodation in Cyprus
          </h1>
          <p className="text-xl mb-8 opacity-90">
            From luxury hotels to cozy caravans - discover your ideal stay
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              {/* Accommodation Type */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <div className="relative">
                  <BuildingStorefrontIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={searchFilters.accommodationType}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        accommodationType: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 appearance-none bg-white"
                  >
                    <option value="">All Types</option>
                    {accommodationTypes.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.icon} {type.name}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Destination */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Where are you going?"
                    value={searchFilters.destination}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Check-in Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchFilters.checkIn}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        checkIn: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchFilters.checkOut}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        checkOut: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={searchFilters.guests}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        guests: parseInt(e.target.value),
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accommodation Types Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Accommodation Type
          </h2>
          <p className="text-gray-600">
            Explore different types of accommodations available in Cyprus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {accommodationTypes.map((type) => (
            <Link
              key={type.id}
              href={`/accommodations/${type.id}`}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div
                className={`relative h-32 bg-gradient-to-br ${type.gradient} flex items-center justify-center`}
              >
                <div className="text-4xl mb-2">{type.icon}</div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1">
                  <span className="text-xs font-semibold text-white">
                    {type.count}+
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                  {type.name}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{type.description}</p>
                <div className="flex items-center text-cyan-600 font-medium">
                  <span>Explore {type.name}</span>
                  <svg
                    className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Featured Accommodations */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Accommodations
          </h2>
          <p className="text-gray-600">
            Handpicked selections from our best-rated properties
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredAccommodations.map((accommodation) => (
            <div
              key={accommodation.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Accommodation Image */}
              <div className="relative h-48">
                <Image
                  src={accommodation.image}
                  alt={accommodation.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(accommodation.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(accommodation.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute top-4 left-4 bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {accommodation.type}
                </div>
              </div>

              {/* Accommodation Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {accommodation.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-600">
                      {accommodation.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {accommodation.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {accommodation.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({accommodation.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  Featured {accommodation.type.toLowerCase()} with premium
                  amenities and excellent reviews.
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {accommodation.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                    View Details
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Book Your Cyprus Stay?
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            With over 60+ accommodations across all types and regions of Cyprus,
            find the perfect place for your next adventure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
              Browse All Accommodations
            </button>
            <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 px-8 rounded-lg transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

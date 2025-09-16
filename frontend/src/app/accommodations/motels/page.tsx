"use client";

import { useState } from "react";
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
  PhotoIcon,
  ArrowRightIcon,
  ViewfinderCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

interface Motel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  image: string;
  amenities: string[];
  description: string;
  type: string;
}

export default function MotelsPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    priceRange: "any",
  });

  const toggleWishlist = (motelId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(motelId)) {
      newWishlisted.delete(motelId);
    } else {
      newWishlisted.add(motelId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching motels with filters:", searchFilters);
  };

  const demoMotels = [
    {
      id: "motel-1",
      name: "Cyprus Highway Motel",
      location: "Nicosia-Limassol Highway, Cyprus",
      price: "$45",
      rating: 4.2,
      reviews: 387,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      amenities: ["Free Parking", "WiFi", "24/7 Reception", "Pet Friendly"],
      description:
        "Convenient highway motel perfect for road trips with clean rooms and friendly service.",
      type: "Highway Motel",
    },
    {
      id: "motel-2",
      name: "Larnaca Airport Motel",
      location: "Larnaca Airport Area, Cyprus",
      price: "$55",
      rating: 4.1,
      reviews: 298,
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      amenities: ["Airport Shuttle", "Free Parking", "WiFi", "Breakfast"],
      description:
        "Budget-friendly motel near Larnaca Airport, ideal for early flights and transit stays.",
      type: "Airport Motel",
    },
    {
      id: "motel-3",
      name: "Paphos Seaside Motel",
      location: "Paphos Harbor, Cyprus",
      price: "$65",
      rating: 4.3,
      reviews: 176,
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      amenities: ["Sea View", "Free Parking", "WiFi", "Restaurant"],
      description:
        "Charming seaside motel with harbor views and easy access to Paphos attractions.",
      type: "Seaside Motel",
    },
    {
      id: "motel-4",
      name: "Troodos Gateway Motel",
      location: "Troodos Mountains Entrance, Cyprus",
      price: "$50",
      rating: 4.0,
      reviews: 145,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      amenities: ["Mountain Views", "Free Parking", "WiFi", "Hiking Maps"],
      description:
        "Gateway motel to Troodos Mountains, perfect base for hiking and mountain exploration.",
      type: "Mountain Gateway",
    },
    {
      id: "motel-5",
      name: "Famagusta Budget Motel",
      location: "Famagusta, Cyprus",
      price: "$40",
      rating: 3.9,
      reviews: 234,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
      amenities: ["Free Parking", "WiFi", "24/7 Check-in", "Basic Amenities"],
      description:
        "No-frills budget motel offering clean, simple accommodations at affordable prices.",
      type: "Budget Motel",
    },
    {
      id: "motel-6",
      name: "Kyrenia Coastal Motel",
      location: "Kyrenia Coast, Cyprus",
      price: "$60",
      rating: 4.4,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      amenities: ["Beach Access", "Free Parking", "WiFi", "Bar"],
      description:
        "Coastal motel with beach access and relaxed atmosphere for Northern Cyprus exploration.",
      type: "Coastal Motel",
    },
    {
      id: "motel-7",
      name: "Larnaca Business Motel",
      location: "Larnaca Business District, Cyprus",
      price: "$75",
      rating: 4.6,
      reviews: 198,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      amenities: ["Business Center", "Conference Room", "Free Parking", "WiFi"],
      description:
        "Modern business motel with meeting facilities and convenient location for corporate travelers.",
      type: "Business Motel",
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-4 h-4" />;
      case "free parking":
      case "parking":
        return <TruckIcon className="w-4 h-4" />;
      case "restaurant":
      case "bar":
      case "breakfast":
        return <CakeIcon className="w-4 h-4" />;
      default:
        return <SparklesIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=1200&h=800&fit=crop"
            alt="Motels in Cyprus"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Budget-Friendly Motels in Cyprus
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Find convenient, affordable motels perfect for travelers on a budget
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
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

      {/* Motels Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Motels in Cyprus
          </h2>
          <p className="text-gray-600">
            Find convenient, affordable motels perfect for your Cyprus travels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoMotels.map((motel) => (
            <div
              key={motel.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Motel Image */}
              <div className="relative h-48">
                <Image
                  src={motel.image}
                  alt={motel.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(motel.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(motel.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute top-4 left-4 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {motel.type}
                </div>
              </div>

              {/* Motel Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {motel.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-orange-600">
                      {motel.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {motel.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{motel.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({motel.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {motel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {motel.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {motel.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{motel.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/motels/${motel.id}`}
                    className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
                  >
                    View Details
                  </Link>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-white border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Load More Motels
          </button>
        </div>

        {/* Demo Components Section */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-2xl p-8 mb-8">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                🚀 Interactive Demo Components
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
                Experience our cutting-edge components and features. Test
                drag-and-drop uploads, interactive galleries, and dynamic
                navigation elements.
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">
                  Real-time Testing
                </span>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                  Interactive Features
                </span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                  Modern UI/UX
                </span>
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
                  Responsive Design
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Photo Uploader Demo */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <PhotoIcon className="w-12 h-12" />
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    Upload Demo
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Photo Uploader</h3>
                <p className="text-blue-100">
                  Advanced file upload with drag & drop
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Multiple file formats (JPG, PNG, GIF, MP4, WebM)
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Real-time preview and validation
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Drag & drop interface
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Progress indicators and error handling
                  </div>
                </div>
                <Link
                  href="/photo-upload-demo"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Test Photo Uploader</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Media Gallery Demo */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <ViewfinderCircleIcon className="w-12 h-12" />
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    Gallery Demo
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Media Gallery</h3>
                <p className="text-green-100">
                  Interactive media display system
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Image and video gallery with lightbox
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Wishlist functionality for favorites
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Responsive grid layout
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Smooth animations and transitions
                  </div>
                </div>
                <Link
                  href="/media-gallery-demo"
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Explore Media Gallery</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            {/* Pill Bar Demo */}
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <Bars3Icon className="w-12 h-12" />
                  <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                    Navigation Demo
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Pill Bar Component</h3>
                <p className="text-purple-100">
                  Dynamic filtering and navigation
                </p>
              </div>
              <div className="p-6">
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Interactive pill-based navigation
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Smooth hover animations
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Customizable styling and themes
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    Accessibility features included
                  </div>
                </div>
                <Link
                  href="/demo"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group"
                >
                  <span>Try Pill Bar</span>
                  <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          {/* Additional Demo Info */}
          <div className="mt-12 bg-gray-50 rounded-2xl p-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                🎯 Demo Features Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <PhotoIcon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    File Upload
                  </h4>
                  <p className="text-sm text-gray-600">
                    Advanced upload system with validation
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <ViewfinderCircleIcon className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Media Display
                  </h4>
                  <p className="text-sm text-gray-600">
                    Interactive galleries and lightboxes
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <Bars3Icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Navigation
                  </h4>
                  <p className="text-sm text-gray-600">
                    Dynamic filtering components
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <SparklesIcon className="w-8 h-8 text-cyan-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">
                    Animations
                  </h4>
                  <p className="text-sm text-gray-600">
                    Smooth transitions and effects
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

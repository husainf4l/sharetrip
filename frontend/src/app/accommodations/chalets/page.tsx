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
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

export default function ChaletsPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 4,
    priceRange: "any",
  });

  const toggleWishlist = (chaletId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(chaletId)) {
      newWishlisted.delete(chaletId);
    } else {
      newWishlisted.add(chaletId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching chalets with filters:", searchFilters);
  };

  const demoChalets = [
    {
      id: "chalet-1",
      name: "Troodos Pine Forest Chalet",
      location: "Troodos Mountains, Cyprus",
      price: "$120",
      rating: 4.8,
      reviews: 45,
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
      amenities: ["Fireplace", "Forest View", "Hot Tub", "WiFi"],
      description:
        "Cozy wooden chalet surrounded by pine forests in the Troodos Mountains.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    {
      id: "chalet-2",
      name: "Mountain View Chalet",
      location: "Platres, Cyprus",
      price: "$140",
      rating: 4.7,
      reviews: 38,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      amenities: ["Mountain View", "Fireplace", "Terrace", "WiFi"],
      description:
        "Rustic chalet with breathtaking mountain views and traditional Cypriot architecture.",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    {
      id: "chalet-3",
      name: "Cedar Wood Chalet",
      location: "Kakopetria, Cyprus",
      price: "$110",
      rating: 4.6,
      reviews: 29,
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop",
      amenities: ["Cedar Interior", "Garden", "Fireplace", "WiFi"],
      description:
        "Beautiful cedar wood chalet in a peaceful village setting with mountain access.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    {
      id: "chalet-4",
      name: "Alpine Style Chalet",
      location: "Troodos National Park, Cyprus",
      price: "$160",
      rating: 4.9,
      reviews: 52,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      amenities: ["Alpine Design", "Hot Tub", "Fireplace", "Hiking Trails"],
      description:
        "Modern alpine-style chalet with hot tub and direct access to hiking trails.",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    {
      id: "chalet-5",
      name: "Traditional Stone Chalet",
      location: "Pitsilia Region, Cyprus",
      price: "$130",
      rating: 4.5,
      reviews: 34,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      amenities: ["Stone Architecture", "Garden", "WiFi", "Barbecue"],
      description:
        "Traditional stone chalet blending local architecture with modern comforts.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    {
      id: "chalet-6",
      name: "Forest Edge Chalet",
      location: "Olympus Mountain, Cyprus",
      price: "$150",
      rating: 4.7,
      reviews: 41,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      amenities: ["Forest Views", "Terrace", "Fireplace", "WiFi"],
      description:
        "Charming chalet at the edge of the forest with panoramic mountain views.",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-4 h-4" />;
      case "parking":
        return <TruckIcon className="w-4 h-4" />;
      case "fireplace":
        return <HomeIcon className="w-4 h-4" />;
      case "barbecue":
        return <CakeIcon className="w-4 h-4" />;
      default:
        return <SparklesIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=1920&h=1080&fit=crop"
            alt="Beautiful mountain chalet in Troodos Mountains"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Mountain Chalets in Cyprus
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-95 drop-shadow-md max-w-3xl mx-auto">
            Cozy wooden chalets nestled in the beautiful Troodos Mountains
          </p>

          {/* Search Bar */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-5xl mx-auto border border-white/20">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Destination */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Destination
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 placeholder-gray-500 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Check-in Date */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Check-in
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchFilters.checkIn}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        checkIn: e.target.value,
                      }))
                    }
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Check-out
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={searchFilters.checkOut}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        checkOut: e.target.value,
                      }))
                    }
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 font-medium shadow-sm"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Guests
                </label>
                <div className="relative">
                  <UsersIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={searchFilters.guests}
                    onChange={(e) =>
                      setSearchFilters((prev) => ({
                        ...prev,
                        guests: parseInt(e.target.value),
                      }))
                    }
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-gray-900 font-medium shadow-sm appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <button
                  onClick={handleSearch}
                  className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search Chalets
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Chalets Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Mountain Chalets in Cyprus
          </h2>
          <p className="text-gray-600">
            Experience cozy mountain living in traditional Cypriot chalets
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoChalets.map((chalet) => (
            <div
              key={chalet.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Chalet Image */}
              <div className="relative h-48">
                <Image
                  src={chalet.image}
                  alt={chalet.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(chalet.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(chalet.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute top-4 left-4 bg-emerald-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Mountain Chalet
                </div>
              </div>

              {/* Chalet Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {chalet.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">
                      {chalet.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {chalet.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{chalet.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({chalet.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <BuildingStorefrontIcon className="w-4 h-4 mr-1" />
                  <span>
                    {chalet.bedrooms} bed • {chalet.bathrooms} bath • Up to{" "}
                    {chalet.maxGuests} guests
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {chalet.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {chalet.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {chalet.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{chalet.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/chalets/${chalet.id}`}
                    className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
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
            Load More Chalets
          </button>
        </div>
      </main>
    </div>
  );
}

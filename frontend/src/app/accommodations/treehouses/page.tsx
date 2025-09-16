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

export default function TreehousesPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    priceRange: "any",
  });

  const toggleWishlist = (treehouseId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(treehouseId)) {
      newWishlisted.delete(treehouseId);
    } else {
      newWishlisted.add(treehouseId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching treehouses with filters:", searchFilters);
  };

  const demoTreehouses = [
    {
      id: "treehouse-1",
      name: "Cypress Forest Treehouse",
      location: "Paphos Forest, Cyprus",
      price: "$95",
      rating: 4.9,
      reviews: 23,
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
      amenities: ["Forest Views", "Deck", "WiFi", "Breakfast"],
      description:
        "Magical treehouse nestled in ancient cypress forest with stunning canopy views.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    {
      id: "treehouse-2",
      name: "Mediterranean Oak Treehouse",
      location: "Limassol Hills, Cyprus",
      price: "$110",
      rating: 4.8,
      reviews: 18,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      amenities: ["Oak Tree", "Hammock", "WiFi", "Picnic Area"],
      description:
        "Romantic treehouse built around a majestic oak tree with Mediterranean views.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    {
      id: "treehouse-3",
      name: "Pine Grove Retreat",
      location: "Troodos Mountains, Cyprus",
      price: "$85",
      rating: 4.7,
      reviews: 31,
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
      amenities: ["Pine Forest", "Fire Pit", "WiFi", "Stargazing"],
      description:
        "Cozy pine treehouse perfect for nature lovers and stargazing enthusiasts.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    {
      id: "treehouse-4",
      name: "Family Treehouse Villa",
      location: "Nicosia Countryside, Cyprus",
      price: "$140",
      rating: 4.6,
      reviews: 15,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      amenities: ["Multiple Levels", "Kitchen", "WiFi", "Play Area"],
      description:
        "Spacious family treehouse with multiple levels and modern amenities.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    {
      id: "treehouse-5",
      name: "Seaside Palm Treehouse",
      location: "Ayia Napa Coast, Cyprus",
      price: "$120",
      rating: 4.8,
      reviews: 27,
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop",
      amenities: ["Sea Views", "Deck", "WiFi", "Sunset Views"],
      description:
        "Unique palm treehouse with breathtaking sea views and sunset watching.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    {
      id: "treehouse-6",
      name: "Ancient Olive Treehouse",
      location: "Larnaca Valley, Cyprus",
      price: "$100",
      rating: 4.5,
      reviews: 19,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      amenities: ["Olive Grove", "Terrace", "WiFi", "Traditional"],
      description:
        "Treehouse built in an ancient olive grove with traditional Cypriot charm.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-4 h-4" />;
      case "parking":
        return <TruckIcon className="w-4 h-4" />;
      case "kitchen":
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
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop"
            alt="Magical treehouse in Cyprus forest"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Magical Treehouses in Cyprus
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-95 drop-shadow-md max-w-3xl mx-auto">
            Experience unique stays in treehouses surrounded by Cyprus nature
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
                    {[1, 2, 3, 4, 5, 6].map((num) => (
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
                  Search Treehouses
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Treehouses Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Magical Treehouses in Cyprus
          </h2>
          <p className="text-gray-600">
            Live among the treetops in unique treehouse accommodations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoTreehouses.map((treehouse) => (
            <div
              key={treehouse.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Treehouse Image */}
              <div className="relative h-48">
                <Image
                  src={treehouse.image}
                  alt={treehouse.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(treehouse.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(treehouse.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute top-4 left-4 bg-lime-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Treehouse
                </div>
              </div>

              {/* Treehouse Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {treehouse.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-lime-600">
                      {treehouse.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {treehouse.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {treehouse.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({treehouse.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <BuildingStorefrontIcon className="w-4 h-4 mr-1" />
                  <span>
                    {treehouse.bedrooms} bed • {treehouse.bathrooms} bath • Up
                    to {treehouse.maxGuests} guests
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {treehouse.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {treehouse.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {treehouse.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{treehouse.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/treehouses/${treehouse.id}`}
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
            Load More Treehouses
          </button>
        </div>
      </main>
    </div>
  );
}

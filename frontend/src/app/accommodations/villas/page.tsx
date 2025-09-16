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

export default function VillasPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 4,
    priceRange: "any",
  });

  const toggleWishlist = (villaId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(villaId)) {
      newWishlisted.delete(villaId);
    } else {
      newWishlisted.add(villaId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching villas with filters:", searchFilters);
  };

  const demoVillas = [
    {
      id: "villa-1",
      name: "Mediterranean Dream Villa",
      location: "Paphos Hills, Cyprus",
      price: "$180",
      rating: 4.9,
      reviews: 87,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
      amenities: ["Private Pool", "Sea View", "Garden", "WiFi"],
      description:
        "Stunning 4-bedroom villa with infinity pool and panoramic Mediterranean views.",
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
    },
    {
      id: "villa-2",
      name: "Troodos Mountain Retreat",
      location: "Troodos Mountains, Cyprus",
      price: "$150",
      rating: 4.8,
      reviews: 64,
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
      amenities: ["Fireplace", "Mountain View", "Hot Tub", "WiFi"],
      description:
        "Cozy mountain villa perfect for families, with fireplace and hot tub.",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    {
      id: "villa-3",
      name: "Limassol Beach Villa",
      location: "Limassol Coast, Cyprus",
      price: "$220",
      rating: 5.0,
      reviews: 42,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      amenities: ["Beach Access", "Private Pool", "Jacuzzi", "Chef"],
      description:
        "Luxury beachfront villa with private chef services and direct beach access.",
      bedrooms: 5,
      bathrooms: 4,
      maxGuests: 10,
    },
    {
      id: "villa-4",
      name: "Ayia Napa Party Villa",
      location: "Ayia Napa, Cyprus",
      price: "$190",
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      amenities: ["Nightlife Access", "Pool", "Bar Area", "WiFi"],
      description:
        "Modern villa in the heart of Ayia Napa's entertainment district.",
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
    },
    {
      id: "villa-5",
      name: "Traditional Cypriot Villa",
      location: "Nicosia Countryside, Cyprus",
      price: "$130",
      rating: 4.6,
      reviews: 38,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      amenities: ["Traditional Architecture", "Garden", "WiFi", "Parking"],
      description:
        "Authentic Cypriot villa with traditional architecture and modern comforts.",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    {
      id: "villa-6",
      name: "Kyrenia Castle View Villa",
      location: "Kyrenia Mountains, Cyprus",
      price: "$160",
      rating: 4.8,
      reviews: 73,
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop",
      amenities: ["Castle View", "Terrace", "WiFi", "Barbecue"],
      description:
        "Villa with stunning views of Kyrenia Castle and private terrace.",
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
      case "pool":
      case "private pool":
        return <HomeIcon className="w-4 h-4" />;
      case "chef":
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
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=1080&fit=crop"
            alt="Luxury villa with pool and Mediterranean views"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">
            Luxury Villas in Cyprus
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-95 drop-shadow-md max-w-3xl mx-auto">
            Discover private villas with stunning views and premium amenities
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
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 placeholder-gray-500 font-medium shadow-sm"
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
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 font-medium shadow-sm"
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
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 font-medium shadow-sm"
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
                    className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-gray-900 font-medium shadow-sm appearance-none bg-white"
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
                  className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search Villas
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Villas Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Luxury Villas in Cyprus
          </h2>
          <p className="text-gray-600">
            Experience privacy and luxury in stunning Cypriot villas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoVillas.map((villa) => (
            <div
              key={villa.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Villa Image */}
              <div className="relative h-48">
                <Image
                  src={villa.image}
                  alt={villa.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(villa.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(villa.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute top-4 left-4 bg-cyan-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {villa.bedrooms} BR Villa
                </div>
              </div>

              {/* Villa Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {villa.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-cyan-600">
                      {villa.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {villa.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{villa.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({villa.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <BuildingStorefrontIcon className="w-4 h-4 mr-1" />
                  <span>
                    {villa.bedrooms} bed • {villa.bathrooms} bath • Up to{" "}
                    {villa.maxGuests} guests
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {villa.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {villa.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {villa.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{villa.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/villas/${villa.id}`}
                    className="flex-1 bg-cyan-600 hover:bg-cyan-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
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
            Load More Villas
          </button>
        </div>
      </main>
    </div>
  );
}

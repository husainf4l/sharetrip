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

export default function VacationHomesPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 6,
    priceRange: "any",
  });

  const toggleWishlist = (vacationhomeId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(vacationhomeId)) {
      newWishlisted.delete(vacationhomeId);
    } else {
      newWishlisted.add(vacationhomeId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching vacation homes with filters:", searchFilters);
  };

  const demoVacationHomes = [
    {
      id: "vh-1",
      name: "Mediterranean Villa Retreat",
      location: "Paphos Coast, Cyprus",
      price: "$200",
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&h=300&fit=crop",
      amenities: ["Private Pool", "Sea Views", "Full Kitchen", "WiFi"],
      description:
        "Spacious 4-bedroom villa with private pool and stunning Mediterranean views.",
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
    },
    {
      id: "vh-2",
      name: "Mountain Family Home",
      location: "Troodos Mountains, Cyprus",
      price: "$150",
      rating: 4.8,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      amenities: ["Fireplace", "Mountain Views", "Large Garden", "WiFi"],
      description:
        "Perfect family vacation home in the mountains with fireplace and garden.",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    {
      id: "vh-3",
      name: "Beachfront Vacation Home",
      location: "Ayia Napa, Cyprus",
      price: "$250",
      rating: 5.0,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      amenities: ["Beach Access", "Jacuzzi", "Chef Kitchen", "WiFi"],
      description:
        "Luxury beachfront home with direct beach access and premium amenities.",
      bedrooms: 5,
      bathrooms: 4,
      maxGuests: 10,
    },
    {
      id: "vh-4",
      name: "Traditional Stone House",
      location: "Omodos Village, Cyprus",
      price: "$120",
      rating: 4.7,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      amenities: [
        "Traditional Architecture",
        "Vineyard Views",
        "Fireplace",
        "WiFi",
      ],
      description:
        "Authentic stone vacation home with traditional charm and modern comforts.",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    {
      id: "vh-5",
      name: "Modern City Apartment",
      location: "Nicosia Center, Cyprus",
      price: "$100",
      rating: 4.6,
      reviews: 134,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      amenities: ["City Center", "Modern Kitchen", "Balcony", "WiFi"],
      description:
        "Contemporary vacation apartment in the heart of Nicosia with city views.",
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
    },
    {
      id: "vh-6",
      name: "Countryside Estate",
      location: "Pitsilia Region, Cyprus",
      price: "$180",
      rating: 4.8,
      reviews: 78,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      amenities: ["Large Garden", "Pool", "Multiple Bedrooms", "WiFi"],
      description:
        "Spacious countryside estate perfect for large groups and family gatherings.",
      bedrooms: 6,
      bathrooms: 4,
      maxGuests: 12,
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
      case "kitchen":
      case "full kitchen":
        return <CakeIcon className="w-4 h-4" />;
      default:
        return <SparklesIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1920&h=1080&fit=crop"
          alt="Beautiful vacation home with Mediterranean architecture"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Vacation Homes in Cyprus
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Find the perfect home away from home for your Cyprus vacation
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-900"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-900"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent text-gray-900 appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
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
                  className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vacation Homes Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Vacation Homes in Cyprus
          </h2>
          <p className="text-gray-600">
            Find the perfect home away from home for your Cyprus vacation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoVacationHomes.map((vacationhome) => (
            <div
              key={vacationhome.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Vacation Home Image */}
              <div className="relative h-48">
                <Image
                  src={vacationhome.image}
                  alt={vacationhome.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(vacationhome.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(vacationhome.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute top-4 left-4 bg-gray-900 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Vacation Home
                </div>
              </div>

              {/* Vacation Home Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {vacationhome.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {vacationhome.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {vacationhome.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {vacationhome.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({vacationhome.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <BuildingStorefrontIcon className="w-4 h-4 mr-1" />
                  <span>
                    {vacationhome.bedrooms} bed • {vacationhome.bathrooms} bath
                    • Up to {vacationhome.maxGuests} guests
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {vacationhome.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {vacationhome.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {vacationhome.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{vacationhome.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/vacation-homes/${vacationhome.id}`}
                    className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
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
            Load More Vacation Homes
          </button>
        </div>
      </main>
    </div>
  );
}

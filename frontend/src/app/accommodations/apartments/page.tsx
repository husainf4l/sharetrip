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
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

export default function ApartmentsPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    priceRange: "any",
  });

  const toggleWishlist = (apartmentId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(apartmentId)) {
      newWishlisted.delete(apartmentId);
    } else {
      newWishlisted.add(apartmentId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching apartments with filters:", searchFilters);
  };

  const demoApartments = [
    {
      id: "apt-1",
      name: "Nicosia City Center Studio",
      location: "Nicosia, Cyprus",
      price: "$85",
      rating: 4.7,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
      amenities: ["WiFi", "Kitchen", "City View", "Parking"],
      description:
        "Modern studio apartment in the heart of Nicosia with full kitchen and city views.",
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      id: "apt-2",
      name: "Limassol Beachfront Apartment",
      location: "Limassol, Cyprus",
      price: "$120",
      rating: 4.8,
      reviews: 203,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      amenities: ["Beach Access", "Balcony", "Pool", "WiFi"],
      description:
        "Spacious 2-bedroom apartment with stunning beach views and private balcony.",
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      id: "apt-3",
      name: "Paphos Traditional Apartment",
      location: "Paphos, Cyprus",
      price: "$95",
      rating: 4.6,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      amenities: ["Historic Area", "Garden", "WiFi", "Kitchen"],
      description:
        "Charming apartment in historic Paphos with traditional architecture and modern amenities.",
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: "apt-4",
      name: "Ayia Napa Party District Loft",
      location: "Ayia Napa, Cyprus",
      price: "$110",
      rating: 4.5,
      reviews: 312,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      amenities: ["Nightlife", "Modern", "WiFi", "Balcony"],
      description:
        "Stylish loft apartment in the heart of Ayia Napa's entertainment district.",
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      id: "apt-5",
      name: "Troodos Mountain Retreat",
      location: "Troodos Mountains, Cyprus",
      price: "$75",
      rating: 4.9,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=400&h=300&fit=crop",
      amenities: ["Mountain View", "Fireplace", "WiFi", "Kitchen"],
      description:
        "Cozy mountain apartment perfect for nature lovers and hiking enthusiasts.",
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: "apt-6",
      name: "Larnaca Family Apartment",
      location: "Larnaca, Cyprus",
      price: "$100",
      rating: 4.4,
      reviews: 145,
      image:
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=400&h=300&fit=crop",
      amenities: ["Family Friendly", "Pool", "WiFi", "Parking"],
      description:
        "Spacious family apartment with resort amenities and convenient location.",
      bedrooms: 3,
      bathrooms: 2,
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-4 h-4" />;
      case "parking":
        return <TruckIcon className="w-4 h-4" />;
      case "pool":
      case "spa":
        return <HomeIcon className="w-4 h-4" />;
      case "kitchen":
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
          src="/images/modern-studio-apartment-design-with-bedroom-living-space.jpg"
          alt="Modern Studio Apartment"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Apartment in Cyprus
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover self-catering apartments, studios, and modern living spaces
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 appearance-none bg-white"
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
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Apartments Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Apartments in Cyprus
          </h2>
          <p className="text-gray-600">
            Discover self-catering apartments perfect for your Cyprus vacation
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoApartments.map((apartment) => (
            <div
              key={apartment.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Apartment Image */}
              <div className="relative h-48">
                <Image
                  src={apartment.image}
                  alt={apartment.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(apartment.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(apartment.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Apartment Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {apartment.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      {apartment.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {apartment.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {apartment.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({apartment.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                  <span>
                    {apartment.bedrooms} bed • {apartment.bathrooms} bath
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {apartment.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {apartment.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {apartment.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{apartment.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/apartments/${apartment.id}`}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
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
            Load More Apartments
          </button>
        </div>
      </main>
    </div>
  );
}

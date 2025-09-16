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

export default function CaravansPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 4,
    priceRange: "any",
  });

  const toggleWishlist = (caravanId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(caravanId)) {
      newWishlisted.delete(caravanId);
    } else {
      newWishlisted.add(caravanId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching caravans with filters:", searchFilters);
  };

  const demoCaravans = [
    {
      id: "c-1",
      name: "Luxury Coastal Caravan",
      location: "Ayia Napa Beach, Cyprus",
      price: "$80",
      rating: 4.7,
      reviews: 92,
      image:
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=400&h=300&fit=crop",
      amenities: ["Beach Access", "Kitchen", "WiFi", "Air Conditioning"],
      description:
        "Modern caravan with direct beach access and full amenities.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    {
      id: "c-2",
      name: "Mountain View Caravan",
      location: "Troodos Mountains, Cyprus",
      price: "$65",
      rating: 4.6,
      reviews: 78,
      image:
        "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400&h=300&fit=crop",
      amenities: ["Mountain Views", "Fire Pit", "WiFi", "Kitchen"],
      description:
        "Peaceful caravan experience with stunning mountain scenery.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    {
      id: "c-3",
      name: "Family Caravan Retreat",
      location: "Paphos Camping Site, Cyprus",
      price: "$95",
      rating: 4.8,
      reviews: 134,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      amenities: ["Family Friendly", "Large Space", "WiFi", "Kitchen"],
      description:
        "Spacious caravan perfect for families with all modern conveniences.",
      bedrooms: 3,
      bathrooms: 1,
      maxGuests: 6,
    },
    {
      id: "c-4",
      name: "Romantic Couples Caravan",
      location: "Limassol Coast, Cyprus",
      price: "$70",
      rating: 4.9,
      reviews: 156,
      image:
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
      amenities: ["Romantic Setting", "Sea Views", "WiFi", "Kitchen"],
      description: "Intimate caravan for couples with beautiful coastal views.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    {
      id: "c-5",
      name: "Adventure Caravan",
      location: "Akamas Peninsula, Cyprus",
      price: "$75",
      rating: 4.5,
      reviews: 67,
      image:
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=400&h=300&fit=crop",
      amenities: ["Nature Access", "Hiking Trails", "WiFi", "Kitchen"],
      description: "Adventure-ready caravan in a natural paradise setting.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    {
      id: "c-6",
      name: "Premium Caravan Suite",
      location: "Larnaca Bay, Cyprus",
      price: "$110",
      rating: 5.0,
      reviews: 89,
      image:
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=400&h=300&fit=crop",
      amenities: ["Premium Amenities", "Bay Views", "WiFi", "Full Kitchen"],
      description:
        "Luxury caravan with premium features and stunning bay views.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-4 h-4" />;
      case "parking":
        return <TruckIcon className="w-4 h-4" />;
      case "kitchen":
      case "full kitchen":
        return <CakeIcon className="w-4 h-4" />;
      case "air conditioning":
        return <HomeIcon className="w-4 h-4" />;
      default:
        return <SparklesIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=1920&h=1080&fit=crop"
          alt="Beautiful caravan in scenic Cyprus landscape"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Caravans in Cyprus
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Experience Cyprus from the comfort of your own caravan
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

      {/* Caravans Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Caravans in Cyprus
          </h2>
          <p className="text-gray-600">
            Experience Cyprus from the comfort of your own caravan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoCaravans.map((caravan) => (
            <div
              key={caravan.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Caravan Image */}
              <div className="relative h-48">
                <Image
                  src={caravan.image}
                  alt={caravan.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(caravan.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(caravan.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute top-4 left-4 bg-gray-900 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  Caravan
                </div>
              </div>

              {/* Caravan Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {caravan.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {caravan.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {caravan.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">
                      {caravan.rating}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({caravan.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <BuildingStorefrontIcon className="w-4 h-4 mr-1" />
                  <span>
                    {caravan.bedrooms} bed • {caravan.bathrooms} bath • Up to{" "}
                    {caravan.maxGuests} guests
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {caravan.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {caravan.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {caravan.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{caravan.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/caravans/${caravan.id}`}
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
            Load More Caravans
          </button>
        </div>
      </main>
    </div>
  );
}

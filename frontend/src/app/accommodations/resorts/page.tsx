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

export default function ResortsPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    priceRange: "any",
  });

  const toggleWishlist = (resortId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(resortId)) {
      newWishlisted.delete(resortId);
    } else {
      newWishlisted.add(resortId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching resorts with filters:", searchFilters);
  };

  const demoResorts = [
    {
      id: "resort-1",
      name: "Amathus Beach Resort",
      location: "Limassol, Cyprus",
      price: "$250",
      rating: 4.9,
      reviews: 2156,
      image:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
      amenities: ["Private Beach", "Spa", "Fine Dining", "Water Sports"],
      description:
        "Luxury beach resort with private beach access, world-class spa, and exceptional service.",
      type: "Beach Resort",
    },
    {
      id: "resort-2",
      name: "Anassa Hotel",
      location: "Paphos, Cyprus",
      price: "$350",
      rating: 5.0,
      reviews: 1234,
      image:
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=400&h=300&fit=crop",
      amenities: ["UNESCO Site", "Michelin Star", "Tennis Courts", "Helipad"],
      description:
        "Award-winning luxury resort nestled in a UNESCO World Heritage Site with unparalleled elegance.",
      type: "Luxury Resort",
    },
    {
      id: "resort-3",
      name: "Nissi Beach Resort",
      location: "Ayia Napa, Cyprus",
      price: "$180",
      rating: 4.7,
      reviews: 1876,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
      amenities: ["Beachfront", "Nightlife", "Water Park", "Kids Club"],
      description:
        "Family-friendly beach resort combining relaxation with Ayia Napa's vibrant nightlife.",
      type: "Family Resort",
    },
    {
      id: "resort-4",
      name: "Constantinou Bros Asimina Suites",
      location: "Paphos, Cyprus",
      price: "$220",
      rating: 4.8,
      reviews: 945,
      image:
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400&h=300&fit=crop",
      amenities: ["Sea View", "Infinity Pool", "Spa", "Restaurant"],
      description:
        "Boutique resort with stunning sea views, infinity pools, and personalized luxury service.",
      type: "Boutique Resort",
    },
    {
      id: "resort-5",
      name: "St. Raphael Resort",
      location: "Limassol, Cyprus",
      price: "$190",
      rating: 4.6,
      reviews: 1654,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      amenities: ["Beach Access", "Golf Course", "Casino", "Multiple Pools"],
      description:
        "Comprehensive resort offering beach access, golf, casino, and extensive recreational facilities.",
      type: "All-Inclusive Resort",
    },
    {
      id: "resort-6",
      name: "Almyra Hotel",
      location: "Paphos, Cyprus",
      price: "$280",
      rating: 4.8,
      reviews: 876,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      amenities: [
        "Organic Spa",
        "Farm-to-Table",
        "Private Villas",
        "Wine Tasting",
      ],
      description:
        "Eco-luxury resort featuring organic spa treatments, farm-to-table dining, and wine experiences.",
      type: "Eco-Luxury Resort",
    },
  ];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-4 h-4" />;
      case "parking":
        return <TruckIcon className="w-4 h-4" />;
      case "spa":
        return <HomeIcon className="w-4 h-4" />;
      case "restaurant":
      case "fine dining":
        return <CakeIcon className="w-4 h-4" />;
      default:
        return <SparklesIcon className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/swimming-pool-beach-luxury-hotel-type-entertainment-complex-amara-dolce-vita-luxury-hotel-resort-tekirova-kemer-turkey.jpg"
            alt="Luxury resort with swimming pool and beach"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Luxury Resorts in Cyprus
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Experience world-class resorts with all-inclusive packages and
            exceptional service
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-900 appearance-none bg-white"
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
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Resorts Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Luxury Resorts in Cyprus
          </h2>
          <p className="text-gray-600">
            Experience world-class resorts with exceptional amenities and
            service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoResorts.map((resort) => (
            <div
              key={resort.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Resort Image */}
              <div className="relative h-48">
                <Image
                  src={resort.image}
                  alt={resort.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(resort.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(resort.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
                <div className="absolute top-4 left-4 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {resort.type}
                </div>
              </div>

              {/* Resort Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {resort.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-purple-600">
                      {resort.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {resort.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{resort.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({resort.reviews} reviews)
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {resort.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {resort.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {resort.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{resort.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/resorts/${resort.id}`}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
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
            Load More Resorts
          </button>
        </div>
      </main>
    </div>
  );
}

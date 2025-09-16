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

export default function HotelsPage() {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());
  const [searchFilters, setSearchFilters] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 2,
    priceRange: "any",
  });

  const toggleWishlist = (hotelId: string) => {
    const newWishlisted = new Set(isWishlisted);
    if (newWishlisted.has(hotelId)) {
      newWishlisted.delete(hotelId);
    } else {
      newWishlisted.add(hotelId);
    }
    setIsWishlisted(newWishlisted);
  };

  const handleSearch = () => {
    // Handle search functionality
    console.log("Searching hotels with filters:", searchFilters);
  };

  const demoHotels = [
    {
      id: "hotel-1",
      name: "Sunset Boulevard Hotel",
      location: "Limassol, Cyprus",
      price: "$135",
      rating: 4.9,
      reviews: 1456,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
      amenities: ["Ocean View", "Rooftop Pool", "Spa", "Restaurant"],
      description:
        "Luxurious beachfront hotel with stunning sunset views and premium amenities.",
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      id: "hotel-2",
      name: "Mountain View Resort",
      location: "Troodos Mountains, Cyprus",
      price: "$95",
      rating: 4.7,
      reviews: 892,
      image:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
      amenities: ["Mountain Views", "Fireplace", "Hiking Trails", "Restaurant"],
      description:
        "Scenic mountain resort offering breathtaking views and outdoor adventures.",
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      id: "hotel-3",
      name: "Historic City Center Inn",
      location: "Nicosia, Cyprus",
      price: "$85",
      rating: 4.6,
      reviews: 723,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      amenities: ["Historic Building", "City Center", "Breakfast", "WiFi"],
      description:
        "Charming historic inn in the heart of Nicosia with authentic Cypriot character.",
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: "hotel-4",
      name: "Marina Bay Suites",
      location: "Larnaca, Cyprus",
      price: "$160",
      rating: 4.8,
      reviews: 1876,
      image:
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=300&fit=crop",
      amenities: ["Marina View", "Private Balcony", "Spa", "Fine Dining"],
      description:
        "Elegant marina suites with private balconies and world-class dining.",
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      id: "hotel-5",
      name: "Desert Rose Boutique",
      location: "Paphos, Cyprus",
      price: "$110",
      rating: 4.7,
      reviews: 634,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      amenities: ["Boutique Design", "Garden", "Spa", "Restaurant"],
      description:
        "Intimate boutique hotel with unique design and lush garden surroundings.",
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: "hotel-6",
      name: "Airport Transit Lodge",
      location: "Larnaca Airport, Cyprus",
      price: "$70",
      rating: 4.4,
      reviews: 945,
      image:
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&h=300&fit=crop",
      amenities: ["Airport Shuttle", "24/7 Service", "Business Center", "WiFi"],
      description:
        "Convenient airport lodge perfect for layovers and business travel.",
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      id: "hotel-7",
      name: "Olive Grove Retreat",
      location: "Kyrenia, Cyprus",
      price: "$125",
      rating: 4.8,
      reviews: 567,
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      amenities: [
        "Olive Grove Views",
        "Infinity Pool",
        "Organic Spa",
        "Restaurant",
      ],
      description:
        "Tranquil retreat surrounded by ancient olive groves and modern luxury.",
      bedrooms: 1,
      bathrooms: 1,
    },
    {
      id: "hotel-8",
      name: "Party District Central",
      location: "Ayia Napa, Cyprus",
      price: "$140",
      rating: 4.6,
      reviews: 1234,
      image:
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
      amenities: ["Nightlife Access", "Pool Bar", "DJ Lounge", "Beach Club"],
      description:
        "Vibrant hotel in the heart of Ayia Napa's entertainment district.",
      bedrooms: 2,
      bathrooms: 2,
    },
    {
      id: "hotel-9",
      name: "Eco Paradise Resort",
      location: "Akamas Peninsula, Cyprus",
      price: "$155",
      rating: 4.9,
      reviews: 756,
      image:
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
      amenities: [
        "Eco-Friendly",
        "Wildlife Tours",
        "Yoga Deck",
        "Organic Dining",
      ],
      description:
        "Sustainable paradise resort offering nature experiences and wellness.",
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: "hotel-10",
      name: "Traditional Village House",
      location: "Lefkara, Cyprus",
      price: "$80",
      rating: 4.5,
      reviews: 423,
      image:
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=300&fit=crop",
      amenities: [
        "Traditional Architecture",
        "Village Views",
        "Garden",
        "Breakfast",
      ],
      description:
        "Authentic village house showcasing traditional Cypriot living.",
      bedrooms: 2,
      bathrooms: 1,
    },
    {
      id: "hotel-11",
      name: "Family Beach Paradise",
      location: "Protaras, Cyprus",
      price: "$115",
      rating: 4.7,
      reviews: 1567,
      image:
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=400&h=300&fit=crop",
      amenities: ["Family Suites", "Kids Club", "Water Park", "Beach Access"],
      description:
        "Family-friendly beach resort with extensive facilities for all ages.",
      bedrooms: 3,
      bathrooms: 2,
    },
    {
      id: "hotel-12",
      name: "Business District Plaza",
      location: "Nicosia Business District, Cyprus",
      price: "$130",
      rating: 4.6,
      reviews: 834,
      image:
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400&h=300&fit=crop",
      amenities: [
        "Business Center",
        "Conference Rooms",
        "Fitness Center",
        "Restaurant",
      ],
      description:
        "Modern business hotel with conference facilities and city convenience.",
      bedrooms: 1,
      bathrooms: 1,
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
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/young-friends-hostel.jpg"
            alt="Young friends in hostel"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Find Your Perfect Hotel in Cyprus
          </h1>
          <p className="text-xl mb-8 opacity-90">
            Discover luxury hotels, boutique stays, and budget-friendly options
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
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
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none bg-white"
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
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <MagnifyingGlassIcon className="w-5 h-5" />
                  Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hotels Grid */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured Hotels in Cyprus
          </h2>
          <p className="text-gray-600">
            Discover amazing hotels across all regions of Cyprus
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demoHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Hotel Image */}
              <div className="relative h-48">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => toggleWishlist(hotel.id)}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                  {isWishlisted.has(hotel.id) ? (
                    <HeartSolidIcon className="w-5 h-5 text-red-500" />
                  ) : (
                    <HeartIcon className="w-5 h-5 text-gray-600" />
                  )}
                </button>
              </div>

              {/* Hotel Details */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {hotel.name}
                  </h3>
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {hotel.price}
                    </div>
                    <div className="text-sm text-gray-500">per night</div>
                  </div>
                </div>

                <div className="flex items-center mb-3">
                  <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                  <span className="text-sm text-gray-600">
                    {hotel.location}
                  </span>
                </div>

                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-4">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm font-medium">{hotel.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({hotel.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center mb-4 text-sm text-gray-600">
                  <BuildingOfficeIcon className="w-4 h-4 mr-1" />
                  <span>
                    {hotel.bedrooms} bed • {hotel.bathrooms} bath
                  </span>
                </div>

                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {hotel.description}
                </p>

                {/* Amenities */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity) => (
                    <div
                      key={amenity}
                      className="flex items-center bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                    >
                      {getAmenityIcon(amenity)}
                      <span className="ml-1">{amenity}</span>
                    </div>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <div className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700">
                      +{hotel.amenities.length - 3} more
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Link
                    href={`/accommodations/hotels/${hotel.id}`}
                    className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
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
            Load More Hotels
          </button>
        </div>
      </main>
    </div>
  );
}

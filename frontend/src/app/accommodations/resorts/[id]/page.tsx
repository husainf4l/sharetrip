"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  StarIcon,
  HeartIcon,
  MapPinIcon,
  ArrowLeftIcon,
  CalendarDaysIcon,
  UsersIcon,
  WifiIcon,
  TruckIcon,
  HomeIcon,
  CakeIcon,
  SparklesIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  CheckCircleIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

export default function ResortDetailPage() {
  const params = useParams();
  const resortId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Extended resort data with more details
  const resortDetails = {
    "resort-1": {
      id: "resort-1",
      name: "Amathus Beach Resort",
      location: "Limassol, Cyprus",
      price: "$250",
      rating: 4.9,
      reviews: 2156,
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Private Beach",
        "Spa",
        "Fine Dining",
        "Water Sports",
        "Fitness Center",
        "Kids Club",
        "Tennis Courts",
        "Concierge",
      ],
      description:
        "Luxury beach resort with private beach access, world-class spa, and exceptional service.",
      longDescription:
        "Amathus Beach Resort represents the pinnacle of luxury beachfront accommodation in Cyprus. Our 250 rooms and suites offer breathtaking Mediterranean views and come equipped with premium amenities. The resort features a private beach, world-class spa, multiple dining venues, and extensive recreational facilities including water sports and tennis courts.",
      features: [
        "250 beachfront rooms and suites",
        "Private sandy beach",
        "Full-service spa and wellness center",
        "Multiple restaurants and bars",
        "Water sports center",
        "Children's club and playground",
        "Tennis courts and fitness center",
        "24-hour concierge service",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        pets: "Pets are not allowed",
        smoking: "Designated smoking areas",
      },
      contact: {
        phone: "+357 25 123456",
        email: "reservations@amathusbeach.com",
        website: "www.amathusbeach.com",
      },
      rooms: [
        {
          type: "Garden View Room",
          price: "$250",
          capacity: "2 guests",
          size: "35 m²",
        },
        {
          type: "Sea View Room",
          price: "$280",
          capacity: "2 guests",
          size: "35 m²",
        },
        {
          type: "Beachfront Suite",
          price: "$350",
          capacity: "4 guests",
          size: "65 m²",
        },
        {
          type: "Presidential Suite",
          price: "$550",
          capacity: "6 guests",
          size: "120 m²",
        },
      ],
    },
    "resort-2": {
      id: "resort-2",
      name: "Anassa Hotel",
      location: "Paphos, Cyprus",
      price: "$350",
      rating: 5.0,
      reviews: 1234,
      images: [
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop",
      ],
      amenities: [
        "UNESCO Site",
        "Michelin Star",
        "Tennis Courts",
        "Helipad",
        "Private Beach",
        "Spa",
        "Fine Dining",
        "Butler Service",
      ],
      description:
        "Award-winning luxury resort nestled in a UNESCO World Heritage Site with unparalleled elegance.",
      longDescription:
        "Anassa Hotel is a masterpiece of luxury hospitality, recognized globally for its exceptional service and stunning location within a UNESCO World Heritage Site. Each of our 173 rooms and suites offers unparalleled views and comes with personalized butler service. The resort features a Michelin-starred restaurant, championship tennis courts, and direct access to pristine beaches.",
      features: [
        "173 luxury rooms and suites",
        "UNESCO World Heritage location",
        "Michelin-starred restaurant",
        "Championship tennis courts",
        "Helipad for VIP arrivals",
        "Private beach access",
        "Award-winning spa",
        "Personalized butler service",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        pets: "Small pets allowed (surcharge)",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 26 123456",
        email: "concierge@anassahotel.com",
        website: "www.anassahotel.com",
      },
      rooms: [
        {
          type: "Deluxe Garden Room",
          price: "$350",
          capacity: "2 guests",
          size: "45 m²",
        },
        {
          type: "Sea View Suite",
          price: "$450",
          capacity: "2 guests",
          size: "70 m²",
        },
        {
          type: "Presidential Suite",
          price: "$750",
          capacity: "4 guests",
          size: "150 m²",
        },
      ],
    },
    "resort-3": {
      id: "resort-3",
      name: "Nissi Beach Resort",
      location: "Ayia Napa, Cyprus",
      price: "$180",
      rating: 4.7,
      reviews: 1876,
      images: [
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Beachfront",
        "Nightlife",
        "Water Park",
        "Kids Club",
        "Multiple Pools",
        "Animation Team",
        "Water Sports",
        "Mini Golf",
      ],
      description:
        "Family-friendly beach resort combining relaxation with Ayia Napa's vibrant nightlife.",
      longDescription:
        "Nissi Beach Resort is the perfect family destination, offering the best of both worlds - family-friendly facilities and proximity to Ayia Napa's vibrant nightlife. Our 350 rooms cater to all ages with connecting family rooms, multiple swimming pools, a water park, and extensive kids' facilities. The resort features daily animation programs and easy access to beach activities.",
      features: [
        "350 family-friendly rooms",
        "Direct beachfront location",
        "Water park with slides",
        "Children's club and playground",
        "Multiple swimming pools",
        "Animation team activities",
        "Water sports facilities",
        "Mini golf and games area",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Pets are not allowed",
        smoking: "Designated smoking areas",
      },
      contact: {
        phone: "+357 23 123456",
        email: "info@nissibeach.com",
        website: "www.nissibeach.com",
      },
      rooms: [
        {
          type: "Standard Room",
          price: "$180",
          capacity: "2 guests",
          size: "25 m²",
        },
        {
          type: "Family Room",
          price: "$220",
          capacity: "4 guests",
          size: "40 m²",
        },
        {
          type: "Beachfront Suite",
          price: "$280",
          capacity: "4 guests",
          size: "55 m²",
        },
      ],
    },
    "resort-4": {
      id: "resort-4",
      name: "Constantinou Bros Asimina Suites",
      location: "Paphos, Cyprus",
      price: "$220",
      rating: 4.8,
      reviews: 945,
      images: [
        "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Sea View",
        "Infinity Pool",
        "Spa",
        "Restaurant",
        "Bar",
        "Concierge",
        "Room Service",
        "Valet Parking",
      ],
      description:
        "Boutique resort with stunning sea views, infinity pools, and personalized luxury service.",
      longDescription:
        "Constantinou Bros Asimina Suites offers an intimate luxury experience with only 150 suites, ensuring personalized service for every guest. Each suite features stunning sea views, private balconies, and modern amenities. The resort includes an infinity pool, spa facilities, and multiple dining options overlooking the Mediterranean.",
      features: [
        "150 luxury suites with sea views",
        "Infinity pool with sea views",
        "Full-service spa",
        "Multiple dining venues",
        "24-hour concierge",
        "Room service",
        "Valet parking",
        "Private balconies in all rooms",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Small pets allowed (surcharge)",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 26 234567",
        email: "reservations@asiminasuites.com",
        website: "www.asiminasuites.com",
      },
      rooms: [
        {
          type: "Deluxe Suite",
          price: "$220",
          capacity: "2 guests",
          size: "50 m²",
        },
        {
          type: "Executive Suite",
          price: "$280",
          capacity: "2 guests",
          size: "65 m²",
        },
        {
          type: "Royal Suite",
          price: "$380",
          capacity: "4 guests",
          size: "85 m²",
        },
      ],
    },
    "resort-5": {
      id: "resort-5",
      name: "St. Raphael Resort",
      location: "Limassol, Cyprus",
      price: "$190",
      rating: 4.6,
      reviews: 1654,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Beach Access",
        "Golf Course",
        "Casino",
        "Multiple Pools",
        "Spa",
        "Fitness Center",
        "Tennis",
        "Water Sports",
      ],
      description:
        "Comprehensive resort offering beach access, golf, casino, and extensive recreational facilities.",
      longDescription:
        "St. Raphael Resort is a comprehensive luxury destination offering everything under one roof. With 500 rooms, the resort features beach access, an 18-hole golf course, casino, multiple swimming pools, and extensive sports facilities. The resort caters to all interests with spa treatments, fine dining, and entertainment options.",
      features: [
        "500 guest rooms and suites",
        "18-hole championship golf course",
        "Casino and entertainment complex",
        "Multiple swimming pools",
        "Full-service spa and wellness center",
        "Fitness center and sports facilities",
        "Water sports center",
        "Multiple dining options",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Pets allowed (surcharge)",
        smoking: "Designated smoking areas",
      },
      contact: {
        phone: "+357 25 345678",
        email: "info@straphaelresort.com",
        website: "www.straphaelresort.com",
      },
      rooms: [
        {
          type: "Classic Room",
          price: "$190",
          capacity: "2 guests",
          size: "30 m²",
        },
        {
          type: "Golf View Room",
          price: "$220",
          capacity: "2 guests",
          size: "30 m²",
        },
        {
          type: "Executive Suite",
          price: "$320",
          capacity: "4 guests",
          size: "60 m²",
        },
        {
          type: "Presidential Suite",
          price: "$480",
          capacity: "6 guests",
          size: "100 m²",
        },
      ],
    },
    "resort-6": {
      id: "resort-6",
      name: "Almyra Hotel",
      location: "Paphos, Cyprus",
      price: "$280",
      rating: 4.8,
      reviews: 876,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Organic Spa",
        "Farm-to-Table",
        "Private Villas",
        "Wine Tasting",
        "Yoga",
        "Meditation",
        "Helipad",
        "Concierge",
      ],
      description:
        "Eco-luxury resort featuring organic spa treatments, farm-to-table dining, and wine experiences.",
      longDescription:
        "Almyra Hotel pioneers eco-luxury in Cyprus, combining environmental sustainability with world-class luxury. Our 190 rooms and private villas feature organic materials and energy-efficient systems. The resort includes an organic spa, farm-to-table restaurant, wine tasting experiences, and wellness activities in a stunning natural setting.",
      features: [
        "190 eco-luxury rooms and villas",
        "Organic farm-to-table restaurant",
        "Wine tasting and vineyard tours",
        "Organic spa treatments",
        "Yoga and meditation pavilions",
        "Helipad for VIP arrivals",
        "Sustainable energy systems",
        "Private villas with plunge pools",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 72 hours before check-in",
        pets: "Pets allowed (no surcharge)",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 26 456789",
        email: "wellness@almyrahotel.com",
        website: "www.almyrahotel.com",
      },
      rooms: [
        {
          type: "Eco Deluxe Room",
          price: "$280",
          capacity: "2 guests",
          size: "40 m²",
        },
        {
          type: "Garden Villa",
          price: "$380",
          capacity: "2 guests",
          size: "60 m²",
        },
        {
          type: "Private Villa",
          price: "$550",
          capacity: "4 guests",
          size: "120 m²",
        },
      ],
    },
  };

  const resort = resortDetails[resortId as keyof typeof resortDetails];

  if (!resort) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Resort Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The resort you're looking for doesn't exist.
          </p>
          <Link
            href="/accommodations/resorts"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Resorts
          </Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-5 h-5" />;
      case "parking":
        return <TruckIcon className="w-5 h-5" />;
      case "spa":
        return <HomeIcon className="w-5 h-5" />;
      case "restaurant":
      case "fine dining":
      case "bar":
        return <CakeIcon className="w-5 h-5" />;
      default:
        return <SparklesIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/accommodations/resorts"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Resorts
            </Link>
            <button
              onClick={toggleWishlist}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              {isWishlisted ? (
                <HeartSolidIcon className="w-6 h-6 text-red-500" />
              ) : (
                <HeartIcon className="w-6 h-6 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Image Gallery */}
      <div className="relative h-96 md:h-[500px]">
        <Image
          src={resort.images[selectedImage]}
          alt={resort.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {resort.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                selectedImage === index ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {resort.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? "border-white"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${resort.name} ${index + 1}`}
                  width={80}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    {resort.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="w-5 h-5 mr-1" />
                    <span>{resort.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{resort.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({resort.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-600">
                    {resort.price}
                  </div>
                  <div className="text-gray-500">per night</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Resort
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {resort.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {resort.longDescription}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {resort.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-3">
                    <div className="text-cyan-600">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Resort Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {resort.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Room Types
              </h2>
              <div className="space-y-4">
                {resort.rooms.map((room, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 hover:border-cyan-300 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">
                        {room.type}
                      </h3>
                      <div className="text-right">
                        <div className="text-xl font-bold text-cyan-600">
                          {room.price}
                        </div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>👥 {room.capacity}</span>
                      <span>📐 {room.size}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Book Your Stay
              </h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cyan-500 focus:border-transparent">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                  </select>
                </div>
              </div>
              <button className="w-full bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4">
                Check Availability
              </button>
              <div className="text-center text-sm text-gray-500">
                You won't be charged yet
              </div>
            </div>

            {/* Policies */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Resort Policies
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-in</div>
                    <div className="text-sm text-gray-600">
                      {resort.policies.checkIn}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-out</div>
                    <div className="text-sm text-gray-600">
                      {resort.policies.checkOut}
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">
                    Cancellation
                  </div>
                  <div className="text-sm text-gray-600">
                    {resort.policies.cancellation}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Pets</div>
                  <div className="text-sm text-gray-600">
                    {resort.policies.pets}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Smoking</div>
                  <div className="text-sm text-gray-600">
                    {resort.policies.smoking}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    {resort.contact.phone}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    {resort.contact.email}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <a
                    href={`https://${resort.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-600 hover:text-cyan-700"
                  >
                    {resort.contact.website}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

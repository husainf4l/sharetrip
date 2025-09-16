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

interface Motel {
  id: string;
  name: string;
  location: string;
  price: string;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  description: string;
  longDescription: string;
  features: string[];
  policies: {
    checkIn: string;
    checkOut: string;
    cancellation: string;
    pets: string;
    smoking: string;
  };
  contact: {
    phone: string;
    email: string;
    website: string;
  };
  rooms: {
    type: string;
    price: string;
    capacity: string;
    size: string;
  }[];
}

export default function MotelDetailPage() {
  const params = useParams();
  const motelId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Extended motel data with more details
  const motelDetails = {
    "motel-1": {
      id: "motel-1",
      name: "Cyprus Highway Motel",
      location: "Nicosia-Limassol Highway, Cyprus",
      price: "$45",
      rating: 4.2,
      reviews: 387,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Free WiFi",
        "Free Parking",
        "24/7 Reception",
        "Pet Friendly",
        "Air Conditioning",
        "Television",
        "Private Bathroom",
      ],
      description:
        "Convenient highway motel perfect for road trips with clean rooms and friendly service.",
      longDescription:
        "Located right off the main Nicosia-Limassol highway, Cyprus Highway Motel offers the perfect stopover for travelers. Our modern facility features 25 comfortable rooms, each equipped with air conditioning, flat-screen TVs, and private bathrooms. The motel is just minutes from local restaurants and shopping centers, making it ideal for both short stays and extended visits.",
      features: [
        "25 comfortable guest rooms",
        "Highway frontage location",
        "24-hour front desk service",
        "Free parking for all vehicles",
        "Pet-friendly accommodations",
        "Complimentary continental breakfast",
        "Laundry facilities available",
        "Vending machines",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        pets: "Small pets allowed (surcharge)",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 22 123456",
        email: "info@cyprushighwaymotel.com",
        website: "www.cyprushighwaymotel.com",
      },
      rooms: [
        {
          type: "Standard Room",
          price: "$45",
          capacity: "2 guests",
          size: "20 m²",
        },
        {
          type: "Deluxe Room",
          price: "$55",
          capacity: "2 guests",
          size: "25 m²",
        },
        {
          type: "Family Room",
          price: "$70",
          capacity: "4 guests",
          size: "30 m²",
        },
      ],
    },
    "motel-2": {
      id: "motel-2",
      name: "Larnaca Airport Motel",
      location: "Larnaca Airport Area, Cyprus",
      price: "$55",
      rating: 4.1,
      reviews: 298,
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Airport Shuttle",
        "Free Parking",
        "WiFi",
        "Breakfast",
        "24/7 Reception",
        "Luggage Storage",
        "Currency Exchange",
      ],
      description:
        "Budget-friendly motel near Larnaca Airport, ideal for early flights and transit stays.",
      longDescription:
        "Strategically located just 2 km from Larnaca International Airport, this motel offers convenience for transit passengers and business travelers. Our 40 rooms are designed for functionality and comfort, with easy access to airport facilities and public transportation.",
      features: [
        "40 functional guest rooms",
        "Free airport shuttle service",
        "24-hour front desk",
        "Complimentary breakfast",
        "Luggage storage facilities",
        "Currency exchange services",
        "Laundry services",
        "Airport lounge access",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 12 hours before check-in",
        pets: "Pets are not allowed",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 24 123456",
        email: "frontdesk@larnacaairportmotel.com",
        website: "www.larnacaairportmotel.com",
      },
      rooms: [
        {
          type: "Standard Room",
          price: "$55",
          capacity: "2 guests",
          size: "18 m²",
        },
        {
          type: "Business Room",
          price: "$70",
          capacity: "2 guests",
          size: "22 m²",
        },
        {
          type: "Family Room",
          price: "$85",
          capacity: "4 guests",
          size: "28 m²",
        },
      ],
    },
    "motel-3": {
      id: "motel-3",
      name: "Paphos Seaside Motel",
      location: "Paphos Harbor, Cyprus",
      price: "$65",
      rating: 4.3,
      reviews: 176,
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Sea View",
        "Free Parking",
        "WiFi",
        "Restaurant",
        "Bar",
        "Harbor Access",
        "Terrace",
      ],
      description:
        "Charming seaside motel with harbor views and easy access to Paphos attractions.",
      longDescription:
        "Overlooking the picturesque Paphos Harbor, this charming motel offers stunning Mediterranean views and direct access to the sea. Our intimate property features 30 rooms with harbor or mountain views, creating a peaceful retreat in the heart of Paphos.",
      features: [
        "30 harbor-view rooms",
        "Direct harbor access",
        "On-site restaurant and bar",
        "Rooftop terrace",
        "Walking distance to attractions",
        "Free parking",
        "Luggage storage",
        "Tour information desk",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Small pets allowed (surcharge)",
        smoking: "Designated smoking areas",
      },
      contact: {
        phone: "+357 26 123456",
        email: "reservations@paphosseaside.com",
        website: "www.paphosseaside.com",
      },
      rooms: [
        {
          type: "Harbor View Room",
          price: "$65",
          capacity: "2 guests",
          size: "22 m²",
        },
        {
          type: "Sea View Suite",
          price: "$85",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Family Harbor Suite",
          price: "$110",
          capacity: "4 guests",
          size: "35 m²",
        },
      ],
    },
  };

  const motel = motelDetails[motelId as keyof typeof motelDetails];

  if (!motel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Motel Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The motel you're looking for doesn't exist.
          </p>
          <Link
            href="/accommodations/motels"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Motels
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
      case "restaurant":
      case "bar":
      case "breakfast":
        return <CakeIcon className="w-5 h-5" />;
      case "sea view":
        return <HomeIcon className="w-5 h-5" />;
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
              href="/accommodations/motels"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Motels
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
          src={motel.images[selectedImage]}
          alt={motel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {motel.images.map((_, index) => (
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
            {motel.images.map((image, index) => (
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
                  alt={`${motel.name} ${index + 1}`}
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
                    {motel.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="w-5 h-5 mr-1" />
                    <span>{motel.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{motel.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({motel.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-600">
                    {motel.price}
                  </div>
                  <div className="text-gray-500">per night</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Motel
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {motel.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {motel.longDescription}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {motel.amenities.map((amenity) => (
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
                Motel Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {motel.features.map((feature, index) => (
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
                {motel.rooms.map((room, index) => (
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
                Motel Policies
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-in</div>
                    <div className="text-sm text-gray-600">
                      {motel.policies.checkIn}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-out</div>
                    <div className="text-sm text-gray-600">
                      {motel.policies.checkOut}
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">
                    Cancellation
                  </div>
                  <div className="text-sm text-gray-600">
                    {motel.policies.cancellation}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Pets</div>
                  <div className="text-sm text-gray-600">
                    {motel.policies.pets}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Smoking</div>
                  <div className="text-sm text-gray-600">
                    {motel.policies.smoking}
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
                    {motel.contact.phone}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    {motel.contact.email}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <a
                    href={`https://${motel.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-600 hover:text-cyan-700"
                  >
                    {motel.contact.website}
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

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
  BuildingOfficeIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

export default function ApartmentDetailPage() {
  const params = useParams();
  const apartmentId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  // Extended apartment data with more details
  const apartmentDetails = {
    "apt-1": {
      id: "apt-1",
      name: "Nicosia City Center Studio",
      location: "Nicosia, Cyprus",
      price: "$85",
      rating: 4.7,
      reviews: 156,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      amenities: [
        "WiFi",
        "Kitchen",
        "City View",
        "Parking",
        "Air Conditioning",
        "Washing Machine",
        "Dishwasher",
        "TV",
      ],
      description:
        "Modern studio apartment in the heart of Nicosia with full kitchen and city views. Perfect for solo travelers or couples looking for a convenient city stay.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
      size: "35 sqm",
      host: {
        name: "Maria Papadopoulos",
        rating: 4.9,
        responseTime: "within an hour",
        languages: ["English", "Greek"],
        joined: "2019",
      },
      policies: {
        checkIn: "3:00 PM - 10:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        smoking: "No smoking",
        pets: "Pets allowed",
      },
      locationDetails: {
        address: "Stasikratous Street 15, Nicosia 1010, Cyprus",
        nearby: [
          "Ledra Street (5 min walk)",
          "Nicosia Municipal Market (10 min walk)",
          "Cyprus Museum (15 min walk)",
        ],
      },
    },
    "apt-2": {
      id: "apt-2",
      name: "Limassol Beachfront Apartment",
      location: "Limassol, Cyprus",
      price: "$120",
      rating: 4.8,
      reviews: 203,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Beach Access",
        "Balcony",
        "Pool",
        "WiFi",
        "Air Conditioning",
        "Kitchen",
        "Sea View",
        "Parking",
      ],
      description:
        "Spacious 2-bedroom apartment with stunning beach views and private balcony. Ideal for families or groups wanting to enjoy the Mediterranean coastline.",
      bedrooms: 2,
      bathrooms: 2,
      maxGuests: 4,
      size: "85 sqm",
      host: {
        name: "Andreas Christou",
        rating: 4.8,
        responseTime: "within 2 hours",
        languages: ["English", "Greek"],
        joined: "2020",
      },
      policies: {
        checkIn: "4:00 PM - 11:00 PM",
        checkOut: "10:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        smoking: "No smoking",
        pets: "No pets",
      },
      locationDetails: {
        address: "Georgiou A Street 25, Limassol 3041, Cyprus",
        nearby: [
          "Limassol Marina (3 min walk)",
          "Limassol Castle (10 min walk)",
          "Amathus Beach (5 min drive)",
        ],
      },
    },
    "apt-3": {
      id: "apt-3",
      name: "Paphos Traditional Apartment",
      location: "Paphos, Cyprus",
      price: "$95",
      rating: 4.6,
      reviews: 89,
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Historic Area",
        "Garden",
        "WiFi",
        "Kitchen",
        "Air Conditioning",
        "Traditional Architecture",
        "Quiet Location",
      ],
      description:
        "Charming apartment in historic Paphos with traditional architecture and modern amenities. Experience authentic Cypriot living in a UNESCO World Heritage site.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
      size: "70 sqm",
      host: {
        name: "Elena Georgiou",
        rating: 4.7,
        responseTime: "within 3 hours",
        languages: ["English", "Greek"],
        joined: "2018",
      },
      policies: {
        checkIn: "2:00 PM - 8:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        smoking: "No smoking",
        pets: "Pets allowed",
      },
      locationDetails: {
        address: "Agapinoros Street 12, Paphos 8049, Cyprus",
        nearby: [
          "Paphos Archaeological Park (5 min walk)",
          "Paphos Castle (10 min walk)",
          "Kings Avenue Mall (15 min walk)",
        ],
      },
    },
    "apt-4": {
      id: "apt-4",
      name: "Ayia Napa Party District Loft",
      location: "Ayia Napa, Cyprus",
      price: "$110",
      rating: 4.5,
      reviews: 312,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Nightlife",
        "Modern",
        "WiFi",
        "Balcony",
        "Air Conditioning",
        "Kitchen",
        "City Center",
        "Soundproofing",
      ],
      description:
        "Stylish loft apartment in the heart of Ayia Napa's entertainment district. Perfect for party-goers and those wanting to be in the center of the action.",
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 3,
      size: "45 sqm",
      host: {
        name: "Christos Nikolaou",
        rating: 4.6,
        responseTime: "within 1 hour",
        languages: ["English", "Greek"],
        joined: "2021",
      },
      policies: {
        checkIn: "4:00 PM - 12:00 AM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        smoking: "No smoking",
        pets: "No pets",
      },
      locationDetails: {
        address: "Nissi Avenue 45, Ayia Napa 5340, Cyprus",
        nearby: [
          "Nissi Beach (3 min walk)",
          "Ayia Napa Monastery (10 min walk)",
          "WaterWorld (5 min drive)",
        ],
      },
    },
    "apt-5": {
      id: "apt-5",
      name: "Troodos Mountain Retreat",
      location: "Troodos Mountains, Cyprus",
      price: "$75",
      rating: 4.9,
      reviews: 67,
      images: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Mountain View",
        "Fireplace",
        "WiFi",
        "Kitchen",
        "Heating",
        "Garden",
        "Hiking Trails",
        "Peaceful",
      ],
      description:
        "Cozy mountain apartment perfect for nature lovers and hiking enthusiasts. Enjoy breathtaking views and peaceful surroundings in the Troodos Mountains.",
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
      size: "65 sqm",
      host: {
        name: "Dimitris Constantinou",
        rating: 4.9,
        responseTime: "within 4 hours",
        languages: ["English", "Greek"],
        joined: "2017",
      },
      policies: {
        checkIn: "3:00 PM - 8:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        smoking: "No smoking",
        pets: "Pets allowed",
      },
      locationDetails: {
        address: "Troodos Square 8, Troodos 4870, Cyprus",
        nearby: [
          "Kykkos Monastery (20 min drive)",
          "Troodos Botanical Garden (5 min walk)",
          "Hiking trails (on site)",
        ],
      },
    },
    "apt-6": {
      id: "apt-6",
      name: "Larnaca Family Apartment",
      location: "Larnaca, Cyprus",
      price: "$100",
      rating: 4.4,
      reviews: 145,
      images: [
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Family Friendly",
        "Pool",
        "WiFi",
        "Parking",
        "Air Conditioning",
        "Kitchen",
        "Playground",
        "Garden",
      ],
      description:
        "Spacious family apartment with resort amenities and convenient location. Perfect for families with children looking for a comfortable and fun stay.",
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
      size: "120 sqm",
      host: {
        name: "Anna Michael",
        rating: 4.5,
        responseTime: "within 2 hours",
        languages: ["English", "Greek"],
        joined: "2019",
      },
      policies: {
        checkIn: "3:00 PM - 9:00 PM",
        checkOut: "10:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        smoking: "No smoking",
        pets: "Pets allowed",
      },
      locationDetails: {
        address: "Finikoudes Beach Avenue 30, Larnaca 6307, Cyprus",
        nearby: [
          "Larnaca International Airport (10 min drive)",
          "Finikoudes Beach (2 min walk)",
          "Larnaca Marina (15 min walk)",
        ],
      },
    },
  };

  const apartment =
    apartmentDetails[apartmentId as keyof typeof apartmentDetails];

  if (!apartment) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Apartment Not Found
          </h1>
          <Link
            href="/accommodations/apartments"
            className="text-blue-600 hover:text-blue-800"
          >
            ← Back to Apartments
          </Link>
        </div>
      </div>
    );
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-5 h-5" />;
      case "parking":
        return <TruckIcon className="w-5 h-5" />;
      case "pool":
      case "spa":
        return <HomeIcon className="w-5 h-5" />;
      case "kitchen":
        return <CakeIcon className="w-5 h-5" />;
      default:
        return <SparklesIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/accommodations/apartments"
            className="inline-flex items-center text-gray-600 hover:text-gray-900"
          >
            <ArrowLeftIcon className="w-5 h-5 mr-2" />
            Back to Apartments
          </Link>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="relative">
        <div className="grid grid-cols-4 gap-2 h-96">
          <div className="col-span-2 relative">
            <Image
              src={apartment.images[selectedImage]}
              alt={apartment.name}
              fill
              className="object-cover rounded-l-lg"
            />
          </div>
          <div className="grid grid-rows-2 gap-2">
            {apartment.images.slice(1, 3).map((image, index) => (
              <div key={index} className="relative">
                <Image
                  src={image}
                  alt={`${apartment.name} ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
          <div className="relative">
            <Image
              src={apartment.images[3]}
              alt={`${apartment.name} 4`}
              fill
              className="object-cover rounded-r-lg"
            />
            <button className="absolute inset-0 bg-black/50 text-white flex items-center justify-center rounded-r-lg hover:bg-black/70 transition-colors">
              +{apartment.images.length - 4} more
            </button>
          </div>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={() => setIsWishlisted(!isWishlisted)}
          className="absolute top-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
        >
          {isWishlisted ? (
            <HeartSolidIcon className="w-6 h-6 text-red-500" />
          ) : (
            <HeartIcon className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Details */}
          <div className="lg:col-span-2">
            {/* Title and Location */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {apartment.name}
              </h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPinIcon className="w-5 h-5 mr-1" />
                <span>{apartment.location}</span>
              </div>
              <div className="flex items-center">
                <div className="flex items-center mr-4">
                  <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{apartment.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({apartment.reviews} reviews)
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">
                About this apartment
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {apartment.description}
              </p>
            </div>

            {/* Details */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Details</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center">
                  <BuildingOfficeIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span>
                    {apartment.bedrooms} bedroom
                    {apartment.bedrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center">
                  <HomeIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span>
                    {apartment.bathrooms} bathroom
                    {apartment.bathrooms !== 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex items-center">
                  <UsersIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span>Up to {apartment.maxGuests} guests</span>
                </div>
                <div className="flex items-center">
                  <SparklesIcon className="w-5 h-5 text-gray-400 mr-2" />
                  <span>{apartment.size}</span>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {apartment.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center text-gray-700"
                  >
                    {getAmenityIcon(amenity)}
                    <span className="ml-2">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Location</h2>
              <p className="text-gray-700 mb-4">
                {apartment.locationDetails.address}
              </p>
              <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">Map placeholder</span>
              </div>
              <div className="mt-4">
                <h3 className="font-semibold mb-2">What's nearby</h3>
                <ul className="space-y-1">
                  {apartment.locationDetails.nearby.map(
                    (place: string, index: number) => (
                      <li key={index} className="text-gray-600">
                        • {place}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>

            {/* Policies */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">Policies</h2>
              <div className="space-y-3">
                <div className="flex items-start">
                  <ClockIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Check-in:</span>{" "}
                    {apartment.policies.checkIn}
                  </div>
                </div>
                <div className="flex items-start">
                  <ClockIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Check-out:</span>{" "}
                    {apartment.policies.checkOut}
                  </div>
                </div>
                <div className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Cancellation:</span>{" "}
                    {apartment.policies.cancellation}
                  </div>
                </div>
                <div className="flex items-start">
                  <SparklesIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Smoking:</span>{" "}
                    {apartment.policies.smoking}
                  </div>
                </div>
                <div className="flex items-start">
                  <SparklesIcon className="w-5 h-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <span className="font-medium">Pets:</span>{" "}
                    {apartment.policies.pets}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    {apartment.price}
                  </span>
                  <span className="text-gray-500"> per night</span>
                </div>
                <div className="text-right">
                  <div className="flex items-center">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="font-medium">{apartment.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">
                    ({apartment.reviews} reviews)
                  </span>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-in
                    </label>
                    <input
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Check-out
                    </label>
                    <input
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} guest{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4">
                Reserve Now
              </button>

              <p className="text-center text-sm text-gray-500">
                You won't be charged yet
              </p>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-between mb-2">
                  <span>$85 × 5 nights</span>
                  <span>$425</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Cleaning fee</span>
                  <span>$25</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Service fee</span>
                  <span>$35</span>
                </div>
                <div className="flex justify-between font-semibold text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>$485</span>
                </div>
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">Meet your host</h3>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                  <span className="text-gray-600 font-semibold">
                    {apartment.host.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">{apartment.host.name}</h4>
                  <div className="flex items-center">
                    <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                    <span className="text-sm">
                      {apartment.host.rating} rating
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Response time: {apartment.host.responseTime}</div>
                <div>Languages: {apartment.host.languages.join(", ")}</div>
                <div>Joined in {apartment.host.joined}</div>
              </div>
              <div className="mt-4 flex gap-2">
                <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors">
                  Message Host
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <PhoneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

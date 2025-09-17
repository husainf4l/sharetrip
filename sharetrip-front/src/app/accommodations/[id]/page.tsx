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
import { Apartment } from "@/types/common";
import { accommodationService } from "@/services/accommodation.service";

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

export default function AccommodationDetail() {
  const params = useParams();
  const id = params.id as string;

  const [accommodation, setAccommodation] = useState<Apartment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        setLoading(true);
        const data = await accommodationService.getAccommodationById(id);
        if (data) {
          setAccommodation(data);
        } else {
          setError("Accommodation not found");
        }
      } catch (err) {
        console.error("Failed to fetch accommodation:", err);
        setError("Failed to load accommodation details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchAccommodation();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading accommodation details...</p>
        </div>
      </div>
    );
  }

  if (error || !accommodation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Accommodation not found"}
          </h1>
          <Link
            href="/accommodations"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            Back to Accommodations
          </Link>
        </div>
      </div>
    );
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/accommodations"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Accommodations
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
          src={accommodation.images[selectedImage]}
          alt={accommodation.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {accommodation.images.map((_, index) => (
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
            {accommodation.images.map((image, index) => (
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
                  alt={`${accommodation.title} ${index + 1}`}
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
                    {accommodation.title}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="w-5 h-5 mr-1" />
                    <span>
                      {accommodation.city}, {accommodation.country}
                    </span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <UsersIcon className="w-5 h-5 text-blue-500 mr-1" />
                      <span className="font-semibold">
                        Up to {accommodation.maxGuests} guests
                      </span>
                    </div>
                    <div className="flex items-center">
                      <HomeIcon className="w-5 h-5 text-gray-400 mr-1" />
                      <span>{accommodation.category.sectionTitle}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    ${(accommodation.basePrice / 100).toFixed(0)}
                  </div>
                  <div className="text-gray-500">per night</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Accommodation
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {accommodation.description}
              </p>
            </div>

            {/* Details */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {accommodation.bedrooms}
                  </div>
                  <div className="text-gray-600">Bedrooms</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {accommodation.bathrooms}
                  </div>
                  <div className="text-gray-600">Bathrooms</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {accommodation.maxGuests}
                  </div>
                  <div className="text-gray-600">Max Guests</div>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {accommodation.category.sectionTitle}
                  </div>
                  <div className="text-gray-600">Type</div>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {accommodation.amenities.map((amenity) => (
                  <div key={amenity} className="flex items-center space-x-3">
                    <div className="text-blue-600">
                      {getAmenityIcon(amenity)}
                    </div>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Location
              </h2>
              <div className="bg-gray-100 rounded-lg p-6">
                <div className="flex items-start gap-4">
                  <MapPinIcon className="w-6 h-6 text-gray-600 mt-1" />
                  <div>
                    <div className="font-medium text-gray-900 mb-1">
                      {accommodation.address}
                    </div>
                    <div className="text-gray-600">
                      {accommodation.city}, {accommodation.country}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      Coordinates: {accommodation.latitude.toFixed(4)},{" "}
                      {accommodation.longitude.toFixed(4)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
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
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(parseInt(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {Array.from(
                      { length: accommodation.maxGuests },
                      (_, i) => i + 1
                    ).map((num) => (
                      <option key={num} value={num}>
                        {num} guest{num !== 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors mb-4">
                Check Availability
              </button>
              <div className="text-center text-sm text-gray-500">
                You won't be charged yet
              </div>
            </div>

            {/* Host Info */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Meet Your Host
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {accommodation.host.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Hosted by {accommodation.host.name}
                  </div>
                  <div className="text-gray-600 text-sm">
                    {accommodation.host.email}
                  </div>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <div>Response time: within 2 hours</div>
                <div>Languages: English, Greek</div>
                <div>Joined in 2020</div>
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

            {/* Policies */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                House Rules
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-in</div>
                    <div className="text-sm text-gray-600">3:00 PM</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-out</div>
                    <div className="text-sm text-gray-600">11:00 AM</div>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">
                    Cancellation
                  </div>
                  <div className="text-sm text-gray-600">
                    Free cancellation up to 24 hours before check-in
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Pets</div>
                  <div className="text-sm text-gray-600">
                    Pets are not allowed
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Smoking</div>
                  <div className="text-sm text-gray-600">
                    Non-smoking property
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

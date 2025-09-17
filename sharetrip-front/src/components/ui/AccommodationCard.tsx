"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  WifiIcon,
  TruckIcon,
  TvIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
} from "@heroicons/react/24/solid";
import { AccommodationCardProps } from "@/types/common";

const getAmenityIcon = (amenity: string) => {
  const iconMap: { [key: string]: React.ReactElement } = {
    WiFi: <WifiIcon className="w-3 h-3" />,
    Parking: <TruckIcon className="w-3 h-3" />,
    TV: <TvIcon className="w-3 h-3" />,
    Kitchen: <HomeIcon className="w-3 h-3" />,
  };
  return iconMap[amenity] || <HomeIcon className="w-3 h-3" />;
};

export default function AccommodationCard({
  apartments,
}: AccommodationCardProps) {
  const [isWishlisted, setIsWishlisted] = useState<Set<string>>(new Set());

  const toggleWishlist = (apartmentId: string) => {
    setIsWishlisted((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(apartmentId)) {
        newSet.delete(apartmentId);
      } else {
        newSet.add(apartmentId);
      }
      return newSet;
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {apartments.map((apartment) => (
        <div
          key={apartment.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
          onClick={() =>
            (window.location.href = `/accommodations/${apartment.id}`)
          }
        >
          {/* Apartment Image */}
          <div className="relative h-48">
            <Image
              src={apartment.images[0]}
              alt={apartment.title}
              fill
              className="object-cover"
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleWishlist(apartment.id);
              }}
              className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
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
                {apartment.title}
              </h3>
              <div className="text-right">
                <div className="text-lg font-bold text-green-600">
                  ${(apartment.basePrice / 100).toFixed(0)}
                </div>
                <div className="text-sm text-gray-500">per night</div>
              </div>
            </div>

            <div className="flex items-center mb-3">
              <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
              <span className="text-sm text-gray-600">
                {apartment.city}, {apartment.country}
              </span>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex items-center mr-4">
                <UsersIcon className="w-4 h-4 text-blue-500 mr-1" />
                <span className="text-sm font-medium">
                  Up to {apartment.maxGuests} guests
                </span>
              </div>
              <span className="text-sm text-gray-500">
                Hosted by {apartment.host.name}
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
                href={`/accommodations/${apartment.id}`}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors text-center"
              >
                View Details
              </Link>
              <Link
                href={`/accommodations/${apartment.id}#booking`}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  StarIcon,
  ClockIcon,
  UsersIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as StarSolidIcon } from "@heroicons/react/24/solid";

interface Attraction {
  id: string;
  title: string;
  location: string;
  category: string;
  imageUrl: string;
  rating: number;
  reviewCount: number;
  duration: string;
  price: number;
  originalPrice?: number;
  groupSize: string;
  highlights: string[];
  isPopular?: boolean;
  isBestseller?: boolean;
  bookingCount: number;
}

const attractions: Attraction[] = [
  {
    id: "1",
    title: "Petra: Skip-the-Line Treasury & Monastery Tour",
    location: "Petra, Jordan",
    category: "Historical Tours",
    imageUrl: "/hero/chalets.webp",
    rating: 4.9,
    reviewCount: 2847,
    duration: "8 hours",
    price: 95,
    originalPrice: 120,
    groupSize: "Small group (max 12)",
    highlights: [
      "Skip-the-line access",
      "Expert local guide",
      "Treasury exploration",
      "Monastery hike",
    ],
    isPopular: true,
    isBestseller: true,
    bookingCount: 15420,
  },
  {
    id: "2",
    title: "Dubai: Burj Khalifa At The Top + Dubai Mall",
    location: "Dubai, UAE",
    category: "City Experience",
    imageUrl: "/hero/hotel.webp",
    rating: 4.8,
    reviewCount: 3521,
    duration: "4 hours",
    price: 75,
    groupSize: "Any size",
    highlights: [
      "124th & 125th floor access",
      "Dubai Mall visit",
      "Fountain show",
      "Shopping time",
    ],
    isPopular: true,
    bookingCount: 28930,
  },
  {
    id: "3",
    title: "Wadi Rum: Desert Safari & Stargazing",
    location: "Wadi Rum, Jordan",
    category: "Adventure Tours",
    imageUrl: "/hero/apartment.webp",
    rating: 4.9,
    reviewCount: 1876,
    duration: "12 hours",
    price: 140,
    groupSize: "Small group (max 8)",
    highlights: [
      "4WD desert safari",
      "Bedouin camp dinner",
      "Star gazing",
      "Overnight camping",
    ],
    isBestseller: true,
    bookingCount: 8650,
  },
  {
    id: "4",
    title: "Pyramids of Giza: Private Tour with Camel Ride",
    location: "Giza, Egypt",
    category: "Historical Tours",
    imageUrl: "/hero/villa.webp",
    rating: 4.7,
    reviewCount: 2156,
    duration: "6 hours",
    price: 89,
    originalPrice: 110,
    groupSize: "Private tour",
    highlights: [
      "Private Egyptologist guide",
      "Great Pyramid interior",
      "Sphinx visit",
      "Camel ride",
    ],
    bookingCount: 12340,
  },
  {
    id: "5",
    title: "Beirut: Food Walking Tour & Local Markets",
    location: "Beirut, Lebanon",
    category: "Food & Culture",
    imageUrl: "/hero/resort.webp",
    rating: 4.8,
    reviewCount: 987,
    duration: "5 hours",
    price: 65,
    groupSize: "Small group (max 10)",
    highlights: [
      "Traditional Lebanese cuisine",
      "Local market visit",
      "Cooking demonstration",
      "Cultural insights",
    ],
    isPopular: true,
    bookingCount: 5670,
  },
  {
    id: "6",
    title: "Dead Sea: Full Day Spa & Wellness Experience",
    location: "Dead Sea, Jordan",
    category: "Wellness & Spa",
    imageUrl: "/hero/treehouses.webp",
    rating: 4.6,
    reviewCount: 1543,
    duration: "8 hours",
    price: 120,
    groupSize: "Any size",
    highlights: [
      "Dead Sea floating",
      "Mud mask treatment",
      "Luxury spa access",
      "Healthy lunch",
    ],
    bookingCount: 7890,
  },
];

export default function TopAttractionsGrid() {
  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarSolidIcon key={i} className="w-4 h-4 text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <StarIcon className="w-4 h-4 text-yellow-400" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <StarSolidIcon className="w-4 h-4 text-yellow-400" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <StarIcon key={`empty-${i}`} className="w-4 h-4 text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Top Attractions & Experiences
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover the most popular experiences loved by travelers worldwide
            </p>
          </div>
          <Link
            href="/tours"
            className="flex items-center text-orange-600 hover:text-orange-700 font-semibold transition-colors group"
          >
            View all attractions
            <ChevronRightIcon className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Attractions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {attractions.map((attraction, index) => (
            <div
              key={attraction.id}
              className={`group cursor-pointer bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 overflow-hidden ${
                index === 0 ? "lg:col-span-2 lg:row-span-1" : ""
              }`}
            >
              {/* Image Container */}
              <div
                className={`relative overflow-hidden ${
                  index === 0 ? "h-64" : "h-48"
                }`}
              >
                <Image
                  src={attraction.imageUrl}
                  alt={attraction.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {attraction.isBestseller && (
                    <span className="bg-orange-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                      Bestseller
                    </span>
                  )}
                  {attraction.isPopular && !attraction.isBestseller && (
                    <span className="bg-green-500 text-white px-3 py-1 text-xs font-bold rounded-full shadow-lg">
                      Popular
                    </span>
                  )}
                </div>

                {/* Discount Badge */}
                {attraction.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded-full shadow-lg">
                      Save{" "}
                      {Math.round(
                        ((attraction.originalPrice - attraction.price) /
                          attraction.originalPrice) *
                          100
                      )}
                      %
                    </span>
                  </div>
                )}

                {/* Heart Icon */}
                <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Category & Location */}
                <div className="mb-3">
                  <span className="text-sm text-orange-600 font-semibold bg-orange-50 px-2 py-1 rounded-full">
                    {attraction.category}
                  </span>
                  <p className="text-sm text-gray-500 mt-2">
                    {attraction.location}
                  </p>
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {attraction.title}
                </h3>

                {/* Rating & Reviews */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {renderStars(attraction.rating)}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 ml-2">
                    {attraction.rating}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">
                    ({attraction.reviewCount.toLocaleString()} reviews)
                  </span>
                </div>

                {/* Tour Details */}
                <div className="flex items-center text-sm text-gray-600 mb-4 space-x-4">
                  <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-1" />
                    {attraction.duration}
                  </div>
                  <div className="flex items-center">
                    <UsersIcon className="w-4 h-4 mr-1" />
                    {attraction.groupSize.split(" ")[0]}{" "}
                    {attraction.groupSize.split(" ")[1]}
                  </div>
                </div>

                {/* Highlights */}
                <div className="mb-4">
                  <ul className="text-sm text-gray-600 space-y-1">
                    {attraction.highlights
                      .slice(0, index === 0 ? 4 : 3)
                      .map((highlight, i) => (
                        <li key={i} className="flex items-center">
                          <svg
                            className="w-3 h-3 text-green-500 mr-2 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {highlight}
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Booking Info */}
                <div className="text-xs text-gray-500 mb-4">
                  {attraction.bookingCount.toLocaleString()} travelers booked
                  this experience
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      ${attraction.price}
                    </span>
                    {attraction.originalPrice && (
                      <span className="text-lg text-gray-500 line-through ml-2">
                        ${attraction.originalPrice}
                      </span>
                    )}
                  </div>
                  <Link
                    href={`/tours/${attraction.id}`}
                    className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 inline-block text-center"
                  >
                    Book Now
                  </Link>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-12">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Browse our complete collection of over 10,000+ experiences or
              contact our local experts for personalized recommendations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/tours"
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-200 hover:shadow-lg inline-block text-center"
              >
                Browse All Experiences
              </Link>
              <button className="border border-orange-600 text-orange-600 hover:bg-orange-50 font-bold py-3 px-8 rounded-xl transition-all duration-200">
                Contact Local Expert
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

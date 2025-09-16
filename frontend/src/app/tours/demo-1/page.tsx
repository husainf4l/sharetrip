"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  StarIcon,
  HeartIcon,
  ShareIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  CheckIcon,
  CalendarIcon,
  UsersIcon,
  GlobeAltIcon,
  CurrencyDollarIcon,
  UserIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
  CheckCircleIcon as CheckCircleSolidIcon,
} from "@heroicons/react/24/solid";

export default function DemoTour1Page() {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const tour = {
    id: "demo-1",
    title: "Wadi Rum Desert Adventure",
    location: "Wadi Rum, Jordan",
    price: "$75",
    rating: 4.9,
    reviews: 2341,
    duration: "6 hours",
    groupSize: "6/12 people",
    difficulty: "Moderate",
    languages: ["English", "Arabic"],
    includes: [
      "Local Bedouin guide",
      "4x4 vehicle transportation",
      "Traditional camp lunch",
      "Stargazing session",
      "Tea/coffee breaks",
    ],
    image: "/images/tour-1.jpg",
    description:
      "Experience the breathtaking beauty of Wadi Rum, also known as the Valley of the Moon. This full-day desert adventure takes you through stunning red sand dunes, ancient rock formations, and Bedouin camps. Ride in a 4x4 vehicle through the desert landscape, learn about Bedouin culture, and enjoy a traditional lunch under the stars.",
    highlights: [
      "Explore Mars-like desert landscapes",
      "Meet local Bedouin tribes",
      "Visit Lawrence of Arabia's house",
      "Enjoy traditional Bedouin hospitality",
      "Stargazing in the clear desert night",
    ],
    itinerary: [
      { time: "8:00 AM", activity: "Pickup from your accommodation" },
      { time: "9:00 AM", activity: "Arrival at Wadi Rum Visitor Center" },
      { time: "9:30 AM", activity: "4x4 desert safari begins" },
      { time: "11:00 AM", activity: "Visit Lawrence of Arabia's house" },
      { time: "12:00 PM", activity: "Traditional Bedouin lunch" },
      { time: "1:00 PM", activity: "Continue desert exploration" },
      { time: "3:00 PM", activity: "Tea break and cultural insights" },
      { time: "4:30 PM", activity: "Return to visitor center" },
      { time: "6:00 PM", activity: "Drop-off at accommodation" },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center text-blue-600 hover:text-blue-800"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Home
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <ShareIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero Image */}
            <div className="relative h-96 rounded-2xl overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h1 className="text-3xl font-bold mb-2">{tour.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <MapPinIcon className="w-5 h-5 mr-1" />
                    <span>{tour.location}</span>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400 fill-current mr-1" />
                    <span>
                      {tour.rating} ({tour.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">About this tour</h2>
              <p className="text-gray-700 leading-relaxed">
                {tour.description}
              </p>
            </div>

            {/* Highlights */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Highlights</h2>
              <ul className="space-y-3">
                {tour.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Itinerary */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">Itinerary</h2>
              <div className="space-y-4">
                {tour.itinerary.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-medium mr-4">
                      {item.time}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700">{item.activity}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-bold mb-4">What's included</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {tour.includes.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {tour.price}
                </div>
                <div className="text-gray-600">per person</div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{tour.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group size</span>
                  <span className="font-medium">{tour.groupSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-medium">{tour.difficulty}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Languages</span>
                  <span className="font-medium">
                    {tour.languages.join(", ")}
                  </span>
                </div>
              </div>

              <Link
                href={`/check-availability?tourId=${tour.id}&date=${
                  new Date().toISOString().split("T")[0]
                }&guests=2`}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors text-center block font-semibold"
              >
                Check Availability
              </Link>
            </div>

            {/* Quick Info */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-bold mb-4">Quick Info</h3>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <ClockIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Flexible booking</span>
                </div>
                <div className="flex items-center text-sm">
                  <UserGroupIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Small groups</span>
                </div>
                <div className="flex items-center text-sm">
                  <GlobeAltIcon className="w-4 h-4 text-gray-400 mr-2" />
                  <span>Local expertise</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

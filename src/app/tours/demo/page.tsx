"use client";

import React from "react";
import Link from "next/link";
import { ImageGallery, GalleryImage } from "@/components/ImageGallery";
import {
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  StarIcon,
  HeartIcon,
  ShareIcon,
  CalendarIcon,
  CheckIcon,
  XMarkIcon,
  InformationCircleIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

// Sample tour images for the gallery - Using local images
const tourImages: GalleryImage[] = [
  {
    id: "1",
    src: "/images/tour-1.jpg",
    alt: "Amazing tour experience - Beautiful destination",
    title: "Stunning landscapes and cultural experiences",
    width: 1200,
    height: 800,
  },
  {
    id: "2",
    src: "/images/tour-2.jpg",
    alt: "Local culture and traditions",
    title: "Immerse yourself in authentic local experiences",
    width: 1200,
    height: 800,
  },
  {
    id: "3",
    src: "/images/tour-3.jpg",
    alt: "Adventure and exploration",
    title: "Discover hidden gems and scenic locations",
    width: 1200,
    height: 800,
  },
  {
    id: "4",
    src: "/images/tour-4.jpg",
    alt: "Memorable tour moments",
    title: "Create unforgettable memories with expert guides",
    width: 1200,
    height: 800,
  }
];

export default function TourDetailDemo() {
  // Sample tour data
  const tour = {
    title: "Authentic Portuguese Food Tour",
    location: "Lisbon, Portugal",
    rating: 4.8,
    reviewCount: 847,
    price: 65,
    originalPrice: 85,
    duration: "3.5 hours",
    groupSize: "Small group (max 12)",
    language: "English, Portuguese",
    category: "Food & Drink",
    description: "Discover the authentic flavors of Portuguese cuisine on this immersive food tour through Lisbon's historic neighborhoods. Led by a local culinary expert, you'll visit traditional eateries, family-run bakeries, and hidden gems that locals have treasured for generations.",
    highlights: [
      "Visit 6+ authentic local eateries and food shops",
      "Taste traditional pastéis de nata at their birthplace",
      "Sample Portuguese wines paired with local cheeses",
      "Learn about Portuguese culinary traditions and history",
      "Explore historic neighborhoods with a local guide",
      "Small group experience for personalized attention"
    ],
    includes: [
      "Professional local food guide",
      "All food and drink tastings",
      "Walking tour of historic areas",
      "Recipe cards to take home",
      "Small group experience"
    ],
    excludes: [
      "Transportation to/from meeting point",
      "Additional drinks not mentioned",
      "Personal expenses",
      "Tips (optional)"
    ],
    meetingPoint: "Rossio Square, near the fountain (GPS: 38.7139, -9.1399)",
    importantInfo: [
      "Please arrive 15 minutes before departure time",
      "Wear comfortable walking shoes",
      "Dietary restrictions can be accommodated with advance notice",
      "Tour operates rain or shine",
      "Minimum age: 12 years"
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/tours" className="text-blue-600 hover:text-blue-800 font-medium">
              ← Back to Tours
            </Link>
            <div className="flex items-center gap-4">
              <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                <HeartIcon className="w-6 h-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-500 transition-colors">
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Tour Title */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="badge-getyourguide">
                  {tour.category}
                </span>
                <span className="badge-bestseller">
                  Bestseller
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {tour.title}
              </h1>
              <div className="flex items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPinIcon className="w-4 h-4" />
                  <span>{tour.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="font-semibold">{tour.rating}</span>
                  <span>({tour.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            {/* Image Gallery - The main feature! */}
            <div className="mb-8">
              <ImageGallery 
                images={tourImages} 
                showLightbox={true}
                className="rounded-2xl overflow-hidden"
              />
            </div>

            {/* Tour Description */}
            <div className="card-getyourguide p-8 mb-8">
              <h2 className="text-2xl font-bold text-getyourguide-dark mb-6">About this experience</h2>
              <p className="text-getyourguide-gray leading-relaxed mb-8 text-lg">
                {tour.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100">
                <div className="text-center">
                  <ClockIcon className="w-7 h-7 text-getyourguide-blue mx-auto mb-3" />
                  <div className="font-bold text-getyourguide-dark text-lg">{tour.duration}</div>
                  <div className="text-sm text-getyourguide-gray font-medium">Duration</div>
                </div>
                <div className="text-center">
                  <UsersIcon className="w-7 h-7 text-getyourguide-blue mx-auto mb-3" />
                  <div className="font-bold text-getyourguide-dark text-lg">{tour.groupSize}</div>
                  <div className="text-sm text-getyourguide-gray font-medium">Group size</div>
                </div>
                <div className="text-center">
                  <GlobeAltIcon className="w-7 h-7 text-getyourguide-blue mx-auto mb-3" />
                  <div className="font-bold text-getyourguide-dark text-lg">{tour.language}</div>
                  <div className="text-sm text-getyourguide-gray font-medium">Languages</div>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="card-getyourguide p-8 mb-8">
              <h2 className="text-2xl font-bold text-getyourguide-dark mb-6">What's included</h2>
              <div className="space-y-3 mb-6">
                {tour.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckIcon className="w-5 h-5 text-getyourguide-green mt-0.5 flex-shrink-0" />
                    <span className="text-getyourguide-gray text-lg">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Included/Excluded */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="card-getyourguide p-6">
                <h3 className="text-xl font-bold text-getyourguide-dark mb-5">Included</h3>
                <div className="space-y-2">
                  {tour.includes.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckIcon className="w-4 h-4 text-getyourguide-green mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-getyourguide-gray">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="card-getyourguide p-6">
                <h3 className="text-xl font-bold text-getyourguide-dark mb-5">Not included</h3>
                <div className="space-y-2">
                  {tour.excludes.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <XMarkIcon className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-getyourguide-gray">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="card-getyourguide p-8">
              <div className="flex items-center gap-3 mb-6">
                <InformationCircleIcon className="w-7 h-7 text-getyourguide-blue" />
                <h3 className="text-xl font-bold text-getyourguide-dark">Important information</h3>
              </div>
              <div className="space-y-2">
                {tour.importantInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-getyourguide-blue rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-getyourguide-gray">{info}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <div className="card-getyourguide-elevated p-8 shadow-xl">
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center gap-3 mb-2">
                    <span className="text-4xl font-bold text-getyourguide-dark">${tour.price}</span>
                    <span className="text-xl text-getyourguide-gray line-through">${tour.originalPrice}</span>
                  </div>
                  <div className="text-sm text-getyourguide-gray font-medium">per person</div>
                  <div className="text-sm text-getyourguide-green font-bold bg-green-50 px-3 py-1 rounded-full inline-block">Save ${tour.originalPrice - tour.price}!</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Select date
                    </label>
                    <input
                      type="date"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Number of travelers
                    </label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring">
                      <option>1 person</option>
                      <option>2 people</option>
                      <option>3 people</option>
                      <option>4 people</option>
                      <option>5+ people</option>
                    </select>
                  </div>
                </div>

                <button className="w-full btn-getyourguide-primary py-4 text-lg font-bold mb-6 transform hover:scale-[1.02] transition-all">
                  Book Now
                </button>

                <div className="flex items-center justify-center gap-2 text-sm text-getyourguide-gray mb-6 bg-green-50 p-3 rounded-lg">
                  <ShieldCheckIcon className="w-5 h-5 text-getyourguide-green" />
                  <span className="font-medium">Free cancellation up to 24 hours before</span>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center gap-2 text-sm text-getyourguide-dark mb-3">
                    <MapPinIcon className="w-5 h-5 text-getyourguide-blue" />
                    <span className="font-bold">Meeting point:</span>
                  </div>
                  <p className="text-sm text-getyourguide-gray pl-7 leading-relaxed">{tour.meetingPoint}</p>
                </div>

                <div className="flex items-center gap-4 mt-6 pt-4 border-t border-gray-200">
                  <button className="flex-1 btn-getyourguide-outline py-3 text-sm font-medium">
                    <HeartIcon className="w-4 h-4 mr-2" />
                    Save
                  </button>
                  <button className="flex-1 btn-getyourguide-outline py-3 text-sm font-medium">
                    <ShareIcon className="w-4 h-4 mr-2" />
                    Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
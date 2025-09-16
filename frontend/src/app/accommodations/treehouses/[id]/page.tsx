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
  BuildingStorefrontIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

interface Treehouse {
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
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
}

export default function TreehouseDetailPage() {
  const params = useParams();
  const treehouseId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Extended treehouse data with more details
  const treehouseDetails = {
    "treehouse-1": {
      id: "treehouse-1",
      name: "Cypress Forest Treehouse",
      location: "Paphos Forest, Cyprus",
      price: "$95",
      rating: 4.9,
      reviews: 23,
      images: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Forest Views",
        "Deck",
        "WiFi",
        "Breakfast",
        "Hammock",
        "Fire Pit",
        "Nature Trails",
        "Bird Watching",
        "Stargazing Deck",
        "Eco-Friendly",
      ],
      description:
        "Magical treehouse nestled in ancient cypress forest with stunning canopy views.",
      longDescription:
        "Discover the magic of living among the treetops in this enchanting treehouse nestled deep within Cyprus's ancient cypress forests. Perched high above the forest floor, this unique accommodation offers breathtaking canopy views and the serene sounds of nature. Built with respect for the environment using sustainable materials, this treehouse provides the perfect blend of adventure and tranquility. Wake up to the sound of birds singing and fall asleep under a blanket of stars from your private viewing deck.",
      features: [
        "Elevated treehouse design with forest canopy views",
        "Sustainable and eco-friendly construction",
        "Private deck with hammock and relaxation area",
        "Ancient cypress forest surroundings",
        "Bird watching and wildlife observation",
        "Stargazing from elevated platform",
        "Nature trails and forest exploration",
        "Fire pit for evening gatherings",
        "Eco-friendly amenities and practices",
        "Peaceful forest atmosphere",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the treehouse",
      },
      contact: {
        phone: "+357 22 123 456",
        email: "info@cypressforest.com",
        website: "cypressforest.com",
      },
      rooms: [
        {
          type: "Treehouse Suite",
          price: "$95",
          capacity: "2 guests",
          size: "35 m²",
        },
      ],
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    "treehouse-2": {
      id: "treehouse-2",
      name: "Mediterranean Oak Treehouse",
      location: "Limassol Hills, Cyprus",
      price: "$110",
      rating: 4.8,
      reviews: 18,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Oak Tree",
        "Hammock",
        "WiFi",
        "Picnic Area",
        "Sun Deck",
        "Nature Sounds",
        "Mediterranean Views",
        "Romantic Setting",
      ],
      description:
        "Romantic treehouse built around a majestic oak tree with Mediterranean views.",
      longDescription:
        "Experience romance among the branches in this beautifully crafted treehouse built around a majestic Mediterranean oak tree. Located in the rolling hills of Limassol, this unique accommodation offers stunning panoramic views of the Mediterranean landscape. The treehouse is designed to blend seamlessly with its natural surroundings, creating an intimate and romantic retreat for couples seeking a memorable getaway.",
      features: [
        "Built around ancient Mediterranean oak tree",
        "Panoramic Mediterranean Sea views",
        "Romantic and intimate setting",
        "Large sun deck with relaxation areas",
        "Hammock for lazy afternoons",
        "Picnic area with ocean views",
        "Nature sounds and peaceful atmosphere",
        "Sustainable design respecting the oak tree",
        "Sunset viewing from elevated position",
        "Perfect for romantic getaways",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the treehouse",
      },
      contact: {
        phone: "+357 22 234 567",
        email: "bookings@oakretreat.com",
        website: "oakretreat.com",
      },
      rooms: [
        {
          type: "Oak Tree Suite",
          price: "$110",
          capacity: "2 guests",
          size: "40 m²",
        },
      ],
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    "treehouse-3": {
      id: "treehouse-3",
      name: "Pine Grove Retreat",
      location: "Troodos Mountains, Cyprus",
      price: "$85",
      rating: 4.7,
      reviews: 31,
      images: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Pine Forest",
        "Fire Pit",
        "WiFi",
        "Stargazing",
        "Mountain Views",
        "Nature Trails",
        "Eco-Friendly",
        "Peaceful",
      ],
      description:
        "Cozy pine treehouse perfect for nature lovers and stargazing enthusiasts.",
      longDescription:
        "Immerse yourself in the tranquility of the Troodos Mountains in this cozy pine treehouse designed for nature enthusiasts. Surrounded by towering pine trees and mountain scenery, this retreat offers the perfect escape from city life. Whether you're stargazing from the observation deck, hiking the nearby trails, or simply enjoying the peaceful sounds of the forest, this treehouse provides an authentic mountain experience.",
      features: [
        "Surrounded by towering pine forest",
        "Mountain views and fresh air",
        "Stargazing observation deck",
        "Fire pit for evening gatherings",
        "Nearby hiking and nature trails",
        "Peaceful and secluded location",
        "Eco-friendly and sustainable design",
        "Perfect for nature photography",
        "Mountain air and tranquility",
        "Authentic forest experience",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the treehouse",
      },
      contact: {
        phone: "+357 22 345 678",
        email: "info@pinegrove.com",
        website: "pinegrove.com",
      },
      rooms: [
        {
          type: "Pine Forest Suite",
          price: "$85",
          capacity: "2 guests",
          size: "30 m²",
        },
      ],
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    "treehouse-4": {
      id: "treehouse-4",
      name: "Family Treehouse Villa",
      location: "Nicosia Countryside, Cyprus",
      price: "$140",
      rating: 4.6,
      reviews: 15,
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Multiple Levels",
        "Kitchen",
        "WiFi",
        "Play Area",
        "Family Friendly",
        "Large Deck",
        "Nature Activities",
        "Safe Design",
      ],
      description:
        "Spacious family treehouse with multiple levels and modern amenities.",
      longDescription:
        "Create unforgettable family memories in this spacious multi-level treehouse designed specifically for families. Located in the peaceful countryside near Nicosia, this unique accommodation features multiple levels connected by sturdy bridges and platforms. With a fully equipped kitchen, play areas, and plenty of space for family activities, this treehouse offers the perfect blend of adventure and comfort for the whole family.",
      features: [
        "Multi-level design with connecting bridges",
        "Spacious family accommodation",
        "Fully equipped kitchen",
        "Dedicated play areas for children",
        "Large deck with family activities",
        "Safe and sturdy construction",
        "Nature exploration opportunities",
        "Family-friendly amenities",
        "Peaceful countryside location",
        "Memorable family experience",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the treehouse",
      },
      contact: {
        phone: "+357 22 456 789",
        email: "family@treetopvilla.com",
        website: "treetopvilla.com",
      },
      rooms: [
        {
          type: "Family Suite - Upper Level",
          price: "$140",
          capacity: "4 guests",
          size: "50 m²",
        },
        {
          type: "Kids Play Area - Lower Level",
          price: "Included",
          capacity: "Additional space",
          size: "25 m²",
        },
      ],
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    "treehouse-5": {
      id: "treehouse-5",
      name: "Seaside Palm Treehouse",
      location: "Ayia Napa Coast, Cyprus",
      price: "$120",
      rating: 4.8,
      reviews: 27,
      images: [
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Sea Views",
        "Deck",
        "WiFi",
        "Sunset Views",
        "Beach Access",
        "Ocean Breezes",
        "Tropical Setting",
        "Romantic",
      ],
      description:
        "Unique palm treehouse with breathtaking sea views and sunset watching.",
      longDescription:
        "Experience the ultimate coastal luxury in this unique palm treehouse perched above the Mediterranean Sea. Located near Ayia Napa's beautiful coastline, this extraordinary accommodation offers breathtaking sea views and the soothing sound of ocean waves. Watch spectacular sunsets from your private deck and enjoy the tropical ambiance of this one-of-a-kind treehouse retreat.",
      features: [
        "Perched above the Mediterranean Sea",
        "Breathtaking panoramic ocean views",
        "Spectacular sunset watching",
        "Private deck with sea breeze",
        "Nearby beach access",
        "Tropical palm tree surroundings",
        "Romantic and luxurious atmosphere",
        "Ocean wave sounds for relaxation",
        "Coastal exploration opportunities",
        "Unique beachfront experience",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the treehouse",
      },
      contact: {
        phone: "+357 22 567 890",
        email: "reservations@palmtreehouse.com",
        website: "palmtreehouse.com",
      },
      rooms: [
        {
          type: "Ocean View Suite",
          price: "$120",
          capacity: "2 guests",
          size: "38 m²",
        },
      ],
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
    "treehouse-6": {
      id: "treehouse-6",
      name: "Ancient Olive Treehouse",
      location: "Larnaca Valley, Cyprus",
      price: "$100",
      rating: 4.5,
      reviews: 19,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Olive Grove",
        "Terrace",
        "WiFi",
        "Traditional",
        "Historic Setting",
        "Garden Views",
        "Cultural Experience",
        "Peaceful",
      ],
      description:
        "Treehouse built in an ancient olive grove with traditional Cypriot charm.",
      longDescription:
        "Step back in time in this charming treehouse nestled within an ancient olive grove in the Larnaca Valley. Surrounded by centuries-old olive trees that have witnessed Cyprus's rich history, this accommodation offers a unique blend of traditional architecture and modern comfort. Experience the cultural heritage of Cyprus while enjoying the peaceful atmosphere of this historic setting.",
      features: [
        "Located in ancient olive grove",
        "Centuries-old olive tree surroundings",
        "Traditional Cypriot architectural elements",
        "Historic and cultural significance",
        "Peaceful valley location",
        "Large terrace with olive tree views",
        "Traditional olive oil production nearby",
        "Cultural immersion experience",
        "Historic preservation focus",
        "Authentic Cypriot atmosphere",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the treehouse",
      },
      contact: {
        phone: "+357 22 678 901",
        email: "info@olivetreehouse.com",
        website: "olivetreehouse.com",
      },
      rooms: [
        {
          type: "Olive Grove Suite",
          price: "$100",
          capacity: "2 guests",
          size: "32 m²",
        },
      ],
      bedrooms: 1,
      bathrooms: 1,
      maxGuests: 2,
    },
  };

  const treehouse =
    treehouseDetails[treehouseId as keyof typeof treehouseDetails];

  if (!treehouse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Treehouse Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The treehouse you're looking for doesn't exist.
          </p>
          <Link
            href="/accommodations/treehouses"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Treehouses
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
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/accommodations/treehouses"
              className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Treehouses
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
      <div className="relative h-[60vh] bg-gray-900">
        <Image
          src={treehouse.images[selectedImage]}
          alt={treehouse.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {treehouse.images.map((_, index) => (
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
        <div className="absolute bottom-20 left-6 right-6 flex space-x-2 overflow-x-auto">
          {treehouse.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index ? "border-white" : "border-white/50"
              }`}
            >
              <Image
                src={image}
                alt={`${treehouse.name} ${index + 1}`}
                width={80}
                height={64}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {treehouse.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mr-1" />
                  <span className="text-gray-600">{treehouse.location}</span>
                </div>
                <div className="flex items-center">
                  <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{treehouse.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({treehouse.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <HomeIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-600 font-medium">Treehouse</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Treehouse
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {treehouse.longDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Treehouse Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {treehouse.features.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircleIcon className="w-5 h-5 text-emerald-600 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {treehouse.amenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center bg-emerald-50 px-4 py-3 rounded-lg"
                  >
                    <SparklesIcon className="w-5 h-5 text-emerald-600 mr-3" />
                    <span className="text-gray-700 font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Room Details
              </h2>
              <div className="space-y-4">
                {treehouse.rooms.map((room, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {room.type}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>👥 {room.capacity}</span>
                          <span>📐 {room.size}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-600">
                          {room.price}
                        </div>
                        <div className="text-sm text-gray-500">per night</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Policies */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Treehouse Policies
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Check-in</div>
                      <div className="text-gray-600">
                        {treehouse.policies.checkIn}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Check-out</div>
                      <div className="text-gray-600">
                        {treehouse.policies.checkOut}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CurrencyDollarIcon className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">
                        Cancellation
                      </div>
                      <div className="text-gray-600 text-sm">
                        {treehouse.policies.cancellation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SparklesIcon className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Pets</div>
                      <div className="text-gray-600">
                        {treehouse.policies.pets}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-emerald-600 mb-2">
                  {treehouse.price}
                </div>
                <div className="text-gray-500">per night</div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent">
                    {[1, 2, 3, 4].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 mb-4">
                Book Now
              </button>

              <div className="text-center text-sm text-gray-500">
                You won't be charged yet
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-12 bg-white border border-gray-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <PhoneIcon className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="font-medium text-gray-900">Phone</div>
                <div className="text-gray-600">{treehouse.contact.phone}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-gray-600">{treehouse.contact.email}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <GlobeAltIcon className="w-6 h-6 text-emerald-600" />
              <a
                href={`https://${treehouse.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <div className="font-medium text-gray-900">Website</div>
                <div>{treehouse.contact.website}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

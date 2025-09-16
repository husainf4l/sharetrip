"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  StarIcon,
  HeartIcon,
  MapPinIcon,
  ArrowLeftIcon,
  WifiIcon,
  TruckIcon,
  HomeIcon,
  CakeIcon,
  SparklesIcon,
  BuildingStorefrontIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  CheckIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

export default function GuestHouseDetailPage() {
  const params = useParams();
  const guestHouseId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Mock data for guest houses - in a real app, this would come from an API
  const guestHouseData = {
    "gh-1": {
      id: "gh-1",
      name: "Traditional Cypriot Guest House",
      location: "Omodos Village, Cyprus",
      price: "$75",
      rating: 4.7,
      reviews: 89,
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Experience authentic Cypriot hospitality in this beautifully restored traditional guest house nestled in the charming village of Omodos. Built in the 18th century, this stone house has been lovingly renovated while preserving its original character and charm. Wake up to stunning mountain views and enjoy homemade breakfast made with local ingredients.",
      amenities: [
        "Traditional Architecture",
        "Garden",
        "Breakfast",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Pet Friendly",
        "Kitchen",
        "Laundry",
      ],
      features: [
        "Built in 1750",
        "Stone construction",
        "Mountain views",
        "Village location",
        "Traditional decor",
        "Fireplace",
        "Private terrace",
        "Local wine cellar",
      ],
      policies: {
        checkIn: "3:00 PM - 8:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        children: "Children welcome",
        pets: "Pets allowed with prior arrangement",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 123 456",
        email: "info@omodoshouse.com",
        address: "Main Street 15, Omodos Village, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Deluxe Double Room",
          price: "$75",
          capacity: 2,
          size: "25 m²",
          bed: "King Size Bed",
          amenities: ["Mountain View", "Private Bathroom", "Air Conditioning"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Family Suite",
          price: "$120",
          capacity: 4,
          size: "45 m²",
          bed: "2 Double Beds",
          amenities: [
            "Garden View",
            "Private Bathroom",
            "Kitchenette",
            "Balcony",
          ],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Maria & Andreas",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviews: 156,
        responseTime: "within an hour",
        languages: ["English", "Greek", "German"],
      },
    },
    "gh-2": {
      id: "gh-2",
      name: "Mountain View Guest House",
      location: "Platres, Cyprus",
      price: "$85",
      rating: 4.6,
      reviews: 67,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Perched on the slopes of the Troodos Mountains, this charming guest house offers breathtaking panoramic views of the surrounding peaks and valleys. Built with traditional stone and wood, it combines rustic charm with modern comforts. The guest house is surrounded by pine forests and offers easy access to hiking trails and mountain biking routes.",
      amenities: [
        "Mountain Views",
        "Fireplace",
        "Breakfast",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Hiking Trails",
        "Garden",
        "Terrace",
      ],
      features: [
        "Panoramic mountain views",
        "Stone and wood construction",
        "Pine forest surroundings",
        "Hiking trail access",
        "Traditional fireplace",
        "Large terrace",
        "Organic garden",
        "Local wine selection",
      ],
      policies: {
        checkIn: "2:00 PM - 9:00 PM",
        checkOut: "Until 12:00 PM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        children: "Children 12+ welcome",
        pets: "Small pets allowed",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 234 567",
        email: "stay@mountainviewhouse.com",
        address: "Forest Road 8, Platres, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Mountain View Room",
          price: "$85",
          capacity: 2,
          size: "30 m²",
          bed: "Queen Size Bed",
          amenities: ["Mountain View", "Private Bathroom", "Fireplace"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Deluxe Suite",
          price: "$140",
          capacity: 3,
          size: "50 m²",
          bed: "King Bed + Single",
          amenities: [
            "Panoramic View",
            "Private Bathroom",
            "Sitting Area",
            "Balcony",
          ],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Elena",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviews: 98,
        responseTime: "within 2 hours",
        languages: ["English", "Greek"],
      },
    },
    "gh-3": {
      id: "gh-3",
      name: "Seaside Guest House",
      location: "Protaras, Cyprus",
      price: "$70",
      rating: 4.5,
      reviews: 123,
      images: [
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Just steps from the golden sands of Protaras beach, this charming guest house offers the perfect blend of relaxation and adventure. The traditional architecture with whitewashed walls and blue shutters creates a quintessential Mediterranean atmosphere. Enjoy sea views from your private balcony and stroll to the beach in just 2 minutes.",
      amenities: [
        "Beach Access",
        "Garden",
        "Breakfast",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Sea Views",
        "Terrace",
        "Barbecue",
      ],
      features: [
        "Beachfront location",
        "Mediterranean architecture",
        "Sea views",
        "Private balconies",
        "Garden with BBQ",
        "Traditional decor",
        "Local seafood restaurant nearby",
        "Water sports access",
      ],
      policies: {
        checkIn: "3:00 PM - 10:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        children: "Children welcome",
        pets: "No pets allowed",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 345 678",
        email: "hello@seasideguesthouse.com",
        address: "Beach Road 12, Protaras, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Sea View Room",
          price: "$70",
          capacity: 2,
          size: "28 m²",
          bed: "Double Bed",
          amenities: ["Sea View", "Private Bathroom", "Balcony"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Family Room",
          price: "$110",
          capacity: 4,
          size: "42 m²",
          bed: "2 Double Beds",
          amenities: ["Partial Sea View", "Private Bathroom", "Kitchenette"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Nikos & Sofia",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        reviews: 203,
        responseTime: "within 30 minutes",
        languages: ["English", "Greek", "Russian"],
      },
    },
    "gh-4": {
      id: "gh-4",
      name: "Historic Center Guest House",
      location: "Nicosia Old City, Cyprus",
      price: "$80",
      rating: 4.8,
      reviews: 95,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Located in the heart of Nicosia's historic old city, this elegant guest house occupies a beautifully restored Venetian building dating back to the 16th century. The stone walls and arched doorways tell stories of centuries past, while modern comforts ensure a comfortable stay. Explore the UNESCO World Heritage site right from your doorstep.",
      amenities: [
        "Historic Building",
        "City Views",
        "Breakfast",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Restaurant",
        "Bar",
        "Concierge",
      ],
      features: [
        "16th century Venetian building",
        "UNESCO World Heritage site",
        "Stone architecture",
        "Arched doorways",
        "City center location",
        "Traditional courtyard",
        "Local art collection",
        "Museum access",
      ],
      policies: {
        checkIn: "2:00 PM - 8:00 PM",
        checkOut: "Until 12:00 PM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        children: "Children 8+ welcome",
        pets: "No pets allowed",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 456 789",
        email: "reservations@historicguesthouse.com",
        address: "Ledra Street 25, Old City, Nicosia, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Historic Room",
          price: "$80",
          capacity: 2,
          size: "32 m²",
          bed: "King Size Bed",
          amenities: ["City View", "Private Bathroom", "Original Features"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Deluxe Suite",
          price: "$130",
          capacity: 3,
          size: "55 m²",
          bed: "King Bed + Sofa Bed",
          amenities: [
            "Courtyard View",
            "Private Bathroom",
            "Sitting Area",
            "Mini Bar",
          ],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Christos",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviews: 167,
        responseTime: "within 1 hour",
        languages: ["English", "Greek", "French"],
      },
    },
    "gh-5": {
      id: "gh-5",
      name: "Vineyard Guest House",
      location: "Limassol Wine Region, Cyprus",
      price: "$90",
      rating: 4.9,
      reviews: 54,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
      ],
      description:
        "Nestled among the rolling vineyards of Cyprus's renowned wine region, this luxurious guest house offers a unique blend of wine country elegance and Mediterranean charm. Surrounded by grapevines and olive groves, the property features a private wine cellar and offers wine tasting experiences. The architecture blends traditional stone construction with modern design elements.",
      amenities: [
        "Vineyard Views",
        "Wine Tasting",
        "Breakfast",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Swimming Pool",
        "Wine Cellar",
        "Restaurant",
      ],
      features: [
        "Vineyard setting",
        "Private wine cellar",
        "Wine tasting experiences",
        "Stone and glass architecture",
        "Olive grove views",
        "Swimming pool",
        "Award-winning wines",
        "Cooking classes available",
      ],
      policies: {
        checkIn: "3:00 PM - 7:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 72 hours before check-in",
        children: "Children 12+ welcome",
        pets: "Small pets allowed",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 567 890",
        email: "welcome@vineyardguesthouse.com",
        address: "Wine Road 5, Limassol Wine Region, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Vineyard View Room",
          price: "$90",
          capacity: 2,
          size: "35 m²",
          bed: "King Size Bed",
          amenities: ["Vineyard View", "Private Bathroom", "Wine Selection"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Luxury Suite",
          price: "$160",
          capacity: 3,
          size: "65 m²",
          bed: "King Bed + Sofa Bed",
          amenities: [
            "Panoramic Vineyard View",
            "Private Bathroom",
            "Jacuzzi",
            "Terrace",
          ],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Dimitris & Anna",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        rating: 5.0,
        reviews: 89,
        responseTime: "within 30 minutes",
        languages: ["English", "Greek", "Italian"],
      },
    },
    "gh-6": {
      id: "gh-6",
      name: "Forest Edge Guest House",
      location: "Paphos Forest, Cyprus",
      price: "$65",
      rating: 4.4,
      reviews: 78,
      images: [
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Tucked away at the edge of Paphos's ancient forest, this peaceful guest house offers a serene escape into nature. Surrounded by towering pine trees and wildflowers, the property provides direct access to hiking trails and nature walks. The traditional architecture blends seamlessly with the natural surroundings, creating a harmonious retreat for nature lovers and adventurers alike.",
      amenities: [
        "Forest Views",
        "Garden",
        "Breakfast",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Hiking Trails",
        "Nature Walks",
        "Bird Watching",
      ],
      features: [
        "Forest edge location",
        "Pine forest surroundings",
        "Hiking trail access",
        "Wildlife viewing",
        "Traditional stone construction",
        "Organic garden",
        "Nature sounds",
        "Eco-friendly practices",
      ],
      policies: {
        checkIn: "2:00 PM - 8:00 PM",
        checkOut: "Until 12:00 PM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        children: "Children welcome",
        pets: "Pets allowed with prior arrangement",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 678 901",
        email: "info@forestedgeguesthouse.com",
        address: "Forest Path 3, Paphos Forest, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Forest View Room",
          price: "$65",
          capacity: 2,
          size: "26 m²",
          bed: "Double Bed",
          amenities: ["Forest View", "Private Bathroom", "Nature Sounds"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Nature Suite",
          price: "$100",
          capacity: 3,
          size: "40 m²",
          bed: "Queen Bed + Single",
          amenities: [
            "Forest View",
            "Private Bathroom",
            "Sitting Area",
            "Balcony",
          ],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Marina",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        rating: 4.6,
        reviews: 124,
        responseTime: "within 3 hours",
        languages: ["English", "Greek"],
      },
    },
  };

  const guestHouse =
    guestHouseData[guestHouseId as keyof typeof guestHouseData];

  if (!guestHouse) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Guest House Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The guest house you're looking for doesn't exist.
          </p>
          <Link
            href="/accommodations/guest-houses"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Guest Houses
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === guestHouse.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? guestHouse.images.length - 1 : prev - 1
    );
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-5 h-5" />;
      case "parking":
        return <TruckIcon className="w-5 h-5" />;
      case "breakfast":
        return <CakeIcon className="w-5 h-5" />;
      default:
        return <SparklesIcon className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/accommodations/guest-houses"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Guest Houses
            </Link>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                {isWishlisted ? (
                  <HeartSolidIcon className="w-6 h-6 text-red-500" />
                ) : (
                  <HeartIcon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="relative h-[60vh] bg-gray-900">
        <Image
          src={guestHouse.images[currentImageIndex]}
          alt={guestHouse.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Navigation Arrows */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
        >
          <ChevronLeftIcon className="w-6 h-6 text-gray-900" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full hover:bg-white transition-colors"
        >
          <ChevronRightIcon className="w-6 h-6 text-gray-900" />
        </button>

        {/* Image Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {guestHouse.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Thumbnail Strip */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
          <div className="flex space-x-2 overflow-x-auto">
            {guestHouse.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                  index === currentImageIndex
                    ? "border-white"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image}
                  alt={`${guestHouse.name} ${index + 1}`}
                  width={80}
                  height={64}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {guestHouse.name}
              </h1>
              <div className="flex items-center mb-4">
                <MapPinIcon className="w-5 h-5 text-gray-400 mr-1" />
                <span className="text-gray-600">{guestHouse.location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{guestHouse.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({guestHouse.reviews} reviews)
                  </span>
                </div>
                <div className="text-2xl font-bold text-red-600">
                  {guestHouse.price}
                  <span className="text-sm text-gray-500 font-normal">
                    {" "}
                    per night
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Guest House
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {guestHouse.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {guestHouse.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center bg-gray-50 px-4 py-3 rounded-lg"
                  >
                    <div className="text-red-600 mr-3">
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
                Special Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guestHouse.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center bg-red-50 px-4 py-3 rounded-lg"
                  >
                    <CheckIcon className="w-5 h-5 text-red-600 mr-3" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Rooms */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Available Rooms
              </h2>
              <div className="space-y-4">
                {guestHouse.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                      selectedRoom === room.id
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 hover:border-red-300"
                    }`}
                    onClick={() =>
                      setSelectedRoom(selectedRoom === room.id ? null : room.id)
                    }
                  >
                    <div className="flex items-start space-x-4">
                      <Image
                        src={room.image}
                        alt={room.name}
                        width={120}
                        height={90}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          {room.name}
                        </h3>
                        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                          <div>Capacity: {room.capacity} guests</div>
                          <div>Size: {room.size}</div>
                          <div>Bed: {room.bed}</div>
                          <div className="font-semibold text-red-600">
                            {room.price} per night
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {room.amenities.map((amenity) => (
                            <span
                              key={amenity}
                              className="bg-gray-100 px-2 py-1 rounded-full text-xs text-gray-700"
                            >
                              {amenity}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Host Information */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Meet Your Host
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="flex items-start space-x-4">
                  <Image
                    src={guestHouse.host.image}
                    alt={guestHouse.host.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {guestHouse.host.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">
                        {guestHouse.host.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({guestHouse.host.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Responds {guestHouse.host.responseTime}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {guestHouse.host.languages.map((language) => (
                        <span
                          key={language}
                          className="bg-gray-100 px-3 py-1 rounded-full text-sm text-gray-700"
                        >
                          {language}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Booking Card */}
            <div className="bg-white border border-gray-200 rounded-lg p-6 sticky top-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Reserve Your Stay
              </h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-in Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent">
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="w-full bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Book Now - {guestHouse.price}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                You won't be charged yet
              </p>
            </div>

            {/* Policies */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                House Rules & Policies
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Check-in</h4>
                    <p className="text-sm text-gray-600">
                      {guestHouse.policies.checkIn}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Check-out</h4>
                    <p className="text-sm text-gray-600">
                      {guestHouse.policies.checkOut}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <XMarkIcon className="w-5 h-5 text-red-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Cancellation</h4>
                    <p className="text-sm text-gray-600">
                      {guestHouse.policies.cancellation}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Additional Policies
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {guestHouse.policies.children}</li>
                      <li>• {guestHouse.policies.pets}</li>
                      <li>• {guestHouse.policies.smoking}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <PhoneIcon className="w-5 h-5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-sm text-gray-600">
                      {guestHouse.contact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-sm text-gray-600">
                      {guestHouse.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-red-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-sm text-gray-600">
                      {guestHouse.contact.address}
                    </p>
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

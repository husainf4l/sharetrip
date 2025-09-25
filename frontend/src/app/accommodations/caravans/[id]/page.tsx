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

export default function CaravanDetailPage() {
  const params = useParams();
  const caravanId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Mock data for caravans - in a real app, this would come from an API
  const caravanData = {
    "c-1": {
      id: "c-1",
      name: "Luxury Coastal Caravan",
      location: "Ayia Napa Beach, Cyprus",
      price: "$80",
      rating: 4.7,
      reviews: 92,
      images: [
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Experience the ultimate coastal caravan lifestyle in this luxurious mobile home situated just steps from Ayia Napa's golden beaches. This modern caravan features premium amenities, direct beach access, and stunning Mediterranean views. Perfect for couples or small families seeking a unique and comfortable Cyprus vacation experience.",
      amenities: [
        "Beach Access",
        "Kitchen",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Outdoor Shower",
        "Sun Deck",
        "BBQ Area",
        "Beach Towels",
      ],
      features: [
        "Direct beach access",
        "Modern kitchen with appliances",
        "Air-conditioned interior",
        "Private outdoor shower",
        "Sun deck with loungers",
        "BBQ area with grill",
        "Beach towel service",
        "Secure parking",
      ],
      policies: {
        checkIn: "2:00 PM - 6:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        children: "Children welcome",
        pets: "Small pets allowed with prior arrangement",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 123 456",
        email: "info@coastalcaravan.com",
        address: "Ayia Napa Beach Road 15, Ayia Napa, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Master Bedroom",
          price: "$80",
          capacity: 2,
          size: "20 m²",
          bed: "Queen Size Bed",
          amenities: ["Beach View", "Air Conditioning", "Private Access"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Bunk Room",
          price: "$60",
          capacity: 2,
          size: "15 m²",
          bed: "2 Single Bunks",
          amenities: ["Air Conditioning", "Storage Space", "Reading Lights"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Maria & Kostas",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        reviews: 145,
        responseTime: "within an hour",
        languages: ["English", "Greek", "German"],
      },
    },
    "c-2": {
      id: "c-2",
      name: "Mountain View Caravan",
      location: "Troodos Mountains, Cyprus",
      price: "$65",
      rating: 4.6,
      reviews: 78,
      images: [
        "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Escape to the tranquility of the Troodos Mountains in this charming caravan nestled among pine forests and mountain trails. Wake up to breathtaking mountain views and enjoy the peaceful surroundings. This caravan offers a perfect blend of comfort and nature, ideal for those seeking a serene mountain retreat with easy access to hiking and exploration.",
      amenities: [
        "Mountain Views",
        "Fire Pit",
        "WiFi",
        "Kitchen",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Hiking Trails",
        "Forest Access",
        "Outdoor Seating",
      ],
      features: [
        "Panoramic mountain views",
        "Outdoor fire pit for evenings",
        "Pine forest surroundings",
        "Hiking trail access",
        "Fully equipped kitchen",
        "Comfortable sleeping arrangements",
        "Outdoor seating area",
        "Peaceful mountain location",
      ],
      policies: {
        checkIn: "3:00 PM - 7:00 PM",
        checkOut: "Until 12:00 PM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        children: "Children 8+ welcome",
        pets: "Pets allowed with prior arrangement",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 234 567",
        email: "stay@mountaincaravan.com",
        address: "Troodos Forest Path 8, Troodos Mountains, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Main Sleeping Area",
          price: "$65",
          capacity: 2,
          size: "18 m²",
          bed: "Double Bed",
          amenities: ["Mountain View", "Air Conditioning", "Storage"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Andreas",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.6,
        reviews: 98,
        responseTime: "within 2 hours",
        languages: ["English", "Greek"],
      },
    },
    "c-3": {
      id: "c-3",
      name: "Family Caravan Retreat",
      location: "Paphos Camping Site, Cyprus",
      price: "$95",
      rating: 4.8,
      reviews: 134,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Perfect for family vacations, this spacious caravan offers plenty of room for everyone to relax and enjoy. Located in a family-friendly camping site near Paphos, it features multiple sleeping areas, a full kitchen, and plenty of space for kids to play. The surrounding area offers beautiful beaches, historical sites, and family-friendly activities.",
      amenities: [
        "Family Friendly",
        "Large Space",
        "WiFi",
        "Kitchen",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Play Area",
        "Beach Access",
        "Laundry Facilities",
      ],
      features: [
        "Spacious family layout",
        "Multiple sleeping areas",
        "Full kitchen with appliances",
        "Family play area nearby",
        "Beach access within walking distance",
        "Laundry facilities available",
        "Child-friendly environment",
        "Family activities nearby",
      ],
      policies: {
        checkIn: "2:00 PM - 6:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        children: "Children welcome",
        pets: "Small pets allowed",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 345 678",
        email: "family@caravanretreat.com",
        address: "Paphos Camping Site, Paphos, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Master Bedroom",
          price: "$95",
          capacity: 2,
          size: "22 m²",
          bed: "Queen Size Bed",
          amenities: ["Air Conditioning", "Storage Space", "Privacy"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Kids' Bunk Room",
          price: "$75",
          capacity: 3,
          size: "18 m²",
          bed: "Triple Bunks",
          amenities: ["Air Conditioning", "Reading Lights", "Storage"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
        {
          id: "room-3",
          name: "Convertible Lounge",
          price: "$85",
          capacity: 2,
          size: "20 m²",
          bed: "Sofa Bed",
          amenities: ["Air Conditioning", "Extra Space", "Flexibility"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Elena & Family",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviews: 203,
        responseTime: "within 30 minutes",
        languages: ["English", "Greek", "Russian"],
      },
    },
    "c-4": {
      id: "c-4",
      name: "Romantic Couples Caravan",
      location: "Limassol Coast, Cyprus",
      price: "$70",
      rating: 4.9,
      reviews: 156,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Create unforgettable memories in this romantic caravan designed specifically for couples. Tucked away on the beautiful Limassol coast, this intimate retreat offers privacy, stunning sea views, and all the amenities needed for a perfect romantic getaway. The caravan features soft lighting, comfortable bedding, and a private outdoor area perfect for sunset dinners.",
      amenities: [
        "Romantic Setting",
        "Sea Views",
        "WiFi",
        "Kitchen",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Private Terrace",
        "Outdoor Shower",
        "Romantic Lighting",
      ],
      features: [
        "Intimate couples' retreat",
        "Stunning sea views",
        "Private outdoor terrace",
        "Romantic lighting and ambiance",
        "Comfortable queen bedding",
        "Outdoor shower facility",
        "Sunset viewing area",
        "Privacy and seclusion",
      ],
      policies: {
        checkIn: "4:00 PM - 8:00 PM",
        checkOut: "Until 12:00 PM",
        cancellation: "Free cancellation up to 72 hours before check-in",
        children: "Adults only",
        pets: "No pets allowed",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 456 789",
        email: "romance@coastalcaravan.com",
        address: "Limassol Coastal Path 12, Limassol, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Romantic Suite",
          price: "$70",
          capacity: 2,
          size: "25 m²",
          bed: "Queen Size Bed",
          amenities: [
            "Sea View",
            "Romantic Lighting",
            "Private Terrace",
            "Mini Fridge",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Sophia",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviews: 187,
        responseTime: "within 1 hour",
        languages: ["English", "Greek", "French"],
      },
    },
    "c-5": {
      id: "c-5",
      name: "Adventure Caravan",
      location: "Akamas Peninsula, Cyprus",
      price: "$75",
      rating: 4.5,
      reviews: 67,
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "For the adventurous spirit, this caravan is perfectly positioned in the wild Akamas Peninsula. Surrounded by untouched nature, hiking trails, and pristine beaches, it's ideal for nature lovers and outdoor enthusiasts. The caravan is equipped with all the essentials for a comfortable stay while being close to some of Cyprus's most beautiful natural landscapes.",
      amenities: [
        "Nature Access",
        "Hiking Trails",
        "WiFi",
        "Kitchen",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Outdoor Shower",
        "Campfire Area",
        "Nature Guides",
      ],
      features: [
        "Located in Akamas Peninsula",
        "Access to hiking trails",
        "Untouched natural surroundings",
        "Outdoor shower facility",
        "Campfire area for evenings",
        "Nature guide services available",
        "Wildlife viewing opportunities",
        "Peaceful wilderness setting",
      ],
      policies: {
        checkIn: "2:00 PM - 6:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        children: "Children 12+ welcome",
        pets: "Pets allowed with prior arrangement",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 567 890",
        email: "adventure@akamascaravan.com",
        address: "Akamas Peninsula Trail 5, Akamas, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Adventure Cabin",
          price: "$75",
          capacity: 2,
          size: "20 m²",
          bed: "Double Bed",
          amenities: [
            "Nature Views",
            "Air Conditioning",
            "Adventure Gear Storage",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Bunk Area",
          price: "$60",
          capacity: 2,
          size: "15 m²",
          bed: "2 Single Bunks",
          amenities: ["Air Conditioning", "Storage", "Adventure Ready"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Nikos",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.5,
        reviews: 89,
        responseTime: "within 3 hours",
        languages: ["English", "Greek"],
      },
    },
    "c-6": {
      id: "c-6",
      name: "Premium Caravan Suite",
      location: "Larnaca Bay, Cyprus",
      price: "$110",
      rating: 5.0,
      reviews: 89,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800&h=600&fit=crop",
      ],
      description:
        "Indulge in luxury caravan living with this premium suite overlooking Larnaca Bay. This high-end caravan features premium finishes, state-of-the-art amenities, and breathtaking bay views. Perfect for those seeking the ultimate caravan experience with hotel-quality comforts and stunning coastal scenery. The caravan includes premium bedding, a full kitchen, and access to exclusive beach areas.",
      amenities: [
        "Premium Amenities",
        "Bay Views",
        "WiFi",
        "Full Kitchen",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Private Beach Access",
        "Concierge Service",
        "Luxury Bedding",
      ],
      features: [
        "Premium luxury finishes",
        "Breathtaking bay views",
        "State-of-the-art kitchen",
        "Private beach access",
        "Concierge service included",
        "Luxury bedding and linens",
        "High-end appliances",
        "Exclusive location",
      ],
      policies: {
        checkIn: "3:00 PM - 7:00 PM",
        checkOut: "Until 12:00 PM",
        cancellation: "Free cancellation up to 72 hours before check-in",
        children: "Children 12+ welcome",
        pets: "Small pets allowed",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 678 901",
        email: "luxury@larnacacaravan.com",
        address: "Larnaca Bay Exclusive Area 1, Larnaca, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Premium Master Suite",
          price: "$110",
          capacity: 2,
          size: "30 m²",
          bed: "King Size Bed",
          amenities: [
            "Bay View",
            "Luxury Bedding",
            "Private Access",
            "Walk-in Closet",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Luxury Guest Room",
          price: "$90",
          capacity: 2,
          size: "25 m²",
          bed: "Queen Size Bed",
          amenities: [
            "Bay View",
            "Luxury Amenities",
            "Air Conditioning",
            "Storage",
          ],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Luxury Caravan Services",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        rating: 5.0,
        reviews: 156,
        responseTime: "within 30 minutes",
        languages: ["English", "Greek", "Russian", "Arabic"],
      },
    },
  };

  const caravan = caravanData[caravanId as keyof typeof caravanData];

  if (!caravan) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Caravan Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The caravan you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link
            href="/accommodations/caravans"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Caravans
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === caravan.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? caravan.images.length - 1 : prev - 1
    );
  };

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <WifiIcon className="w-5 h-5" />;
      case "parking":
        return <TruckIcon className="w-5 h-5" />;
      case "kitchen":
      case "full kitchen":
        return <CakeIcon className="w-5 h-5" />;
      case "air conditioning":
        return <HomeIcon className="w-5 h-5" />;
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
              href="/accommodations/caravans"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Caravans
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
              <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-2 rounded-lg transition-colors">
                Book Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Image Gallery */}
      <section className="relative h-[60vh] bg-gray-900">
        <Image
          src={caravan.images[currentImageIndex]}
          alt={caravan.name}
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
          {caravan.images.map((_, index) => (
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
            {caravan.images.map((image, index) => (
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
                  alt={`${caravan.name} ${index + 1}`}
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
                {caravan.name}
              </h1>
              <div className="flex items-center mb-4">
                <MapPinIcon className="w-5 h-5 text-gray-400 mr-1" />
                <span className="text-gray-600">{caravan.location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{caravan.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({caravan.reviews} reviews)
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {caravan.price}
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
                About This Caravan
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {caravan.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {caravan.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center bg-gray-50 px-4 py-3 rounded-lg"
                  >
                    <div className="text-gray-600 mr-3">
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
                {caravan.features.map((feature) => (
                  <div
                    key={feature}
                    className="flex items-center bg-gray-50 px-4 py-3 rounded-lg"
                  >
                    <CheckIcon className="w-5 h-5 text-green-600 mr-3" />
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
                {caravan.rooms.map((room) => (
                  <div
                    key={room.id}
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                      selectedRoom === room.id
                        ? "border-gray-900 bg-gray-50"
                        : "border-gray-200 hover:border-gray-300"
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
                          <div className="font-semibold text-gray-900">
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
                    src={caravan.host.image}
                    alt={caravan.host.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {caravan.host.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">{caravan.host.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({caravan.host.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Responds {caravan.host.responseTime}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {caravan.host.languages.map((language) => (
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Check-out Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Guests
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Book Now - {caravan.price}
              </button>
              <p className="text-center text-sm text-gray-500 mt-3">
                You won&apos;t be charged yet
              </p>
            </div>

            {/* Policies */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                House Rules & Policies
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Check-in</h4>
                    <p className="text-sm text-gray-600">
                      {caravan.policies.checkIn}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Check-out</h4>
                    <p className="text-sm text-gray-600">
                      {caravan.policies.checkOut}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <XMarkIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Cancellation</h4>
                    <p className="text-sm text-gray-600">
                      {caravan.policies.cancellation}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Additional Policies
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {caravan.policies.children}</li>
                      <li>• {caravan.policies.pets}</li>
                      <li>• {caravan.policies.smoking}</li>
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
                  <PhoneIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Phone</h4>
                    <p className="text-sm text-gray-600">
                      {caravan.contact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-sm text-gray-600">
                      {caravan.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-sm text-gray-600">
                      {caravan.contact.address}
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

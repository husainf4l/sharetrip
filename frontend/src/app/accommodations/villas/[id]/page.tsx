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

interface Villa {
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

export default function VillaDetailPage() {
  const params = useParams();
  const villaId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Extended villa data with more details
  const villaDetails = {
    "villa-1": {
      id: "villa-1",
      name: "Mediterranean Dream Villa",
      location: "Paphos Hills, Cyprus",
      price: "$180",
      rating: 4.9,
      reviews: 87,
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Private Pool",
        "Sea View",
        "Garden",
        "WiFi",
        "Air Conditioning",
        "Fully Equipped Kitchen",
        "Terrace",
        "BBQ Area",
      ],
      description:
        "Stunning 4-bedroom villa with infinity pool and panoramic Mediterranean views.",
      longDescription:
        "Nestled in the rolling hills of Paphos, this luxurious villa offers breathtaking views of the Mediterranean Sea. The property features a private infinity pool, spacious terraces, and modern amenities throughout. With 4 spacious bedrooms and 3 bathrooms, this villa is perfect for families or groups looking for a premium vacation experience.",
      features: [
        "4 spacious bedrooms with king-size beds",
        "Private infinity pool with sea views",
        "Fully equipped modern kitchen",
        "Large terrace with outdoor dining area",
        "BBQ facilities and outdoor entertainment",
        "Air conditioning throughout",
        "High-speed WiFi internet",
        "Private parking for 2 vehicles",
        "Daily housekeeping service",
        "Concierge services available",
      ],
      policies: {
        checkIn: "4:00 PM",
        checkOut: "10:00 AM",
        cancellation: "Free cancellation up to 30 days before check-in",
        pets: "Small pets allowed (additional fee)",
        smoking: "No smoking inside the villa",
      },
      contact: {
        phone: "+357 26 123456",
        email: "reservations@mediterraneandream.com",
        website: "www.mediterraneandream.com",
      },
      rooms: [
        {
          type: "Master Suite",
          price: "$180",
          capacity: "2 guests",
          size: "35 m²",
        },
        {
          type: "Guest Bedroom",
          price: "$160",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Twin Room",
          price: "$150",
          capacity: "2 guests",
          size: "25 m²",
        },
        {
          type: "Family Room",
          price: "$170",
          capacity: "4 guests",
          size: "32 m²",
        },
      ],
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
    },
    "villa-2": {
      id: "villa-2",
      name: "Troodos Mountain Retreat",
      location: "Troodos Mountains, Cyprus",
      price: "$150",
      rating: 4.8,
      reviews: 64,
      images: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Fireplace",
        "Mountain View",
        "Hot Tub",
        "WiFi",
        "Wood Stove",
        "Ski Storage",
        "Game Room",
      ],
      description:
        "Cozy mountain villa perfect for families, with fireplace and hot tub.",
      longDescription:
        "Escape to the serene Troodos Mountains in this charming villa that combines traditional Cypriot architecture with modern comforts. Featuring a cozy fireplace, hot tub, and stunning mountain views, this retreat offers the perfect base for exploring the natural beauty of Cyprus's highest peaks.",
      features: [
        "3 comfortable bedrooms with mountain views",
        "Traditional stone fireplace in living room",
        "Outdoor hot tub with mountain views",
        "Fully equipped kitchen with wood stove",
        "Game room with board games and books",
        "Ski equipment storage available",
        "Private garden with barbecue area",
        "High-speed WiFi throughout",
        "Wood heating system",
        "Mountain hiking trail access",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 14 days before check-in",
        pets: "Pets are welcome",
        smoking: "Smoking allowed on terrace only",
      },
      contact: {
        phone: "+357 22 987654",
        email: "info@troodosretreat.com",
        website: "www.troodosretreat.com",
      },
      rooms: [
        {
          type: "Master Bedroom",
          price: "$150",
          capacity: "2 guests",
          size: "30 m²",
        },
        {
          type: "Mountain View Room",
          price: "$140",
          capacity: "2 guests",
          size: "25 m²",
        },
        {
          type: "Family Bunk Room",
          price: "$130",
          capacity: "4 guests",
          size: "28 m²",
        },
      ],
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    "villa-3": {
      id: "villa-3",
      name: "Limassol Beach Villa",
      location: "Limassol Coast, Cyprus",
      price: "$220",
      rating: 5.0,
      reviews: 42,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Beach Access",
        "Private Pool",
        "Jacuzzi",
        "Chef Services",
        "WiFi",
        "Gym Equipment",
        "Cinema Room",
      ],
      description:
        "Luxury beachfront villa with private chef services and direct beach access.",
      longDescription:
        "Experience ultimate luxury at this stunning beachfront villa in Limassol. With direct beach access, a private pool, and professional chef services, this property offers everything you need for an unforgettable vacation. The villa features modern design, premium finishes, and breathtaking sea views.",
      features: [
        "5 luxurious bedrooms with sea views",
        "Private beach access and sun deck",
        "Infinity pool with jacuzzi",
        "Home cinema with surround sound",
        "Fully equipped gym",
        "Professional chef services available",
        "Wine cellar and tasting room",
        "24/7 concierge service",
        "Private boat dock access",
        "Helicopter landing pad",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 60 days before check-in",
        pets: "No pets allowed",
        smoking: "No smoking policy",
      },
      contact: {
        phone: "+357 25 555666",
        email: "luxury@limassolbeachvilla.com",
        website: "www.limassolbeachvilla.com",
      },
      rooms: [
        {
          type: "Ocean Master Suite",
          price: "$220",
          capacity: "2 guests",
          size: "50 m²",
        },
        {
          type: "Beach View Suite",
          price: "$200",
          capacity: "2 guests",
          size: "40 m²",
        },
        {
          type: "Family Beach Room",
          price: "$190",
          capacity: "4 guests",
          size: "45 m²",
        },
        {
          type: "Garden Suite",
          price: "$180",
          capacity: "2 guests",
          size: "35 m²",
        },
        {
          type: "Penthouse Suite",
          price: "$250",
          capacity: "2 guests",
          size: "60 m²",
        },
      ],
      bedrooms: 5,
      bathrooms: 4,
      maxGuests: 10,
    },
    "villa-4": {
      id: "villa-4",
      name: "Ayia Napa Party Villa",
      location: "Ayia Napa, Cyprus",
      price: "$190",
      rating: 4.7,
      reviews: 156,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Nightlife Access",
        "Pool",
        "Bar Area",
        "WiFi",
        "DJ Equipment",
        "Dance Floor",
        "Sound System",
      ],
      description:
        "Modern villa in the heart of Ayia Napa's entertainment district.",
      longDescription:
        "Located in the vibrant heart of Ayia Napa, this modern villa is the perfect base for experiencing Cyprus's famous nightlife. With a private pool, bar area, and proximity to clubs and beaches, this property offers the ultimate party destination while maintaining luxury and comfort.",
      features: [
        "4 modern bedrooms with entertainment systems",
        "Large private pool with LED lighting",
        "Professional bar area with sound system",
        "Dance floor and DJ equipment",
        "Walking distance to Ayia Napa Strip",
        "Beach access within 5 minutes",
        "High-speed WiFi throughout",
        "Air conditioning in all rooms",
        "Daily cleaning service",
        "Party planning concierge",
      ],
      policies: {
        checkIn: "4:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "No pets allowed",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 23 777888",
        email: "party@ayianapavilla.com",
        website: "www.ayianapavilla.com",
      },
      rooms: [
        {
          type: "Party Master Suite",
          price: "$190",
          capacity: "2 guests",
          size: "35 m²",
        },
        {
          type: "VIP Guest Room",
          price: "$170",
          capacity: "2 guests",
          size: "30 m²",
        },
        {
          type: "Entertainment Room",
          price: "$160",
          capacity: "4 guests",
          size: "32 m²",
        },
        {
          type: "Pool View Room",
          price: "$150",
          capacity: "2 guests",
          size: "28 m²",
        },
      ],
      bedrooms: 4,
      bathrooms: 3,
      maxGuests: 8,
    },
    "villa-5": {
      id: "villa-5",
      name: "Traditional Cypriot Villa",
      location: "Nicosia Countryside, Cyprus",
      price: "$130",
      rating: 4.6,
      reviews: 38,
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Traditional Architecture",
        "Garden",
        "WiFi",
        "Parking",
        "Vineyard Views",
        "Stone Fireplace",
      ],
      description:
        "Authentic Cypriot villa with traditional architecture and modern comforts.",
      longDescription:
        "Experience the authentic charm of Cyprus in this beautifully restored traditional villa. Featuring original stone architecture, a lush garden, and modern amenities, this property offers a unique blend of historic character and contemporary comfort in the peaceful Nicosia countryside.",
      features: [
        "3 traditional bedrooms with stone walls",
        "Authentic stone fireplace in living room",
        "Large private garden with fruit trees",
        "Vineyard and mountain views",
        "Traditional Cypriot kitchen",
        "Restored stone architecture",
        "High-speed WiFi throughout",
        "Private parking for multiple vehicles",
        "Walking distance to village amenities",
        "Cultural tours can be arranged",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 21 days before check-in",
        pets: "Small pets allowed",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 22 333444",
        email: "traditional@cypriotvilla.com",
        website: "www.cypriotvilla.com",
      },
      rooms: [
        {
          type: "Traditional Master",
          price: "$130",
          capacity: "2 guests",
          size: "32 m²",
        },
        {
          type: "Garden View Room",
          price: "$120",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Family Stone Room",
          price: "$125",
          capacity: "4 guests",
          size: "35 m²",
        },
      ],
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    "villa-6": {
      id: "villa-6",
      name: "Kyrenia Castle View Villa",
      location: "Kyrenia Mountains, Cyprus",
      price: "$160",
      rating: 4.8,
      reviews: 73,
      images: [
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Castle View",
        "Terrace",
        "WiFi",
        "Barbecue",
        "Mountain Views",
        "Hiking Trails",
      ],
      description:
        "Villa with stunning views of Kyrenia Castle and private terrace.",
      longDescription:
        "Perched on the slopes of the Kyrenia Mountains, this villa offers breathtaking views of the historic Kyrenia Castle and the Mediterranean Sea. With a spacious terrace, barbecue area, and proximity to hiking trails, this property is perfect for those seeking both relaxation and adventure.",
      features: [
        "3 bedrooms with castle and sea views",
        "Large private terrace with dining area",
        "Built-in barbecue and outdoor kitchen",
        "Panoramic mountain and castle views",
        "Direct access to hiking trails",
        "Traditional stone architecture",
        "High-speed WiFi throughout",
        "Air conditioning in all rooms",
        "Daily housekeeping available",
        "Local guide services can be arranged",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 14 days before check-in",
        pets: "Pets are welcome",
        smoking: "Smoking allowed on terrace only",
      },
      contact: {
        phone: "+357 23 999000",
        email: "castle@kyreniavilla.com",
        website: "www.kyreniavilla.com",
      },
      rooms: [
        {
          type: "Castle View Master",
          price: "$160",
          capacity: "2 guests",
          size: "35 m²",
        },
        {
          type: "Mountain View Room",
          price: "$150",
          capacity: "2 guests",
          size: "30 m²",
        },
        {
          type: "Terrace Suite",
          price: "$155",
          capacity: "2 guests",
          size: "32 m²",
        },
      ],
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
  };

  const villa = villaDetails[villaId as keyof typeof villaDetails];

  if (!villa) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Villa Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The villa you're looking for doesn't exist.
          </p>
          <Link
            href="/accommodations/villas"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Villas
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
      case "pool":
      case "private pool":
        return <HomeIcon className="w-5 h-5" />;
      case "chef":
      case "barbecue":
        return <CakeIcon className="w-5 h-5" />;
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
              href="/accommodations/villas"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Villas
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
          src={villa.images[selectedImage]}
          alt={villa.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {villa.images.map((_, index) => (
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
            {villa.images.map((image, index) => (
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
                  alt={`${villa.name} ${index + 1}`}
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
                    {villa.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="w-5 h-5 mr-1" />
                    <span>{villa.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{villa.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({villa.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <BuildingStorefrontIcon className="w-5 h-5 mr-1" />
                      <span>
                        {villa.bedrooms} BR • {villa.bathrooms} BA • Up to{" "}
                        {villa.maxGuests} guests
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-600">
                    {villa.price}
                  </div>
                  <div className="text-gray-500">per night</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Villa
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {villa.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {villa.longDescription}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {villa.amenities.map((amenity) => (
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
                Villa Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {villa.features.map((feature, index) => (
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
                {villa.rooms.map((room, index) => (
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
                    <option>5 Guests</option>
                    <option>6 Guests</option>
                    <option>7 Guests</option>
                    <option>8 Guests</option>
                    <option>9 Guests</option>
                    <option>10 Guests</option>
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
                Villa Policies
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-in</div>
                    <div className="text-sm text-gray-600">
                      {villa.policies.checkIn}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-out</div>
                    <div className="text-sm text-gray-600">
                      {villa.policies.checkOut}
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">
                    Cancellation
                  </div>
                  <div className="text-sm text-gray-600">
                    {villa.policies.cancellation}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Pets</div>
                  <div className="text-sm text-gray-600">
                    {villa.policies.pets}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Smoking</div>
                  <div className="text-sm text-gray-600">
                    {villa.policies.smoking}
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
                    {villa.contact.phone}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    {villa.contact.email}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <a
                    href={`https://${villa.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-600 hover:text-cyan-700"
                  >
                    {villa.contact.website}
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

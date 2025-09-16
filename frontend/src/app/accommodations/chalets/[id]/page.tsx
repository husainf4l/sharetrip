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

interface Chalet {
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

export default function ChaletDetailPage() {
  const params = useParams();
  const chaletId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Extended chalet data with more details
  const chaletDetails = {
    "chalet-1": {
      id: "chalet-1",
      name: "Troodos Pine Forest Chalet",
      location: "Troodos Mountains, Cyprus",
      price: "$120",
      rating: 4.8,
      reviews: 45,
      images: [
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Fireplace",
        "Forest View",
        "Hot Tub",
        "WiFi",
        "Air Conditioning",
        "Fully Equipped Kitchen",
        "Terrace",
        "BBQ Area",
        "Mountain Hiking Trails",
        "Wood Stove",
      ],
      description:
        "Cozy wooden chalet surrounded by pine forests in the Troodos Mountains.",
      longDescription:
        "Nestled deep within the ancient pine forests of the Troodos Mountains, this charming wooden chalet offers the perfect mountain retreat. Built with traditional Cypriot architecture and modern comforts, this chalet provides breathtaking views of the surrounding forest and mountain peaks. The interior features warm wooden beams, a cozy fireplace, and large windows that frame the natural beauty outside. Perfect for nature lovers, hikers, and those seeking a peaceful mountain escape.",
      features: [
        "Authentic wooden construction",
        "Panoramic forest and mountain views",
        "Traditional Cypriot stone fireplace",
        "Private hot tub with mountain views",
        "Direct access to hiking trails",
        "Fully equipped modern kitchen",
        "Large terrace with BBQ area",
        "Wood stove for cozy evenings",
        "Peaceful forest surroundings",
        "Mountain air and tranquility",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the chalet",
      },
      contact: {
        phone: "+357 22 123 456",
        email: "info@troodoschalets.com",
        website: "troodoschalets.com",
      },
      rooms: [
        {
          type: "Master Bedroom",
          price: "$120",
          capacity: "2 guests",
          size: "25 m²",
        },
        {
          type: "Living Area with Fireplace",
          price: "Included",
          capacity: "4 guests",
          size: "35 m²",
        },
      ],
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    "chalet-2": {
      id: "chalet-2",
      name: "Mountain View Chalet",
      location: "Platres, Cyprus",
      price: "$140",
      rating: 4.7,
      reviews: 38,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Mountain View",
        "Fireplace",
        "Terrace",
        "WiFi",
        "Hot Tub",
        "Kitchen",
        "BBQ Area",
        "Hiking Access",
      ],
      description:
        "Rustic chalet with breathtaking mountain views and traditional Cypriot architecture.",
      longDescription:
        "Experience the majesty of Cyprus mountains from this beautifully crafted chalet in Platres. With panoramic views of the surrounding peaks and valleys, this traditional stone and wood chalet offers the perfect blend of rustic charm and modern comfort. The large terrace provides an ideal spot for morning coffee while watching the sunrise over the mountains.",
      features: [
        "Panoramic mountain views",
        "Traditional stone and wood construction",
        "Large terrace with mountain views",
        "Cozy fireplace for mountain evenings",
        "Hot tub with mountain scenery",
        "Fully equipped kitchen",
        "BBQ area for outdoor dining",
        "Direct hiking trail access",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the chalet",
      },
      contact: {
        phone: "+357 22 234 567",
        email: "bookings@platreschalets.com",
        website: "platreschalets.com",
      },
      rooms: [
        {
          type: "Master Bedroom",
          price: "$140",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Guest Bedroom",
          price: "Included",
          capacity: "2 guests",
          size: "20 m²",
        },
      ],
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    "chalet-3": {
      id: "chalet-3",
      name: "Cedar Wood Chalet",
      location: "Kakopetria, Cyprus",
      price: "$110",
      rating: 4.6,
      reviews: 29,
      images: [
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Cedar Interior",
        "Garden",
        "Fireplace",
        "WiFi",
        "Kitchen",
        "Terrace",
        "Mountain Views",
      ],
      description:
        "Beautiful cedar wood chalet in a peaceful village setting with mountain access.",
      longDescription:
        "Discover the charm of traditional Cypriot village life in this beautifully crafted cedar wood chalet. Located in the picturesque village of Kakopetria, this chalet combines authentic mountain architecture with modern amenities. The cedar wood interior creates a warm, inviting atmosphere perfect for mountain getaways.",
      features: [
        "Authentic cedar wood construction",
        "Traditional village architecture",
        "Peaceful mountain village setting",
        "Cozy fireplace with cedar mantel",
        "Private garden with mountain views",
        "Fully equipped kitchen",
        "Large terrace for outdoor living",
        "Walking distance to village amenities",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the chalet",
      },
      contact: {
        phone: "+357 22 345 678",
        email: "info@kakopetriachalets.com",
        website: "kakopetriachalets.com",
      },
      rooms: [
        {
          type: "Master Bedroom",
          price: "$110",
          capacity: "2 guests",
          size: "24 m²",
        },
        {
          type: "Living Area",
          price: "Included",
          capacity: "2 guests",
          size: "30 m²",
        },
      ],
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    "chalet-4": {
      id: "chalet-4",
      name: "Alpine Style Chalet",
      location: "Troodos National Park, Cyprus",
      price: "$160",
      rating: 4.9,
      reviews: 52,
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Alpine Design",
        "Hot Tub",
        "Fireplace",
        "Hiking Trails",
        "WiFi",
        "Kitchen",
        "Terrace",
        "Mountain Views",
      ],
      description:
        "Modern alpine-style chalet with hot tub and direct access to hiking trails.",
      longDescription:
        "Experience the ultimate mountain luxury in this stunning alpine-style chalet located within Troodos National Park. With its modern alpine architecture, private hot tub, and direct access to some of Cyprus's most beautiful hiking trails, this chalet offers the perfect combination of luxury and adventure.",
      features: [
        "Modern alpine architecture",
        "Private hot tub with mountain views",
        "Direct access to hiking trails",
        "Floor-to-ceiling windows with panoramic views",
        "Cozy fireplace with stone surround",
        "Fully equipped gourmet kitchen",
        "Large deck with BBQ area",
        "Surrounded by national park wilderness",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the chalet",
      },
      contact: {
        phone: "+357 22 456 789",
        email: "reservations@alpinechalets.com",
        website: "alpinechalets.com",
      },
      rooms: [
        {
          type: "Master Suite",
          price: "$160",
          capacity: "2 guests",
          size: "32 m²",
        },
        {
          type: "Guest Bedroom",
          price: "Included",
          capacity: "2 guests",
          size: "22 m²",
        },
        {
          type: "Living Area",
          price: "Included",
          capacity: "2 guests",
          size: "40 m²",
        },
      ],
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
    "chalet-5": {
      id: "chalet-5",
      name: "Traditional Stone Chalet",
      location: "Pitsilia Region, Cyprus",
      price: "$130",
      rating: 4.5,
      reviews: 34,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Stone Architecture",
        "Garden",
        "WiFi",
        "Kitchen",
        "Fireplace",
        "BBQ Area",
        "Mountain Views",
      ],
      description:
        "Traditional stone chalet blending local architecture with modern comforts.",
      longDescription:
        "Immerse yourself in the rich architectural heritage of Cyprus in this beautifully restored traditional stone chalet. Located in the picturesque Pitsilia region, this chalet combines authentic stone construction with modern amenities, creating a unique blend of traditional charm and contemporary comfort.",
      features: [
        "Authentic traditional stone construction",
        "Restored with modern amenities",
        "Located in historic Pitsilia region",
        "Cozy fireplace with stone surround",
        "Private garden with mountain views",
        "Traditional wooden beamed ceilings",
        "Modern kitchen in rustic setting",
        "BBQ area for traditional Cypriot dining",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the chalet",
      },
      contact: {
        phone: "+357 22 567 890",
        email: "info@pitsiliachalets.com",
        website: "pitsiliachalets.com",
      },
      rooms: [
        {
          type: "Master Bedroom",
          price: "$130",
          capacity: "2 guests",
          size: "26 m²",
        },
        {
          type: "Living Area",
          price: "Included",
          capacity: "2 guests",
          size: "32 m²",
        },
      ],
      bedrooms: 2,
      bathrooms: 1,
      maxGuests: 4,
    },
    "chalet-6": {
      id: "chalet-6",
      name: "Forest Edge Chalet",
      location: "Olympus Mountain, Cyprus",
      price: "$150",
      rating: 4.7,
      reviews: 41,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1501183638710-841dd1904471?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Forest Views",
        "Terrace",
        "Fireplace",
        "WiFi",
        "Kitchen",
        "Hot Tub",
        "Mountain Access",
      ],
      description:
        "Charming chalet at the edge of the forest with panoramic mountain views.",
      longDescription:
        "Perched at the edge of ancient forests on Olympus Mountain, this charming chalet offers the perfect blend of wilderness and comfort. With panoramic views of the surrounding mountains and direct access to forest trails, this chalet provides an authentic mountain experience while maintaining all modern comforts.",
      features: [
        "Located at forest edge with mountain views",
        "Direct access to forest trails",
        "Panoramic mountain vistas",
        "Cozy fireplace for forest evenings",
        "Large terrace overlooking wilderness",
        "Hot tub with forest views",
        "Fully equipped kitchen",
        "Surrounded by natural beauty",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        pets: "Pets allowed with prior approval",
        smoking: "No smoking inside the chalet",
      },
      contact: {
        phone: "+357 22 678 901",
        email: "bookings@olympuschalets.com",
        website: "olympuschalets.com",
      },
      rooms: [
        {
          type: "Master Bedroom",
          price: "$150",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Guest Bedroom",
          price: "Included",
          capacity: "2 guests",
          size: "24 m²",
        },
        {
          type: "Living Area",
          price: "Included",
          capacity: "2 guests",
          size: "36 m²",
        },
      ],
      bedrooms: 3,
      bathrooms: 2,
      maxGuests: 6,
    },
  };

  const chalet = chaletDetails[chaletId as keyof typeof chaletDetails];

  if (!chalet) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Chalet Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The chalet you're looking for doesn't exist.
          </p>
          <Link
            href="/accommodations/chalets"
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Chalets
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
              href="/accommodations/chalets"
              className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Chalets
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
          src={chalet.images[selectedImage]}
          alt={chalet.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

        {/* Image Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {chalet.images.map((_, index) => (
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
          {chalet.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${
                selectedImage === index ? "border-white" : "border-white/50"
              }`}
            >
              <Image
                src={image}
                alt={`${chalet.name} ${index + 1}`}
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
                {chalet.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <MapPinIcon className="w-5 h-5 text-gray-400 mr-1" />
                  <span className="text-gray-600">{chalet.location}</span>
                </div>
                <div className="flex items-center">
                  <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{chalet.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({chalet.reviews} reviews)
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <HomeIcon className="w-5 h-5 text-emerald-600" />
                <span className="text-emerald-600 font-medium">
                  Mountain Chalet
                </span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                About This Chalet
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                {chalet.longDescription}
              </p>
            </div>

            {/* Features */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Chalet Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {chalet.features.map((feature, index) => (
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
                {chalet.amenities.map((amenity, index) => (
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
                {chalet.rooms.map((room, index) => (
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
                Chalet Policies
              </h2>
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Check-in</div>
                      <div className="text-gray-600">
                        {chalet.policies.checkIn}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <ClockIcon className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Check-out</div>
                      <div className="text-gray-600">
                        {chalet.policies.checkOut}
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
                        {chalet.policies.cancellation}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <SparklesIcon className="w-5 h-5 text-emerald-600 mr-3" />
                    <div>
                      <div className="font-medium text-gray-900">Pets</div>
                      <div className="text-gray-600">
                        {chalet.policies.pets}
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
                  {chalet.price}
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
                    {[1, 2, 3, 4, 5, 6].map((num) => (
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
                <div className="text-gray-600">{chalet.contact.phone}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <EnvelopeIcon className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="font-medium text-gray-900">Email</div>
                <div className="text-gray-600">{chalet.contact.email}</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <GlobeAltIcon className="w-6 h-6 text-emerald-600" />
              <a
                href={`https://${chalet.contact.website}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                <div className="font-medium text-gray-900">Website</div>
                <div>{chalet.contact.website}</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

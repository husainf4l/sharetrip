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

export default function VacationHomeDetailPage() {
  const params = useParams();
  const vacationHomeId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  // Mock data for vacation homes - in a real app, this would come from an API
  const vacationHomeData = {
    "vh-1": {
      id: "vh-1",
      name: "Mediterranean Villa Retreat",
      location: "Paphos Coast, Cyprus",
      price: "$200",
      rating: 4.9,
      reviews: 156,
      images: [
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Experience luxury living in this stunning Mediterranean villa overlooking the crystal-clear waters of the Paphos coast. This spacious 4-bedroom retreat features modern amenities combined with traditional Cypriot architecture. Wake up to breathtaking sea views and enjoy the private infinity pool while the sun sets over the horizon.",
      amenities: [
        "Private Pool",
        "Sea Views",
        "Full Kitchen",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Garden",
        "BBQ Area",
        "Jacuzzi",
      ],
      features: [
        "Infinity pool with sea views",
        "Modern kitchen with island",
        "Master suite with balcony",
        "Traditional stone architecture",
        "Landscaped Mediterranean garden",
        "Outdoor dining area",
        "Sun terrace with loungers",
        "Private driveway parking",
      ],
      policies: {
        checkIn: "4:00 PM - 8:00 PM",
        checkOut: "Until 10:00 AM",
        cancellation: "Free cancellation up to 30 days before check-in",
        children: "Children welcome",
        pets: "Small pets allowed with prior arrangement",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 123 456",
        email: "info@mediterraneanvilla.com",
        address: "Coastal Road 25, Paphos Coast, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Master Suite",
          price: "$200",
          capacity: 2,
          size: "35 m²",
          bed: "King Size Bed",
          amenities: [
            "Sea View",
            "Private Bathroom",
            "Balcony",
            "Walk-in Closet",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Guest Bedroom",
          price: "$150",
          capacity: 2,
          size: "28 m²",
          bed: "Queen Size Bed",
          amenities: ["Garden View", "Private Bathroom", "Air Conditioning"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
        {
          id: "room-3",
          name: "Twin Room",
          price: "$130",
          capacity: 2,
          size: "25 m²",
          bed: "2 Single Beds",
          amenities: ["Mountain View", "Shared Bathroom", "Air Conditioning"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-4",
          name: "Family Suite",
          price: "$180",
          capacity: 4,
          size: "45 m²",
          bed: "King Bed + 2 Singles",
          amenities: [
            "Sea View",
            "Private Bathroom",
            "Sitting Area",
            "Mini Fridge",
          ],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Maria & George",
        image:
          "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
        rating: 4.9,
        reviews: 234,
        responseTime: "within an hour",
        languages: ["English", "Greek", "German"],
      },
    },
    "vh-2": {
      id: "vh-2",
      name: "Mountain Family Home",
      location: "Troodos Mountains, Cyprus",
      price: "$150",
      rating: 4.8,
      reviews: 89,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Nestled in the heart of the Troodos Mountains, this charming family home offers the perfect mountain retreat. Surrounded by pine forests and mountain trails, this traditional stone house has been lovingly restored while maintaining its authentic character. Enjoy cozy evenings by the fireplace and breathtaking mountain views from every room.",
      amenities: [
        "Fireplace",
        "Mountain Views",
        "Large Garden",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Kitchen",
        "Terrace",
        "Hiking Trails",
      ],
      features: [
        "Stone fireplace in living room",
        "Large landscaped garden",
        "Mountain hiking trails",
        "Traditional wooden beams",
        "Fully equipped kitchen",
        "Spacious terrace",
        "Pine forest surroundings",
        "Authentic mountain architecture",
      ],
      policies: {
        checkIn: "3:00 PM - 7:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 14 days before check-in",
        children: "Children welcome",
        pets: "Pets allowed with prior arrangement",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 234 567",
        email: "stay@mountainhome.com",
        address: "Forest Path 12, Troodos Mountains, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Master Bedroom",
          price: "$150",
          capacity: 2,
          size: "30 m²",
          bed: "Queen Size Bed",
          amenities: ["Mountain View", "Private Bathroom", "Fireplace"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Children's Room",
          price: "$100",
          capacity: 2,
          size: "22 m²",
          bed: "2 Single Beds",
          amenities: ["Forest View", "Shared Bathroom", "Bunk Beds"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
        {
          id: "room-3",
          name: "Guest Room",
          price: "$120",
          capacity: 2,
          size: "25 m²",
          bed: "Double Bed",
          amenities: ["Garden View", "Private Bathroom", "Air Conditioning"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Elena",
        image:
          "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviews: 145,
        responseTime: "within 2 hours",
        languages: ["English", "Greek"],
      },
    },
    "vh-3": {
      id: "vh-3",
      name: "Beachfront Vacation Home",
      location: "Ayia Napa, Cyprus",
      price: "$250",
      rating: 5.0,
      reviews: 203,
      images: [
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Luxury meets paradise in this stunning beachfront vacation home in the heart of Ayia Napa. With direct beach access and floor-to-ceiling windows offering panoramic Mediterranean views, this modern architectural masterpiece features an infinity pool that blends seamlessly with the sea. Experience the ultimate beach lifestyle with premium amenities and world-class service.",
      amenities: [
        "Beach Access",
        "Jacuzzi",
        "Chef Kitchen",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Pool",
        "Gym",
        "Spa Access",
      ],
      features: [
        "Direct beach access",
        "Infinity pool overlooking sea",
        "Floor-to-ceiling windows",
        "Professional chef's kitchen",
        "Private spa facilities",
        "Fitness center",
        "Concierge service",
        "Beachfront location",
      ],
      policies: {
        checkIn: "4:00 PM - 9:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 30 days before check-in",
        children: "Children 8+ welcome",
        pets: "No pets allowed",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 345 678",
        email: "reservations@beachfrontvilla.com",
        address: "Beachfront Avenue 1, Ayia Napa, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Ocean Master Suite",
          price: "$250",
          capacity: 2,
          size: "50 m²",
          bed: "King Size Bed",
          amenities: [
            "Ocean View",
            "Private Bathroom",
            "Jacuzzi",
            "Walk-in Closet",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Beach View Room",
          price: "$200",
          capacity: 2,
          size: "40 m²",
          bed: "Queen Size Bed",
          amenities: ["Beach View", "Private Bathroom", "Balcony", "Mini Bar"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
        {
          id: "room-3",
          name: "Garden Suite",
          price: "$180",
          capacity: 2,
          size: "35 m²",
          bed: "Queen Size Bed",
          amenities: [
            "Garden View",
            "Private Bathroom",
            "Terrace",
            "Sitting Area",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-4",
          name: "Family Beach Room",
          price: "$220",
          capacity: 4,
          size: "55 m²",
          bed: "King Bed + Sofa Bed",
          amenities: [
            "Beach View",
            "Private Bathroom",
            "Kitchenette",
            "Balcony",
          ],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
        {
          id: "room-5",
          name: "Luxury Penthouse",
          price: "$300",
          capacity: 2,
          size: "70 m²",
          bed: "King Size Bed",
          amenities: [
            "Panoramic View",
            "Private Bathroom",
            "Private Terrace",
            "Jacuzzi",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Sophia & Dimitri",
        image:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5.0,
        reviews: 312,
        responseTime: "within 30 minutes",
        languages: ["English", "Greek", "Russian", "French"],
      },
    },
    "vh-4": {
      id: "vh-4",
      name: "Traditional Stone House",
      location: "Omodos Village, Cyprus",
      price: "$120",
      rating: 4.7,
      reviews: 67,
      images: [
        "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Step back in time in this beautifully preserved traditional stone house in the historic village of Omodos. Built in the 19th century using local stone and featuring original wooden beams and terracotta floors, this vacation home offers an authentic glimpse into Cyprus's rich architectural heritage. The surrounding vineyards and olive groves provide a peaceful countryside setting.",
      amenities: [
        "Traditional Architecture",
        "Vineyard Views",
        "Fireplace",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Garden",
        "Terrace",
        "Local Wine Cellar",
      ],
      features: [
        "19th century stone construction",
        "Original wooden beams",
        "Terracotta floors",
        "Traditional fireplace",
        "Vineyard and olive grove views",
        "Authentic village location",
        "Local wine tasting available",
        "Walking distance to tavernas",
      ],
      policies: {
        checkIn: "3:00 PM - 7:00 PM",
        checkOut: "Until 11:00 AM",
        cancellation: "Free cancellation up to 7 days before check-in",
        children: "Children welcome",
        pets: "Small pets allowed",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 456 789",
        email: "welcome@omodoshouse.com",
        address: "Main Square 8, Omodos Village, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Traditional Master Room",
          price: "$120",
          capacity: 2,
          size: "32 m²",
          bed: "Queen Size Bed",
          amenities: ["Vineyard View", "Private Bathroom", "Fireplace"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Heritage Room",
          price: "$100",
          capacity: 2,
          size: "28 m²",
          bed: "Double Bed",
          amenities: ["Garden View", "Shared Bathroom", "Original Features"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
        {
          id: "room-3",
          name: "Family Heritage Suite",
          price: "$140",
          capacity: 4,
          size: "45 m²",
          bed: "Queen Bed + 2 Singles",
          amenities: ["Vineyard View", "Private Bathroom", "Sitting Area"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Christos",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4.7,
        reviews: 98,
        responseTime: "within 3 hours",
        languages: ["English", "Greek"],
      },
    },
    "vh-5": {
      id: "vh-5",
      name: "Modern City Apartment",
      location: "Nicosia Center, Cyprus",
      price: "$100",
      rating: 4.6,
      reviews: 134,
      images: [
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
      ],
      description:
        "Experience modern city living in this stylish apartment in the heart of Nicosia. Perfectly located for exploring the city's historic sites, shopping districts, and vibrant nightlife, this contemporary space combines urban convenience with comfortable living. The open-plan design and modern amenities make it ideal for both business and leisure travelers.",
      amenities: [
        "City Center",
        "Modern Kitchen",
        "Balcony",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "Gym Access",
        "Concierge",
        "Laundry",
      ],
      features: [
        "Heart of Nicosia location",
        "Modern open-plan design",
        "Fully equipped kitchen",
        "Private balcony with city views",
        "Walking distance to attractions",
        "Secure underground parking",
        "24/7 concierge service",
        "Access to building gym",
      ],
      policies: {
        checkIn: "2:00 PM - 10:00 PM",
        checkOut: "Until 12:00 PM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        children: "Children welcome",
        pets: "No pets allowed",
        smoking: "No smoking indoors",
      },
      contact: {
        phone: "+357 99 567 890",
        email: "info@nicosiaapartment.com",
        address: "City Center Plaza 15, Nicosia, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "City View Master",
          price: "$100",
          capacity: 2,
          size: "35 m²",
          bed: "Queen Size Bed",
          amenities: [
            "City View",
            "Private Bathroom",
            "Balcony",
            "Walk-in Closet",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Compact Room",
          price: "$80",
          capacity: 1,
          size: "20 m²",
          bed: "Single Bed",
          amenities: ["City View", "Shared Bathroom", "Work Desk"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Anna",
        image:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        rating: 4.6,
        reviews: 187,
        responseTime: "within 1 hour",
        languages: ["English", "Greek", "Turkish"],
      },
    },
    "vh-6": {
      id: "vh-6",
      name: "Countryside Estate",
      location: "Pitsilia Region, Cyprus",
      price: "$180",
      rating: 4.8,
      reviews: 78,
      images: [
        "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      ],
      description:
        "Escape to paradise in this magnificent countryside estate nestled in the picturesque Pitsilia region. This spacious property offers the ultimate family vacation experience with multiple bedrooms, a private pool, and acres of beautiful landscaped gardens. Surrounded by olive groves and vineyards, it's the perfect setting for large groups, family reunions, or special celebrations.",
      amenities: [
        "Large Garden",
        "Pool",
        "Multiple Bedrooms",
        "WiFi",
        "Air Conditioning",
        "Heating",
        "Parking",
        "BBQ Area",
        "Kitchen",
        "Games Room",
      ],
      features: [
        "6 spacious bedrooms",
        "Private swimming pool",
        "Large landscaped gardens",
        "Olive grove and vineyard views",
        "Outdoor BBQ and dining area",
        "Games room with pool table",
        "Fully equipped modern kitchen",
        "Multiple living areas",
      ],
      policies: {
        checkIn: "4:00 PM - 8:00 PM",
        checkOut: "Until 12:00 PM",
        cancellation: "Free cancellation up to 30 days before check-in",
        children: "Children welcome",
        pets: "Pets allowed with prior arrangement",
        smoking: "Smoking allowed outdoors only",
      },
      contact: {
        phone: "+357 99 678 901",
        email: "bookings@countrysideestate.com",
        address: "Countryside Lane 3, Pitsilia Region, Cyprus",
      },
      rooms: [
        {
          id: "room-1",
          name: "Master Suite",
          price: "$180",
          capacity: 2,
          size: "40 m²",
          bed: "King Size Bed",
          amenities: [
            "Garden View",
            "Private Bathroom",
            "Balcony",
            "Sitting Area",
          ],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-2",
          name: "Family Room 1",
          price: "$150",
          capacity: 4,
          size: "35 m²",
          bed: "Queen Bed + 2 Singles",
          amenities: ["Garden View", "Private Bathroom", "Air Conditioning"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
        {
          id: "room-3",
          name: "Family Room 2",
          price: "$150",
          capacity: 4,
          size: "35 m²",
          bed: "Queen Bed + 2 Singles",
          amenities: ["Pool View", "Private Bathroom", "Air Conditioning"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-4",
          name: "Twin Room 1",
          price: "$120",
          capacity: 2,
          size: "25 m²",
          bed: "2 Single Beds",
          amenities: ["Garden View", "Shared Bathroom", "Air Conditioning"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
        {
          id: "room-5",
          name: "Twin Room 2",
          price: "$120",
          capacity: 2,
          size: "25 m²",
          bed: "2 Single Beds",
          amenities: ["Garden View", "Shared Bathroom", "Air Conditioning"],
          image:
            "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=300&fit=crop",
        },
        {
          id: "room-6",
          name: "Guest Suite",
          price: "$160",
          capacity: 2,
          size: "30 m²",
          bed: "Queen Size Bed",
          amenities: ["Vineyard View", "Private Bathroom", "Sitting Area"],
          image:
            "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        },
      ],
      host: {
        name: "Family Papadopoulos",
        image:
          "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
        rating: 4.8,
        reviews: 156,
        responseTime: "within 2 hours",
        languages: ["English", "Greek"],
      },
    },
  };

  const vacationHome =
    vacationHomeData[vacationHomeId as keyof typeof vacationHomeData];

  if (!vacationHome) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Vacation Home Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The vacation home you're looking for doesn't exist.
          </p>
          <Link
            href="/accommodations/vacation-homes"
            className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Vacation Homes
          </Link>
        </div>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === vacationHome.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? vacationHome.images.length - 1 : prev - 1
    );
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
      case "kitchen":
      case "full kitchen":
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
              href="/accommodations/vacation-homes"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Vacation Homes
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
          src={vacationHome.images[currentImageIndex]}
          alt={vacationHome.name}
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
          {vacationHome.images.map((_, index) => (
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
            {vacationHome.images.map((image, index) => (
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
                  alt={`${vacationHome.name} ${index + 1}`}
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
                {vacationHome.name}
              </h1>
              <div className="flex items-center mb-4">
                <MapPinIcon className="w-5 h-5 text-gray-400 mr-1" />
                <span className="text-gray-600">{vacationHome.location}</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="font-semibold">{vacationHome.rating}</span>
                  <span className="text-gray-500 ml-1">
                    ({vacationHome.reviews} reviews)
                  </span>
                </div>
                <div className="text-2xl font-bold text-gray-900">
                  {vacationHome.price}
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
                About This Vacation Home
              </h2>
              <p className="text-gray-700 leading-relaxed">
                {vacationHome.description}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {vacationHome.amenities.map((amenity) => (
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
                {vacationHome.features.map((feature) => (
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
                {vacationHome.rooms.map((room) => (
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
                    src={vacationHome.host.image}
                    alt={vacationHome.host.name}
                    width={80}
                    height={80}
                    className="rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {vacationHome.host.name}
                    </h3>
                    <div className="flex items-center mb-3">
                      <StarSolidIcon className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="font-medium">
                        {vacationHome.host.rating}
                      </span>
                      <span className="text-gray-500 ml-1">
                        ({vacationHome.host.reviews} reviews)
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">
                      Responds {vacationHome.host.responseTime}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {vacationHome.host.languages.map((language) => (
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
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl">
                Book Now - {vacationHome.price}
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
                  <ClockIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Check-in</h4>
                    <p className="text-sm text-gray-600">
                      {vacationHome.policies.checkIn}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Check-out</h4>
                    <p className="text-sm text-gray-600">
                      {vacationHome.policies.checkOut}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <XMarkIcon className="w-5 h-5 text-gray-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-gray-900">Cancellation</h4>
                    <p className="text-sm text-gray-600">
                      {vacationHome.policies.cancellation}
                    </p>
                  </div>
                </div>
                <div className="border-t pt-4 space-y-3">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Additional Policies
                    </h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {vacationHome.policies.children}</li>
                      <li>• {vacationHome.policies.pets}</li>
                      <li>• {vacationHome.policies.smoking}</li>
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
                      {vacationHome.contact.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Email</h4>
                    <p className="text-sm text-gray-600">
                      {vacationHome.contact.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPinIcon className="w-5 h-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium text-gray-900">Address</h4>
                    <p className="text-sm text-gray-600">
                      {vacationHome.contact.address}
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

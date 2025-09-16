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
} from "@heroicons/react/24/outline";
import {
  HeartIcon as HeartSolidIcon,
  StarIcon as StarSolidIcon,
} from "@heroicons/react/24/solid";

export default function HotelDetailPage() {
  const params = useParams();
  const hotelId = params?.id as string;
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);

  // Extended hotel data with more details
  const hotelDetails = {
    "hotel-1": {
      id: "hotel-1",
      name: "Grand Cyprus Hotel",
      location: "Nicosia, Cyprus",
      price: "$120",
      rating: 4.8,
      reviews: 1247,
      images: [
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Free WiFi",
        "Outdoor Pool",
        "Restaurant",
        "Free Parking",
        "Fitness Center",
        "Spa",
        "Room Service",
        "Concierge",
      ],
      description:
        "Luxury hotel in the heart of Nicosia with modern amenities and traditional Cypriot hospitality. Experience world-class service in our elegantly designed rooms and suites.",
      longDescription:
        "The Grand Cyprus Hotel stands as Nicosia's premier luxury accommodation, seamlessly blending contemporary design with traditional Cypriot elements. Our 150 elegantly appointed rooms and suites offer stunning city views, premium bedding, and state-of-the-art amenities. The hotel features multiple dining options, a rejuvenating spa, and a fitness center. Our central location provides easy access to Nicosia's historic sites, shopping districts, and business centers.",
      features: [
        "150 spacious rooms and suites",
        "Panoramic city views",
        "24-hour room service",
        "Business center with meeting rooms",
        "Valet parking service",
        "Laundry and dry cleaning",
        "Currency exchange",
        "Airport shuttle (surcharge)",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        pets: "Pets are not allowed",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 22 123456",
        email: "reservations@grandcyprushotel.com",
        website: "www.grandcyprushotel.com",
      },
      rooms: [
        {
          type: "Standard Room",
          price: "$120",
          capacity: "2 guests",
          size: "25 m²",
        },
        {
          type: "Deluxe Room",
          price: "$150",
          capacity: "2 guests",
          size: "32 m²",
        },
        {
          type: "Executive Suite",
          price: "$220",
          capacity: "4 guests",
          size: "55 m²",
        },
        {
          type: "Presidential Suite",
          price: "$350",
          capacity: "6 guests",
          size: "85 m²",
        },
      ],
    },
    "hotel-2": {
      id: "hotel-2",
      name: "Limassol Beach Resort",
      location: "Limassol, Cyprus",
      price: "$95",
      rating: 4.6,
      reviews: 892,
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Beach Access",
        "Spa",
        "Gym",
        "Bar",
        "Restaurant",
        "Pool",
        "Water Sports",
        "Kids Club",
      ],
      description:
        "Beachfront resort offering stunning Mediterranean views and world-class facilities. Perfect for families and couples seeking relaxation.",
      longDescription:
        "Limassol Beach Resort is your gateway to paradise on Cyprus's sunny south coast. Our beachfront location offers direct access to golden sands and crystal-clear waters. With 200 rooms featuring private balconies, multiple swimming pools, and extensive recreational facilities, this resort caters to all ages. Enjoy water sports, spa treatments, and themed dining experiences.",
      features: [
        "200 beachfront rooms",
        "Private beach access",
        "3 swimming pools",
        "Water sports center",
        "Children's playground and club",
        "Tennis courts",
        "Mini-market",
        "Car rental service",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Small pets allowed (surcharge)",
        smoking: "Designated smoking areas",
      },
      contact: {
        phone: "+357 25 123456",
        email: "info@limassolbeachresort.com",
        website: "www.limassolbeachresort.com",
      },
      rooms: [
        {
          type: "Garden View Room",
          price: "$95",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Sea View Room",
          price: "$115",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Family Suite",
          price: "$160",
          capacity: "4 guests",
          size: "45 m²",
        },
        {
          type: "Beachfront Villa",
          price: "$250",
          capacity: "6 guests",
          size: "75 m²",
        },
      ],
    },
    "hotel-3": {
      id: "hotel-3",
      name: "Paphos Heritage Hotel",
      location: "Paphos, Cyprus",
      price: "$85",
      rating: 4.7,
      reviews: 654,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Historic",
        "Garden",
        "Breakfast",
        "WiFi",
        "Restaurant",
        "Bar",
        "Library",
        "Museum Access",
      ],
      description:
        "Charming hotel combining modern comfort with traditional Cypriot architecture. UNESCO World Heritage site nearby.",
      longDescription:
        "Nestled in the historic heart of Paphos, this boutique hotel preserves the architectural charm of traditional Cypriot design while offering modern comforts. Our intimate property features only 45 rooms, ensuring personalized service. The hotel's proximity to UNESCO World Heritage sites makes it ideal for cultural explorers.",
      features: [
        "45 heritage-style rooms",
        "Traditional Cypriot architecture",
        "UNESCO site proximity",
        "Heritage library",
        "Local art collection",
        "Guided tours available",
        "Traditional breakfast",
        "Airport transfer",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 72 hours before check-in",
        pets: "Pets are not allowed",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 26 123456",
        email: "stay@paphosheritage.com",
        website: "www.paphosheritage.com",
      },
      rooms: [
        {
          type: "Heritage Room",
          price: "$85",
          capacity: "2 guests",
          size: "22 m²",
        },
        {
          type: "Garden Suite",
          price: "$110",
          capacity: "2 guests",
          size: "30 m²",
        },
        {
          type: "Family Heritage Room",
          price: "$130",
          capacity: "4 guests",
          size: "35 m²",
        },
      ],
    },
    "hotel-4": {
      id: "hotel-4",
      name: "Ayia Napa Luxury Suites",
      location: "Ayia Napa, Cyprus",
      price: "$150",
      rating: 4.9,
      reviews: 2156,
      images: [
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Ocean View",
        "Spa",
        "Fine Dining",
        "Concierge",
        "Private Beach",
        "Butler Service",
        "Helipad",
        "Marina",
      ],
      description:
        "Ultra-luxury suites with panoramic sea views and personalized service. Experience the pinnacle of Mediterranean hospitality.",
      longDescription:
        "Ayia Napa Luxury Suites represents the epitome of luxury accommodation in Cyprus. Each of our 80 suites offers breathtaking sea views and comes with personalized butler service. The resort features a private beach, world-class spa, and multiple dining venues including a Michelin-starred restaurant.",
      features: [
        "80 luxury suites with sea views",
        "Personal butler service",
        "Private beach and marina",
        "Michelin-starred restaurant",
        "Champagne bar",
        "Helipad for VIP arrivals",
        "Luxury spa and wellness center",
        "24-hour concierge",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        pets: "Small pets allowed (surcharge)",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 23 123456",
        email: "reservations@ayianapaluxury.com",
        website: "www.ayianapaluxury.com",
      },
      rooms: [
        {
          type: "Deluxe Suite",
          price: "$150",
          capacity: "2 guests",
          size: "65 m²",
        },
        {
          type: "Royal Suite",
          price: "$280",
          capacity: "2 guests",
          size: "95 m²",
        },
        {
          type: "Presidential Suite",
          price: "$450",
          capacity: "4 guests",
          size: "150 m²",
        },
      ],
    },
    "hotel-5": {
      id: "hotel-5",
      name: "Troodos Mountain Lodge",
      location: "Troodos Mountains, Cyprus",
      price: "$75",
      rating: 4.5,
      reviews: 423,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Mountain View",
        "Fireplace",
        "Hiking",
        "Restaurant",
        "Ski Storage",
        "Library",
        "Game Room",
        "Sauna",
      ],
      description:
        "Cozy mountain lodge perfect for nature lovers and outdoor enthusiasts. Experience Cyprus's natural beauty.",
      longDescription:
        "Perched in the Troodos Mountains, this charming lodge offers authentic mountain hospitality. Our 35 rooms feature rustic decor, stone fireplaces, and panoramic views of pine forests. The lodge serves as a base for hiking, skiing, and exploring Cyprus's natural wonders.",
      features: [
        "35 mountain-view rooms",
        "Stone fireplaces in all rooms",
        "Guided hiking tours",
        "Traditional Cypriot restaurant",
        "Ski equipment rental",
        "Mountain bike storage",
        "Reading library",
        "Game room with board games",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Pets allowed (no surcharge)",
        smoking: "Designated smoking areas",
      },
      contact: {
        phone: "+357 22 987654",
        email: "stay@troodoslodge.com",
        website: "www.troodoslodge.com",
      },
      rooms: [
        {
          type: "Standard Mountain Room",
          price: "$75",
          capacity: "2 guests",
          size: "20 m²",
        },
        {
          type: "Deluxe Mountain Suite",
          price: "$95",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Family Mountain Cabin",
          price: "$120",
          capacity: "4 guests",
          size: "35 m²",
        },
      ],
    },
    "hotel-6": {
      id: "hotel-6",
      name: "Larnaca Airport Hotel",
      location: "Larnaca, Cyprus",
      price: "$65",
      rating: 4.3,
      reviews: 789,
      images: [
        "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Airport Shuttle",
        "Business Center",
        "Pool",
        "WiFi",
        "Restaurant",
        "Bar",
        "Meeting Rooms",
        "24-hour Front Desk",
      ],
      description:
        "Convenient airport hotel ideal for transit stays and business travelers. Just minutes from Larnaca International Airport.",
      longDescription:
        "Strategically located just 2 km from Larnaca International Airport, this modern hotel offers convenience for transit passengers and business travelers. Our 120 rooms are designed for comfort and functionality, with easy access to airport facilities.",
      features: [
        "120 functional rooms",
        "Free airport shuttle",
        "24-hour business center",
        "Multiple meeting rooms",
        "Fitness center",
        "Rooftop pool",
        "Airport lounge access",
        "Express check-in/out",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 12 hours before check-in",
        pets: "Pets are not allowed",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 24 123456",
        email: "frontdesk@larnacaairporthotel.com",
        website: "www.larnacaairporthotel.com",
      },
      rooms: [
        {
          type: "Standard Room",
          price: "$65",
          capacity: "2 guests",
          size: "18 m²",
        },
        {
          type: "Business Room",
          price: "$85",
          capacity: "2 guests",
          size: "22 m²",
        },
        {
          type: "Executive Suite",
          price: "$120",
          capacity: "2 guests",
          size: "35 m²",
        },
      ],
    },
    "hotel-7": {
      id: "hotel-7",
      name: "Famagusta Boutique Hotel",
      location: "Famagusta, Cyprus",
      price: "$110",
      rating: 4.7,
      reviews: 567,
      images: [
        "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Boutique",
        "Historic District",
        "Rooftop Bar",
        "WiFi",
        "Restaurant",
        "Art Gallery",
        "Library",
        "Garden",
      ],
      description:
        "Elegant boutique hotel in the historic district with unique character and charm. A blend of history and modern luxury.",
      longDescription:
        "Famagusta Boutique Hotel occupies a beautifully restored 19th-century building in the historic district. Our 28 uniquely designed rooms reflect the city's rich history while offering modern comforts. The hotel features an art collection, rooftop bar, and intimate dining experiences.",
      features: [
        "28 uniquely designed rooms",
        "19th-century historic building",
        "Contemporary art collection",
        "Rooftop bar with city views",
        "Intimate restaurant",
        "Reading library",
        "Guided historic tours",
        "Valet parking",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Small pets allowed (surcharge)",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 23 987654",
        email: "welcome@famagustaboutique.com",
        website: "www.famagustaboutique.com",
      },
      rooms: [
        {
          type: "Classic Boutique Room",
          price: "$110",
          capacity: "2 guests",
          size: "24 m²",
        },
        {
          type: "Deluxe Boutique Suite",
          price: "$140",
          capacity: "2 guests",
          size: "32 m²",
        },
        {
          type: "Historic Loft Suite",
          price: "$180",
          capacity: "4 guests",
          size: "45 m²",
        },
      ],
    },
    "hotel-8": {
      id: "hotel-8",
      name: "Kyrenia Harbor View",
      location: "Kyrenia, Cyprus",
      price: "$130",
      rating: 4.8,
      reviews: 934,
      images: [
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Harbor View",
        "Marina",
        "Fine Dining",
        "Spa",
        "Pool",
        "Water Sports",
        "Concierge",
        "Valet Parking",
      ],
      description:
        "Stunning harbor views with direct marina access and premium amenities. Experience luxury with a nautical theme.",
      longDescription:
        "Overlooking Kyrenia's picturesque harbor, this luxury hotel offers breathtaking Mediterranean views and direct marina access. Our 85 rooms and suites feature nautical-inspired decor and modern amenities. The hotel includes a spa, fine dining restaurant, and water sports facilities.",
      features: [
        "85 harbor-view rooms",
        "Private marina access",
        "Nautical-themed decor",
        "Water sports center",
        "Fine dining restaurant",
        "Luxury spa treatments",
        "Concierge services",
        "Valet parking",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 24 hours before check-in",
        pets: "Pets allowed (surcharge)",
        smoking: "Designated smoking areas",
      },
      contact: {
        phone: "+357 23 456789",
        email: "reservations@kyreniaharborview.com",
        website: "www.kyreniaharborview.com",
      },
      rooms: [
        {
          type: "Harbor View Room",
          price: "$130",
          capacity: "2 guests",
          size: "28 m²",
        },
        {
          type: "Marina Suite",
          price: "$180",
          capacity: "2 guests",
          size: "42 m²",
        },
        {
          type: "Captain's Suite",
          price: "$250",
          capacity: "4 guests",
          size: "65 m²",
        },
      ],
    },
    "hotel-9": {
      id: "hotel-9",
      name: "Polis Eco Resort",
      location: "Polis, Cyprus",
      price: "$90",
      rating: 4.6,
      reviews: 445,
      images: [
        "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Eco-Friendly",
        "Organic Spa",
        "Beach Access",
        "Restaurant",
        "Yoga",
        "Meditation",
        "Bicycle Rental",
        "Organic Garden",
      ],
      description:
        "Sustainable resort with eco-friendly practices and natural surroundings. Perfect for mindful travelers.",
      longDescription:
        "Polis Eco Resort is committed to sustainable tourism and environmental conservation. Our 60 eco-friendly rooms are built with natural materials and feature energy-efficient systems. The resort offers organic dining, wellness activities, and direct access to pristine beaches.",
      features: [
        "60 eco-friendly rooms",
        "Solar-powered energy",
        "Organic vegetable garden",
        "Sustainable water systems",
        "Yoga and meditation pavilion",
        "Bicycle rental",
        "Guided nature walks",
        "Organic restaurant",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 72 hours before check-in",
        pets: "Pets allowed (no surcharge)",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 26 345678",
        email: "info@polisecoresort.com",
        website: "www.polisecoresort.com",
      },
      rooms: [
        {
          type: "Eco Standard Room",
          price: "$90",
          capacity: "2 guests",
          size: "25 m²",
        },
        {
          type: "Eco Deluxe Room",
          price: "$110",
          capacity: "2 guests",
          size: "30 m²",
        },
        {
          type: "Eco Family Suite",
          price: "$140",
          capacity: "4 guests",
          size: "40 m²",
        },
      ],
    },
    "hotel-10": {
      id: "hotel-10",
      name: "Lefkara Traditional Inn",
      location: "Lefkara, Cyprus",
      price: "$70",
      rating: 4.4,
      reviews: 312,
      images: [
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Traditional",
        "Lace Museum",
        "Garden",
        "Breakfast",
        "Cultural Tours",
        "Local Crafts",
        "Fireplace",
        "Library",
      ],
      description:
        "Authentic traditional inn showcasing Cypriot culture and local craftsmanship. Experience genuine Cypriot hospitality.",
      longDescription:
        "Located in the UNESCO-listed village of Lefkara, this traditional inn offers an authentic Cypriot experience. Our 20 rooms are decorated with local lace and traditional furnishings. The inn serves as a cultural center, offering insights into Cypriot traditions and crafts.",
      features: [
        "20 traditionally decorated rooms",
        "UNESCO World Heritage village",
        "Silver and lace museum",
        "Traditional breakfast",
        "Cultural workshops",
        "Local craft demonstrations",
        "Garden with olive trees",
        "Fireplace lounge",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Pets allowed (surcharge)",
        smoking: "Designated smoking areas",
      },
      contact: {
        phone: "+357 22 567890",
        email: "stay@lefkara-inn.com",
        website: "www.lefkara-inn.com",
      },
      rooms: [
        {
          type: "Traditional Room",
          price: "$70",
          capacity: "2 guests",
          size: "20 m²",
        },
        {
          type: "Lace Suite",
          price: "$90",
          capacity: "2 guests",
          size: "25 m²",
        },
        {
          type: "Family Traditional Room",
          price: "$100",
          capacity: "4 guests",
          size: "30 m²",
        },
      ],
    },
    "hotel-11": {
      id: "hotel-11",
      name: "Protaras Family Resort",
      location: "Protaras, Cyprus",
      price: "$100",
      rating: 4.5,
      reviews: 1234,
      images: [
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Family Friendly",
        "Kids Club",
        "Water Park",
        "Beach",
        "Animation Team",
        "Mini Golf",
        "Playground",
        "Babysitting",
      ],
      description:
        "Family-oriented resort with extensive facilities for children and adults alike. The perfect family vacation destination.",
      longDescription:
        "Protaras Family Resort is designed exclusively for families, offering extensive facilities for children of all ages. Our 150 family rooms and suites feature connecting doors and kid-friendly amenities. The resort includes a water park, kids' club, and animation team.",
      features: [
        "150 family-friendly rooms",
        "Water park with slides",
        "Kids' club and playground",
        "Animation team activities",
        "Mini golf course",
        "Teen disco",
        "Babysitting services",
        "Family dining options",
      ],
      policies: {
        checkIn: "2:00 PM",
        checkOut: "12:00 PM",
        cancellation: "Free cancellation up to 48 hours before check-in",
        pets: "Pets are not allowed",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 23 678901",
        email: "families@protarasresort.com",
        website: "www.protarasresort.com",
      },
      rooms: [
        {
          type: "Family Room",
          price: "$100",
          capacity: "4 guests",
          size: "35 m²",
        },
        {
          type: "Superior Family Suite",
          price: "$130",
          capacity: "5 guests",
          size: "45 m²",
        },
        {
          type: "Grand Family Villa",
          price: "$180",
          capacity: "6 guests",
          size: "60 m²",
        },
      ],
    },
    "hotel-12": {
      id: "hotel-12",
      name: "Akamas Wilderness Lodge",
      location: "Akamas Peninsula, Cyprus",
      price: "$140",
      rating: 4.9,
      reviews: 678,
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&h=600&fit=crop",
      ],
      amenities: [
        "Wilderness",
        "Guided Tours",
        "Infinity Pool",
        "Organic Dining",
        "Spa",
        "Hiking",
        "Wildlife Watching",
        "Stargazing",
      ],
      description:
        "Exclusive wilderness lodge offering immersive nature experiences and luxury. Escape to Cyprus's untouched wilderness.",
      longDescription:
        "Nestled in the pristine Akamas Peninsula, this exclusive lodge offers unparalleled access to Cyprus's natural beauty. Our 25 luxury suites blend seamlessly with the wilderness, featuring floor-to-ceiling windows and private terraces. Experience guided nature tours, organic dining, and stargazing from our observatory.",
      features: [
        "25 luxury wilderness suites",
        "Floor-to-ceiling nature views",
        "Guided wildlife tours",
        "Organic farm-to-table dining",
        "Infinity pool overlooking the sea",
        "Stargazing observatory",
        "Private hiking trails",
        "Helicopter transfers available",
      ],
      policies: {
        checkIn: "3:00 PM",
        checkOut: "11:00 AM",
        cancellation: "Free cancellation up to 72 hours before check-in",
        pets: "Pets allowed (no surcharge)",
        smoking: "Non-smoking property",
      },
      contact: {
        phone: "+357 26 789012",
        email: "reservations@akamaslodge.com",
        website: "www.akamaslodge.com",
      },
      rooms: [
        {
          type: "Wilderness Suite",
          price: "$140",
          capacity: "2 guests",
          size: "40 m²",
        },
        {
          type: "Premium Wilderness Suite",
          price: "$180",
          capacity: "2 guests",
          size: "50 m²",
        },
        {
          type: "Grand Wilderness Villa",
          price: "$280",
          capacity: "4 guests",
          size: "80 m²",
        },
      ],
    },
  };

  const hotel = hotelDetails[hotelId as keyof typeof hotelDetails];

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Hotel Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The hotel you're looking for doesn't exist.
          </p>
          <Link
            href="/accommodations/hotels"
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Back to Hotels
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
      case "spa":
        return <HomeIcon className="w-5 h-5" />;
      case "restaurant":
      case "bar":
      case "breakfast":
      case "dining":
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
              href="/accommodations/hotels"
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5 mr-2" />
              Back to Hotels
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
          src={hotel.images[selectedImage]}
          alt={hotel.name}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20"></div>

        {/* Image Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {hotel.images.map((_, index) => (
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
            {hotel.images.map((image, index) => (
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
                  alt={`${hotel.name} ${index + 1}`}
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
                    {hotel.name}
                  </h1>
                  <div className="flex items-center text-gray-600 mb-3">
                    <MapPinIcon className="w-5 h-5 mr-1" />
                    <span>{hotel.location}</span>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <StarSolidIcon className="w-5 h-5 text-yellow-400 mr-1" />
                      <span className="font-semibold">{hotel.rating}</span>
                      <span className="text-gray-500 ml-1">
                        ({hotel.reviews} reviews)
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-cyan-600">
                    {hotel.price}
                  </div>
                  <div className="text-gray-500">per night</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                About This Hotel
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                {hotel.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                {hotel.longDescription}
              </p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {hotel.amenities.map((amenity) => (
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
                Hotel Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hotel.features.map((feature, index) => (
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
                {hotel.rooms.map((room, index) => (
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
                Hotel Policies
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-in</div>
                    <div className="text-sm text-gray-600">
                      {hotel.policies.checkIn}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <ClockIcon className="w-5 h-5 text-gray-400" />
                  <div>
                    <div className="font-medium text-gray-900">Check-out</div>
                    <div className="text-sm text-gray-600">
                      {hotel.policies.checkOut}
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">
                    Cancellation
                  </div>
                  <div className="text-sm text-gray-600">
                    {hotel.policies.cancellation}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Pets</div>
                  <div className="text-sm text-gray-600">
                    {hotel.policies.pets}
                  </div>
                </div>
                <div className="pt-3 border-t">
                  <div className="font-medium text-gray-900 mb-2">Smoking</div>
                  <div className="text-sm text-gray-600">
                    {hotel.policies.smoking}
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
                    {hotel.contact.phone}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    {hotel.contact.email}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <a
                    href={`https://${hotel.contact.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-cyan-600 hover:text-cyan-700"
                  >
                    {hotel.contact.website}
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

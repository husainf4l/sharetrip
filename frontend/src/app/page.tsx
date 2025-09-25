"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  ChevronRightIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const [openDropdowns, setOpenDropdowns] = useState<Set<string>>(new Set());
  const [hotelSearch, setHotelSearch] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const toggleDropdown = (countryName: string) => {
    const newOpenDropdowns = new Set(openDropdowns);
    if (newOpenDropdowns.has(countryName)) {
      newOpenDropdowns.delete(countryName);
    } else {
      newOpenDropdowns.add(countryName);
    }
    setOpenDropdowns(newOpenDropdowns);
  };

  const handleHotelSearch = () => {
    const params = new URLSearchParams({
      destination: hotelSearch.destination,
      checkIn: hotelSearch.checkIn,
      checkOut: hotelSearch.checkOut,
      guests: hotelSearch.guests.toString(),
    });
    window.location.href = `/accommodations?${params.toString()}`;
  };

  const popularDestinations = [
    {
      name: "Cyprus",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop&crop=center",
      totalExperiences: 20,
      description:
        "Mediterranean paradise with ancient history and stunning beaches",
      href: "/tours?country=cyprus",
      cities: [
        {
          name: "Nicosia",
          experiences: 4,
          highlights: ["Capital City", "Venetian Walls", "Museums"],
        },
        {
          name: "Limassol",
          experiences: 3,
          highlights: ["Beaches", "Wine Region", "Ancient Kourion"],
        },
        {
          name: "Paphos",
          experiences: 3,
          highlights: ["UNESCO Sites", "Aphrodite's Birthplace", "Mosaics"],
        },
        {
          name: "Larnaca",
          experiences: 2,
          highlights: ["International Airport", "Salt Lake", "Beaches"],
        },
        {
          name: "Ayia Napa",
          experiences: 2,
          highlights: ["Party Destination", "Golden Beach", "Water Sports"],
        },
        {
          name: "Troodos Mountains",
          experiences: 2,
          highlights: ["Hiking", "Wineries", "Traditional Villages"],
        },
        {
          name: "Famagusta",
          experiences: 1,
          highlights: ["Ghost Town", "Salamis Ruins", "Beaches"],
        },
        {
          name: "Kyrenia",
          experiences: 1,
          highlights: ["Medieval Castle", "Northern Cyprus", "Harbor"],
        },
        {
          name: "Protaras",
          experiences: 1,
          highlights: ["Family Beaches", "Fig Tree Bay", "Water Parks"],
        },
        {
          name: "Polis",
          experiences: 1,
          highlights: ["Chrysochou Bay", "Akamas Peninsula", "Nature"],
        },
      ],
    },
  ];

  const categories = [
    {
      name: "Jordan",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop&crop=center",
      href: "/tours?country=jordan",
      cities: [
        {
          name: "Petra",
          tours: [
            {
              id: "j1",
              title: "Petra Ancient City Tour",
              location: "Petra, Jordan",
              price: "$45",
              rating: 4.9,
              reviews: 2341,
              duration: "6 hours",
              groupSize: "8-15 people",
              difficulty: "Moderate",
              languages: ["English", "Arabic"],
              includes: ["Local guide", "Entry tickets", "Transport", "Lunch"],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
            {
              id: "j2",
              title: "Petra by Night Experience",
              location: "Petra, Jordan",
              price: "$35",
              rating: 4.8,
              reviews: 1876,
              duration: "3 hours",
              groupSize: "10-20 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Candlelight walk", "Traditional music", "Tea"],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Dead Sea",
          tours: [
            {
              id: "j3",
              title: "Dead Sea Relaxation Experience",
              location: "Dead Sea, Jordan",
              price: "$35",
              rating: 4.8,
              reviews: 1876,
              duration: "4 hours",
              groupSize: "10-20 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Spa access", "Mud therapy", "Transport", "Towels"],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Amman",
          tours: [
            {
              id: "j4",
              title: "Amman Cultural Walking Tour",
              location: "Amman, Jordan",
              price: "$25",
              rating: 4.7,
              reviews: 1234,
              duration: "3 hours",
              groupSize: "6-12 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Local guide", "Roman Theater", "Souk visit"],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
            {
              id: "j5",
              title: "Amman Citadel & Museum",
              location: "Amman, Jordan",
              price: "$30",
              rating: 4.6,
              reviews: 1456,
              duration: "4 hours",
              groupSize: "8-16 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Entry tickets", "Guide", "Transport"],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Wadi Rum",
          tours: [
            {
              id: "j6",
              title: "Wadi Rum Desert Safari",
              location: "Wadi Rum, Jordan",
              price: "$65",
              rating: 4.9,
              reviews: 1987,
              duration: "6 hours",
              groupSize: "6-12 people",
              difficulty: "Moderate",
              languages: ["English", "Arabic"],
              includes: [
                "Bedouin guide",
                "4x4 vehicle",
                "Camp lunch",
                "Stargazing",
              ],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
            {
              id: "j7",
              title: "Wadi Rum Overnight Camp",
              location: "Wadi Rum, Jordan",
              price: "$95",
              rating: 4.9,
              reviews: 1456,
              duration: "24 hours",
              groupSize: "4-8 people",
              difficulty: "Moderate",
              languages: ["English", "Arabic"],
              includes: [
                "Camp accommodation",
                "Meals",
                "Desert activities",
                "Transport",
              ],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Aqaba",
          tours: [
            {
              id: "j8",
              title: "Aqaba Marine Park Snorkeling",
              location: "Aqaba, Jordan",
              price: "$45",
              rating: 4.7,
              reviews: 1234,
              duration: "5 hours",
              groupSize: "8-15 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: [
                "Snorkeling gear",
                "Boat tour",
                "Marine guide",
                "Lunch",
              ],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Jerash",
          tours: [
            {
              id: "j9",
              title: "Jerash Ancient City Tour",
              location: "Jerash, Jordan",
              price: "$40",
              rating: 4.8,
              reviews: 1567,
              duration: "6 hours",
              groupSize: "10-20 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: [
                "Archaeological guide",
                "Entry tickets",
                "Transport",
                "Audio guide",
              ],
              image:
                "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
            },
          ],
        },
      ],
    },
    {
      name: "Egypt",
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=400&fit=crop&crop=center",
      href: "/tours?country=egypt",
      cities: [
        {
          name: "Giza",
          tours: [
            {
              id: "e1",
              title: "Pyramids of Giza & Sphinx",
              location: "Giza, Egypt",
              price: "$40",
              rating: 4.9,
              reviews: 3456,
              duration: "5 hours",
              groupSize: "10-25 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Entry tickets", "Guide", "Transport", "Water"],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
            {
              id: "e2",
              title: "Great Pyramid Interior Tour",
              location: "Giza, Egypt",
              price: "$55",
              rating: 4.8,
              reviews: 2134,
              duration: "3 hours",
              groupSize: "6-12 people",
              difficulty: "Moderate",
              languages: ["English", "Arabic"],
              includes: ["Interior access", "Expert guide", "Transport"],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Cairo",
          tours: [
            {
              id: "e3",
              title: "Khan el-Khalili Bazaar Tour",
              location: "Cairo, Egypt",
              price: "$20",
              rating: 4.6,
              reviews: 1876,
              duration: "3 hours",
              groupSize: "6-12 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Local guide", "Shopping tips", "Traditional sweets"],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
            {
              id: "e4",
              title: "Nile River Felucca Ride",
              location: "Cairo, Egypt",
              price: "$30",
              rating: 4.8,
              reviews: 2156,
              duration: "2 hours",
              groupSize: "8-15 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Traditional boat", "Guide", "Tea/coffee"],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Luxor",
          tours: [
            {
              id: "e5",
              title: "Luxor Temple & Valley of Kings",
              location: "Luxor, Egypt",
              price: "$60",
              rating: 4.9,
              reviews: 2987,
              duration: "7 hours",
              groupSize: "8-15 people",
              difficulty: "Moderate",
              languages: ["English", "Arabic"],
              includes: [
                "Expert guide",
                "All entry tickets",
                "Transport",
                "Lunch",
              ],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Alexandria",
          tours: [
            {
              id: "e6",
              title: "Alexandria Coastal Walking Tour",
              location: "Alexandria, Egypt",
              price: "$35",
              rating: 4.6,
              reviews: 1654,
              duration: "4 hours",
              groupSize: "8-16 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Historical sites", "Coastal views", "Local guide"],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
            {
              id: "e7",
              title: "Alexandria Library & Museum",
              location: "Alexandria, Egypt",
              price: "$25",
              rating: 4.5,
              reviews: 1345,
              duration: "3 hours",
              groupSize: "10-20 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Library access", "Museum tour", "Guide"],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Aswan",
          tours: [
            {
              id: "e8",
              title: "Aswan Nile Cruise & Temples",
              location: "Aswan, Egypt",
              price: "$75",
              rating: 4.8,
              reviews: 1876,
              duration: "8 hours",
              groupSize: "8-15 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Nile cruise", "Temple visits", "Meals", "Guide"],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Sharm El Sheikh",
          tours: [
            {
              id: "e9",
              title: "Sharm El Sheikh Diving Adventure",
              location: "Sharm El Sheikh, Egypt",
              price: "$85",
              rating: 4.7,
              reviews: 1456,
              duration: "6 hours",
              groupSize: "4-8 people",
              difficulty: "Moderate",
              languages: ["English", "Arabic"],
              includes: ["Diving equipment", "Boat", "Instructor", "Lunch"],
              image:
                "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
            },
          ],
        },
      ],
    },
    {
      name: "Lebanon",
      image:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=400&fit=crop&crop=center",
      href: "/tours?country=lebanon",
      cities: [
        {
          name: "Beirut",
          tours: [
            {
              id: "l1",
              title: "Beirut Corniche Walk",
              location: "Beirut, Lebanon",
              price: "$25",
              rating: 4.7,
              reviews: 1456,
              duration: "2.5 hours",
              groupSize: "8-16 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Local guide", "Sea views", "Coffee break"],
              image:
                "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            },
            {
              id: "l2",
              title: "Beirut National Museum",
              location: "Beirut, Lebanon",
              price: "$35",
              rating: 4.6,
              reviews: 1234,
              duration: "3 hours",
              groupSize: "10-20 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Entry tickets", "Guide", "Transport"],
              image:
                "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Baalbek",
          tours: [
            {
              id: "l3",
              title: "Baalbek Roman Temples",
              location: "Baalbek, Lebanon",
              price: "$50",
              rating: 4.8,
              reviews: 987,
              duration: "4 hours",
              groupSize: "10-20 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Entry tickets", "Guide", "Transport", "Audio guide"],
              image:
                "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Byblos",
          tours: [
            {
              id: "l4",
              title: "Byblos Ancient Harbor",
              location: "Byblos, Lebanon",
              price: "$35",
              rating: 4.6,
              reviews: 1234,
              duration: "3.5 hours",
              groupSize: "8-15 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Historical guide", "Harbor views", "Local lunch"],
              image:
                "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Tripoli",
          tours: [
            {
              id: "l5",
              title: "Tripoli Old City Exploration",
              location: "Tripoli, Lebanon",
              price: "$30",
              rating: 4.5,
              reviews: 987,
              duration: "4 hours",
              groupSize: "8-16 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Citadel visit", "Souk exploration", "Local guide"],
              image:
                "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Tyre",
          tours: [
            {
              id: "l6",
              title: "Tyre Archaeological Site Tour",
              location: "Tyre, Lebanon",
              price: "$40",
              rating: 4.7,
              reviews: 876,
              duration: "5 hours",
              groupSize: "10-18 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: [
                "UNESCO site access",
                "Archaeological guide",
                "Transport",
              ],
              image:
                "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            },
          ],
        },
        {
          name: "Sidon",
          tours: [
            {
              id: "l7",
              title: "Sidon Sea Castle & Old City",
              location: "Sidon, Lebanon",
              price: "$35",
              rating: 4.6,
              reviews: 1098,
              duration: "4 hours",
              groupSize: "8-15 people",
              difficulty: "Easy",
              languages: ["English", "Arabic"],
              includes: ["Castle visit", "Old city walk", "Local guide"],
              image:
                "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
            },
          ],
        },
      ],
    },
  ];

  const featuredTours = [
    {
      id: "1",
      title: "Petra Full Day Adventure",
      location: "Petra, Jordan",
      price: "$55",
      rating: 4.9,
      reviews: 2341,
      duration: "8 hours",
      groupSize: "8-15 people",
      difficulty: "Moderate",
      languages: ["English", "Arabic"],
      includes: [
        "Local guide",
        "Entry tickets",
        "Transport",
        "Lunch",
        "Horse ride",
      ],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      title: "Pyramids & Sphinx Private Tour",
      location: "Giza, Egypt",
      price: "$45",
      rating: 4.8,
      reviews: 3456,
      duration: "4 hours",
      groupSize: "6-12 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: ["Private guide", "Entry tickets", "Transport", "Water"],
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      title: "Beirut Food & Culture Tour",
      location: "Beirut, Lebanon",
      price: "$35",
      rating: 4.7,
      reviews: 1876,
      duration: "5 hours",
      groupSize: "8-16 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: ["Local guide", "Food tastings", "Market visits", "Transport"],
      image:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
    },
    {
      id: "4",
      title: "Dead Sea Spa Experience",
      location: "Dead Sea, Jordan",
      price: "$40",
      rating: 4.8,
      reviews: 2156,
      duration: "6 hours",
      groupSize: "10-20 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: ["Spa access", "Mud therapy", "Lunch", "Transport"],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: "5",
      title: "Luxor Temple & Valley of Kings",
      location: "Luxor, Egypt",
      price: "$60",
      rating: 4.9,
      reviews: 2987,
      duration: "7 hours",
      groupSize: "8-15 people",
      difficulty: "Moderate",
      languages: ["English", "Arabic"],
      includes: ["Expert guide", "All entry tickets", "Transport", "Lunch"],
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    },
    {
      id: "6",
      title: "Baalbek Ancient Temples",
      location: "Baalbek, Lebanon",
      price: "$50",
      rating: 4.8,
      reviews: 1456,
      duration: "5 hours",
      groupSize: "10-20 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: [
        "Archaeological guide",
        "Entry tickets",
        "Transport",
        "Audio guide",
      ],
      image:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
    },
    {
      id: "7",
      title: "Amman Citadel & Roman Theater",
      location: "Amman, Jordan",
      price: "$30",
      rating: 4.7,
      reviews: 1876,
      duration: "4 hours",
      groupSize: "8-16 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: ["Local guide", "Entry tickets", "Transport"],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: "8",
      title: "Alexandria Coastal Tour",
      location: "Alexandria, Egypt",
      price: "$35",
      rating: 4.6,
      reviews: 1654,
      duration: "6 hours",
      groupSize: "12-25 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: ["Coastal views", "Historical sites", "Lunch", "Transport"],
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    },
    {
      id: "9",
      title: "Byblos Ancient City",
      location: "Byblos, Lebanon",
      price: "$40",
      rating: 4.7,
      reviews: 1234,
      duration: "4 hours",
      groupSize: "8-15 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: ["Historical guide", "Harbor views", "Local lunch"],
      image:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
    },
    {
      id: "10",
      title: "Wadi Rum Desert Safari",
      location: "Wadi Rum, Jordan",
      price: "$65",
      rating: 4.9,
      reviews: 1987,
      duration: "6 hours",
      groupSize: "6-12 people",
      difficulty: "Moderate",
      languages: ["English", "Arabic"],
      includes: ["Bedouin guide", "4x4 vehicle", "Camp lunch", "Stargazing"],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      id: "11",
      title: "Cairo Islamic Cairo Tour",
      location: "Cairo, Egypt",
      price: "$25",
      rating: 4.5,
      reviews: 2341,
      duration: "3 hours",
      groupSize: "10-20 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: ["Local guide", "Mosque visits", "Bazaar exploration"],
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    },
    {
      id: "12",
      title: "Jeita Grotto & Nature",
      location: "Jeita, Lebanon",
      price: "$45",
      rating: 4.8,
      reviews: 1456,
      duration: "5 hours",
      groupSize: "8-16 people",
      difficulty: "Easy",
      languages: ["English", "Arabic"],
      includes: ["Cave tour", "Boat ride", "Nature walk", "Transport"],
      image:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=400&h=300&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('/images/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand.jpg')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-blue-900/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up text-white">
            Travel memories you'll never forget
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-up text-amber-50">
            Find your travel crew. Share tours. Save more.
          </p>

          {/* Hotel Search Bar */}
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-4xl mx-auto animate-fade-up">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Destination */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Where are you going?
                </label>
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter destination"
                    value={hotelSearch.destination}
                    onChange={(e) =>
                      setHotelSearch((prev) => ({
                        ...prev,
                        destination: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500"
                  />
                </div>
              </div>

              {/* Check-in Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-in
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={hotelSearch.checkIn}
                    onChange={(e) =>
                      setHotelSearch((prev) => ({
                        ...prev,
                        checkIn: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              {/* Check-out Date */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Check-out
                </label>
                <div className="relative">
                  <CalendarDaysIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="date"
                    value={hotelSearch.checkOut}
                    onChange={(e) =>
                      setHotelSearch((prev) => ({
                        ...prev,
                        checkOut: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              {/* Guests */}
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guests
                </label>
                <div className="relative">
                  <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    value={hotelSearch.guests}
                    onChange={(e) =>
                      setHotelSearch((prev) => ({
                        ...prev,
                        guests: parseInt(e.target.value),
                      }))
                    }
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 appearance-none bg-white"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                      <option key={num} value={num}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleHotelSearch}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                Search Hotels
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Popular Destinations Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Popular Destinations
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the most sought-after travel experiences in Cyprus
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {popularDestinations.map((destination, index) => (
              <div
                key={destination.name}
                className="group relative overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                {/* Background Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                    ⭐ Top Rated
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Country Header */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {destination.name}
                    </h3>
                    <button
                      onClick={() => toggleDropdown(destination.name)}
                      className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                      <ChevronDownIcon
                        className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${
                          openDropdowns.has(destination.name)
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  </div>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {destination.description}
                  </p>

                  {/* Experience Count */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-700">
                      {destination.totalExperiences} experiences
                    </span>
                  </div>

                  {/* Cities Dropdown */}
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openDropdowns.has(destination.name)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="space-y-3 pt-4 border-t border-gray-100">
                      {destination.cities.map((city, cityIndex) => (
                        <Link
                          key={city.name}
                          href={`/tours?country=${destination.name.toLowerCase()}&city=${city.name.toLowerCase()}`}
                          className="block p-3 rounded-xl hover:bg-gray-50 transition-colors group/city"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <MapPinIcon className="w-4 h-4 text-gray-400" />
                              <div>
                                <h4 className="font-semibold text-gray-900 group-hover/city:text-blue-600">
                                  {city.name}
                                </h4>
                                <p className="text-xs text-gray-500">
                                  {city.experiences} experiences
                                </p>
                              </div>
                            </div>
                            <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover/city:text-blue-600 group-hover/city:translate-x-1 transition-all" />
                          </div>

                          {/* City Highlights */}
                          <div className="flex flex-wrap gap-1 mt-2">
                            {city.highlights.map((highlight) => (
                              <span
                                key={highlight}
                                className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* View All Link */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <Link
                      href={destination.href}
                      className="flex items-center justify-between text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <span>View all experiences</span>
                      <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-400/50 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gradient text-center mb-12 animate-fade-up">
            Explore by country
          </h2>

          {categories.map((category, categoryIndex) => (
            <div key={category.name} className="mb-16">
              {/* Category Header */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden shadow-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {category.name}
                  </h3>
                </div>
                <Link
                  href={category.href}
                  className="btn btn-outline hover-lift flex items-center gap-2"
                >
                  View all
                  <ChevronRightIcon className="w-4 h-4" />
                </Link>
              </div>

              {/* Cities and Tours */}
              {category.cities.map((city, cityIndex) => (
                <div key={city.name} className="mb-12">
                  {/* City Header */}
                  <div className="flex items-center gap-3 mb-6 ml-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                      <MapPinIcon className="w-4 h-4 text-white" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-800">
                      {city.name}
                    </h4>
                  </div>

                  {/* Tour Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 ml-8">
                    {city.tours.map((tour, tourIndex) => (
                      <div
                        key={tour.id}
                        className="group relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300/60 w-full max-w-sm mx-auto"
                        style={{
                          animationDelay: `${
                            (categoryIndex * 9 + cityIndex * 3 + tourIndex) *
                            0.1
                          }s`,
                        }}
                      >
                        {/* Image Container */}
                        <div className="relative h-56 overflow-hidden bg-gray-100">
                          <Image
                            src={tour.image}
                            alt={tour.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                          />

                          {/* Minimal gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                          {/* Price Overlay */}
                          <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl">
                            <div className="text-lg font-bold">
                              {tour.price}
                            </div>
                          </div>
                        </div>

                        {/* Minimal Content */}
                        <div className="p-6">
                          {/* Location */}
                          <div className="flex items-center text-sm text-gray-500 mb-3">
                            <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                            <span className="font-medium">{tour.location}</span>
                          </div>

                          {/* Title */}
                          <Link href={`/tours/${tour.id}`} className="block">
                            <h4 className="font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight text-lg">
                              {tour.title}
                            </h4>
                          </Link>

                          {/* Essential Info Row */}
                          <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center">
                                <ClockIcon className="w-4 h-4 mr-1.5" />
                                <span className="font-medium">
                                  {tour.duration || "3h"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                <UserGroupIcon className="w-4 h-4 mr-1.5" />
                                <span className="font-medium">
                                  {tour.groupSize || "8/15"}
                                </span>
                              </div>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center">
                              <StarIcon className="w-4 h-4 text-amber-400 fill-current mr-1" />
                              <span className="font-semibold text-gray-900">
                                {tour.rating}
                              </span>
                            </div>
                          </div>

                          {/* Minimal CTA */}
                          <Link
                            href={`/tours/${tour.id}`}
                            className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </section>

        {/* Featured Tours Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-4xl font-bold text-gradient animate-slide-right">
              Popular experiences
            </h2>
            <Link
              href="/tours"
              className="btn btn-outline hover-lift animate-slide-right"
            >
              View all
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredTours.map((tour, index) => (
              <div
                key={tour.id}
                className="group relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300/60 w-full max-w-sm mx-auto"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Image Container */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />

                  {/* Minimal gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Price Overlay */}
                  <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl">
                    <div className="text-lg font-bold">{tour.price}</div>
                  </div>
                </div>

                {/* Minimal Content */}
                <div className="p-6">
                  {/* Location */}
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                    <span className="font-medium">{tour.location}</span>
                  </div>

                  {/* Title */}
                  <Link href={`/tours/${tour.id}`} className="block">
                    <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight text-lg">
                      {tour.title}
                    </h3>
                  </Link>

                  {/* Essential Info Row */}
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-1.5" />
                        <span className="font-medium">3h</span>
                      </div>
                      <div className="flex items-center">
                        <UserGroupIcon className="w-4 h-4 mr-1.5" />
                        <span className="font-medium">8/15</span>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center">
                      <StarIcon className="w-4 h-4 text-amber-400 fill-current mr-1" />
                      <span className="font-semibold text-gray-900">
                        {tour.rating}
                      </span>
                    </div>
                  </div>

                  {/* Minimal CTA */}
                  <Link
                    href={`/tours/${tour.id}`}
                    className="w-full inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white text-sm font-semibold rounded-2xl hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* You Might Also Like Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gradient animate-slide-up">
              You might also like...
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover more amazing experiences tailored for you
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Demo Tour 1 */}
            <div className="group relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300/60">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src="/images/tour-1.jpg"
                  alt="Wadi Rum Desert Adventure"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl">
                  <div className="text-lg font-bold">$75</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="font-medium">Wadi Rum, Jordan</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight text-lg">
                  Wadi Rum Desert Adventure
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1.5" />
                      <span className="font-medium">6h</span>
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1.5" />
                      <span className="font-medium">6/12</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-amber-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">4.9</span>
                  </div>
                </div>
                <Link
                  href="/tours/demo-1"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Demo Tour 2 */}
            <div className="group relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300/60">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src="/images/tour-2.jpg"
                  alt="Phuket Island Paradise"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl">
                  <div className="text-lg font-bold">$95</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="font-medium">Phuket, Thailand</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight text-lg">
                  Phuket Island Paradise
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1.5" />
                      <span className="font-medium">8h</span>
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1.5" />
                      <span className="font-medium">4/8</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-amber-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">4.8</span>
                  </div>
                </div>
                <Link
                  href="/tours/demo-2"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </div>

            {/* Demo Tour 3 */}
            <div className="group relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300/60">
              <div className="relative h-48 overflow-hidden bg-gray-100">
                <Image
                  src="/images/tour-3.jpg"
                  alt="Mediterranean Culinary Journey"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-2xl">
                  <div className="text-lg font-bold">$65</div>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                  <span className="font-medium">Beirut, Lebanon</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight text-lg">
                  Mediterranean Culinary Journey
                </h3>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 mr-1.5" />
                      <span className="font-medium">5h</span>
                    </div>
                    <div className="flex items-center">
                      <UserGroupIcon className="w-4 h-4 mr-1.5" />
                      <span className="font-medium">6/12</span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="w-4 h-4 text-amber-400 fill-current mr-1" />
                    <span className="font-semibold text-gray-900">4.7</span>
                  </div>
                </div>
                <Link
                  href="/tours/demo-3"
                  className="w-full inline-flex items-center justify-center px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-2xl hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Compact Call to Action Section */}
        <section className="glass-elevated p-8 text-center animate-fade-up rounded-3xl border border-white/20 shadow-xl shadow-gray-200/20">
          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-semibold mb-3 text-gray-900">
              Ready for your next adventure?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Discover unique experiences
            </p>
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-4 rounded-2xl hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Browse Experiences
              <ChevronRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

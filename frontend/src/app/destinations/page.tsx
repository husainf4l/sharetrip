"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  GlobeAltIcon,
  ClockIcon,
  StarIcon,
  UserGroupIcon,
  FunnelIcon,
} from "@heroicons/react/24/outline";

interface Destination {
  id: string;
  name: string;
  country: string;
  continent: string;
  tours: string;
  rating: number;
  reviews: number;
  href: string;
  image: string;
  unsplashImage: string;
  description: string;
  highlights: string[];
  bestTime: string;
  currency: string;
  language: string;
  timeZone: string;
  featured?: boolean;
}

export default function DestinationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContinent, setSelectedContinent] = useState("All");
  const [sortBy, setSortBy] = useState("popular");

  const allDestinations: Destination[] = [
    {
      id: "petra",
      name: "Petra",
      country: "Jordan",
      continent: "Asia",
      tours: "450+ tours",
      rating: 4.9,
      reviews: 8920,
      href: "/tours?destination=petra",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      description:
        "The Rose City, an ancient Nabataean city carved into rose-red cliffs, a UNESCO World Heritage Site.",
      highlights: [
        "Treasury Building",
        "Monastery",
        "Royal Tombs",
        "Siq Canyon",
      ],
      bestTime: "Mar-May, Sep-Nov",
      currency: "JOD",
      language: "Arabic",
      timeZone: "EET",
      featured: true,
    },
    {
      id: "amman",
      name: "Amman",
      country: "Jordan",
      continent: "Asia",
      tours: "320+ tours",
      rating: 4.6,
      reviews: 5670,
      href: "/tours?destination=amman",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      description:
        "Jordan's vibrant capital blending ancient Roman ruins with modern Middle Eastern culture.",
      highlights: ["Roman Theater", "Citadel Hill", "Souks", "Rainbow Street"],
      bestTime: "Mar-May, Sep-Nov",
      currency: "JOD",
      language: "Arabic",
      timeZone: "EET",
    },
    {
      id: "dead-sea",
      name: "Dead Sea",
      country: "Jordan",
      continent: "Asia",
      tours: "280+ tours",
      rating: 4.7,
      reviews: 4230,
      href: "/tours?destination=dead-sea",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      description:
        "The lowest point on Earth, famous for its mineral-rich waters and therapeutic mud.",
      highlights: [
        "Floating in the Sea",
        "Mud Therapy",
        "Masada Fortress",
        "Mineral Springs",
      ],
      bestTime: "Mar-May, Sep-Nov",
      currency: "JOD",
      language: "Arabic",
      timeZone: "EET",
    },
    {
      id: "pyramids-giza",
      name: "Pyramids of Giza",
      country: "Egypt",
      continent: "Africa",
      tours: "600+ tours",
      rating: 4.8,
      reviews: 12450,
      href: "/tours?destination=giza",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&h=400&fit=crop",
      description:
        "Home to the Great Pyramid, one of the Seven Wonders of the Ancient World.",
      highlights: [
        "Great Pyramid",
        "Sphinx",
        "Valley Temple",
        "Solar Boat Museum",
      ],
      bestTime: "Oct-Apr",
      currency: "EGP",
      language: "Arabic",
      timeZone: "EET",
      featured: true,
    },
    {
      id: "cairo",
      name: "Cairo",
      country: "Egypt",
      continent: "Africa",
      tours: "520+ tours",
      rating: 4.5,
      reviews: 9870,
      href: "/tours?destination=cairo",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&h=400&fit=crop",
      description:
        "Egypt's bustling capital, gateway to ancient wonders and Islamic architecture.",
      highlights: [
        "Khan el-Khalili Bazaar",
        "Citadel of Saladin",
        "Coptic Cairo",
        "Nile River Cruise",
      ],
      bestTime: "Oct-Apr",
      currency: "EGP",
      language: "Arabic",
      timeZone: "EET",
    },
    {
      id: "luxor",
      name: "Luxor",
      country: "Egypt",
      continent: "Africa",
      tours: "380+ tours",
      rating: 4.7,
      reviews: 7650,
      href: "/tours?destination=luxor",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=600&h=400&fit=crop",
      description:
        "The world's greatest open-air museum, filled with ancient temples and tombs.",
      highlights: [
        "Valley of the Kings",
        "Karnak Temple",
        "Luxor Temple",
        "Nile River",
      ],
      bestTime: "Oct-Apr",
      currency: "EGP",
      language: "Arabic",
      timeZone: "EET",
    },
    {
      id: "beirut",
      name: "Beirut",
      country: "Lebanon",
      continent: "Asia",
      tours: "350+ tours",
      rating: 4.6,
      reviews: 6230,
      href: "/tours?destination=beirut",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop",
      description:
        "Lebanon's vibrant capital, known as the Paris of the Middle East with rich history and culture.",
      highlights: [
        "Corniche Promenade",
        "National Museum",
        "Souks",
        "Roman Baths",
      ],
      bestTime: "Mar-Jun, Sep-Nov",
      currency: "LBP",
      language: "Arabic",
      timeZone: "EET",
      featured: true,
    },
    {
      id: "baalbek",
      name: "Baalbek",
      country: "Lebanon",
      continent: "Asia",
      tours: "220+ tours",
      rating: 4.8,
      reviews: 3450,
      href: "/tours?destination=baalbek",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop",
      description:
        "Ancient Roman city with the largest and most complete Roman temples in the world.",
      highlights: [
        "Temple of Jupiter",
        "Temple of Bacchus",
        "Temple of Venus",
        "Roman Columns",
      ],
      bestTime: "Mar-Jun, Sep-Nov",
      currency: "LBP",
      language: "Arabic",
      timeZone: "EET",
    },
    {
      id: "byblos",
      name: "Byblos",
      country: "Lebanon",
      continent: "Asia",
      tours: "180+ tours",
      rating: 4.5,
      reviews: 2890,
      href: "/tours?destination=byblos",
      image: "��",
      unsplashImage:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=600&h=400&fit=crop",
      description:
        "One of the oldest continuously inhabited cities in the world, with Phoenician and Crusader history.",
      highlights: [
        "Phoenician Port",
        "Crusader Castle",
        "Souk",
        "Mediterranean Beaches",
      ],
      bestTime: "Mar-Jun, Sep-Nov",
      currency: "LBP",
      language: "Arabic",
      timeZone: "EET",
    },
  ];

  const continents = [
    "All",
    "Europe",
    "Asia",
    "North America",
    "South America",
    "Africa",
    "Oceania",
  ];

  const filteredDestinations = allDestinations.filter((destination) => {
    const matchesSearch =
      searchQuery === "" ||
      destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      destination.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesContinent =
      selectedContinent === "All" ||
      destination.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  const sortedDestinations = [...filteredDestinations].sort((a, b) => {
    switch (sortBy) {
      case "popular":
        return b.reviews - a.reviews;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      case "tours":
        return parseInt(b.tours) - parseInt(a.tours);
      default:
        return 0;
    }
  });

  // Featured destinations also filtered by search and continent
  const featuredDestinations = filteredDestinations.filter(
    (dest) => dest.featured
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-up">
            Discover Amazing Destinations
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto animate-fade-up">
            Explore the world's most incredible places with local guides and
            authentic experiences
          </p>

          {/* Search Bar */}
          <div className="glass-elevated p-4 max-w-2xl mx-auto animate-scale-in">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-4 text-gray-800 text-lg focus-ring"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            {searchQuery && (
              <div className="mt-2 text-center text-white/80 text-sm">
                Searching for "{searchQuery}"...
              </div>
            )}
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Featured Destinations */}
        {featuredDestinations.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gradient mb-8 text-center animate-fade-up">
              ✨ Featured Destinations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredDestinations.map((destination, index) => (
                <Link
                  key={destination.id}
                  href={destination.href}
                  className="card-elevated hover-glow group stagger-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={destination.unsplashImage}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-white">
                      <h3 className="text-2xl font-bold mb-1">
                        {destination.name}
                      </h3>
                      <p className="opacity-90">{destination.country}</p>
                    </div>
                    <div className="absolute top-4 right-4">
                      <span className="badge badge-primary">Featured</span>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">
                      {destination.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">
                          {destination.rating}
                        </span>
                        <span className="text-gray-500">
                          ({destination.reviews.toLocaleString()})
                        </span>
                      </div>
                      <span className="text-blue-600 font-semibold">
                        {destination.tours}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Filters and Controls */}
        <section className="mb-8">
          <div className="glass-elevated p-6 animate-fade-up">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2">
                  <GlobeAltIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-semibold text-gray-700">
                    Continent:
                  </span>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {continents.map((continent) => (
                    <button
                      key={continent}
                      onClick={() => setSelectedContinent(continent)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all hover-lift ${
                        selectedContinent === continent
                          ? "bg-blue-600 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {continent}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <FunnelIcon className="w-5 h-5 text-gray-400" />
                  <span className="font-medium text-gray-700">Sort by:</span>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-lg focus-ring"
                >
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="name">Name A-Z</option>
                  <option value="tours">Most Tours</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gradient">
            {searchQuery
              ? `Search Results for "${searchQuery}"`
              : selectedContinent === "All"
              ? "All Destinations"
              : `${selectedContinent} Destinations`}
          </h2>
          <div className="text-gray-600">
            {sortedDestinations.length} destination
            {sortedDestinations.length !== 1 ? "s" : ""} found
            {searchQuery && ` matching "${searchQuery}"`}
          </div>
        </div>

        {/* Destinations Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {sortedDestinations.map((destination, index) => (
            <Link
              key={destination.id}
              href={destination.href}
              className="card hover-lift animate-fade-up stagger-item group"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={destination.unsplashImage}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 text-white">
                  <h3 className="text-xl font-bold">{destination.name}</h3>
                  <p className="text-white/90 text-sm">{destination.country}</p>
                </div>
                <div className="absolute top-3 right-3 text-2xl">
                  {destination.image}
                </div>
              </div>

              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {destination.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <ClockIcon className="w-3 h-3" />
                    {destination.bestTime}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold">
                      {destination.currency}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold text-sm">
                      {destination.rating}
                    </span>
                    <span className="text-gray-500 text-xs">
                      ({destination.reviews.toLocaleString()})
                    </span>
                  </div>
                  <span className="text-blue-600 font-semibold text-sm">
                    {destination.tours}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </section>

        {/* Empty State */}
        {sortedDestinations.length === 0 && (
          <div className="text-center py-16 animate-fade-up">
            <div className="w-32 h-32 glass-elevated rounded-full flex items-center justify-center mx-auto mb-6 animate-float">
              <GlobeAltIcon className="w-16 h-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gradient mb-4">
              No destinations found
            </h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Try adjusting your search criteria or explore different regions.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedContinent("All");
              }}
              className="btn btn-primary px-8 py-3 hover-glow"
            >
              Show all destinations
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

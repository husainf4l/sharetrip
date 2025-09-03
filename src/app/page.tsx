"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/24/outline";

export default function Home() {
  const categories = [
    {
      name: "Cultural Experiences",
      icon: "🏛️",
      href: "/tours?category=culture",
    },
    { name: "Walking Tours", icon: "🚶", href: "/tours?category=walking" },
    {
      name: "Nature & Adventure",
      icon: "🏔️",
      href: "/tours?category=adventure",
    },
    { name: "Nightlife", icon: "🌃", href: "/tours?category=nightlife" },
  ];

  const featuredTours = [
    {
      id: "1",
      title: "City Food Tour in Lisbon",
      location: "Lisbon, Portugal",
      price: "$40",
      rating: 4.8,
      reviews: 1234,
      image:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=300&fit=crop",
    },
    {
      id: "2",
      title: "Historic Walking Tour",
      location: "Barcelona, Spain",
      price: "$30",
      rating: 4.9,
      reviews: 890,
      image:
        "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
    },
    {
      id: "3",
      title: "Nightlife Experience",
      location: "Barcelona, Spain",
      price: "$25",
      rating: 4.7,
      reviews: 567,
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
    },
    {
      id: "4",
      title: "Rome Ancient History Tour",
      location: "Rome, Italy",
      price: "$45",
      rating: 4.9,
      reviews: 2156,
      image:
        "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400&h=300&fit=crop",
    },
    {
      id: "5",
      title: "Paris Seine River Cruise",
      location: "Paris, France",
      price: "$55",
      rating: 4.8,
      reviews: 1876,
      image:
        "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
    },
    {
      id: "6",
      title: "Amsterdam Canal Boat Tour",
      location: "Amsterdam, Netherlands",
      price: "$35",
      rating: 4.7,
      reviews: 1432,
      image:
        "https://images.unsplash.com/photo-1534351590666-13e3e963b3b6?w=400&h=300&fit=crop",
    },
    {
      id: "7",
      title: "Tokyo Street Food Adventure",
      location: "Tokyo, Japan",
      price: "$50",
      rating: 4.9,
      reviews: 2341,
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    },
    {
      id: "8",
      title: "Santorini Sunset Photography",
      location: "Santorini, Greece",
      price: "$60",
      rating: 4.8,
      reviews: 987,
      image:
        "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
    },
    {
      id: "9",
      title: "New York City Highlights",
      location: "New York, USA",
      price: "$65",
      rating: 4.6,
      reviews: 3456,
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    },
    {
      id: "10",
      title: "Machu Picchu Day Hike",
      location: "Cusco, Peru",
      price: "$75",
      rating: 4.9,
      reviews: 876,
      image:
        "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
    },
    {
      id: "11",
      title: "Venice Gondola Ride",
      location: "Venice, Italy",
      price: "$40",
      rating: 4.7,
      reviews: 1654,
      image:
        "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop",
    },
    {
      id: "12",
      title: "Sydney Opera House Tour",
      location: "Sydney, Australia",
      price: "$70",
      rating: 4.8,
      reviews: 1234,
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
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
              "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1200&h=800&fit=crop')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-blue-900/30"></div>
        </div>

        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up text-gradient-warm">
            Travel memories you&apos;ll never forget
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-fade-up">
            Find your travel crew. Share tours. Save more.
          </p>

          {/* Search Bar */}
          <div className="glass-elevated p-6 max-w-3xl mx-auto animate-scale-in">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Where are you going?"
                  className="w-full p-4 text-gray-800 text-lg focus-ring hover-lift"
                />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="When?"
                  className="w-full p-4 text-gray-800 text-lg focus-ring hover-lift"
                />
              </div>
              <button className="btn btn-primary px-8 py-4 text-lg hover-glow">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gradient text-center mb-12 animate-fade-up">
            Explore by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <Link
                key={category.name}
                href={category.href}
                className="card hover-lift hover-glow text-center p-6 stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 animate-float">{category.icon}</div>
                <h3 className="font-semibold text-gray-800 group-hover:text-gradient transition-all">
                  {category.name}
                </h3>
                <ChevronRightIcon className="w-5 h-5 mx-auto mt-2 text-gray-400 group-hover:text-blue-600 transition-colors" />
              </Link>
            ))}
          </div>
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

          <div className="grid-auto-fit">
            {featuredTours.map((tour, index) => (
              <Link
                key={tour.id}
                href={`/tours/${tour.id}`}
                className="card-elevated hover-glow group stagger-item"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={tour.image}
                    alt={tour.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 glass rounded-full px-3 py-1 hover-scale">
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold text-sm">
                        {tour.rating}
                      </span>
                      <span className="text-gray-600 text-sm">
                        ({tour.reviews})
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-gradient transition-all">
                    {tour.title}
                  </h3>
                  <p className="text-gray-600 mb-4">{tour.location}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gradient-secondary">
                      {tour.price}
                    </span>
                    <span className="text-sm text-gray-500">per person</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Compact Call to Action Section */}
        <section className="glass-elevated p-6 text-center animate-fade-up rounded-2xl" 
                 style={{background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(147, 51, 234, 0.1) 100%)'}}>
          <h3 className="text-2xl font-semibold mb-3 text-gradient">
            Ready for your next adventure?
          </h3>
          <p className="text-gray-600 mb-4">
            Discover unique experiences
          </p>
          <Link
            href="/tours"
            className="btn btn-primary px-6 py-2 hover-glow"
          >
            Browse Experiences
          </Link>
        </section>
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronRightIcon,
  StarIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Home() {
  const categories = [
    {
      name: "Cultural Experiences",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=400&h=400&fit=crop&crop=center",
      href: "/tours?category=Culture & History",
      tours: [
        {
          id: "c1",
          title: "Ancient Rome History Tour",
          location: "Rome, Italy",
          price: "$45",
          rating: 4.9,
          reviews: 2156,
          image:
            "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=400&h=300&fit=crop",
        },
        {
          id: "c2",
          title: "Paris Museum Pass Experience",
          location: "Paris, France",
          price: "$55",
          rating: 4.8,
          reviews: 1876,
          image:
            "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
        },
        {
          id: "c3",
          title: "Tokyo Temple & Shrine Tour",
          location: "Tokyo, Japan",
          price: "$35",
          rating: 4.7,
          reviews: 1432,
          image:
            "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      name: "Walking Tours",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop&crop=center",
      href: "/tours?category=Walking Tours",
      tours: [
        {
          id: "w1",
          title: "Barcelona Historic Quarter Walk",
          location: "Barcelona, Spain",
          price: "$30",
          rating: 4.9,
          reviews: 890,
          image:
            "https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&h=300&fit=crop",
        },
        {
          id: "w2",
          title: "Amsterdam Canal Walking Tour",
          location: "Amsterdam, Netherlands",
          price: "$35",
          rating: 4.7,
          reviews: 1432,
          image:
            "https://images.unsplash.com/photo-1534351590666-13e3e963b3b6?w=400&h=300&fit=crop",
        },
        {
          id: "w3",
          title: "Venice Hidden Gems Walk",
          location: "Venice, Italy",
          price: "$40",
          rating: 4.7,
          reviews: 1654,
          image:
            "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      name: "Nature & Adventure",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop&crop=center",
      href: "/tours?category=Adventure",
      tours: [
        {
          id: "n1",
          title: "Machu Picchu Day Hike",
          location: "Cusco, Peru",
          price: "$75",
          rating: 4.9,
          reviews: 876,
          image:
            "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=400&h=300&fit=crop",
        },
        {
          id: "n2",
          title: "Santorini Volcano Adventure",
          location: "Santorini, Greece",
          price: "$60",
          rating: 4.8,
          reviews: 987,
          image:
            "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=400&h=300&fit=crop",
        },
        {
          id: "n3",
          title: "Swiss Alps Hiking Tour",
          location: "Switzerland",
          price: "$85",
          rating: 4.9,
          reviews: 654,
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
        },
      ],
    },
    {
      name: "Nightlife",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop&crop=center",
      href: "/tours?category=Nightlife",
      tours: [
        {
          id: "nl1",
          title: "Barcelona Nightlife Experience",
          location: "Barcelona, Spain",
          price: "$25",
          rating: 4.7,
          reviews: 567,
          image:
            "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop",
        },
        {
          id: "nl2",
          title: "Tokyo Night Market Tour",
          location: "Tokyo, Japan",
          price: "$50",
          rating: 4.9,
          reviews: 2341,
          image:
            "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
        },
        {
          id: "nl3",
          title: "New York City Night Out",
          location: "New York, USA",
          price: "$65",
          rating: 4.6,
          reviews: 3456,
          image:
            "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
        },
      ],
    },
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
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
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
        </div>
      </section>

      <main className="max-w-7xl mx-auto px-6 py-16">
        {/* Categories Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gradient text-center mb-12 animate-fade-up">
            Explore by category
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

              {/* Tour Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.tours.map((tour, tourIndex) => (
                  <div
                    key={tour.id}
                    className="group relative bg-white/90 backdrop-blur-xl border border-gray-200/50 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:border-gray-300/60 w-full max-w-sm mx-auto"
                    style={{
                      animationDelay: `${
                        (categoryIndex * 3 + tourIndex) * 0.1
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
                        <h4 className="font-bold text-gray-900 mb-4 line-clamp-2 hover:text-blue-600 transition-colors duration-300 leading-tight text-lg">
                          {tour.title}
                        </h4>
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
                        <span className="font-medium">
                          {Math.floor(Math.random() * 10) + 5}/15
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

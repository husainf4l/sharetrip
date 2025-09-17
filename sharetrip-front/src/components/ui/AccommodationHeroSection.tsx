"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  UsersIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import { SearchFilters, AccommodationHeroSectionProps } from "@/types/common";

export default function AccommodationHeroSection({
  image,
  title = "Find Your Perfect Apartment in Cyprus",
  subtitle = "Discover self-catering apartments, studios, and modern living spaces",
}: AccommodationHeroSectionProps) {
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleSearch = () => {
    console.log("Accommodation search:", searchFilters);
  };

  return (
    <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <Image
        src={image}
        alt="Modern Studio Apartment"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-center text-white max-w-6xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
        <p className="text-xl mb-8 opacity-90">{subtitle}</p>

        {/* Search Bar */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {/* Destination */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Destination
              </label>
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Where are you going?"
                  value={searchFilters.destination}
                  onChange={(e) =>
                    setSearchFilters((prev) => ({
                      ...prev,
                      destination: e.target.value,
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 placeholder-gray-500"
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
                  value={searchFilters.checkIn}
                  onChange={(e) =>
                    setSearchFilters((prev) => ({
                      ...prev,
                      checkIn: e.target.value,
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
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
                  value={searchFilters.checkOut}
                  onChange={(e) =>
                    setSearchFilters((prev) => ({
                      ...prev,
                      checkOut: e.target.value,
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900"
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
                  value={searchFilters.guests}
                  onChange={(e) =>
                    setSearchFilters((prev) => ({
                      ...prev,
                      guests: parseInt(e.target.value),
                    }))
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 appearance-none bg-white"
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

            {/* Search Button */}
            <div className="flex items-end">
              <button
                onClick={handleSearch}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <MagnifyingGlassIcon className="w-5 h-5" />
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

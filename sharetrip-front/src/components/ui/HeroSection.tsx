"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  UsersIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

interface HotelSearch {
  destination: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function HeroSection() {
  const [hotelSearch, setHotelSearch] = useState<HotelSearch>({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleHotelSearch = () => {
    console.log("Hotel search:", hotelSearch);
  };

  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/hero/hero1.webp')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-blue-900/30"></div>
      </div>

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-up text-white">
          Travel memories you&apos;ll never forget
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
  );
}

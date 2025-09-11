"use client";

import { useState } from "react";
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  CalendarIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

export default function SearchHero({
  onSearch,
}: {
  onSearch?: (q: Record<string, string>) => void;
}) {
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("2");
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!destination.trim()) return;

    setIsSearching(true);
    try {
      const searchParams = {
        destination: destination.trim(),
        dates: dates || "",
        guests: guests,
      };

      if (onSearch) {
        onSearch(searchParams);
      }
    } finally {
      setIsSearching(false);
    }
  };

  const popularDestinations = [
    "Petra, Jordan",
    "Pyramids of Giza, Egypt",
    "Beirut, Lebanon",
  ];

  return (
    <div className="bg-gradient-to-br from-blue-50 via-white to-purple-50 p-8 rounded-3xl shadow-lg mb-10">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find your next adventure
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Discover unique experiences, join groups and get dynamic pricing as
          more travelers join.
        </p>
      </div>

      {/* Enhanced Search Bar */}
      <div className="bg-white rounded-2xl p-6 shadow-xl max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Destination */}
          <div className="relative md:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Destination
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="Where are you going?"
                className="w-full pl-10 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {/* Popular destinations dropdown */}
            {destination && (
              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
                {popularDestinations
                  .filter((dest) =>
                    dest.toLowerCase().includes(destination.toLowerCase())
                  )
                  .map((dest) => (
                    <button
                      key={dest}
                      onClick={() => setDestination(dest)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-700">{dest}</span>
                      </div>
                    </button>
                  ))}
              </div>
            )}
          </div>

          {/* Dates */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              When
            </label>
            <div className="relative">
              <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                className="w-full pl-10 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Guests */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Travelers
            </label>
            <div className="relative">
              <UsersIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full pl-10 pr-4 py-4 text-lg border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num.toString()}>
                    {num} {num === 1 ? "traveler" : "travelers"}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSearch}
            disabled={!destination.trim() || isSearching}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-xl text-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSearching ? (
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
            ) : (
              <MagnifyingGlassIcon className="w-6 h-6" />
            )}
            {isSearching ? "Searching..." : "Search experiences"}
          </button>
        </div>

        {/* Quick filters */}
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="flex flex-wrap gap-3 justify-center">
            <span className="text-sm font-semibold text-gray-700 mr-2">
              Popular:
            </span>
            {[
              "Food tours",
              "Walking tours",
              "Museums",
              "Cultural sites",
              "Day trips",
              "Adventure",
              "Nightlife",
              "Photography",
            ].map((filter) => (
              <button
                key={filter}
                onClick={() => setDestination(filter)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

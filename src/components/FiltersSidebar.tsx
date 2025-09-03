"use client";

import { useState, useEffect } from "react";
import {
  StarIcon,
  ClockIcon,
  UsersIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function FiltersSidebar({
  onChange,
  initialCategory,
}: {
  onChange?: (q: Record<string, string>) => void;
  initialCategory?: string;
}) {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<string>("");
  const [selectedGroupSize, setSelectedGroupSize] = useState<string>("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialCategory ? [initialCategory] : []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  // Trigger initial category filter
  useEffect(() => {
    if (initialCategory && selectedCategories.includes(initialCategory)) {
      onChange?.({ categories: initialCategory });
    }
  }, [initialCategory, onChange]);

  const categories = [
    "Food & Drink",
    "Culture & History",
    "Adventure",
    "Nature & Outdoors",
    "Art & Museums",
    "Nightlife",
    "Sports",
    "Wellness",
    "Photography",
    "Music",
    "Walking Tours",
  ];

  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
  ];

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onChange?.({ categories: newCategories.join(",") });
  };

  const handleLanguageToggle = (language: string) => {
    const newLanguages = selectedLanguages.includes(language)
      ? selectedLanguages.filter((l) => l !== language)
      : [...selectedLanguages, language];
    setSelectedLanguages(newLanguages);
    onChange?.({ languages: newLanguages.join(",") });
  };

  const handlePriceChange = (min: number, max: number) => {
    setPriceRange([min, max]);
    onChange?.({ minPrice: min.toString(), maxPrice: max.toString() });
  };

  return (
    <aside className="space-y-6">
      {/* Price Range */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <span className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <span className="text-green-600 font-bold text-sm">$</span>
          </span>
          Price Range
        </h3>

        <div className="space-y-4">
          <div className="flex justify-between text-sm text-gray-600">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>

          <div className="relative">
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[0]}
              onChange={(e) =>
                handlePriceChange(Number(e.target.value), priceRange[1])
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="10"
              value={priceRange[1]}
              onChange={(e) =>
                handlePriceChange(priceRange[0], Number(e.target.value))
              }
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb absolute top-0"
            />
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) =>
                handlePriceChange(Number(e.target.value), priceRange[1])
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Min"
            />
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) =>
                handlePriceChange(priceRange[0], Number(e.target.value))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
              placeholder="Max"
            />
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <StarIcon className="w-5 h-5 text-yellow-500" />
          Rating
        </h3>

        <div className="space-y-2">
          {[4.5, 4.0, 3.5, 3.0].map((rating) => (
            <button
              key={rating}
              onClick={() => {
                setSelectedRating(selectedRating === rating ? null : rating);
                onChange?.({
                  minRating: selectedRating === rating ? "" : rating.toString(),
                });
              }}
              className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                selectedRating === rating
                  ? "bg-blue-50 border-2 border-blue-200"
                  : "hover:bg-gray-50 border-2 border-transparent"
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">{rating}+</span>
              </div>
              {selectedRating === rating && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Duration Filter */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <ClockIcon className="w-5 h-5 text-blue-500" />
          Duration
        </h3>

        <div className="space-y-2">
          {[
            { label: "Up to 2 hours", value: "0-2" },
            { label: "2-4 hours", value: "2-4" },
            { label: "4-6 hours", value: "4-6" },
            { label: "Full day (6+ hours)", value: "6-24" },
            { label: "Multi-day", value: "24+" },
          ].map((duration) => (
            <button
              key={duration.value}
              onClick={() => {
                setSelectedDuration(
                  selectedDuration === duration.value ? "" : duration.value
                );
                onChange?.({
                  duration:
                    selectedDuration === duration.value ? "" : duration.value,
                });
              }}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedDuration === duration.value
                  ? "bg-blue-50 border-2 border-blue-200"
                  : "hover:bg-gray-50 border-2 border-transparent"
              }`}
            >
              <span className="text-sm font-medium">{duration.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Group Size */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <UsersIcon className="w-5 h-5 text-purple-500" />
          Group Size
        </h3>

        <div className="space-y-2">
          {[
            { label: "Private tour", value: "1" },
            { label: "Small group (2-5)", value: "2-5" },
            { label: "Medium group (6-10)", value: "6-10" },
            { label: "Large group (10+)", value: "10+" },
          ].map((size) => (
            <button
              key={size.value}
              onClick={() => {
                setSelectedGroupSize(
                  selectedGroupSize === size.value ? "" : size.value
                );
                onChange?.({
                  groupSize: selectedGroupSize === size.value ? "" : size.value,
                });
              }}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedGroupSize === size.value
                  ? "bg-blue-50 border-2 border-blue-200"
                  : "hover:bg-gray-50 border-2 border-transparent"
              }`}
            >
              <span className="text-sm font-medium">{size.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4 flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-orange-500" />
          Categories
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryToggle(category)}
              className={`p-3 rounded-lg text-left transition-colors ${
                selectedCategories.includes(category)
                  ? "bg-blue-50 border-2 border-blue-200 text-blue-700"
                  : "hover:bg-gray-50 border-2 border-transparent text-gray-700"
              }`}
            >
              <span className="text-sm font-medium">{category}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Languages */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <h3 className="font-bold text-lg text-gray-900 mb-4">Languages</h3>

        <div className="space-y-2">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageToggle(language)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                selectedLanguages.includes(language)
                  ? "bg-blue-50 border-2 border-blue-200"
                  : "hover:bg-gray-50 border-2 border-transparent"
              }`}
            >
              <span className="text-sm font-medium">{language}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-sm">
        <button
          onClick={() => {
            setPriceRange([0, 500]);
            setSelectedRating(null);
            setSelectedDuration("");
            setSelectedGroupSize("");
            setSelectedCategories([]);
            setSelectedLanguages([]);
            onChange?.({});
          }}
          className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Clear all filters
        </button>
      </div>
    </aside>
  );
}

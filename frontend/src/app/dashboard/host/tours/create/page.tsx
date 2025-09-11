"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreateTourDto,
  TourCategory,
  CancellationPolicy,
} from "../../../../../types/tour";
import { tourService } from "../../../../../services/tour.service";
import {
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  CalendarIcon,
  TagIcon,
  DocumentTextIcon,
  CheckIcon,
  XMarkIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";

export default function CreateTourPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState<CreateTourDto>({
    title: "",
    city: "",
    country: "",
    category: TourCategory.SHARE_TRIP,
    description: "",
    startTimes: [],
    basePrice: 0,
    currency: "USD",
    minGroup: 1,
    maxGroup: 10,
    durationMins: 120,
    language: "English",
    languages: [],
    isPayWhatYouWant: false,
    status: "draft",
    travelStyles: [],
    accessibility: [],
    startWindow: "morning",
    instantBook: false,
    cancellationPolicy: CancellationPolicy.STANDARD,
    latitude: undefined,
    longitude: undefined,
    meetingPoint: "",
    tags: [],
    searchKeywords: [],
  });

  const [newStartTime, setNewStartTime] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");

  const handleInputChange = (field: keyof CreateTourDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addStartTime = () => {
    if (newStartTime) {
      setFormData((prev) => ({
        ...prev,
        startTimes: [...prev.startTimes, newStartTime],
      }));
      setNewStartTime("");
    }
  };

  const removeStartTime = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      startTimes: prev.startTimes.filter((_, i) => i !== index),
    }));
  };

  const addTag = () => {
    if (newTag && !formData.tags?.includes(newTag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...(prev.tags || []), newTag],
      }));
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags?.filter((t) => t !== tag) || [],
    }));
  };

  const addKeyword = () => {
    if (newKeyword && !formData.searchKeywords?.includes(newKeyword)) {
      setFormData((prev) => ({
        ...prev,
        searchKeywords: [...(prev.searchKeywords || []), newKeyword],
      }));
      setNewKeyword("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setFormData((prev) => ({
      ...prev,
      searchKeywords: prev.searchKeywords?.filter((k) => k !== keyword) || [],
    }));
  };

  const handleArrayChange = (
    field: "languages" | "travelStyles" | "accessibility",
    value: string
  ) => {
    setFormData((prev) => {
      const currentArray = prev[field] || [];
      const newArray = currentArray.includes(value)
        ? currentArray.filter((item) => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      alert("Please enter a tour title");
      return false;
    }
    if (!formData.city.trim()) {
      alert("Please enter a city");
      return false;
    }
    if (!formData.country.trim()) {
      alert("Please enter a country");
      return false;
    }
    if (formData.startTimes.length === 0) {
      alert("Please add at least one start time");
      return false;
    }
    if (formData.basePrice <= 0) {
      alert("Please enter a valid price");
      return false;
    }
    if (formData.durationMins <= 0) {
      alert("Please enter a valid duration");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const result = await tourService.createTour(formData);
      console.log("Tour created successfully:", result);
      // Redirect to the main host dashboard since /dashboard/host/tours doesn't exist
      router.push("/dashboard/host?created=true");
    } catch (error) {
      console.error("Error creating tour:", error);
      alert(error instanceof Error ? error.message : "Failed to create tour");
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    { id: 1, title: "Basic Info", description: "Tour details and location" },
    { id: 2, title: "Schedule & Pricing", description: "Times and pricing" },
    { id: 3, title: "Settings", description: "Languages and preferences" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Create New Tour</h1>
          <p className="mt-2 text-gray-600">
            Create an amazing experience for travelers
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckIcon className="w-5 h-5" />
                  ) : (
                    step.id
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-500">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-20 h-0.5 bg-gray-200 mx-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Basic Information
              </h2>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Amazing city walking tour"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="Paris"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) =>
                      handleInputChange("country", e.target.value)
                    }
                    placeholder="France"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange(
                      "category",
                      e.target.value as TourCategory
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={TourCategory.SHARE_TRIP}>
                    Shared Experience
                  </option>
                  <option value={TourCategory.PRIVATE}>Private Tour</option>
                  <option value={TourCategory.GROUP}>Group Tour</option>
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows={4}
                  value={formData.description || ""}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Describe your tour experience..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {(formData.description || "").length}/2000 characters
                </p>
              </div>

              {/* Meeting Point */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Meeting Point
                </label>
                <input
                  type="text"
                  value={formData.meetingPoint || ""}
                  onChange={(e) =>
                    handleInputChange("meetingPoint", e.target.value)
                  }
                  placeholder="Central Square, near the fountain"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {/* Step 2: Schedule & Pricing */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Schedule & Pricing
              </h2>

              {/* Duration */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration (minutes) *
                </label>
                <input
                  type="number"
                  value={formData.durationMins}
                  onChange={(e) =>
                    handleInputChange(
                      "durationMins",
                      parseInt(e.target.value) || 0
                    )
                  }
                  placeholder="120"
                  min="30"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Start Times */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Available Start Times *
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="datetime-local"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addStartTime}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <PlusIcon className="w-5 h-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.startTimes.map((time, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg"
                    >
                      <span className="text-sm">
                        {new Date(time).toLocaleString()}
                      </span>
                      <button
                        type="button"
                        onClick={() => removeStartTime(index)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Price (cents) *
                  </label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) =>
                      handleInputChange(
                        "basePrice",
                        parseInt(e.target.value) || 0
                      )
                    }
                    placeholder="2500"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Price in cents (e.g., 2500 = $25.00)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Currency
                  </label>
                  <select
                    value={formData.currency}
                    onChange={(e) =>
                      handleInputChange("currency", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="USD">USD</option>
                    <option value="EUR">EUR</option>
                    <option value="GBP">GBP</option>
                  </select>
                </div>
              </div>

              {/* Group Size */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Group Size *
                  </label>
                  <input
                    type="number"
                    value={formData.minGroup}
                    onChange={(e) =>
                      handleInputChange(
                        "minGroup",
                        parseInt(e.target.value) || 1
                      )
                    }
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Group Size *
                  </label>
                  <input
                    type="number"
                    value={formData.maxGroup}
                    onChange={(e) =>
                      handleInputChange(
                        "maxGroup",
                        parseInt(e.target.value) || 1
                      )
                    }
                    min="1"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Pay What You Want */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="payWhatYouWant"
                  checked={formData.isPayWhatYouWant || false}
                  onChange={(e) =>
                    handleInputChange("isPayWhatYouWant", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="payWhatYouWant"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Enable "Pay What You Want" pricing
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Settings */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Tour Settings
              </h2>

              {/* Primary Language */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Language *
                </label>
                <select
                  value={formData.language}
                  onChange={(e) =>
                    handleInputChange("language", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {[
                    "English",
                    "Spanish",
                    "French",
                    "German",
                    "Italian",
                    "Portuguese",
                    "Japanese",
                    "Chinese",
                    "Korean",
                    "Arabic",
                  ].map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/* Additional Languages */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Languages
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "Spanish",
                    "French",
                    "German",
                    "Italian",
                    "Portuguese",
                    "Japanese",
                    "Chinese",
                    "Korean",
                    "Arabic",
                  ]
                    .filter((lang) => lang !== formData.language)
                    .map((lang) => (
                      <label key={lang} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.languages?.includes(lang) || false}
                          onChange={() => handleArrayChange("languages", lang)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {lang}
                        </span>
                      </label>
                    ))}
                </div>
              </div>

              {/* Travel Styles */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Styles
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "relaxed",
                    "adventurous",
                    "foodie",
                    "culture",
                    "nightlife",
                    "family",
                  ].map((style) => (
                    <label key={style} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          formData.travelStyles?.includes(style) || false
                        }
                        onChange={() =>
                          handleArrayChange("travelStyles", style)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700 capitalize">
                        {style}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Accessibility */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accessibility Features
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {[
                    "wheelchair-friendly",
                    "low-walking",
                    "kid-friendly",
                    "women-only",
                  ].map((feature) => (
                    <label key={feature} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={
                          formData.accessibility?.includes(feature) || false
                        }
                        onChange={() =>
                          handleArrayChange("accessibility", feature)
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <span className="ml-2 text-sm text-gray-700">
                        {feature}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Start Window */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Start Window
                </label>
                <select
                  value={formData.startWindow || "morning"}
                  onChange={(e) =>
                    handleInputChange("startWindow", e.target.value)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="morning">Morning</option>
                  <option value="afternoon">Afternoon</option>
                  <option value="evening">Evening</option>
                </select>
              </div>

              {/* Cancellation Policy */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cancellation Policy
                </label>
                <select
                  value={formData.cancellationPolicy}
                  onChange={(e) =>
                    handleInputChange(
                      "cancellationPolicy",
                      e.target.value as CancellationPolicy
                    )
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value={CancellationPolicy.FLEXIBLE}>Flexible</option>
                  <option value={CancellationPolicy.STANDARD}>Standard</option>
                  <option value={CancellationPolicy.STRICT}>Strict</option>
                </select>
              </div>

              {/* Instant Book */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="instantBook"
                  checked={formData.instantBook || false}
                  onChange={(e) =>
                    handleInputChange("instantBook", e.target.checked)
                  }
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="instantBook"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Enable instant booking (no approval required)
                </label>
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Search Keywords */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Keywords
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    placeholder="Add a keyword"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addKeyword}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.searchKeywords?.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
                    >
                      {keyword}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < steps.length ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isSubmitting ? "Creating..." : "Create Tour"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  PhotoIcon,
  PlusIcon,
  XMarkIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  StarIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  CalendarIcon,
  TagIcon,
  GlobeAltIcon,
  CameraIcon,
  DocumentTextIcon,
  AdjustmentsHorizontalIcon,
  ChatBubbleLeftRightIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

// Comprehensive form data interface based on GetYourGuide structure
interface TourFormData {
  // Basic Information
  title: string;
  subtitle: string;
  description: string;
  category: string;

  // Location
  city: string;
  country: string;
  meetingPoint: string;
  latitude?: number;
  longitude?: number;

  // Timing & Duration
  duration: string;
  durationMins: number;
  startTimes: string[];
  availability: {
    days: string[];
    timeSlots: string[];
  };

  // Pricing
  basePrice: number;
  currency: "USD" | "EUR" | "GBP";
  pricingType: "per_person" | "per_group" | "pay_what_you_want";
  groupDiscounts: {
    enabled: boolean;
    tiers: { size: number; discount: number }[];
  };

  // Group Settings
  minGroup: number;
  maxGroup: number;
  instantBook: boolean;

  // Languages
  primaryLanguage: string;
  additionalLanguages: string[];

  // Experience Details
  highlights: string[];
  whatsIncluded: string[];
  whatsNotIncluded: string[];
  whatToBring: string[];
  importantInfo: string[];

  // Accessibility & Requirements
  accessibility: string[];
  ageRestrictions: {
    hasRestrictions: boolean;
    minAge?: number;
    maxAge?: number;
    requiresAdult: boolean;
  };
  fitnessLevel: "easy" | "moderate" | "challenging" | "extreme";

  // Travel Style & Tags
  travelStyles: string[];
  tags: string[];
  searchKeywords: string[];

  // Policies
  cancellationPolicy: "flexible" | "standard" | "strict";
  weatherPolicy: string;

  // Media
  images: string[];
  videos: string[];

  // Special Features
  isPayWhatYouWant: boolean;
  isEarlyBird: boolean;
  earlyBirdDiscount?: number;

  // Itinerary
  itinerary: {
    step: number;
    duration: string;
    title: string;
    description: string;
    location?: string;
  }[];
}

const initialFormData: TourFormData = {
  title: "",
  subtitle: "",
  description: "",
  category: "SHARE_TRIP",
  city: "",
  country: "",
  meetingPoint: "",
  duration: "",
  durationMins: 120,
  startTimes: [],
  availability: {
    days: [],
    timeSlots: [],
  },
  basePrice: 0,
  currency: "USD",
  pricingType: "per_person",
  groupDiscounts: {
    enabled: false,
    tiers: [],
  },
  minGroup: 1,
  maxGroup: 10,
  instantBook: false,
  primaryLanguage: "English",
  additionalLanguages: [],
  highlights: [""],
  whatsIncluded: [""],
  whatsNotIncluded: [""],
  whatToBring: [""],
  importantInfo: [""],
  accessibility: [],
  ageRestrictions: {
    hasRestrictions: false,
    requiresAdult: false,
  },
  fitnessLevel: "easy",
  travelStyles: [],
  tags: [],
  searchKeywords: [],
  cancellationPolicy: "standard",
  weatherPolicy: "",
  images: [],
  videos: [],
  isPayWhatYouWant: false,
  isEarlyBird: false,
  itinerary: [{ step: 1, duration: "30 min", title: "", description: "" }],
};

const tourCategories = [
  { value: "SHARE_TRIP", label: "Shared Experience" },
  { value: "PRIVATE", label: "Private Tour" },
  { value: "GROUP", label: "Group Tour" },
  { value: "FOOD_DRINK", label: "Food & Drink" },
  { value: "CULTURAL", label: "Cultural Experience" },
  { value: "ADVENTURE", label: "Adventure Activity" },
  { value: "SIGHTSEEING", label: "Sightseeing" },
  { value: "WORKSHOP", label: "Workshop/Class" },
  { value: "NIGHTLIFE", label: "Nightlife" },
  { value: "OUTDOOR", label: "Outdoor Activity" },
];

const languages = [
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
  "Russian",
  "Dutch",
];

const travelStyleOptions = [
  "relaxed",
  "adventurous",
  "foodie",
  "culture",
  "nightlife",
  "family",
  "romantic",
  "photography",
  "nature",
  "historical",
];

const accessibilityOptions = [
  "wheelchair-friendly",
  "low-walking",
  "kid-friendly",
  "senior-friendly",
  "pet-friendly",
  "stroller-accessible",
  "hearing-impaired-friendly",
  "visual-impairment-friendly",
];

const weekDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
];

export default function CreateTourPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<TourFormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  const totalSteps = 8;

  const steps = [
    { id: 1, title: "Basic Info", description: "Tour title and description" },
    { id: 2, title: "Location", description: "Where your tour takes place" },
    { id: 3, title: "Timing", description: "Duration and availability" },
    { id: 4, title: "Pricing", description: "Set your prices" },
    { id: 5, title: "Details", description: "What's included and highlights" },
    {
      id: 6,
      title: "Requirements",
      description: "Age, fitness, and accessibility",
    },
    { id: 7, title: "Itinerary", description: "Step-by-step experience" },
    { id: 8, title: "Media & Publish", description: "Photos and final review" },
  ];

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const updateNestedFormData = (path: string[], value: any) => {
    setFormData((prev) => {
      const newData = { ...prev };
      let current: any = newData;
      for (let i = 0; i < path.length - 1; i++) {
        current = current[path[i]];
      }
      current[path[path.length - 1]] = value;
      return newData;
    });
  };

  const addListItem = (field: keyof TourFormData) => {
    const currentArray = formData[field] as string[];
    updateFormData(field, [...currentArray, ""]);
  };

  const updateListItem = (
    field: keyof TourFormData,
    index: number,
    value: string
  ) => {
    const currentArray = formData[field] as string[];
    const newArray = [...currentArray];
    newArray[index] = value;
    updateFormData(field, newArray);
  };

  const removeListItem = (field: keyof TourFormData, index: number) => {
    const currentArray = formData[field] as string[];
    const newArray = currentArray.filter((_, i) => i !== index);
    updateFormData(field, newArray);
  };

  const addItineraryStep = () => {
    const newStep = {
      step: formData.itinerary.length + 1,
      duration: "",
      title: "",
      description: "",
    };
    updateFormData("itinerary", [...formData.itinerary, newStep]);
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1:
        if (!formData.title.trim()) newErrors.title = "Title is required";
        if (!formData.description.trim())
          newErrors.description = "Description is required";
        if (!formData.category) newErrors.category = "Category is required";
        break;
      case 2:
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.meetingPoint.trim())
          newErrors.meetingPoint = "Meeting point is required";
        break;
      case 3:
        if (!formData.duration.trim())
          newErrors.duration = "Duration is required";
        if (formData.startTimes.length === 0)
          newErrors.startTimes = "At least one start time is required";
        break;
      case 4:
        if (formData.basePrice <= 0)
          newErrors.basePrice = "Price must be greater than 0";
        if (formData.minGroup < 1)
          newErrors.minGroup = "Minimum group size must be at least 1";
        if (formData.maxGroup < formData.minGroup)
          newErrors.maxGroup =
            "Maximum group size must be greater than minimum";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("authToken"); // Adjust based on your auth implementation

      const response = await fetch("/api/tours/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || "Failed to create tour");
      }

      const result = await response.json();
      console.log("Tour created successfully:", result);

      // Show success message or redirect
      router.push("/dashboard/host/tours?created=true");
    } catch (error) {
      console.error("Error creating tour:", error);
      // You could show an error toast/notification here
      alert(error instanceof Error ? error.message : "Failed to create tour");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return renderBasicInfoStep();
      case 2:
        return renderLocationStep();
      case 3:
        return renderTimingStep();
      case 4:
        return renderPricingStep();
      case 5:
        return renderDetailsStep();
      case 6:
        return renderRequirementsStep();
      case 7:
        return renderItineraryStep();
      case 8:
        return renderMediaStep();
      default:
        return null;
    }
  };

  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Tour Title *
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => updateFormData("title", e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.title ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Hidden Gems Food Tour of Barcelona"
          maxLength={100}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title}</p>
        )}
        <p className="text-gray-500 text-sm mt-1">
          {formData.title.length}/100 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Subtitle
        </label>
        <input
          type="text"
          value={formData.subtitle}
          onChange={(e) => updateFormData("subtitle", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="A short, catchy subtitle for your tour"
          maxLength={150}
        />
        <p className="text-gray-500 text-sm mt-1">
          {formData.subtitle.length}/150 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category *
        </label>
        <select
          value={formData.category}
          onChange={(e) => updateFormData("category", e.target.value)}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.category ? "border-red-500" : "border-gray-300"
          }`}
        >
          <option value="">Select a category</option>
          {tourCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm mt-1">{errors.category}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData("description", e.target.value)}
          rows={6}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Describe your tour in detail. What makes it special? What will guests experience?"
          maxLength={2000}
        />
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">{errors.description}</p>
        )}
        <p className="text-gray-500 text-sm mt-1">
          {formData.description.length}/2000 characters
        </p>
      </div>
    </div>
  );

  const renderLocationStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <MapPinIcon className="h-4 w-4 inline mr-1" />
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => updateFormData("city", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.city ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Barcelona"
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <GlobeAltIcon className="h-4 w-4 inline mr-1" />
            Country *
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => updateFormData("country", e.target.value)}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.country ? "border-red-500" : "border-gray-300"
            }`}
            placeholder="Spain"
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">{errors.country}</p>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Meeting Point *
        </label>
        <textarea
          value={formData.meetingPoint}
          onChange={(e) => updateFormData("meetingPoint", e.target.value)}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            errors.meetingPoint ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="Provide detailed meeting point instructions. Include landmarks, nearby metro stations, etc."
        />
        {errors.meetingPoint && (
          <p className="text-red-500 text-sm mt-1">{errors.meetingPoint}</p>
        )}
        <p className="text-gray-500 text-sm mt-1">
          Be as specific as possible to help guests find you easily
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
          <p className="text-blue-700 text-sm">
            Consider adding GPS coordinates or What3Words location for better
            accuracy
          </p>
        </div>
      </div>
    </div>
  );

  const renderTimingStep = () => (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <ClockIcon className="h-4 w-4 inline mr-1" />
          Duration *
        </label>
        <div className="grid grid-cols-2 gap-4">
          <select
            value={formData.duration}
            onChange={(e) => {
              updateFormData("duration", e.target.value);
              // Auto-set duration in minutes
              const mins =
                {
                  "30-60m": 45,
                  "1-2h": 90,
                  "2-3h": 150,
                  "3-4h": 210,
                  "half-day": 240,
                  "full-day": 480,
                }[e.target.value] || 120;
              updateFormData("durationMins", mins);
            }}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.duration ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select duration</option>
            <option value="30-60m">30-60 minutes</option>
            <option value="1-2h">1-2 hours</option>
            <option value="2-3h">2-3 hours</option>
            <option value="3-4h">3-4 hours</option>
            <option value="half-day">Half day (4 hours)</option>
            <option value="full-day">Full day (8 hours)</option>
          </select>
          <input
            type="number"
            value={formData.durationMins}
            onChange={(e) =>
              updateFormData("durationMins", parseInt(e.target.value))
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Minutes"
            min={15}
            max={720}
          />
        </div>
        {errors.duration && (
          <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Available Days
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {weekDays.map((day) => (
            <label
              key={day}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.availability.days.includes(day)}
                onChange={(e) => {
                  const days = e.target.checked
                    ? [...formData.availability.days, day]
                    : formData.availability.days.filter((d) => d !== day);
                  updateNestedFormData(["availability", "days"], days);
                }}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{day}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Start Times *
        </label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
          {timeSlots.map((time) => (
            <label
              key={time}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.startTimes.includes(time)}
                onChange={(e) => {
                  const times = e.target.checked
                    ? [...formData.startTimes, time]
                    : formData.startTimes.filter((t) => t !== time);
                  updateFormData("startTimes", times);
                }}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{time}</span>
            </label>
          ))}
        </div>
        {errors.startTimes && (
          <p className="text-red-500 text-sm mt-1">{errors.startTimes}</p>
        )}
      </div>

      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id="instantBook"
          checked={formData.instantBook}
          onChange={(e) => updateFormData("instantBook", e.target.checked)}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label
          htmlFor="instantBook"
          className="text-sm text-gray-700 cursor-pointer"
        >
          Enable instant booking (guests can book without approval)
        </label>
      </div>
    </div>
  );

  const renderPricingStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CurrencyDollarIcon className="h-4 w-4 inline mr-1" />
            Base Price *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              {formData.currency === "USD"
                ? "$"
                : formData.currency === "EUR"
                ? "€"
                : "£"}
            </span>
            <input
              type="number"
              value={formData.basePrice}
              onChange={(e) =>
                updateFormData("basePrice", parseFloat(e.target.value))
              }
              className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                errors.basePrice ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="50"
              min={0}
              step={0.01}
            />
          </div>
          {errors.basePrice && (
            <p className="text-red-500 text-sm mt-1">{errors.basePrice}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Currency
          </label>
          <select
            value={formData.currency}
            onChange={(e) => updateFormData("currency", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Pricing Type
        </label>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="pricingType"
              value="per_person"
              checked={formData.pricingType === "per_person"}
              onChange={(e) => updateFormData("pricingType", e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">Per person</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="pricingType"
              value="per_group"
              checked={formData.pricingType === "per_group"}
              onChange={(e) => updateFormData("pricingType", e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Per group (total price)
            </span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="pricingType"
              value="pay_what_you_want"
              checked={formData.pricingType === "pay_what_you_want"}
              onChange={(e) => {
                updateFormData("pricingType", e.target.value);
                updateFormData("isPayWhatYouWant", e.target.checked);
              }}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              Pay what you want (minimum suggestion)
            </span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <UsersIcon className="h-4 w-4 inline mr-1" />
            Min Group Size *
          </label>
          <input
            type="number"
            value={formData.minGroup}
            onChange={(e) =>
              updateFormData("minGroup", parseInt(e.target.value))
            }
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.minGroup ? "border-red-500" : "border-gray-300"
            }`}
            min={1}
            max={50}
          />
          {errors.minGroup && (
            <p className="text-red-500 text-sm mt-1">{errors.minGroup}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Group Size *
          </label>
          <input
            type="number"
            value={formData.maxGroup}
            onChange={(e) =>
              updateFormData("maxGroup", parseInt(e.target.value))
            }
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.maxGroup ? "border-red-500" : "border-gray-300"
            }`}
            min={formData.minGroup}
            max={50}
          />
          {errors.maxGroup && (
            <p className="text-red-500 text-sm mt-1">{errors.maxGroup}</p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="earlyBird"
            checked={formData.isEarlyBird}
            onChange={(e) => updateFormData("isEarlyBird", e.target.checked)}
            className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
          />
          <label
            htmlFor="earlyBird"
            className="text-sm text-gray-700 cursor-pointer"
          >
            Offer early bird discount (bookings 2+ weeks in advance)
          </label>
        </div>

        {formData.isEarlyBird && (
          <div className="ml-7">
            <input
              type="number"
              value={formData.earlyBirdDiscount || 0}
              onChange={(e) =>
                updateFormData("earlyBirdDiscount", parseInt(e.target.value))
              }
              className="w-24 px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="10"
              min={5}
              max={50}
            />
            <span className="ml-2 text-sm text-gray-700">% discount</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderDetailsStep = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <StarIcon className="h-4 w-4 inline mr-1" />
          Tour Highlights
        </label>
        <p className="text-gray-500 text-sm mb-3">
          Add the most exciting aspects of your tour
        </p>
        {formData.highlights.map((highlight, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={highlight}
              onChange={(e) =>
                updateListItem("highlights", index, e.target.value)
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Visit hidden local markets"
            />
            {formData.highlights.length > 1 && (
              <button
                type="button"
                onClick={() => removeListItem("highlights", index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("highlights")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add highlight</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <CheckIcon className="h-4 w-4 inline mr-1" />
          What's Included
        </label>
        {formData.whatsIncluded.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                updateListItem("whatsIncluded", index, e.target.value)
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Local guide, Snacks, Transportation"
            />
            {formData.whatsIncluded.length > 1 && (
              <button
                type="button"
                onClick={() => removeListItem("whatsIncluded", index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("whatsIncluded")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add item</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          What's Not Included
        </label>
        {formData.whatsNotIncluded.map((item, index) => (
          <div key={index} className="flex items-center space-x-2 mb-2">
            <input
              type="text"
              value={item}
              onChange={(e) =>
                updateListItem("whatsNotIncluded", index, e.target.value)
              }
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Personal expenses, Tips, Drinks"
            />
            {formData.whatsNotIncluded.length > 1 && (
              <button
                type="button"
                onClick={() => removeListItem("whatsNotIncluded", index)}
                className="p-2 text-red-500 hover:bg-red-50 rounded"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={() => addListItem("whatsNotIncluded")}
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
        >
          <PlusIcon className="h-4 w-4" />
          <span>Add item</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <LanguageIcon className="h-4 w-4 inline mr-1" />
          Languages
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs text-gray-500 mb-1">
              Primary Language
            </label>
            <select
              value={formData.primaryLanguage}
              onChange={(e) =>
                updateFormData("primaryLanguage", e.target.value)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs text-gray-500 mb-1">
              Additional Languages
            </label>
            <div className="flex flex-wrap gap-2">
              {languages
                .filter((lang) => lang !== formData.primaryLanguage)
                .map((lang) => (
                  <label
                    key={lang}
                    className="flex items-center space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={formData.additionalLanguages.includes(lang)}
                      onChange={(e) => {
                        const langs = e.target.checked
                          ? [...formData.additionalLanguages, lang]
                          : formData.additionalLanguages.filter(
                              (l) => l !== lang
                            );
                        updateFormData("additionalLanguages", langs);
                      }}
                      className="h-3 w-3 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="text-gray-700">{lang}</span>
                  </label>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <TagIcon className="h-4 w-4 inline mr-1" />
          Travel Styles & Tags
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {travelStyleOptions.map((style) => (
            <label
              key={style}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.travelStyles.includes(style)}
                onChange={(e) => {
                  const styles = e.target.checked
                    ? [...formData.travelStyles, style]
                    : formData.travelStyles.filter((s) => s !== style);
                  updateFormData("travelStyles", styles);
                }}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 capitalize">{style}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRequirementsStep = () => (
    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          <AdjustmentsHorizontalIcon className="h-4 w-4 inline mr-1" />
          Fitness Level Required
        </label>
        <div className="space-y-3">
          {[
            {
              value: "easy",
              label: "Easy",
              desc: "Suitable for all fitness levels",
            },
            {
              value: "moderate",
              label: "Moderate",
              desc: "Some walking or light activity required",
            },
            {
              value: "challenging",
              label: "Challenging",
              desc: "Good fitness level required",
            },
            {
              value: "extreme",
              label: "Extreme",
              desc: "Excellent fitness and experience required",
            },
          ].map((level) => (
            <label
              key={level.value}
              className="flex items-start space-x-3 cursor-pointer"
            >
              <input
                type="radio"
                name="fitnessLevel"
                value={level.value}
                checked={formData.fitnessLevel === level.value}
                onChange={(e) => updateFormData("fitnessLevel", e.target.value)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mt-1"
              />
              <div>
                <div className="text-sm font-medium text-gray-700">
                  {level.label}
                </div>
                <div className="text-xs text-gray-500">{level.desc}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Age Restrictions
        </label>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.ageRestrictions.hasRestrictions}
              onChange={(e) =>
                updateNestedFormData(
                  ["ageRestrictions", "hasRestrictions"],
                  e.target.checked
                )
              }
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">
              This tour has age restrictions
            </span>
          </label>

          {formData.ageRestrictions.hasRestrictions && (
            <div className="ml-7 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Minimum Age
                  </label>
                  <input
                    type="number"
                    value={formData.ageRestrictions.minAge || ""}
                    onChange={(e) =>
                      updateNestedFormData(
                        ["ageRestrictions", "minAge"],
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                    min={0}
                    max={100}
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">
                    Maximum Age
                  </label>
                  <input
                    type="number"
                    value={formData.ageRestrictions.maxAge || ""}
                    onChange={(e) =>
                      updateNestedFormData(
                        ["ageRestrictions", "maxAge"],
                        parseInt(e.target.value)
                      )
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="99"
                    min={0}
                    max={100}
                  />
                </div>
              </div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.ageRestrictions.requiresAdult}
                  onChange={(e) =>
                    updateNestedFormData(
                      ["ageRestrictions", "requiresAdult"],
                      e.target.checked
                    )
                  }
                  className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">
                  Children must be accompanied by an adult
                </span>
              </label>
            </div>
          )}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Accessibility Features
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {accessibilityOptions.map((option) => (
            <label
              key={option}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.accessibility.includes(option)}
                onChange={(e) => {
                  const features = e.target.checked
                    ? [...formData.accessibility, option]
                    : formData.accessibility.filter((f) => f !== option);
                  updateFormData("accessibility", features);
                }}
                className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">
                {option.replace("-", " ")}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Cancellation Policy
        </label>
        <select
          value={formData.cancellationPolicy}
          onChange={(e) => updateFormData("cancellationPolicy", e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="flexible">
            Flexible - Free cancellation up to 24 hours before
          </option>
          <option value="standard">
            Standard - Free cancellation up to 48 hours before
          </option>
          <option value="strict">
            Strict - Free cancellation up to 7 days before
          </option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Weather Policy
        </label>
        <textarea
          value={formData.weatherPolicy}
          onChange={(e) => updateFormData("weatherPolicy", e.target.value)}
          rows={3}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="What happens if weather conditions are unfavorable? Do you offer alternatives or refunds?"
        />
      </div>
    </div>
  );

  const renderItineraryStep = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <DocumentTextIcon className="h-5 w-5 inline mr-2" />
          Tour Itinerary
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Break down your tour into steps to help guests understand what to
          expect
        </p>
      </div>

      {formData.itinerary.map((step, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Step {step.step}</h4>
            {formData.itinerary.length > 1 && (
              <button
                type="button"
                onClick={() => {
                  const newItinerary = formData.itinerary.filter(
                    (_, i) => i !== index
                  );
                  updateFormData("itinerary", newItinerary);
                }}
                className="text-red-500 hover:text-red-700"
              >
                <XMarkIcon className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">
                Duration
              </label>
              <input
                type="text"
                value={step.duration}
                onChange={(e) => {
                  const newItinerary = [...formData.itinerary];
                  newItinerary[index].duration = e.target.value;
                  updateFormData("itinerary", newItinerary);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="30 min"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs text-gray-500 mb-1">Title</label>
              <input
                type="text"
                value={step.title}
                onChange={(e) => {
                  const newItinerary = [...formData.itinerary];
                  newItinerary[index].title = e.target.value;
                  updateFormData("itinerary", newItinerary);
                }}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Visit the local market"
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-xs text-gray-500 mb-1">
              Description
            </label>
            <textarea
              value={step.description}
              onChange={(e) => {
                const newItinerary = [...formData.itinerary];
                newItinerary[index].description = e.target.value;
                updateFormData("itinerary", newItinerary);
              }}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe what happens in this step"
            />
          </div>

          <div className="mt-4">
            <label className="block text-xs text-gray-500 mb-1">
              Location (optional)
            </label>
            <input
              type="text"
              value={step.location || ""}
              onChange={(e) => {
                const newItinerary = [...formData.itinerary];
                newItinerary[index].location = e.target.value;
                updateFormData("itinerary", newItinerary);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Specific location for this step"
            />
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={addItineraryStep}
        className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm"
      >
        <PlusIcon className="h-4 w-4" />
        <span>Add step</span>
      </button>
    </div>
  );

  const renderMediaStep = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          <CameraIcon className="h-5 w-5 inline mr-2" />
          Photos & Media
        </h3>
        <p className="text-gray-500 text-sm mb-6">
          Add high-quality photos to showcase your tour. The first image will be
          used as the main cover photo.
        </p>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            Drag and drop photos here, or click to select files
          </p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Select Photos
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              // Handle file upload here
              console.log("Files selected:", e.target.files);
            }}
          />
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
          <div className="flex items-center">
            <ExclamationTriangleIcon className="h-5 w-5 text-yellow-500 mr-2" />
            <div className="text-yellow-700 text-sm">
              <p className="font-medium">Photo Guidelines:</p>
              <ul className="list-disc list-inside mt-1 text-xs">
                <li>Use high-resolution images (at least 1200px wide)</li>
                <li>Show actual tour locations and activities</li>
                <li>Include photos of yourself as the guide</li>
                <li>Avoid stock photos or images from other sources</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Final Review</h3>
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Title:</span>
              <p className="text-gray-600">{formData.title || "Not set"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Category:</span>
              <p className="text-gray-600">
                {tourCategories.find((c) => c.value === formData.category)
                  ?.label || "Not set"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Location:</span>
              <p className="text-gray-600">
                {formData.city && formData.country
                  ? `${formData.city}, ${formData.country}`
                  : "Not set"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Duration:</span>
              <p className="text-gray-600">{formData.duration || "Not set"}</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Price:</span>
              <p className="text-gray-600">
                {formData.basePrice > 0
                  ? `${
                      formData.currency === "USD"
                        ? "$"
                        : formData.currency === "EUR"
                        ? "€"
                        : "£"
                    }${formData.basePrice}`
                  : "Not set"}
              </p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Group Size:</span>
              <p className="text-gray-600">
                {formData.minGroup} - {formData.maxGroup} people
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center">
          <InformationCircleIcon className="h-5 w-5 text-blue-500 mr-2" />
          <div className="text-blue-700 text-sm">
            <p className="font-medium">Ready to publish?</p>
            <p className="mt-1">
              Your tour will be submitted for review and will be live within 24
              hours if approved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Create New Tour
          </h1>
          <p className="text-gray-600">
            Share your unique experience with travelers around the world
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    currentStep === step.id
                      ? "bg-blue-600 text-white"
                      : currentStep > step.id
                      ? "bg-green-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckIcon className="h-4 w-4" />
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`hidden md:block w-16 h-1 mx-2 ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="mt-4 text-center">
            <h2 className="text-xl font-semibold text-gray-900">
              {steps[currentStep - 1].title}
            </h2>
            <p className="text-gray-600 text-sm">
              {steps[currentStep - 1].description}
            </p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              currentStep === 1
                ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Previous
          </button>

          <div className="text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>

          {currentStep === totalSteps ? (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                isSubmitting
                  ? "bg-blue-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {isSubmitting ? "Publishing..." : "Publish Tour"}
            </button>
          ) : (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

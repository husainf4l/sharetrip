"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { apiService } from "../../services/api";
import { useAuth } from "../../contexts/AuthContext";
import {
  CameraIcon,
  MapPinIcon,
  ClockIcon,
  UsersIcon,
  CurrencyDollarIcon,
  StarIcon,
  CheckCircleIcon,
  GlobeAltIcon,
  ShieldCheckIcon,
  PhotoIcon,
  DocumentTextIcon,
  CreditCardIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

interface HostDetails {
  // Basic Information
  experienceType: string;
  title: string;
  description: string;
  category: string;
  subcategory: string;

  // Location & Logistics
  location: string;
  meetingPoint: string;
  duration: string;
  groupSize: { min: number; max: number };
  ageRestriction: { min: number; max: number };

  // Pricing
  pricePerPerson: number;
  currency: string;
  pricingType: "fixed" | "person" | "group";
  discounts: {
    children: number;
    seniors: number;
    groups: number;
  };

  // Schedule & Availability
  availability: {
    days: string[];
    timeSlots: string[];
    blackoutDates: string[];
  };

  // Host Information
  hostExperience: string;
  languages: string[];
  certifications: string[];
  specialSkills: string[];

  // Experience Details
  whatsIncluded: string[];
  whatsExcluded: string[];
  requirements: string[];
  cancellationPolicy: string;
  difficulty: "easy" | "moderate" | "challenging";
  physicalActivity: "low" | "medium" | "high";

  // Media
  photos: File[];
  videos: string[];

  // Additional Services
  addons: {
    name: string;
    price: number;
    description: string;
  }[];
}

const experienceTypes = [
  "Walking Tours",
  "Food & Drink",
  "Culture & History",
  "Adventure",
  "Nature & Outdoors",
  "Photography",
  "Arts & Crafts",
  "Sports & Recreation",
  "Wellness & Spa",
  "Nightlife",
  "Transportation",
  "Other",
];

const categories = [
  "City Tours",
  "Historical Sites",
  "Museums & Galleries",
  "Food Tours",
  "Wine Tasting",
  "Cooking Classes",
  "Hiking & Trekking",
  "Water Sports",
  "Adventure Sports",
  "Photography Tours",
  "Art Workshops",
  "Music & Entertainment",
  "Wellness Retreats",
  "Spa Treatments",
  "Night Tours",
  "Airport Transfers",
];

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
  "Chinese",
  "Japanese",
  "Korean",
  "Arabic",
  "Russian",
  "Dutch",
  "Swedish",
  "Norwegian",
  "Danish",
  "Finnish",
  "Polish",
  "Turkish",
];

const certifications = [
  "First Aid Certified",
  "Tour Guide License",
  "Food Safety Certified",
  "Scuba Diving Instructor",
  "Mountain Guide",
  "Wilderness First Responder",
  "CPR Certified",
  "Language Interpreter",
  "Photography Professional",
  "Cooking Professional",
];

export default function BecomeHostPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [hostDetails, setHostDetails] = useState<HostDetails>({
    experienceType: "",
    title: "",
    description: "",
    category: "",
    subcategory: "",
    location: "",
    meetingPoint: "",
    duration: "",
    groupSize: { min: 1, max: 10 },
    ageRestriction: { min: 0, max: 99 },
    pricePerPerson: 0,
    currency: "USD",
    pricingType: "person",
    discounts: { children: 0, seniors: 0, groups: 0 },
    availability: { days: [], timeSlots: [], blackoutDates: [] },
    hostExperience: "",
    languages: [],
    certifications: [],
    specialSkills: [],
    whatsIncluded: [],
    whatsExcluded: [],
    requirements: [],
    cancellationPolicy: "flexible",
    difficulty: "easy",
    physicalActivity: "low",
    photos: [],
    videos: [],
    addons: [],
  });

  const [loading, setLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const steps = [
    { id: 1, name: "Basic Info", icon: DocumentTextIcon },
    { id: 2, name: "Experience Details", icon: MapPinIcon },
    { id: 3, name: "Pricing & Schedule", icon: CurrencyDollarIcon },
    { id: 4, name: "Host Profile", icon: UsersIcon },
    { id: 5, name: "Media & Review", icon: PhotoIcon },
    { id: 6, name: "Verification", icon: ShieldCheckIcon },
  ];

  const updateHostDetails = (field: string, value: unknown) => {
    setHostDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const loadSampleData = () => {
    setHostDetails({
      experienceType: "Food & Drink",
      title: "Tokyo Street Food Adventure",
      description:
        "Embark on a culinary journey through Tokyo's vibrant street food scene. Discover hidden gems, local favorites, and authentic Japanese flavors in the bustling streets of Shibuya, Harajuku, and Akihabara. Your expert guide will take you to the best spots for ramen, takoyaki, sushi rolls, and more, sharing stories about Japanese food culture along the way.",
      category: "Food Tours",
      subcategory: "Street Food",
      location: "Tokyo, Japan",
      meetingPoint: "Shibuya Station, Hachiko Exit",
      duration: "2-4 hours",
      groupSize: { min: 2, max: 8 },
      ageRestriction: { min: 8, max: 99 },
      pricePerPerson: 50,
      currency: "USD",
      pricingType: "person",
      discounts: { children: 20, seniors: 10, groups: 15 },
      availability: {
        days: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        timeSlots: ["10:00", "14:00", "18:00"],
        blackoutDates: [],
      },
      hostExperience:
        "5 years as a food tour guide in Tokyo, certified food safety expert",
      languages: ["English", "Japanese"],
      certifications: ["Food Safety Certified", "Tour Guide License"],
      specialSkills: ["Japanese cuisine expert", "Photography", "Storytelling"],
      whatsIncluded: [
        "Expert guide",
        "Tastings of 8-10 different foods",
        "Transportation between locations",
        "Cultural insights",
      ],
      whatsExcluded: [
        "Transportation to meeting point",
        "Beverages",
        "Gratuities",
      ],
      requirements: ["Comfortable walking shoes", "Open mind for new flavors"],
      cancellationPolicy: "flexible",
      difficulty: "easy",
      physicalActivity: "medium",
      photos: [],
      videos: [],
      addons: [
        {
          name: "Private photography session",
          price: 25,
          description: "Professional photos of your food adventure",
        },
      ],
    });
  };

  const addToArray = (field: keyof HostDetails, value: string) => {
    if (Array.isArray(hostDetails[field])) {
      const currentArray = hostDetails[field] as string[];
      if (!currentArray.includes(value)) {
        updateHostDetails(field, [...currentArray, value]);
      }
    }
  };

  const removeFromArray = (field: keyof HostDetails, value: string) => {
    if (Array.isArray(hostDetails[field])) {
      const currentArray = hostDetails[field] as string[];
      updateHostDetails(
        field,
        currentArray.filter((item) => item !== value)
      );
    }
  };

  const handlePhotoUpload = (files: FileList) => {
    const newPhotos = Array.from(files);
    updateHostDetails("photos", [...hostDetails.photos, ...newPhotos]);
  };

  const removePhoto = (index: number) => {
    const newPhotos = hostDetails.photos.filter((_, i) => i !== index);
    updateHostDetails("photos", newPhotos);
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Please log in to submit your application.");
      return;
    }

    setLoading(true);
    try {
      await apiService.saveStep({
        userId: user.id,
        stepNumber: 1,
        data: hostDetails as unknown as Record<string, unknown>,
      });
      alert(
        "Host application submitted successfully! We will review your application within 24-48 hours."
      );
      router.push("/dashboard");
    } catch (error) {
      console.error("Error submitting application:", error);
      alert("Error submitting application. Please try again.");
    }
    setLoading(false);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Type *
              </label>
              <select
                value={hostDetails.experienceType}
                onChange={(e) =>
                  updateHostDetails("experienceType", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select experience type</option>
                {experienceTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Title *
              </label>
              <input
                type="text"
                value={hostDetails.title}
                onChange={(e) => updateHostDetails("title", e.target.value)}
                placeholder="e.g., Historic Walking Tour of Old Town"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <select
                value={hostDetails.category}
                onChange={(e) => updateHostDetails("category", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Detailed Description *
              </label>
              <textarea
                value={hostDetails.description}
                onChange={(e) =>
                  updateHostDetails("description", e.target.value)
                }
                placeholder="Describe your experience in detail. What will participants do? What will they learn? What makes it special?"
                rows={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Duration *
                </label>
                <select
                  value={hostDetails.duration}
                  onChange={(e) =>
                    updateHostDetails("duration", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select duration</option>
                  <option value="1-2 hours">1-2 hours</option>
                  <option value="2-4 hours">2-4 hours</option>
                  <option value="4-6 hours">4-6 hours</option>
                  <option value="6-8 hours">6-8 hours</option>
                  <option value="Full day">Full day</option>
                  <option value="Multi-day">Multi-day</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty Level
                </label>
                <select
                  value={hostDetails.difficulty}
                  onChange={(e) =>
                    updateHostDetails("difficulty", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="easy">Easy</option>
                  <option value="moderate">Moderate</option>
                  <option value="challenging">Challenging</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                value={hostDetails.location}
                onChange={(e) => updateHostDetails("location", e.target.value)}
                placeholder="e.g., Barcelona, Spain"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Point *
              </label>
              <input
                type="text"
                value={hostDetails.meetingPoint}
                onChange={(e) =>
                  updateHostDetails("meetingPoint", e.target.value)
                }
                placeholder="Exact location where participants should meet"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Group Size
                </label>
                <input
                  type="number"
                  value={hostDetails.groupSize.min}
                  onChange={(e) =>
                    updateHostDetails("groupSize", {
                      ...hostDetails.groupSize,
                      min: parseInt(e.target.value) || 1,
                    })
                  }
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Group Size
                </label>
                <input
                  type="number"
                  value={hostDetails.groupSize.max}
                  onChange={(e) =>
                    updateHostDetails("groupSize", {
                      ...hostDetails.groupSize,
                      max: parseInt(e.target.value) || 10,
                    })
                  }
                  min="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Min Age
                </label>
                <input
                  type="number"
                  value={hostDetails.ageRestriction.min}
                  onChange={(e) =>
                    updateHostDetails("ageRestriction", {
                      ...hostDetails.ageRestriction,
                      min: parseInt(e.target.value) || 0,
                    })
                  }
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Max Age
                </label>
                <input
                  type="number"
                  value={hostDetails.ageRestriction.max}
                  onChange={(e) =>
                    updateHostDetails("ageRestriction", {
                      ...hostDetails.ageRestriction,
                      max: parseInt(e.target.value) || 99,
                    })
                  }
                  min="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Physical Activity Level
              </label>
              <select
                value={hostDetails.physicalActivity}
                onChange={(e) =>
                  updateHostDetails("physicalActivity", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="low">Low - Minimal physical activity</option>
                <option value="medium">
                  Medium - Light walking or standing
                </option>
                <option value="high">High - Strenuous activity required</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What's Included
              </label>
              <div className="space-y-2">
                {hostDetails.whatsIncluded.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-green-50 p-2 rounded"
                  >
                    <span className="text-sm">{item}</span>
                    <button
                      onClick={() => removeFromArray("whatsIncluded", item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add what's included (e.g., Professional guide, Entrance fees)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        addToArray("whatsIncluded", value);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                What's Excluded
              </label>
              <div className="space-y-2">
                {hostDetails.whatsExcluded.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-red-50 p-2 rounded"
                  >
                    <span className="text-sm">{item}</span>
                    <button
                      onClick={() => removeFromArray("whatsExcluded", item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add what's excluded (e.g., Transportation, Meals)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        addToArray("whatsExcluded", value);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Requirements for Participants
              </label>
              <div className="space-y-2">
                {hostDetails.requirements.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-blue-50 p-2 rounded"
                  >
                    <span className="text-sm">{item}</span>
                    <button
                      onClick={() => removeFromArray("requirements", item)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add requirements (e.g., Comfortable shoes, Valid ID)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        addToArray("requirements", value);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price per Person *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={hostDetails.pricePerPerson}
                    onChange={(e) =>
                      updateHostDetails(
                        "pricePerPerson",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    min="0"
                    step="0.01"
                    className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Currency
                </label>
                <select
                  value={hostDetails.currency}
                  onChange={(e) =>
                    updateHostDetails("currency", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="JPY">JPY (¥)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pricing Type
              </label>
              <select
                value={hostDetails.pricingType}
                onChange={(e) =>
                  updateHostDetails("pricingType", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="person">Per Person</option>
                <option value="fixed">Fixed Price (any group size)</option>
                <option value="group">Per Group</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Discounts
              </label>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Children (%)
                  </label>
                  <input
                    type="number"
                    value={hostDetails.discounts.children}
                    onChange={(e) =>
                      updateHostDetails("discounts", {
                        ...hostDetails.discounts,
                        children: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Seniors (%)
                  </label>
                  <input
                    type="number"
                    value={hostDetails.discounts.seniors}
                    onChange={(e) =>
                      updateHostDetails("discounts", {
                        ...hostDetails.discounts,
                        seniors: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Groups (%)
                  </label>
                  <input
                    type="number"
                    value={hostDetails.discounts.groups}
                    onChange={(e) =>
                      updateHostDetails("discounts", {
                        ...hostDetails.discounts,
                        groups: parseInt(e.target.value) || 0,
                      })
                    }
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cancellation Policy
              </label>
              <select
                value={hostDetails.cancellationPolicy}
                onChange={(e) =>
                  updateHostDetails("cancellationPolicy", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="flexible">
                  Flexible - Free cancellation up to 24 hours
                </option>
                <option value="moderate">
                  Moderate - Free cancellation up to 7 days
                </option>
                <option value="strict">
                  Strict - Free cancellation up to 30 days
                </option>
                <option value="non-refundable">Non-refundable</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Available Days
              </label>
              <div className="grid grid-cols-7 gap-2">
                {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                  (day) => (
                    <button
                      key={day}
                      onClick={() => {
                        const days = hostDetails.availability.days.includes(day)
                          ? hostDetails.availability.days.filter(
                              (d) => d !== day
                            )
                          : [...hostDetails.availability.days, day];
                        updateHostDetails("availability", {
                          ...hostDetails.availability,
                          days,
                        });
                      }}
                      className={`p-2 text-sm rounded border ${
                        hostDetails.availability.days.includes(day)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                      }`}
                    >
                      {day}
                    </button>
                  )
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Time Slots
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["Morning (9-12)", "Afternoon (12-17)", "Evening (17-21)"].map(
                  (slot) => (
                    <button
                      key={slot}
                      onClick={() => {
                        const timeSlots =
                          hostDetails.availability.timeSlots.includes(slot)
                            ? hostDetails.availability.timeSlots.filter(
                                (t) => t !== slot
                              )
                            : [...hostDetails.availability.timeSlots, slot];
                        updateHostDetails("availability", {
                          ...hostDetails.availability,
                          timeSlots,
                        });
                      }}
                      className={`p-2 text-sm rounded border ${
                        hostDetails.availability.timeSlots.includes(slot)
                          ? "bg-blue-500 text-white border-blue-500"
                          : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                      }`}
                    >
                      {slot}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Experience as a Host *
              </label>
              <textarea
                value={hostDetails.hostExperience}
                onChange={(e) =>
                  updateHostDetails("hostExperience", e.target.value)
                }
                placeholder="Tell us about your experience in this field. How long have you been doing this? What makes you passionate about it?"
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Languages You Speak
              </label>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      if (hostDetails.languages.includes(lang)) {
                        removeFromArray("languages", lang);
                      } else {
                        addToArray("languages", lang);
                      }
                    }}
                    className={`p-2 text-sm rounded border ${
                      hostDetails.languages.includes(lang)
                        ? "bg-blue-500 text-white border-blue-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-blue-300"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Certifications & Qualifications
              </label>
              <div className="space-y-2 mb-4">
                {certifications.map((cert) => (
                  <button
                    key={cert}
                    onClick={() => {
                      if (hostDetails.certifications.includes(cert)) {
                        removeFromArray("certifications", cert);
                      } else {
                        addToArray("certifications", cert);
                      }
                    }}
                    className={`p-2 text-sm rounded border mr-2 mb-2 ${
                      hostDetails.certifications.includes(cert)
                        ? "bg-green-500 text-white border-green-500"
                        : "bg-white text-gray-700 border-gray-300 hover:border-green-300"
                    }`}
                  >
                    {cert}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Special Skills
              </label>
              <div className="space-y-2">
                {hostDetails.specialSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-purple-50 p-2 rounded"
                  >
                    <span className="text-sm">{skill}</span>
                    <button
                      onClick={() => removeFromArray("specialSkills", skill)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add special skills (e.g., Photography, Local knowledge)"
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      const value = e.currentTarget.value.trim();
                      if (value) {
                        addToArray("specialSkills", value);
                        e.currentTarget.value = "";
                      }
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Photos *
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <PhotoIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-4">
                  Upload high-quality photos of your experience (minimum 5
                  photos)
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) =>
                    e.target.files && handlePhotoUpload(e.target.files)
                  }
                  className="hidden"
                  id="photo-upload"
                />
                <label
                  htmlFor="photo-upload"
                  className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
                >
                  Choose Photos
                </label>
              </div>

              {hostDetails.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-4 mt-4">
                  {hostDetails.photos.map((photo, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded"
                      />
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1"
                      >
                        <XMarkIcon className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                onChange={(e) => updateHostDetails("videos", [e.target.value])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                Photo Guidelines
              </h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Use high-resolution images (at least 1000x750px)</li>
                <li>• Show the actual experience and location</li>
                <li>• Include photos of yourself as the host</li>
                <li>• Avoid blurry or low-quality images</li>
                <li>• Include diverse angles and activities</li>
              </ul>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Review Your Experience
              </h3>
              <p className="text-gray-600">
                Please review all the information before submitting your
                application.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900">
                  {hostDetails.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {hostDetails.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Location:</span>{" "}
                  {hostDetails.location}
                </div>
                <div>
                  <span className="font-medium">Duration:</span>{" "}
                  {hostDetails.duration}
                </div>
                <div>
                  <span className="font-medium">Price:</span> $
                  {hostDetails.pricePerPerson}
                </div>
                <div>
                  <span className="font-medium">Group Size:</span>{" "}
                  {hostDetails.groupSize.min}-{hostDetails.groupSize.max}
                </div>
              </div>

              <div>
                <span className="font-medium">Languages:</span>{" "}
                {hostDetails.languages.join(", ") || "None specified"}
              </div>

              <div>
                <span className="font-medium">Photos:</span>{" "}
                {hostDetails.photos.length} uploaded
              </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">Next Steps</h4>
              <ul className="text-sm text-yellow-800 space-y-1">
                <li>
                  • Our team will review your application within 24-48 hours
                </li>
                <li>• You'll receive an email with the review results</li>
                <li>
                  • If approved, you'll be able to start accepting bookings
                </li>
                <li>
                  • You'll need to complete payment setup to receive earnings
                </li>
              </ul>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Become a Host
              </h1>
              <p className="text-gray-600 mt-1">
                Share your passion and earn money by hosting unique experiences
              </p>
            </div>
            <button
              onClick={() => setPreviewMode(!previewMode)}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              {previewMode ? "Edit Mode" : "Preview"}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white mb-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-4">
              Turn Your Passion Into Income
            </h2>
            <p className="text-xl mb-6 opacity-90">
              Join thousands of hosts who are sharing their unique experiences
              and earning money doing what they love.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">$2,500</div>
                <div className="text-sm opacity-90">
                  Average monthly earnings
                </div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-sm opacity-90">Active hosts worldwide</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-2">4.8★</div>
                <div className="text-sm opacity-90">Average host rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <CurrencyDollarIcon className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Earn Money
            </h3>
            <p className="text-gray-600 text-sm">
              Set your own prices and earn up to $500 per experience. Get paid
              weekly with no hidden fees.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <ClockIcon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Flexible Schedule
            </h3>
            <p className="text-gray-600 text-sm">
              Host on your own terms. Choose when and how often you want to host
              experiences.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <UsersIcon className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Meet People
            </h3>
            <p className="text-gray-600 text-sm">
              Connect with travelers from around the world and share your local
              culture and expertise.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <StarIcon className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Build Your Brand
            </h3>
            <p className="text-gray-600 text-sm">
              Grow your personal brand and establish yourself as an expert in
              your field.
            </p>
          </div>
        </div>

        {/* Success Stories */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Success Stories from Our Hosts
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="border-l-4 border-blue-500 pl-4">
              <p className="text-gray-600 italic mb-2">
                "I've been hosting food tours for 2 years and it completely
                changed my life. I now earn more than my previous job while
                doing what I love!"
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                  M
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    Maria Rodriguez
                  </div>
                  <div className="text-sm text-gray-600">
                    Food Tour Host, Barcelona
                  </div>
                </div>
              </div>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <p className="text-gray-600 italic mb-2">
                "Photography workshops have become my full-time business. The
                platform makes it easy to manage bookings and payments."
              </p>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                  A
                </div>
                <div>
                  <div className="font-medium text-gray-900">Alex Chen</div>
                  <div className="text-sm text-gray-600">
                    Photography Workshop Host, Tokyo
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Application Process */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Simple 3-Step Application Process
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Create Your Profile
              </h4>
              <p className="text-gray-600 text-sm">
                Tell us about yourself, your experience, and the unique
                experiences you want to host.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Get Approved
              </h4>
              <p className="text-gray-600 text-sm">
                Our team reviews your application within 24-48 hours and
                provides feedback if needed.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Start Hosting
              </h4>
              <p className="text-gray-600 text-sm">
                Set up payments, create your first experience, and start
                welcoming guests.
              </p>
            </div>
          </div>
        </div>
        {/* Requirements & Guidelines */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">
            Host Requirements & Guidelines
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Basic Requirements
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Must be 18 years or older
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Valid government-issued ID
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">Smartphone with camera</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Reliable transportation (if needed)
                  </span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Basic English communication skills
                  </span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-4">
                Experience Guidelines
              </h4>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <GlobeAltIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Unique and authentic experiences
                  </span>
                </li>
                <li className="flex items-start">
                  <GlobeAltIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Safe and appropriate for all ages
                  </span>
                </li>
                <li className="flex items-start">
                  <GlobeAltIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    High-quality photos and descriptions
                  </span>
                </li>
                <li className="flex items-start">
                  <GlobeAltIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Clear pricing and cancellation policies
                  </span>
                </li>
                <li className="flex items-start">
                  <GlobeAltIcon className="h-5 w-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-gray-600">
                    Responsive communication with guests
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Popular Experience Types */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Popular Experience Types
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🍽️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Food & Drink
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Cooking classes, food tours, wine tastings, and culinary
                experiences
              </p>
              <div className="text-sm text-gray-500">Most popular category</div>
            </div>

            <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏛️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Culture & History
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Museum tours, historical walks, cultural workshops, and heritage
                sites
              </p>
              <div className="text-sm text-gray-500">High demand</div>
            </div>

            <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏞️</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                Nature & Adventure
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                Hiking, biking, kayaking, wildlife viewing, and outdoor
                activities
              </p>
              <div className="text-sm text-gray-500">Growing fast</div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Frequently Asked Questions
          </h3>
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                How much can I earn as a host?
              </h4>
              <p className="text-gray-600">
                Earnings vary by experience type and location. Food tours in
                major cities can earn $50-200 per person, while cultural
                experiences might earn $30-100. Most successful hosts earn
                $1,000-5,000 monthly.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                How long does the approval process take?
              </h4>
              <p className="text-gray-600">
                Most applications are reviewed within 24-48 hours. If additional
                information is needed, our team will contact you directly. Once
                approved, you can start hosting immediately.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                What if I need to cancel an experience?
              </h4>
              <p className="text-gray-600">
                You can set your own cancellation policy. We recommend being
                flexible to build good reviews. Cancellations made by hosts may
                affect their ratings and future bookings.
              </p>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Do I need special insurance?
              </h4>
              <p className="text-gray-600">
                While not required, we recommend host liability insurance for
                certain activities. We provide basic coverage for approved
                experiences, but additional insurance is recommended for
                high-risk activities.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                Can I host multiple experiences?
              </h4>
              <p className="text-gray-600">
                Absolutely! Many successful hosts manage 3-5 different
                experiences. Each experience has its own calendar, pricing, and
                guest management.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-xl p-8 text-white text-center mb-8">
          <h3 className="text-3xl font-bold mb-4">
            Ready to Start Your Hosting Journey?
          </h3>
          <p className="text-xl mb-6 opacity-90">
            Join thousands of successful hosts who are turning their passions
            into profitable businesses
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() =>
                document
                  .getElementById("application-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Start Your Application
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200">
              Learn More
            </button>
          </div>
          <p className="text-sm mt-4 opacity-75">
            ⚡ Application takes only 10-15 minutes • 📱 Mobile-friendly • 🛡️
            Secure & private
          </p>
        </div>

        <div className="mb-8" id="application-form">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    currentStep > step.id
                      ? "bg-green-500 text-white"
                      : currentStep === step.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckIcon className="h-6 w-6" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="ml-3">
                  <p
                    className={`text-sm font-medium ${
                      currentStep >= step.id ? "text-gray-900" : "text-gray-500"
                    }`}
                  >
                    {step.name}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4 text-center">
          <button
            onClick={loadSampleData}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Load Sample: Tokyo Street Food Adventure
          </button>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">
            Need Help?
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h4 className="font-medium text-blue-900 mb-2">📞 Support</h4>
              <p className="text-sm text-blue-800">
                Our host success team is here to help you create amazing
                experiences.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">📚 Resources</h4>
              <p className="text-sm text-blue-800">
                Check out our host guide and best practices for success.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-blue-900 mb-2">💡 Tips</h4>
              <p className="text-sm text-blue-800">
                Focus on unique, authentic experiences that travelers can't find
                elsewhere.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CreateTourDto,
  TourCategory,
  CancellationPolicy,
} from "../../../../../types/tour";
import { tourService } from "../../../../../services/tour.service";
import { CheckIcon, XMarkIcon, PlusIcon } from "@heroicons/react/24/outline";

const getExponent = (currency: string): number => {
  // Currency exponents (number of decimal places)
  const exponents: Record<string, number> = {
    USD: 2,
    EUR: 2,
    GBP: 2,
    JPY: 0,
    KRW: 0,
    VND: 0,
    THB: 2,
    // Add more currencies as needed
  };
  return exponents[currency] || 2; // Default to 2 decimals
};

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
    photos: [],
    coverPhoto: undefined,
    itinerary: "",
    whatsIncluded: [],
    whatsExcluded: [],
    requirements: [],
    highlights: [],
    difficulty: "easy",
    ageRestriction: "",
  });

  const [newStartTime, setNewStartTime] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newKeyword, setNewKeyword] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [coverPhotoIndex, setCoverPhotoIndex] = useState<number>(-1);
  const [newIncluded, setNewIncluded] = useState("");
  const [newExcluded, setNewExcluded] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (
    field: keyof CreateTourDto,
    value: string | number | string[] | boolean | CancellationPolicy
  ) => {
    console.log("Input change:", field, value); // Debug log
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const addStartTime = () => {
    if (newStartTime) {
      try {
        // Validate the datetime string
        const date = new Date(newStartTime);
        if (isNaN(date.getTime())) {
          alert("Please enter a valid date and time");
          return;
        }

        // Ensure it's in the future
        if (date <= new Date()) {
          alert("Start time must be in the future");
          return;
        }

        setFormData((prev) => ({
          ...prev,
          startTimes: [...prev.startTimes, newStartTime],
        }));
        setNewStartTime("");
      } catch (error) {
        alert("Invalid date format. Please try again.");
      }
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

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) => {
      // Check file type
      if (!file.type.startsWith("image/")) {
        alert(`${file.name} is not a valid image file`);
        return false;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    setSelectedFiles((prev) => {
      const newFiles = [...prev, ...validFiles];
      // Sync with formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        photos: newFiles,
      }));
      return newFiles;
    });
  };

  const removePhoto = (index: number) => {
    setSelectedFiles((prev) => {
      const newFiles = prev.filter((_, i) => i !== index);
      // Sync with formData
      setFormData((prevFormData) => ({
        ...prevFormData,
        photos: newFiles,
      }));
      return newFiles;
    });

    if (coverPhotoIndex === index) {
      setCoverPhotoIndex(-1);
      setFormData((prev) => ({ ...prev, coverPhoto: undefined }));
    } else if (coverPhotoIndex > index) {
      setCoverPhotoIndex(coverPhotoIndex - 1);
    }
  };

  const setCoverPhoto = (index: number) => {
    setCoverPhotoIndex(index);
    setFormData((prev) => ({
      ...prev,
      coverPhoto: selectedFiles[index],
    }));
  };

  const addIncluded = () => {
    if (newIncluded.trim()) {
      setFormData((prev) => ({
        ...prev,
        whatsIncluded: [...(prev.whatsIncluded || []), newIncluded.trim()],
      }));
      setNewIncluded("");
    }
  };

  const removeIncluded = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      whatsIncluded: prev.whatsIncluded?.filter((i) => i !== item) || [],
    }));
  };

  const addExcluded = () => {
    if (newExcluded.trim()) {
      setFormData((prev) => ({
        ...prev,
        whatsExcluded: [...(prev.whatsExcluded || []), newExcluded.trim()],
      }));
      setNewExcluded("");
    }
  };

  const removeExcluded = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      whatsExcluded: prev.whatsExcluded?.filter((i) => i !== item) || [],
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim()) {
      setFormData((prev) => ({
        ...prev,
        requirements: [...(prev.requirements || []), newRequirement.trim()],
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      requirements: prev.requirements?.filter((i) => i !== item) || [],
    }));
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...(prev.highlights || []), newHighlight.trim()],
      }));
      setNewHighlight("");
    }
  };

  const removeHighlight = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights?.filter((i) => i !== item) || [],
    }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleFileSelect(e.dataTransfer.files);
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
    const errors: string[] = [];

    // Basic required fields - ensure they're not empty after trimming
    const trimmedTitle = formData.title?.trim();
    if (!trimmedTitle || trimmedTitle.length === 0) {
      errors.push("Title is required and cannot be empty");
    }

    const trimmedCity = formData.city?.trim();
    if (!trimmedCity || trimmedCity.length === 0) {
      errors.push("City is required and cannot be empty");
    }

    const trimmedCountry = formData.country?.trim();
    if (!trimmedCountry || trimmedCountry.length === 0) {
      errors.push("Country is required and cannot be empty");
    }

    const trimmedLanguage = formData.language?.trim();
    if (!trimmedLanguage || trimmedLanguage.length === 0) {
      errors.push("Language is required and cannot be empty");
    }

    // Category validation - ensure it's a valid enum value
    const validCategories = Object.values(TourCategory);
    if (!formData.category || !validCategories.includes(formData.category)) {
      errors.push(`Category must be one of: ${validCategories.join(", ")}`);
    }

    // Start times validation - ensure at least one valid ISO date
    if (!formData.startTimes || formData.startTimes.length === 0) {
      errors.push("At least one start time is required");
    } else {
      const validStartTimes: string[] = [];
      formData.startTimes.forEach((time, index) => {
        if (!time || typeof time !== "string") {
          errors.push(`Start time ${index + 1} is invalid`);
        } else {
          const trimmedTime = time.trim();
          if (!trimmedTime) {
            errors.push(`Start time ${index + 1} cannot be empty`);
          } else {
            try {
              const date = new Date(trimmedTime);
              if (isNaN(date.getTime())) {
                errors.push(`Start time ${index + 1} must be a valid date`);
              } else if (date <= new Date()) {
                errors.push(`Start time ${index + 1} must be in the future`);
              } else {
                validStartTimes.push(trimmedTime);
              }
            } catch (error) {
              errors.push(
                `Start time ${index + 1} must be a valid date format`
              );
            }
          }
        }
      });

      // Update formData with only valid start times
      if (validStartTimes.length > 0) {
        setFormData((prev) => ({ ...prev, startTimes: validStartTimes }));
      }
    }

    // Numeric validations - ensure they're positive numbers
    const basePrice = Number(formData.basePrice);
    if (!basePrice || isNaN(basePrice) || basePrice <= 0) {
      errors.push("Base price must be a number greater than or equal to 1");
    }

    const minGroup = Number(formData.minGroup);
    if (!minGroup || isNaN(minGroup) || minGroup < 1) {
      errors.push(
        "Minimum group size must be a number greater than or equal to 1"
      );
    }

    const maxGroup = Number(formData.maxGroup);
    if (!maxGroup || isNaN(maxGroup) || maxGroup < 1) {
      errors.push(
        "Maximum group size must be a number greater than or equal to 1"
      );
    }

    if (minGroup && maxGroup && minGroup > maxGroup) {
      errors.push(
        "Minimum group size cannot be greater than maximum group size"
      );
    }

    const durationMins = Number(formData.durationMins);
    if (!durationMins || isNaN(durationMins) || durationMins < 1) {
      errors.push(
        "Duration must be a number greater than or equal to 1 minute"
      );
    }

    // Photo validation
    if (!selectedFiles || selectedFiles.length === 0) {
      errors.push("At least one photo is required");
    }
    if (selectedFiles && selectedFiles.length > 10) {
      errors.push("Maximum 10 photos allowed");
    }

    // If there are errors, show them
    if (errors.length > 0) {
      console.log("Validation errors:", errors);
      console.log("Form data being validated:", {
        title: trimmedTitle,
        city: trimmedCity,
        country: trimmedCountry,
        category: formData.category,
        language: trimmedLanguage,
        startTimes: formData.startTimes,
        basePrice: basePrice,
        minGroup: minGroup,
        maxGroup: maxGroup,
        durationMins: durationMins,
        photosCount: selectedFiles?.length || 0,
      });
      alert("Please fix the following errors:\n\n" + errors.join("\n"));
      return false;
    }

    console.log("✅ All validations passed");
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    console.log("Form validation passed. Form data:", formData);
    console.log("Selected files:", selectedFiles);
    console.log("Cover photo index:", coverPhotoIndex);

    // Validate data types and formats
    console.log("Data validation:");
    console.log(
      "- Title type:",
      typeof formData.title,
      "value:",
      formData.title
    );
    console.log(
      "- Category type:",
      typeof formData.category,
      "value:",
      formData.category
    );
    console.log(
      "- Start times:",
      formData.startTimes,
      "length:",
      formData.startTimes.length
    );
    console.log(
      "- Base price type:",
      typeof formData.basePrice,
      "value:",
      formData.basePrice
    );
    console.log("- Photos count:", selectedFiles.length);
    console.log("- Cover photo index:", coverPhotoIndex);

    // Prepare clean data for submission with enhanced validation
    const exponent = getExponent(formData.currency || "USD");
    const factor = Math.pow(10, exponent);
    const roundedBasePrice = Math.max(
      0,
      Math.round((Number(formData.basePrice) || 0) * factor) / factor
    );

    const cleanFormData: CreateTourDto = {
      // Required string fields - ensure they're trimmed and not empty
      title: formData.title?.trim() || "",
      city: formData.city?.trim() || "",
      country: formData.country?.trim() || "",
      category: formData.category, // Already validated to be valid enum
      language: formData.language?.trim() || "",

      // Optional string fields
      description: formData.description?.trim() || undefined,

      // Required arrays - filter out empty values and ensure ISO format for dates
      startTimes:
        formData.startTimes
          ?.filter((time) => {
            if (!time || !time.trim()) return false;
            try {
              const date = new Date(time.trim());
              return !isNaN(date.getTime()) && date > new Date();
            } catch {
              return false;
            }
          })
          .map((time) => {
            try {
              // Ensure it's in ISO format
              const date = new Date(time.trim());
              // For datetime-local inputs, we need to ensure it's treated as local time
              // Create a new date object to avoid timezone issues
              const localDate = new Date(
                date.getFullYear(),
                date.getMonth(),
                date.getDate(),
                date.getHours(),
                date.getMinutes()
              );
              return localDate.toISOString();
            } catch {
              console.warn("Failed to convert time to ISO:", time);
              // Fallback to original if parsing fails
              return time.trim();
            }
          }) || [],

      // Required numeric fields - ensure they're positive and properly rounded
      basePrice: roundedBasePrice,
      minGroup: Math.max(1, Math.round(Number(formData.minGroup) || 1)),
      maxGroup: Math.max(1, Math.round(Number(formData.maxGroup) || 1)),
      durationMins: Math.max(
        1,
        Math.round(Number(formData.durationMins) || 60)
      ),

      // Optional arrays with proper filtering
      languages:
        formData.languages?.filter((lang) => lang && lang.trim()) || [],
      travelStyles:
        formData.travelStyles?.filter((style) => style && style.trim()) || [],
      accessibility:
        formData.accessibility?.filter((acc) => acc && acc.trim()) || [],
      tags: formData.tags?.filter((tag) => tag && tag.trim()) || [],
      searchKeywords:
        formData.searchKeywords?.filter(
          (keyword) => keyword && keyword.trim()
        ) || [],
      whatsIncluded:
        formData.whatsIncluded?.filter((item) => item && item.trim()) || [],
      whatsExcluded:
        formData.whatsExcluded?.filter((item) => item && item.trim()) || [],
      requirements:
        formData.requirements?.filter((req) => req && req.trim()) || [],
      highlights:
        formData.highlights?.filter(
          (highlight) => highlight && highlight.trim()
        ) || [],

      // Optional fields with defaults
      currency: formData.currency || "USD",
      isPayWhatYouWant: Boolean(formData.isPayWhatYouWant),
      status: formData.status || "draft",
      startWindow: formData.startWindow || "morning",
      instantBook: Boolean(formData.instantBook),
      cancellationPolicy:
        formData.cancellationPolicy || CancellationPolicy.STANDARD,

      // Location fields
      latitude: formData.latitude ? Number(formData.latitude) : undefined,
      longitude: formData.longitude ? Number(formData.longitude) : undefined,
      meetingPoint: formData.meetingPoint?.trim() || undefined,

      // Additional details
      itinerary: formData.itinerary?.trim() || undefined,
      difficulty: formData.difficulty || "easy",
      ageRestriction: formData.ageRestriction?.trim() || undefined,

      // Files
      photos: selectedFiles,
      coverPhoto:
        coverPhotoIndex >= 0 ? selectedFiles[coverPhotoIndex] : undefined,
    };

    console.log("Clean form data for submission:", cleanFormData);

    // Final validation of clean data - ensure all required fields meet backend expectations
    const finalValidationErrors: string[] = [];

    if (
      !cleanFormData.title ||
      typeof cleanFormData.title !== "string" ||
      cleanFormData.title.trim().length === 0
    ) {
      finalValidationErrors.push("Title must be a non-empty string");
    }
    if (
      !cleanFormData.city ||
      typeof cleanFormData.city !== "string" ||
      cleanFormData.city.trim().length === 0
    ) {
      finalValidationErrors.push("City must be a non-empty string");
    }
    if (
      !cleanFormData.country ||
      typeof cleanFormData.country !== "string" ||
      cleanFormData.country.trim().length === 0
    ) {
      finalValidationErrors.push("Country must be a non-empty string");
    }
    if (
      !cleanFormData.language ||
      typeof cleanFormData.language !== "string" ||
      cleanFormData.language.trim().length === 0
    ) {
      finalValidationErrors.push("Language must be a non-empty string");
    }
    if (
      !cleanFormData.category ||
      typeof cleanFormData.category !== "string" ||
      !Object.values(TourCategory).includes(
        cleanFormData.category as TourCategory
      )
    ) {
      finalValidationErrors.push(
        `Category must be one of: ${Object.values(TourCategory).join(", ")}`
      );
    }
    if (
      !Array.isArray(cleanFormData.startTimes) ||
      cleanFormData.startTimes.length === 0
    ) {
      finalValidationErrors.push("At least one valid start time is required");
    } else {
      // Validate each start time is a valid ISO string
      cleanFormData.startTimes.forEach((time, index) => {
        if (typeof time !== "string") {
          finalValidationErrors.push(
            `Start time ${index + 1} must be a string`
          );
        } else {
          try {
            const date = new Date(time);
            if (isNaN(date.getTime())) {
              finalValidationErrors.push(
                `Start time ${index + 1} must be a valid ISO 8601 date string`
              );
            }
          } catch {
            finalValidationErrors.push(
              `Start time ${index + 1} must be a valid ISO 8601 date string`
            );
          }
        }
      });
    }
    if (
      typeof cleanFormData.basePrice !== "number" ||
      cleanFormData.basePrice <= 0
    ) {
      finalValidationErrors.push("Base price must be a number >= 1");
    }
    if (
      typeof cleanFormData.minGroup !== "number" ||
      cleanFormData.minGroup < 1
    ) {
      finalValidationErrors.push("Minimum group size must be a number >= 1");
    }
    if (
      typeof cleanFormData.maxGroup !== "number" ||
      cleanFormData.maxGroup < 1
    ) {
      finalValidationErrors.push("Maximum group size must be a number >= 1");
    }
    if (cleanFormData.minGroup > cleanFormData.maxGroup) {
      finalValidationErrors.push(
        "Minimum group size cannot be greater than maximum"
      );
    }
    if (
      typeof cleanFormData.durationMins !== "number" ||
      cleanFormData.durationMins < 1
    ) {
      finalValidationErrors.push("Duration must be a number >= 1");
    }

    if (finalValidationErrors.length > 0) {
      console.error("Final validation failed:", finalValidationErrors);
      alert("Final validation failed:\n\n" + finalValidationErrors.join("\n"));
      return;
    }

    console.log("✅ Final validation passed. Submitting tour...");

    setIsSubmitting(true);
    try {
      const result = await tourService.createTour(cleanFormData);
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
    { id: 3, title: "Photos", description: "Upload tour photos" },
    { id: 4, title: "Details", description: "Itinerary and inclusions" },
    { id: 5, title: "Settings", description: "Languages and preferences" },
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
          {/* Debug info */}
          <div className="mb-4 p-2 bg-gray-100 rounded text-xs">
            <details>
              <summary>Debug: Current Form Data (click to expand)</summary>
              <pre>{JSON.stringify(formData, null, 2)}</pre>
            </details>
          </div>

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
                  <option value={TourCategory.TOURS_SIGHTSEEING}>
                    Tours & Sightseeing
                  </option>
                  <option value={TourCategory.CULTURE_EXPERIENCES}>
                    Culture Experiences
                  </option>
                  <option value={TourCategory.ADVENTURE_OUTDOORS}>
                    Adventure & Outdoors
                  </option>
                  <option value={TourCategory.FOOD_TOURS}>Food Tours</option>
                  <option value={TourCategory.WALKING_TOURS}>
                    Walking Tours
                  </option>
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
                  {formData.startTimes.map((time: string, index: number) => (
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
                    Base Price *
                  </label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) =>
                      handleInputChange(
                        "basePrice",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder={
                      getExponent(formData.currency || "USD") === 0
                        ? "2500"
                        : "25.00"
                    }
                    min="0"
                    step={Math.pow(
                      10,
                      -getExponent(formData.currency || "USD")
                    )}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    Price in {formData.currency || "USD"} (e.g.,{" "}
                    {getExponent(formData.currency || "USD") === 0
                      ? "2500"
                      : "25.00"}
                    )
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
                  Enable &quot;Pay What You Want&quot; pricing
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Photos */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Tour Photos
              </h2>

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Photos *
                </label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                    isDragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <div className="space-y-4">
                    <div>
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="text-sm text-gray-600">
                      <label htmlFor="photo-upload" className="cursor-pointer">
                        <span className="font-medium text-blue-600 hover:text-blue-500">
                          Click to upload
                        </span>
                        <span className="text-gray-500"> or drag and drop</span>
                      </label>
                      <input
                        id="photo-upload"
                        name="photo-upload"
                        type="file"
                        multiple
                        accept="image/*"
                        className="sr-only"
                        onChange={(e) => handleFileSelect(e.target.files)}
                      />
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB each (max 10 photos) (max 10
                      photos)
                    </p>
                  </div>
                </div>
              </div>

              {/* Photo Preview */}
              {selectedFiles.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Selected Photos ({selectedFiles.length})
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-lg flex items-center justify-center">
                          <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                            <button
                              type="button"
                              onClick={() => setCoverPhoto(index)}
                              className={`px-2 py-1 text-xs font-medium rounded ${
                                coverPhotoIndex === index
                                  ? "bg-green-600 text-white"
                                  : "bg-white text-gray-900 hover:bg-gray-100"
                              }`}
                            >
                              {coverPhotoIndex === index
                                ? "Cover"
                                : "Set Cover"}
                            </button>
                            <button
                              type="button"
                              onClick={() => removePhoto(index)}
                              className="px-2 py-1 text-xs font-medium bg-red-600 text-white rounded hover:bg-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                        {coverPhotoIndex === index && (
                          <div className="absolute top-2 left-2 bg-green-600 text-white text-xs px-2 py-1 rounded">
                            Cover Photo
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    Tip: Select one photo as your cover photo. This will be the
                    main image displayed for your tour.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 4: Details */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Tour Details
              </h2>

              {/* Itinerary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Itinerary
                </label>
                <textarea
                  rows={6}
                  value={formData.itinerary || ""}
                  onChange={(e) =>
                    handleInputChange("itinerary", e.target.value)
                  }
                  placeholder="Describe the detailed itinerary for your tour..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <p className="mt-1 text-sm text-gray-500">
                  {(formData.itinerary || "").length}/2000 characters
                </p>
              </div>

              {/* Highlights */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tour Highlights
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newHighlight}
                    onChange={(e) => setNewHighlight(e.target.value)}
                    placeholder="Add a highlight"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addHighlight}
                    className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.highlights?.map(
                    (highlight: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-blue-50 px-3 py-2 rounded-lg"
                      >
                        <span className="text-sm">{highlight}</span>
                        <button
                          type="button"
                          onClick={() => removeHighlight(highlight)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* What&apos;s Included */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What&apos;s Included
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newIncluded}
                    onChange={(e) => setNewIncluded(e.target.value)}
                    placeholder="Add included item"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addIncluded}
                    className="px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.whatsIncluded?.map(
                    (item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg"
                      >
                        <span className="text-sm">{item}</span>
                        <button
                          type="button"
                          onClick={() => removeIncluded(item)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* What&apos;s Excluded */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What&apos;s Excluded
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newExcluded}
                    onChange={(e) => setNewExcluded(e.target.value)}
                    placeholder="Add excluded item"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addExcluded}
                    className="px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.whatsExcluded?.map(
                    (item: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-red-50 px-3 py-2 rounded-lg"
                      >
                        <span className="text-sm">{item}</span>
                        <button
                          type="button"
                          onClick={() => removeExcluded(item)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Requirements
                </label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    value={newRequirement}
                    onChange={(e) => setNewRequirement(e.target.value)}
                    placeholder="Add requirement"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={addRequirement}
                    className="px-4 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="space-y-2">
                  {formData.requirements?.map(
                    (requirement: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-yellow-50 px-3 py-2 rounded-lg"
                      >
                        <span className="text-sm">{requirement}</span>
                        <button
                          type="button"
                          onClick={() => removeRequirement(requirement)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <XMarkIcon className="w-4 h-4" />
                        </button>
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Difficulty and Age Restriction */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Difficulty Level
                  </label>
                  <select
                    value={formData.difficulty || "easy"}
                    onChange={(e) =>
                      handleInputChange("difficulty", e.target.value)
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="easy">Easy</option>
                    <option value="moderate">Moderate</option>
                    <option value="challenging">Challenging</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age Restriction
                  </label>
                  <input
                    type="text"
                    value={formData.ageRestriction || ""}
                    onChange={(e) =>
                      handleInputChange("ageRestriction", e.target.value)
                    }
                    placeholder="e.g., 18+ or All ages welcome"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Settings */}
          {currentStep === 5 && (
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
                  {formData.tags?.map((tag: string, index: number) => (
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
                  {formData.searchKeywords?.map(
                    (keyword: string, index: number) => (
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
                    )
                  )}
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

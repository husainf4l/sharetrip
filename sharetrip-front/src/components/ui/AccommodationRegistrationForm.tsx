"use client";

import { useState, useEffect } from "react";
import { accommodationService } from "@/services/accommodation.service";

interface AccommodationFormData {
  title: string;
  description: string;
  categoryId: string;
  city: string;
  country: string;
  address: string;
  latitude?: number;
  longitude?: number;
  basePrice: number;
  currency: string;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: string[];
  isAvailable: boolean;
}

interface AccommodationCategory {
  id: string;
  name: string;
  type: string;
  title: string;
  subtitle: string;
  sectionTitle: string;
}

interface AccommodationRegistrationFormProps {
  selectedCategory?: string;
  onSubmit?: (data: AccommodationFormData) => void;
  onCancel?: () => void;
}

export default function AccommodationRegistrationForm({
  selectedCategory,
  onSubmit,
  onCancel,
}: AccommodationRegistrationFormProps) {
  const [formData, setFormData] = useState<AccommodationFormData>({
    title: "",
    description: "",
    categoryId: "",
    city: "",
    country: "",
    address: "",
    basePrice: 0,
    currency: "USD",
    maxGuests: 1,
    bedrooms: 1,
    bathrooms: 1,
    amenities: [],
    images: [],
    isAvailable: true,
  });

  const [categories, setCategories] = useState<AccommodationCategory[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1);
  const [imageUrls, setImageUrls] = useState<string[]>([""]);

  // Common amenities list
  const commonAmenities = [
    "WiFi",
    "Parking",
    "TV",
    "Kitchen",
    "Air Conditioning",
    "Heating",
    "Balcony",
    "Pool",
    "Beach Access",
    "Gym",
    "Spa",
    "Restaurant",
    "Bar",
    "Room Service",
    "Laundry",
    "Pet Friendly",
    "Smoking Allowed",
    "Wheelchair Accessible",
    "Business Center",
    "Concierge",
  ];

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (selectedCategory && categories.length > 0) {
      const category = categories.find(cat => cat.type === selectedCategory);
      if (category) {
        setFormData(prev => ({ ...prev, categoryId: category.id }));
      }
    }
  }, [selectedCategory, categories]);

  const fetchCategories = async () => {
    try {
      const categoriesData = await accommodationService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
      setError("Failed to load accommodation categories");
    }
  };

  const handleInputChange = (field: keyof AccommodationFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const handleImageUrlChange = (index: number, url: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = url;
    setImageUrls(newUrls);
    setFormData(prev => ({
      ...prev,
      images: newUrls.filter(url => url.trim() !== ""),
    }));
  };

  const addImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const removeImageUrl = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls);
    setFormData(prev => ({
      ...prev,
      images: newUrls.filter(url => url.trim() !== ""),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Validate required fields
      if (!formData.title || !formData.description || !formData.categoryId) {
        throw new Error("Please fill in all required fields");
      }

      if (formData.basePrice <= 0) {
        throw new Error("Base price must be greater than 0");
      }

      // Submit to API
      const response = await accommodationService.createAccommodation(formData);

      console.log("Accommodation created successfully:", response);
      onSubmit?.(formData);
    } catch (err: any) {
      setError(err.message || "Failed to create accommodation");
    } finally {
      setLoading(false);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Step 1: Basic Information
  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Basic Information
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleInputChange("title", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., Modern Studio Apartment in City Center"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="Describe your accommodation in detail..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            value={formData.categoryId}
            onChange={(e) => handleInputChange("categoryId", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.sectionTitle}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Base Price (per night) *
          </label>
          <div className="relative">
            <input
              type="number"
              value={formData.basePrice / 100} // Convert from cents
              onChange={(e) => handleInputChange("basePrice", parseFloat(e.target.value) * 100)} // Convert to cents
              min="0"
              step="0.01"
              className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="0.00"
            />
            <span className="absolute left-3 top-3 text-gray-500">$</span>
          </div>
        </div>
      </div>
    </div>
  );

  // Step 2: Location
  const renderLocation = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Location Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            City *
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange("city", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., Limassol"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Country *
          </label>
          <input
            type="text"
            value={formData.country}
            onChange={(e) => handleInputChange("country", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., Cyprus"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Address *
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 123 Main Street, Central Limassol"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Latitude (Optional)
          </label>
          <input
            type="number"
            value={formData.latitude || ""}
            onChange={(e) => handleInputChange("latitude", e.target.value ? parseFloat(e.target.value) : undefined)}
            step="any"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 34.7071"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Longitude (Optional)
          </label>
          <input
            type="number"
            value={formData.longitude || ""}
            onChange={(e) => handleInputChange("longitude", e.target.value ? parseFloat(e.target.value) : undefined)}
            step="any"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            placeholder="e.g., 33.0226"
          />
        </div>
      </div>
    </div>
  );

  // Step 3: Property Details
  const renderPropertyDetails = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Property Details
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Guests *
          </label>
          <input
            type="number"
            value={formData.maxGuests}
            onChange={(e) => handleInputChange("maxGuests", parseInt(e.target.value))}
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bedrooms *
          </label>
          <input
            type="number"
            value={formData.bedrooms}
            onChange={(e) => handleInputChange("bedrooms", parseInt(e.target.value))}
            min="0"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Bathrooms *
          </label>
          <input
            type="number"
            value={formData.bathrooms}
            onChange={(e) => handleInputChange("bathrooms", parseInt(e.target.value))}
            min="0"
            step="0.5"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Amenities
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {commonAmenities.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={formData.amenities.includes(amenity)}
                onChange={() => handleAmenityToggle(amenity)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700">{amenity}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 4: Images
  const renderImages = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Property Images
        </h3>
        <p className="text-gray-600">Add image URLs for your property</p>
      </div>

      <div className="space-y-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="url"
              value={url}
              onChange={(e) => handleImageUrlChange(index, e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            {imageUrls.length > 1 && (
              <button
                type="button"
                onClick={() => removeImageUrl(index)}
                className="px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        <button
          type="button"
          onClick={addImageUrl}
          className="flex items-center gap-2 px-4 py-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Another Image
        </button>
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            List Your Accommodation
          </h2>
          <p className="text-gray-600">Step {step} of 4</p>
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Progress</span>
          <span className="text-sm text-gray-600">{Math.round((step / 4) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && renderBasicInfo()}
        {step === 2 && renderLocation()}
        {step === 3 && renderPropertyDetails()}
        {step === 4 && renderImages()}

        {/* Navigation buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={nextStep}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating..." : "Create Accommodation"}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CalendarIcon,
  ClockIcon,
  UserGroupIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";
import { tourService } from "@/services/tour.service";
import { Tour } from "@/types/tour";

interface AvailabilityResponse {
  tourId: string;
  availableSpots: number;
  requestedHeadcount: number;
  isAvailable: boolean;
  maxGroup: number;
  minGroup: number;
}

export default function CheckAvailability() {
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [availability, setAvailability] = useState<AvailabilityResponse | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTour, setIsLoadingTour] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle URL parameters on component mount
  useEffect(() => {
    if (!searchParams) return;

    const tourId = searchParams.get("tourId");
    const date = searchParams.get("date");
    const guestsParam = searchParams.get("guests");

    if (tourId) {
      // Fetch tour data from API
      setIsLoadingTour(true);
      tourService
        .getTourById(tourId)
        .then((tour) => {
          setSelectedTour(tour);
          setIsLoadingTour(false);
        })
        .catch((error) => {
          console.error("Error fetching tour:", error);
          setIsLoadingTour(false);
        });
    }

    if (date) {
      setSelectedDate(date);
    }

    if (guestsParam) {
      setGuests(Number(guestsParam));
    }
  }, [searchParams]);

  // Auto-check availability when tour and guests are available
  useEffect(() => {
    if (selectedTour && guests > 0 && !availability && !isLoading) {
      handleCheckAvailability();
    }
  }, [selectedTour, guests, availability, isLoading]);

  const handleCheckAvailability = () => {
    if (!selectedTour) return;

    setIsLoading(true);

    // Use real API to check availability
    tourService
      .checkAvailability(selectedTour.id, guests)
      .then((availabilityData) => {
        setAvailability(availabilityData);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error checking availability:", error);
        setIsLoading(false);
        // For now, show a fallback message
        setAvailability({
          tourId: selectedTour.id,
          availableSpots: 0,
          requestedHeadcount: guests,
          isAvailable: false,
          maxGroup: selectedTour.maxGroup,
          minGroup: selectedTour.minGroup,
        });
      });
  };

  const handleBookTour = () => {
    if (!selectedTour || !availability) return;

    // Navigate to booking flow with selected details
    router.push(
      `/booking-flow?tourId=${selectedTour.id}&date=${selectedDate}&guests=${guests}&price=${selectedTour.basePrice}`
    );
  };

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency === "THB" ? "THB" : "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {selectedTour
              ? `Check Availability - ${selectedTour.title}`
              : "Check Tour Availability"}
          </h1>
          <p className="text-gray-600">
            {selectedTour
              ? `View available time slots and book your ${selectedTour.title} tour`
              : "Find available tours and proceed to booking"}
          </p>
        </div>

        {/* Show loading state while fetching tour */}
        {isLoadingTour && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">
                Loading tour details...
              </span>
            </div>
          </div>
        )}

        {/* Availability Check Form */}
        {selectedTour && !isLoadingTour && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">
              Check Availability for {selectedTour.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <CalendarIcon className="h-4 w-4 inline mr-1" />
                  Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Guest Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <UserGroupIcon className="h-4 w-4 inline mr-1" />
                  Number of Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {Array.from(
                    { length: selectedTour.maxGroup },
                    (_, i) => i + 1
                  ).map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* Check Button */}
              <div className="flex items-end">
                <button
                  onClick={handleCheckAvailability}
                  disabled={!selectedDate || isLoading}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  ) : (
                    <>
                      <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                      Check Availability
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Tour Summary */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center space-x-4">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                  {selectedTour.media && selectedTour.media.length > 0 ? (
                    <img
                      src={selectedTour.media[0].url}
                      alt={selectedTour.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500 text-xs text-center">
                      Tour Image
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-lg">{selectedTour.title}</h3>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <MapPinIcon className="h-4 w-4 mr-1" />
                  {selectedTour.city}, {selectedTour.country}
                  <ClockIcon className="h-4 w-4 ml-4 mr-1" />
                  {formatDuration(selectedTour.durationMins)}
                </div>
                <div className="flex items-center text-sm text-gray-600 mt-1">
                  <UserGroupIcon className="h-4 w-4 mr-1" />
                  Max {selectedTour.maxGroup} people
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-blue-600">
                  {formatPrice(
                    selectedTour.basePrice / 100,
                    selectedTour.currency
                  )}
                </div>
                <div className="text-sm text-gray-600">per person</div>
              </div>
            </div>
          </div>
        )}

        {/* Availability Results */}
        {availability && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">
              Availability for {selectedTour?.title}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Availability Status */}
              <div
                className={`p-6 rounded-lg border-2 ${
                  availability.isAvailable
                    ? "border-green-300 bg-green-50"
                    : "border-red-300 bg-red-50"
                }`}
              >
                <div className="flex items-center mb-4">
                  {availability.isAvailable ? (
                    <CheckCircleSolidIcon className="h-8 w-8 text-green-600 mr-3" />
                  ) : (
                    <XCircleIcon className="h-8 w-8 text-red-600 mr-3" />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold">
                      {availability.isAvailable ? "Available" : "Not Available"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      for {availability.requestedHeadcount} guest
                      {availability.requestedHeadcount !== 1 ? "s" : ""}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">
                      Available spots:
                    </span>
                    <span className="font-medium">
                      {availability.availableSpots}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Group size:</span>
                    <span className="font-medium">
                      {availability.minGroup}-{availability.maxGroup} people
                    </span>
                  </div>
                </div>
              </div>

              {/* Tour Summary */}
              <div className="p-6 bg-gray-50 rounded-lg">
                <h3 className="font-semibold mb-3">Tour Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span>
                      {selectedTour
                        ? formatDuration(selectedTour.durationMins)
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per person:</span>
                    <span className="font-medium">
                      {selectedTour
                        ? formatPrice(
                            selectedTour.basePrice / 100,
                            selectedTour.currency
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">
                      Total for {guests} guest{guests !== 1 ? "s" : ""}:
                    </span>
                    <span className="font-bold text-blue-600">
                      {selectedTour
                        ? formatPrice(
                            (selectedTour.basePrice / 100) * guests,
                            selectedTour.currency
                          )
                        : "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={handleBookTour}
                disabled={!availability.isAvailable}
                className={`px-8 py-3 rounded-lg font-semibold text-white transition-colors ${
                  availability.isAvailable
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                {availability.isAvailable
                  ? "Proceed to Booking"
                  : "Not Available"}
              </button>
            </div>

            {/* Info Section */}
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start">
                <InformationCircleIcon className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Next Steps:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      Check availability for your preferred date and group size
                    </li>
                    <li>Click "Proceed to Booking" to continue</li>
                    <li>Complete your booking in our secure checkout</li>
                    <li>Receive instant confirmation via email</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

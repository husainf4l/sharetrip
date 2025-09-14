"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

interface Tour {
  id: string;
  title: string;
  city: string;
  country: string;
  duration: number;
  basePrice: number;
  currency: string;
  maxGroup: number;
  image: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
  spotsLeft: number;
  price: number;
}

interface AvailabilityData {
  date: string;
  timeSlots: TimeSlot[];
}

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();

  // Booking data state
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    null
  );
  const [guests, setGuests] = useState(2);
  const [availability, setAvailability] = useState<AvailabilityData | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const steps = [
    { id: 1, name: "Check Availability" },
    { id: 2, name: "Trip Details" },
    { id: 3, name: "Personal Details" },
    { id: 4, name: "Payment" },
  ];

  // Demo tours data
  const demoTours: Tour[] = [
    {
      id: "1",
      title: "Bangkok Street Food Tour",
      city: "Bangkok",
      country: "Thailand",
      duration: 180,
      basePrice: 2500,
      currency: "THB",
      maxGroup: 8,
      image: "/images/tour-1.jpg",
    },
    {
      id: "2",
      title: "Phuket Island Hopping Adventure",
      city: "Phuket",
      country: "Thailand",
      duration: 240,
      basePrice: 4500,
      currency: "THB",
      maxGroup: 12,
      image: "/images/tour-2.jpg",
    },
    {
      id: "3",
      title: "Chiang Mai Temple Exploration",
      city: "Chiang Mai",
      country: "Thailand",
      duration: 120,
      basePrice: 1800,
      currency: "THB",
      maxGroup: 10,
      image: "/images/tour-3.jpg",
    },
    {
      id: "4",
      title: "Ayutthaya Historical Tour",
      city: "Ayutthaya",
      country: "Thailand",
      duration: 300,
      basePrice: 3200,
      currency: "THB",
      maxGroup: 15,
      image: "/images/tour-4.jpg",
    },
  ];

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Generate demo availability data
  const generateDemoAvailability = (date: string): AvailabilityData => {
    const timeSlots: TimeSlot[] = [];
    const baseTimes = ["09:00", "11:00", "14:00", "16:00", "18:00"];

    baseTimes.forEach((time) => {
      const isAvailable = Math.random() > 0.3; // 70% chance of being available
      const spotsLeft = isAvailable ? Math.floor(Math.random() * 8) + 1 : 0;
      const priceMultiplier = Math.random() * 0.5 + 0.75; // 0.75 to 1.25

      timeSlots.push({
        time,
        available: isAvailable,
        spotsLeft,
        price: Math.round(selectedTour!.basePrice * priceMultiplier),
      });
    });

    return { date, timeSlots };
  };

  const handleCheckAvailability = () => {
    if (!selectedTour || !selectedDate) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const availabilityData = generateDemoAvailability(selectedDate);
      setAvailability(availabilityData);
      setIsLoading(false);
    }, 1500);
  };

  const handleSelectTimeSlot = (timeSlot: TimeSlot) => {
    setSelectedTimeSlot(timeSlot);
  };

  const filteredTours = demoTours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.city.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return selectedTour && selectedDate && selectedTimeSlot;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            Book Your Tour
          </h1>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep >= step.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-300 text-gray-600"
                  }`}
                >
                  {step.id}
                </div>
                <span
                  className={`ml-2 ${
                    currentStep >= step.id ? "text-blue-600" : "text-gray-600"
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  ></div>
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {currentStep === 1 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Step 1: Check Availability
                </h2>
                <p className="text-gray-600 mb-6">
                  Select a tour, date, and time to check availability before
                  booking.
                </p>

                {/* Tour Selection */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium mb-3">Select a Tour</h3>

                  {/* Search */}
                  <div className="relative mb-4">
                    <MagnifyingGlassIcon className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tours by name or city..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Tour Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {filteredTours.map((tour) => (
                      <div
                        key={tour.id}
                        onClick={() => setSelectedTour(tour)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTour?.id === tour.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="aspect-video bg-gray-200 rounded mb-3 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">
                            Tour Image
                          </span>
                        </div>
                        <h4 className="font-semibold text-sm mb-1">
                          {tour.title}
                        </h4>
                        <div className="flex items-center text-gray-600 text-xs mb-2">
                          <MapPinIcon className="h-3 w-3 mr-1" />
                          {tour.city}, {tour.country}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{formatDuration(tour.duration)}</span>
                          <span>
                            {formatPrice(tour.basePrice, tour.currency)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date and Guest Selection */}
                {selectedTour && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
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
                )}

                {/* Availability Results */}
                {availability && (
                  <div>
                    <h3 className="text-lg font-medium mb-4">
                      Available Time Slots for{" "}
                      {new Date(availability.date).toLocaleDateString()}
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                      {availability.timeSlots.map((slot, index) => (
                        <div
                          key={index}
                          onClick={() =>
                            slot.available && handleSelectTimeSlot(slot)
                          }
                          className={`border rounded-lg p-4 cursor-pointer transition-all ${
                            selectedTimeSlot?.time === slot.time
                              ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                              : slot.available
                              ? "border-green-200 bg-green-50 hover:border-green-300"
                              : "border-red-200 bg-red-50 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <ClockIcon className="h-5 w-5 mr-2 text-gray-600" />
                              <span className="font-semibold">{slot.time}</span>
                            </div>
                            {slot.available ? (
                              <CheckCircleSolidIcon className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircleIcon className="h-5 w-5 text-red-600" />
                            )}
                          </div>

                          <div className="mb-3">
                            <div className="text-lg font-bold text-blue-600">
                              {formatPrice(slot.price, selectedTour!.currency)}
                            </div>
                            <div className="text-sm text-gray-600">
                              per person
                            </div>
                          </div>

                          {slot.available ? (
                            <div className="mb-3">
                              <div className="flex items-center text-sm text-green-700">
                                <InformationCircleIcon className="h-4 w-4 mr-1" />
                                {slot.spotsLeft} spots left
                              </div>
                            </div>
                          ) : (
                            <div className="mb-3">
                              <div className="flex items-center text-sm text-red-700">
                                <XCircleIcon className="h-4 w-4 mr-1" />
                                Not available
                              </div>
                            </div>
                          )}

                          {selectedTimeSlot?.time === slot.time && (
                            <div className="text-sm font-medium text-blue-600">
                              ✓ Selected
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Selected Tour Summary */}
                {selectedTour && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{selectedTour.title}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <MapPinIcon className="h-4 w-4 mr-1" />
                          {selectedTour.city}, {selectedTour.country}
                          <ClockIcon className="h-4 w-4 ml-4 mr-1" />
                          {formatDuration(selectedTour.duration)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {selectedTimeSlot
                            ? formatPrice(
                                selectedTimeSlot.price,
                                selectedTour.currency
                              )
                            : formatPrice(
                                selectedTour.basePrice,
                                selectedTour.currency
                              )}
                        </div>
                        <div className="text-sm text-gray-600">per person</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Step 2: Trip Details
                </h2>
                <p className="text-gray-600 mb-4">
                  Review and confirm your tour selection.
                </p>

                {selectedTour && selectedTimeSlot && (
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-lg mb-4">
                      Booking Summary
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tour:</span>
                        <span className="font-medium">
                          {selectedTour.title}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Date:</span>
                        <span className="font-medium">
                          {new Date(selectedDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Time:</span>
                        <span className="font-medium">
                          {selectedTimeSlot.time}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Guests:</span>
                        <span className="font-medium">{guests}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Price per person:</span>
                        <span className="font-medium">
                          {formatPrice(
                            selectedTimeSlot.price,
                            selectedTour.currency
                          )}
                        </span>
                      </div>
                      <div className="border-t pt-3 flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span>
                          {formatPrice(
                            selectedTimeSlot.price * guests,
                            selectedTour.currency
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">
                  Step 3: Personal Details
                </h2>
                <p className="text-gray-600">
                  Please provide your contact information.
                </p>
                {/* Add form fields here */}
                <div className="space-y-4 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Step 4: Payment</h2>
                <p className="text-gray-600">
                  Complete your booking by providing payment information.
                </p>
                {/* Add payment form here */}
                <div className="bg-gray-50 rounded-lg p-6 mt-6">
                  <div className="text-center">
                    <CurrencyDollarIcon className="h-12 w-12 text-green-600 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">
                      Payment Information
                    </h3>
                    <p className="text-gray-600 mb-4">
                      Secure payment processing coming soon...
                    </p>
                    <div className="text-sm text-gray-500">
                      This is a demo - payment integration would be implemented
                      here
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded disabled:opacity-50"
            >
              Previous
            </button>

            {currentStep === 4 ? (
              <button
                onClick={() =>
                  alert("Booking completed! Thank you for your reservation.")
                }
                className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Complete Booking
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceedToNextStep()}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

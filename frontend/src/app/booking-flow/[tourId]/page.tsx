"use client";

import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { tourService } from "@/services/tour.service";
import { Tour } from "@/types/tour";
import {
  CalendarIcon,
  UsersIcon,
  UserIcon,
  CreditCardIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  MapPinIcon,
  ClockIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import {
  StarIcon as StarSolidIcon,
  CheckCircleIcon as CheckCircleSolidIcon,
} from "@heroicons/react/24/solid";

interface BookingPageProps {
  params: Promise<{ tourId: string }> | { tourId: string };
}

type BookingStep = "details" | "personal" | "payment";

interface BookingData {
  selectedDate: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  specialRequests: string;
}

export default function BookingPage({ params }: BookingPageProps) {
  const [tour, setTour] = useState<Tour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<BookingStep>("details");
  const [bookingData, setBookingData] = useState<BookingData>({
    selectedDate: "",
    guests: 2,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const router = useRouter();
  const searchParams = useSearchParams();

  // Handle params properly for both Next.js 14 and 15
  const resolvedParams = "then" in params ? use(params) : params;
  const tourId = resolvedParams?.tourId;

  useEffect(() => {
    async function loadTour() {
      if (!tourId || typeof tourId !== "string") {
        setError("Invalid tour ID");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const tourData = await tourService.getTourById(tourId);
        setTour(tourData);
      } catch (error) {
        console.error("Error loading tour:", error);
        setError("Failed to load tour details");
      } finally {
        setIsLoading(false);
      }
    }

    loadTour();
  }, [tourId]);

  // Pre-populate form with search parameters
  useEffect(() => {
    if (!searchParams) return;

    const date = searchParams.get("date");
    const guests = searchParams.get("guests");

    if (date) {
      setBookingData((prev) => ({ ...prev, selectedDate: date }));
    }
    if (guests) {
      setBookingData((prev) => ({ ...prev, guests: parseInt(guests) }));
    }
  }, [searchParams]);

  const updateBookingData = (
    field: keyof BookingData,
    value: string | number
  ) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep === "details") setCurrentStep("personal");
    else if (currentStep === "personal") setCurrentStep("payment");
  };

  const prevStep = () => {
    if (currentStep === "personal") setCurrentStep("details");
    else if (currentStep === "payment") setCurrentStep("personal");
  };

  const handleBooking = async () => {
    // Here you would integrate with your booking service
    console.log("Creating booking:", { tourId, ...bookingData });
    alert("Booking functionality will be implemented with the backend");
  };

  const steps = [
    { id: "details", name: "Trip Details", icon: CalendarIcon },
    { id: "personal", name: "Personal Details", icon: UserIcon },
    { id: "payment", name: "Payment", icon: CreditCardIcon },
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {error || "Tour not found"}
          </h1>
          <button
            onClick={() => router.back()}
            className="text-blue-600 hover:text-blue-800"
          >
            ← Go back
          </button>
        </div>
      </div>
    );
  }

  const pricePerPerson = tour.basePrice / 100;
  const totalPrice = pricePerPerson * bookingData.guests;
  const duration = `${Math.floor(tour.durationMins / 60)}h ${
    tour.durationMins % 60
  }m`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Back to tour
            </button>
            <div className="text-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Book Your Tour
              </h1>
              <p className="text-sm text-gray-600">{tour.title}</p>
            </div>
            <div className="w-20"></div> {/* Spacer for centering */}
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = step.id === currentStep;
              const isCompleted =
                steps.findIndex((s) => s.id === currentStep) > index;

              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      isCompleted
                        ? "bg-green-500 text-white"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-400"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircleSolidIcon className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  <div className="ml-3">
                    <div
                      className={`text-sm font-medium ${
                        isActive
                          ? "text-blue-600"
                          : isCompleted
                          ? "text-green-600"
                          : "text-gray-400"
                      }`}
                    >
                      {step.name}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-16 h-0.5 mx-4 ${
                        isCompleted ? "bg-green-500" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Step 1: Trip Details */}
            {currentStep === "details" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Trip Details
                </h2>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Select Date
                    </label>
                    <div className="relative">
                      <CalendarIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={bookingData.selectedDate}
                        onChange={(e) =>
                          updateBookingData("selectedDate", e.target.value)
                        }
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Number of Participants
                    </label>
                    <div className="relative">
                      <UsersIcon className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                      <select
                        value={bookingData.guests}
                        onChange={(e) =>
                          updateBookingData("guests", Number(e.target.value))
                        }
                        className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        {Array.from(
                          { length: tour.maxGroup - tour.minGroup + 1 },
                          (_, i) => tour.minGroup + i
                        ).map((num) => (
                          <option key={num} value={num}>
                            {num} participant{num > 1 ? "s" : ""}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Special Requests (Optional)
                    </label>
                    <textarea
                      value={bookingData.specialRequests}
                      onChange={(e) =>
                        updateBookingData("specialRequests", e.target.value)
                      }
                      placeholder="Any special requirements or requests..."
                      rows={4}
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Personal Details */}
            {currentStep === "personal" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Personal Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={bookingData.firstName}
                      onChange={(e) =>
                        updateBookingData("firstName", e.target.value)
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={bookingData.lastName}
                      onChange={(e) =>
                        updateBookingData("lastName", e.target.value)
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your last name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={bookingData.email}
                      onChange={(e) =>
                        updateBookingData("email", e.target.value)
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={bookingData.phone}
                      onChange={(e) =>
                        updateBookingData("phone", e.target.value)
                      }
                      className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {currentStep === "payment" && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Payment Details
                </h2>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Payment Method
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Payment processing will be implemented with your preferred
                      payment gateway.
                    </p>
                  </div>

                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <CreditCardIcon className="w-6 h-6 text-gray-400" />
                      <span className="font-medium text-gray-900">
                        Credit/Debit Card
                      </span>
                    </div>
                    <div className="space-y-3">
                      <input
                        type="text"
                        placeholder="Card number"
                        className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <div className="grid grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          className="px-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8">
              {/* Tour Summary */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Tour Summary
                </h3>
                <div className="flex items-start gap-3">
                  <img
                    src={
                      tour.media[0]?.url ||
                      `https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=100&h=75&fit=crop&q=80`
                    }
                    alt={tour.title}
                    className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                  <div>
                    <h4 className="font-medium text-gray-900 text-sm">
                      {tour.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <MapPinIcon className="w-3 h-3" />
                      <span>
                        {tour.city}, {tour.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                      <ClockIcon className="w-3 h-3" />
                      <span>{duration}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="border-t border-gray-200 pt-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  Booking Details
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium">
                      {bookingData.selectedDate
                        ? new Date(
                            bookingData.selectedDate
                          ).toLocaleDateString()
                        : "Not selected"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Participants:</span>
                    <span className="font-medium">{bookingData.guests}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per person:</span>
                    <span className="font-medium">${pricePerPerson}</span>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            onClick={prevStep}
            disabled={currentStep === "details"}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeftIcon className="w-4 h-4" />
            Previous
          </button>

          {currentStep === "payment" ? (
            <button
              onClick={handleBooking}
              className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
            >
              Complete Booking
              <CheckCircleIcon className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={nextStep}
              disabled={
                (currentStep === "details" && !bookingData.selectedDate) ||
                (currentStep === "personal" &&
                  (!bookingData.firstName ||
                    !bookingData.lastName ||
                    !bookingData.email))
              }
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
            >
              Next
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

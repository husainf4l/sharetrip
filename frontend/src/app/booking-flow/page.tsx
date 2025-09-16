"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CurrencyDollarIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon,
} from "@heroicons/react/24/outline";

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

export default function BookingFlow() {
  const [currentStep, setCurrentStep] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse URL parameters
  const tourId = searchParams?.get("tourId");
  const dateParam = searchParams?.get("date");
  const guestsParam = searchParams?.get("guests");
  const priceParam = searchParams?.get("price");

  const steps = [
    { id: 1, name: "Trip Details" },
    { id: 2, name: "Personal Details" },
    { id: 3, name: "Payment" },
  ];

  // Demo tours data
  const demoTours: Tour[] = [
    {
      id: "871be770-94b0-4ea5-ae76-d875abfb9ea2",
      title: "Bangkok City Highlights Tour",
      city: "Bangkok",
      country: "Thailand",
      duration: 240,
      basePrice: 15,
      currency: "USD",
      maxGroup: 10,
      image: "/images/tour-1.jpg",
    },
    {
      id: "f51fa672-ad05-47a0-9bd6-7669f404d305",
      title: "Petra Ancient City Tour",
      city: "Petra",
      country: "Jordan",
      duration: 360,
      basePrice: 4345,
      currency: "USD",
      maxGroup: 15,
      image: "/images/tour-1.jpg",
    },
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

  // Initialize state from URL parameters
  const initialTour = tourId
    ? demoTours.find((tour) => tour.id === tourId) || demoTours[0]
    : demoTours[0];
  const initialDate = dateParam || "";
  const initialGuests = guestsParam ? parseInt(guestsParam) : 2;
  const initialPrice = priceParam
    ? parseInt(priceParam)
    : initialTour?.basePrice || 2500;

  // Create mock time slot for the selected tour
  const initialTimeSlot = initialTour
    ? {
        time: "10:00",
        available: true,
        spotsLeft: 5,
        price: initialPrice,
      }
    : null;

  // Booking data state
  const [selectedTour, setSelectedTour] = useState<Tour | null>(initialTour);
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(
    initialTimeSlot
  );
  const [guests, setGuests] = useState(initialGuests);

  // Payment state
  const [paymentMethod, setPaymentMethod] = useState<string>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardName, setCardName] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
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

  const canProceedToNextStep = () => {
    if (currentStep === 1) {
      return selectedTour && selectedDate && selectedTimeSlot;
    }
    if (currentStep === 3) {
      // Payment validation
      if (paymentMethod === "card") {
        return cardNumber && expiryDate && cvv && cardName;
      }
      return true; // Other payment methods don't require form validation
    }
    return true;
  };

  // Check if tour exists (only if tourId was provided but not found)
  if (tourId && !demoTours.find((tour) => tour.id === tourId)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Tour Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The tour you're looking for doesn't exist or may have been removed.
          </p>
          <button
            onClick={() => router.push("/tours")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Tours
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Simple Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Book Your Tour
            </h1>
            <p className="text-gray-600">
              Complete your booking in 3 simple steps
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Simple Progress Steps */}
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
            <div className="flex justify-center items-center space-x-8">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step.id
                          ? "bg-blue-600 text-white"
                          : "bg-gray-200 text-gray-600"
                      }`}
                    >
                      {step.id}
                    </div>
                    <span
                      className={`mt-2 text-xs font-medium ${
                        currentStep >= step.id
                          ? "text-blue-600"
                          : "text-gray-500"
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 h-0.5 mx-4 ${
                        currentStep > step.id ? "bg-blue-600" : "bg-gray-200"
                      }`}
                    ></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="p-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Trip Details
                  </h2>
                  <p className="text-gray-600">Review your tour selection</p>
                </div>

                {selectedTour && selectedTimeSlot && (
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Booking Summary
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tour:</span>
                          <span className="font-medium text-gray-900">
                            {selectedTour.title}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date:</span>
                          <span className="font-medium text-gray-900">
                            {new Date(selectedDate).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Time:</span>
                          <span className="font-medium text-gray-900">
                            {selectedTimeSlot.time}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Guests:</span>
                          <span className="font-medium text-gray-900">
                            {guests}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-200">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-lg text-gray-700">Total Price</p>
                          <p className="text-sm text-gray-600">
                            {formatPrice(
                              selectedTimeSlot.price,
                              selectedTour.currency
                            )}{" "}
                            per person
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-gray-900">
                            {formatPrice(
                              selectedTimeSlot.price * guests,
                              selectedTour.currency
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Additional Trip Details */}
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Trip Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Duration:</span>
                      <span className="font-medium text-gray-900">
                        10 hours
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Guide:</span>
                      <span className="font-medium text-gray-900">English</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Pickup Area:</span>
                      <button className="text-blue-600 hover:text-blue-800 font-medium">
                        View pickup area
                      </button>
                    </div>
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                      Check to see if your accommodation is within the eligible
                      area for pickup.
                    </div>
                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-600">Starting time:</span>
                        <span className="font-medium text-gray-900">
                          Tuesday, September 16, 2025
                        </span>
                      </div>
                      <div className="text-lg font-semibold text-gray-900">
                        8:00 AM
                      </div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                      <p className="text-yellow-800 font-medium">
                        Only 20 hours left to book
                      </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded p-3">
                      <p className="text-green-800 font-medium">
                        Cancel before 8:00 AM on September 15 for a full refund
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Personal Details
                  </h2>
                  <p className="text-gray-600">
                    Please provide your information
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Payment Details
                  </h2>
                  <p className="text-gray-600">Choose your payment method</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Method
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="card">Credit/Debit Card</option>
                      <option value="paypal">PayPal</option>
                      <option value="applepay">Apple Pay</option>
                      <option value="googlepay">Google Pay</option>
                    </select>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          maxLength={19}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expiry Date
                          </label>
                          <input
                            type="text"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            placeholder="MM/YY"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Cardholder Name
                        </label>
                        <input
                          type="text"
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          placeholder="John Doe"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-600 mb-2">
                        You will be redirected to PayPal to complete your
                        payment securely.
                      </p>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          PayPal Email (Optional)
                        </label>
                        <input
                          type="email"
                          value={paypalEmail}
                          onChange={(e) => setPaypalEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}

                  {(paymentMethod === "applepay" ||
                    paymentMethod === "googlepay") && (
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-gray-600">
                        {paymentMethod === "applepay"
                          ? "Use Touch ID or Face ID to complete your payment."
                          : "Use your Google account to complete your payment."}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-pointer"
            >
              Previous
            </button>

            {currentStep === 3 ? (
              <button
                onClick={() => {
                  let message = "Booking completed! ";
                  if (paymentMethod === "card") {
                    message += "Payment processed with your card. ";
                  } else if (paymentMethod === "paypal") {
                    message += "Redirecting to PayPal for payment. ";
                  } else if (paymentMethod === "applepay") {
                    message += "Payment processed with Apple Pay. ";
                  } else if (paymentMethod === "googlepay") {
                    message += "Payment processed with Google Pay. ";
                  }
                  message += "Thank you for your reservation.";
                  alert(message);
                }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Complete Booking
              </button>
            ) : (
              <button
                onClick={nextStep}
                disabled={!canProceedToNextStep()}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-pointer"
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

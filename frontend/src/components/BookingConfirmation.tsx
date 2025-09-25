import { useState } from "react";
import { CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface BookingConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  bookingDetails: {
    tourTitle: string;
    tourId: string;
    headcount: number;
    selectedDate: string;
    totalPrice: number;
    bookingId?: string;
  };
}

export default function BookingConfirmation({
  isOpen,
  onClose,
  bookingDetails,
}: BookingConfirmationProps) {
  if (!isOpen) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-gray-500" />
        </button>

        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckIcon className="w-8 h-8 text-green-600" />
          </div>
        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Booking Confirmed!
        </h2>
        <p className="text-center text-gray-600 mb-6">Your adventure awaits</p>

        {/* Booking Details */}
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">
              Booking Details
            </h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Tour:</span>
                <span className="font-medium text-gray-900">
                  {bookingDetails.tourTitle}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium text-gray-900">
                  {formatDate(bookingDetails.selectedDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Travelers:</span>
                <span className="font-medium text-gray-900">
                  {bookingDetails.headcount}
                </span>
              </div>

              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-gray-600 font-medium">Total:</span>
                <span className="font-bold text-gray-900">
                  ${bookingDetails.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">What's Next?</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Check your email for confirmation details</li>
              <li>• Save the tour date in your calendar</li>
              <li>• Contact your host if you have questions</li>
              <li>• Free cancellation up to 24 hours before</li>
            </ul>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              // Could navigate to bookings page or tour details
              onClose();
            }}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

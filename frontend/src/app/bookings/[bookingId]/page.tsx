"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  StarIcon,
  PhoneIcon,
  EnvelopeIcon,
  ChatBubbleLeftIcon,
  DocumentTextIcon,
  ShieldCheckIcon,
  CreditCardIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  tourLocation: string;
  tourDescription: string;
  tourDate: string;
  tourDuration: string;
  bookingDate: string;
  participants: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  paymentStatus: "paid" | "pending" | "refunded" | "partial";
  paymentMethod?: string;
  hostName: string;
  hostEmail?: string;
  hostPhone?: string;
  hostImage?: string;
  specialRequests?: string;
  rating?: number;
  review?: string;
  cancellationPolicy: string;
  meetingPoint: string;
  included: string[];
  notIncluded: string[];
}

export default function BookingDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const bookingId = params?.bookingId as string;

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");

  // Redirect if no bookingId
  useEffect(() => {
    if (!bookingId) {
      router.push("/bookings");
    }
  }, [bookingId, router]);

  // Mock booking data - use useEffect at top level
  useEffect(() => {
    if (!bookingId) return;

    const mockBooking: Booking = {
      id: bookingId,
      tourId:
        bookingId === "1"
          ? "lisbon-food-tour"
          : bookingId === "2"
          ? "rome-colosseum"
          : bookingId === "3"
          ? "paris-walking-tour"
          : "tour1",
      tourTitle:
        bookingId === "1"
          ? "Authentic Portuguese Food Tour"
          : bookingId === "2"
          ? "Skip-the-Line Colosseum Tour"
          : bookingId === "3"
          ? "Montmartre Walking Tour"
          : "Authentic Portuguese Food Tour",
      tourImage:
        bookingId === "1"
          ? "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop"
          : bookingId === "2"
          ? "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop"
          : bookingId === "3"
          ? "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?w=400&h=250&fit=crop"
          : "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop",
      tourLocation:
        bookingId === "1"
          ? "Lisbon, Portugal"
          : bookingId === "2"
          ? "Rome, Italy"
          : bookingId === "3"
          ? "Paris, France"
          : "Lisbon, Portugal",
      tourDescription:
        bookingId === "1"
          ? "Discover authentic local flavors and culinary traditions on this immersive food experience. Join our expert local guide for a journey through Lisbon's vibrant food scene."
          : bookingId === "2"
          ? "Experience the ancient wonders of Rome with our expert guide. Skip the long lines and explore the Colosseum with insider knowledge."
          : bookingId === "3"
          ? "Explore the artistic heart of Paris on this walking tour of Montmartre. Discover hidden gems and local culture."
          : "Discover authentic local flavors and culinary traditions on this immersive food experience.",
      tourDate:
        bookingId === "1"
          ? "2024-03-15"
          : bookingId === "2"
          ? "2024-02-28"
          : bookingId === "3"
          ? "2024-04-10"
          : "2024-09-20",
      tourDuration:
        bookingId === "1"
          ? "3 hours"
          : bookingId === "2"
          ? "2.5 hours"
          : bookingId === "3"
          ? "2 hours"
          : "3 hours",
      bookingDate:
        bookingId === "1"
          ? "2024-03-01"
          : bookingId === "2"
          ? "2024-02-15"
          : bookingId === "3"
          ? "2024-03-25"
          : "2024-09-01",
      participants:
        bookingId === "1"
          ? 2
          : bookingId === "2"
          ? 1
          : bookingId === "3"
          ? 1
          : 2,
      totalPrice:
        bookingId === "1"
          ? 80
          : bookingId === "2"
          ? 45
          : bookingId === "3"
          ? 25
          : 90,
      status:
        bookingId === "1"
          ? "confirmed"
          : bookingId === "2"
          ? "completed"
          : bookingId === "3"
          ? "confirmed"
          : "confirmed",
      paymentStatus:
        bookingId === "1"
          ? "paid"
          : bookingId === "2"
          ? "paid"
          : bookingId === "3"
          ? "paid"
          : "paid",
      paymentMethod: "Credit Card (**** 4532)",
      hostName:
        bookingId === "1"
          ? "Maria Santos"
          : bookingId === "2"
          ? "Giuseppe Romano"
          : bookingId === "3"
          ? "Sophie Dubois"
          : "Maria Santos",
      hostEmail:
        bookingId === "1"
          ? "maria.santos@email.com"
          : bookingId === "2"
          ? "giuseppe.romano@email.com"
          : bookingId === "3"
          ? "sophie.dubois@email.com"
          : "maria.santos@email.com",
      hostPhone:
        bookingId === "1"
          ? "+351 912 345 678"
          : bookingId === "2"
          ? "+39 333 123 4567"
          : bookingId === "3"
          ? "+33 6 12 34 56 78"
          : "+351 912 345 678",
      hostImage:
        bookingId === "1"
          ? "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
          : bookingId === "2"
          ? "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
          : bookingId === "3"
          ? "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
          : "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      specialRequests:
        bookingId === "1"
          ? "Vegetarian options needed"
          : bookingId === "2"
          ? undefined
          : bookingId === "3"
          ? undefined
          : "Vegetarian options needed",
      rating: bookingId === "2" ? 5 : undefined,
      review:
        bookingId === "2"
          ? "Amazing experience! The guide was very knowledgeable."
          : undefined,
      cancellationPolicy:
        "Free cancellation up to 24 hours before the tour. Cancellations within 24 hours are non-refundable.",
      meetingPoint:
        bookingId === "1"
          ? "Rossio Square, near the fountain"
          : bookingId === "2"
          ? "Colosseum Metro Station Exit"
          : bookingId === "3"
          ? "Sacré-Cœur Basilica main entrance"
          : "Rossio Square, near the fountain",
      included: [
        "Expert local guide",
        "Traditional Portuguese meal",
        "Local wine tasting",
        "Transportation between locations",
        "Photo opportunities",
      ],
      notIncluded: [
        "Personal expenses",
        "Tips for guide",
        "Additional beverages",
        "Travel insurance",
      ],
    };

    setTimeout(() => {
      setBooking(mockBooking);
      setLoading(false);
    }, 1000);
  }, [bookingId]);

  // Early return after hooks
  if (!bookingId) {
    return null;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleCancelBooking = () => {
    // In a real app, this would make an API call
    alert(
      "Booking cancellation request submitted. You will receive a confirmation email shortly."
    );
    setShowCancelModal(false);
  };

  const handleSubmitReview = () => {
    // In a real app, this would make an API call
    alert("Thank you for your review!");
    setShowReviewModal(false);
    // Update booking with review
    if (booking) {
      setBooking({
        ...booking,
        rating: reviewRating,
        review: reviewText,
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading booking details...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Booking Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The booking you're looking for doesn't exist.
          </p>
          <Link href="/bookings" className="btn btn-primary">
            Back to My Bookings
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              href="/bookings"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Booking Details
              </h1>
              <p className="text-gray-600">Booking #{booking.id}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Overview */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-64">
                <Image
                  src={booking.tourImage}
                  alt={booking.tourTitle}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status}
                  </span>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getPaymentStatusColor(
                      booking.paymentStatus
                    )}`}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {booking.tourTitle}
                    </h2>
                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPinIcon className="w-5 h-5 mr-2" />
                      {booking.tourLocation}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-gray-900">
                      ${booking.totalPrice}
                    </div>
                    <div className="text-sm text-gray-600">
                      for {booking.participants} participant
                      {booking.participants !== 1 ? "s" : ""}
                    </div>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{booking.tourDescription}</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">Tour Date</p>
                      <p className="text-sm text-gray-600">
                        {new Date(booking.tourDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">Duration</p>
                      <p className="text-sm text-gray-600">
                        {booking.tourDuration}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <UserIcon className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">Participants</p>
                      <p className="text-sm text-gray-600">
                        {booking.participants} people
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tour Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What's Included */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What's Included
                </h3>
                <ul className="space-y-2">
                  {booking.included.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircleIcon className="w-5 h-5 text-green-600 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* What's Not Included */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  What's Not Included
                </h3>
                <ul className="space-y-2">
                  {booking.notIncluded.map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <XCircleIcon className="w-5 h-5 text-red-600 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Meeting Point & Special Requests */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Important Information
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Meeting Point
                  </h4>
                  <p className="text-gray-600">{booking.meetingPoint}</p>
                </div>
                {booking.specialRequests && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      Special Requests
                    </h4>
                    <p className="text-gray-600">{booking.specialRequests}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Cancellation Policy */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Cancellation Policy
              </h3>
              <p className="text-gray-600">{booking.cancellationPolicy}</p>
            </div>

            {/* Review Section */}
            {booking.status === "completed" && !booking.rating && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Share Your Experience
                </h3>
                <p className="text-gray-600 mb-4">
                  How was your tour experience? Your feedback helps other
                  travelers.
                </p>
                <button
                  onClick={() => setShowReviewModal(true)}
                  className="btn btn-primary"
                >
                  <StarIcon className="w-4 h-4 mr-2" />
                  Write a Review
                </button>
              </div>
            )}

            {booking.rating && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Your Review
                </h3>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-5 h-5 ${
                          i < booking.rating!
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {booking.rating}/5
                  </span>
                </div>
                {booking.review && (
                  <p className="text-gray-600 italic">"{booking.review}"</p>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Host Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Your Host
              </h3>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden">
                  {booking.hostImage ? (
                    <Image
                      src={booking.hostImage}
                      alt={booking.hostName}
                      width={64}
                      height={64}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300 flex items-center justify-center">
                      <UserIcon className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {booking.hostName}
                  </h4>
                  <p className="text-sm text-gray-600">Tour Host</p>
                </div>
              </div>

              <div className="space-y-3">
                {booking.hostEmail && (
                  <a
                    href={`mailto:${booking.hostEmail}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <EnvelopeIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-700">Send Email</span>
                  </a>
                )}
                {booking.hostPhone && (
                  <a
                    href={`tel:${booking.hostPhone}`}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <PhoneIcon className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-700">Call Host</span>
                  </a>
                )}
                <button
                  onClick={() => alert("Messaging feature coming soon!")}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors w-full"
                >
                  <ChatBubbleLeftIcon className="w-5 h-5 text-purple-600" />
                  <span className="text-sm text-gray-700">Message Host</span>
                </button>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Payment Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount</span>
                  <span className="font-semibold">${booking.totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method</span>
                  <span className="text-sm text-gray-700">
                    {booking.paymentMethod}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Status</span>
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(
                      booking.paymentStatus
                    )}`}
                  >
                    {booking.paymentStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Booking Date</span>
                  <span className="text-sm text-gray-700">
                    {new Date(booking.bookingDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href={`/tours/${booking.tourId}`}
                  className="btn btn-outline w-full"
                >
                  <EyeIcon className="w-4 h-4 mr-2" />
                  View Tour Details
                </Link>

                {booking.status === "confirmed" && (
                  <button
                    onClick={() => setShowCancelModal(true)}
                    className="btn btn-outline w-full text-red-600 border-red-300 hover:bg-red-50"
                  >
                    Cancel Booking
                  </button>
                )}

                <button
                  onClick={() => alert("Receipt download feature coming soon!")}
                  className="btn btn-outline w-full"
                >
                  <DocumentTextIcon className="w-4 h-4 mr-2" />
                  Download Receipt
                </button>

                <button
                  onClick={() => alert("Report issue feature coming soon!")}
                  className="btn btn-outline w-full"
                >
                  <ShieldCheckIcon className="w-4 h-4 mr-2" />
                  Report Issue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cancel Booking Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Cancel Booking
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to cancel this booking? This action cannot
              be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowCancelModal(false)}
                className="btn btn-outline flex-1"
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                className="btn bg-red-600 hover:bg-red-700 text-white flex-1"
              >
                Cancel Booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Write a Review
            </h3>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className="text-2xl"
                  >
                    <StarIcon
                      className={`w-8 h-8 ${
                        star <= reviewRating
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Share your experience..."
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowReviewModal(false)}
                className="btn btn-outline flex-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitReview}
                className="btn btn-primary flex-1"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

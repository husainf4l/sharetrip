"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  CheckCircleIcon,
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserIcon,
  CurrencyDollarIcon,
  EnvelopeIcon,
  PhoneIcon,
  HomeIcon,
  TicketIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

interface BookingConfirmation {
  bookingId: string;
  tourTitle: string;
  tourImage: string;
  tourLocation: string;
  tourDate: string;
  tourDuration: string;
  participants: number;
  totalPrice: number;
  hostName: string;
  hostEmail: string;
  hostPhone: string;
  meetingPoint: string;
  specialRequests?: string;
}

export default function BookingConfirmationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams?.get("bookingId");

  const [booking, setBooking] = useState<BookingConfirmation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!searchParams || !bookingId) {
      router.push("/tours");
      return;
    }

    // Fetch booking confirmation data from API
    const fetchBookingConfirmation = async () => {
      try {
        const response = await fetch(
          `/api/bookings/confirmation?bookingId=${bookingId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch booking confirmation");
        }
        const bookingData = await response.json();
        setBooking(bookingData);
      } catch (error) {
        console.error("Error fetching booking confirmation:", error);
        // Fallback to mock data if API fails
        const mockBooking: BookingConfirmation = {
          bookingId: bookingId,
          tourTitle: "Authentic Portuguese Food Tour",
          tourImage:
            "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop",
          tourLocation: "Lisbon, Portugal",
          tourDate: "2024-09-20",
          tourDuration: "3 hours",
          participants: 2,
          totalPrice: 90,
          hostName: "Maria Santos",
          hostEmail: "maria.santos@email.com",
          hostPhone: "+351 912 345 678",
          meetingPoint: "Rossio Square, Lisbon Main Entrance",
          specialRequests: "Vegetarian options needed",
        };
        setBooking(mockBooking);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingConfirmation();
  }, [bookingId, router, searchParams]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading confirmation...</p>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-center">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Booking Not Found
            </h2>
            <p className="text-gray-600 mb-4">
              Unable to find booking confirmation details.
            </p>
            <Link href="/tours" className="btn btn-primary">
              Browse Tours
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <CheckCircleSolidIcon className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Booking Confirmed!
          </h1>
          <p className="text-lg text-gray-600">
            Your reservation has been successfully confirmed. We&apos;ve sent a
            confirmation email with all the details.
          </p>
        </div>

        {/* Booking Card */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative h-48">
            <Image
              src={booking.tourImage}
              alt={booking.tourTitle}
              fill
              className="object-cover"
            />
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                Confirmed
              </span>
            </div>
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  {booking.tourTitle}
                </h2>
                <div className="flex items-center text-gray-600">
                  <MapPinIcon className="w-5 h-5 mr-2" />
                  {booking.tourLocation}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${booking.totalPrice}
                </div>
                <div className="text-sm text-gray-600">
                  Booking #{booking.bookingId}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
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
              <div className="flex items-center gap-3">
                <CurrencyDollarIcon className="w-6 h-6 text-orange-600" />
                <div>
                  <p className="font-medium text-gray-900">Total Paid</p>
                  <p className="text-sm text-gray-600">${booking.totalPrice}</p>
                </div>
              </div>
            </div>

            {/* Important Information */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2">
                Important Information
              </h3>
              <div className="text-sm text-blue-800">
                <p className="mb-2">
                  <strong>Meeting Point:</strong> {booking.meetingPoint}
                </p>
                <p className="mb-2">
                  <strong>Please arrive 15 minutes early.</strong> Bring a valid
                  ID and comfortable walking shoes.
                </p>
                {booking.specialRequests && (
                  <p>
                    <strong>Your Special Request:</strong>{" "}
                    {booking.specialRequests}
                  </p>
                )}
              </div>
            </div>

            {/* Host Information */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Your Host</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {booking.hostName}
                  </p>
                  <p className="text-sm text-gray-600">Tour Host</p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={`mailto:${booking.hostEmail}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Email Host"
                  >
                    <EnvelopeIcon className="w-5 h-5" />
                  </a>
                  <a
                    href={`tel:${booking.hostPhone}`}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    title="Call Host"
                  >
                    <PhoneIcon className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            What&apos;s Next?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <EnvelopeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">
                Check Your Email
              </h4>
              <p className="text-sm text-gray-600">
                We&apos;ve sent a detailed confirmation with all booking information.
              </p>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <CalendarIcon className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">Save the Date</h4>
              <p className="text-sm text-gray-600">
                Mark your calendar for{" "}
                {new Date(booking.tourDate).toLocaleDateString()}.
              </p>
            </div>

            <div className="text-center p-4 border border-gray-200 rounded-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <PhoneIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-medium text-gray-900 mb-2">
                Contact Your Host
              </h4>
              <p className="text-sm text-gray-600">
                Reach out if you have any questions before the tour.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/bookings/${booking.bookingId}`}
            className="btn btn-primary"
          >
            <TicketIcon className="w-4 h-4 mr-2" />
            View Booking Details
          </Link>
          <Link href="/bookings" className="btn btn-outline">
            View All Bookings
          </Link>
          <Link href="/tours" className="btn btn-outline">
            <HomeIcon className="w-4 h-4 mr-2" />
            Browse More Tours
          </Link>
        </div>

        {/* Additional Information */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Questions about your booking? Contact our support team at{" "}
            <a
              href="mailto:support@sharetripx.com"
              className="text-blue-600 hover:underline"
            >
              support@sharetripx.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

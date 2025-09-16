"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  CalendarIcon,
  ClockIcon,
  UserIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  PhoneIcon,
  EnvelopeIcon,
  UsersIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

interface Booking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  participants: number;
  totalPrice: number;
  bookingDate: string;
  tourDate: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  paymentStatus: "paid" | "pending" | "refunded" | "partial";
  specialRequests?: string;
  rating?: number;
  review?: string;
}

interface Tour {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  maxParticipants: number;
  image: string;
  category: string;
}

export default function TourBookingsPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params?.tourId as string;

  // All hooks must come before any early returns or conditional logic
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tour, setTour] = useState<Tour | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Redirect if no tourId
  useEffect(() => {
    if (!tourId) {
      router.push("/dashboard/host");
    }
  }, [tourId, router]);

  // Mock tour data
  useEffect(() => {
    if (!tourId) return;

    const mockTour: Tour = {
      id: tourId,
      title: "Authentic Portuguese Food Tour",
      location: "Lisbon, Portugal",
      price: 45,
      duration: "3 hours",
      maxParticipants: 12,
      image:
        "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop",
      category: "Food & Drink",
    };
    setTour(mockTour);
  }, [tourId]);

  // Mock bookings data
  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: "bk1",
        customerName: "Sarah Johnson",
        customerEmail: "sarah.j@email.com",
        customerPhone: "+1 (555) 123-4567",
        participants: 2,
        totalPrice: 90,
        bookingDate: "2024-09-01",
        tourDate: "2024-09-15",
        status: "confirmed",
        paymentStatus: "paid",
        specialRequests: "Vegetarian options needed",
      },
      {
        id: "bk2",
        customerName: "Mike Chen",
        customerEmail: "mike.chen@email.com",
        participants: 4,
        totalPrice: 180,
        bookingDate: "2024-09-02",
        tourDate: "2024-09-16",
        status: "pending",
        paymentStatus: "pending",
        specialRequests: "Wheelchair accessible",
      },
      {
        id: "bk3",
        customerName: "Emma Wilson",
        customerEmail: "emma.w@email.com",
        customerPhone: "+44 20 7946 0958",
        participants: 1,
        totalPrice: 45,
        bookingDate: "2024-08-28",
        tourDate: "2024-09-10",
        status: "completed",
        paymentStatus: "paid",
        rating: 5,
        review: "Amazing experience! Highly recommend!",
      },
      {
        id: "bk4",
        customerName: "David Rodriguez",
        customerEmail: "david.r@email.com",
        participants: 3,
        totalPrice: 135,
        bookingDate: "2024-09-03",
        tourDate: "2024-09-20",
        status: "cancelled",
        paymentStatus: "refunded",
      },
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, [tourId]);

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

  const filteredBookings = bookings.filter((booking) => {
    const matchesStatus =
      filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStats = () => {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(
      (b) => b.status === "confirmed"
    ).length;
    const pendingBookings = bookings.filter(
      (b) => b.status === "pending"
    ).length;
    const totalRevenue = bookings
      .filter((b) => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return { totalBookings, confirmedBookings, pendingBookings, totalRevenue };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour bookings...</p>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <XCircleIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Tour Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The tour you're looking for doesn't exist.
          </p>
          <Link href="/dashboard/host" className="btn btn-primary">
            Back to Dashboard
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
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/dashboard/host"
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-4">
              <img
                src={tour.image}
                alt={tour.title}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {tour.title}
                </h1>
                <p className="text-gray-600">{tour.location}</p>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <UsersIcon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-xl font-semibold">{stats.totalBookings}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircleIcon className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Confirmed</p>
                  <p className="text-xl font-semibold">
                    {stats.confirmedBookings}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Pending</p>
                  <p className="text-xl font-semibold">
                    {stats.pendingBookings}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <CurrencyDollarIcon className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Revenue</p>
                  <p className="text-xl font-semibold">${stats.totalRevenue}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Status
                </label>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="pending">Pending</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Search Bookings
              </label>
              <input
                type="text"
                placeholder="Search by name, email, or booking ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-80 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-8 text-center">
              <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                No Bookings Found
              </h3>
              <p className="text-gray-600">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your filters or search terms."
                  : "No bookings have been made for this tour yet."}
              </p>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white rounded-lg shadow-sm p-6"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-gray-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {booking.customerName}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status}
                        </span>
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${getPaymentStatusColor(
                            booking.paymentStatus
                          )}`}
                        >
                          {booking.paymentStatus}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <EnvelopeIcon className="w-4 h-4" />
                          {booking.customerEmail}
                        </div>
                        {booking.customerPhone && (
                          <div className="flex items-center gap-2">
                            <PhoneIcon className="w-4 h-4" />
                            {booking.customerPhone}
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <UsersIcon className="w-4 h-4" />
                          {booking.participants} participant
                          {booking.participants !== 1 ? "s" : ""}
                        </div>
                        <div className="flex items-center gap-2">
                          <CurrencyDollarIcon className="w-4 h-4" />$
                          {booking.totalPrice}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <CalendarIcon className="w-4 h-4" />
                          Booked:{" "}
                          {new Date(booking.bookingDate).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-2">
                          <ClockIcon className="w-4 h-4" />
                          Tour:{" "}
                          {new Date(booking.tourDate).toLocaleDateString()}
                        </div>
                      </div>

                      {booking.specialRequests && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Special Requests:</strong>{" "}
                            {booking.specialRequests}
                          </p>
                        </div>
                      )}

                      {booking.rating && (
                        <div className="mt-3 flex items-center gap-2">
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <StarIcon
                                key={i}
                                className={`w-4 h-4 ${
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
                          {booking.review && (
                            <span className="text-sm text-gray-500 ml-2">
                              "{booking.review}"
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                      <EyeIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-green-600 transition-colors">
                      <PencilIcon className="w-5 h-5" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import {
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
  TicketIcon,
  ArrowLeftIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

interface Booking {
  id: string;
  tourId: string;
  tourTitle: string;
  tourImage: string;
  tourLocation: string;
  tourDate: string;
  bookingDate: string;
  participants: number;
  totalPrice: number;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  paymentStatus: "paid" | "pending" | "refunded" | "partial";
  hostName: string;
  hostEmail?: string;
  hostPhone?: string;
  specialRequests?: string;
  rating?: number;
  review?: string;
}

export default function BookingsPage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demo
  useEffect(() => {
    const mockBookings: Booking[] = [
      {
        id: "bk1",
        tourId: "tour1",
        tourTitle: "Authentic Portuguese Food Tour",
        tourImage: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop",
        tourLocation: "Lisbon, Portugal",
        tourDate: "2024-09-20",
        bookingDate: "2024-09-01",
        participants: 2,
        totalPrice: 90,
        status: "confirmed",
        paymentStatus: "paid",
        hostName: "Maria Santos",
        hostEmail: "maria.santos@email.com",
        hostPhone: "+351 912 345 678",
        specialRequests: "Vegetarian options needed",
      },
      {
        id: "bk2",
        tourId: "tour2",
        tourTitle: "Skip-the-Line Colosseum Tour",
        tourImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop",
        tourLocation: "Rome, Italy",
        tourDate: "2024-09-25",
        bookingDate: "2024-09-02",
        participants: 4,
        totalPrice: 180,
        status: "pending",
        paymentStatus: "pending",
        hostName: "Giovanni Rossi",
        hostEmail: "giovanni.rossi@email.com",
        specialRequests: "Wheelchair accessible",
      },
      {
        id: "bk3",
        tourId: "tour3",
        tourTitle: "Barcelona Gaudi Architecture Tour",
        tourImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop",
        tourLocation: "Barcelona, Spain",
        tourDate: "2024-09-15",
        bookingDate: "2024-08-28",
        participants: 1,
        totalPrice: 45,
        status: "completed",
        paymentStatus: "paid",
        hostName: "Carmen Lopez",
        hostEmail: "carmen.lopez@email.com",
        rating: 5,
        review: "Amazing experience! Highly recommend!",
      },
      {
        id: "bk4",
        tourId: "tour4",
        tourTitle: "Berlin Street Art Walking Tour",
        tourImage: "https://images.unsplash.com/photo-1560969184-10fe8719e6c7?w=400&h=250&fit=crop",
        tourLocation: "Berlin, Germany",
        tourDate: "2024-09-18",
        bookingDate: "2024-09-03",
        participants: 3,
        totalPrice: 135,
        status: "cancelled",
        paymentStatus: "refunded",
        hostName: "Hans Mueller",
        hostEmail: "hans.mueller@email.com",
      },
    ];

    setTimeout(() => {
      setBookings(mockBookings);
      setLoading(false);
    }, 1000);
  }, []);

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
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesSearch =
      booking.tourTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.tourLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.hostName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStats = () => {
    const totalBookings = bookings.length;
    const confirmedBookings = bookings.filter(b => b.status === "confirmed").length;
    const pendingBookings = bookings.filter(b => b.status === "pending").length;
    const totalSpent = bookings
      .filter(b => b.paymentStatus === "paid")
      .reduce((sum, b) => sum + b.totalPrice, 0);

    return { totalBookings, confirmedBookings, pendingBookings, totalSpent };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
                <p className="text-gray-600">Manage your tour reservations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/bookings/confirmation?bookingId=test123"
                className="text-sm text-blue-600 hover:text-blue-800 underline"
              >
                Test Confirmation
              </Link>
              <Link href="/tours" className="btn btn-primary">
                <TicketIcon className="w-4 h-4 mr-2" />
                Book New Tour
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <TicketIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalBookings}</div>
            <div className="text-gray-600">Total Bookings</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <CheckCircleIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.confirmedBookings}</div>
            <div className="text-gray-600">Confirmed</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <ExclamationTriangleIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.pendingBookings}</div>
            <div className="text-gray-600">Pending</div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <CurrencyDollarIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">${stats.totalSpent}</div>
            <div className="text-gray-600">Total Spent</div>
          </div>
        </div>

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
              <div className="relative">
                <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by tour name, location, or host..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full lg:w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-6">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <TicketIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Bookings Found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery || filterStatus !== "all"
                  ? "Try adjusting your filters or search terms."
                  : "You haven't made any bookings yet."}
              </p>
              <Link href="/tours" className="btn btn-primary">
                Explore Tours
              </Link>
            </div>
          ) : (
            filteredBookings.map((booking) => (
              <div key={booking.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex flex-col lg:flex-row">
                  {/* Tour Image */}
                  <div className="lg:w-48 h-48 lg:h-auto relative">
                    <Image
                      src={booking.tourImage}
                      alt={booking.tourTitle}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-xl font-semibold text-gray-900">
                            {booking.tourTitle}
                          </h3>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(booking.status)}`}>
                            {booking.status}
                          </span>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPaymentStatusColor(booking.paymentStatus)}`}>
                            {booking.paymentStatus}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                          <div className="flex items-center gap-2">
                            <MapPinIcon className="w-4 h-4" />
                            {booking.tourLocation}
                          </div>
                          <div className="flex items-center gap-2">
                            <CalendarIcon className="w-4 h-4" />
                            Tour: {new Date(booking.tourDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            {booking.participants} participant{booking.participants !== 1 ? 's' : ''}
                          </div>
                          <div className="flex items-center gap-2">
                            <CurrencyDollarIcon className="w-4 h-4" />
                            ${booking.totalPrice}
                          </div>
                          <div className="flex items-center gap-2">
                            <ClockIcon className="w-4 h-4" />
                            Booked: {new Date(booking.bookingDate).toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-2">
                            <UserIcon className="w-4 h-4" />
                            Host: {booking.hostName}
                          </div>
                        </div>

                        {/* Host Contact */}
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
                          {booking.hostEmail && (
                            <div className="flex items-center gap-2">
                              <EnvelopeIcon className="w-4 h-4" />
                              <a href={`mailto:${booking.hostEmail}`} className="text-blue-600 hover:underline">
                                {booking.hostEmail}
                              </a>
                            </div>
                          )}
                          {booking.hostPhone && (
                            <div className="flex items-center gap-2">
                              <PhoneIcon className="w-4 h-4" />
                              <a href={`tel:${booking.hostPhone}`} className="text-blue-600 hover:underline">
                                {booking.hostPhone}
                              </a>
                            </div>
                          )}
                        </div>

                        {booking.specialRequests && (
                          <div className="bg-gray-50 p-3 rounded-lg mb-4">
                            <p className="text-sm text-gray-700">
                              <strong>Special Requests:</strong> {booking.specialRequests}
                            </p>
                          </div>
                        )}

                        {booking.rating && (
                          <div className="flex items-center gap-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <StarIcon
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < booking.rating! ? 'text-yellow-400 fill-current' : 'text-gray-300'
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

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Link
                          href={`/bookings/${booking.id}`}
                          className="btn btn-outline btn-sm"
                        >
                          <EyeIcon className="w-4 h-4 mr-2" />
                          View Details
                        </Link>
                        <Link
                          href={`/tours/${booking.tourId}`}
                          className="btn btn-outline btn-sm"
                        >
                          <EyeIcon className="w-4 h-4 mr-2" />
                          View Tour
                        </Link>
                        {booking.status === "confirmed" && (
                          <button className="btn btn-outline btn-sm text-red-600 border-red-300 hover:bg-red-50">
                            Cancel Booking
                          </button>
                        )}
                        {booking.status === "completed" && !booking.rating && (
                          <button className="btn btn-primary btn-sm">
                            <StarIcon className="w-4 h-4 mr-2" />
                            Leave Review
                          </button>
                        )}
                      </div>
                    </div>
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

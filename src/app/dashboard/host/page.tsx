"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import {
  CalendarIcon,
  ClockIcon,
  StarIcon,
  UserIcon,
  MapPinIcon,
  TicketIcon,
  HeartIcon,
  CameraIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  ChartBarIcon,
  CurrencyDollarIcon,
  UsersIcon,
  CogIcon,
  PlusIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

interface HostTour {
  id: string;
  title: string;
  location: string;
  price: number;
  duration: string;
  maxParticipants: number;
  currentBookings: number;
  status: "active" | "draft" | "paused";
  rating: number;
  totalReviews: number;
  image: string;
  category: string;
  createdAt: string;
}

interface HostBooking {
  id: string;
  tourId: string;
  tourTitle: string;
  customerName: string;
  customerEmail: string;
  participants: number;
  totalPrice: number;
  bookingDate: string;
  tourDate: string;
  status: "confirmed" | "pending" | "cancelled";
  paymentStatus: "paid" | "pending" | "refunded";
}

interface DashboardStats {
  totalTours: number;
  activeTours: number;
  totalBookings: number;
  monthlyRevenue: number;
  averageRating: number;
  pendingBookings: number;
}

export default function HostDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [tours, setTours] = useState<HostTour[]>([]);
  const [bookings, setBookings] = useState<HostBooking[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalTours: 0,
    activeTours: 0,
    totalBookings: 0,
    monthlyRevenue: 0,
    averageRating: 0,
    pendingBookings: 0,
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "overview" | "tours" | "bookings" | "analytics"
  >("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Debug logging
  console.log("HostDashboard - User:", user);
  console.log("HostDashboard - Loading:", loading);
  console.log("HostDashboard - Tours:", tours);
  console.log("HostDashboard - Stats:", stats);

  // Mock data for demo
  useEffect(() => {
    const mockTours: HostTour[] = [
      {
        id: "tour1",
        title: "Authentic Portuguese Food Tour",
        location: "Lisbon, Portugal",
        price: 45,
        duration: "3 hours",
        maxParticipants: 12,
        currentBookings: 8,
        status: "active",
        rating: 4.8,
        totalReviews: 24,
        image:
          "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop",
        category: "Food & Drink",
        createdAt: "2024-01-15",
      },
      {
        id: "tour2",
        title: "Skip-the-Line Colosseum Tour",
        location: "Rome, Italy",
        price: 35,
        duration: "2.5 hours",
        maxParticipants: 15,
        currentBookings: 12,
        status: "active",
        rating: 4.9,
        totalReviews: 45,
        image:
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop",
        category: "Historical",
        createdAt: "2024-02-01",
      },
      {
        id: "tour3",
        title: "Barcelona Gaudi Architecture Tour",
        location: "Barcelona, Spain",
        price: 40,
        duration: "4 hours",
        maxParticipants: 10,
        currentBookings: 3,
        status: "draft",
        rating: 0,
        totalReviews: 0,
        image:
          "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=250&fit=crop",
        category: "Architecture",
        createdAt: "2024-08-20",
      },
    ];

    const mockBookings: HostBooking[] = [
      {
        id: "booking1",
        tourId: "tour1",
        tourTitle: "Authentic Portuguese Food Tour",
        customerName: "John Smith",
        customerEmail: "john@example.com",
        participants: 2,
        totalPrice: 90,
        bookingDate: "2024-08-25",
        tourDate: "2024-09-15",
        status: "confirmed",
        paymentStatus: "paid",
      },
      {
        id: "booking2",
        tourId: "tour2",
        tourTitle: "Skip-the-Line Colosseum Tour",
        customerName: "Sarah Johnson",
        customerEmail: "sarah@example.com",
        participants: 1,
        totalPrice: 35,
        bookingDate: "2024-08-28",
        tourDate: "2024-09-20",
        status: "pending",
        paymentStatus: "pending",
      },
    ];

    const mockStats: DashboardStats = {
      totalTours: 3,
      activeTours: 2,
      totalBookings: 45,
      monthlyRevenue: 2850,
      averageRating: 4.7,
      pendingBookings: 3,
    };

    setTours(mockTours);
    setBookings(mockBookings);
    setStats(mockStats);
    setLoading(false);
  }, []);

  const filteredTours = tours.filter(
    (tour) =>
      tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tour.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-yellow-100 text-yellow-800";
      case "paused":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your business dashboard...</p>
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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Business Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || "Host"}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/tours" className="btn btn-outline hover-lift">
                <EyeIcon className="w-4 h-4 mr-2" />
                View Public Site
              </Link>
              <Link
                href="/dashboard/host/tours/new"
                className="btn btn-primary hover-glow"
              >
                <PlusIcon className="w-4 h-4 mr-2" />
                Create Tour
              </Link>
              <div className="relative">
                <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                  <CogIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "overview"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ChartBarIcon className="w-5 h-5" />
                Overview
              </button>
              <button
                onClick={() => setActiveTab("tours")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "tours"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <TicketIcon className="w-5 h-5" />
                My Tours
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "bookings"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <CalendarIcon className="w-5 h-5" />
                Bookings
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                  activeTab === "analytics"
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ChartBarIcon className="w-5 h-5" />
                Analytics
              </button>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === "overview" && (
            <>
              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card p-6 text-center">
                  <TicketIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.totalTours}
                  </div>
                  <div className="text-gray-600">Total Tours</div>
                </div>

                <div className="card p-6 text-center">
                  <UsersIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.totalBookings}
                  </div>
                  <div className="text-gray-600">Total Bookings</div>
                </div>

                <div className="card p-6 text-center">
                  <CurrencyDollarIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    ${stats.monthlyRevenue}
                  </div>
                  <div className="text-gray-600">Monthly Revenue</div>
                </div>

                <div className="card p-6 text-center">
                  <StarIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">
                    {stats.averageRating}
                  </div>
                  <div className="text-gray-600">Average Rating</div>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Recent Bookings */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recent Bookings
                  </h3>
                  <div className="space-y-4">
                    {bookings.slice(0, 3).map((booking) => (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-gray-900">
                            {booking.customerName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {booking.tourTitle}
                          </p>
                          <p className="text-xs text-gray-500">
                            {booking.bookingDate}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900">
                            ${booking.totalPrice}
                          </p>
                          <span
                            className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getBookingStatusColor(
                              booking.status
                            )}`}
                          >
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => setActiveTab("bookings")}
                      className="text-blue-600 hover:underline"
                    >
                      View all bookings →
                    </button>
                  </div>
                </div>

                {/* Tour Performance */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Tour Performance
                  </h3>
                  <div className="space-y-4">
                    {tours
                      .filter((t) => t.status === "active")
                      .slice(0, 3)
                      .map((tour) => (
                        <div
                          key={tour.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">
                              {tour.title}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <StarIcon
                                    key={i}
                                    className={`w-3 h-3 ${
                                      i < Math.floor(tour.rating)
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-xs text-gray-600">
                                ({tour.totalReviews})
                              </span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-gray-900">
                              {tour.currentBookings}/{tour.maxParticipants}
                            </p>
                            <p className="text-sm text-gray-600">booked</p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Actions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    href="/dashboard/host/tours/new"
                    className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
                  >
                    <PlusIcon className="w-6 h-6 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Create New Tour
                      </p>
                      <p className="text-sm text-gray-600">
                        Add a new experience
                      </p>
                    </div>
                  </Link>

                  <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors">
                    <ChartBarIcon className="w-6 h-6 text-green-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        View Analytics
                      </p>
                      <p className="text-sm text-gray-600">Track performance</p>
                    </div>
                  </button>

                  <button className="flex items-center gap-3 p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors">
                    <UsersIcon className="w-6 h-6 text-purple-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Manage Bookings
                      </p>
                      <p className="text-sm text-gray-600">
                        Handle reservations
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}

          {activeTab === "tours" && (
            <div className="space-y-6">
              {/* Search and Filters */}
              <div className="card p-6">
                <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                  <div className="relative flex-1 max-w-md">
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search tours..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus-ring"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-outline">
                      <FunnelIcon className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                  </div>
                </div>
              </div>

              {/* Tours List */}
              <div className="space-y-4">
                {filteredTours.map((tour) => (
                  <div key={tour.id} className="card hover-lift">
                    <div className="flex flex-col lg:flex-row gap-6 p-6">
                      <div className="relative w-full lg:w-48 h-32 overflow-hidden rounded-lg">
                        <Image
                          src={tour.image}
                          alt={tour.title}
                          fill
                          className="object-cover"
                        />
                        <div
                          className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            tour.status
                          )}`}
                        >
                          {tour.status}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                          <div className="flex-1">
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">
                              {tour.title}
                            </h3>
                            <div className="flex items-center text-gray-600 mb-3">
                              <MapPinIcon className="w-4 h-4 mr-1" />
                              {tour.location}
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                              <div>
                                <span className="font-medium text-gray-900">
                                  ${tour.price}
                                </span>
                                <span className="text-gray-600">
                                  {" "}
                                  per person
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">
                                  {tour.duration}
                                </span>
                              </div>
                              <div>
                                <span className="font-medium text-gray-900">
                                  {tour.currentBookings}/{tour.maxParticipants}
                                </span>
                                <span className="text-gray-600"> booked</span>
                              </div>
                              <div className="flex items-center">
                                <div className="flex mr-1">
                                  {[...Array(5)].map((_, i) => (
                                    <StarIcon
                                      key={i}
                                      className={`w-3 h-3 ${
                                        i < Math.floor(tour.rating)
                                          ? "text-yellow-400 fill-current"
                                          : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-gray-600 text-xs">
                                  ({tour.totalReviews})
                                </span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <span className="text-xs text-gray-500">
                                Created{" "}
                                {new Date(tour.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>

                          <div className="lg:text-right flex lg:flex-col gap-2">
                            <Link
                              href={`/dashboard/host/tours/${tour.id}`}
                              className="btn btn-outline btn-sm hover-lift"
                            >
                              <EyeIcon className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                            <Link
                              href={`/dashboard/host/tours/${tour.id}/bookings`}
                              className="btn btn-primary btn-sm hover-glow"
                            >
                              <UsersIcon className="w-4 h-4 mr-2" />
                              View Bookings
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="space-y-6">
              {/* Bookings Header */}
              <div className="card p-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">
                    All Bookings
                  </h2>
                  <div className="flex gap-2">
                    <button className="btn btn-outline">
                      <FunnelIcon className="w-4 h-4 mr-2" />
                      Filter
                    </button>
                    <button className="btn btn-primary">
                      <PlusIcon className="w-4 h-4 mr-2" />
                      Export
                    </button>
                  </div>
                </div>
              </div>

              {/* Bookings Table */}
              <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Tour
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {booking.customerName}
                              </div>
                              <div className="text-sm text-gray-500">
                                {booking.customerEmail}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.tourTitle}
                            </div>
                            <div className="text-sm text-gray-500">
                              {booking.participants} participants
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {booking.tourDate}
                            </div>
                            <div className="text-sm text-gray-500">
                              Booked {booking.bookingDate}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getBookingStatusColor(
                                booking.status
                              )}`}
                            >
                              {booking.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            ${booking.totalPrice}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex gap-2">
                              <button className="text-blue-600 hover:text-blue-900">
                                <EyeIcon className="w-4 h-4" />
                              </button>
                              <button className="text-green-600 hover:text-green-900">
                                <CheckCircleIcon className="w-4 h-4" />
                              </button>
                              <button className="text-red-600 hover:text-red-900">
                                <XCircleIcon className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Revenue Chart Placeholder */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Revenue Overview
                  </h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        Revenue chart will be displayed here
                      </p>
                    </div>
                  </div>
                </div>

                {/* Booking Trends Placeholder */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Booking Trends
                  </h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-600">
                        Booking trends chart will be displayed here
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Performance Metrics
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">94%</div>
                    <div className="text-gray-600">Booking Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">
                      2.3 days
                    </div>
                    <div className="text-gray-600">Avg. Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">4.7</div>
                    <div className="text-gray-600">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

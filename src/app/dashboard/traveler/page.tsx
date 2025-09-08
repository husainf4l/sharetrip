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
} from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolidIcon } from "@heroicons/react/24/solid";

interface TravelerBooking {
  id: string;
  tourId: string;
  title: string;
  location: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  participants: number;
  totalPrice: number;
  image: string;
  rating?: number;
  review?: string;
  hostName: string;
  duration: string;
  meetingPoint: string;
}

export default function TravelerDashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [bookings, setBookings] = useState<TravelerBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<
    "upcoming" | "completed" | "cancelled" | "profile"
  >("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for demo - in real app this would come from API
  useEffect(() => {
    const mockBookings: TravelerBooking[] = [
      {
        id: "1",
        tourId: "lisbon-food-tour",
        title: "Authentic Portuguese Food Tour",
        location: "Lisbon, Portugal",
        date: "2024-03-15",
        time: "14:00",
        status: "upcoming",
        participants: 2,
        totalPrice: 80,
        image:
          "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=400&h=250&fit=crop",
        hostName: "Maria Santos",
        duration: "3 hours",
        meetingPoint: "Rossio Square, near the fountain",
      },
      {
        id: "2",
        tourId: "rome-colosseum",
        title: "Skip-the-Line Colosseum Tour",
        location: "Rome, Italy",
        date: "2024-02-28",
        time: "09:00",
        status: "completed",
        participants: 1,
        totalPrice: 45,
        image:
          "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=250&fit=crop",
        rating: 5,
        review: "Amazing experience! The guide was very knowledgeable.",
        hostName: "Giuseppe Romano",
        duration: "2.5 hours",
        meetingPoint: "Colosseum Metro Station Exit",
      },
      {
        id: "3",
        tourId: "paris-walking-tour",
        title: "Montmartre Walking Tour",
        location: "Paris, France",
        date: "2024-04-10",
        time: "10:30",
        status: "upcoming",
        participants: 1,
        totalPrice: 25,
        image:
          "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=250&fit=crop",
        hostName: "Sophie Dubois",
        duration: "2 hours",
        meetingPoint: "Sacré-Cœur Basilica main entrance",
      },
    ];

    setBookings(mockBookings);
    setLoading(false);
  }, []);

  const filteredBookings = bookings
    .filter((booking) => booking.status === activeTab)
    .filter(
      (booking) =>
        booking.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.location.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "upcoming":
        return <CalendarIcon className="w-4 h-4" />;
      case "completed":
        return <StarIcon className="w-4 h-4" />;
      case "cancelled":
        return <ClockIcon className="w-4 h-4" />;
      default:
        return <TicketIcon className="w-4 h-4" />;
    }
  };

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
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                My Travel Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {user?.name || "Explorer"}!
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/bookings" className="btn btn-outline hover-lift">
                <TicketIcon className="w-4 h-4 mr-2" />
                All Bookings
              </Link>
              <Link href="/tours" className="btn btn-outline hover-lift">
                <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                Find Tours
              </Link>
              <Link
                href="/dashboard/host"
                className="btn btn-primary hover-glow"
              >
                <UserIcon className="w-4 h-4 mr-2" />
                Become a Host
              </Link>
              <div className="relative">
                <button
                  onClick={() => setActiveTab("profile" as any)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Profile"
                >
                  <UserIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6 text-center">
            <CalendarIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {bookings.filter((b) => b.status === "upcoming").length}
            </div>
            <div className="text-gray-600">Upcoming Tours</div>
          </div>

          <div className="card p-6 text-center">
            <StarIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {bookings.filter((b) => b.status === "completed").length}
            </div>
            <div className="text-gray-600">Completed</div>
          </div>

          <div className="card p-6 text-center">
            <MapPinIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">
              {new Set(bookings.map((b) => b.location)).size}
            </div>
            <div className="text-gray-600">Cities Visited</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="card p-6 mb-6">
          <div className="flex flex-col space-y-4">
            {/* Main Navigation */}
            <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  ["upcoming", "completed", "cancelled"].includes(activeTab)
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === "profile"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Profile
              </button>
            </div>

            {/* Booking Status Tabs (only show when on My Bookings) */}
            {["upcoming", "completed", "cancelled"].includes(activeTab) && (
              <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                {/* Search */}
                <div className="relative flex-1 max-w-md">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search your bookings..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus-ring"
                  />
                </div>

                {/* Status Tabs */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {(["upcoming", "completed", "cancelled"] as const).map(
                    (tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          activeTab === tab
                            ? "bg-white text-blue-600 shadow-sm"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                      >
                        {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        <span className="ml-2 text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                          {bookings.filter((b) => b.status === tab).length}
                        </span>
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bookings List */}
        {filteredBookings.length === 0 ? (
          <div className="card p-12 text-center">
            <TicketIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {searchQuery ? "No bookings found" : `No ${activeTab} bookings`}
            </h3>
            <p className="text-gray-600 mb-6">
              {searchQuery
                ? "Try adjusting your search terms"
                : `You don&apos;t have any ${activeTab} tours yet`}
            </p>
            {!searchQuery && activeTab === "upcoming" && (
              <Link href="/tours" className="btn btn-primary hover-glow">
                <MagnifyingGlassIcon className="w-4 h-4 mr-2" />
                Discover Tours
              </Link>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <div key={booking.id} className="card hover-lift">
                <div className="flex flex-col lg:flex-row gap-6 p-6">
                  {/* Tour Image */}
                  <div className="relative w-full lg:w-48 h-32 lg:h-32 overflow-hidden rounded-lg">
                    <Image
                      src={booking.image}
                      alt={booking.title}
                      fill
                      className="object-cover"
                    />
                    <div
                      className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(
                        booking.status
                      )}`}
                    >
                      {getStatusIcon(booking.status)}
                      {booking.status.charAt(0).toUpperCase() +
                        booking.status.slice(1)}
                    </div>
                  </div>

                  {/* Booking Details */}
                  <div className="flex-1">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
                      <div className="flex-1">
                        <Link
                          href={`/tours/${booking.tourId}`}
                          className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                        >
                          {booking.title}
                        </Link>

                        <div className="flex items-center text-gray-600 mt-1 mb-3">
                          <MapPinIcon className="w-4 h-4 mr-1" />
                          {booking.location}
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="flex items-center text-gray-600 mb-1">
                              <CalendarIcon className="w-4 h-4 mr-2" />
                              {new Date(booking.date).toLocaleDateString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                }
                              )}{" "}
                              at {booking.time}
                            </div>
                            <div className="flex items-center text-gray-600">
                              <ClockIcon className="w-4 h-4 mr-2" />
                              {booking.duration}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600 mb-1">
                              <span className="font-medium">Host:</span>{" "}
                              {booking.hostName}
                            </div>
                            <div className="text-gray-600">
                              <span className="font-medium">Guests:</span>{" "}
                              {booking.participants}
                            </div>
                          </div>
                        </div>

                        {booking.meetingPoint && (
                          <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                            <div className="text-sm">
                              <span className="font-medium text-blue-900">
                                Meeting Point:
                              </span>
                              <span className="text-blue-700 ml-2">
                                {booking.meetingPoint}
                              </span>
                            </div>
                          </div>
                        )}

                        {booking.status === "completed" && booking.rating && (
                          <div className="mt-3 p-3 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-medium text-green-900">
                                Your Review:
                              </span>
                              <div className="flex">
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
                            </div>
                            {booking.review && (
                              <p className="text-sm text-green-700">
                                "{booking.review}"
                              </p>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Price and Actions */}
                      <div className="lg:text-right">
                        <div className="text-2xl font-bold text-gray-900 mb-2">
                          ${booking.totalPrice}
                        </div>

                        <div className="flex lg:flex-col gap-2">
                          {booking.status === "upcoming" && (
                            <>
                              <Link
                                href={`/tours/${booking.tourId}`}
                                className="btn btn-outline btn-sm hover-lift"
                              >
                                View Details
                              </Link>
                              <Link
                                href={`/bookings/${booking.id}`}
                                className="btn btn-primary btn-sm hover-glow"
                              >
                                Manage Booking
                              </Link>
                            </>
                          )}

                          {booking.status === "completed" &&
                            !booking.rating && (
                              <Link
                                href={`/bookings/${booking.id}`}
                                className="btn btn-primary btn-sm hover-glow"
                              >
                                Write Review
                              </Link>
                            )}

                          {booking.status === "completed" && (
                            <Link
                              href={`/tours/${booking.tourId}`}
                              className="btn btn-outline btn-sm hover-lift"
                            >
                              Book Again
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Profile Section */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                My Profile
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Personal Information
                  </h3>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={user?.name || ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={user?.email || ""}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                        readOnly
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Account Type
                      </label>
                      <input
                        type="text"
                        value={user?.role || "Traveler"}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                        readOnly
                      />
                    </div>
                  </div>
                </div>

                {/* Account Stats */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Account Statistics
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {
                          bookings.filter((b) => b.status === "completed")
                            .length
                        }
                      </div>
                      <div className="text-sm text-blue-700">
                        Tours Completed
                      </div>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {new Set(bookings.map((b) => b.location)).size}
                      </div>
                      <div className="text-sm text-green-700">
                        Cities Explored
                      </div>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        ${bookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                      </div>
                      <div className="text-sm text-purple-700">Total Spent</div>
                    </div>

                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {
                          bookings.filter((b) => b.rating && b.rating >= 4)
                            .length
                        }
                      </div>
                      <div className="text-sm text-orange-700">5★ Reviews</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200 flex gap-4">
                <button className="btn btn-primary hover-glow">
                  Edit Profile
                </button>
                <Link
                  href="/dashboard/host"
                  className="btn btn-outline hover-lift"
                >
                  Become a Host
                </Link>
                <button
                  onClick={logout}
                  className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

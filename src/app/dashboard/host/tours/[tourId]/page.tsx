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
  StarIcon,
  HeartIcon,
  ShareIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  UsersIcon,
  ChartBarIcon,
  TicketIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon as CheckCircleSolidIcon } from "@heroicons/react/24/solid";

interface Tour {
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
  description: string;
  createdAt: string;
}

interface TourStats {
  totalBookings: number;
  confirmedBookings: number;
  pendingBookings: number;
  cancelledBookings: number;
  totalRevenue: number;
  averageRating: number;
  upcomingTours: number;
}

export default function TourDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params?.tourId as string;

  const [tour, setTour] = useState<Tour | null>(null);
  const [stats, setStats] = useState<TourStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect if no tourId
  useEffect(() => {
    if (!tourId) {
      router.push("/dashboard/host");
    }
  }, [tourId, router]);

  // Mock tour data - useEffect before early return
  useEffect(() => {
    if (!tourId) return;

    const mockTour: Tour = {
      id: tourId,
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
      description:
        "Discover authentic local flavors and culinary traditions on this immersive food experience. Join our expert local guide for a journey through Lisbon's vibrant food scene, visiting hidden gems and local favorites.",
      createdAt: "2024-01-15",
    };

    const mockStats: TourStats = {
      totalBookings: 24,
      confirmedBookings: 18,
      pendingBookings: 3,
      cancelledBookings: 3,
      totalRevenue: 1080,
      averageRating: 4.8,
      upcomingTours: 5,
    };

    setTimeout(() => {
      setTour(mockTour);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, [tourId]);

  // Early return after hooks
  if (!tourId) {
    return null;
  }

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tour details...</p>
        </div>
      </div>
    );
  }

  if (!tour || !stats) {
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
          <div className="flex items-center gap-4">
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
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {tour.title}
                </h1>
                <p className="text-gray-600">{tour.location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tour Overview */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-2">
                    Tour Overview
                  </h2>
                  <span
                    className={`px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(
                      tour.status
                    )}`}
                  >
                    {tour.status}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <PencilIcon className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-6">{tour.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <CurrencyDollarIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    ${tour.price}
                  </p>
                  <p className="text-sm text-gray-600">per person</p>
                </div>
                <div className="text-center">
                  <ClockIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {tour.duration}
                  </p>
                  <p className="text-sm text-gray-600">duration</p>
                </div>
                <div className="text-center">
                  <UsersIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {tour.maxParticipants}
                  </p>
                  <p className="text-sm text-gray-600">max participants</p>
                </div>
                <div className="text-center">
                  <StarIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-900">
                    {tour.rating}
                  </p>
                  <p className="text-sm text-gray-600">
                    {tour.totalReviews} reviews
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Actions
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href={`/dashboard/host/tours/${tourId}/bookings`}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <TicketIcon className="w-6 h-6 text-blue-600" />
                  <div>
                    <p className="font-medium text-gray-900">View Bookings</p>
                    <p className="text-sm text-gray-600">
                      Manage customer bookings
                    </p>
                  </div>
                </Link>

                <Link
                  href={`/dashboard/host/tours/${tourId}/analytics`}
                  className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ChartBarIcon className="w-6 h-6 text-green-600" />
                  <div>
                    <p className="font-medium text-gray-900">View Analytics</p>
                    <p className="text-sm text-gray-600">
                      Tour performance insights
                    </p>
                  </div>
                </Link>

                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <EyeIcon className="w-6 h-6 text-purple-600" />
                  <div>
                    <p className="font-medium text-gray-900">Preview Tour</p>
                    <p className="text-sm text-gray-600">
                      See how it looks to customers
                    </p>
                  </div>
                </button>

                <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <ShareIcon className="w-6 h-6 text-orange-600" />
                  <div>
                    <p className="font-medium text-gray-900">Share Tour</p>
                    <p className="text-sm text-gray-600">
                      Generate shareable link
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Tour Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Bookings</span>
                  <span className="font-semibold">{stats.totalBookings}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Confirmed</span>
                  <span className="font-semibold text-green-600">
                    {stats.confirmedBookings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Pending</span>
                  <span className="font-semibold text-yellow-600">
                    {stats.pendingBookings}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Cancelled</span>
                  <span className="font-semibold text-red-600">
                    {stats.cancelledBookings}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t pt-4">
                  <span className="text-gray-600">Total Revenue</span>
                  <span className="font-semibold text-green-600">
                    ${stats.totalRevenue}
                  </span>
                </div>
              </div>
            </div>

            {/* Upcoming Tours */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Upcoming Tours
              </h3>
              <div className="space-y-3">
                {[...Array(stats.upcomingTours)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {new Date(
                          Date.now() + (i + 1) * 7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">2:00 PM - 5:00 PM</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      New booking confirmed
                    </p>
                    <p className="text-xs text-gray-600">
                      Sarah Johnson - 2 participants
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Payment pending
                    </p>
                    <p className="text-xs text-gray-600">Mike Chen - $180</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <StarIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      New review received
                    </p>
                    <p className="text-xs text-gray-600">
                      Emma Wilson - 5 stars
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

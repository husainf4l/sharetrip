"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  UsersIcon,
  CurrencyDollarIcon,
  StarIcon,
  CalendarIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";

interface TourAnalytics {
  totalViews: number;
  totalBookings: number;
  conversionRate: number;
  averageRating: number;
  totalRevenue: number;
  monthlyData: {
    month: string;
    bookings: number;
    revenue: number;
    views: number;
  }[];
  topSources: {
    source: string;
    bookings: number;
    percentage: number;
  }[];
}

export default function TourAnalyticsPage() {
  const params = useParams();
  const router = useRouter();
  const tourId = params?.tourId as string;

  const [analytics, setAnalytics] = useState<TourAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  // Redirect if no tourId
  useEffect(() => {
    if (!tourId) {
      router.push("/dashboard/host");
    }
  }, [tourId, router]);

  if (!tourId) {
    return null;
  }

  // Mock analytics data
  useEffect(() => {
    const mockAnalytics: TourAnalytics = {
      totalViews: 2450,
      totalBookings: 24,
      conversionRate: 0.98,
      averageRating: 4.8,
      totalRevenue: 1080,
      monthlyData: [
        { month: "Jan", bookings: 3, revenue: 135, views: 180 },
        { month: "Feb", bookings: 5, revenue: 225, views: 220 },
        { month: "Mar", bookings: 4, revenue: 180, views: 250 },
        { month: "Apr", bookings: 6, revenue: 270, views: 320 },
        { month: "May", bookings: 6, revenue: 270, views: 380 },
      ],
      topSources: [
        { source: "Direct", bookings: 12, percentage: 50 },
        { source: "Social Media", bookings: 6, percentage: 25 },
        { source: "Search Engines", bookings: 4, percentage: 17 },
        { source: "Email", bookings: 2, percentage: 8 },
      ],
    };

    setTimeout(() => {
      setAnalytics(mockAnalytics);
      setLoading(false);
    }, 1000);
  }, [tourId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-center">
            <ChartBarIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Analytics Not Available
            </h2>
            <p className="text-gray-600 mb-4">
              Analytics data is not available for this tour.
            </p>
            <Link
              href={`/dashboard/host/tours/${tourId}`}
              className="btn btn-primary"
            >
              Back to Tour
            </Link>
          </div>
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
              href={`/dashboard/host/tours/${tourId}`}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Tour Analytics
              </h1>
              <p className="text-gray-600">Performance insights and metrics</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <EyeIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.totalViews.toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <UsersIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.totalBookings}
                </p>
                <p className="text-sm text-gray-600">Total Bookings</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  {analytics.conversionRate}%
                </p>
                <p className="text-sm text-gray-600">Conversion Rate</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <CurrencyDollarIcon className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">
                  ${analytics.totalRevenue}
                </p>
                <p className="text-sm text-gray-600">Total Revenue</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Performance */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Monthly Performance
            </h3>
            <div className="space-y-4">
              {analytics.monthlyData.map((month) => (
                <div
                  key={month.month}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-gray-900">
                      {month.month}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {month.bookings} bookings
                    </p>
                    <p className="text-xs text-gray-600">
                      ${month.revenue} revenue
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Sources */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              Booking Sources
            </h3>
            <div className="space-y-4">
              {analytics.topSources.map((source) => (
                <div
                  key={source.source}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-900">{source.source}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {source.bookings} bookings
                    </p>
                    <p className="text-sm text-gray-600">
                      {source.percentage}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Rating Overview */}
        <div className="bg-white rounded-lg shadow-sm p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">
            Rating Overview
          </h3>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900 mb-2">
                {analytics.averageRating}
              </div>
              <div className="flex items-center justify-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(analytics.averageRating)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-600">Average Rating</p>
            </div>

            <div className="flex-1">
              <div className="space-y-2">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-gray-600 w-8">{rating}★</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full"
                        style={{ width: `${Math.random() * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600 w-8">
                      {Math.floor(Math.random() * 10)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // If not logged in, redirect to login
        router.replace("/auth/login");
        return;
      }
      
      // Redirect based on user role
      console.log("User role:", user.role); // Debug log
      if (user.role === "traveler" || user.role === "TRAVELER") {
        router.replace("/dashboard/traveler");
      } else if (user.role === "host" || user.role === "HOST") {
        router.replace("/dashboard/host");
      } else {
        // Default fallback - show dashboard options
        console.log("Unknown role, staying on main dashboard");
      }
    }
  }, [user, loading, router]);

  // Show loading while determining role or role selection if role is unclear
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If user exists but role is unclear, show dashboard selection
  if (user && !["traveler", "TRAVELER", "host", "HOST"].includes(user.role)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Dashboard</h1>
          <p className="text-gray-600 mb-8">Welcome {user.name}! Please select your dashboard:</p>
          <div className="space-y-4">
            <button
              onClick={() => router.push("/dashboard/host")}
              className="w-full btn btn-primary"
            >
              Host Dashboard
            </button>
            <button
              onClick={() => router.push("/dashboard/traveler")}
              className="w-full btn btn-outline"
            >
              Traveler Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
}

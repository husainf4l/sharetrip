"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";

export default function DashboardRedirect() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      // Redirect based on user role
      if (user.role === "traveler") {
        router.replace("/dashboard/traveler");
      } else if (user.role === "HOST" || user.role === "host") {
        router.replace("/dashboard/host");
      } else {
        // Default fallback
        router.replace("/dashboard/traveler");
      }
    }
  }, [user, loading, router]);

  // Show loading while determining role
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  );
}

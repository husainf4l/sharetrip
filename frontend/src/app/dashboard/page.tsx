"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { Role } from "../../types/auth";
import { getDashboardUrl } from "../../utils/roleUtils";

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
      console.log("User role:", user.role);
      const dashboardUrl = getDashboardUrl(user.role);
      router.replace(dashboardUrl);
    }
  }, [user, loading, router]);

  // Always show loading while redirecting
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">
          {loading
            ? "Loading your dashboard..."
            : "Redirecting to your dashboard..."}
        </p>
      </div>
    </div>
  );
}

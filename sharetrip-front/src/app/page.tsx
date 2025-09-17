"use client";

import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // Redirect to accommodations page
    window.location.href = "http://localhost:3001/accommodations";
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Redirecting to accommodations...</p>
      </div>
    </div>
  );
}

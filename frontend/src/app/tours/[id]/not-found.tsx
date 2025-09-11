"use client";

import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-6">
          <ExclamationTriangleIcon className="w-16 h-16 text-yellow-500 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Tour Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The tour you're looking for doesn't exist or may have been removed.
        </p>
        <div className="space-y-4">
          <Link
            href="/tours"
            className="inline-block w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            Browse All Tours
          </Link>
          <Link
            href="/"
            className="inline-block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
}

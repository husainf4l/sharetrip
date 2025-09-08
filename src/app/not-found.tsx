"use client";

import Link from "next/link";
import { ExclamationTriangleIcon, HomeIcon } from "@heroicons/react/24/outline";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-6">
        <div className="mb-6">
          <ExclamationTriangleIcon className="w-16 h-16 text-red-500 mx-auto" />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold gap-2"
          >
            <HomeIcon className="w-5 h-5" />
            Go Home
          </Link>
          <Link
            href="/tours"
            className="inline-block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
          >
            Browse Tours
          </Link>
        </div>
      </div>
    </div>
  );
}

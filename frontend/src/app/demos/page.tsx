"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  PhotoIcon,
  ViewfinderCircleIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";

const demos = [
  {
    name: "Photo Uploader Demo",
    description:
      "Test the photo and video upload functionality with drag & drop support",
    href: "/photo-upload-demo",
    icon: PhotoIcon,
    color: "bg-blue-500",
  },
  {
    name: "Media Gallery Demo",
    description:
      "Explore the media gallery component with image and video display",
    href: "/media-gallery-demo",
    icon: ViewfinderCircleIcon,
    color: "bg-green-500",
  },
  {
    name: "Pill Bar Demo",
    description: "Interactive pill bar component for filtering and navigation",
    href: "/demo",
    icon: Bars3Icon,
    color: "bg-purple-500",
  },
];

export default function DemosPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Component Demos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore and test various components and features of the ShareTripX
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {demos.map((demo) => (
            <Link
              key={demo.name}
              href={demo.href}
              className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-8">
                <div
                  className={`inline-flex p-3 rounded-lg ${demo.color} mb-4`}
                >
                  <demo.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {demo.name}
                </h3>
                <p className="text-gray-600 mb-6">{demo.description}</p>
                <div className="flex items-center text-blue-600 font-medium">
                  <span>Try it out</span>
                  <ArrowRightIcon className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              More Demos Coming Soon
            </h2>
            <p className="text-gray-600">
              We're continuously adding new component demos and interactive
              examples
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

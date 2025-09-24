import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-8">
          {/* Summary Header Skeleton */}
          <div className="bg-gray-200 rounded-2xl h-32"></div>

          {/* Hotels Grid Skeleton */}
          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded w-48"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-2xl h-64"></div>
              ))}
            </div>
          </div>

          {/* Itinerary Skeleton */}
          <div className="space-y-8">
            <div className="h-6 bg-gray-200 rounded w-32"></div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-8 space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-2xl h-96"></div>
                ))}
              </div>
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-gray-200 rounded-2xl h-64"></div>
                <div className="bg-gray-200 rounded-2xl h-48"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed inset-0 bg-white/50 flex items-center justify-center pointer-events-none">
          <div className="flex items-center gap-3 text-gray-600 bg-white px-6 py-3 rounded-lg shadow-lg">
            <Loader className="w-5 h-5 animate-spin" />
            <span>Loading your plan...</span>
          </div>
        </div>
      </div>
    </div>
  )
}
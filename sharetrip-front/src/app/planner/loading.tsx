import { Loader } from 'lucide-react'

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="flex items-center gap-3 text-gray-600">
        <Loader className="w-6 h-6 animate-spin" />
        <span className="text-lg">Planning your perfect trip...</span>
      </div>
    </div>
  )
}
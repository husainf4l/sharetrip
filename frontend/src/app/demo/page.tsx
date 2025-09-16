"use client";

import PillBar, { mockPills } from "@/components/PillBar";

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-center mb-12">PillBar Demo</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <PillBar pills={mockPills} />
        </div>
      </div>
    </div>
  );
}

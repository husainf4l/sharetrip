import ChatPlanner from '@/components/planner/ChatPlanner'
import Header from '@/components/ui/Header'

export default function PlannerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <ChatPlanner />
      </main>
    </div>
  )
}
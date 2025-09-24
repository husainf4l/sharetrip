import { notFound } from 'next/navigation'
import { getPlan } from '@/lib/api'
import SummaryHeader from '@/components/planner/SummaryHeader'
import HotelsGrid from '@/components/planner/HotelsGrid'
import ToursGrid from '@/components/planner/ToursGrid'
import ItineraryTimeline from '@/components/planner/ItineraryTimeline'
import MiniMap from '@/components/planner/MiniMap'
import RefineBox from '@/components/planner/RefineBox'
import Header from '@/components/ui/Header'

interface PlanPageProps {
  params: Promise<{ planId: string }>
}

export default async function PlanPage({ params }: PlanPageProps) {
  const { planId } = await params

  let plan
  try {
    plan = await getPlan(planId)
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <SummaryHeader summary={plan.summary} />

        <HotelsGrid items={plan.hotels} />

        <div className="space-y-8">
          <h2 className="text-xl font-semibold">Your Itinerary</h2>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-8">
              {plan.days.map((day, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border p-6">
                  <ItineraryTimeline day={day} />
                </div>
              ))}
            </div>

            <div className="lg:col-span-4 space-y-6">
              <div className="sticky top-4 space-y-6">
                <div className="bg-white rounded-2xl shadow-sm border p-4">
                  <h3 className="font-semibold mb-4">Map Overview</h3>
                  <MiniMap
                    markers={plan.days.flatMap(day =>
                      day.slots
                        .filter(slot => slot.lat && slot.lng)
                        .map(slot => ({
                          lat: slot.lat!,
                          lng: slot.lng!,
                          title: slot.title
                        }))
                    )}
                  />
                </div>

                <RefineBox planId={plan.id} />
              </div>
            </div>
          </div>
        </div>

        <ToursGrid items={plan.tours} />
      </main>
    </div>
  )
}
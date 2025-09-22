"use client";

import HeroSection from "@/components/ui/HeroSection";
import DestinationStrip from "@/components/ui/DestinationStrip";
import DealsCarousel from "@/components/ui/DealsCarousel";
import TopAttractionsGrid from "@/components/ui/TopAttractionsGrid";
import TravelersChoiceBar from "@/components/ui/TravelersChoiceBar";
import FoodExperiencesGrid from "@/components/ui/FoodExperiencesGrid";
import AdventureToursGrid from "@/components/ui/AdventureToursGrid";
import WellnessRetreatGrid from "@/components/ui/WellnessRetreatGrid";
import HotelsDemo from "@/components/ui/HotelsDemo";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Under-Hero Sections */}
      <main>
        {/* Popular Destinations */}
        <DestinationStrip />

        {/* Limited Time Deals */}
        <DealsCarousel />

        {/* Featured Hotels & Accommodations */}
        <HotelsDemo />

        {/* Top Attractions & Experiences */}
        <TopAttractionsGrid />

        {/* Award-Winning Excellence & Reviews */}
        <TravelersChoiceBar />

        {/* Culinary Experiences */}
        <FoodExperiencesGrid />

        {/* Adventure Tours */}
        <AdventureToursGrid />

        {/* Wellness & Spa Retreats */}
        <WellnessRetreatGrid />
      </main>
    </div>
  );
}

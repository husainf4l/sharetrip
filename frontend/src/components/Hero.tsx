"use client";

import Image from "next/image";
import PillBar, { type Pill } from "./PillBar";

interface HeroProps {
  bgSrc: string;
  bgAlt: string;
  pills: Pill[];
  onSelect?: (pillId: string, itemHref: string) => void;
  children: React.ReactNode;
}

export default function Hero({
  bgSrc,
  bgAlt,
  pills,
  onSelect,
  children,
}: HeroProps) {
  return (
    <section className="relative h-[70vh] flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <Image src={bgSrc} alt={bgAlt} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/20 to-blue-900/30"></div>
      </div>

      <PillBar pills={pills} onSelect={onSelect} />

      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-6 mt-8">
        {children}
      </div>
    </section>
  );
}

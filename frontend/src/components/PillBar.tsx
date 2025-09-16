"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  HeartIcon,
  LockClosedIcon,
  ShareIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

interface PillItem {
  href: string;
  title: string;
  img: string;
  alt: string;
}

export interface Pill {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  items: PillItem[];
}

interface PillBarProps {
  pills: Pill[];
  onSelect?: (pillId: string, itemHref: string) => void;
}

export default function PillBar({ pills, onSelect }: PillBarProps) {
  const [openPill, setOpenPill] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        barRef.current &&
        !barRef.current.contains(event.target as Node) &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenPill(null);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPill(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const handlePillClick = (pillId: string) => {
    setOpenPill(openPill === pillId ? null : pillId);
  };

  const handlePillMouseEnter = (pillId: string) => {
    if (!isMobile) {
      setOpenPill(pillId);
    }
  };

  const handlePillMouseLeave = () => {
    if (!isMobile) {
      setOpenPill(null);
    }
  };

  const handleItemClick = (pillId: string, href: string) => {
    setOpenPill(null);
    onSelect?.(pillId, href);
  };

  return (
    <div ref={barRef} className="relative z-20 flex justify-center">
      <div
        className={`flex ${
          isMobile ? "overflow-x-auto space-x-2 px-4" : "space-x-4"
        } bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-lg`}
      >
        {pills.map((pill) => (
          <button
            key={pill.id}
            onClick={() => handlePillClick(pill.id)}
            onMouseEnter={() => handlePillMouseEnter(pill.id)}
            onMouseLeave={handlePillMouseLeave}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 whitespace-nowrap ${
              openPill === pill.id
                ? "bg-white text-gray-900 shadow-md"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
            aria-expanded={openPill === pill.id}
            aria-controls={`dropdown-${pill.id}`}
            role="menuitem"
          >
            <pill.icon className="w-5 h-5" />
            <span className="font-medium">{pill.label}</span>
          </button>
        ))}
      </div>

      {openPill && (
        <div
          ref={dropdownRef}
          id={`dropdown-${openPill}`}
          className={`absolute top-full mt-2 ${
            isMobile
              ? "left-0 right-0 mx-4"
              : "left-1/2 transform -translate-x-1/2 w-full max-w-4xl"
          } bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-300 ${
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
              ? ""
              : "animate-in slide-in-from-top-2 fade-in"
          }`}
          role="menu"
        >
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pills
                .find((p) => p.id === openPill)
                ?.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    onClick={() => handleItemClick(openPill, item.href)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                    role="menuitem"
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <Image
                        src={item.img}
                        alt={item.alt}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">
                        {item.title}
                      </p>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Mock data for demo
export const mockPills: Pill[] = [
  {
    id: "for-you",
    label: "For you",
    icon: HeartIcon,
    items: [
      {
        href: "/tours/personalized",
        title: "Personalized Tours",
        img: "/images/young-pretty-traveler-woman-with-diary.jpg",
        alt: "Personalized travel diary",
      },
      {
        href: "/tours/recommended",
        title: "Recommended for You",
        img: "/images/friends-travelers-with-backpacks-smiling-looking-route-map-street.jpg",
        alt: "Friends planning trip",
      },
    ],
  },
  {
    id: "private-tours",
    label: "Private Tours",
    icon: LockClosedIcon,
    items: [
      {
        href: "/tours/private/jordan",
        title: "Private Jordan Tour",
        img: "/images/beautiful-girl-standing-viewpoint-koh-nangyuan-island-near-koh-tao-island-surat-thani-thailand.jpg",
        alt: "Private tour in Jordan",
      },
      {
        href: "/tours/private/egypt",
        title: "Private Egypt Tour",
        img: "/images/couple-family-traveling-together.jpg",
        alt: "Family private tour",
      },
    ],
  },
  {
    id: "share-tours",
    label: "Share Tours",
    icon: ShareIcon,
    items: [
      {
        href: "/tours/share/petra",
        title: "Share Petra Tour",
        img: "/images/tour-1.jpg",
        alt: "Group tour to Petra",
      },
      {
        href: "/tours/share/pyramids",
        title: "Share Pyramids Tour",
        img: "/images/tour-2.jpg",
        alt: "Shared pyramids experience",
      },
    ],
  },
  {
    id: "adventure-outdoor",
    label: "Adventure & Outdoor",
    icon: MapPinIcon,
    items: [
      {
        href: "/tours/adventure/wadi-rum",
        title: "Wadi Rum Adventure",
        img: "/images/tour-3.jpg",
        alt: "Desert adventure",
      },
      {
        href: "/tours/adventure/diving",
        title: "Red Sea Diving",
        img: "/images/tour-4.jpg",
        alt: "Scuba diving",
      },
    ],
  },
];

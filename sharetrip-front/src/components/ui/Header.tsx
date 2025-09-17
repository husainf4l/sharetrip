"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  HeartIcon,
  ShoppingBagIcon,
  GlobeAltIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";
import Logo from "./Logo";
import { useAuth } from "@/providers/AuthContext";
import { useCart } from "@/providers/CartContext";
import { canHost, getDashboardUrl } from "@/utils/roleUtils";
import { accommodationService } from "@/services/accommodation.service";

// Type definitions for navigation items
type ExperienceItem = {
  name: string;
  href: string;
  description: string;
};

type ExperienceCategory = {
  title: string;
  items: ExperienceItem[];
};

type AccommodationType = {
  id: string;
  name: string;
  type: string;
  title: string;
  subtitle: string;
  image: string;
  sectionTitle: string;
  message: string;
};

export default function Header() {
  const { user, logout, loading } = useAuth();
  const { cartItemCount, wishlistItemCount } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isAccommodationsOpen, setIsAccommodationsOpen] = useState(false);
  const [accommodationTypes, setAccommodationTypes] = useState<
    AccommodationType[]
  >([
    {
      id: "hotel",
      name: "Hotels",
      type: "hotel",
      title: "Find Your Perfect Hotel",
      subtitle: "Luxury and budget hotels worldwide",
      image: "/hero/hotel.webp",
      sectionTitle: "Hotels",
      message: "Showing hotels...",
    },
    {
      id: "apartment",
      name: "Apartments",
      type: "apartment",
      title: "Find Your Perfect Apartment",
      subtitle: "Self-catering apartments and studios",
      image: "/hero/apartment.webp",
      sectionTitle: "Apartments",
      message: "Showing apartments...",
    },
    {
      id: "resorts",
      name: "Resorts",
      type: "resorts",
      title: "Luxury Resorts & Spas",
      subtitle: "All-inclusive resorts and spas",
      image: "/hero/resort.webp",
      sectionTitle: "Resorts",
      message: "Showing resorts...",
    },
    {
      id: "hostels",
      name: "Hostels",
      type: "hostels",
      title: "Budget-Friendly Hostels",
      subtitle: "Budget-friendly shared accommodations",
      image: "/hero/hostels.webp",
      sectionTitle: "Hostels",
      message: "Showing hostels...",
    },
    {
      id: "motel",
      name: "Motels",
      type: "motel",
      title: "Convenient Motels for Your Stay",
      subtitle: "Convenient roadside accommodations",
      image: "/hero/motels.webp",
      sectionTitle: "Motels",
      message: "Showing motels...",
    },
    {
      id: "villas",
      name: "Villas",
      type: "villas",
      title: "Private Villas & Vacation Homes",
      subtitle: "Private villas and vacation homes",
      image: "/hero/villa.webp",
      sectionTitle: "Villas",
      message: "Showing villas...",
    },
    {
      id: "chalets",
      name: "Chalets",
      type: "chalets",
      title: "Mountain Chalets & Cabins",
      subtitle: "Mountain chalets and cabins",
      image: "/hero/chalets.webp",
      sectionTitle: "Chalets",
      message: "Showing chalets...",
    },
    {
      id: "treehouses",
      name: "Treehouses",
      type: "treehouses",
      title: "Unique Treehouse Accommodations",
      subtitle: "Unique treehouse accommodations",
      image: "/hero/treehouses.webp",
      sectionTitle: "Treehouses",
      message: "Showing treehouses...",
    },
    {
      id: "guest-houses",
      name: "Guest Houses",
      type: "guest-houses",
      title: "Homely Guest Houses & B&Bs",
      subtitle: "Homely guest houses and B&Bs",
      image: "",
      sectionTitle: "Guest Houses",
      message: "Showing guest houses...",
    },
    {
      id: "vacation-homes",
      name: "Vacation Homes",
      type: "vacation-homes",
      title: "Entire Vacation Homes",
      subtitle: "Entire homes for your vacation",
      image: "",
      sectionTitle: "Vacation Homes",
      message: "Showing vacation homes...",
    },
    {
      id: "caravans",
      name: "Caravans",
      type: "caravans",
      title: "Mobile Caravans & RVs",
      subtitle: "Mobile caravans and RVs",
      image: "/hero/caravan.webp",
      sectionTitle: "Caravans",
      message: "Showing caravans...",
    },
  ]);

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const fetchAccommodationTypes = async () => {
      try {
        const categories = await accommodationService.getCategories();
        if (categories.length > 0) {
          setAccommodationTypes(categories);
        } else {
          setAccommodationTypes([]);
        }
      } catch (error) {
        console.error("Failed to fetch accommodation types:", error);
        setAccommodationTypes([]);
      }
    };

    fetchAccommodationTypes();
  }, []);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const experiencesRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const accommodationsRef = useRef<HTMLDivElement>(null);

  // Navigation data
  const experienceCategories = [
    {
      title: "By Activity",
      items: [
        {
          name: "Tours & Sightseeing",
          href: "/tours?category=sightseeing",
          description: "Discover iconic landmarks",
        },
        {
          name: "Cultural Experiences",
          href: "/tours?category=culture",
          description: "Immerse in local culture",
        },
        {
          name: "Adventure & Outdoor",
          href: "/tours?category=adventure",
          description: "Thrilling outdoor activities",
        },
        {
          name: "Food Tours",
          href: "/tours?category=food",
          description: "Culinary adventures",
        },
        {
          name: "Walking Tours",
          href: "/tours?category=walking",
          description: "Explore on foot",
        },
      ],
    },
    {
      title: "Featured",
      items: [
        {
          name: "Share Tours",
          href: "/share-tours",
          description: "Join group experiences",
        },
        {
          name: "Private Tours",
          href: "/tours?type=private",
          description: "Exclusive experiences",
        },
      ],
    },
  ];

  const popularDestinations = [
    {
      name: "Petra",
      country: "Jordan",
      tours: "450+ tours",
      href: "/tours?destination=petra",
    },
    {
      name: "Pyramids of Giza",
      country: "Egypt",
      tours: "600+ tours",
      href: "/tours?destination=giza",
    },
    {
      name: "Beirut",
      country: "Lebanon",
      tours: "350+ tours",
      href: "/tours?destination=beirut",
    },
  ];

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        experiencesRef.current &&
        !experiencesRef.current.contains(event.target as Node)
      ) {
        setIsExperiencesOpen(false);
      }
      if (
        destinationsRef.current &&
        !destinationsRef.current.contains(event.target as Node)
      ) {
        setIsDestinationsOpen(false);
      }
      if (
        accommodationsRef.current &&
        !accommodationsRef.current.contains(event.target as Node)
      ) {
        setIsAccommodationsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (loading) {
    return (
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-white sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-1 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover-scale animate-fade-up">
          <Logo size="xl" />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Experiences Dropdown */}
          <div className="relative" ref={experiencesRef}>
            <button
              onClick={() => {
                setIsExperiencesOpen(!isExperiencesOpen);
                setIsDestinationsOpen(false);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:bg-gray-50 rounded-xl hover:shadow-sm hover:shadow-gray-200/50 backdrop-blur-sm"
            >
              Experiences
              <ChevronDownIcon
                className={`w-4 h-4 transition-all duration-300 ease-out ${
                  isExperiencesOpen
                    ? "rotate-180 text-blue-600"
                    : "text-gray-400"
                }`}
              />
            </button>

            {isExperiencesOpen && (
              <div className="absolute top-full left-0 mt-3 w-[600px] bg-white shadow-2xl shadow-gray-200/50 border border-white/20 rounded-2xl p-8 z-50 animate-fade-up">
                <div className="grid grid-cols-2 gap-8">
                  {experienceCategories.map((category, categoryIndex) => (
                    <div key={category.title}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 text-gradient">
                        {category.title}
                      </h3>
                      <div className="space-y-3">
                        {category.items.map((item, itemIndex) => {
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group hover:shadow-sm hover:shadow-gray-100/50 hover:-translate-y-0.5"
                              style={{
                                animationDelay: `${
                                  (categoryIndex * category.items.length +
                                    itemIndex) *
                                  0.05
                                }s`,
                              }}
                              onClick={() => setIsExperiencesOpen(false)}
                            >
                              <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mt-2 group-hover:scale-110 transition-all duration-200 shadow-sm"></div>
                              <div className="flex-1">
                                <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-200">
                                  {item.description}
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-gray-100/80 mt-8 pt-6">
                  <Link
                    href="/tours"
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200/50 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    onClick={() => setIsExperiencesOpen(false)}
                  >
                    <span>View All Experiences</span>
                    <span className="text-sm">→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Accommodations Dropdown */}
          <div className="relative" ref={accommodationsRef}>
            <button
              onClick={() => {
                setIsAccommodationsOpen(!isAccommodationsOpen);
                setIsExperiencesOpen(false);
                setIsDestinationsOpen(false);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:bg-gray-50 rounded-xl hover:shadow-sm hover:shadow-gray-200/50 backdrop-blur-sm"
            >
              Accommodations
              <ChevronDownIcon
                className={`w-4 h-4 transition-all duration-300 ease-out ${
                  isAccommodationsOpen
                    ? "rotate-180 text-blue-600"
                    : "text-gray-400"
                }`}
              />
            </button>

            {isAccommodationsOpen && (
              <div className="absolute top-full left-0 mt-3 w-[700px] bg-white shadow-2xl shadow-gray-200/50 border border-white/20 rounded-2xl p-8 z-50 animate-fade-up">
                <h3 className="text-sm font-semibold text-gray-900 mb-6 text-gradient">
                  Accommodation Types
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {accommodationTypes.map((accommodation, index) => (
                    <Link
                      key={accommodation.id}
                      href={`/accommodations?type=${accommodation.type}`}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group hover:shadow-sm hover:shadow-gray-100/50 hover:-translate-y-0.5"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setIsAccommodationsOpen(false)}
                    >
                      <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mt-2 group-hover:scale-110 transition-all duration-200 shadow-sm"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {accommodation.sectionTitle}
                        </div>
                        <div className="text-sm text-gray-500 mt-1 group-hover:text-gray-600 transition-colors duration-200">
                          {accommodation.subtitle}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100/80 mt-8 pt-6">
                  <Link
                    href="/accommodations"
                    className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200/50 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                    onClick={() => setIsAccommodationsOpen(false)}
                  >
                    <span>Browse All Accommodations</span>
                    <span className="text-sm">→</span>
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Destinations Dropdown */}
          <div className="relative" ref={destinationsRef}>
            <button
              onClick={() => {
                setIsDestinationsOpen(!isDestinationsOpen);
                setIsExperiencesOpen(false);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200 hover:bg-gray-50 rounded-xl hover:shadow-sm hover:shadow-gray-200/50 backdrop-blur-sm"
            >
              Destinations
              <ChevronDownIcon
                className={`w-4 h-4 transition-all duration-300 ease-out ${
                  isDestinationsOpen
                    ? "rotate-180 text-blue-600"
                    : "text-gray-400"
                }`}
              />
            </button>

            {isDestinationsOpen && (
              <div className="absolute top-full left-0 mt-3 w-[500px] bg-white shadow-2xl shadow-gray-200/50 border border-white/20 rounded-2xl p-8 z-50 animate-fade-up">
                <h3 className="text-sm font-semibold text-gray-900 mb-6 text-gradient">
                  Popular Destinations
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {popularDestinations.map((destination, index) => (
                    <Link
                      key={destination.name}
                      href={destination.href}
                      className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group hover:shadow-sm hover:shadow-gray-100/50 hover:-translate-y-0.5"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setIsDestinationsOpen(false)}
                    >
                      <div className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full mt-2 group-hover:scale-110 transition-all duration-200 shadow-sm"></div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                          {destination.name}
                        </div>
                        <div className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-200">
                          {destination.country} • {destination.tours}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100/50 mt-6 pt-4">
                  <Link
                    href="/destinations"
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200/50 hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
                    onClick={() => setIsDestinationsOpen(false)}
                  >
                    <GlobeAltIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-200" />
                    Explore All Destinations
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HeartIcon className="w-6 h-6 text-gray-600" />
            {wishlistItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {wishlistItemCount}
              </span>
            )}
          </Link>

          {/* Cart */}
          <Link
            href="/cart"
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ShoppingBagIcon className="w-6 h-6 text-gray-600" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Account */}
          {user ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-gray-700 font-medium hidden sm:block">
                  {user.name}
                </span>
                <span
                  className={`text-sm transition-transform ${
                    isDropdownOpen ? "rotate-180" : ""
                  }`}
                >
                  ▼
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-200">
                  <Link
                    href={user ? getDashboardUrl(user.role) : "/dashboard"}
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:shadow-sm hover:shadow-gray-100/50 hover:-translate-y-0.5"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:shadow-sm hover:shadow-gray-100/50 hover:-translate-y-0.5"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/bookings"
                    className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600 rounded-lg transition-all duration-200 hover:shadow-sm hover:shadow-gray-100/50 hover:-translate-y-0.5"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <div className="border-t border-gray-100/50 my-2"></div>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200 hover:shadow-sm hover:shadow-red-100/50 hover:-translate-y-0.5"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Log In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-blue-200/50 hover:-translate-y-0.5"
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
          <div className="w-6 h-6 flex flex-col justify-center items-center">
            <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
            <span className="w-4 h-0.5 bg-gray-600 mb-1"></span>
            <span className="w-4 h-0.5 bg-gray-600"></span>
          </div>
        </button>

        {/* Mobile Navigation Menu */}
        {user && !loading && (
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 safe-area-inset-bottom">
            <div className="flex justify-around items-center max-w-md mx-auto">
              <Link
                href="/tours"
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
              >
                <span className="text-lg">🗺️</span>
                <span className="text-xs mt-1">Explore</span>
              </Link>
              <Link
                href="/bookings"
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
              >
                <span className="text-lg">🎫</span>
                <span className="text-xs mt-1">Bookings</span>
              </Link>
              <Link
                href="/wishlist"
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 relative"
              >
                <HeartIcon className="h-6 w-6" />
                <span className="text-xs mt-1">Wishlist</span>
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>
              <Link
                href="/cart"
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50 relative"
              >
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="text-xs mt-1">Cart</span>
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center text-[10px]">
                    {cartItemCount}
                  </span>
                )}
              </Link>
              <Link
                href={user ? getDashboardUrl(user.role) : "/dashboard"}
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-semibold">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </div>
                <span className="text-xs mt-1">Profile</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import {
  HeartIcon,
  UserIcon,
  ChevronDownIcon,
  GlobeAltIcon,
  MapPinIcon,
  CameraIcon,
  MusicalNoteIcon,
  SunIcon,
  StarIcon,
  TicketIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { getDashboardUrl, canHost } from "../utils/roleUtils";
import { useCart } from "../contexts/CartContext";
import Logo from "./Logo";

// Type definitions for navigation items
type ExperienceItemWithIcon = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
};

type ExperienceItemWithFeatured = {
  name: string;
  href: string;
  featured: boolean;
  description: string;
};

type ExperienceItem = ExperienceItemWithIcon | ExperienceItemWithFeatured;

type ExperienceCategory = {
  title: string;
  items: ExperienceItem[];
};

export default function Header() {
  const { user, logout, loading } = useAuth();
  const { cartItemCount, wishlistItemCount } = useCart();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [isCurrencyOpen, setIsCurrencyOpen] = useState(false);
  const [isExperiencesOpen, setIsExperiencesOpen] = useState(false);
  const [isDestinationsOpen, setIsDestinationsOpen] = useState(false);
  const [isAccommodationsOpen, setIsAccommodationsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  // Load preferences from localStorage on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem("selectedLanguage");
    const savedCurrency = localStorage.getItem("selectedCurrency");

    if (savedLanguage) setSelectedLanguage(savedLanguage);
    if (savedCurrency) setSelectedCurrency(savedCurrency);
  }, []);

  const languageRef = useRef<HTMLDivElement>(null);
  const currencyRef = useRef<HTMLDivElement>(null);
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
          icon: CameraIcon,
          description: "Discover iconic landmarks",
        },
        {
          name: "Cultural Experiences",
          href: "/tours?category=culture",
          icon: MusicalNoteIcon,
          description: "Immerse in local culture",
        },
        {
          name: "Adventure & Outdoor",
          href: "/tours?category=adventure",
          icon: SunIcon,
          description: "Thrilling outdoor activities",
        },
        {
          name: "Food Tours",
          href: "/tours?category=food",
          icon: StarIcon,
          description: "Culinary adventures",
        },
        {
          name: "Walking Tours",
          href: "/tours?category=walking",
          icon: MapPinIcon,
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
          featured: true,
          description: "Join group experiences",
        },
        {
          name: "Private Tours",
          href: "/tours?type=private",
          featured: true,
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
      image: "��",
    },
    {
      name: "Pyramids of Giza",
      country: "Egypt",
      tours: "600+ tours",
      href: "/tours?destination=giza",
      image: "��",
    },
    {
      name: "Beirut",
      country: "Lebanon",
      tours: "350+ tours",
      href: "/tours?destination=beirut",
      image: "��",
    },
  ];

  const accommodationTypes = [
    {
      name: "Hotels",
      href: "/accommodations?type=hotels",
      description: "Luxury and budget hotels worldwide",
    },
    {
      name: "Apartments",
      href: "/accommodations?type=apartments",
      description: "Self-catering apartments and studios",
    },
    {
      name: "Resorts",
      href: "/accommodations?type=resorts",
      description: "All-inclusive resorts and spas",
    },
    {
      name: "Hostels",
      href: "/accommodations?type=hostels",
      description: "Budget-friendly shared accommodations",
    },
    {
      name: "Motels",
      href: "/accommodations?type=motels",
      description: "Convenient roadside accommodations",
    },
    {
      name: "Villas",
      href: "/accommodations?type=villas",
      description: "Private villas and vacation homes",
    },
    {
      name: "Chalets",
      href: "/accommodations?type=chalets",
      description: "Mountain chalets and cabins",
    },
    {
      name: "Treehouses",
      href: "/accommodations?type=treehouses",
      description: "Unique treehouse accommodations",
    },
    {
      name: "Guest Houses",
      href: "/accommodations?type=guest-houses",
      description: "Homely guest houses and B&Bs",
    },
    {
      name: "Vacation Homes",
      href: "/accommodations?type=vacation-homes",
      description: "Entire homes for your vacation",
    },
    {
      name: "Caravans",
      href: "/accommodations?type=caravans",
      description: "Mobile caravans and RVs",
    },
  ];

  // Handle clicks outside dropdowns to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        languageRef.current &&
        !languageRef.current.contains(event.target as Node)
      ) {
        setIsLanguageOpen(false);
      }
      if (
        currencyRef.current &&
        !currencyRef.current.contains(event.target as Node)
      ) {
        setIsCurrencyOpen(false);
      }
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

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
    { code: "FR", name: "Français", flag: "🇫🇷" },
    { code: "DE", name: "Deutsch", flag: "🇩🇪" },
    { code: "IT", name: "Italiano", flag: "🇮🇹" },
  ];

  const currencies = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  ];

  if (loading) {
    return (
      <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo variant="default" size="md" />
          </Link>
          <div className="text-sm text-gray-500">Loading...</div>
        </div>
      </header>
    );
  }

  return (
    <header className="w-full glass sticky top-0 z-50 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="hover-scale animate-fade-up">
          <Logo variant="default" size="md" />
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {/* Experiences Dropdown */}
          <div className="relative" ref={experiencesRef}>
            <button
              onClick={() => {
                setIsExperiencesOpen(!isExperiencesOpen);
                setIsDestinationsOpen(false);
                setIsLanguageOpen(false);
                setIsCurrencyOpen(false);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors hover-lift animate-slide-right"
            >
              Experiences
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${
                  isExperiencesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isExperiencesOpen && (
              <div className="absolute top-full left-0 mt-2 w-[600px] bg-white shadow-xl border border-gray-200 rounded-2xl p-6 z-50 animate-fade-up">
                <div className="grid grid-cols-2 gap-8">
                  {experienceCategories.map((category, categoryIndex) => (
                    <div key={category.title}>
                      <h3 className="text-sm font-semibold text-gray-900 mb-4 text-gradient">
                        {category.title}
                      </h3>
                      <div className="space-y-3">
                        {category.items.map((item, itemIndex) => {
                          const hasIcon = "icon" in item;
                          const IconComponent = hasIcon ? item.icon : null;
                          const isFeatured =
                            "featured" in item && item.featured;
                          return (
                            <Link
                              key={item.name}
                              href={item.href}
                              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group stagger-item"
                              style={{
                                animationDelay: `${
                                  (categoryIndex * category.items.length +
                                    itemIndex) *
                                  0.05
                                }s`,
                              }}
                              onClick={() => setIsExperiencesOpen(false)}
                            >
                              {IconComponent && (
                                <IconComponent className="w-5 h-5 text-blue-500 mt-0.5 group-hover:scale-110 transition-transform" />
                              )}
                              <div>
                                <div className="font-medium text-gray-900 group-hover:text-blue-600 flex items-center gap-2">
                                  {item.name}
                                  {isFeatured && (
                                    <span className="badge badge-primary text-xs">
                                      New
                                    </span>
                                  )}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
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
                <div className="border-t border-gray-100 mt-6 pt-4">
                  <Link
                    href="/tours"
                    className="btn btn-outline w-full justify-center hover-glow"
                    onClick={() => setIsExperiencesOpen(false)}
                  >
                    View All Experiences
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
                setIsLanguageOpen(false);
                setIsCurrencyOpen(false);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors hover-lift animate-slide-right"
            >
              Accommodations
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${
                  isAccommodationsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isAccommodationsOpen && (
              <div className="absolute top-full left-0 mt-2 w-[500px] bg-white shadow-xl border border-gray-200 rounded-2xl p-6 z-50 animate-fade-up">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 text-gradient">
                  Accommodation Types
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {accommodationTypes.map((accommodation, index) => (
                    <Link
                      key={accommodation.name}
                      href={accommodation.href}
                      className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group stagger-item"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setIsAccommodationsOpen(false)}
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 group-hover:scale-125 transition-transform"></div>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600">
                          {accommodation.name}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {accommodation.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-6 pt-4">
                  <Link
                    href="/accommodations"
                    className="btn btn-outline w-full justify-center hover-glow"
                    onClick={() => setIsAccommodationsOpen(false)}
                  >
                    Browse All Accommodations
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
                setIsLanguageOpen(false);
                setIsCurrencyOpen(false);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 font-medium transition-colors hover-lift animate-slide-right"
            >
              Destinations
              <ChevronDownIcon
                className={`w-4 h-4 transition-transform ${
                  isDestinationsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isDestinationsOpen && (
              <div className="absolute top-full left-0 mt-2 w-[500px] bg-white shadow-xl border border-gray-200 rounded-2xl p-6 z-50 animate-fade-up">
                <h3 className="text-sm font-semibold text-gray-900 mb-4 text-gradient">
                  Popular Destinations
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {popularDestinations.map((destination, index) => (
                    <Link
                      key={destination.name}
                      href={destination.href}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group stagger-item"
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => setIsDestinationsOpen(false)}
                    >
                      <span className="text-2xl">{destination.image}</span>
                      <div>
                        <div className="font-medium text-gray-900 group-hover:text-blue-600">
                          {destination.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {destination.country} • {destination.tours}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="border-t border-gray-100 mt-6 pt-4">
                  <Link
                    href="/tours"
                    className="btn btn-outline w-full justify-center hover-glow"
                    onClick={() => setIsDestinationsOpen(false)}
                  >
                    Browse All Destinations
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Demos Link */}
          <Link
            href="/demos"
            className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover-lift animate-slide-right"
          >
            Demos
          </Link>

          {user && !canHost(user.role) && (
            <Link
              href="/become-host"
              className="btn btn-secondary animate-slide-right"
            >
              Become a host
            </Link>
          )}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-4">
          {/* Language Selector */}
          <div className="relative" ref={languageRef}>
            <button
              onClick={() => {
                setIsLanguageOpen(!isLanguageOpen);
                setIsCurrencyOpen(false);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md hover:bg-gray-50"
            >
              <GlobeAltIcon className="h-4 w-4" />
              <span className="hidden sm:block">{selectedLanguage}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {isLanguageOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-200">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setSelectedLanguage(lang.code);
                      localStorage.setItem("selectedLanguage", lang.code);
                      setIsLanguageOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span>{lang.name}</span>
                    {selectedLanguage === lang.code && (
                      <span className="ml-auto text-blue-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div className="relative" ref={currencyRef}>
            <button
              onClick={() => {
                setIsCurrencyOpen(!isCurrencyOpen);
                setIsLanguageOpen(false);
                setIsDropdownOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors rounded-md hover:bg-gray-50"
            >
              <span className="font-semibold">{selectedCurrency}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </button>

            {isCurrencyOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-200">
                {currencies.map((currency) => (
                  <button
                    key={currency.code}
                    onClick={() => {
                      setSelectedCurrency(currency.code);
                      localStorage.setItem("selectedCurrency", currency.code);
                      setIsCurrencyOpen(false);
                    }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="font-semibold text-gray-900">
                      {currency.symbol}
                    </span>
                    <span>{currency.name}</span>
                    {selectedCurrency === currency.code && (
                      <span className="ml-auto text-blue-600">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

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
                <ChevronDownIcon className="w-4 h-4 text-gray-600" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50 border border-gray-200">
                  <Link
                    href={user ? getDashboardUrl(user.role) : "/dashboard"}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <Link
                    href="/bookings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    My Bookings
                  </Link>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                href="/auth/login"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Log In
              </Link>
              <Link
                href="/auth/signup"
                className="btn btn-primary animate-scale-in"
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
                <MapPinIcon className="h-6 w-6" />
                <span className="text-xs mt-1">Explore</span>
              </Link>
              <Link
                href="/bookings"
                className="flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors p-2 rounded-lg hover:bg-gray-50"
              >
                <TicketIcon className="h-6 w-6" />
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
              {user && !canHost(user.role) && (
                <Link
                  href="/become-host"
                  className="flex flex-col items-center bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-200 transform hover:scale-110"
                >
                  <UserIcon className="h-6 w-6" />
                  <span className="text-xs mt-1 font-medium">Host</span>
                </Link>
              )}
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

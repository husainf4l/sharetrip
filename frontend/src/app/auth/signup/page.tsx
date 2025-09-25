"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../../contexts/AuthContext";
import { Role } from "../../../types/auth";
import { getDashboardUrl } from "../../../utils/roleUtils";
import {
  EyeIcon,
  EyeSlashIcon,
  CheckCircleIcon,
  UserGroupIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { CheckIcon } from "@heroicons/react/24/solid";

type PlanType = "tour-booker" | "host";

interface Plan {
  id: PlanType;
  name: string;
  description: string;
  price: string;
  features: string[];
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    id: "tour-booker",
    name: "Tour Explorer",
    description:
      "Perfect for travelers who want to discover amazing experiences",
    price: "Free",
    icon: UserGroupIcon,
    features: [
      "Book unlimited tours",
      "Access to all destinations",
      "24/7 customer support",
      "Mobile app access",
      "Secure payments",
      "Trip planning tools",
    ],
  },
  {
    id: "host",
    name: "Experience Host",
    description: "Share your passion and earn by hosting unique experiences",
    price: "Free to start",
    icon: HomeIcon,
    popular: true,
    features: [
      "Host unlimited experiences",
      "Earn from each booking",
      "Dedicated host dashboard",
      "Marketing tools included",
      "Insurance coverage",
      "Priority support",
      "Analytics & insights",
    ],
  },
];

export default function SignupPage() {
  const { user, loading: authLoading, signup } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("tour-booker");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: Role.TRAVELER,
    travelStyle: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const router = useRouter();

  // Check if user is already authenticated and redirect to dashboard
  useEffect(() => {
    if (!authLoading && user) {
      console.log("🔄 User already authenticated, redirecting to dashboard");
      const dashboardUrl = getDashboardUrl(user.role);
      router.push(dashboardUrl);
    }
  }, [user, authLoading, router]);

  // Show loading while checking authentication
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Checking Authentication
          </h2>
          <p className="text-gray-600">
            Please wait while we verify your login status...
          </p>
        </div>
      </div>
    );
  }

  // If user is authenticated, don't show the signup form
  if (user) {
    return null;
  }

  const handlePlanSelect = (planId: PlanType) => {
    setSelectedPlan(planId);
    setForm({ ...form, role: planId === "host" ? Role.HOST : Role.TRAVELER });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeToTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    setLoading(true);
    try {
      // Use the AuthContext signup method for consistency
      await signup(form);

      alert("Welcome to ShareTripX! Redirecting to your dashboard...");
      // The AuthContext will handle setting the user and the useEffect will redirect
    } catch (err) {
      alert(err instanceof Error ? err.message : "Signup failed");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join ShareTripX
          </h1>
          <p className="text-lg text-gray-600">
            Choose your plan and start your journey
          </p>
        </div>

        {/* Plans Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {plans.map((plan) => (
            <div
              key={plan.id}
              onClick={() => handlePlanSelect(plan.id)}
              className={`relative bg-white rounded-2xl shadow-lg border-2 cursor-pointer transition-all duration-300 hover:shadow-xl ${
                selectedPlan === plan.id
                  ? "border-blue-500 shadow-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              } ${plan.popular ? "ring-2 ring-blue-200" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center mb-3">
                  <plan.icon className="h-6 w-6 text-blue-600 mr-2" />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="text-xs text-gray-600">{plan.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <span className="text-2xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.id === "host" && (
                    <span className="text-gray-600 ml-2 text-xs">
                      + earn per booking
                    </span>
                  )}
                </div>

                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <CheckIcon className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div
                  className={`w-full py-3 px-4 rounded-lg font-semibold text-center transition-colors duration-200 ${
                    selectedPlan === plan.id
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedPlan === plan.id ? "Selected" : "Select Plan"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Signup Form */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="px-8 py-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Create Your Account
                </h2>
                <p className="text-gray-600">
                  Join as a {selectedPlan === "host" ? "Host" : "Tour Explorer"}
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your full name"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Create a strong password"
                      value={form.password}
                      onChange={(e) =>
                        setForm({ ...form, password: e.target.value })
                      }
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Must be at least 8 characters long
                  </p>
                </div>

                {/* Host-specific fields */}
                {selectedPlan === "host" && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-blue-900 mb-2">
                      Host Information
                    </h4>
                    <p className="text-xs text-blue-700 mb-3">
                      As a host, you'll need to provide additional
                      information to start hosting experiences.
                    </p>
                    <div className="text-xs text-blue-600">
                      ✓ Verification process included
                      <br />
                      ✓ Host onboarding support
                      <br />✓ Marketing assistance
                    </div>
                  </div>
                )}

                {/* Terms Agreement */}
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
                    required
                  />
                  <label
                    htmlFor="terms"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-blue-600 hover:text-blue-500 font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Creating Account...
                    </div>
                  ) : (
                    `Join as ${selectedPlan === "host" ? "Host" : "Explorer"}`
                  )}
                </button>
              </form>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-blue-600 hover:text-blue-500 transition-colors duration-200"
                >
                  Sign in here
                </Link>
              </p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-8">
            <p className="text-xs text-gray-500 mb-4">
              Trusted by travelers and hosts worldwide
            </p>
            <div className="flex items-center justify-center space-x-6">
              <div className="flex items-center text-green-600">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Secure</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">Verified</span>
              </div>
              <div className="flex items-center text-green-600">
                <CheckCircleIcon className="h-4 w-4 mr-1" />
                <span className="text-xs font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

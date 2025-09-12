"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import {
  UserIcon,
  BuildingOfficeIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  StarIcon,
  CameraIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CogIcon,
  BanknotesIcon,
  IdentificationIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline";

interface CompanyProfile {
  id: string;
  companyName: string;
  businessType: string;
  description: string;
  website: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  businessHours: {
    monday: { open: string; close: string; closed: boolean };
    tuesday: { open: string; close: string; closed: boolean };
    wednesday: { open: string; close: string; closed: boolean };
    thursday: { open: string; close: string; closed: boolean };
    friday: { open: string; close: string; closed: boolean };
    saturday: { open: string; close: string; closed: boolean };
    sunday: { open: string; close: string; closed: boolean };
  };
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
    linkedin: string;
  };
  businessDocuments: {
    businessLicense: string;
    insuranceCertificate: string;
    taxId: string;
  };
  paymentInfo: {
    bankAccount: string;
    taxInfo: string;
  };
  settings: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    publicProfile: boolean;
    instantBooking: boolean;
  };
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [activeSection, setActiveSection] = useState("general");
  const [profile, setProfile] = useState<CompanyProfile>({
    id: "1",
    companyName: "Adventure Tours Co.",
    businessType: "Tour & Travel Agency",
    description:
      "We specialize in providing authentic local experiences and unforgettable adventures across Europe. Our team of local experts ensures every tour is unique and memorable.",
    website: "https://adventuretours.com",
    phone: "+1 (555) 123-4567",
    address: {
      street: "123 Main Street, Suite 456",
      city: "San Francisco",
      state: "California",
      zipCode: "94102",
      country: "United States",
    },
    businessHours: {
      monday: { open: "09:00", close: "17:00", closed: false },
      tuesday: { open: "09:00", close: "17:00", closed: false },
      wednesday: { open: "09:00", close: "17:00", closed: false },
      thursday: { open: "09:00", close: "17:00", closed: false },
      friday: { open: "09:00", close: "17:00", closed: false },
      saturday: { open: "10:00", close: "16:00", closed: false },
      sunday: { open: "", close: "", closed: true },
    },
    socialMedia: {
      instagram: "@adventuretours",
      facebook: "facebook.com/adventuretours",
      twitter: "@adventuretours",
      linkedin: "linkedin.com/company/adventuretours",
    },
    businessDocuments: {
      businessLicense: "BL-2024-001234",
      insuranceCertificate: "INS-2024-567890",
      taxId: "TAX-123456789",
    },
    paymentInfo: {
      bankAccount: "****1234",
      taxInfo: "Tax ID: 12-3456789",
    },
    settings: {
      emailNotifications: true,
      smsNotifications: false,
      publicProfile: true,
      instantBooking: true,
    },
  });

  useEffect(() => {
    // Simulate loading profile data
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSave = () => {
    setEditing(false);
    // In a real app, this would save to the API
  };

  const handleCancel = () => {
    setEditing(false);
    // Reset form data
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Back to Dashboard
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Company Profile
                </h1>
                <p className="text-gray-600">
                  Manage your business information and settings
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="btn btn-primary hover-glow"
                  >
                    <CheckIcon className="w-4 h-4 mr-2" />
                    Save Changes
                  </button>
                  <button onClick={handleCancel} className="btn btn-outline">
                    <XMarkIcon className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="btn btn-primary hover-glow"
                >
                  <PencilIcon className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 flex gap-8">
        {/* Sidebar Navigation */}
        <div className="w-64 flex-shrink-0">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <nav className="space-y-2">
              {[
                {
                  id: "general",
                  label: "General Info",
                  icon: BuildingOfficeIcon,
                },
                { id: "contact", label: "Contact Details", icon: PhoneIcon },
                { id: "hours", label: "Business Hours", icon: CogIcon },
                { id: "social", label: "Social Media", icon: GlobeAltIcon },
                { id: "documents", label: "Documents", icon: DocumentTextIcon },
                { id: "payment", label: "Payment Info", icon: BanknotesIcon },
                { id: "settings", label: "Settings", icon: CogIcon },
              ].map((section) => {
                const IconComponent = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-left ${
                      activeSection === section.id
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    {section.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* General Information */}
          {activeSection === "general" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                General Information
              </h2>

              <div className="space-y-6">
                {/* Company Logo */}
                <div className="flex items-center gap-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <BuildingOfficeIcon className="w-12 h-12 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Company Logo
                    </h3>
                    <p className="text-gray-600 mb-3">
                      Upload your company logo (recommended: 400x400px)
                    </p>
                    <button className="btn btn-outline btn-sm">
                      <CameraIcon className="w-4 h-4 mr-2" />
                      Upload Logo
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      value={profile.companyName}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          companyName: e.target.value,
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Business Type *
                    </label>
                    <select
                      value={profile.businessType}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          businessType: e.target.value,
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                    >
                      <option>Tour & Travel Agency</option>
                      <option>Local Guide Service</option>
                      <option>Adventure Company</option>
                      <option>Cultural Experience Provider</option>
                      <option>Food & Culinary Tours</option>
                      <option>Transportation Service</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Description *
                  </label>
                  <textarea
                    rows={4}
                    value={profile.description}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    disabled={!editing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                    placeholder="Tell customers about your company, your expertise, and what makes your tours special..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={profile.website}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        website: e.target.value,
                      }))
                    }
                    disabled={!editing}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Details */}
          {activeSection === "contact" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={profile.phone}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email || ""}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Business Address
                  </h3>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      value={profile.address.street}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          address: { ...prev.address, street: e.target.value },
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        value={profile.address.city}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            address: { ...prev.address, city: e.target.value },
                          }))
                        }
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State/Province
                      </label>
                      <input
                        type="text"
                        value={profile.address.state}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            address: { ...prev.address, state: e.target.value },
                          }))
                        }
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP/Postal Code
                      </label>
                      <input
                        type="text"
                        value={profile.address.zipCode}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              zipCode: e.target.value,
                            },
                          }))
                        }
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country *
                      </label>
                      <select
                        value={profile.address.country}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            address: {
                              ...prev.address,
                              country: e.target.value,
                            },
                          }))
                        }
                        disabled={!editing}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>France</option>
                        <option>Germany</option>
                        <option>Italy</option>
                        <option>Spain</option>
                        <option>Portugal</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Business Hours */}
          {activeSection === "hours" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Business Hours
              </h2>

              <div className="space-y-4">
                {Object.entries(profile.businessHours).map(([day, hours]) => (
                  <div
                    key={day}
                    className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg"
                  >
                    <div className="w-24">
                      <span className="font-medium text-gray-900 capitalize">
                        {day}
                      </span>
                    </div>

                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hours.closed}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            businessHours: {
                              ...prev.businessHours,
                              [day]: { ...hours, closed: e.target.checked },
                            },
                          }))
                        }
                        disabled={!editing}
                        className="mr-2"
                      />
                      Closed
                    </label>

                    {!hours.closed && (
                      <div className="flex items-center gap-2">
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              businessHours: {
                                ...prev.businessHours,
                                [day]: { ...hours, open: e.target.value },
                              },
                            }))
                          }
                          disabled={!editing}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                        />
                        <span className="text-gray-500">to</span>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) =>
                            setProfile((prev) => ({
                              ...prev,
                              businessHours: {
                                ...prev.businessHours,
                                [day]: { ...hours, close: e.target.value },
                              },
                            }))
                          }
                          disabled={!editing}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Social Media */}
          {activeSection === "social" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Social Media Profiles
              </h2>

              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram
                    </label>
                    <input
                      type="text"
                      value={profile.socialMedia.instagram}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            instagram: e.target.value,
                          },
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      placeholder="@yourusername"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Facebook
                    </label>
                    <input
                      type="text"
                      value={profile.socialMedia.facebook}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            facebook: e.target.value,
                          },
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      placeholder="facebook.com/yourpage"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Twitter
                    </label>
                    <input
                      type="text"
                      value={profile.socialMedia.twitter}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            twitter: e.target.value,
                          },
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      placeholder="@yourusername"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      value={profile.socialMedia.linkedin}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          socialMedia: {
                            ...prev.socialMedia,
                            linkedin: e.target.value,
                          },
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      placeholder="linkedin.com/company/yourcompany"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Documents */}
          {activeSection === "documents" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Business Documents
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <ShieldCheckIcon className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-blue-900">
                        Document Verification
                      </h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Upload your business documents to increase trust with
                        customers and comply with local regulations.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Business License
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <DocumentTextIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        {profile.businessDocuments.businessLicense}
                      </p>
                      <button className="btn btn-outline btn-sm">
                        Upload License
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Insurance Certificate
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <ShieldCheckIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-2">
                        {profile.businessDocuments.insuranceCertificate}
                      </p>
                      <button className="btn btn-outline btn-sm">
                        Upload Certificate
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-gray-700">
                      Tax Identification
                    </label>
                    <input
                      type="text"
                      value={profile.businessDocuments.taxId}
                      onChange={(e) =>
                        setProfile((prev) => ({
                          ...prev,
                          businessDocuments: {
                            ...prev.businessDocuments,
                            taxId: e.target.value,
                          },
                        }))
                      }
                      disabled={!editing}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus-ring"
                      placeholder="Tax ID Number"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Payment Information */}
          {activeSection === "payment" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Information
              </h2>

              <div className="space-y-6">
                <div className="p-4 bg-yellow-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <BanknotesIcon className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h3 className="text-sm font-medium text-yellow-900">
                        Secure Payment Processing
                      </h3>
                      <p className="text-sm text-yellow-700 mt-1">
                        All payment information is encrypted and securely
                        stored. We use industry-standard security measures to
                        protect your financial data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Bank Account (Last 4 digits)
                    </label>
                    <input
                      type="text"
                      value={profile.paymentInfo.bankAccount}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Contact support to update banking information
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tax Information
                    </label>
                    <input
                      type="text"
                      value={profile.paymentInfo.taxInfo}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
                    />
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <button className="btn btn-outline">
                      Update Payment Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings */}
          {activeSection === "settings" && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Account Settings
              </h2>

              <div className="space-y-8">
                {/* Notifications */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Notifications
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">
                          Email Notifications
                        </div>
                        <div className="text-sm text-gray-600">
                          Receive booking confirmations and updates via email
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.settings.emailNotifications}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              emailNotifications: e.target.checked,
                            },
                          }))
                        }
                        disabled={!editing}
                        className="toggle-checkbox"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">
                          SMS Notifications
                        </div>
                        <div className="text-sm text-gray-600">
                          Receive urgent booking updates via SMS
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.settings.smsNotifications}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              smsNotifications: e.target.checked,
                            },
                          }))
                        }
                        disabled={!editing}
                        className="toggle-checkbox"
                      />
                    </label>
                  </div>
                </div>

                {/* Privacy */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Privacy & Visibility
                  </h3>
                  <div className="space-y-4">
                    <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">
                          Public Profile
                        </div>
                        <div className="text-sm text-gray-600">
                          Make your company profile visible to potential
                          customers
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.settings.publicProfile}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              publicProfile: e.target.checked,
                            },
                          }))
                        }
                        disabled={!editing}
                        className="toggle-checkbox"
                      />
                    </label>

                    <label className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">
                          Instant Booking
                        </div>
                        <div className="text-sm text-gray-600">
                          Allow customers to book tours without approval
                        </div>
                      </div>
                      <input
                        type="checkbox"
                        checked={profile.settings.instantBooking}
                        onChange={(e) =>
                          setProfile((prev) => ({
                            ...prev,
                            settings: {
                              ...prev.settings,
                              instantBooking: e.target.checked,
                            },
                          }))
                        }
                        disabled={!editing}
                        className="toggle-checkbox"
                      />
                    </label>
                  </div>
                </div>

                {/* Danger Zone */}
                <div>
                  <h3 className="text-lg font-medium text-red-900 mb-4">
                    Danger Zone
                  </h3>
                  <div className="border border-red-200 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-red-900">
                          Delete Account
                        </div>
                        <div className="text-sm text-red-600">
                          Permanently delete your account and all associated
                          data
                        </div>
                      </div>
                      <button className="btn btn-outline text-red-600 border-red-300 hover:bg-red-50">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

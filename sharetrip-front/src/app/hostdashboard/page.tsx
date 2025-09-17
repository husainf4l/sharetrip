'use client';

import { useState } from 'react';
import ListPropertyCategories from '@/components/ui/ListPropertyCategories';
import AccommodationRegistrationForm from '@/components/ui/AccommodationRegistrationForm';

type ViewState = 'categories' | 'accommodation-form' | 'tour-form';

export default function HostDashboard() {
  const [currentView, setCurrentView] = useState<ViewState>('categories');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const handleCategorySelect = (category: string, subcategory?: string) => {
    console.log('Selected category:', category, 'subcategory:', subcategory);

    setSelectedCategory(category);
    setSelectedSubcategory(subcategory || '');

    // Navigate to appropriate form based on category
    if (category === 'accommodations' && subcategory) {
      setCurrentView('accommodation-form');
    } else if (category === 'tours' && subcategory) {
      setCurrentView('tour-form');
    }
  };

  const handleFormSubmit = (data: {
    title: string;
    description: string;
    categoryId: string;
    city: string;
    country: string;
    address: string;
    latitude?: number;
    longitude?: number;
    basePrice: number;
    currency: string;
    maxGuests: number;
    bedrooms: number;
    bathrooms: number;
    amenities: string[];
    images: string[];
    isAvailable: boolean;
  }) => {
    console.log('Form submitted with data:', data);
    // Handle successful form submission
    // You can show a success message and redirect back to categories or dashboard
    setCurrentView('categories');
    // Optionally show success notification
  };

  const handleFormCancel = () => {
    setCurrentView('categories');
    setSelectedCategory('');
    setSelectedSubcategory('');
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'accommodation-form':
        return (
          <AccommodationRegistrationForm
            selectedCategory={selectedSubcategory}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        );

      case 'tour-form':
        return (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="text-center py-12">
              <svg
                className="w-16 h-16 mx-auto mb-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Tour Registration Form
              </h3>
              <p className="text-gray-600 mb-4">
                Tour registration form coming soon! You selected: {selectedSubcategory}
              </p>
              <button
                onClick={handleFormCancel}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
              >
                Back to Categories
              </button>
            </div>
          </div>
        );

      case 'categories':
      default:
        return <ListPropertyCategories onCategorySelect={handleCategorySelect} />;
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Host Dashboard
        </h1>
        <p className="text-gray-600 mt-2">
          Manage your tours and accommodations
        </p>
      </div>

      {/* Breadcrumb */}
      {currentView !== 'categories' && (
        <div className="mb-6">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-4">
              <li>
                <button
                  onClick={() => setCurrentView('categories')}
                  className="text-gray-400 hover:text-gray-500 transition-colors"
                >
                  Categories
                </button>
              </li>
              <li>
                <svg
                  className="flex-shrink-0 h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </li>
              <li>
                <span className="text-gray-500">
                  {selectedCategory === 'accommodations' ? 'Accommodation' : 'Tour'} Registration
                </span>
              </li>
              {selectedSubcategory && (
                <>
                  <li>
                    <svg
                      className="flex-shrink-0 h-5 w-5 text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </li>
                  <li>
                    <span className="text-gray-900 font-medium capitalize">
                      {selectedSubcategory.replace('-', ' ')}
                    </span>
                  </li>
                </>
              )}
            </ol>
          </nav>
        </div>
      )}

      {renderCurrentView()}
    </div>
  );
}
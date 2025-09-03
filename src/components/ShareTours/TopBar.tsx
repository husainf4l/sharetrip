'use client';

import React from 'react';
import { MagnifyingGlassIcon, MapPinIcon, CalendarIcon, UserGroupIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

interface QuickFilter {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  type: 'select' | 'date' | 'range' | 'toggle';
  options?: { value: string; label: string }[];
  value?: string | { min?: number; max?: number } | boolean;
  placeholder?: string;
}

interface TopBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  quickFilters: QuickFilter[];
  onQuickFilterChange: (key: string, value: string | { min?: number; max?: number } | boolean | undefined) => void;
  onSearch: () => void;
  isLoading?: boolean;
}

export default function TopBar({
  searchQuery,
  onSearchChange,
  quickFilters,
  onQuickFilterChange,
  onSearch,
  isLoading = false
}: TopBarProps) {

  const renderQuickFilter = (filter: QuickFilter) => {
    const isActive = filter.value && (
      Array.isArray(filter.value) ? filter.value.length > 0 : filter.value
    );

    switch (filter.type) {
      case 'select':
        return (
          <div className="relative">
            <select
              value={Array.isArray(filter.value) ? filter.value[0] || '' : filter.value || ''}
              onChange={(e) => onQuickFilterChange(filter.key, e.target.value || undefined)}
              className={`appearance-none bg-white border rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
            >
              <option value="">{filter.placeholder || filter.label}</option>
              {filter.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        );

      case 'date':
        return (
          <div className="flex items-center space-x-1">
            <filter.icon className="w-4 h-4 text-gray-500" />
            <input
              type="date"
              value={typeof filter.value === 'string' ? filter.value : ''}
              onChange={(e) => onQuickFilterChange(filter.key, e.target.value || undefined)}
              className={`bg-white border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                isActive 
                  ? 'border-blue-500 bg-blue-50 text-blue-700' 
                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
              }`}
              placeholder={filter.placeholder}
            />
          </div>
        );

      case 'range':
        return (
          <div className="flex items-center space-x-1">
            <filter.icon className="w-4 h-4 text-gray-500" />
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={typeof filter.value === 'object' && filter.value !== null && 'min' in filter.value ? filter.value.min || '' : ''}
                onChange={(e) => {
                  const currentValue = typeof filter.value === 'object' && filter.value !== null ? filter.value : {};
                  onQuickFilterChange(filter.key, {
                    ...currentValue,
                    min: e.target.value ? Number(e.target.value) : undefined
                  });
                }}
                className={`w-20 bg-white border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isActive 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
                placeholder="Min"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={typeof filter.value === 'object' && filter.value !== null && 'max' in filter.value ? filter.value.max || '' : ''}
                onChange={(e) => {
                  const currentValue = typeof filter.value === 'object' && filter.value !== null ? filter.value : {};
                  onQuickFilterChange(filter.key, {
                    ...currentValue,
                    max: e.target.value ? Number(e.target.value) : undefined
                  });
                }}
                className={`w-20 bg-white border rounded-lg px-2 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  isActive 
                    ? 'border-blue-500 bg-blue-50 text-blue-700' 
                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                }`}
                placeholder="Max"
              />
            </div>
          </div>
        );

      case 'toggle':
        return (
          <button
            onClick={() => onQuickFilterChange(filter.key, !filter.value)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border text-sm font-medium transition-all ${
              filter.value
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400 hover:bg-gray-50'
            }`}
          >
            <filter.icon className="w-4 h-4" />
            <span>{filter.label}</span>
          </button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Search Bar */}
        <div className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && onSearch()}
                className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm placeholder-gray-500"
                placeholder="Search destinations, activities, or experiences..."
              />
            </div>
            
            <button
              onClick={onSearch}
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </div>

        {/* Quick Filters */}
        <div className="pb-4">
          <div className="flex items-center space-x-3 overflow-x-auto scrollbar-hide">
            <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Quick filters:</span>
            
            {quickFilters.map((filter) => (
              <div key={filter.key} className="flex-shrink-0">
                {renderQuickFilter(filter)}
              </div>
            ))}
            
            {/* Clear Filters Button */}
            {quickFilters.some(f => f.value && (Array.isArray(f.value) ? f.value.length > 0 : f.value)) && (
              <button
                onClick={() => quickFilters.forEach(f => onQuickFilterChange(f.key, undefined))}
                className="text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap underline"
              >
                Clear all
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Example usage with predefined quick filters
export const createDefaultQuickFilters = (
  availableOptions: {
    cities?: string[];
    groupSizes?: string[];
    durations?: string[];
  } = {}
): QuickFilter[] => [
  {
    key: 'city',
    label: 'Destination',
    icon: MapPinIcon,
    type: 'select',
    options: availableOptions.cities?.map(city => ({ value: city, label: city })) || [],
    placeholder: 'Any destination'
  },
  {
    key: 'startDate',
    label: 'Date',
    icon: CalendarIcon,
    type: 'date',
    placeholder: 'Anytime'
  },
  {
    key: 'groupSize',
    label: 'Group Size',
    icon: UserGroupIcon,
    type: 'select',
    options: availableOptions.groupSizes?.map(size => ({ value: size, label: size })) || [
      { value: '2-5', label: '2-5 people' },
      { value: '6-10', label: '6-10 people' },
      { value: '10-16', label: '10-16 people' }
    ],
    placeholder: 'Any group size'
  },
  {
    key: 'priceRange',
    label: 'Budget',
    icon: CurrencyDollarIcon,
    type: 'range',
    placeholder: 'Any budget'
  }
];
"use client";

import { useState, useEffect } from 'react';
import { 
  AdjustmentsHorizontalIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MapPinIcon,
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon,
  StarIcon,
  ShieldCheckIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

export interface ShareTourFilters {
  cities?: string[];
  countries?: string[];
  startDate?: string;
  endDate?: string;
  flexibleDays?: number;
  startWindows?: string[];
  durations?: string[];
  groupSizes?: string[];
  minPrice?: number;
  maxPrice?: number;
  maxPriceAtFull?: boolean;
  languages?: string[];
  travelStyles?: string[];
  accessibility?: string[];
  instantBook?: boolean;
  minHostRating?: number;
  dropInsOnly?: boolean;
  earlyBird?: boolean;
  payWhatYouWant?: boolean;
  cancellationPolicies?: string[];
  sortBy?: string;
}

interface FiltersPanelProps {
  filters: ShareTourFilters;
  onFiltersChange: (filters: ShareTourFilters) => void;
  availableOptions?: {
    cities?: string[];
    countries?: string[];
    languages?: string[];
    travelStyles?: string[];
    accessibility?: string[];
    durations?: string[];
    groupSizes?: string[];
    startWindows?: string[];
    cancellationPolicies?: string[];
    sortOptions?: { value: string; label: string }[];
  };
  className?: string;
  isMobile?: boolean;
  onClose?: () => void;
}

interface FilterSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

const FilterSection = ({ title, icon, children, isOpen, onToggle }: FilterSectionProps) => (
  <div className="border-b border-gray-200 pb-4 mb-4">
    <button
      onClick={onToggle}
      className="flex items-center justify-between w-full py-2 text-left"
    >
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-semibold text-gray-900">{title}</span>
      </div>
      {isOpen ? (
        <ChevronUpIcon className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDownIcon className="w-5 h-5 text-gray-500" />
      )}
    </button>
    {isOpen && <div className="mt-4">{children}</div>}
  </div>
);

const MultiSelectChips = ({ 
  options, 
  selected = [], 
  onChange
}: { 
  options: string[] | { value: string; label: string }[];
  selected: string[];
  onChange: (selected: string[]) => void;
}) => {
  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const formatOption = (option: string | { value: string; label: string }) => {
    return typeof option === 'string' ? option : option.label;
  };

  const getValue = (option: string | { value: string; label: string }) => {
    return typeof option === 'string' ? option : option.value;
  };

  return (
    <div className="space-y-3">
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selected.map(item => (
            <span
              key={item}
              className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {item}
              <button
                onClick={() => toggleOption(item)}
                className="hover:bg-blue-200 rounded-full p-0.5"
              >
                <XMarkIcon className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto">
        {options.map(option => {
          const value = getValue(option);
          const label = formatOption(option);
          return (
            <label key={value} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={selected.includes(value)}
                onChange={() => toggleOption(value)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

const PriceSlider = ({ 
  minPrice = 0, 
  maxPrice = 0, 
  min = 0, 
  max = 500, 
  onChange 
}: {
  minPrice: number;
  maxPrice: number;
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
}) => {
  const [localMin, setLocalMin] = useState(minPrice);
  const [localMax, setLocalMax] = useState(maxPrice || max);

  useEffect(() => {
    setLocalMin(minPrice);
    setLocalMax(maxPrice || max);
  }, [minPrice, maxPrice, max]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalMin(value);
    onChange(value, localMax);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setLocalMax(value);
    onChange(localMin, value);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Min</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={localMin}
              onChange={handleMinChange}
              min={min}
              max={localMax}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Max</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
            <input
              type="number"
              value={localMax}
              onChange={handleMaxChange}
              min={localMin}
              max={max}
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          value={localMin}
          onChange={handleMinChange}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={localMax}
          onChange={handleMaxChange}
          className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
};

export default function FiltersPanel({ 
  filters, 
  onFiltersChange, 
  availableOptions, 
  className = "", 
  onClose 
}: FiltersPanelProps) {
  const [openSections, setOpenSections] = useState({
    destination: true,
    dates: true,
    duration: true,
    budget: true,
    language: false,
    travelStyle: false,
    accessibility: false,
    host: false,
    deals: false
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilters = (updates: Partial<ShareTourFilters>) => {
    onFiltersChange({ ...filters, ...updates });
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const activeFilterCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'boolean') return value;
    return value !== undefined && value !== null && value !== '';
  }).length;

  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <AdjustmentsHorizontalIcon className="w-6 h-6 text-gray-600" />
          <h3 className="text-xl font-bold text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Clear all
            </button>
          )}
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
            >
              <XMarkIcon className="w-5 h-5 text-gray-500" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-6">
        {/* Destination */}
        <FilterSection
          title="Destination"
          icon={<MapPinIcon className="w-5 h-5 text-gray-500" />}
          isOpen={openSections.destination}
          onToggle={() => toggleSection('destination')}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Cities</label>
              <MultiSelectChips
                options={availableOptions?.cities || ['Lisbon', 'Barcelona', 'Paris', 'Rome']}
                selected={filters.cities || []}
                onChange={(cities) => updateFilters({ cities })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Countries</label>
              <MultiSelectChips
                options={availableOptions?.countries || ['Portugal', 'Spain', 'France', 'Italy']}
                selected={filters.countries || []}
                onChange={(countries) => updateFilters({ countries })}
              />
            </div>
          </div>
        </FilterSection>

        {/* Dates & Time */}
        <FilterSection
          title="Dates & Time"
          icon={<CalendarIcon className="w-5 h-5 text-gray-500" />}
          isOpen={openSections.dates}
          onToggle={() => toggleSection('dates')}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={filters.startDate || ''}
                  onChange={(e) => updateFilters({ startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={filters.endDate || ''}
                  onChange={(e) => updateFilters({ endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Flexible dates (± days)</label>
              <select
                value={filters.flexibleDays || 0}
                onChange={(e) => updateFilters({ flexibleDays: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Exact dates</option>
                <option value={1}>± 1 day</option>
                <option value={2}>± 2 days</option>
                <option value={3}>± 3 days</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Window</label>
              <MultiSelectChips
                options={['morning', 'afternoon', 'evening']}
                selected={filters.startWindows || []}
                onChange={(startWindows) => updateFilters({ startWindows })}
              />
            </div>
          </div>
        </FilterSection>

        {/* Duration & Group */}
        <FilterSection
          title="Duration & Group Size"
          icon={<ClockIcon className="w-5 h-5 text-gray-500" />}
          isOpen={openSections.duration}
          onToggle={() => toggleSection('duration')}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
              <MultiSelectChips
                options={[
                  { value: '30-60m', label: '30-60 minutes' },
                  { value: '1-2h', label: '1-2 hours' },
                  { value: '3-4h', label: '3-4 hours' },
                  { value: 'full-day', label: 'Full day' }
                ]}
                selected={filters.durations || []}
                onChange={(durations) => updateFilters({ durations })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Group Size</label>
              <MultiSelectChips
                options={[
                  { value: '2-5', label: '2-5 people' },
                  { value: '6-10', label: '6-10 people' },
                  { value: '10-16', label: '10-16 people' }
                ]}
                selected={filters.groupSizes || []}
                onChange={(groupSizes) => updateFilters({ groupSizes })}
              />
            </div>
          </div>
        </FilterSection>

        {/* Budget */}
        <FilterSection
          title="Budget"
          icon={<CurrencyDollarIcon className="w-5 h-5 text-gray-500" />}
          isOpen={openSections.budget}
          onToggle={() => toggleSection('budget')}
        >
          <div className="space-y-4">
            <PriceSlider
              minPrice={filters.minPrice || 0}
              maxPrice={filters.maxPrice || 0}
              min={0}
              max={500}
              onChange={(minPrice, maxPrice) => updateFilters({ minPrice, maxPrice })}
            />
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.maxPriceAtFull || false}
                onChange={(e) => updateFilters({ maxPriceAtFull: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Use max price at full group</span>
            </label>
          </div>
        </FilterSection>

        {/* Travel Style */}
        <FilterSection
          title="Travel Style"
          icon={<UserGroupIcon className="w-5 h-5 text-gray-500" />}
          isOpen={openSections.travelStyle}
          onToggle={() => toggleSection('travelStyle')}
        >
          <MultiSelectChips
            options={['relaxed', 'adventurous', 'foodie', 'culture', 'nightlife', 'family']}
            selected={filters.travelStyles || []}
            onChange={(travelStyles) => updateFilters({ travelStyles })}
          />
        </FilterSection>

        {/* Accessibility */}
        <FilterSection
          title="Accessibility"
          icon={<ShieldCheckIcon className="w-5 h-5 text-gray-500" />}
          isOpen={openSections.accessibility}
          onToggle={() => toggleSection('accessibility')}
        >
          <MultiSelectChips
            options={[
              { value: 'wheelchair-friendly', label: 'Wheelchair friendly' },
              { value: 'low-walking', label: 'Low walking' },
              { value: 'kid-friendly', label: 'Kid friendly' },
              { value: 'women-only', label: 'Women only' }
            ]}
            selected={filters.accessibility || []}
            onChange={(accessibility) => updateFilters({ accessibility })}
          />
        </FilterSection>

        {/* Host Options */}
        <FilterSection
          title="Host Options"
          icon={<StarIcon className="w-5 h-5 text-gray-500" />}
          isOpen={openSections.host}
          onToggle={() => toggleSection('host')}
        >
          <div className="space-y-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.instantBook || false}
                onChange={(e) => updateFilters({ instantBook: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Instant book only</span>
            </label>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum host rating
              </label>
              <select
                value={filters.minHostRating || 0}
                onChange={(e) => updateFilters({ minHostRating: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={0}>Any rating</option>
                <option value={3}>3+ stars</option>
                <option value={4}>4+ stars</option>
                <option value={4.5}>4.5+ stars</option>
              </select>
            </div>
          </div>
        </FilterSection>

        {/* Deal States */}
        <FilterSection
          title="Special Deals"
          icon={<div className="w-5 h-5 bg-red-500 rounded text-white flex items-center justify-center text-xs font-bold">%</div>}
          isOpen={openSections.deals}
          onToggle={() => toggleSection('deals')}
        >
          <div className="space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.dropInsOnly || false}
                onChange={(e) => updateFilters({ dropInsOnly: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Drop-ins only (starting &lt;2h)</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.earlyBird || false}
                onChange={(e) => updateFilters({ earlyBird: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Early bird discounts</span>
            </label>
            
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.payWhatYouWant || false}
                onChange={(e) => updateFilters({ payWhatYouWant: e.target.checked })}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Pay what you want</span>
            </label>
          </div>
        </FilterSection>
      </div>
    </div>
  );
}
import React from 'react';
import { searchOptions } from '../../data/searchOptions';

interface PropertyFiltersProps {
  filters: {
    topology: string;
    budget: string;
    possession: string;
    location: string;
    carpetArea: string;
  };
  setFilters: (filters: any) => void;
}

export default function PropertyFilters({ filters, setFilters }: PropertyFiltersProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Filters</h2>
      
      {Object.entries(searchOptions).map(([key, { label, options }]) => (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {label}
          </label>
          <select
            value={filters[key]}
            onChange={(e) => setFilters({ ...filters, [key]: e.target.value })}
            className="w-full p-2 border rounded-lg focus:ring-maroon-500 focus:border-maroon-500"
          >
            <option value="">All {label}</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}
import React, { useState } from 'react';
import { Building2, Info } from 'lucide-react';

export default function PropertyDetails({ property }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!property) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-500">
        Select a property to view details
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          className={`flex-1 py-3 px-4 ${
            activeTab === 'overview'
              ? 'border-b-2 border-maroon-600 text-maroon-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('overview')}
        >
          <Building2 className="h-5 w-5 inline-block mr-1" />
          Overview
        </button>
        <button
          className={`flex-1 py-3 px-4 ${
            activeTab === 'details'
              ? 'border-b-2 border-maroon-600 text-maroon-600'
              : 'text-gray-600'
          }`}
          onClick={() => setActiveTab('details')}
        >
          <Info className="h-5 w-5 inline-block mr-1" />
          Details
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'overview' ? (
          <div className="space-y-4">
            <h3 className="font-bold text-gray-900">Price Range</h3>
            {property.priceRange.map((range) => (
              <div key={range.bhk} className="flex justify-between">
                <span>{range.bhk}</span>
                <span>₹{range.price} Cr</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900">Configuration</h3>
              {property.configurations.map((config) => (
                <div key={config.bhk} className="flex justify-between">
                  <span>{config.bhk}</span>
                  <span>{config.carpetArea} sq.ft</span>
                </div>
              ))}
            </div>
            <div>
              <h3 className="font-bold text-gray-900">Possession</h3>
              <p>{property.possession.target}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
import React from 'react';

const topologies = ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5+ BHK'];
const budgets = ['50L - 1Cr', '1Cr - 2Cr', '2Cr - 3Cr', '3Cr+'];
const possessions = ['Ready to Move', '1 Year', '2 Years', '3 Years'];
const locations = ['Baner', 'Hinjewadi', 'Wakad', 'Kothrud', 'Viman Nagar'];
const carpetAreas = ['500-1000 sq.ft', '1000-1500 sq.ft', '1500-2000 sq.ft', '2000+ sq.ft'];

const SearchOption = ({ label, options }: { label: string; options: string[] }) => (
  <div className="flex-1 min-w-[200px]">
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select className="w-full p-2 border rounded-lg focus:ring-maroon-500 focus:border-maroon-500">
      <option value="">Select {label}</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

export default function SearchBar() {
  return (
    <div className="max-w-7xl mx-auto -mt-24 relative z-10 px-4">
      <div className="bg-white rounded-xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <SearchOption label="Topology" options={topologies} />
          <SearchOption label="Budget" options={budgets} />
          <SearchOption label="Possession" options={possessions} />
          <SearchOption label="Location" options={locations} />
          <SearchOption label="Carpet Area" options={carpetAreas} />
        </div>
        <div className="mt-4 flex justify-center">
          <button className="bg-maroon-600 text-white px-8 py-3 rounded-lg hover:bg-maroon-700 transition-colors">
            Search Properties
          </button>
        </div>
      </div>
    </div>
  );
}
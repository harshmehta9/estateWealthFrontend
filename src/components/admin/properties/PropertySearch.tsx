import React from 'react';
import { Search } from 'lucide-react';

interface PropertySearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedLocation: string;
  setSelectedLocation: React.Dispatch<React.SetStateAction<string>>;
  selectedConfiguration: string;
  setSelectedConfiguration: React.Dispatch<React.SetStateAction<string>>;
}

export default function PropertySearch({ 
  searchQuery, 
  setSearchQuery,
  selectedLocation,
  setSelectedLocation,
  selectedConfiguration,
  setSelectedConfiguration 
}: PropertySearchProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search properties..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-maroon-500 focus:border-maroon-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        >
          <option value="">All Locations</option>
          <option value="asdfkljasklf">asdfkljasklf</option>
          <option value="sdfasdfsadf">sdfasdfsadf</option>
          {/* Add more locations as needed */}
        </select>
        <select
          value={selectedConfiguration}
          onChange={(e) => setSelectedConfiguration(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-maroon-500 focus:border-maroon-500"
        >
          <option value="">All Configurations</option>
          <option value="1 BHK">1 BHK</option>
          <option value="2 BHK">2 BHK</option>
          <option value="3 BHK">3 BHK</option>
          <option value="4 BHK">4 BHK</option>
        </select>
      </div>
    </div>
  );
}
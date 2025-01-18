import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface SearchOptionProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const SearchOption: React.FC<SearchOptionProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="flex flex-col">
      <label className="text-gray-700 mb-2">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="border rounded-lg p-2"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

interface Selections {
  topology: string;
  budget: string;
  possession: string;
  location: string;
  carpetArea: string;
}

export default function SearchBar() {
  const navigate = useNavigate();
  const [selections, setSelections] = useState<Selections>({
    topology: '',
    budget: '',
    possession: '',
    location: '',
    carpetArea: ''
  });

  const searchOptions = {
    topology: {
      label: 'Topology',
      options: ['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK']
    },
    budget: {
      label: 'Budget',
      options: [
        '₹40L - ₹60L',
        '₹60L - ₹80L',
        '₹80L - ₹1Cr',
        '₹1Cr - ₹1.2Cr',
        '₹1.2Cr - ₹1.5Cr',
        '₹1.5Cr - ₹2Cr',
        '₹2Cr - ₹3Cr',
        '₹3Cr - ₹4Cr',
        '₹4Cr+'
      ]
    },
    possession: {
      label: 'Possession',
      options: ['Ready to Move', '2024', '2025', '2026', '2027']
    },
    location: {
      label: 'Location',
      options: ['Mumbai', 'Thane', 'Navi Mumbai', 'Pune', 'Bangalore']
    },
    carpetArea: {
      label: 'Carpet Area',
      options: ['400-600 sq ft', '600-800 sq ft', '800-1000 sq ft', '1000-1500 sq ft', '1500+ sq ft']
    }
  };

  const handleOptionChange = (key: keyof Selections, value: string) => {
    setSelections(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(selections).forEach(([key, value]) => {
      if (value) params.append(key, value);
    });
    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto -mt-24 relative z-10 px-4">
      <div className="bg-white rounded-xl shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(searchOptions).map(([key, { label, options }]) => (
            <SearchOption
              key={`search-option-${key}`}
              label={label}
              options={options}
              value={selections[key as keyof Selections]}
              onChange={(value) => handleOptionChange(key as keyof Selections, value)}
            />
          ))}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-maroon-600 text-white px-8 py-3 rounded-lg hover:bg-maroon-700 transition-colors"
          >
            Search Properties
          </button>
        </div>
      </div>
    </div>
  );
}
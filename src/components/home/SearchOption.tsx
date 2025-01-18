import React from 'react';

interface SearchOptionProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export default function SearchOption({ label, options, value, onChange }: SearchOptionProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <select 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-maroon-500 focus:ring-maroon-500"
      >
        <option value="">Select {label}</option>
        {options.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
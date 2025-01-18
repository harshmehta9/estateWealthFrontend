import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../components/Layout';
import PropertyFilters from '../components/properties/PropertyFilters';
import PropertyCard from '../components/properties/PropertyCard.tsx';
import PropertyDetails from '../components/properties/PropertyDetails';

export default function PropertySearch() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [selectedProperty, setSelectedProperty] = useState(null);

  // Get search parameters
  const initialFilters = {
    topology: searchParams.get('topology') || '',
    budget: searchParams.get('budget') || '',
    possession: searchParams.get('possession') || '',
    location: searchParams.get('location') || '',
    carpetArea: searchParams.get('carpetArea') || '',
  };

  const [filters, setFilters] = useState(initialFilters);
  const [properties, setProperties] = useState([]);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-1/4">
            <PropertyFilters filters={filters} setFilters={setFilters} />
          </div>

          {/* Property Listings */}
          <div className="w-2/4">
            <div className="grid gap-6">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} onSelect={setSelectedProperty} />
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="w-1/4">
            <PropertyDetails property={selectedProperty} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
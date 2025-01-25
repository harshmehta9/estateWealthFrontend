import { useState, useEffect } from 'react';
import PropertySearch from '../../../components/admin/properties/PropertySearch';
import PropertyList from '../../../components/admin/properties/PropertyList';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Property {
  _id: string;
  basicInfo: {
    propertyName: string;
    propertyAddress: string;
    locality: string;
  };
  configuration: {
    configurations: Array<{
      bhkType: string;
      price: {
        value: number | null;
        unit: string;
      };
      area: {
        value: number | null;
        unit: string;
      };
      bookingAmount: {
        value: number | null;
        unit: string;
      };
      parking: string;
      _id: string;
    }>;
    googleMapLink: string;
    aboutProperty: string;
    aboutBuilder: string;
  };
  propertyImages: string[];
}

export default function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedConfiguration, setSelectedConfiguration] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${import.meta.env.VITE_API_URL}/properties/getAllProperties`)
      .then(response => {
        setProperties(response.data.properties);
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
        setIsLoading(false);
      });
  }, []);

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.basicInfo.propertyName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation ? 
      property.basicInfo.locality === selectedLocation : true;
    const matchesConfiguration = selectedConfiguration ? 
      property.configuration.configurations.some(c => c.bhkType === selectedConfiguration) : true;
    return matchesSearch && matchesLocation && matchesConfiguration;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Property Management</h1>
        <Link
          to="/admin/newproperty"
          className="flex items-center space-x-2 bg-maroon-600 text-white px-4 py-2 rounded-lg hover:bg-maroon-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Property</span>
        </Link>
      </div>

      <PropertySearch 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedConfiguration={selectedConfiguration}
        setSelectedConfiguration={setSelectedConfiguration} 
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <PropertyList properties={filteredProperties} />
      )}
    </div>
  );
}
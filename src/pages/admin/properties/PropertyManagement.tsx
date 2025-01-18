import { useState, useEffect } from 'react';
import PropertySearch from '../../../components/admin/properties/PropertySearch';
import PropertyList from '../../../components/admin/properties/PropertyList';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Property {
  _id: string;
  name: string;
  priceRange: { bhk: string; price: number }[];
  location: { address: string; googleMapLink?: string };
  images: string[];
  landParcel: number;
  towers: number;
  configurations: { bhk: string; carpetArea: number }[];
  reraNumbers: string[];
  possession: { target: string; reraPossession?: string };
  about: string;
  prosAndCons: { pros: string[]; cons: string[] };
  videoLink?: string;
  internalAmenities: string[];
  externalAmenities: string[];
  masterPlanImage?: string;
  floorPlanImage?: string;
  pricingDetails: {
    carpetArea: number;
    totalPrice: number;
    downPayment: number;
    parking: number;
    unitPlanImage: string;
  }[];
  paymentScheme?: string;
  offer?: string;
  faqs: { question: string; answer: string }[];
}


export default function PropertyManagement() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedConfiguration, setSelectedConfiguration] = useState('');
  // const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Fetch data from the backend
    axios.get('http://localhost:3000/properties/getAllProperties')
      .then(response => {
        console.dir('Fetched properties:', response.data.properties);
        setProperties(response.data.properties);
      })
      .catch(error => {
        console.error('Error fetching properties:', error);
      });
  }, []);

  const filteredProperties = properties.filter(property =>
    property.name.toLowerCase().includes(searchQuery.toLowerCase())
  );



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

      <PropertySearch searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
        selectedConfiguration={selectedConfiguration}
        setSelectedConfiguration={setSelectedConfiguration} />
      <PropertyList properties={filteredProperties} />
    </div>
  );
}
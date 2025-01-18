import React, { useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Layout from "../components/Layout";
import PropertyFilters from "../components/properties/PropertyFilters";
import PropertyCard from "../components/properties/PropertyCard";
import { Phone, Check } from "lucide-react";


const filterProperties = (properties, filters) => {
  return properties.filter((property) => {
    // Filter by topology (BHK)
    if (
      filters.topology &&
      !property.priceRange.some((c) => c.bhk === filters.topology)
    ) {
      return false;
    }

    // Filter by budget
    if (filters.budget) {
      const [minStr, maxStr] = filters.budget.split(" - ");
      const min = parseFloat(minStr.replace("₹", "").replace("Cr", ""));
      const max = parseFloat(maxStr.replace("₹", "").replace("Cr", ""));

      const propertyPrice = Math.min(
        ...property.priceRange.map((p) => p.price * 7)
      );
      if (propertyPrice < min || propertyPrice > max) {
        return false;
      }
    }

    // Filter by possession
    if (
      filters.possession &&
      property.possession.target !== filters.possession
    ) {
      return false;
    }

    // Filter by location
    if (
      filters.location &&
      !property.location.locality.includes(filters.location)
    ) {
      return false;
    }

    // Filter by carpet area
    if (filters.carpetArea) {
      const [minStr, maxStr] = filters.carpetArea
        .split("-")
        .map((s) => s.trim());
      const min = parseInt(minStr);
      const max = parseInt(maxStr.replace(" sq.ft", ""));

      const propertyCarpetArea = Math.min(
        ...property.configurations.map((c) => c.carpetArea)
      );
      if (propertyCarpetArea < min || propertyCarpetArea > max) {
        return false;
      }
    }

    return true;
  });
};

const CallbackCard = () => {
  const [phone, setPhone] = useState("");

  const benefits = [
    "Get expert guidance on property selection",
    "Receive exclusive offers and discounts",
    "Schedule site visits at your convenience",
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle callback request
    console.log("Callback requested for:", phone);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Book a Callback</h3>

      <form onSubmit={handleSubmit} className="mb-6">
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Enter your phone number"
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-maroon-500 focus:border-maroon-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full mt-4 bg-maroon-600 text-white py-2 px-4 rounded-lg hover:bg-maroon-700 transition-colors"
        >
          Get Callback
        </button>
      </form>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Benefits:</h4>
        <ul className="space-y-2">
          {benefits.map((benefit, index) => (
            <li key={index} className="flex items-start">
              <Check className="h-5 w-5 text-maroon-600 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-sm text-gray-600">{benefit}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};



interface Property {
  _id: string;
  configurations: Array<{ bhk: string; carpetArea: number }>;
  priceRange: Array<{ price: number }>;
  possession: { target: string };
  location: { address: string };
}

const PropertiesPage: React.FC = () => {
  const location = useLocation();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  const searchParams = new URLSearchParams(location.search);
  const initialFilters = {
    topology: searchParams.get("topology") || "",
    budget: searchParams.get("budget") || "",
    possession: searchParams.get("possession") || "",
    location: searchParams.get("location") || "",
    carpetArea: searchParams.get("carpetArea") || "",
  };

  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:3000/properties/getAllProperties"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch properties");
        }
        const data = await response.json();
        let properties = data.properties;
        setProperties(properties);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const filteredProperties = useCallback(
    () => filterProperties(properties, filters),
    [properties, filters]
  );

  if (isLoading) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-maroon-600"></div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-red-600 text-center">
            <p className="text-xl font-semibold">Error loading properties</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/4">
            <PropertyFilters filters={filters} setFilters={setFilters} />
          </div>
          <div className="w-full lg:w-2/4">
            <div className="grid gap-6">
              {filteredProperties().map((property) => (
                <PropertyCard
                  key={property._id}
                  property={property}
                  onSelect={setSelectedProperty}
                />
              ))}
              {filteredProperties().length === 0 && !isLoading && (
                <div className="text-center p-6 bg-white rounded-xl shadow">
                  <p className="text-gray-500">
                    No properties found matching your criteria
                  </p>
                </div>
              )}
            </div>
          </div>
          <div className="w-full lg:w-1/4">
            <div className="lg:sticky lg:top-6">
              <CallbackCard />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PropertiesPage;

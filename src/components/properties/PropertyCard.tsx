import React from "react";
import { Building2, MapPin } from "lucide-react";

export default function PropertyCard({ property, onSelect }) {
  return (
    <div
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
      onClick={() => onSelect(property)}
    >
      <img
        src={property.images[0]}
        alt={property.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900">{property.name}</h3>
        <div className="flex items-center text-gray-600 mt-2">
          <MapPin className="h-4 w-4 mr-1" />
          <span>{property.location.address}</span>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            {property.priceRange.map((range) => (
              <div key={range.bhk} className="text-sm">
                <span className="font-medium">{range.bhk}:</span> ₹{range.price}{" "}
                Cr
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Possession: {property.possession.target}
          </div>
        </div>
      </div>
    </div>
  );
}

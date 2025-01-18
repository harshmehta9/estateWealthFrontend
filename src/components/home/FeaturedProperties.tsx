import React from 'react';
import { propertyData } from '../../data/propertyData';

export default function FeaturedProperties() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Properties</h2>
          <p className="text-gray-600 mt-2">Handpicked properties for your consideration</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {propertyData.map((property) => (
            <div key={property.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <img
                src={property.image}
                alt={property.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-maroon-600 font-bold text-xl">{property.price}</span>
                  <span className="text-gray-500">{property.specs}</span>
                </div>
                <button className="mt-4 w-full bg-maroon-600 text-white py-2 rounded-lg hover:bg-maroon-700 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
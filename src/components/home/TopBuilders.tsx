import React from 'react';
import { builderData } from '../../data/builderData';

export default function TopBuilders() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Our Partner Builders</h2>
          <p className="text-gray-600 mt-2">Trusted names in real estate development</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {builderData.map((builder) => (
            <div
              key={builder.id}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <img
                src={builder.logo}
                alt={builder.name}
                className="w-full h-32 object-contain mb-4"
              />
              <h3 className="text-center font-semibold text-gray-900">{builder.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
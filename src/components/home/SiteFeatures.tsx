import React from 'react';
import { siteFeatures } from '../../data/siteFeatures';

export default function SiteFeatures() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Why Choose Us</h2>
          <p className="text-gray-600 mt-2">What makes us different from others</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {siteFeatures.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-block p-4 bg-maroon-100 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-maroon-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
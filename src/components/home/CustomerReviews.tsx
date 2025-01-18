import React from 'react';
import { Star } from 'lucide-react';
import { reviewData } from '../../data/reviewData';

export default function CustomerReviews() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2">Real experiences from real customers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviewData.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{review.name}</h3>
                  <div className="flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-gray-600">{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
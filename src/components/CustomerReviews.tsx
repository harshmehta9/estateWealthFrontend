import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Priya Sharma',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200',
    review: 'Found my dream home through EstateElite. The process was smooth and transparent.',
    rating: 5
  },
  {
    id: 2,
    name: 'Rahul Verma',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200',
    review: 'Excellent service and professional team. Highly recommended!',
    rating: 5
  },
  {
    id: 3,
    name: 'Anjali Patel',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=200',
    review: 'Great experience working with EstateElite. They made house hunting easy.',
    rating: 4
  }
];

export default function CustomerReviews() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">What Our Customers Say</h2>
          <p className="text-gray-600 mt-2">Real experiences from real customers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
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
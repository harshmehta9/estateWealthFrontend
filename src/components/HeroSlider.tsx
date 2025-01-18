import React, { useState, useEffect } from 'react';

const images = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=800',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=800',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&h=800'
];

export default function HeroSlider() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {images.map((img, index) => (
        <div
          key={img}
          className={`absolute w-full h-full transition-opacity duration-1000 ${
            index === currentImage ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={img}
            alt={`Luxury home ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40" />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-5xl font-bold mb-4">Find Your Dream Home</h1>
          <p className="text-xl">Discover luxury living at its finest</p>
        </div>
      </div>
    </div>
  );
}
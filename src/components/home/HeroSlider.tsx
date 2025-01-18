import React, { useState, useEffect } from 'react';
import { useSlider } from '../../hooks/useSlider';
import { heroImages } from '../../data/images';

export default function HeroSlider() {
  const currentImage = useSlider(heroImages, 5000);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {heroImages.map((img, index) => (
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
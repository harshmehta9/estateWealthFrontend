import React from 'react';
import { Building2, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-maroon-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="h-8 w-8" />
              <span className="text-2xl font-bold">EstateElite</span>
            </div>
            <p className="text-maroon-200">
              Your trusted partner in finding the perfect home in Pune.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-maroon-200 hover:text-white">Home</a></li>
              <li><a href="#" className="text-maroon-200 hover:text-white">Properties</a></li>
              <li><a href="#" className="text-maroon-200 hover:text-white">Blogs</a></li>
              <li><a href="#" className="text-maroon-200 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>info@estateelite.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Baner, Pune, Maharashtra</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="text-maroon-200 mb-4">
              Subscribe to get the latest updates and news.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-lg w-full text-gray-900"
              />
              <button className="bg-maroon-700 px-4 py-2 rounded-r-lg hover:bg-maroon-600">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-maroon-800 mt-8 pt-8 text-center text-maroon-200">
          <p>&copy; 2024 EstateElite. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
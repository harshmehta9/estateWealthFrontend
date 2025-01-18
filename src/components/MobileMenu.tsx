import React from 'react';
import { Link } from 'react-router-dom';
import { Phone } from 'lucide-react';

interface MobileMenuProps {
  onClose: () => void;
}

export default function MobileMenu({ onClose }: MobileMenuProps) {
  const menuItems = [
    { title: 'About Us', path: '/about' },
    { title: 'Calculator', path: '/calculator' },
    { title: 'Buy Property in Pune', path: '/properties' },
    { title: 'Privacy Policy', path: '/privacy' },
    { title: 'Disclaimer', path: '/disclaimer' },
    { title: 'Blogs', path: '/blogs' },
    { title: 'Contact Us', path: '/contact' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-maroon-900 text-white overflow-y-auto">
      <div className="p-6">
        <div className="space-y-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="block py-3 px-4 hover:bg-maroon-800 rounded-lg transition-colors"
              onClick={onClose}
            >
              {item.title}
            </Link>
          ))}
          
          <div className="pt-4 border-t border-maroon-800">
            <Link
              to="/signin"
              className="block py-3 px-4 hover:bg-maroon-800 rounded-lg transition-colors"
              onClick={onClose}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block py-3 px-4 bg-maroon-700 rounded-lg mt-2 text-center hover:bg-maroon-600 transition-colors"
              onClick={onClose}
            >
              Sign Up
            </Link>
          </div>

          <a
            href="tel:8097452839"
            className="flex items-center justify-center space-x-2 py-3 px-4 bg-green-600 rounded-lg mt-4 hover:bg-green-700 transition-colors"
          >
            <Phone className="h-5 w-5" />
            <span>Support - 8097452839</span>
          </a>

          <div className="flex justify-center space-x-8 pt-6">
            <a href="#" className="text-maroon-200 hover:text-white">
              <i className="fab fa-facebook text-2xl"></i>
            </a>
            <a href="#" className="text-maroon-200 hover:text-white">
              <i className="fab fa-linkedin text-2xl"></i>
            </a>
            <a href="#" className="text-maroon-200 hover:text-white">
              <i className="fab fa-youtube text-2xl"></i>
            </a>
            <a href="#" className="text-maroon-200 hover:text-white">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
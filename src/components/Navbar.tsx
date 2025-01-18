import React, { useState } from 'react';
import { Building2, Menu, X } from 'lucide-react';
import MobileMenu from './MobileMenu';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-maroon-900 text-white px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Building2 className="h-8 w-8" />
          <span className="text-2xl font-bold">EstateElite</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/blogs" className="hover:text-maroon-200 transition-colors">
            Blogs
          </Link>
          <Link to="/signin" className="hover:text-maroon-200 transition-colors">
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-maroon-700 px-4 py-2 rounded-lg hover:bg-maroon-600 transition-colors"
          >
            Sign Up
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && <MobileMenu onClose={() => setIsMenuOpen(false)} />}
    </nav>
  );
}
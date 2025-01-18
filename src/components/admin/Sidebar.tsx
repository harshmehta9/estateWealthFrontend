import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Users,
  FileText,
  LogOut
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Building2, label: 'Property Management', path: '/admin/properties' },
  { icon: Users, label: 'User Management', path: '/admin/users' },
  { icon: FileText, label: 'CMS', path: '/admin/cms' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-64 bg-maroon-900 text-white flex flex-col">
      <div className="p-4 border-b border-maroon-800">
        <div className="flex items-center space-x-2">
          <Building2 className="h-8 w-8" />
          <span className="text-xl font-bold">Admin Panel</span>
        </div>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-maroon-700 text-white'
                      : 'text-maroon-200 hover:bg-maroon-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-maroon-800">
        <button className="flex items-center space-x-2 text-maroon-200 hover:text-white w-full px-4 py-2 rounded-lg hover:bg-maroon-800 transition-colors">
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}
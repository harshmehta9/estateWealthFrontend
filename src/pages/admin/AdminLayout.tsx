import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
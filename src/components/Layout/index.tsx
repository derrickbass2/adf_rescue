
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './index.css';

const Layout: React.FC = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar Navigation */}
      <nav className="w-64 bg-white shadow-lg p-4">
        <div className="mb-8">
          <h1 className="text-xl font-bold text-primary-color">ADF: Accelerate</h1>
        </div>
        <div className="space-y-2">
          <Link to="/dashboard" className="block p-2 hover:bg-gray-100 rounded">Dashboard</Link>
          <Link to="/health-check" className="block p-2 hover:bg-gray-100 rounded">Health Check</Link>
          <Link to="/data-input" className="block p-2 hover:bg-gray-100 rounded">Data Input</Link>
          <Link to="/real-time" className="block p-2 hover:bg-gray-100 rounded">Real-Time Metrics</Link>
          <Link to="/alerts" className="block p-2 hover:bg-gray-100 rounded">Alerts</Link>
          <Link to="/directory" className="block p-2 hover:bg-gray-100 rounded">Directory</Link>
          <Link to="/collectors" className="block p-2 hover:bg-gray-100 rounded">Collectors</Link>
          <Link to="/rescue-chart" className="block p-2 hover:bg-gray-100 rounded">Rescue Chart</Link>
          <Link to="/process" className="block p-2 hover:bg-gray-100 rounded">Process</Link>
          <Link to="/" className="block p-2 hover:bg-gray-100 rounded">Home</Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 bg-background-default p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
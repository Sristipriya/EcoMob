import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Battery, DollarSign, Zap } from 'lucide-react';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-green-600 to-green-400 rounded-xl overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80"
          alt="Electric Vehicle"
          className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20"
        />
        <div className="relative p-8 md:p-12">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Welcome to Charge & Ride
          </h1>
          <p className="text-green-50 text-lg mb-6">
            Your eco-friendly transportation solution across India
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => navigate('/rides')}
              className="bg-white text-green-600 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition-colors"
            >
              Book a Ride
            </button>
            <button 
              onClick={() => navigate('/charging-stations')}
              className="border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              Find Charging Station
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Rides</p>
              <p className="text-2xl font-bold text-gray-800">24</p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <MapPin className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>

        {/* Similar stats cards... */}
      </div>

      {/* Recent Activity with modern design */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {/* Activity items */}
          <div className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <MapPin className="h-5 w-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">Ride to Cyber City</p>
                  <p className="text-sm text-gray-500">Today at 14:30</p>
                  <p className="text-xs text-gray-500">Gurgaon, Haryana</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  +50 Points
                </span>
                <span className="block text-sm text-gray-500 mt-1">₹350</span>
              </div>
            </div>
          </div>
          {/* More activity items... */}
        </div>
      </div>

      {/* Popular Charging Stations with modern cards */}
      <div>
        <h2 className="text-xl font-semibold text-gray-800 mb-6">Popular Charging Stations Nearby</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Modern station cards */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-48">
              <img
                src="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80"
                alt="Charging Station"
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4">
                <div className="bg-green-500 w-3 h-3 rounded-full"></div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-gray-800 mb-2">Green Energy Hub</h3>
              <p className="text-sm text-gray-500 mb-4">Sector 15, Gurgaon</p>
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-600">₹12/kWh</span>
                <span className="text-sm text-gray-500">Type 2 Connector</span>
              </div>
              <button 
                onClick={() => navigate('/charging-stations')}
                className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
          {/* More station cards... */}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
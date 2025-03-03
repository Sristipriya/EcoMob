import React, { useState } from 'react';
import { MapPin, Battery, Search } from 'lucide-react';

function ChargingStations() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search logic here
  };

  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Charging Stations</h1>
        <p className="text-gray-600 mt-2">Find and book charging stations near you</p>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 w-full rounded-lg border border-gray-200 p-2.5"
          placeholder="Search by location or station name"
        />
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((station) => (
          <div key={station} className="bg-white p-4 rounded-lg border border-gray-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-800">Green Energy Hub {station}</h3>
                <p className="text-sm text-gray-500">Sector 15, Gurgaon</p>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-gray-600">₹12/kWh</p>
                  <p className="text-sm text-gray-600">Type 2 Connector</p>
                  <p className="text-sm text-gray-600">4.8 ★ (120 reviews)</p>
                </div>
                <div className="mt-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Available
                  </span>
                </div>
              </div>
              <div className="bg-green-50 p-2 rounded-full">
                <Battery className="h-5 w-5 text-green-500" />
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Book Now
              </button>
              <button className="w-full border border-gray-200 text-gray-600 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ChargingStations;
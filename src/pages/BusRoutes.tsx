import React, { useState, useEffect } from 'react';
import { Bus, MapPin, Calendar, Clock, Search } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { supabase } from '../lib/supabase';

interface BusRoute {
  id: string;
  routeNumber: string;
  from: string;
  to: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  availableSeats: number;
  busType: string;
  amenities: string[];
}

function BusRoutes() {
  const [routes, setRoutes] = useState<BusRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const { user } = useAuthStore();

  useEffect(() => {
    fetchBusRoutes();
  }, []);

  const fetchBusRoutes = async () => {
    try {
      const { data, error } = await supabase
        .from('bus_routes')
        .select('*')
        .eq('active', true);

      if (error) throw error;

      setRoutes(data || []);
    } catch (error) {
      console.error('Error fetching bus routes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (routeId: string) => {
    try {
      const { error } = await supabase
        .from('bus_bookings')
        .insert([
          {
            route_id: routeId,
            user_id: user?.id,
            booking_date: selectedDate,
            status: 'confirmed'
          }
        ]);

      if (error) throw error;

      // Update available seats
      const { error: updateError } = await supabase.rpc('decrease_available_seats', {
        route_id: routeId
      });

      if (updateError) throw updateError;

      alert('Booking confirmed successfully!');
    } catch (error) {
      console.error('Error booking bus:', error);
      alert('Failed to book. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Electric Bus Routes</h1>
        <p className="text-gray-600 mt-2">Book eco-friendly bus rides for your journey</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search routes..."
              className="pl-10 w-full rounded-lg border border-gray-200 p-2.5"
            />
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full rounded-lg border border-gray-200 p-2.5"
              />
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading bus routes...</p>
        </div>
      ) : (
        <div className="space-y-6">
          {routes.map((route) => (
            <div key={route.id} className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="bg-green-50 p-3 rounded-lg">
                    <Bus className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-800">Route {route.routeNumber}</h3>
                      <span className="text-sm text-gray-500">• {route.busType}</span>
                    </div>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-600">{route.from} → {route.to}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-600">{route.departureTime} - {route.arrivalTime}</p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {route.amenities.map((amenity, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                          >
                            {amenity}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-800">₹{route.price}</p>
                  <p className="text-sm text-gray-500">{route.availableSeats} seats left</p>
                  <button
                    onClick={() => handleBooking(route.id)}
                    disabled={route.availableSeats === 0}
                    className="mt-4 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {route.availableSeats === 0 ? 'Sold Out' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BusRoutes;
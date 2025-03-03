import React, { useState, useEffect } from 'react';
import { Car, MapPin, Calendar, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuthStore } from '../store/authStore';

function FindRides() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropLocation, setDropLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [rides, setRides] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuthStore();

  useEffect(() => {
    fetchAvailableRides();
  }, []);

  const fetchAvailableRides = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('status', 'available');

      if (error) throw error;
      setRides(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('rides')
        .select('*')
        .eq('status', 'available')
        .textSearch('start_location->>address', pickupLocation, {
          config: 'english'
        })
        .textSearch('end_location->>address', dropLocation, {
          config: 'english'
        });

      if (error) throw error;
      setRides(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async (rideId: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('rides')
        .update({
          rider_id: user?.id,
          status: 'booked',
          start_time: new Date().toISOString()
        })
        .eq('id', rideId)
        .eq('status', 'available');

      if (error) throw error;

      // Update rides list
      await fetchAvailableRides();
      alert('Ride booked successfully!');
    } catch (err: any) {
      setError(err.message);
      alert('Failed to book ride. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Find Available Rides</h1>
        <p className="text-gray-600 mt-2">Book eco-friendly rides for your journey</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSearch} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={pickupLocation}
                onChange={(e) => setPickupLocation(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-200 p-2.5"
                placeholder="Enter pickup location"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Drop Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                value={dropLocation}
                onChange={(e) => setDropLocation(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-200 p-2.5"
                placeholder="Enter drop location"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-200 p-2.5"
                min={new Date().toISOString().split('T')[0]}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Time</label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="pl-10 w-full rounded-lg border border-gray-200 p-2.5"
                required
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search Rides'}
        </button>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Available Rides</h2>
        
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading rides...</p>
          </div>
        ) : rides.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600">No rides available for your search criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rides.map((ride) => (
              <div key={ride.id} className="bg-white p-4 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <Car className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800">{ride.vehicle_details.model}</h3>
                      <p className="text-sm text-gray-500">
                        {ride.start_location.address} → {ride.end_location.address}
                      </p>
                      <div className="mt-2 space-y-1">
                        <p className="text-sm text-gray-600">Range: {ride.vehicle_details.range} km</p>
                        <p className="text-sm text-gray-600">
                          Battery: {ride.vehicle_details.currentCharge}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-800">₹{ride.price}</p>
                    <button
                      onClick={() => handleBooking(ride.id)}
                      disabled={loading}
                      className="mt-2 bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700 transition-colors disabled:opacity-50"
                    >
                      {loading ? 'Booking...' : 'Book Now'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FindRides;
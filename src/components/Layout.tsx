import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { Menu, User, MapPin, Battery, BarChart3, LogOut, Zap, Phone, HelpCircle, Leaf, Bus } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useLanguageStore } from '../store/languageStore';
import { translations, Language } from '../lib/translations';

const Layout: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCity, setSelectedCity] = useState('');
  const [userLocation, setUserLocation] = useState<{city: string, coords: {latitude: number, longitude: number}} | null>(null);
  const { language, setLanguage } = useLanguageStore();
  const { signOut, user } = useAuthStore();

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const response = await fetch(
              `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            );
            const data = await response.json();
            setUserLocation({
              city: data.city,
              coords: {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              }
            });
            setSelectedCity(data.city);
          } catch (error) {
            console.error('Error getting location details:', error);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value as Language);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <aside className="fixed top-0 left-0 h-screen w-64 bg-white shadow-lg">
        <div className="p-6">
          <Link to="/" className="text-2xl font-bold text-green-600 flex items-center gap-2">
            <Leaf className="h-6 w-6" />
            EcoMob
          </Link>
          <p className="text-sm text-gray-500 mt-1">
            {translations[language as Language].common.welcome}
          </p>
        </div>
        
        <nav className="mt-6">
          <ul className="space-y-2">
            <li>
              <Link to="/" className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600">
                <BarChart3 className="h-5 w-5 mr-3" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/rides" className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600">
                <MapPin className="h-5 w-5 mr-3" />
                {translations[language as Language].common.findRides}
              </Link>
            </li>
            <li>
              <Link to="/bus-routes" className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600">
                <Bus className="h-5 w-5 mr-3" />
                EV Bus Routes
              </Link>
            </li>
            <li>
              <Link to="/charging-stations" className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600">
                <Battery className="h-5 w-5 mr-3" />
                {translations[language as Language].common.chargingStations}
              </Link>
            </li>
            <li>
              <Link to="/rewards" className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600">
                <Zap className="h-5 w-5 mr-3" />
                {translations[language as Language].common.greenRewards}
              </Link>
            </li>
            <li>
              <Link to="/profile" className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600">
                <User className="h-5 w-5 mr-3" />
                {translations[language as Language].common.profile}
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-0 left-0 w-full p-4 border-t border-gray-100">
          <div className="space-y-2">
            <Link to="/support" className="flex items-center px-2 py-2 text-gray-600 hover:text-green-600">
              <Phone className="h-5 w-5 mr-2" />
              <span className="text-sm">{translations[language as Language].common.support}</span>
            </Link>
            <Link to="/help" className="flex items-center px-2 py-2 text-gray-600 hover:text-green-600">
              <HelpCircle className="h-5 w-5 mr-2" />
              <span className="text-sm">{translations[language as Language].common.help}</span>
            </Link>
          </div>
        </div>
      </aside>

      <main className="ml-64 p-8">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="h-6 w-6 text-gray-600" />
            </button>
            <div className="ml-4 flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-600" />
              <select 
                className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {userLocation && (
                  <option value={userLocation.city}>{userLocation.city} (Current Location)</option>
                )}
                <option value="Delhi NCR">Delhi NCR</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Bangalore">Bangalore</option>
                <option value="Kolkata">Kolkata</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Chennai">Chennai</option>
                <option value="Pune">Pune</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-700">1250 Green Points</span>
            </div>
            <select 
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1.5 text-sm text-gray-600"
              value={language}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="bn">বাংলা</option>
            </select>
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-sm font-medium text-gray-700">{user?.email}</span>
                <span className="text-xs text-gray-500">Green Rider</span>
              </div>
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={handleLogout}
              >
                <LogOut className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;
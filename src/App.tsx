import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import FindRides from './pages/FindRides';
import ChargingStations from './pages/ChargingStations';
import GreenRewards from './pages/GreenRewards';
import Profile from './pages/Profile';
import Support from './pages/Support';
import HelpCenter from './pages/HelpCenter';
import Login from './pages/Login';
import Signup from './pages/Signup';
import VerifyEmail from './pages/VerifyEmail';
import BusRoutes from './pages/BusRoutes';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="rides" element={<FindRides />} />
        <Route path="bus-routes" element={<BusRoutes />} />
        <Route path="charging-stations" element={<ChargingStations />} />
        <Route path="rewards" element={<GreenRewards />} />
        <Route path="profile" element={<Profile />} />
        <Route path="support" element={<Support />} />
        <Route path="help" element={<HelpCenter />} />
      </Route>
    </Routes>
  );
}

export default App;
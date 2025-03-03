import React from 'react';
import { User, Mail, Phone, MapPin, Shield, Car } from 'lucide-react';

function Profile() {
  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Your Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account and preferences</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                <User className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="mt-4 text-xl font-semibold text-gray-800">John Doe</h2>
              <p className="text-gray-500">Member since Jan 2024</p>
              <div className="mt-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-green-700">1250 Green Points</span>
              </div>
              <button className="mt-6 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="text-gray-800">john.doe@example.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-800">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <MapPin className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="text-gray-800">Gurgaon, Haryana</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Verification Status</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Shield className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-gray-800">Identity Verified</p>
                  <p className="text-sm text-gray-500">Aadhar Card verified on Jan 15, 2024</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Car className="h-5 w-5 text-green-500" />
                <div>
                  <p className="text-gray-800">Driver's License Verified</p>
                  <p className="text-sm text-gray-500">License verified on Jan 16, 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Preferences</h3>
            <div className="space-y-4">
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-gray-700">Receive email notifications</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-gray-700">Receive SMS alerts</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-green-600 focus:ring-green-500" />
                  <span className="ml-2 text-gray-700">Share ride history</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
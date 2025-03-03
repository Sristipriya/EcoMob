import React from 'react';
import { Gift, Award, Zap } from 'lucide-react';

function GreenRewards() {
  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Green Rewards</h1>
        <p className="text-gray-600 mt-2">Earn rewards for choosing eco-friendly transportation</p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Your Green Points</h2>
            <p className="text-gray-600 mt-1">Keep earning points for exclusive rewards</p>
          </div>
          <div className="bg-green-50 p-4 rounded-full">
            <span className="text-2xl font-bold text-green-600">1,250</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Zap className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">CO2 Saved</h3>
              <p className="text-2xl font-bold text-gray-800">280 kg</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Award className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Current Level</h3>
              <p className="text-2xl font-bold text-gray-800">Silver</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-yellow-50 p-3 rounded-lg">
              <Gift className="h-6 w-6 text-yellow-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Rewards Available</h3>
              <p className="text-2xl font-bold text-gray-800">8</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-800">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: 'Free Charging Session',
              points: 500,
              description: '30 minutes free charging at any station',
              color: 'green'
            },
            {
              title: '₹200 Ride Discount',
              points: 750,
              description: 'Get ₹200 off on your next ride',
              color: 'blue'
            },
            {
              title: 'Premium Member Status',
              points: 2000,
              description: 'Unlock premium benefits for 1 month',
              color: 'purple'
            }
          ].map((reward, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-100">
              <div className={`bg-${reward.color}-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                <Gift className={`h-6 w-6 text-${reward.color}-500`} />
              </div>
              <h3 className="font-semibold text-gray-800">{reward.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{reward.description}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600">{reward.points} points</span>
                <button className="bg-green-600 text-white px-4 py-1.5 rounded-lg text-sm hover:bg-green-700 transition-colors">
                  Redeem
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GreenRewards;
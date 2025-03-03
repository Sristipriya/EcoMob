import React from 'react';
import { Book, FileText, MessageCircle, HelpCircle } from 'lucide-react';

function HelpCenter() {
  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">Help Center</h1>
        <p className="text-gray-600 mt-2">Find answers to your questions</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-50 p-4 rounded-lg mb-4">
              <Book className="h-8 w-8 text-blue-500" />
            </div>
            <h3 className="font-semibold text-gray-800">User Guide</h3>
            <p className="text-sm text-gray-500 mt-2">Learn how to use our platform</p>
            <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              View Guide
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-50 p-4 rounded-lg mb-4">
              <FileText className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="font-semibold text-gray-800">Documentation</h3>
            <p className="text-sm text-gray-500 mt-2">Detailed platform documentation</p>
            <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Read Docs
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-50 p-4 rounded-lg mb-4">
              <MessageCircle className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="font-semibold text-gray-800">Community</h3>
            <p className="text-sm text-gray-500 mt-2">Join our community forum</p>
            <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors">
              Join Forum
            </button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex flex-col items-center text-center">
            <div className="bg-yellow-50 p-4 rounded-lg mb-4">
              <HelpCircle className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="font-semibold text-gray-800">FAQ</h3>
            <p className="text-sm text-gray-500 mt-2">Frequently asked questions</p>
            <button className="mt-4 w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
              View FAQs
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Popular Topics</h2>
          <div className="space-y-4">
            {[
              'How to book a ride',
              'Finding charging stations',
              'Payment methods',
              'Cancellation policy',
              'Safety guidelines',
              'Green rewards program'
            ].map((topic, index) => (
              <button
                key={index}
                className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 text-gray-700 transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Video Tutorials</h2>
          <div className="space-y-4">
            {[
              'Getting Started Guide',
              'Booking Your First Ride',
              'Using the Charging Network',
              'Understanding Green Points',
              'Safety Features Overview',
              'Payment and Wallet Guide'
            ].map((video, index) => (
              <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-50 cursor-pointer">
                <div className="bg-red-50 p-2 rounded-lg">
                  <div className="w-8 h-8 bg-red-500 rounded-lg"></div>
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{video}</h3>
                  <p className="text-sm text-gray-500">3:45 mins</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpCenter;
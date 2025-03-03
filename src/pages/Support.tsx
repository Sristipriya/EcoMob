import React, { useState } from 'react';
import { MessageCircle, Phone, Mail } from 'lucide-react';

function Support() {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add support ticket submission logic here
  };

  return (
    <div className="space-y-8">
      <div className="bg-green-50 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-gray-800">24x7 Support</h1>
        <p className="text-gray-600 mt-2">We're here to help you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Phone className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Call Us</h3>
              <p className="text-gray-600">1800-123-4567</p>
              <p className="text-sm text-gray-500">24/7 Toll Free</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <MessageCircle className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">WhatsApp</h3>
              <p className="text-gray-600">+91 98765-43210</p>
              <p className="text-sm text-gray-500">Quick Response</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-100">
          <div className="flex items-center gap-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Mail className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">Email</h3>
              <p className="text-gray-600">support@chargeride.in</p>
              <p className="text-sm text-gray-500">24h Response</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Send us a message</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-gray-200 p-2.5"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">FAQs</h2>
        <div className="space-y-4">
          {[
            {
              question: 'How do I book a ride?',
              answer: 'You can book a ride through our app by selecting your pickup and drop location, choosing your preferred vehicle, and confirming the booking.'
            },
            {
              question: 'What payment methods are accepted?',
              answer: 'We accept all major payment methods including UPI, credit/debit cards, and net banking.'
            },
            {
              question: 'How do I cancel a booking?',
              answer: 'You can cancel your booking through the app up to 30 minutes before the scheduled time without any charges.'
            }
          ].map((faq, index) => (
            <div key={index} className="p-4 rounded-lg bg-gray-50">
              <h3 className="font-semibold text-gray-800">{faq.question}</h3>
              <p className="mt-2 text-gray-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Support;
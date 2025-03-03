/*
  # Add sample data for Charge & Ride

  1. Sample Data
    - Charging stations in Kolkata
    - Available rides
    - Rewards
*/

-- Sample charging stations in Kolkata
INSERT INTO charging_stations (location, price, power_output, connector_type, amenities, safety_features, operating_hours)
VALUES 
(
  '{"address": "Salt Lake Sector V", "city": "Kolkata", "state": "West Bengal", "pincode": "700091", "latitude": 22.5697, "longitude": 88.4309}',
  12.50,
  50.0,
  'Type 2',
  ARRAY['Parking', 'Waiting Area', 'Cafe'],
  ARRAY['24x7 Security', 'CCTV', 'Emergency Help'],
  '{"open": "00:00", "close": "23:59"}'
),
(
  '{"address": "Park Street", "city": "Kolkata", "state": "West Bengal", "pincode": "700016", "latitude": 22.5551, "longitude": 88.3518}',
  15.00,
  75.0,
  'CCS2',
  ARRAY['Premium Lounge', 'WiFi', 'Restaurant'],
  ARRAY['24x7 Security', 'CCTV', 'Fire Safety'],
  '{"open": "06:00", "close": "22:00"}'
),
(
  '{"address": "New Town", "city": "Kolkata", "state": "West Bengal", "pincode": "700156", "latitude": 22.5801, "longitude": 88.4740}',
  10.00,
  30.0,
  'Type 2',
  ARRAY['Parking', 'Basic Amenities'],
  ARRAY['CCTV', 'Emergency Contact'],
  '{"open": "06:00", "close": "23:00"}'
);

-- Sample rewards
INSERT INTO rewards (title, description, points_required, reward_type)
VALUES 
('Free 30min Charging', '30 minutes of free charging at any station', 500, 'charging'),
('₹200 Ride Discount', 'Get ₹200 off on your next ride', 750, 'ride'),
('Premium Membership', 'One month of premium benefits', 2000, 'membership'),
('Green Champion Badge', 'Exclusive profile badge for eco-warriors', 1000, 'badge'),
('Weekend Ride Pass', 'Unlimited rides for one weekend', 3000, 'ride');

-- Sample rides
INSERT INTO rides (start_location, end_location, price, status, vehicle_details)
VALUES 
(
  '{"address": "Salt Lake", "city": "Kolkata", "state": "West Bengal", "pincode": "700091"}',
  '{"address": "Park Street", "city": "Kolkata", "state": "West Bengal", "pincode": "700016"}',
  350.00,
  'available',
  '{"model": "Tata Nexon EV", "make": "Tata", "year": 2024, "range": 250, "currentCharge": 85}'
),
(
  '{"address": "New Town", "city": "Kolkata", "state": "West Bengal", "pincode": "700156"}',
  '{"address": "Howrah", "city": "Kolkata", "state": "West Bengal", "pincode": "711101"}',
  450.00,
  'available',
  '{"model": "MG ZS EV", "make": "MG", "year": 2024, "range": 300, "currentCharge": 90}'
);
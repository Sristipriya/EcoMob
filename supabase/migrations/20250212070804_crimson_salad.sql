/*
  # Initial Schema Setup for Charge & Ride

  1. New Tables
    - users
      - Custom user data and preferences
    - rides
      - Ride bookings and history
    - charging_stations
      - EV charging station information
    - bookings
      - Charging station bookings
    - rewards
      - User rewards and points tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  name text,
  phone text,
  role text DEFAULT 'rider',
  green_points integer DEFAULT 0,
  preferred_language text DEFAULT 'en',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  PRIMARY KEY (id)
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Rides Table
CREATE TABLE IF NOT EXISTS rides (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  driver_id uuid REFERENCES users(id),
  rider_id uuid REFERENCES users(id),
  start_location jsonb NOT NULL,
  end_location jsonb NOT NULL,
  start_time timestamptz,
  status text DEFAULT 'available',
  price numeric(10,2),
  vehicle_details jsonb,
  payment_method text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rides ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read available rides"
  ON rides
  FOR SELECT
  TO authenticated
  USING (status = 'available' OR driver_id = auth.uid() OR rider_id = auth.uid());

CREATE POLICY "Users can create rides"
  ON rides
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Charging Stations Table
CREATE TABLE IF NOT EXISTS charging_stations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  host_id uuid REFERENCES users(id),
  location jsonb NOT NULL,
  price numeric(10,2),
  availability text DEFAULT 'available',
  power_output numeric(10,2),
  connector_type text,
  amenities text[],
  safety_features text[],
  operating_hours jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE charging_stations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read charging stations"
  ON charging_stations
  FOR SELECT
  TO authenticated
  USING (true);

-- Bookings Table
CREATE TABLE IF NOT EXISTS bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES users(id),
  station_id uuid REFERENCES charging_stations(id),
  start_time timestamptz,
  end_time timestamptz,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON bookings
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create bookings"
  ON bookings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Rewards Table
CREATE TABLE IF NOT EXISTS rewards (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  points_required integer,
  reward_type text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE rewards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read rewards"
  ON rewards
  FOR SELECT
  TO authenticated
  USING (true);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_rides_updated_at
  BEFORE UPDATE ON rides
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_charging_stations_updated_at
  BEFORE UPDATE ON charging_stations
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();
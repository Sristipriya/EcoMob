export interface User {
  id: string;
  name: string;
  email: string;
  phone: string; // Added phone number as it's commonly used in India
  role: 'rider' | 'driver' | 'host' | 'admin';
  profileImage?: string;
  greenPoints: number;
  preferredLanguage?: 'en' | 'hi' | 'bn' | 'te' | 'ta' | 'mr'; // Common Indian languages
}

export interface Ride {
  id: string;
  driverId: string;
  riderId?: string;
  startLocation: Location;
  endLocation: Location;
  startTime: Date;
  status: 'available' | 'booked' | 'in-progress' | 'completed';
  price: number; // In INR
  vehicleDetails: VehicleDetails;
  paymentMethod: 'upi' | 'cash' | 'card'; // Indian payment methods
}

export interface Location {
  latitude: number;
  longitude: number;
  address: string;
  city: string;
  state: string;
  pincode: string; // Indian postal code
  landmark?: string; // Common in Indian addresses
}

export interface VehicleDetails {
  model: string;
  make: string;
  year: number;
  licensePlate: string; // Indian format
  range: number;
  currentCharge: number;
  rcNumber: string; // Registration Certificate number
  insuranceValid: boolean;
  evType: 'two-wheeler' | 'three-wheeler' | 'four-wheeler'; // Common Indian EV types
}

export interface ChargingStation {
  id: string;
  hostId: string;
  location: Location;
  price: number; // Price per kWh in INR
  availability: 'available' | 'occupied';
  powerOutput: number;
  connectorType: string;
  amenities: string[]; // Like parking, waiting area, refreshments
  safetyFeatures: string[]; // Important for Indian context
  operatingHours: {
    open: string;
    close: string;
  };
}
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          name: string | null
          phone: string | null
          role: string
          green_points: number
          preferred_language: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name?: string | null
          phone?: string | null
          role?: string
          green_points?: number
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string | null
          phone?: string | null
          role?: string
          green_points?: number
          preferred_language?: string
          created_at?: string
          updated_at?: string
        }
      }
      rides: {
        Row: {
          id: string
          driver_id: string | null
          rider_id: string | null
          start_location: Json
          end_location: Json
          start_time: string | null
          status: string
          price: number | null
          vehicle_details: Json | null
          payment_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          driver_id?: string | null
          rider_id?: string | null
          start_location: Json
          end_location: Json
          start_time?: string | null
          status?: string
          price?: number | null
          vehicle_details?: Json | null
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          driver_id?: string | null
          rider_id?: string | null
          start_location?: Json
          end_location?: Json
          start_time?: string | null
          status?: string
          price?: number | null
          vehicle_details?: Json | null
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      charging_stations: {
        Row: {
          id: string
          host_id: string | null
          location: Json
          price: number | null
          availability: string
          power_output: number | null
          connector_type: string | null
          amenities: string[] | null
          safety_features: string[] | null
          operating_hours: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          host_id?: string | null
          location: Json
          price?: number | null
          availability?: string
          power_output?: number | null
          connector_type?: string | null
          amenities?: string[] | null
          safety_features?: string[] | null
          operating_hours?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          host_id?: string | null
          location?: Json
          price?: number | null
          availability?: string
          power_output?: number | null
          connector_type?: string | null
          amenities?: string[] | null
          safety_features?: string[] | null
          operating_hours?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      rewards: {
        Row: {
          id: string
          title: string
          description: string | null
          points_required: number | null
          reward_type: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          points_required?: number | null
          reward_type?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          points_required?: number | null
          reward_type?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
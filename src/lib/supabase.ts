import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface InterstellarObject {
  id: string;
  name: string;
  common_name: string | null;
  discovery_date: string | null;
  discovery_location: string | null;
  object_type: string | null;
  origin_system: string | null;
  current_distance_au: number | null;
  closest_approach_date: string | null;
  closest_approach_distance_au: number | null;
  velocity_km_s: number | null;
  eccentricity: number | null;
  inclination_degrees: number | null;
  size_estimate_meters: string | null;
  composition: string | null;
  cometary_activity: boolean;
  artificial_probability: string | null;
  life_signs_detected: boolean;
  status: string;
  threat_level: string;
  description: string | null;
  key_findings: string[];
  trajectory_data: any;
  created_at: string;
  updated_at: string;
}

export interface DefenseStrategy {
  id: string;
  strategy_name: string;
  category: string;
  description: string | null;
  effectiveness: string | null;
  readiness_level: string | null;
  lead_time_required: string | null;
  applicable_scenarios: string[];
  technologies_involved: string[];
  estimated_cost: string | null;
  success_probability: string | null;
  limitations: string | null;
  created_at: string;
}

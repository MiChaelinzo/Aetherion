-- Interstellar Objects Tracking System
-- This migration creates tables for tracking interstellar objects and planetary defense strategies

-- Create interstellar_objects table
CREATE TABLE IF NOT EXISTS interstellar_objects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  common_name text,
  discovery_date date,
  discovery_location text,
  object_type text,
  origin_system text,
  current_distance_au numeric,
  closest_approach_date date,
  closest_approach_distance_au numeric,
  velocity_km_s numeric,
  eccentricity numeric,
  inclination_degrees numeric,
  size_estimate_meters text,
  composition text,
  cometary_activity boolean DEFAULT false,
  artificial_probability text,
  life_signs_detected boolean DEFAULT false,
  status text DEFAULT 'monitoring',
  threat_level text DEFAULT 'none',
  description text,
  key_findings jsonb DEFAULT '[]'::jsonb,
  trajectory_data jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create planetary_defense_strategies table
CREATE TABLE IF NOT EXISTS planetary_defense_strategies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  strategy_name text NOT NULL,
  category text NOT NULL,
  description text,
  effectiveness text,
  readiness_level text,
  lead_time_required text,
  applicable_scenarios jsonb DEFAULT '[]'::jsonb,
  technologies_involved jsonb DEFAULT '[]'::jsonb,
  estimated_cost text,
  success_probability text,
  limitations text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE interstellar_objects ENABLE ROW LEVEL SECURITY;
ALTER TABLE planetary_defense_strategies ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (educational data)
CREATE POLICY "Public can view interstellar objects"
  ON interstellar_objects FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view defense strategies"
  ON planetary_defense_strategies FOR SELECT
  TO anon
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_interstellar_objects_status ON interstellar_objects(status);
CREATE INDEX IF NOT EXISTS idx_interstellar_objects_threat_level ON interstellar_objects(threat_level);
CREATE INDEX IF NOT EXISTS idx_defense_strategies_category ON planetary_defense_strategies(category);
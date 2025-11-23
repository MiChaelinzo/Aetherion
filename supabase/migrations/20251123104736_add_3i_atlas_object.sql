/*
  # Add 3I Atlas (Astrophysical Transient Localization Alert System)
  
  Adding the third confirmed interstellar object candidate discovered by ATLAS.
*/

INSERT INTO interstellar_objects (name, common_name, discovery_date, discovery_location, object_type, origin_system, current_distance_au, closest_approach_date, closest_approach_distance_au, velocity_km_s, eccentricity, inclination_degrees, size_estimate_meters, composition, cometary_activity, artificial_probability, life_signs_detected, status, threat_level, description, key_findings, trajectory_data) VALUES

('3I/ATLAS', 'Interstellar Object ATLAS', '2024-10-15', 'Astrophysical Transient Localization Alert System', 'Interstellar Object', 'Unknown', 8.5, '2024-11-20', 1.8, 15.2, 1.95, 89.4, '30-200', 'Unknown/Mixed', true, '3%', false, 'monitoring', 'low', 'The third confirmed interstellar object, discovered by the ATLAS survey system. Designated 3I/ATLAS, this object exhibits weak cometary activity and shows spectral signatures distinct from both Oumuamua and Borisov. Its discovery demonstrates the improving capabilities of automated detection systems.', '["Third interstellar confirmation", "ATLAS discovery", "Weak cometary activity detected", "Unique spectral signature", "Discovery rate accelerating", "Origin star system unknown"]'::jsonb, '{"semi_major_axis": -0.445, "perihelion": 1.8, "aphelion": null, "orbital_period": "hyperbolic"}'::jsonb);
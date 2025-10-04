import { X, Calendar, MapPin, Ruler, Zap, Orbit, TrendingUp, Atom, AlertTriangle, Activity, Globe, Share2 } from 'lucide-react';
import { TrajectoryVisualization } from './TrajectoryVisualization';
import type { InterstellarObject } from '../lib/supabase';

interface ObjectDetailModalProps {
  object: InterstellarObject | null;
  onClose: () => void;
}

export function ObjectDetailModal({ object, onClose }: ObjectDetailModalProps) {
  if (!object) return null;

  const handleShare = async () => {
    const shareData = {
      title: `${object.name} - Interstellar Watch`,
      text: `Check out ${object.name}, an interstellar object discovered on ${object.discovery_date}!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-6xl w-full my-8 shadow-2xl">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 rounded-t-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-cyan-500 opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <Orbit className="w-8 h-8 text-cyan-400" />
                <div>
                  <h2 className="text-3xl font-bold text-white">{object.name}</h2>
                  {object.common_name && (
                    <p className="text-cyan-300 text-lg mt-1">{object.common_name}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleShare}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
                  title="Share"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto">
          <div className="mb-8">
            <TrajectoryVisualization
              objectName={object.name}
              trajectoryData={object.trajectory_data}
              velocity={object.velocity_km_s || 0}
              eccentricity={object.eccentricity || 0}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  Overview
                </h3>
                <p className="text-gray-700 leading-relaxed">{object.description}</p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-blue-600" />
                  Discovery Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date:</span>
                    <span className="font-medium text-gray-900">{object.discovery_date || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="font-medium text-gray-900">{object.discovery_location || 'Unknown'}</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Atom className="w-4 h-4 text-purple-600" />
                  Composition & Classification
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="font-medium text-gray-900">{object.object_type || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Composition:</span>
                    <span className="font-medium text-gray-900">{object.composition || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Size Estimate:</span>
                    <span className="font-medium text-gray-900">{object.size_estimate_meters || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cometary Activity:</span>
                    <span className={`font-medium ${object.cometary_activity ? 'text-green-600' : 'text-gray-900'}`}>
                      {object.cometary_activity ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  Analysis & Probabilities
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Artificial Probability:</span>
                    <span className="font-medium text-gray-900">{object.artificial_probability || 'Not assessed'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Life Signs Detected:</span>
                    <span className={`font-medium ${object.life_signs_detected ? 'text-green-600' : 'text-gray-900'}`}>
                      {object.life_signs_detected ? 'Yes' : 'No'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Threat Level:</span>
                    <span className={`font-bold ${object.threat_level === 'high' ? 'text-red-600' : object.threat_level === 'medium' ? 'text-orange-600' : object.threat_level === 'low' ? 'text-yellow-600' : 'text-green-600'}`}>
                      {object.threat_level.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Orbit className="w-5 h-5 text-cyan-600" />
                  Trajectory & Orbital Data
                </h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-500">Velocity</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{object.velocity_km_s?.toFixed(2)} km/s</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Ruler className="w-4 h-4 text-cyan-600" />
                      <span className="text-xs font-medium text-gray-500">Distance</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{object.current_distance_au?.toFixed(2)} AU</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-purple-600" />
                      <span className="text-xs font-medium text-gray-500">Eccentricity</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{object.eccentricity?.toFixed(3)}</p>
                  </div>

                  <div className="bg-white rounded-lg p-4 shadow-sm">
                    <div className="flex items-center gap-2 mb-2">
                      <Globe className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-gray-500">Inclination</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{object.inclination_degrees?.toFixed(1)}°</p>
                  </div>
                </div>

                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between py-2 border-t border-gray-200">
                    <span className="text-gray-600">Closest Approach Date:</span>
                    <span className="font-medium text-gray-900">{object.closest_approach_date || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between py-2 border-t border-gray-200">
                    <span className="text-gray-600">Closest Approach Distance:</span>
                    <span className="font-medium text-gray-900">{object.closest_approach_distance_au?.toFixed(3)} AU</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5">
                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  Origin Information
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Origin System:</span>
                    <span className="font-medium text-gray-900">{object.origin_system || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="font-medium text-gray-900">{object.status}</span>
                  </div>
                </div>
              </div>

              {object.key_findings && object.key_findings.length > 0 && (
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Scientific Findings</h4>
                  <ul className="space-y-2">
                    {object.key_findings.map((finding, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

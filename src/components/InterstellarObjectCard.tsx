import { Orbit, TrendingUp, Atom, AlertTriangle } from 'lucide-react';
import type { InterstellarObject } from '../lib/supabase';

interface InterstellarObjectCardProps {
  object: InterstellarObject;
  onClick: () => void;
}

export function InterstellarObjectCard({ object, onClick }: InterstellarObjectCardProps) {
  const getThreatColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-orange-600 bg-orange-50';
      case 'low': return 'text-yellow-600 bg-yellow-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approaching': return 'text-blue-600 bg-blue-50';
      case 'departed': return 'text-gray-600 bg-gray-50';
      default: return 'text-cyan-600 bg-cyan-50';
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-blue-300 transform hover:-translate-y-1"
    >
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-cyan-500 opacity-10 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Orbit className="w-6 h-6 text-cyan-400" />
              <h3 className="text-xl font-bold text-white">{object.name}</h3>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getThreatColor(object.threat_level)}`}>
              {object.threat_level.toUpperCase()}
            </span>
          </div>

          {object.common_name && (
            <p className="text-cyan-300 text-sm font-medium mb-2">{object.common_name}</p>
          )}

          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(object.status)}`}>
            {object.status.toUpperCase()}
          </span>
        </div>
      </div>

      <div className="p-6 space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{object.description}</p>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-medium text-gray-500">Velocity</span>
            </div>
            <p className="text-sm font-bold text-gray-900">{object.velocity_km_s?.toFixed(1)} km/s</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-1">
              <Orbit className="w-4 h-4 text-cyan-600" />
              <span className="text-xs font-medium text-gray-500">Distance</span>
            </div>
            <p className="text-sm font-bold text-gray-900">{object.current_distance_au?.toFixed(2)} AU</p>
          </div>
        </div>

        <div className="pt-3 border-t border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <Atom className="w-4 h-4 text-purple-600" />
            <span className="text-xs font-semibold text-gray-700">Type: {object.object_type}</span>
          </div>

          {object.artificial_probability && (
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
              <span>Artificial probability: {object.artificial_probability}</span>
            </div>
          )}
        </div>

        <button className="w-full mt-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-4 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 font-medium text-sm">
          View Full Details
        </button>
      </div>
    </div>
  );
}

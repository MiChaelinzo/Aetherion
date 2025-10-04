import { BarChart3, TrendingUp, Globe, Activity } from 'lucide-react';
import type { InterstellarObject } from '../lib/supabase';

interface StatisticsDashboardProps {
  objects: InterstellarObject[];
}

export function StatisticsDashboard({ objects }: StatisticsDashboardProps) {
  const totalObjects = objects.length;
  const departedObjects = objects.filter(obj => obj.status === 'departed').length;
  const monitoringObjects = objects.filter(obj => obj.status === 'monitoring').length;
  const cometaryObjects = objects.filter(obj => obj.cometary_activity).length;

  const avgVelocity = objects.reduce((sum, obj) => sum + (obj.velocity_km_s || 0), 0) / totalObjects || 0;
  const avgDistance = objects.reduce((sum, obj) => sum + (obj.current_distance_au || 0), 0) / totalObjects || 0;
  const avgEccentricity = objects.reduce((sum, obj) => sum + (obj.eccentricity || 0), 0) / totalObjects || 0;

  const velocityData = objects.map(obj => ({
    name: obj.name,
    value: obj.velocity_km_s || 0
  })).sort((a, b) => b.value - a.value);

  const maxVelocity = Math.max(...velocityData.map(d => d.value));

  const threatLevels = {
    none: objects.filter(obj => obj.threat_level === 'none').length,
    low: objects.filter(obj => obj.threat_level === 'low').length,
    medium: objects.filter(obj => obj.threat_level === 'medium').length,
    high: objects.filter(obj => obj.threat_level === 'high').length,
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Globe className="w-8 h-8 opacity-80" />
            <BarChart3 className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{totalObjects}</h3>
          <p className="text-blue-100">Total Objects Detected</p>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 opacity-80" />
            <BarChart3 className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{monitoringObjects}</h3>
          <p className="text-green-100">Under Monitoring</p>
        </div>

        <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-8 h-8 opacity-80" />
            <BarChart3 className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{avgVelocity.toFixed(1)}</h3>
          <p className="text-purple-100">Average Velocity (km/s)</p>
        </div>

        <div className="bg-gradient-to-br from-orange-600 to-red-600 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <Activity className="w-8 h-8 opacity-80" />
            <BarChart3 className="w-6 h-6 opacity-60" />
          </div>
          <h3 className="text-3xl font-bold mb-1">{cometaryObjects}</h3>
          <p className="text-orange-100">With Cometary Activity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-blue-600" />
            Velocity Comparison
          </h3>
          <div className="space-y-4">
            {velocityData.map((item, idx) => (
              <div key={idx}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  <span className="text-sm font-bold text-gray-900">{item.value.toFixed(2)} km/s</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 h-full rounded-full transition-all duration-500"
                    style={{ width: `${(item.value / maxVelocity) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Activity className="w-5 h-5 text-purple-600" />
            Threat Level Distribution
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">No Threat</span>
                <span className="text-sm font-bold text-green-600">{threatLevels.none} objects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-green-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(threatLevels.none / totalObjects) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Low Threat</span>
                <span className="text-sm font-bold text-yellow-600">{threatLevels.low} objects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-yellow-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(threatLevels.low / totalObjects) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Medium Threat</span>
                <span className="text-sm font-bold text-orange-600">{threatLevels.medium} objects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-orange-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(threatLevels.medium / totalObjects) * 100}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">High Threat</span>
                <span className="text-sm font-bold text-red-600">{threatLevels.high} objects</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-red-600 h-full rounded-full transition-all duration-500"
                  style={{ width: `${(threatLevels.high / totalObjects) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Average Distance from Sun</h4>
          <p className="text-3xl font-bold text-gray-900">{avgDistance.toFixed(2)} AU</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Average Eccentricity</h4>
          <p className="text-3xl font-bold text-gray-900">{avgEccentricity.toFixed(3)}</p>
        </div>
        <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-xl p-6 border border-gray-200">
          <h4 className="text-sm font-medium text-gray-600 mb-2">Departed Objects</h4>
          <p className="text-3xl font-bold text-gray-900">{departedObjects}</p>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Key Insights</h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">
              All detected interstellar objects have hyperbolic orbits (eccentricity &gt; 1), confirming their extrasolar origin.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">
              Average velocity of {avgVelocity.toFixed(1)} km/s indicates these objects are moving significantly faster than typical solar system bodies.
            </span>
          </li>
          <li className="flex items-start gap-3">
            <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></span>
            <span className="text-gray-700">
              {cometaryObjects > 0 ? `${cometaryObjects} object(s) show cometary activity` : 'No objects currently show cometary activity'}, providing insights into volatile composition.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

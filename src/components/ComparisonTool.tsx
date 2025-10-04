import { useState } from 'react';
import { X, GitCompare, TrendingUp, Ruler, Zap, Globe } from 'lucide-react';
import type { InterstellarObject } from '../lib/supabase';

interface ComparisonToolProps {
  objects: InterstellarObject[];
  onClose: () => void;
}

export function ComparisonTool({ objects, onClose }: ComparisonToolProps) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(sid => sid !== id));
    } else if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const selectedObjects = objects.filter(obj => selectedIds.includes(obj.id));

  const comparisonFields = [
    { label: 'Velocity', key: 'velocity_km_s', unit: 'km/s', icon: TrendingUp, color: 'text-blue-600' },
    { label: 'Distance', key: 'current_distance_au', unit: 'AU', icon: Ruler, color: 'text-cyan-600' },
    { label: 'Eccentricity', key: 'eccentricity', unit: '', icon: Zap, color: 'text-purple-600' },
    { label: 'Inclination', key: 'inclination_degrees', unit: '°', icon: Globe, color: 'text-green-600' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-7xl w-full my-8 shadow-2xl">
        <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 p-8 rounded-t-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500 opacity-10 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <GitCompare className="w-8 h-8 text-cyan-400" />
                <div>
                  <h2 className="text-3xl font-bold text-white">Object Comparison</h2>
                  <p className="text-cyan-200 text-sm mt-1">Select up to 3 objects to compare</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        <div className="p-8 max-h-[70vh] overflow-y-auto">
          {selectedIds.length === 0 && (
            <div className="mb-8 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
              <GitCompare className="w-12 h-12 text-blue-600 mx-auto mb-3" />
              <p className="text-blue-900 font-medium">Select objects below to start comparing</p>
            </div>
          )}

          {selectedObjects.length > 0 && (
            <div className="mb-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {selectedObjects.map((obj) => (
                  <div key={obj.id} className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl p-6 text-white relative">
                    <button
                      onClick={() => toggleSelection(obj.id)}
                      className="absolute top-3 right-3 bg-red-600 hover:bg-red-700 p-1.5 rounded-lg transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <h3 className="text-xl font-bold mb-2">{obj.name}</h3>
                    {obj.common_name && (
                      <p className="text-cyan-300 text-sm mb-4">{obj.common_name}</p>
                    )}
                    <div className="space-y-2 text-sm">
                      <p><span className="text-gray-400">Type:</span> {obj.object_type}</p>
                      <p><span className="text-gray-400">Discovery:</span> {obj.discovery_date}</p>
                      <p><span className="text-gray-400">Status:</span> {obj.status}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-slate-900 text-white">
                    <tr>
                      <th className="text-left p-4 font-semibold">Property</th>
                      {selectedObjects.map((obj) => (
                        <th key={obj.id} className="text-left p-4 font-semibold">{obj.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFields.map((field, idx) => {
                      const Icon = field.icon;
                      return (
                        <tr key={field.key} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                          <td className="p-4 font-medium text-gray-900">
                            <div className="flex items-center gap-2">
                              <Icon className={`w-4 h-4 ${field.color}`} />
                              {field.label}
                            </div>
                          </td>
                          {selectedObjects.map((obj) => (
                            <td key={obj.id} className="p-4 text-gray-700">
                              {obj[field.key as keyof InterstellarObject] !== null
                                ? `${(obj[field.key as keyof InterstellarObject] as number).toFixed(2)} ${field.unit}`
                                : 'N/A'}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                    <tr className="bg-white">
                      <td className="p-4 font-medium text-gray-900">Size Estimate</td>
                      {selectedObjects.map((obj) => (
                        <td key={obj.id} className="p-4 text-gray-700">
                          {obj.size_estimate_meters || 'Unknown'}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Composition</td>
                      {selectedObjects.map((obj) => (
                        <td key={obj.id} className="p-4 text-gray-700">
                          {obj.composition || 'Unknown'}
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-white">
                      <td className="p-4 font-medium text-gray-900">Cometary Activity</td>
                      {selectedObjects.map((obj) => (
                        <td key={obj.id} className="p-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            obj.cometary_activity ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                          }`}>
                            {obj.cometary_activity ? 'Yes' : 'No'}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="p-4 font-medium text-gray-900">Threat Level</td>
                      {selectedObjects.map((obj) => (
                        <td key={obj.id} className="p-4">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            obj.threat_level === 'high' ? 'bg-red-100 text-red-700' :
                            obj.threat_level === 'medium' ? 'bg-orange-100 text-orange-700' :
                            obj.threat_level === 'low' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {obj.threat_level.toUpperCase()}
                          </span>
                        </td>
                      ))}
                    </tr>
                    <tr className="bg-white">
                      <td className="p-4 font-medium text-gray-900">Origin System</td>
                      {selectedObjects.map((obj) => (
                        <td key={obj.id} className="p-4 text-gray-700">
                          {obj.origin_system || 'Unknown'}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Select Objects to Compare</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {objects.map((obj) => (
                <button
                  key={obj.id}
                  onClick={() => toggleSelection(obj.id)}
                  disabled={selectedIds.length >= 3 && !selectedIds.includes(obj.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedIds.includes(obj.id)
                      ? 'border-blue-600 bg-blue-50'
                      : selectedIds.length >= 3
                      ? 'border-gray-200 bg-gray-100 opacity-50 cursor-not-allowed'
                      : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50'
                  }`}
                >
                  <h4 className="font-bold text-gray-900 mb-1">{obj.name}</h4>
                  {obj.common_name && (
                    <p className="text-sm text-gray-600 mb-2">{obj.common_name}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{obj.object_type}</span>
                    <span>•</span>
                    <span>{obj.discovery_date}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

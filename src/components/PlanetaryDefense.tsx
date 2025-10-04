import { Shield, Radar, Rocket, Users, AlertTriangle, CheckCircle, Clock, DollarSign } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase, type DefenseStrategy } from '../lib/supabase';

export function PlanetaryDefense() {
  const [strategies, setStrategies] = useState<DefenseStrategy[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchStrategies();
  }, []);

  const fetchStrategies = async () => {
    try {
      const { data, error } = await supabase
        .from('planetary_defense_strategies')
        .select('*')
        .order('category', { ascending: true });

      if (error) throw error;
      setStrategies(data || []);
    } catch (error) {
      console.error('Error fetching strategies:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(strategies.map(s => s.category))];
  const filteredStrategies = selectedCategory === 'all'
    ? strategies
    : strategies.filter(s => s.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'detection': return <Radar className="w-5 h-5" />;
      case 'deflection': return <Rocket className="w-5 h-5" />;
      case 'evacuation': return <Users className="w-5 h-5" />;
      case 'mitigation': return <Shield className="w-5 h-5" />;
      default: return <AlertTriangle className="w-5 h-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'detection': return 'from-blue-600 to-cyan-600';
      case 'deflection': return 'from-purple-600 to-pink-600';
      case 'evacuation': return 'from-orange-600 to-red-600';
      case 'mitigation': return 'from-green-600 to-emerald-600';
      default: return 'from-gray-600 to-slate-600';
    }
  };

  const getReadinessColor = (level: string) => {
    switch (level?.toLowerCase()) {
      case 'operational': return 'text-green-700 bg-green-100';
      case 'testing': return 'text-blue-700 bg-blue-100';
      case 'theoretical': return 'text-gray-700 bg-gray-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Shield className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Planetary Defense</h1>
          </div>
          <p className="text-xl text-red-100 max-w-3xl">
            Comprehensive strategies and technologies to protect Earth from interstellar and near-Earth objects.
            Understanding our defense capabilities is crucial for planetary safety.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Understanding Planetary Defense</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Planetary defense encompasses the strategies, technologies, and protocols designed to detect, track,
            and potentially deflect or mitigate threats from interstellar objects and near-Earth objects (NEOs).
            While the probability of a catastrophic impact is low, the potential consequences make preparedness essential.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Defense strategies are categorized into detection systems that identify threats early, deflection
            technologies that can alter an object's trajectory, evacuation protocols for at-risk populations,
            and mitigation measures to minimize impact consequences.
          </p>
        </div>

        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredStrategies.map((strategy) => (
            <div
              key={strategy.id}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
            >
              <div className={`bg-gradient-to-r ${getCategoryColor(strategy.category)} p-6 text-white`}>
                <div className="flex items-center gap-3 mb-2">
                  {getCategoryIcon(strategy.category)}
                  <h3 className="text-2xl font-bold">{strategy.strategy_name}</h3>
                </div>
                <span className="inline-block px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                  {strategy.category}
                </span>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-gray-700 leading-relaxed">{strategy.description}</p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-gray-500">Effectiveness</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{strategy.effectiveness || 'Varies'}</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-blue-600" />
                      <span className="text-xs font-medium text-gray-500">Lead Time</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900">{strategy.lead_time_required || 'N/A'}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getReadinessColor(strategy.readiness_level || '')}`}>
                      {strategy.readiness_level?.toUpperCase() || 'UNKNOWN'}
                    </span>
                  </div>

                  {strategy.success_probability && (
                    <div className="flex items-start gap-2 text-sm">
                      <span className="font-medium text-gray-700">Success Rate:</span>
                      <span className="text-gray-600">{strategy.success_probability}</span>
                    </div>
                  )}

                  {strategy.estimated_cost && (
                    <div className="flex items-start gap-2 text-sm">
                      <DollarSign className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-700">Estimated Cost: </span>
                        <span className="text-gray-600">{strategy.estimated_cost}</span>
                      </div>
                    </div>
                  )}

                  {strategy.applicable_scenarios && strategy.applicable_scenarios.length > 0 && (
                    <div>
                      <span className="font-medium text-gray-700 text-sm block mb-2">Applicable Scenarios:</span>
                      <div className="flex flex-wrap gap-2">
                        {strategy.applicable_scenarios.map((scenario, idx) => (
                          <span key={idx} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-xs">
                            {scenario}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {strategy.technologies_involved && strategy.technologies_involved.length > 0 && (
                    <div>
                      <span className="font-medium text-gray-700 text-sm block mb-2">Technologies:</span>
                      <div className="flex flex-wrap gap-2">
                        {strategy.technologies_involved.map((tech, idx) => (
                          <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {strategy.limitations && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-amber-900 text-sm block mb-1">Limitations:</span>
                          <p className="text-amber-800 text-sm">{strategy.limitations}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStrategies.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No defense strategies found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

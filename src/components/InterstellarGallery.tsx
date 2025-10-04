import { useEffect, useState } from 'react';
import { Sparkles, Search, Filter, GitCompare, BarChart3, Bookmark } from 'lucide-react';
import { supabase, type InterstellarObject } from '../lib/supabase';
import { InterstellarObjectCard } from './InterstellarObjectCard';
import { ObjectDetailModal } from './ObjectDetailModal';
import { ComparisonTool } from './ComparisonTool';
import { StatisticsDashboard } from './StatisticsDashboard';

export function InterstellarGallery() {
  const [objects, setObjects] = useState<InterstellarObject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedObject, setSelectedObject] = useState<InterstellarObject | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showComparison, setShowComparison] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    fetchObjects();
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(fav => fav !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const filteredObjects = objects.filter(obj => {
    const matchesSearch = obj.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (obj.common_name?.toLowerCase().includes(searchQuery.toLowerCase()) || false);
    const matchesFilter = filterType === 'all' ||
                         (filterType === 'favorites' && favorites.includes(obj.id)) ||
                         obj.status === filterType ||
                         obj.threat_level === filterType ||
                         (filterType === 'cometary' && obj.cometary_activity);
    return matchesSearch && matchesFilter;
  });

  const fetchObjects = async () => {
    try {
      const { data, error } = await supabase
        .from('interstellar_objects')
        .select('*')
        .order('discovery_date', { ascending: false });

      if (error) throw error;
      setObjects(data || []);
    } catch (error) {
      console.error('Error fetching objects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading interstellar data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500 opacity-10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 opacity-10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <Sparkles className="w-14 h-14 text-cyan-400" />
              <h1 className="text-6xl font-bold bg-gradient-to-r from-white to-cyan-300 bg-clip-text text-transparent">
                Interstellar Objects
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowStats(!showStats)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  showStats
                    ? 'bg-white text-blue-600'
                    : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                Stats
              </button>
              <button
                onClick={() => setShowComparison(true)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium bg-white bg-opacity-20 hover:bg-opacity-30 text-white transition-colors"
              >
                <GitCompare className="w-5 h-5" />
                Compare
              </button>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl leading-relaxed">
            Explore the mysterious visitors from beyond our solar system. These ancient travelers have journeyed
            through the cosmos for millions of years, offering unprecedented insights into the nature of the universe
            and the potential for life beyond Earth.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-5 border border-white border-opacity-20">
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">{objects.length}</h3>
              <p className="text-gray-300">Confirmed Objects</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-5 border border-white border-opacity-20">
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                {objects.filter(o => o.status === 'monitoring').length}
              </h3>
              <p className="text-gray-300">Under Monitoring</p>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-xl p-5 border border-white border-opacity-20">
              <h3 className="text-3xl font-bold text-cyan-400 mb-2">
                {objects.filter(o => o.cometary_activity).length}
              </h3>
              <p className="text-gray-300">With Cometary Activity</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {showStats ? (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-900">Statistics & Analytics</h2>
              <button
                onClick={() => setShowStats(false)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-medium text-gray-700 transition-colors"
              >
                Back to Gallery
              </button>
            </div>
            <StatisticsDashboard objects={objects} />
          </div>
        ) : objects.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-lg">
            <Sparkles className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No Objects Found</h2>
            <p className="text-gray-600">The database is currently empty. Objects will appear here once added.</p>
          </div>
        ) : (
          <div>
            <div className="mb-8 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-gray-600" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white"
                  >
                    <option value="all">All Objects</option>
                    <option value="favorites">Favorites</option>
                    <option value="monitoring">Monitoring</option>
                    <option value="departed">Departed</option>
                    <option value="cometary">Cometary Activity</option>
                    <option value="none">No Threat</option>
                    <option value="low">Low Threat</option>
                    <option value="medium">Medium Threat</option>
                    <option value="high">High Threat</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-gray-600">
                  Showing {filteredObjects.length} of {objects.length} objects
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredObjects.map((object) => (
                <div key={object.id} className="relative">
                  <button
                    onClick={() => toggleFavorite(object.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
                  >
                    <Bookmark
                      className={`w-5 h-5 ${
                        favorites.includes(object.id)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-400'
                      }`}
                    />
                  </button>
                  <InterstellarObjectCard
                    object={object}
                    onClick={() => setSelectedObject(object)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedObject && (
        <ObjectDetailModal
          object={selectedObject}
          onClose={() => setSelectedObject(null)}
        />
      )}

      {showComparison && (
        <ComparisonTool
          objects={objects}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Orbit, Shield, Menu, X, BookOpen, Newspaper, Calculator, Globe, MessageSquare } from 'lucide-react';
import { InterstellarGallery } from './components/InterstellarGallery';
import { PlanetaryDefense } from './components/PlanetaryDefense';
import { EducationalResources } from './components/EducationalResources';
import { NewsFeed } from './components/NewsFeed';
import { ImpactSimulator } from './components/ImpactSimulator';
import { SolarSystemViewer } from './components/SolarSystemViewer';
import { CommunityForum } from './components/CommunityForum';
import { supabase, type InterstellarObject } from './lib/supabase';

type Tab = 'gallery' | 'defense' | 'education' | 'news' | 'simulator' | 'viewer' | 'forum';

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('gallery');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [objects, setObjects] = useState<InterstellarObject[]>([]);

  useEffect(() => {
    fetchObjects();
  }, []);

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
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-40 backdrop-blur-lg bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Orbit className="w-8 h-8 text-cyan-400" />
              <h1 className="text-2xl font-bold text-white">Interstellar Watch</h1>
            </div>

            <div className="hidden lg:flex items-center gap-1">
              <button onClick={() => setActiveTab('gallery')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'gallery' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-slate-800'}`}><Orbit className="w-4 h-4" />Objects</button>
              <button onClick={() => setActiveTab('viewer')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'viewer' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-slate-800'}`}><Globe className="w-4 h-4" />Viewer</button>
              <button onClick={() => setActiveTab('defense')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'defense' ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-slate-800'}`}><Shield className="w-4 h-4" />Defense</button>
              <button onClick={() => setActiveTab('simulator')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'simulator' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-slate-800'}`}><Calculator className="w-4 h-4" />Simulator</button>
              <button onClick={() => setActiveTab('news')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'news' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-slate-800'}`}><Newspaper className="w-4 h-4" />News</button>
              <button onClick={() => setActiveTab('forum')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'forum' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-slate-800'}`}><MessageSquare className="w-4 h-4" />Forum</button>
              <button onClick={() => setActiveTab('education')} className={`flex items-center gap-2 px-4 py-2.5 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'education' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-slate-800'}`}><BookOpen className="w-4 h-4" />Learn</button>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-slate-800 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="lg:hidden pb-4 space-y-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setActiveTab('gallery');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'gallery'
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <Orbit className="w-5 h-5" />
                Objects
              </button>
              <button
                onClick={() => {
                  setActiveTab('defense');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${
                  activeTab === 'defense'
                    ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white'
                    : 'text-gray-300 hover:bg-slate-800'
                }`}
              >
                <Shield className="w-5 h-5" />
                Defense
              </button>
              <button onClick={() => { setActiveTab('viewer'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'viewer' ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'text-gray-300 hover:bg-slate-800'}`}><Globe className="w-5 h-5" />Viewer</button>
              <button onClick={() => { setActiveTab('simulator'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'simulator' ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' : 'text-gray-300 hover:bg-slate-800'}`}><Calculator className="w-5 h-5" />Simulator</button>
              <button onClick={() => { setActiveTab('news'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'news' ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white' : 'text-gray-300 hover:bg-slate-800'}`}><Newspaper className="w-5 h-5" />News</button>
              <button onClick={() => { setActiveTab('forum'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'forum' ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white' : 'text-gray-300 hover:bg-slate-800'}`}><MessageSquare className="w-5 h-5" />Forum</button>
              <button onClick={() => { setActiveTab('education'); setMobileMenuOpen(false); }} className={`w-full flex items-center gap-2 px-4 py-3 rounded-lg font-semibold transition-all duration-200 ${activeTab === 'education' ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white' : 'text-gray-300 hover:bg-slate-800'}`}><BookOpen className="w-5 h-5" />Learn</button>
            </div>
          )}
        </div>
      </nav>

      <main>
        {activeTab === 'gallery' && <InterstellarGallery />}
        {activeTab === 'viewer' && <SolarSystemViewer objects={objects} />}
        {activeTab === 'defense' && <PlanetaryDefense />}
        {activeTab === 'simulator' && <ImpactSimulator />}
        {activeTab === 'news' && <NewsFeed />}
        {activeTab === 'forum' && <CommunityForum />}
        {activeTab === 'education' && (
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12">
            <div className="max-w-7xl mx-auto px-4">
              <EducationalResources />
            </div>
          </div>
        )}
      </main>

      <footer className="bg-slate-900 border-t border-slate-700 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-400">
          <p className="mb-2">Interstellar Watch - Tracking Visitors from Beyond Our Solar System</p>
          <p className="text-sm">Data compiled from scientific observations and research institutions worldwide</p>
        </div>
      </footer>
    </div>
  );
}

export default App;

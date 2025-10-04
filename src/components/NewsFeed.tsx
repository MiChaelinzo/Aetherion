import { useEffect, useState } from 'react';
import { Newspaper, Clock, User, Tag, TrendingUp, Eye, ExternalLink } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  author: string;
  image_url: string | null;
  published_date: string;
  tags: string[];
  views: number;
}

export function NewsFeed() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);
  const [filterCategory, setFilterCategory] = useState('all');

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const { data, error } = await supabase
        .from('news_articles')
        .select('*')
        .order('published_date', { ascending: false });

      if (error) throw error;
      setArticles(data || []);
    } catch (error) {
      console.error('Error fetching articles:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateViews = async (id: string, currentViews: number) => {
    try {
      await supabase
        .from('news_articles')
        .update({ views: currentViews + 1 })
        .eq('id', id);
    } catch (error) {
      console.error('Error updating views:', error);
    }
  };

  const handleArticleClick = (article: NewsArticle) => {
    setSelectedArticle(article);
    updateViews(article.id, article.views);
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'discovery': return 'bg-blue-100 text-blue-700';
      case 'missions': return 'bg-purple-100 text-purple-700';
      case 'research': return 'bg-green-100 text-green-700';
      case 'technology': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredArticles = filterCategory === 'all'
    ? articles
    : articles.filter(a => a.category === filterCategory);

  const categories = ['all', ...new Set(articles.map(a => a.category))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-cyan-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Newspaper className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Interstellar News</h1>
          </div>
          <p className="text-xl text-blue-100">
            Stay updated with the latest discoveries, research, and missions related to interstellar objects
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilterCategory(category)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                filterCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
              }`}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                onClick={() => handleArticleClick(article)}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                      {article.category.toUpperCase()}
                    </span>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{article.views}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
                    {article.title}
                  </h2>

                  <p className="text-gray-700 mb-4 leading-relaxed">{article.summary}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{article.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{new Date(article.published_date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1">
                      Read More <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  {article.tags && article.tags.length > 0 && (
                    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <div className="flex flex-wrap gap-2">
                        {article.tags.map((tag, idx) => (
                          <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filteredArticles.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow">
                <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No articles found in this category.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">Trending Topics</h3>
              </div>
              <div className="space-y-3">
                {articles.slice(0, 5).map((article) => (
                  <div
                    key={article.id}
                    onClick={() => handleArticleClick(article)}
                    className="pb-3 border-b border-gray-200 last:border-0 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <h4 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">{article.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Eye className="w-3 h-3" />
                      <span>{article.views} views</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Total Articles</span>
                  <span className="font-bold text-blue-600">{articles.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">This Week</span>
                  <span className="font-bold text-blue-600">
                    {articles.filter(a => new Date(a.published_date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Categories</span>
                  <span className="font-bold text-blue-600">{categories.length - 1}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {selectedArticle && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl">
            <div className={`bg-gradient-to-r ${
              selectedArticle.category === 'discovery' ? 'from-blue-600 to-cyan-600' :
              selectedArticle.category === 'missions' ? 'from-purple-600 to-pink-600' :
              selectedArticle.category === 'research' ? 'from-green-600 to-emerald-600' :
              'from-orange-600 to-red-600'
            } p-8 rounded-t-2xl text-white`}>
              <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                  {selectedArticle.category.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                </button>
              </div>
              <h2 className="text-3xl font-bold mb-3">{selectedArticle.title}</h2>
              <div className="flex items-center gap-4 text-sm text-white text-opacity-90">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{selectedArticle.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(selectedArticle.published_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{selectedArticle.views + 1} views</span>
                </div>
              </div>
            </div>

            <div className="p-8 max-h-[60vh] overflow-y-auto">
              <p className="text-lg text-gray-700 font-medium mb-6 leading-relaxed">
                {selectedArticle.summary}
              </p>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedArticle.content}
                </p>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">Source: {selectedArticle.source}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

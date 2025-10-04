import { useState, useEffect } from 'react';
import { MessageSquare, Plus, ThumbsUp, Clock, User, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Post {
  id: string;
  title: string;
  content: string;
  author_name: string;
  category: string;
  upvotes: number;
  created_at: string;
}

interface Comment {
  id: string;
  post_id: string;
  author_name: string;
  content: string;
  upvotes: number;
  created_at: string;
}

export function CommunityForum() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');

  const [newPost, setNewPost] = useState({ title: '', content: '', author_name: '', category: 'general' });
  const [newComment, setNewComment] = useState({ author_name: '', content: '' });

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    if (selectedPost) {
      fetchComments(selectedPost.id);
    }
  }, [selectedPost]);

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('discussion_posts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async (postId: string) => {
    try {
      const { data, error } = await supabase
        .from('discussion_comments')
        .select('*')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setComments(data || []);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const createPost = async () => {
    if (!newPost.title || !newPost.content || !newPost.author_name) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('discussion_posts')
        .insert([newPost]);

      if (error) throw error;

      setNewPost({ title: '', content: '', author_name: '', category: 'general' });
      setShowNewPost(false);
      fetchPosts();
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const createComment = async () => {
    if (!selectedPost || !newComment.author_name || !newComment.content) {
      alert('Please fill in all fields');
      return;
    }

    try {
      const { error } = await supabase
        .from('discussion_comments')
        .insert([{ ...newComment, post_id: selectedPost.id }]);

      if (error) throw error;

      setNewComment({ author_name: '', content: '' });
      fetchComments(selectedPost.id);
    } catch (error) {
      console.error('Error creating comment:', error);
    }
  };

  const upvotePost = async (postId: string, currentVotes: number) => {
    try {
      await supabase
        .from('discussion_posts')
        .update({ upvotes: currentVotes + 1 })
        .eq('id', postId);

      fetchPosts();
    } catch (error) {
      console.error('Error upvoting post:', error);
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'question': return 'bg-blue-100 text-blue-700';
      case 'discussion': return 'bg-purple-100 text-purple-700';
      case 'theory': return 'bg-green-100 text-green-700';
      case 'news': return 'bg-orange-100 text-orange-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredPosts = filterCategory === 'all'
    ? posts
    : posts.filter(p => p.category === filterCategory);

  const categories = ['all', 'general', 'question', 'discussion', 'theory', 'news'];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="bg-gradient-to-br from-purple-900 via-purple-800 to-pink-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <MessageSquare className="w-12 h-12" />
            <h1 className="text-5xl font-bold">Community Forum</h1>
          </div>
          <p className="text-xl text-purple-100">
            Join the conversation about interstellar objects and space exploration
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setFilterCategory(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  filterCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {category.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowNewPost(true)}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            <Plus className="w-5 h-5" />
            New Post
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(post.category)}`}>
                    {post.category.toUpperCase()}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      upvotePost(post.id, post.upvotes);
                    }}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 hover:bg-purple-100 rounded-lg transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4 text-purple-600" />
                    <span className="font-semibold text-purple-600">{post.upvotes}</span>
                  </button>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-700 line-clamp-2 mb-4">{post.content}</p>

                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    <span>{post.author_name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{new Date(post.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}

            {filteredPosts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-xl shadow">
                <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">No posts found in this category.</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Forum Guidelines</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Be respectful and constructive</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Stay on topic about interstellar objects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Back up claims with sources when possible</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-2 h-2 bg-purple-600 rounded-full mt-1.5 flex-shrink-0"></span>
                  <span>Welcome newcomers and questions</span>
                </li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Posts</span>
                  <span className="font-bold text-purple-600">{posts.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Active Today</span>
                  <span className="font-bold text-purple-600">
                    {posts.filter(p => new Date(p.created_at).toDateString() === new Date().toDateString()).length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showNewPost && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl text-white">
              <h2 className="text-2xl font-bold">Create New Post</h2>
            </div>
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Your name"
                value={newPost.author_name}
                onChange={(e) => setNewPost({ ...newPost, author_name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
              <input
                type="text"
                placeholder="Post title"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              >
                <option value="general">General</option>
                <option value="question">Question</option>
                <option value="discussion">Discussion</option>
                <option value="theory">Theory</option>
                <option value="news">News</option>
              </select>
              <textarea
                placeholder="Post content"
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
              />
              <div className="flex gap-3">
                <button
                  onClick={createPost}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Create Post
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 overflow-y-auto backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-4xl w-full my-8 shadow-2xl">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-t-2xl text-white">
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-semibold">
                  {selectedPost.category.toUpperCase()}
                </span>
                <button
                  onClick={() => setSelectedPost(null)}
                  className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-lg"
                >
                  ×
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-2">{selectedPost.title}</h2>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{selectedPost.author_name}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{new Date(selectedPost.created_at).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" />
                  <span>{selectedPost.upvotes} upvotes</span>
                </div>
              </div>
            </div>

            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <p className="text-gray-700 mb-6 leading-relaxed whitespace-pre-line">{selectedPost.content}</p>

              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{comments.length} Comments</h3>

                <div className="space-y-4 mb-6">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="font-semibold text-gray-900">{comment.author_name}</span>
                        <span className="text-xs text-gray-500">
                          {new Date(comment.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={newComment.author_name}
                    onChange={(e) => setNewComment({ ...newComment, author_name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                  <textarea
                    placeholder="Write a comment..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200"
                  />
                  <button
                    onClick={createComment}
                    className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    <Send className="w-4 h-4" />
                    Post Comment
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

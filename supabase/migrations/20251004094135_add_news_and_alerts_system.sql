-- News Feed and Alerts System
-- Adds tables for news articles, user alerts, and discussion forums

-- Create news_articles table
CREATE TABLE IF NOT EXISTS news_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  summary text,
  content text NOT NULL,
  category text NOT NULL,
  source text,
  author text,
  image_url text,
  published_date timestamptz DEFAULT now(),
  related_object_id uuid REFERENCES interstellar_objects(id),
  tags jsonb DEFAULT '[]'::jsonb,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create user_alerts table
CREATE TABLE IF NOT EXISTS user_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text NOT NULL,
  alert_type text NOT NULL,
  preferences jsonb DEFAULT '{}'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create discussion_posts table
CREATE TABLE IF NOT EXISTS discussion_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  author_name text NOT NULL,
  related_object_id uuid REFERENCES interstellar_objects(id),
  category text DEFAULT 'general',
  upvotes integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create discussion_comments table
CREATE TABLE IF NOT EXISTS discussion_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES discussion_posts(id) ON DELETE CASCADE,
  author_name text NOT NULL,
  content text NOT NULL,
  upvotes integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE news_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE discussion_comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Public can view news articles"
  ON news_articles FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view discussion posts"
  ON discussion_posts FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can view comments"
  ON discussion_comments FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Public can create alerts"
  ON user_alerts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can create posts"
  ON discussion_posts FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Public can create comments"
  ON discussion_comments FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_news_published_date ON news_articles(published_date DESC);
CREATE INDEX IF NOT EXISTS idx_news_category ON news_articles(category);
CREATE INDEX IF NOT EXISTS idx_discussion_posts_created ON discussion_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_comments_post_id ON discussion_comments(post_id);
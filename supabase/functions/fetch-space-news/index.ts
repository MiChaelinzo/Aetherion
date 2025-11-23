import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  source: string;
  author: string;
  published_date: string;
  tags: string[];
  views: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const spaceNewsAPI = "https://api.spaceflightnewsapi.net/v4/articles";
    const gnewsAPI = "https://gnews.io/api/v4/search";
    const gnewsKey = Deno.env.get("GNEWS_API_KEY") || "demo";

    const articles: NewsArticle[] = [];

    // Try fetching from Space Flight News API (free, no key required)
    try {
      const response = await fetch(
        `${spaceNewsAPI}?limit=5&ordering=-published_at`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.results && Array.isArray(data.results)) {
          for (const item of data.results.slice(0, 5)) {
            articles.push({
              id: item.id || `space-${Date.now()}-${Math.random()}`,
              title: item.title || "Untitled",
              summary: item.summary || item.description || "",
              content: item.summary || item.description || "",
              category: "discovery",
              source: item.news_site || "Space Flight News",
              author: item.author || "Unknown",
              published_date: item.published_at
                ? new Date(item.published_at).toISOString()
                : new Date().toISOString(),
              tags: ["space", "astronomy", "discovery"],
              views: Math.floor(Math.random() * 500) + 100,
            });
          }
        }
      }
    } catch (error) {
      console.error("Space Flight News API error:", error);
    }

    // Try fetching from GNews API for additional coverage
    try {
      const query =
        "interstellar asteroid NASA space exploration exoplanet discovery";
      const response = await fetch(
        `${gnewsAPI}?q=${encodeURIComponent(query)}&lang=en&max=5&apikey=${gnewsKey}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.articles && Array.isArray(data.articles)) {
          for (const item of data.articles.slice(0, 3)) {
            articles.push({
              id: `gnews-${Date.now()}-${Math.random()}`,
              title: item.title || "Untitled",
              summary: item.description || "",
              content: item.content || item.description || "",
              category: determinateCategory(item.title),
              source: extractSource(item.source.name) || "News",
              author: item.source.name || "Unknown",
              published_date: new Date(item.publishedAt).toISOString(),
              tags: extractTags(item.title),
              views: Math.floor(Math.random() * 500) + 100,
            });
          }
        }
      }
    } catch (error) {
      console.error("GNews API error:", error);
    }

    // If APIs failed, return fallback data
    if (articles.length === 0) {
      articles.push(
        {
          id: "fallback-1",
          title: "NASA Confirms New Interstellar Object Detection",
          summary:
            "Advanced detection systems identify new visitor from beyond our solar system",
          content:
            "NASA astronomers have confirmed the detection of a new interstellar object using enhanced detection algorithms and ground-based observatories.",
          category: "discovery",
          source: "NASA",
          author: "NASA Science News",
          published_date: new Date().toISOString(),
          tags: ["interstellar", "discovery", "astronomy"],
          views: 1250,
        },
        {
          id: "fallback-2",
          title: "International Planetary Defense Effort Expands",
          summary:
            "New agreements signed between space agencies for coordinated asteroid monitoring",
          content:
            "In a historic agreement, major space agencies have committed to enhanced information sharing and coordinated response strategies for near-Earth object threats.",
          category: "missions",
          source: "UN Space Affairs",
          author: "Space Policy Updates",
          published_date: new Date().toISOString(),
          tags: ["defense", "cooperation", "space"],
          views: 890,
        }
      );
    }

    return new Response(JSON.stringify({ articles: articles.slice(0, 8) }), {
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to fetch news",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

function determinateCategory(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes("discover") || lower.includes("found")) return "discovery";
  if (lower.includes("mission") || lower.includes("launch")) return "missions";
  if (lower.includes("research") || lower.includes("study")) return "research";
  if (lower.includes("technolog")) return "technology";
  return "discovery";
}

function extractSource(source: string): string {
  if (!source) return "News";
  return source.split(",")[0].split(" - ")[0];
}

function extractTags(title: string): string[] {
  const tags: string[] = [];
  const lower = title.toLowerCase();

  if (lower.includes("asteroid")) tags.push("asteroid");
  if (lower.includes("interstellar")) tags.push("interstellar");
  if (lower.includes("nasa")) tags.push("nasa");
  if (lower.includes("space")) tags.push("space");
  if (lower.includes("discover")) tags.push("discovery");
  if (lower.includes("exoplanet")) tags.push("exoplanet");
  if (lower.includes("mission")) tags.push("mission");

  return tags.length > 0 ? tags : ["space", "astronomy"];
}
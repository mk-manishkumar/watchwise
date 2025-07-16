import axios from "axios";

// Define URL patterns and their extraction methods
const URL_PATTERNS = {
  'youtu.be': (url) => url.pathname.substring(1),
  'youtube.com': (url) => {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    if (url.pathname.startsWith("/embed/")) return url.pathname.split("/")[2];
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2];
    return null;
  }
};

// Normalize hostname to remove subdomains like www. or m.
function normalizeHostname(hostname) {
  return hostname.replace(/^www\./, '').replace(/^m\./, '');
}

function extractVideoId(videoUrl) {
  try {
    const url = new URL(videoUrl);
    const normalizedHost = normalizeHostname(url.hostname);

    if (URL_PATTERNS[normalizedHost]) {
      return URL_PATTERNS[normalizedHost](url);
    }

    // Fallback if youtube.com appears anywhere
    if (normalizedHost.includes("youtube.com")) {
      return URL_PATTERNS['youtube.com'](url);
    }

    return null;
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const videoUrl = req.query.url;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!videoUrl) {
    return res.status(400).json({ error: "YouTube video URL is required." });
  }

  try {
    const videoId = extractVideoId(videoUrl);

    if (!videoId) {
      return res.status(400).json({ error: "Invalid YouTube video URL." });
    }

    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: "snippet,contentDetails",
        id: videoId,
        key: API_KEY,
      },
    });

    if (!response.data.items.length) {
      return res.status(404).json({ error: "Video not found." });
    }

    const videoDetails = response.data.items[0];
    const title = videoDetails.snippet.title;

    const thumbnail =
      videoDetails.snippet.thumbnails.high?.url ||
      videoDetails.snippet.thumbnails.medium?.url ||
      videoDetails.snippet.thumbnails.default?.url;

    const duration = videoDetails.contentDetails.duration;

    res.json({ title, thumbnail, duration });
  } catch (error) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.error?.message || "YouTube API error";
      return res.status(status).json({ error: message });
    }

    if (error.name === 'TypeError' && error.message.includes('Invalid URL')) {
      return res.status(400).json({ error: "Invalid URL format" });
    }

    return res.status(500).json({ error: "Failed to fetch video details." });
  }
}

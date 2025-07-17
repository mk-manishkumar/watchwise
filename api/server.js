import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import morgan from "morgan";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ===== Middlewares =====
app.use(morgan("dev"));

const allowedOrigins = [process.env.ALLOWED_ORIGIN];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

// ===== Video URL Utilities =====
const URL_PATTERNS = {
  "youtu.be": (url) => url.pathname.substring(1),
  "youtube.com": (url) => {
    if (url.pathname === "/watch") return url.searchParams.get("v");
    if (url.pathname.startsWith("/embed/")) return url.pathname.split("/")[2];
    if (url.pathname.startsWith("/shorts/")) return url.pathname.split("/")[2];
    return null;
  },
};

function normalizeHostname(hostname) {
  return hostname.replace(/^www\./, "").replace(/^m\./, "");
}

function extractVideoId(videoUrl) {
  try {
    const url = new URL(videoUrl);
    const normalizedHost = normalizeHostname(url.hostname);
    if (URL_PATTERNS[normalizedHost]) return URL_PATTERNS[normalizedHost](url);
    if (normalizedHost.includes("youtube.com")) return URL_PATTERNS["youtube.com"](url);
    return null;
  } catch {
    return null;
  }
}

// ===== API Route =====
app.get("/api/video-details", async (req, res) => {
  const videoUrl = req.query.url;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!videoUrl) return res.status(400).json({ error: "YouTube video URL is required." });

  const videoId = extractVideoId(videoUrl);
  if (!videoId) return res.status(400).json({ error: "Invalid YouTube video URL." });

  try {
    const response = await axios.get("https://www.googleapis.com/youtube/v3/videos", {
      params: {
        part: "snippet,contentDetails",
        id: videoId,
        key: API_KEY,
      },
    });

    if (!response.data.items.length) return res.status(404).json({ error: "Video not found." });

    const video = response.data.items[0];
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.high?.url || video.snippet.thumbnails.medium?.url || video.snippet.thumbnails.default?.url;
    const duration = video.contentDetails.duration;

    res.json({ title, thumbnail, duration });
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data?.error?.message || "YouTube API error",
      });
    }
    return res.status(500).json({ error: "Failed to fetch video details." });
  }
});

// ===== Start Server =====
app.listen(port, () => {
  console.log(`WatchWise backend listening on port ${port}`);
});

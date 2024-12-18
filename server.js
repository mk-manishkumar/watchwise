import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// API Route to Fetch YouTube Video Details
app.get("/api/video-details", async (req, res) => {
  const videoUrl = req.query.url;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!videoUrl) return res.status(400).json({ error: "YouTube video URL is required." });

  try {
    const url = new URL(videoUrl);

    let videoId = null;

    if (url.hostname === "youtu.be") {
      videoId = url.pathname.substring(1); 
    } else if (url.hostname.includes("youtube.com")) {
      if (url.pathname === "/watch") {
        videoId = url.searchParams.get("v");
      } else if (url.pathname.startsWith("/embed/")) {
        videoId = url.pathname.split("/")[2];
      } else if (url.pathname.startsWith("/shorts/")) {
        videoId = url.pathname.split("/")[2];
      }
    }

    if (!videoId) return res.status(400).json({ error: "Invalid YouTube video URL." });

    // Call the YouTube Data API
    const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos`, {
      params: {
        part: "snippet,contentDetails",
        id: videoId,
        key: API_KEY,
      },
    });

    if (!response.data.items.length) return res.status(404).json({ error: "Video not found." });

    // Extract video details
    const videoDetails = response.data.items[0];
    const title = videoDetails.snippet.title;
    const thumbnail = videoDetails.snippet.thumbnails.high.url;
    const duration = videoDetails.contentDetails.duration;

    res.json({
      title,
      thumbnail,
      duration,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch video details." });
  }
});

// Catch-all route for undefined endpoints (404 Error)
app.use((req, res, next) => {
  res.status(404).json({ error: "Page not found." });
});

// Error-handling middleware (500 Error or others)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong. Please try again later." });
});



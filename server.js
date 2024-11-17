import "dotenv/config";
import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
const PORT = process.env.PORT || 5000;

// MIDDLEWARE
app.use(cors());
app.use(express.json());

// API Route to Fetch YouTube Video Details
app.get("/api/video-details", async (req, res) => {
  const videoUrl = req.query.url;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!videoUrl) {
    return res.status(400).json({ error: "YouTube video URL is required." });
  }

  try {
    /*
      new URL(videoUrl) converts the provided video URL into a proper URL object.
      .search gets everything after the ? in the URL (like ?v=abc123).
      new URLSearchParams(...).get("v") extracts the value of the v parameter, which is the video ID
    */
    const videoId = new URLSearchParams(new URL(videoUrl).search).get("v");
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

    // Send response
    res.json({
      title,
      thumbnail,
      duration,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch video details." });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

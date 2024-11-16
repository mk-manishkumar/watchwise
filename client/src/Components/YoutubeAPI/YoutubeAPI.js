import React, { useEffect, useState } from "react";
import axios from "axios";

const YouTubeSearch = () => {
  const [videos, setVideos] = useState([]);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const CHANNEL_ID = "UCs3o4RhBiP2wcwqkZR2QVLw"; // Example channel ID
  const MAX_RESULTS = 10;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get(`https://www.googleapis.com/youtube/v3/search`, {
          params: {
            part: "snippet",
            channelId: CHANNEL_ID,
            maxResults: MAX_RESULTS,
            key: API_KEY,
          },
        });
        setVideos(response.data.items);
      } catch (error) {
        console.error("Error fetching data from YouTube API", error);
      }
    };

    fetchVideos();
  }, [API_KEY, CHANNEL_ID]);

  return (
    <div>
      <h1>YouTube Videos</h1>
      <ul>
        {videos.map((video) => (
          <li key={video.id.videoId}>
            <img src={video.snippet.thumbnails.default.url} alt={video.snippet.title} />
            <h2>{video.snippet.title}</h2>
            <p>Duration: {video.snippet.publishedAt}</p>
            <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
              Watch Video
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YouTubeSearch;

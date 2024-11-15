export const getVideoIdFromUrl = (url) => {
  try {
    const parsedUrl = new URL(url);

    // Check if it's a YouTube URL
    if (parsedUrl.hostname === "www.youtube.com" || parsedUrl.hostname === "youtube.com") {
      return parsedUrl.searchParams.get("v"); // Extract the video ID from query parameters
    } else if (parsedUrl.hostname === "youtu.be") {
      return parsedUrl.pathname.slice(1); // Extract the video ID from pathname for short links
    } else {
      return null; // Not a YouTube URL
    }
  } catch (error) {
    console.error("Invalid URL", error);
    return null;
  }
};

// Helper function to format duration in seconds to hh:mm:ss format
export const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return [
    hrs > 0 ? hrs : null, // Include hours only if > 0
    hrs > 0 ? String(mins).padStart(2, "0") : mins, // Pad minutes if hours exist
    String(secs).padStart(2, "0"), // Pad seconds
  ]
    .filter(Boolean) // Remove null values
    .join(":"); // Join with colons
};

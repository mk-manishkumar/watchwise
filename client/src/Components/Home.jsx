import React, { useState } from "react";
import DayNightMode from "./DayNightMode.jsx";
import DisplayWatchTime from "./DisplayWatchTime.jsx";
import ErrorPage from "./ErrorMessage/ErrorMessage.jsx";
import axios from "axios";

// ================== Function to convert ISO 8601 duration to HH:MM:SS ====================
const isoDurationToHHMMSS = (isoDuration) => {
  if (!isoDuration) return null;

  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return null;

  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
  const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0;

  const pad = (num) => String(num).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
};

const Home = () => {
  const [link, setLink] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState("");

  // ========== SUBMIT HANDLER =========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVideoDetails(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log(apiBaseUrl);
    

    try {
      const response = await axios.get(`${apiBaseUrl}/api/video-details`, {
        params: { url: link },
      });

      setVideoDetails({
        title: response.data.title,
        thumbnail: response.data.thumbnail,
        duration: response.data.duration,
      });
      setLink("");
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error || "Failed to fetch video details.");
      } else if (error.request) {
        setError("No response from server. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  // ============ HANDLING ERRORS =================
  if (error) return <ErrorPage statusCode={error.includes("not found") ? 404 : 500} message={error} />;

  return (
    <>
      {/* ============= HEADER =================== */}
      <div className="wrapper">
        <header>
          <h1>
            <i className="fa-brands fa-youtube"></i> WatchWise
          </h1>
          <DayNightMode />
        </header>

        <main>
          {/* ================ FORM =================== */}
          <form onSubmit={handleSubmit}>
            <input type="search" placeholder="Paste the YouTube Video Link here" value={link} onChange={(e) => setLink(e.target.value)} required />
            <button type="submit" className="submit">
              Submit
            </button>
          </form>
        </main>

        <section>
          {/* ============= ERROR MESSAGE =================== */}
          {error && <p className="error-message">{error}</p>}

          {/* ================ VIDEO DETAILS ================== */}
          {videoDetails && (
            <div className="video-details">
              <img src={videoDetails.thumbnail} alt={videoDetails.title} className="video-thumbnail" />
              <p className="video-title">
                <em>{videoDetails.title}</em>
              </p>
              <p className="video-duration">Video Duration: {isoDurationToHHMMSS(videoDetails.duration)}</p>
            </div>
          )}

          {/* ============ WATCHTIME SECTION ============ */}
          {videoDetails && <DisplayWatchTime duration={videoDetails.duration} />}
        </section>
      </div>

      {/* =========== FOOTER ================= */}
      <footer>
        <p>
          Made with &#x1FA77; by{" "}
          <a href="https://manishmk.vercel.app/" target="_blank" rel="noopener noreferrer">
            Manish Kumar
          </a>
          , &copy; 2024{" "}
        </p>
      </footer>
    </>
  );
};

export default Home;

import React, { useState } from "react";
import DayNightMode from "./DayNightMode.jsx";
import DisplayWatchTime from "./DisplayWatchTime.jsx";

const Home = () => {
  const [link, setLink] = useState("");
  const [videoDetails, setVideoDetails] = useState(null);
  const [error, setError] = useState("");

  // ========== SUBMIT HANDLER =========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setVideoDetails(null);

    try {
      const response = await fetch(`http://localhost:5004/api/video-details?url=${link}`);
      const data = await response.json();

      if (response.ok) {
        setVideoDetails({
          title: data.title,
          thumbnail: data.thumbnail,
          duration: data.duration,
        });
      } else {
        setError(data.error || "Failed to fetch video details.");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <header>
        <h1>
          <i className="fa-brands fa-youtube"></i> WatchWise
        </h1>
        <DayNightMode />
      </header>

      <main>
        {/* FORM */}
        <form action="" onSubmit={handleSubmit}>
          <input type="search" placeholder="Paste the YouTube Video Link here" value={link} onChange={(e) => setLink(e.target.value)} required />
          <button type="submit">Submit</button>
        </form>
      </main>

      <section>
        {/* Error Message */}
        {error && <p className="error-message">{error}</p>}

        {/* Video Details */}
        {videoDetails && (
          <div className="video-details">
            <img src={videoDetails.thumbnail} alt={videoDetails.title} className="video-thumbnail" />
            <p className="video-title">{videoDetails.title}</p>
            <p className="video-duration">Video Duration: {videoDetails.duration}</p>
          </div>
        )}

        {/* WATCHTIME SECTION */}
        {videoDetails && <DisplayWatchTime duration={videoDetails.duration} />}
      </section>

      <footer>
        <p>
          Made with &#x1FA77; by{" "}
          <a href="https://manishmk.vercel.app/" target="_blank">
            Manish Kumar
          </a>
          , &copy; 2024{" "}
        </p>
      </footer>
    </>
  );
};

export default Home;

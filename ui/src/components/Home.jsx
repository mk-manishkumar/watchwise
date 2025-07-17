import { useState, useEffect } from "react";
import DayNightMode from "./DayNightMode.jsx";
import DisplayWatchTime from "./DisplayWatchTime.jsx";
import { ErrorPage } from "./ErrorMessage.jsx";
import axios from "axios";

// ========== Convert ISO 8601 to HH:MM:SS ==========
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
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  // ========== SUBMIT HANDLER ==========
  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!link.trim()) return;
    setError("");
    setVideoDetails(null);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

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

  // ========== ERROR HANDLING ==========
  if (error && (error.includes("not found") || error.includes("404"))) {
    return <ErrorPage statusCode={404} message={error} />;
  }

  if (error?.includes("500")) {
    return <ErrorPage statusCode={500} message={error} />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* =========== HEADER =========== */}
      <div className={`flex flex-col min-h-[90vh] transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
        <header className={`px-12 py-4 flex justify-between items-center transition-all duration-300 ${isDarkMode ? "bg-black" : "bg-white"} max-sm:px-4`}>
          <h1 className="text-red-500 text-2xl max-sm:text-xl font-bold transition-colors duration-300">
            <i className="fa-brands fa-youtube mr-2"></i> WatchWise
          </h1>
          <DayNightMode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </header>

        {/* =========== FORM & RESULT =========== */}
        <main className="flex flex-col items-center justify-start flex-grow px-4 py-8 overflow-hidden">
          <section className="w-full max-w-3xl flex flex-col items-center">
            <div className="mt-8 flex gap-4 max-md:flex-col max-md:items-center">
              <input type="search" placeholder="Paste the YouTube Video Link here" value={link} onChange={(e) => setLink(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleSubmit(e)} className={`border-none outline-none p-3 text-xl w-[500px] max-sm:w-80 max-[375px]:w-64 max-[375px]:text-sm transition-all duration-300 ${isDarkMode ? "bg-gray-700 text-white" : "bg-gray-100 text-black"}`} />

              <button onClick={handleSubmit} className="bg-red-500 text-white border-none text-xl px-4 py-3 w-36 max-md:w-24 max-md:px-2 max-md:py-1 max-md:rounded-md max-[375px]:text-sm cursor-pointer transition-all duration-300 hover:bg-teal-600">
                Submit
              </button>
            </div>

            {/* Error Message */}
            {error && !error.includes("404") && !error.includes("500") && <p className="text-center mt-4 text-red-500">{error}</p>}

            {/* Video Details */}
            {videoDetails && (
              <div className="text-center mt-8">
                <img src={videoDetails.thumbnail} alt={videoDetails.title} className="w-64 h-36 mx-auto rounded-lg shadow-lg mb-4" />
                <p className={`text-center mt-3 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>
                  <em>{videoDetails.title}</em>
                </p>
                <p className={`text-center mt-3 transition-colors duration-300 ${isDarkMode ? "text-white" : "text-black"}`}>Video Duration: {isoDurationToHHMMSS(videoDetails.duration)}</p>
              </div>
            )}

            {/* WatchTime Component */}
            {videoDetails && <DisplayWatchTime duration={videoDetails.duration} isDarkMode={isDarkMode} />}
          </section>
        </main>
      </div>

      {/* =========== FOOTER =========== */}
      <footer className={`px-4 py-4 mt-auto h-[10vh] transition-all duration-300 ${isDarkMode ? "bg-black" : "bg-white"}`}>
        <p className={`text-center transition-colors duration-300 ${isDarkMode ? "text-white" : "text-red-500"}`}>
          Made with &#x1FA77; by{" "}
          <a href="https://manishmk.vercel.app/" target="_blank" rel="noopener noreferrer" className="text-blue-400 no-underline hover:underline transition-all duration-300">
            Manish Kumar
          </a> , &copy; 2024
        </p>
      </footer>
    </div>
  );
};

export default Home;

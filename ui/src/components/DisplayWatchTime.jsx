import React, { useMemo } from "react";

// Converts ISO 8601 duration (e.g., PT36M54S) to seconds
const parseISODurationToSeconds = (isoDuration) => {
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || "0", 10);
  const minutes = parseInt(match[2] || "0", 10);
  const seconds = parseInt(match[3] || "0", 10);

  return hours * 3600 + minutes * 60 + seconds;
};

// Format seconds into "Hh Mm Ss"
const timeFormat = (seconds) => {
  if (!seconds || isNaN(seconds)) return "Invalid time";

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);

  return `${h > 0 ? h + "h " : ""}${m}m ${s}s`;
};

const DisplayWatchTime = ({ duration, isDarkMode }) => {
  const speedTimes = useMemo(() => {
    const totalSeconds = parseISODurationToSeconds(duration);
    if (!totalSeconds) return [];

    const speeds = [0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2, 3];

    return speeds.map((speed) => ({
      speed,
      time: timeFormat(totalSeconds / speed),
    }));
  }, [duration]);

  if (!duration) return null;

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-12 p-4 mt-4 transition-all duration-300 ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-900"}`}>
      {speedTimes.map(({ speed, time }) => (
        <div key={speed} className={`rounded-lg border p-3 text-center font-medium transition-all duration-300 ${isDarkMode ? "border-gray-600 bg-gray-700" : "border-gray-300 bg-gray-100"}`}>
          <p className="text-md mb-4">{speed}x</p>
          <p className="text-2x1">{time}</p>
        </div>
      ))}
    </div>
  );
};

export default DisplayWatchTime;

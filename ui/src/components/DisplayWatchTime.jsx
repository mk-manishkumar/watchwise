// Convert ISO 8601 duration (e.g., PT1H2M3S) to total seconds
const isoDurationToSeconds = (isoDuration) => {
  if (!isoDuration) return null;
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return null;

  const hours = parseInt(match[1]?.replace("H", "") || 0);
  const minutes = parseInt(match[2]?.replace("M", "") || 0);
  const seconds = parseInt(match[3]?.replace("S", "") || 0);

  return hours * 3600 + minutes * 60 + seconds;
};

// Format seconds to readable format like "1h 23m 45s"
const formatSeconds = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours ? hours + "h " : ""}${minutes ? minutes + "m " : ""}${seconds ? seconds + "s" : ""}`.trim();
};

const DisplayWatchTime = ({ duration, isDarkMode = true }) => {
  const speeds = [0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2, 3];
  const totalDurationInSeconds = isoDurationToSeconds(duration);

  if (totalDurationInSeconds === null) {
    return <p className={`text-center mt-4 ${isDarkMode ? "text-white" : "text-black"}`}>Invalid or missing duration.</p>;
  }

  return (
    <div className="grid grid-cols-4 gap-8 px-8 place-items-center mt-8 max-[1350px]:gap-6 max-[1350px]:grid-cols-4 max-[950px]:grid-cols-2 max-[525px]:grid-cols-1">
      {speeds.map((speed) => {
        const adjustedTime = totalDurationInSeconds / speed;

        return (
          <div
            key={speed}
            className={`w-72 h-36 max-[1350px]:w-48 rounded-lg p-2.5 text-center shadow-lg transition-all duration-200 ease-in-out hover:scale-105 flex flex-col justify-center
              ${isDarkMode ? "bg-gray-900 shadow-black/10" : "bg-blue-50 shadow-black/10"}`}
          >
            <h3 className={`m-0 text-xl font-normal ${isDarkMode ? "text-gray-400" : "text-gray-700"}`}>{speed}x</h3>
            <p className={`mt-2.5 mb-0 text-base font-semibold ${isDarkMode ? "text-gray-500" : "text-gray-600"}`}>{formatSeconds(Math.round(adjustedTime))}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayWatchTime;

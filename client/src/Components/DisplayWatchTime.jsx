import React from "react";

// Function to convert ISO 8601 duration (e.g., PT1H2M3S) to seconds
const isoDurationToSeconds = (isoDuration) => {
  if (!isoDuration) return null;
  const match = isoDuration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return null;

  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
  const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0;

  return hours * 3600 + minutes * 60 + seconds;
};

// Function to format seconds into HH:MM:SS format
const formatSeconds = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${hours ? hours + "h " : ""}${minutes ? minutes + "m " : ""}${seconds ? seconds + "s" : ""}`.trim();
};

const DisplayWatchTime = ({ duration }) => {
  const speeds = [0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2, 3];
  const totalDurationInSeconds = isoDurationToSeconds(duration);

  if (totalDurationInSeconds === null) {
    return <p>Invalid or missing duration.</p>;
  }

  return (
    <div className="watch-time-section">
      {speeds.map((speed) => {
        const adjustedTime = totalDurationInSeconds / speed;
        return (
          <div className="watch-time-box" key={speed}>
            <h3>{speed}x</h3>
            <p>{formatSeconds(Math.round(adjustedTime))}</p>
          </div>
        );
      })}
    </div>
  );
};

export default DisplayWatchTime;

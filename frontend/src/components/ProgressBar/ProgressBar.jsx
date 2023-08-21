import React from "react";
import "./ProgressBar.css";

const ProgressBar = ({
  timeProgress,
  duration,
  onTimeProgressChangeRequest,
}) => {
  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const onProgressBarChange = (e) => {
    const value = parseFloat(e.target.value);
    onTimeProgressChangeRequest(value);
  };

  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input
        type="range"
        onChange={onProgressBarChange}
        min="0"
        max={duration}
        value={timeProgress}
        step="0.5"
      />
      <span className="time">{formatTime(duration)}</span>
    </div>
  );
};

export default ProgressBar;

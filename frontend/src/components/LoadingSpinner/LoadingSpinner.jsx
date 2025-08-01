import React from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = React.memo(({ size = "medium", text = "Loading..." }) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
});

LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = "medium", text = "Loading..." }) => {
  return (
    <div className={`loading-container ${size}`}>
      <div className="spinner"></div>
      <p className="loading-text">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
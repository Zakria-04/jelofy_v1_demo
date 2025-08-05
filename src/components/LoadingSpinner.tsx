import React from "react";
import "../styles/loading.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="dot-spinner">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;

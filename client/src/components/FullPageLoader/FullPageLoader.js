import React from 'react';
import './FullPageLoader.css'; // styling below

function FullPageLoader() {
  return (
    <div className="loader-overlay">
      <div className="loader-spinner"></div>
      <p>Loading user session...</p>
    </div>
  );
}

export default FullPageLoader;
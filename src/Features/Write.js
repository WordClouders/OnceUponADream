import React, { useState } from 'react';
import './Write.css';

function Write() {
  const [showInput, setShowInput] = useState(false);

  const handleButtonClick = () => {
    setShowInput(true);
  };

  const handleEnterClick = () => {
    setShowInput(false);
  };

  return (
    <div className="write-container">
      {showInput && (
        <div>
          <input
            type="text"
            className="text-input"
            maxLength="20"
            placeholder="Enter text here..."
          />
          <button onClick={handleEnterClick} className="enter-button">Enter</button>
        </div>
      )}
      {!showInput && (
        <button onClick={handleButtonClick} className="picture-button">
          {/* Button content (if any) goes here */}
        </button>
      )}
    </div>
  );
}

export default Write;

import React, { useState } from 'react';
import './Navibar.css';

function Navibar() {
  const [isSquareVisible, setSquareVisible] = useState(false);

  const toggleSquare = () => {
    setSquareVisible(!isSquareVisible);
  };

  return (
    <nav>
      <button onClick={toggleSquare} className="toggle-square-btn">
        About
      </button>
      {isSquareVisible && (
        <div className="black-square">
          <b>More Info</b>
          {/* Add more text or elements as needed */}
        </div>
      )}
    </nav>
  );
}

export default Navibar;

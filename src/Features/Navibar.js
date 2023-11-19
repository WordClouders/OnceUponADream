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
          
          {<p><b>More Info</b><br></br>This app is about where people come to share their stories!</p>}
        </div>
      )}
    </nav>
  );
}

export default Navibar;

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
          
          {<p><b>More Info</b><br></br>This app is about where people come to share their stories! Through the use of blockchain technologies, we enable users to have a safe and secure environment to contribute to AI generated stories and to show the creative side of themselves. Click on any of the Latest Stories if you would like to view one or you may continue a story in progress or create your own story!<br></br><b>You have a 20 character limit!</b></p>}
        </div>
      )}
    </nav>
  );
}

export default Navibar;

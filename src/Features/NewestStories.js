import React, { useState } from 'react';
import './NewestStories.css';

function NewestStories() {
  const [visibleImage, setVisibleImage] = useState(null);

  const handleClick = (imageNumber) => {
    setVisibleImage(visibleImage === imageNumber ? null : imageNumber);
  };

  return (
    <div className="buttons-container">
      {[1, 2, 3, 4].map((number) => (
        <div key={number} className="story-item">
          <button
            className="image-button"
            onClick={() => handleClick(number)}
          >
            Latest Story<br />{number}
          </button>
          {visibleImage === number && (
            <div className="image-dropdown">
              <img src={'Images/cloud.png'} alt={`Latest Story ${number}`} />
              <p className="overlay-text">Text for story {number}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default NewestStories;

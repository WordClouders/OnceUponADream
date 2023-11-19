import React from 'react';
import './Books.css';

function Books() {
  return (
    <div className="books-container">
      <button className="book-button" id="book1">Completed Stories</button>
      <button className="book-button" id="book2">Stories in Progress</button>
    </div>
  );
}

export default Books;

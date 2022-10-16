import React from 'react';
import '../style/Header.css';

const Header = () => {
  return (
    <div className="header" id="banner">
      <div className="header" id="banner-left">
          <p className="header-text">Reading Library</p>
      </div>
      <div className="header" id="banner-right">
          <img className="header-book-icon" src='../assets/book-icon.svg' alt='book icon'></img>
      </div>
    </div>
  );
}

export default Header;
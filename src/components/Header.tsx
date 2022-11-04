import React, { FC } from 'react';
import '../style/Header.css';
import bookIcon from '../assets/book-icon.svg';

interface HeaderProps {
  userStatus: any,
};

const Header: FC<HeaderProps> = (props): JSX.Element => {

  const { userStatus } = props;

  const userName = userStatus.currentUser.displayName;
  const userEmail = userStatus.currentUser.email;

  if (userName === undefined) {
    return (
      <div className="header" id="banner">
        <div className="header" id="banner-left">
            <p className="header-text">Reading Library</p>
        </div>
        <div className="header" id="banner-right">
            <img className="header-book-icon" src={bookIcon} alt='book icon'></img>
            <p id='display-name-text' >{userEmail}</p>
        </div>
      </div>
    );
  } else if (userName !== undefined) {
    return (
      <div className="header" id="banner">
        <div className="header" id="banner-left">
            <p className="header-text">Reading Library</p>
        </div>
        <div className="header" id="banner-right">
            <img className="header-book-icon" src={bookIcon} alt='book icon'></img>
            <p id='display-name-text' >Logged In: <strong><em>{userName}</em></strong></p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="header" id="banner">
        <div className="header" id="banner-left">
            <p className="header-text">Reading Library</p>
        </div>
        <div className="header" id="banner-right">
            <img className="header-book-icon" src={bookIcon} alt='book icon'></img>
        </div>
      </div>
    );
  };
};

export default Header;
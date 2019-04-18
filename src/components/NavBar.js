import React from 'react';
import './NavBar.scss';

 const NavBar = ({ title, color, hasBack, onGoBack }) =>
  <header className={`nav-bar bg-${color}`}>
    <div className="page-width page-margins">
      {hasBack ?
        (
          <button href="#" className="back-button" onClick={onGoBack}>
            <i className="fas fa-arrow-left"></i>
          </button>
        )
        : ''}
      <h1>{title}</h1>
    </div>
  </header>;

export default NavBar;
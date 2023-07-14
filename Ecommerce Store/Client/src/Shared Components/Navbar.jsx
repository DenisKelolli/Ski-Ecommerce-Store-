import React from 'react';
import "./Navbar.css"

const NavigationBar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="menu">
        <ul>
          <li><a href="#">Ski</a></li>
          <li><a href="#">Snowboard</a></li>
          <li><a href="#">Boots</a></li>
          <li><a href="#">Helmet</a></li>
          <li><a href="#">Goggles</a></li>
        </ul>
      </div>
      <div className="actions">
        <ul>
          <li><a href="#">Sign In</a></li>
          <li><a href="#">Register</a></li>
          <li><a href="#">Cart</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;
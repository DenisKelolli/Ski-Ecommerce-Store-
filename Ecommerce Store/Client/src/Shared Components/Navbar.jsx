import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavigationBar = () => {
  return (
    <nav>
      <div className="logo">
        <img src="logo.png" alt="Logo" />
      </div>
      <div className="menu">
        <ul>
          <li><Link to="/ski">Ski</Link></li>
          <li><Link to="/snowboard">Snowboard</Link></li>
          <li><Link to="/jackets">Jackets</Link></li>
          <li><Link to="/pants">Pants</Link></li>
          <li><Link to="/boots">Boots</Link></li>
          <li><Link to="/helmet">Helmet</Link></li>
          <li><Link to="/goggles">Goggles</Link></li>
          <li><Link to="/gloves">Gloves</Link></li>
        </ul>
      </div>
      <div className="actions">
        <ul>
          <li><Link to="/signin">Sign In</Link></li>
          <li><Link to="/register">Register</Link></li>
          <li><Link to="/cart">Cart</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;

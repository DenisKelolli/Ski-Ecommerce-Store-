import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { CartContext } from '../context/cartContext'; 

const NavigationBar = () => {
  const { cartCount } = useContext(CartContext); 

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <img src="logo.png" alt="Logo" />
        </Link>
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
          <li>
            <Link to="/cart">
              Cart ({cartCount})
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavigationBar;

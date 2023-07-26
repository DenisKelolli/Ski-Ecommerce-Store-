import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { CartContext } from '../context/cartContext'; 
import {FaSkiing} from "react-icons/fa"
import axios from 'axios';

const NavigationBar = () => {
  const { cartCount, setCartCount } = useContext(CartContext);
  const [cartData, setCartData] = useState([]);

    useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart');
        setCartData(response.data);
        
        // Calculate the total number of items in the cart and update the cartCount state
        const totalItems = response.data.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCartData();
  }, []);

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <div className="icon"><FaSkiing size={30}/></div>
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

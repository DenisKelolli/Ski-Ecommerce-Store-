import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaSkiing } from 'react-icons/fa';
import { AiOutlineMenu } from 'react-icons/ai';
import './Navbar.css';
import { CartContext } from '../context/cartContext';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const NavigationBar = () => {
  const { cartCount, setCartCount } = useContext(CartContext);
  const { loggedInUser, setLoggedInUser} = useContext(AuthContext);
  const [setCartData] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const mobileMenuRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart', {
          withCredentials: true
        });
        setCartData(response.data.cartItems || response.data);

        const totalItems = response.data.cartItems
          ? response.data.cartItems.reduce((total, item) => total + item.quantity, 0)
          : response.data.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalItems);
      } catch (error) {
        console.error('Error fetching cart data:', error);
      }
    };
    fetchCartData();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getuser', {
          withCredentials: true
        });
        if (response.data && response.data.username) {
          setLoggedInUser({ username: response.data.username });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchLoggedInUser();
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [windowWidth]);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOutsideClick = (e) => {
    if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
      setIsMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [isMobileMenuOpen]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogOut = async () => {
    handleLinkClick();
    try {
      await axios.post('http://localhost:3000/logout', {}, { withCredentials: true });
      setLoggedInUser(null); // Reset the logged-in user
      window.location.href = '/'; // Redirect to the home page
    } catch (error) {
      console.error('Error logging out:', error);
      alert('Logout failed'); 
    }
  };

  return (
    <nav>
      <div className="logo">
        <Link to="/">
          <div className="icon">
            <FaSkiing size={30} />
          </div>
        </Link>
      </div>
      {windowWidth < 1440 ? (
        <>
          <div className="hamburger-icon" onClick={toggleMobileMenu}>
            <AiOutlineMenu size={30} color="white" />
          </div>
          <div ref={mobileMenuRef} className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
            <div className="menu-items">
              <ul>
                <li><Link to="/ski" onClick={handleLinkClick}>Ski</Link></li>
                <li><Link to="/snowboard" onClick={handleLinkClick}>Snowboard</Link></li>
                <li><Link to="/jackets" onClick={handleLinkClick}>Jackets</Link></li>
                <li><Link to="/pants" onClick={handleLinkClick}>Pants</Link></li>
                <li><Link to="/boots" onClick={handleLinkClick}>Boots</Link></li>
                <li><Link to="/helmets" onClick={handleLinkClick}>Helmets</Link></li>
                <li><Link to="/goggles" onClick={handleLinkClick}>Goggles</Link></li>
                <li><Link to="/gloves" onClick={handleLinkClick}>Gloves</Link></li>
                {loggedInUser ? (
                  <>
                    <li className='username'>{loggedInUser.username}</li>
                    <li><Link to="/" onClick={handleLogOut}>Log Out</Link></li>
                  </>
                ) : (
                  <>
                    <li><Link to="/signin" onClick={handleLinkClick}>Sign In</Link></li>
                    <li><Link to="/register" onClick={handleLinkClick}>Register</Link></li>
                  </>
                )}
                <li><Link to="/cart" onClick={handleLinkClick}>Cart ({cartCount})</Link></li>
              </ul>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="menu">
            <ul className="menu-items-center">
              <li><Link to="/ski">Ski</Link></li>
              <li><Link to="/snowboard">Snowboard</Link></li>
              <li><Link to="/jackets">Jackets</Link></li>
              <li><Link to="/pants">Pants</Link></li>
              <li><Link to="/boots">Boots</Link></li>
              <li><Link to="/helmets">Helmets</Link></li>
              <li><Link to="/goggles">Goggles</Link></li>
              <li><Link to="/gloves">Gloves</Link></li>
            </ul>
            <ul className="menu-items-right">
              {loggedInUser ? (
                <>
                  <li className='username'>{loggedInUser.username}</li>
                  <li><Link to="/" onClick={handleLogOut}>Log Out</Link></li>
                </>
              ) : (
                <>
                  <li><Link to="/signin">Sign In</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </>
              )}
              <li><Link to="/cart">Cart ({cartCount})</Link></li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default NavigationBar;

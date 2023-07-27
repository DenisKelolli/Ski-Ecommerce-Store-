import React from 'react';
import './Footer.css';
import {FaFacebookSquare} from "react-icons/fa"
import {FaInstagramSquare} from "react-icons/fa"
import {FaTwitterSquare} from "react-icons/fa"

const Footer = () => {
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer__content">
            <div className="footer__section">
            <div className="Contact-Us">Contact Us</div>
              <p>Email: info@skicompany.com</p>
              <p>Phone: 123-456-7890</p>
            </div>
            <div className="footer__section">
            <div className="Follow-Us">Follow Us</div>
              <div className="social-links-container">
                <div className="footer__social-links"><FaFacebookSquare color="white"  size = "30px" /></div>
                <div className="footer__social-links"><FaInstagramSquare color="white"  size = "30px" /></div>
                <div className="footer__social-links"><FaTwitterSquare color="white"  size = "30px" /></div>
              </div>
             
            </div>
            <div className="footer__section">
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;

import React, { useState, useContext } from 'react';
import './ProductCard.css';
import Toast from './Toast';
import { AuthContext } from '../context/AuthContext'; 

const ProductCard = ({ id, image, title, price, onAddToCart }) => {
  const [showToast, setShowToast] = useState({ show: false, message: '' });
  const { loggedInUser } = useContext(AuthContext); // Use the AuthContext to get the loggedInUser state

  const handleAddToCart = () => {
    if (loggedInUser) { // Check if the user is logged in
      // Call the onAddToCart function passed as a prop and pass the relevant data
      onAddToCart({ id, image, title, price });

      // Show the toast notification with the item name
      setShowToast({ show: true, message: `${title} has been added to Cart!` });
    } else {
      // Show the toast notification with the sign-in message
      setShowToast({ show: true, message: 'Sign-In to add items to cart' });
    }

    // Hide the toast notification after 3 seconds
    setTimeout(() => {
      setShowToast({ show: false, message: '' });
    }, 3000);
  };

  return (
    <div className="product-card-container">
      {showToast.show && <Toast message={showToast.message} />}
      <img src={image} alt={title} className="productImage" />
      <div className="productTitle">{title}</div>
      <div className="productPrice">${price}</div>
      <div className='productButtonsContainer'>
        <button onClick={handleAddToCart} className="addToCartButton">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

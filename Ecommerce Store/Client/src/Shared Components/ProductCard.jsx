import React, { useState } from 'react';
import './ProductCard.css';
import Toast from './Toast';

const ProductCard = ({ id, image, title, price, onAddToCart }) => {
  const [showToast, setShowToast] = useState(false);

  const handleAddToCart = () => {
    // Call the onAddToCart function passed as a prop and pass the relevant data
    onAddToCart({ id, image, title, price });

    // Show the toast notification
    setShowToast(true);

    // Hide the toast notification after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  return (
    <div className="product-card-container">
      {showToast && <Toast message="Item has been added to Cart!" />}
      <img src={image} alt={title} className="productImage" />
      <div className="productTitle">{title}</div>
      <div className="productPrice">${price}</div>
      <div className='productButtonsContainer'>
        <button onClick={handleAddToCart} className="addToCartButton"> Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductCard;

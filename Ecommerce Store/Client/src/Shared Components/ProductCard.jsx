import React from 'react';
import './ProductCard.css';

const ProductCard = ({ id, image, title, price, onAddToCart }) => {
  const handleAddToCart = () => {
    // Call the onAddToCart function passed as a prop
    onAddToCart();
  };

  return (
    <div className="product-card-container">
      <img src={image} alt={title} className="productImage" />
      <div className="productTitle">{title}</div>
      <div className="productPrice">{price}</div>
      <div className='productButtonsContainer'>
        <button onClick={handleAddToCart} className="addToCartButton"> Add to Cart</button>
        <button className="buyNowButton">Buy Now </button>
      </div>
    </div>
  );
};

export default ProductCard;

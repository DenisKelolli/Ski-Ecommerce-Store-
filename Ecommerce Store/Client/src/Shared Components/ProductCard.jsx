import React from 'react';
import "./ProductCard.css"




const ProductCard = ({id,image,title,price}) => {
  
  return (
    <div>
      <div key={id} className="product-card-container">
        <img src={image} alt="image" className='productImage'  />
        <div className="productTitle">{title}</div>
        <div className="productPrice">Price: ${price}</div>
        <div className="addToCartAndBuyNowButtonContainer">
          <button className="addToCartButton">Add To Cart</button>
          <button className="buyNowButton">Buy Now</button>
        </div>
      </div>
   </div>
  );
};

export default ProductCard;
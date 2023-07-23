import React, { createContext, useState } from 'react';

// Create a context for the cart
const CartContext = createContext();

// Create a CartContextProvider component to wrap the entire application
const CartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  // Function to increment the cart count
  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };
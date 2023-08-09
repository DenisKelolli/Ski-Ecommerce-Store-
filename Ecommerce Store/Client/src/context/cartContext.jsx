import React, { createContext, useState } from 'react';

const CartContext = createContext();


const CartContextProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount((prevCount) => prevCount + 1);
  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, handleAddToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartContextProvider };

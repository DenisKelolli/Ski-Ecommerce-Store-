import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Cart.css";

const Product = ({ product, updateQuantity, deleteProduct }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateQuantity(product._id, newQuantity);
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      updateQuantity(product._id, newQuantity);
    }
  };

  const handleDelete = () => {
    deleteProduct(product._id);
  };

  return (
    <div className="cartContainer" key={product._id}>
      <img
        className="cartProductImage"
        src={product.image}
        alt={product.title}
      />
      <div className="cartProductTitle">{product.title}</div>
      <div className="cartProductPrice">${product.price}</div>
      <button onClick={decrement} className="incrementButton">
        -
      </button>
      <div className="quantityField">QTY: {quantity}</div>
      <button onClick={increment} className="decrementButton">
        +
      </button>
      <button onClick={handleDelete} className="cartDeleteButton">
        Remove
      </button>
    </div>
  );
};

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/cart`, {
          withCredentials: true,
        });
        setProducts(response.data);
        setShowCart(true);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setShowCart(true);
      }
    };
    fetchCartItems();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(
        `${import.meta.env.VITE_API}/cart/${productId}`,
        { quantity: newQuantity },
        { withCredentials: true }
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === productId ? { ...p, quantity: newQuantity } : p
        )
      );
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/cart/${productId}`, {
        withCredentials: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <div className="cart-title">Cart</div>
      {showCart ? (
        products.length === 0 ? (
          <div className="noItemsInCartMessage">Your cart is empty.</div>
        ) : (
          products.map((product) => (
            <Product
              product={product}
              key={product._id}
              updateQuantity={updateQuantity}
              deleteProduct={deleteProduct}
            />
          ))
        )
      ) : null}

      {products.length > 0 && (
        <Link to="/checkout">
          <button className="checkoutButton">Checkout Now</button>
        </Link>
      )}
      <Link to="/">
        <button className="cartContinueShoppingButton">
          Continue Shopping
        </button>
      </Link>
    </>
  );
};

export default Cart;

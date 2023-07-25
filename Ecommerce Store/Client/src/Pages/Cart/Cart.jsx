import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';

const Product = ({ product, updateQuantity, deleteProduct }) => {
  const [quantity, setQuantity] = useState(product.quantity);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    
    // Make an API request to update the quantity on the server
    axios
      .put(`http://localhost:3000/cart/${product.title}`, { quantity: newQuantity })
      .then((response) => {
        // Update the product's quantity in the client-side state with the value from the server response
        updateQuantity(product, response.data.quantity);
      })
      .catch((error) => {
        console.error('Error updating quantity:', error);
        setQuantity(product.quantity); // Reset local quantity on error
      });
  };

  const decrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      
      // Make an API request to update the quantity on the server
      axios
        .put(`http://localhost:3000/cart/${product.title}`, { quantity: newQuantity })
        .then((response) => {
          // Update the product's quantity in the client-side state with the value from the server response
          updateQuantity(product, response.data.quantity);
        })
        .catch((error) => {
          console.error('Error updating quantity:', error);
          setQuantity(product.quantity); // Reset local quantity on error
        });
    }
  };

  const handleDelete = () => {
    deleteProduct(product.id);
  };

  return (
    <div className="cartContainer" key={product.id}>
      <img className="cartProductImage" src={product.image} alt={product.title} />
      <div className="cartProductTitle">{product.title}</div>
      <div className="cartProductPrice">${product.price}</div>
      <button onClick={decrement} className="incrementButton">
        -
      </button>
      <div className="quantityField">QTY: {quantity}</div>
      <button onClick={increment} className="decrementButton">
        +
      </button>
      <button onClick={handleDelete} className="deleteButton">
        Remove
      </button>
    </div>
  );
};

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCart, setShowCart] = useState(false); // Add showCart state

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cart');
        setProducts(response.data);
        setLoading(false);
        setShowCart(true); // Set showCart to true after the data is fetched
      } catch (error) {
        console.error('Error fetching cart items:', error);
        setLoading(false);
        setShowCart(true); // Set showCart to true on error as well
      }
    };
    fetchCartItems();
  }, []);

  const updateQuantity = async (product, newQuantity) => {
    try {
      await axios.put(`http://localhost:3000/cart/${product.title}`, { quantity: newQuantity });
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: newQuantity } : p
        )
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const deleteProduct = (productId) => {
    axios
      .delete(`http://localhost:3000/cart`)
      .then((response) => {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
        window.location.reload();
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {showCart ? (
        products.length === 0 ? (
          <div className='noItemsInCartMessage'>You don't have any items in your cart.</div>
        ) : (
          products.map((product) => (
            <Product
              product={product}
              key={product.id}
              updateQuantity={updateQuantity}
              deleteProduct={deleteProduct}
            />
          ))
        )
      ) : null}
    </>
  );
};

export default Cart;

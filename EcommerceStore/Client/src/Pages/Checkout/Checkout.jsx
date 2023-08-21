import React, { useState, useEffect } from 'react';
import './Checkout.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    firstName: '',
    lastName: '',
    streetAddress: '',
    state: '',
    zip: '',
    phone: '',
    email: '',
    paymentMethod: '',
  });

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/checkout`, { withCredentials: true });
        const consolidatedItems = consolidateItems(response.data);
        setCheckoutItems(consolidatedItems);
      } catch (error) {
        console.error('Error fetching checkout data:', error);
      }
    };
    fetchCheckoutItems();
  }, []);

  const consolidateItems = (items) => {
    const consolidatedMap = new Map();
    items.forEach((item) => {
      if (consolidatedMap.has(item.title)) {
        consolidatedMap.set(item.title, {
          ...item,
          quantity: consolidatedMap.get(item.title).quantity + item.quantity,
        });
      } else {
        consolidatedMap.set(item.title, item);
      }
    });
    return Array.from(consolidatedMap.values());
  };

  const calculateTotalPrice = () => {
    const totalPrice = checkoutItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalPrice.toFixed(2);
  };

  const handleShippingChange = (e) => {
    setShippingInfo({
      ...shippingInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleCompleteOrder = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API}/checkout`, { withCredentials: true });
      setCheckoutItems([]);
      window.location.reload();
    } catch (error) {
      console.error('Error completing order:', error);
      alert('An error occurred while completing the order. Please try again later.');
    }
  };

  return (
    <>
      <div className="checkout-title">Checkout</div>
      <div className="checkoutContainer">
        <div className="shipping-section">
          <h2  className='checkoutHeader'>Shipping</h2>
          <form className="shipping-form">
          <input className='shippingInput' type="text" name="firstName" placeholder="First Name" onChange={handleShippingChange} />
          <input className='shippingInput' type="text" name="lastName" placeholder="Last Name" onChange={handleShippingChange} />
          <input className='shippingInput' type="text" name="streetAddress" placeholder="Street Address" onChange={handleShippingChange} />
          <input className='shippingInput' type="text" name="state" placeholder="State" onChange={handleShippingChange} />
          <input className='shippingInput' type="text" name="zip" placeholder="ZIP" onChange={handleShippingChange} />
          <input className='shippingInput' type="text" name="phone" placeholder="Phone" onChange={handleShippingChange} />
          <input className='shippingInput' type="email" name="email" placeholder="Email Address" onChange={handleShippingChange} />
          </form>
        </div>

        <div className="payment-section">
          <h2 className='checkoutHeader'>Payment</h2>
          <label className='checkoutInput'>
            <input type="radio" name="paymentMethod" value="applePay" onChange={handleShippingChange} />
            Apple Pay
          </label>
          <label className='checkoutInput'>
            <input type="radio" name="paymentMethod" value="googlePay" onChange={handleShippingChange} />
            Google Pay
          </label>
        </div>

        <div className="checkoutItemsContainer">
          {checkoutItems.map((item) => (
            <div key={item.title} className="checkoutItem">
              <div className="itemImageContainer">
                <img src={item.image} alt={item.title} className="itemImage" />
              </div>
              <div className="itemDetails">
                <div className="itemTitle">{item.title}</div>
                <div className="itemPrice">Price: ${item.price}</div>
                <div className="itemQuantity">Quantity: {item.quantity}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="totalPriceContainer">
          <strong>Total Price: ${calculateTotalPrice()}</strong>
        </div>
        <Link to="/confirmation">
          <button className="completeOrderButton" onClick={handleCompleteOrder}>
            Complete Order
          </button>
        </Link>
      </div>
    </>
  );
};

export default Checkout;

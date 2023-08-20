import React, { useState, useEffect } from "react";
import "./Checkout.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/checkout`,
          { withCredentials: true }
        );
        const consolidatedItems = consolidateItems(response.data);
        setCheckoutItems(consolidatedItems);
      } catch (error) {
        console.error("Error fetching checkout data:", error);
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

  const handleCompleteOrder = async () => {
    try {
      // Make the DELETE request to delete all items in the cart
      await axios.delete(`${import.meta.env.VITE_API}/checkout`, {
        withCredentials: true,
      });

      // Clear the checkout items after successful completion
      setCheckoutItems([]);
      window.location.reload();
    } catch (error) {
      console.error("Error completing order:", error);
      alert(
        "An error occurred while completing the order. Please try again later."
      );
    }
  };

  return (
    <>
      <div className="checkout-title">Checkout</div>
      <div className="checkoutContainer">
        <h2>Order Summary</h2>
        {checkoutItems.length === 0 ? (
          <div>No items in checkout.</div>
        ) : (
          <div className="checkoutItemsContainer">
            {checkoutItems.map((item) => (
              <div key={item.title} className="checkoutItem">
                <div className="itemImageContainer">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="itemImage"
                  />
                </div>
                <div className="itemDetails">
                  <div className="itemTitle">{item.title}</div>
                  <div className="itemPrice">Price: ${item.price}</div>
                  <div className="itemQuantity">Quantity: {item.quantity}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="totalPriceContainer">
          <strong>Total Price: ${calculateTotalPrice()}</strong>
        </div>
        <Link to="/confirmation">
          <button className="completeOrderButton" onClick={handleCompleteOrder}>
            Complete Order
          </button>
        </Link>
      </div>

      <div className="whiteSpaceDiv"></div>
    </>
  );
};

export default Checkout;

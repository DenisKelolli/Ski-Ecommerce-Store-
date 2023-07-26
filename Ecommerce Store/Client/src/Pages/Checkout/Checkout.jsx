import React, { useState, useEffect } from 'react';
import './Checkout.css';
import axios from 'axios';

const Checkout = () => {
  const [checkoutItems, setCheckoutItems] = useState([]);

  useEffect(() => {
    const fetchCheckoutItems = async () => {
      try {
        const response = await axios.get('http://localhost:3000/checkout');
        const consolidatedItems = consolidateItems(response.data);
        setCheckoutItems(consolidatedItems);
      } catch (error) {
        console.error('Error fetching checkout data:', error);
      }
    };
    fetchCheckoutItems();
  }, []);

  const consolidateItems = (items) => {
    // Create a map to store consolidated items with their quantities
    const consolidatedMap = new Map();

    // Loop through the items and update quantities in the map
    items.forEach((item) => {
      if (consolidatedMap.has(item.title)) {
        // Item with the same title exists, update the quantity
        consolidatedMap.set(item.title, {
          ...item,
          quantity: consolidatedMap.get(item.title).quantity + item.quantity,
        });
      } else {
        // Item doesn't exist in the map, add it with the current quantity
        consolidatedMap.set(item.title, item);
      }
    });

    // Convert the map values back to an array of consolidated items
    return Array.from(consolidatedMap.values());
  };

  const calculateTotalPrice = () => {
    const totalPrice = checkoutItems.reduce((total, item) => total + item.price * item.quantity, 0);
    return totalPrice.toFixed(2); 
  };

  return (
    <div className="checkoutContainer">
      <h2>Order Summary</h2>
      {checkoutItems.length === 0 ? (
        <div>No items in checkout.</div>
      ) : (
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
                {/* You can display other item details here if needed */}
              </div>
            </div>
          ))}
        </div>
      )}

      
      <div className="totalPriceContainer">
        <strong>Total Price: ${calculateTotalPrice()}</strong>
      </div>
    </div>
  );
};

export default Checkout;

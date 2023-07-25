import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../Shared Components/Sidebar';
import './Snowboard.css';
import ProductCard from '../../Shared Components/ProductCard';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';

const Snowboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    const fetchSnowboard = async () => {
      try {
        const response = await axios.get('http://localhost:3000/snowboard');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching ski data:', error);
      }
    };
    fetchSnowboard();
  }, []);

  // Callback function to receive the selected category from Sidebar
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsFilterApplied(true);
  };

  // Callback function to receive the selected sorting option from Sidebar
  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
  };

  // Use the useContext hook to access the CartContext
  const { handleAddToCart } = useContext(CartContext);

  
  // Function to add the selected product to the cart
  const addToCart = async (productData) => {
    try {
      // Make a POST request to your /cart endpoint with the product data
      await axios.post('http://localhost:3000/cart', productData);
      // Now you can call the handleAddToCart function to update your local cart state
      handleAddToCart(productData);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // Filter and sort products based on the selected category and sorting option
  let filteredProducts = isFilterApplied && selectedCategory !== 'all'
    ? products.filter(product => product['sidebar-category'] === selectedCategory)
    : products;

  if (selectedSort === 'lowestPrice') {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'highestPrice') {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <div className="skiContainer">
      {/* Pass the callback functions to the Sidebar */}
      <Sidebar onCategorySelect={handleCategorySelect} onSortSelect={handleSortSelect} />

      <div className="skiMainGridContainer">
        {filteredProducts.map((product) => {
          const imageUrl = `http://localhost:3000${product.image}`;
          return (
            <ProductCard
              key={product.id}
              id={product.id}
              image={imageUrl}
              title={product.title}
              price={product.price}
              onAddToCart={addToCart} // Use the addToCart function as the callback prop
            />
          );
        })}
      </div>
    </div>
  );
};

export default Snowboard;

import React, { useState, useEffect, useContext } from 'react';
import Sidebar from '../../Shared Components/Sidebar';
import './Ski.css';
import ProductCard from '../../Shared Components/ProductCard';
import axios from 'axios';
import { CartContext } from '../../context/CartContext'; 

const Ski = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedSort, setSelectedSort] = useState('');
  const [isFilterApplied, setIsFilterApplied] = useState(false);

  useEffect(() => {
    const fetchSkis = async () => {
      try {
        const response = await axios.get('http://localhost:3000/ski');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching ski data:', error);
      }
    };
    fetchSkis();
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
              onAddToCart={handleAddToCart} 
            />
          );
        })}
      </div>
    </div>
  );
};

export default Ski;

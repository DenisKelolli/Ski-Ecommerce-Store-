import React, { useState, useEffect } from 'react';
import Sidebar from '../../Shared Components/Sidebar';
import "./Ski.css";
import ProductCard from '../../Shared Components/ProductCard';
import axios from "axios";


const Ski = () => {
  const [products, setProducts] = useState([]);

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



  return (
    <div className="skiContainer">
      <Sidebar className="sidebar" />

      <div className="skiMainGridContainer">
        {products.map((product) => {
            
            const imageUrl = `http://localhost:3000${product.image}`;

          return (
            <ProductCard
              key={product.id}
              id={product.id}
              image={imageUrl}
              title={product.title}
              price={product.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Ski;

import React, { useState, useEffect, useContext } from "react";
import Sidebar from "../../Shared Components/Sidebar";
import "./Inventory.css";
import ProductCard from "../../Shared Components/ProductCard";
import axios from "axios";
import { CartContext } from "../../context/cartContext";
import { useParams } from "react-router-dom";

const Inventory = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [selectedSort, setSelectedSort] = useState("");
  const [isFilterApplied, setIsFilterApplied] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { handleAddToCart } = useContext(CartContext);

  axios.defaults.withCredentials = true; // Include credentials in requests

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API}/${category}`
        );
        setProducts(response.data);
      } catch (error) {
        console.error(`Error fetching ${category} data:`, error);
      }
    };
    fetchProducts();
  }, [category]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsFilterApplied(true);
  };

  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
  };

  const addToCart = async (productData) => {
    try {
      productData.quantity = 1;
      await axios.post(`${import.meta.env.VITE_API}/cart`, productData);
      handleAddToCart(productData);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  let filteredProducts =
    isFilterApplied && selectedCategory !== "all"
      ? products.filter(
          (product) => product["sidebar-category"] === selectedCategory
        )
      : products;

  if (selectedSort === "lowestPrice") {
    filteredProducts = filteredProducts.sort((a, b) => a.price - b.price);
  } else if (selectedSort === "highestPrice") {
    filteredProducts = filteredProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <>
      <div className="skiContainer">
        <Sidebar
          onCategorySelect={handleCategorySelect}
          onSortSelect={handleSortSelect}
        />
        <div className="skiMainGridContainer">
          {filteredProducts.map((product) => {
            const imageUrl = `${import.meta.env.VITE_API}/${product.image}`;
            return (
              <ProductCard
                key={product._id}
                id={product._id}
                image={imageUrl}
                title={product.title}
                price={product.price}
                onAddToCart={addToCart}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Inventory;

import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ onCategorySelect, onSortSelect }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedSort, setSelectedSort] = useState('');

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    // Pass the selected option to the parent component (Ski)
    onCategorySelect(selectedValue);
  };

  const handleSortChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedSort(selectedValue);

    // Pass the selected sort option to the parent component (Ski)
    onSortSelect(selectedValue);
  };

  return (
    <div className="sidebar-container">
      <h2>Categories</h2>
      <div className="sidebar-options">
        <label>
          <input
            type="radio"
            value="all"
            checked={selectedOption === 'all'}
            onChange={handleOptionChange}
          />
          All
        </label>
        <label>
          <input
            type="radio"
            value="men"
            checked={selectedOption === 'men'}
            onChange={handleOptionChange}
          />
          Men's
        </label>
        <label>
          <input
            type="radio"
            value="women"
            checked={selectedOption === 'women'}
            onChange={handleOptionChange}
          />
          Women's
        </label>
        <label>
          <input
            type="radio"
            value="kids"
            checked={selectedOption === 'kids'}
            onChange={handleOptionChange}
          />
          Kids'
        </label>
      </div>

      <h2>Sort</h2>
      <div className="sidebar-options">
        <label>
          <input
            type="radio"
            value="lowestPrice"
            checked={selectedSort === 'lowestPrice'}
            onChange={handleSortChange}
          />
          Lowest Price
        </label>
        <label>
          <input
            type="radio"
            value="highestPrice"
            checked={selectedSort === 'highestPrice'}
            onChange={handleSortChange}
          />
          Highest Price
        </label>
      </div>
    </div>
  );
};

export default Sidebar;

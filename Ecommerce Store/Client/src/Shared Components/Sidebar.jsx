import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="sidebar-container">
      <h2>Categories</h2>
      <div className="sidebar-options">
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
    </div>
  );
};

export default Sidebar;

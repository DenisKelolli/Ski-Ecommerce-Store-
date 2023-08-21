import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API}/register`, formData);
      console.log(response.data);
      alert("Registration successful!");
      navigate('/signin');
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setShowPopup(true);
        setPopupMessage("Username is already taken. Please choose another username.");
      } else {
        alert("Registration failed. Please try again later.");
      }
    }
  };

  const passwordMismatch = formData.password !== formData.confirmPassword;

  return (
    <div className="form-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit}>
        <div className={`form-group ${passwordMismatch ? 'error' : ''}`}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="username"
            required
          />
        </div>
        <div className={`form-group ${passwordMismatch ? 'error' : ''}`}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="password"
            required
          />
        </div>
        <div className={`form-group ${passwordMismatch ? 'error' : ''}`}>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="password"
            required
          />
          {passwordMismatch && <p className="error-message">Passwords do not match.</p>}
        </div>
        <button className='register-submit-button' type="submit">Register</button>
      </form>

      {showPopup && (
        <div className="popup">
          <p className="popup-message">{popupMessage}</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;

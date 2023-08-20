import React from 'react';
import './Toast.css';

const Toast = ({ message }) => {
  return (
    <div className="toast-container">
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
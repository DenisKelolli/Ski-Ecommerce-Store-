import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const logOut = () => {
    setLoggedInUser(null); // Update the loggedInUser state to null after logging out
  };

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};
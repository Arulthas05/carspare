import React, { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default is not logged in
  const [username, setUsername] = useState(""); // Store the username here

  const login = (user) => {
    setIsAuthenticated(true);  // Call this on successful login
    setUsername(user); // Set the username
  };

  const logout = () => {
    setIsAuthenticated(false);  // Call this on logout
    setUsername("");  // Reset username on logout
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username }}>
      {children}
    </AuthContext.Provider>
  );
};

import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  // Retrieve stored values from localStorage or use defaults
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true" || false;
  });
  const [username, setUsername] = useState(() => {
    return localStorage.getItem("username") || "";
  });
  const [userId, setUserId] = useState(() => {
    return localStorage.getItem("userId") || "";
  });

  // Save login state to localStorage on successful login
  const login = (user, id) => {
    setIsAuthenticated(true);
    setUsername(user);
    setUserId(id);

    // Persist to localStorage
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("username", user);
    localStorage.setItem("userId", id);
  };

  // Clear state and remove from localStorage on logout
  const logout = () => {
    setIsAuthenticated(false);
    setUsername("");
    setUserId("");

    // Clear from localStorage
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

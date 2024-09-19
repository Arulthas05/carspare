import React, { createContext, useState } from "react";

// Create the context
export const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Default is not logged in
  const [username, setUsername] = useState(""); // Store the username here
  const[userId,setUserId]=useState("")

  const login = (user,id) => {
    setIsAuthenticated(true);  // Call this on successful login
    setUsername(user); // Set the username
    setUserId(id)
  };

  const logout = () => {
    setIsAuthenticated(false);  // Call this on logout
    setUsername("");  // Reset username on logout
    setUserId("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, username ,userId}}>
      {children}
    </AuthContext.Provider>
  );
};

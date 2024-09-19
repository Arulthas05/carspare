import React, { useState, useContext } from "react"; // Import useContext here
import "./App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavBar from "./components/NavBar";
import SlideShow from "./components/SlideShow";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Manage from "./components/Manage";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider, AuthContext } from "./components/AuthContext"; // Ensure correct path and import AuthContext
import Logout from "./components/Logout";
import Blog from "./components/Blog";
import AdminNavBar from "./components/AdminNavBar";

function App() {
  // Lift the cart state to the App component
  const [cart, setCart] = useState([]);

  // Wrap BrowserRouter with AuthProvider
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent cart={cart} setCart={setCart} />
      </BrowserRouter>
    </AuthProvider>
  );
}

function AppContent({ cart, setCart }) {
  const location = useLocation();
  const { username, userId } = useContext(AuthContext); // Destructure from AuthContext
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isDashboard = location.pathname === "/dashboard";

  // Check if the user is an admin (using username instead of user)
  const isAdmin = username === "admin123@gmail.com";

  return (
    <>
      {/* Conditionally render NavBar */}
      {!isLogin && !isRegister && !isDashboard && <NavBar isAdmin={isAdmin} showCartIcon={true} cart={cart} pathname={location.pathname} username={username} />}
      {isDashboard && <AdminNavBar isAdmin={isAdmin} showCartIcon={true} cart={cart} pathname={location.pathname} username={username} />}
      
      <Routes>
        <Route
          path="/"
          element={
            <SlideShow cart={cart} setCart={setCart} username={username} userId={userId} />
          }
        />
        <Route
          path="/services"
          element={
            <Home cart={cart} setCart={setCart} username={username} userId={userId} />
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart cart={cart} setCart={setCart} />
            </ProtectedRoute>
          }
        />
        <Route path="/manage" element={<Manage />} />
        <Route path="/blogs" element={<Blog />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>

      {/* Conditionally render Footer */}
      {!isLogin && !isRegister && !isDashboard && <Footer />}
    </>
  );
}

export default App;

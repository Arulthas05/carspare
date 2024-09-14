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
  const { username } = useContext(AuthContext); // Now useContext is correctly defined
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";
  const isDashboard = location.pathname === "/dashboard";

  return (
    <>
      {/* Conditionally render NavBar and Footer */}
      {!isLogin && !isRegister && <NavBar showCartIcon={true} cart={cart} pathname={location.pathname}  />}
      
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <SlideShow />
            </ProtectedRoute>
          }
        />
        <Route
          path="/services"
          element={
            <ProtectedRoute>
              <Home cart={cart} setCart={setCart} />
            </ProtectedRoute>
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
        <Route
          path="/manage"
          element={
            <ProtectedRoute>
              <Manage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout/>} />
      </Routes>

      {!isLogin && !isRegister && !isDashboard&&<Footer />}
    </>
  );
}

export default App;

import { useState } from "react";
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

function App() {
  // Lift the cart state to the App component
  const [cart, setCart] = useState([]);

  // Move BrowserRouter outside to ensure location is available inside
  return (
    <BrowserRouter>
      <AppContent cart={cart} setCart={setCart} />
    </BrowserRouter>
  );
}

function AppContent({ cart, setCart }) {
  const location = useLocation();
  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/register";

  return (
    <>
      {/* Conditionally render NavBar and Footer */}
      {!isLogin && !isRegister && <NavBar showCartIcon={true} cart={cart} />}
      
      <Routes>
        <Route path="/" element={<SlideShow />} />
        <Route path="/services" element={<Home cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

      {!isLogin && !isRegister && <Footer />}
    </>
  );
}

export default App;

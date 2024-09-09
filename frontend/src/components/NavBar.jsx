import React, { useState } from "react";
import "./NavBar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

function NavBar({ showCartIcon, cart }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown

  const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // const handleMouseEnter = () => {
  //   setIsDropdownOpen(true); 
  // };
  const handleClick = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  // const handleMouseLeave = () => {
  //   setIsDropdownOpen(false); 
  // };

  return (
    <nav className="navbar">
      <div className="navbar-brand">CarSpare</div>
      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <a href="#about">About</a>
        </li>
        <li>
          <Link to={"/manage"}>Manage</Link>
        </li>
        <li>
          <Link to={"/services"}>Services</Link>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
        {showCartIcon && (
          <li>
            <Link to={"/cart"}>
              <div className="cart-icon-wrapper">
                <ShoppingCartOutlinedIcon className="cartIcon" />
                {totalQuantity > 0 && (
                  <span className="cart-badge">{totalQuantity}</span>
                )}
              </div>
            </Link>
          </li>
        )}
        {/* User Icon with Dropdown */}
        <li
          className="user-icon-wrapper"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <AccountCircleOutlinedIcon className="userIcon" />
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              <li>
                <Link to={"/login"}>Login/Signup</Link>
              </li>
              <li>
                <Link to={"/logout"}>Logout</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
}

export default NavBar;

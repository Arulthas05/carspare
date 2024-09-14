import React, { useState } from "react";
import "./AdminNavBar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

function AdminNavBar({ showCartIcon, cart ,pathname}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const [searchQuery, setSearchQuery] = useState(""); // State for search bar input

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

  // Handle search query input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">CarSpare</div>
      {/* Conditionally render the search bar only on /services route */}
      {pathname === "/services" && (
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      )}

      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
       
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

export default AdminNavBar;

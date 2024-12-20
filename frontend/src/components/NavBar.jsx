import React, { useState } from "react";
import "./NavBar.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link } from "react-router-dom";

function NavBar({ isAdmin, showCartIcon, cart, pathname, username }) {
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
      {pathname === "/services"&&(
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      )}

      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
         {/* Conditionally hide the "Services" link if the user is admin */}
         {!isAdmin && (
          <li>
            <Link to={"/services"}>Services</Link>
          </li>
        )}
        {/* <li>
          <Link to={"/manage"}>Manage</Link>
        </li> */}
        <li>
            <Link to={"/blogs"}>Blogs</Link>
          </li>
        {/* {(pathname === "/services"||pathname === "/")&& ( */}
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
        {/* )} */}
        {/* User Icon with Dropdown */}
        <li
          className="user-icon-wrapper"
          // onMouseEnter={handleMouseEnter}
          // onMouseLeave={handleMouseLeave}
          onClick={handleClick}
        >
          <AccountCircleOutlinedIcon className="userIcon" />
          {username && <span className="username">{username}</span>}{" "}
          {/* Display username */}
          {isDropdownOpen && (
            <ul className="dropdown-menu">
              {!username && (
                <li>
                  <Link to={"/login"}>Login/Signup</Link>
                </li>
              )}
              {username && (
                <li>
                  <Link to={"/logout"}>Logout</Link>
                </li>
              )}
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

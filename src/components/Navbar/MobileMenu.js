import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHome, FaShoppingCart, FaThLarge, FaHeart, FaInfoCircle, FaPhone, FaSignOutAlt, FaSignInAlt, FaBars, FaTimes, } from "react-icons/fa";
import "./MobileMenu.css";
import logo from "../../assets/Medikart-logo.png";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const menuItems = [
    { name: "Home", icon: <FaHome />, path: "/" },
    { name: "Shop", icon: <FaShoppingCart />, path: "/shop" },
    { name: "Categories", icon: <FaThLarge />, path: "/categories" },
    { name: "Wishlist", icon: <FaHeart />, path: "/wishlist" },
    { name: "Cart", icon: <FaShoppingCart />, path: "/cart" },
    { name: "About", icon: <FaInfoCircle />, path: "/about" },
    { name: "Contact", icon: <FaPhone />, path: "/contact" },
  ];

  const closeMenu = () => setIsOpen(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    closeMenu();
    navigate("/login");
  };

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(true)}
      >
        <FaBars />
      </button>

      {isOpen && (
        <div
          className="mobile-overlay"
          onClick={closeMenu}
        ></div>
      )}

      <div className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={closeMenu}
        >
          <FaTimes />
        </button>

        <div className="sidebar-header">
          <img
            src={logo}
            alt="Medikart Logo"
            className="sidebar-logo"
          />
          <h2>MEDIKART</h2>
        </div>

        <ul className="mobile-nav-links">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={closeMenu}
                className={({ isActive }) =>
                  isActive ? "active" : ""
                }
              >
                <span className="icon">{item.icon}</span>
                <span>{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="logout-container">
          {user ? (
            <button
              className="logout-btn"
              onClick={handleLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          ) : (
            <button
              className="logout-btn"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
            >
              <FaSignInAlt /> Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
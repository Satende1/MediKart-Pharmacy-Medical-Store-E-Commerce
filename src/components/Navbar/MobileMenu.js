import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./MobileMenu.css";
import logo from "../../assets/Medikart-logo.png";

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", icon: "🏠", path: "/" },
    { name: "Shop", icon: "🛒", path: "/shop" },
    { name: "Categories", icon: "📦", path: "/categories" },
    { name: "Wishlist", icon: "❤️", path: "/wishlist" },
    { name: "Cart", icon: "🛍️", path: "/cart" },
    { name: "About", icon: "ℹ️", path: "/about" },
    { name: "Contact", icon: "📞", path: "/contact" },
  ];

  const handleLogout = () => {
    // Remove user data
    localStorage.removeItem("user");

    // Close sidebar
    setIsOpen(false);

    // Redirect to Login page
    navigate("/login");
  };

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setIsOpen(true)}
      >
        ☰
      </button>

      {isOpen && (
        <div
          className="mobile-overlay"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div className={`mobile-sidebar ${isOpen ? "open" : ""}`}>
        <button
          className="close-btn"
          onClick={() => setIsOpen(false)}
        >
          ✕
        </button>

        <div className="sidebar-header">
          <img
            src={logo}
            alt="Medikart Logo"
            className="sidebar-logo"
          />
          <h2>MediKart</h2>
        </div>

        <ul className="mobile-nav-links">
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                onClick={() => setIsOpen(false)}
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
          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
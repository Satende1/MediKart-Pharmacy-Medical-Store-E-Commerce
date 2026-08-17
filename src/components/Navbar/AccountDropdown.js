import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { FaUserCircle, FaBoxOpen, FaTruck, FaHeart, FaShoppingCart, FaCreditCard, FaMapMarkerAlt, FaFileMedical, FaHeartbeat, FaGift, FaBell, FaCog, FaSignOutAlt, } from "react-icons/fa";

import "./AccountDropdown.css";

const AccountDropdown = ({ username = "Satender" }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("isLoggedIn");

    window.dispatchEvent(new Event("userUpdated"));

    navigate("/login");
  };

  return (
    <div className="account-dropdown">

      {/* Account Header */}
      <div className="account-header">
        <FaUserCircle className="account-avatar" />

        <div className="account-user-info">
          <h3>My Account</h3>
          <p>Hi, {username} 👋</p>
        </div>
      </div>

      <div className="account-divider"></div>

      {/* My Profile */}
      <Link to="/profile" className="account-item">
        <FaUserCircle />
        <span>My Profile</span>
      </Link>

      {/* My Orders */}
      <Link to="/orders" className="account-item">
        <FaBoxOpen />
        <span>My Orders</span>
      </Link>

      {/* Track Order */}
      <Link to="/track-order" className="account-item">
        <FaTruck />
        <span>Track Order</span>
      </Link>

      {/* Wishlist */}
      <Link to="/wishlist" className="account-item">
        <FaHeart />
        <span>Wishlist</span>
      </Link>

      {/* My Cart */}
      <Link to="/cart" className="account-item">
        <FaShoppingCart />
        <span>My Cart</span>
      </Link>

      {/* Saved Payments */}
      <Link to="/payments" className="account-item">
        <FaCreditCard />
        <span>Saved Payments</span>
      </Link>

      {/* Saved Addresses */}
      <Link to="/addresses" className="account-item">
        <FaMapMarkerAlt />
        <span>Saved Addresses</span>
      </Link>

      {/* Upload Prescription */}
      <Link
        to="/upload-prescription"
        className="account-item"
      >
        <FaFileMedical />
        <span>Upload Prescription</span>
      </Link>

      {/* Health Records */}
      <Link
        to="/health-records"
        className="account-item"
      >
        <FaHeartbeat />
        <span>Health Records</span>
      </Link>

      {/* Offers */}
      <Link
        to="/offers"
        className="account-item"
      >
        <FaGift />
        <span>Offers & Coupons</span>
      </Link>

      {/* Notifications */}
      <Link
        to="/notifications"
        className="account-item"
      >
        <FaBell />
        <span>Notifications</span>
      </Link>

      {/* Settings */}
      <Link
        to="/settings"
        className="account-item"
      >
        <FaCog />
        <span>Settings</span>
      </Link>

      <div className="account-divider"></div>

      {/* Logout */}
      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </div>
  );
};

export default AccountDropdown;

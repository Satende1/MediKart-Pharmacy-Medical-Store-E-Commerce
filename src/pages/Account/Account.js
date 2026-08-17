import React from "react";
import { useNavigate } from "react-router-dom";

import {
  FaBoxOpen,
  FaHeart,
  FaLanguage,
  FaPhoneAlt,
  FaFileMedical,
  FaPrescriptionBottleAlt,
  FaMapMarkerAlt,
  FaWallet,
  FaStar,
  FaGift,
  FaUserCog,
  FaQuestionCircle,
  FaShieldAlt,
  FaSignOutAlt,
  FaChevronRight,
  FaHome,
  FaShoppingBag,
  FaBell,
  FaClipboardList,
} from "react-icons/fa";

import "./Account.css";

const Account = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user")) || {
    name: "Satender",
    phone: "+91-XXXXXXXXXX",
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="account-page">

      {/* Header */}
      <div className="account-header">
        <h2>My Account</h2>

        <div className="profile-section">
          <div className="profile-avatar">
            {user.name?.charAt(0)?.toUpperCase() || "S"}
          </div>

          <div className="profile-info">
            <h3>Hi {user.name || "User"}</h3>
            <p>{user.phone || "+91-XXXXXXXXXX"}</p>
          </div>
        </div>
      </div>


      {/* Quick Actions */}
      <div className="quick-actions">

        <div
          className="quick-card"
          onClick={() => navigate("/orders")}
        >
          <FaBoxOpen />
          <span>Orders</span>
        </div>

        <div
          className="quick-card"
          onClick={() => navigate("/wishlist")}
        >
          <FaHeart />
          <span>Saved Items</span>
        </div>

        <div className="quick-card">
          <FaLanguage />
          <span>Language</span>
        </div>

        <div
          className="quick-card"
          onClick={() => navigate("/contact")}
        >
          <FaPhoneAlt />
          <span>Contact Us</span>
        </div>

      </div>


      {/* Healthcare Options */}
      <section className="account-section">

        <h4>Healthcare Options</h4>

        <div
          className="account-item"
          onClick={() => navigate("/orders")}
        >
          <div className="item-left">
            <FaClipboardList className="item-icon" />

            <div>
              <span>Medicine Orders</span>
              <small>Track and manage your medicine orders</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />
        </div>


        <div
          className="account-item"
          onClick={() => navigate("/prescriptions")}
        >
          <div className="item-left">
            <FaPrescriptionBottleAlt className="item-icon" />

            <div>
              <span>My Prescriptions</span>
              <small>View and manage your prescriptions</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />
        </div>


        <div
          className="account-item"
          onClick={() => navigate("/health-records")}
        >
          <div className="item-left">
            <FaFileMedical className="item-icon" />

            <div>
              <span>Health Records</span>
              <small>Manage your health documents</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />
        </div>

      </section>


      {/* Account Options */}
      <section className="account-section">

        <h4>Account Options</h4>

        <div
          className="account-item"
          onClick={() => navigate("/addresses")}
        >
          <div className="item-left">
            <FaMapMarkerAlt className="item-icon" />

            <div>
              <span>Saved Addresses</span>
              <small>Manage your delivery addresses</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />
        </div>


        <div
          className="account-item"
          onClick={() => navigate("/wallet")}
        >
          <div className="item-left">
            <FaWallet className="item-icon" />

            <div>
              <span>Payments & Wallet</span>
              <small>Manage payment methods and wallet</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />
        </div>


        <div className="account-item">
          <div className="item-left">
            <FaBell className="item-icon" />

            <div>
              <span>Notifications</span>
              <small>Manage your notification preferences</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />
        </div>


        <div
          className="account-item"
          onClick={() => navigate("/settings")}
        >
          <div className="item-left">
            <FaUserCog className="item-icon" />

            <div>
              <span>Account Settings</span>
              <small>Manage your profile and preferences</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />
        </div>

      </section>


      {/* MEDIKART Rewards */}
      <section className="account-section">

        <h4>MEDIKART Rewards</h4>

        <div className="account-item">

          <div className="item-left">
            <FaGift className="item-icon" />

            <div>
              <span>MEDIKART Rewards</span>
              <small>Earn points on your healthcare purchases</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />

        </div>


        <div
          className="account-item"
          onClick={() => navigate("/reviews")}
        >

          <div className="item-left">
            <FaStar className="item-icon" />

            <div>
              <span>My Reviews</span>
              <small>Rate and review your purchases</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />

        </div>

      </section>


      {/* Help */}
      <section className="account-section">

        <h4>Help & Information</h4>

        <div
          className="account-item"
          onClick={() => navigate("/help")}
        >

          <div className="item-left">
            <FaQuestionCircle className="item-icon" />

            <div>
              <span>Help & Support</span>
              <small>Get help with your MEDIKART orders</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />

        </div>


        <div className="account-item">

          <div className="item-left">
            <FaShieldAlt className="item-icon" />

            <div>
              <span>Privacy & Policies</span>
              <small>Terms, privacy and refund policies</small>
            </div>
          </div>

          <FaChevronRight className="arrow" />

        </div>

      </section>


      {/* Logout */}
      <button className="logout-btn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>


      <p className="app-version">
        MEDIKART App Version: 1.0.0
      </p>


      {/* Bottom Navigation */}
      <div className="mobile-bottom-nav">

        <div onClick={() => navigate("/")}>
          <FaHome />
          <span>Home</span>
        </div>

        <div onClick={() => navigate("/shop")}>
          <FaShoppingBag />
          <span>Shop</span>
        </div>

        <div onClick={() => navigate("/orders")}>
          <FaBoxOpen />
          <span>Orders</span>
        </div>

        <div className="active">
          <FaUserCog />
          <span>Account</span>
        </div>

      </div>

    </div>
  );
};

export default Account;
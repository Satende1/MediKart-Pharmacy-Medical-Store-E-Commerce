/* eslint-disable jsx-a11y/anchor-is-valid */
import "./Footer.css";
import React from "react";

import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Brand */}
        <div className="footer-section">
          <h2 className="footer-logo">
            Medi<span>Kart</span>
          </h2>
          <p>
            Your trusted online pharmacy for medicines, healthcare products,
            wellness essentials, and medical devices delivered to your doorstep.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/categories">Categories</a></li>
            <li><a href="/offers">Offers</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3>Categories</h3>
          <ul>
            <li>Medicines</li>
            <li>Healthcare</li>
            <li>Personal Care</li>
            <li>Supplements</li>
            <li>Medical Devices</li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-section">
          <h3>Customer Support</h3>
          <ul>
            <li>FAQs</li>
            <li>Shipping Policy</li>
            <li>Return Policy</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3>Contact Us</h3>

          <p>
            <FaMapMarkerAlt className="icon" />
            Hyderabad, Telangana
          </p>

          <p>
            <FaPhoneAlt className="icon" />
            +91 98765 43210
          </p>

          <p>
            <FaEnvelope className="icon" />
            support@medikart.com
          </p>

          <div className="social-icons">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} <strong>MediKart</strong>. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
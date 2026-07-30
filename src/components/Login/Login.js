import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaGoogle,
  FaFacebookF,
  FaApple,
  FaEnvelope,
} from "react-icons/fa";

import "./Login.css";
import banner from "../../assets/Login pages.png";
import ForgotPassword from "../ForgotPassword/ForgotPassword";

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();

  const [showForgot, setShowForgot] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      localStorage.setItem("username", formData.username);
      localStorage.setItem("isLoggedIn", "true");

      window.dispatchEvent(new Event("userUpdated"));

      if (onLoginSuccess) {
        onLoginSuccess();
      }

      navigate("/");
    }
  };

  return (
    <>
      <div className="login-container">

        <div className="login-left">
          <img
            src={banner}
            alt="Banner"
            className="banner-image"
          />
        </div>

        <div className="login-right">

          <div className="login-card">

            <h1>Welcome Back!</h1>

            <p className="subtitle">
              Login to continue to
              <span> MEDIKART</span>
            </p>

            <form onSubmit={handleSubmit}>

              <div className="input-box">
                <FaUser className="icon" />

                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>

              {errors.username && (
                <small className="error">
                  {errors.username}
                </small>
              )}

              <div className="input-box">
                <FaLock className="icon" />

                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              {errors.password && (
                <small className="error">
                  {errors.password}
                </small>
              )}

              <div className="options">

                <label>
                  <input
                    type="checkbox"
                    name="remember"
                    checked={formData.remember}
                    onChange={handleChange}
                  />
                  Remember Me
                </label>

                <button
                  type="button"
                  className="forgot-link"
                  onClick={() => setShowForgot(true)}
                >
                  Forgot Password?
                </button>

              </div>

              <button
                className="login-btn"
                type="submit"
              >
                Login
              </button>

            </form>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="social-login">

              <a
                href="https://accounts.google.com"
                target="_blank"
                rel="noreferrer"
                className="google"
              >
                <FaGoogle />
                <span>Google</span>
              </a>

              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="facebook"
              >
                <FaFacebookF />
                <span>Facebook</span>
              </a>

              <a
                href="https://appleid.apple.com"
                target="_blank"
                rel="noreferrer"
                className="apple"
              >
                <FaApple />
                <span>Apple</span>
              </a>

            </div>

            <p className="signup-text">
              Don't have an account?
              <Link to="/register"> Sign Up</Link>
            </p>

            <div className="support">
              <FaEnvelope />
              <span>support@medikart.com</span>
            </div>

          </div>

        </div>

      </div>

      {showForgot && (
        <div
          className="popup-overlay"
          onClick={() => setShowForgot(false)}
        >
          <div
            className="popup-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-popup"
              onClick={() => setShowForgot(false)}
            >
              ✕
            </button>

            <ForgotPassword />

          </div>
        </div>
      )}
    </>
  );
}

export default Login;
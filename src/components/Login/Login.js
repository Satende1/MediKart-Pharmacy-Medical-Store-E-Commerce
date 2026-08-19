import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaApple,
  FaTimes,
} from "react-icons/fa";

import "./Login.css";

const Login = ({ onClose }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  /* =====================================================
     CLOSE POPUP
  ===================================================== */

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    /* ===================================================
       REGISTERED USER
    =================================================== */

    if (registeredUser) {
      if (
        email !== registeredUser.email &&
        email !== registeredUser.username
      ) {
        alert("Email or username is incorrect.");
        return;
      }

      if (password !== registeredUser.password) {
        alert("Incorrect password.");
        return;
      }

      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
        "username",
        registeredUser.name || registeredUser.username
      );

      localStorage.setItem(
        "user",
        JSON.stringify(registeredUser)
      );

      if (remember) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      window.dispatchEvent(new Event("userUpdated"));

      navigate("/");

      return;
    }

    /* ===================================================
       DEMO LOGIN
    =================================================== */

    if (
      email === "admin@medikart.com" &&
      password === "123456"
    ) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("username", "Satender");

      if (remember) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      window.dispatchEvent(new Event("userUpdated"));

      navigate("/");
    } else {
      alert("Invalid email/username or password.");
    }
  };

  return (
    <div
      className="login-popup-overlay"
      onClick={handleClose}
    >

      <div
        className="login-popup"
        onClick={(e) => e.stopPropagation()}
      >

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          className="login-close-button"
          onClick={handleClose}
          aria-label="Close login"
        >
          <FaTimes />
        </button>

        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <div className="auth-image-section">

          <img
            src="/images/login.png"
            alt="MEDIKART Login"
            className="auth-image"
          />

          <div className="image-overlay">

            <h1>
              Welcome to MEDIKART
            </h1>

            <p>
              Your trusted online healthcare
              & pharmacy partner.
            </p>

          </div>

        </div>

        {/* =================================================
            RIGHT LOGIN
        ================================================= */}

        <div className="auth-form-section">

          <div className="auth-form-box">

            {/* LOGO */}

            <div className="auth-logo">
              <span>MEDI</span>
              <strong>KART</strong>
            </div>

            <h2>
              Login
            </h2>

            <p className="auth-subtitle">
              Login to continue shopping with MEDIKART
            </p>

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleLogin}>

              {/* EMAIL */}

              <div className="input-group">

                <FaUser className="input-icon" />

                <input
                  type="text"
                  placeholder="Email or Username"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="username"
                />

              </div>

              {/* PASSWORD */}

              <div className="input-group">

                <FaLock className="input-icon" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              {/* OPTIONS */}

              <div className="login-options">

                <label>

                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) =>
                      setRemember(
                        e.target.checked
                      )
                    }
                  />

                  <span>
                    Remember me
                  </span>

                </label>

                <Link to="/forgot-password">
                  Forgot Password?
                </Link>

              </div>

              {/* LOGIN */}

              <button
                type="submit"
                className="auth-button"
              >
                Login
              </button>

            </form>

            {/* OR */}

            <div className="or-divider">
              <span>OR</span>
            </div>

            {/* SOCIAL */}

            <div className="social-login">

              <button
                type="button"
                aria-label="Google login"
              >
                <FaGoogle />
              </button>

              <button
                type="button"
                aria-label="Facebook login"
              >
                <FaFacebookF />
              </button>

              <button
                type="button"
                aria-label="Apple login"
              >
                <FaApple />
              </button>

            </div>

            {/* REGISTER */}

            <p className="switch-auth">

              Don't have an account?

              <Link to="/register">
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
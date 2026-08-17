import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaTwitter,
  FaShoppingCart,
  FaApple,
  FaPlus,
} from "react-icons/fa";

import "./Login.css";

// Put your image inside:
// src/assets/login-image.png
import loginImage from "../../assets/Login pages.png";

const Login = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = (e) => {
    e.preventDefault();

    // Get registered user
    const registeredUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    // User is not registered
    if (!registeredUser) {
      alert("You are not registered. Please register first.");
      navigate("/register");
      return;
    }

    // Check username/email/name
    const usernameMatch =
      username === registeredUser.username ||
      username === registeredUser.email ||
      username === registeredUser.name;

    // Check password
    const passwordMatch =
      password === registeredUser.password;

    // Correct login
    if (usernameMatch && passwordMatch) {
      localStorage.setItem("isLoggedIn", "true");

      localStorage.setItem(
        "user",
        JSON.stringify(registeredUser)
      );

      const displayName =
        registeredUser.username ||
        registeredUser.name ||
        registeredUser.email ||
        "User";

      localStorage.setItem("username", displayName);

      // notify other components to update (Navbar/UserActions)
      window.dispatchEvent(new Event("userUpdated"));

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberMe");
      }

      if (onLoginSuccess) onLoginSuccess();

      navigate("/");
    } else {
      alert("Invalid username/email or password.");
    }
  };

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="login-page">

      <div className="login-container">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="login-left">

          <img
            src={loginImage}
            alt="Medikart Healthcare"
            className="login-image"
          />

          {/* IMAGE OVERLAY */}

          <div className="left-overlay"></div>

          {/* LEFT TEXT */}

          <div className="left-content">

            <h2>
              Your Health,
              <br />
              <strong>Our Priority</strong>
            </h2>

            <p>
              Medikart is your trusted
              <br />
              online pharmacy for genuine
              <br />
              medicines and healthcare
              <br />
              essentials.
            </p>

          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="login-right">

          <div className="login-content">

            {/* =================================================
                MEDIKART LOGO
            ================================================= */}

            <div className="medikart-logo">

              <div className="logo-icon">

                <FaShoppingCart />

                <FaPlus className="logo-plus" />

              </div>

              <div className="logo-details">

                <h1>MEDIKART</h1>

                <p>
                  Your Trusted Healthcare Partner
                </p>

              </div>

            </div>

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="login-header">

              <h2>Welcome Back!</h2>

              <p>
                Login to your account and continue
              </p>

            </div>

            {/* =================================================
                LOGIN FORM
            ================================================= */}

            <form onSubmit={handleLogin}>

              {/* USERNAME */}

              <div className="input-box">

                <FaUser className="input-icon" />

                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                />

              </div>

              {/* PASSWORD */}

              <div className="input-box">

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
                  required
                />

                <button
                  type="button"
                  className="eye-button"
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

              {/* =================================================
                  REMEMBER ME + FORGOT PASSWORD
              ================================================= */}

              <div className="login-options">

                {/* REMEMBER ME */}

                <label className="remember">

                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                  />

                  <span className="custom-checkbox">
                    {rememberMe ? "✓" : ""}
                  </span>

                  <span>
                    Remember me
                  </span>

                </label>

                {/* FORGOT PASSWORD */}

                <button
                  type="button"
                  className="forgot"
                  onClick={() =>
                    navigate("/forgot-password")
                  }
                >
                  Forgot Password?
                </button>

              </div>

              {/* =================================================
                  LOGIN BUTTON
              ================================================= */}

              <button
                type="submit"
                className="login-button"
              >
                Login
              </button>

            </form>

            {/* =================================================
                OR LOGIN WITH
            ================================================= */}

            <div className="or-login">

              <div className="line"></div>

              <span>Or login with</span>

              <div className="line"></div>

            </div>

            {/* =================================================
                SOCIAL MEDIA ICONS
            ================================================= */}

            <div className="social-icons">

              {/* Google */}
              <button
                type="button"
                className="social google"
                aria-label="Login with Google"
              >
                <FaGoogle />
              </button>

              {/* Facebook */}
              <button
                type="button"
                className="social facebook"
                aria-label="Login with Facebook"
              >
                <FaFacebookF />
              </button>

              {/* Twitter */}
              <button
                type="button"
                className="social twitter"
                aria-label="Login with Twitter"
              >
                <FaTwitter />
              </button>

              {/* Apple */}
              <button
                type="button"
                className="social apple"
                aria-label="Login with Apple"
              >
                <FaApple />
              </button>

            </div>

            {/* =================================================
                REGISTER
            ================================================= */}

            <div className="register">

              <span>
                Don't have an account?
              </span>

              <button
                type="button"
                onClick={() =>
                  navigate("/register")
                }
              >
                Register
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;
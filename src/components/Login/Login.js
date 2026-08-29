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
     CLOSE LOGIN
  ===================================================== */

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      navigate("/");
    }
  };

  /* =====================================================
     CLOSE WHEN CLICKING OUTSIDE
  ===================================================== */

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  /* =====================================================
     LOGIN
  ===================================================== */

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Please enter email and password.");
      return;
    }

    let registeredUser = null;

    try {
      const storedUser =
        localStorage.getItem("registeredUser");

      if (storedUser) {
        registeredUser = JSON.parse(storedUser);
      }
    } catch (error) {
      console.error(
        "Error reading registered user:",
        error
      );
    }

    /* =================================================
       REGISTERED USER LOGIN
    ================================================= */

    if (registeredUser) {
      const enteredEmail =
        email.trim().toLowerCase();

      const registeredEmail =
        registeredUser.email
          ?.trim()
          .toLowerCase();

      const registeredUsername =
        registeredUser.username
          ?.trim()
          .toLowerCase();

      if (
        enteredEmail !== registeredEmail &&
        enteredEmail !== registeredUsername
      ) {
        alert(
          "Email or username is incorrect."
        );
        return;
      }

      if (
        password !== registeredUser.password
      ) {
        alert("Incorrect password.");
        return;
      }

      /* LOGIN SUCCESS */

      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "username",
        registeredUser.name ||
        registeredUser.username ||
        registeredUser.email
      );

      localStorage.setItem(
        "user",
        JSON.stringify(registeredUser)
      );

      /* REMEMBER ME */

      if (remember) {
        localStorage.setItem(
          "rememberMe",
          "true"
        );
      } else {
        localStorage.removeItem(
          "rememberMe"
        );
      }

      /* UPDATE NAVBAR */

      window.dispatchEvent(
        new Event("userUpdated")
      );

      /* CLOSE LOGIN */

      handleClose();

      return;
    }

    /* =================================================
       DEMO LOGIN
    ================================================= */

    const enteredEmail =
      email.trim().toLowerCase();

    if (
      enteredEmail ===
      "admin@medikart.com" &&
      password === "123456"
    ) {
      localStorage.setItem(
        "isLoggedIn",
        "true"
      );

      localStorage.setItem(
        "username",
        "Satender"
      );

      localStorage.setItem(
        "user",
        JSON.stringify({
          name: "Satender",
          username: "Satender",
          email: "admin@medikart.com",
        })
      );

      /* REMEMBER ME */

      if (remember) {
        localStorage.setItem(
          "rememberMe",
          "true"
        );
      } else {
        localStorage.removeItem(
          "rememberMe"
        );
      }

      /* UPDATE NAVBAR */

      window.dispatchEvent(
        new Event("userUpdated")
      );

      /* CLOSE */

      handleClose();
    } else {
      alert(
        "Invalid email/username or password."
      );
    }
  };

  return (
    <div
      className="login-popup-overlay"
      onMouseDown={handleOverlayClick}
    >
      {/* =================================================
          LOGIN POPUP
      ================================================= */}

      <div
        className="login-popup"
        onMouseDown={(e) =>
          e.stopPropagation()
        }
      >
        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          type="button"
          className="login-close-button"
          onClick={handleClose}
          aria-label="Close login"
          title="Close"
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
            RIGHT FORM
        ================================================= */}

        <div className="auth-form-section">
          <div className="auth-form-box">

            {/* LOGO */}

            <div className="auth-logo">
              <span>MEDI</span>
              <strong>KART</strong>
            </div>

            {/* HEADING */}

            <h2>Login</h2>

            <p className="auth-subtitle">
              Login to continue shopping with
              MEDIKART
            </p>

            {/* =================================================
                FORM
            ================================================= */}

            <form onSubmit={handleLogin}>

              {/* EMAIL */}

              <div className="input-group">
                <FaUser
                  className="input-icon"
                />

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
                <FaLock
                  className="input-icon"
                />

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
                    setShowPassword(
                      (previous) =>
                        !previous
                    )
                  }
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                  title={
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
                  OPTIONS
              ================================================= */}

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

              {/* LOGIN BUTTON */}

              <button
                type="submit"
                className="auth-button"
              >
                Login
              </button>

            </form>

            {/* =================================================
                OR
            ================================================= */}

            <div className="or-divider">
              <span>OR</span>
            </div>

            {/* =================================================
                SOCIAL LOGIN
            ================================================= */}

            <div className="social-login">

              <button
                type="button"
                aria-label="Google login"
                title="Google"
              >
                <FaGoogle />
              </button>

              <button
                type="button"
                aria-label="Facebook login"
                title="Facebook"
              >
                <FaFacebookF />
              </button>

              <button
                type="button"
                aria-label="Apple login"
                title="Apple"
              >
                <FaApple />
              </button>

            </div>

            {/* =================================================
                REGISTER
            ================================================= */}

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
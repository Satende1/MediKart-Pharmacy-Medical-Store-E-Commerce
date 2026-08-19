import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaTimes,
} from "react-icons/fa";

import "./Register.css";

const Register = ({ onClose }) => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  /* ==========================================
     CLOSE POPUP
  ========================================== */

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  /* ==========================================
     REGISTER
  ========================================== */

  const handleRegister = (e) => {
    e.preventDefault();

    if (
      !name ||
      !username ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      alert("Please enter all required details.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const existingUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (existingUser) {
      if (existingUser.email === email) {
        alert("Email is already registered.");
        return;
      }

      if (existingUser.username === username) {
        alert("Username is already registered.");
        return;
      }
    }

    const newUser = {
      name,
      username,
      email,
      password,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(newUser)
    );

    alert("Account created successfully!");

    navigate("/login");
  };

  return (
    <div
      className="auth-page"
      onClick={handleClose}
    >

      <div
        className="auth-container register-container"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ==========================================
            CLOSE BUTTON
        ========================================== */}

        <button
          type="button"
          className="register-close-button"
          onClick={handleClose}
        >
          <FaTimes />
        </button>

        {/* ==========================================
            LEFT FORM
        ========================================== */}

        <div className="register-form-section">

          <div className="register-form-box">

            {/* LOGO */}

            <div className="auth-logo">
              <span>MEDI</span>
              <strong>KART</strong>
            </div>

            {/* TITLE */}

            <h2>Create Account</h2>

            <p className="auth-subtitle">
              Create your account to continue shopping
              with MEDIKART
            </p>

            <form onSubmit={handleRegister}>

              {/* NAME */}

              <div className="input-group">

                <FaUser />

                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

              </div>

              {/* USERNAME */}

              <div className="input-group">

                <FaUser />

                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                />

              </div>

              {/* EMAIL */}

              <div className="input-group">

                <FaEnvelope />

                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />

              </div>

              {/* PASSWORD */}

              <div className="input-group">

                <FaLock />

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
                />

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              {/* CONFIRM PASSWORD */}

              <div className="input-group">

                <FaLock />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                />

                <button
                  type="button"
                  className="password-eye"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
                  }
                >
                  {showConfirmPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}
                </button>

              </div>

              {/* REGISTER BUTTON */}

              <button
                type="submit"
                className="auth-button"
              >
                Create Account
              </button>

            </form>

            {/* LOGIN */}

            <p className="switch-auth">

              Already have an account?

              <Link to="/login">
                Login
              </Link>

            </p>

          </div>

        </div>

        {/* ==========================================
            RIGHT IMAGE
        ========================================== */}

        <div className="auth-image-section">

          <img
            src="/images/register.png"
            alt="MEDIKART Register"
            className="auth-image"
          />

          <div className="image-overlay">

            <h1>
              Join MEDIKART
            </h1>

            <p>
              Your trusted online healthcare
              & pharmacy partner.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
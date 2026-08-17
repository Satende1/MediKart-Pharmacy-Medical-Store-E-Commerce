import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaShoppingCart,
  FaPlus,
} from "react-icons/fa";

import "./Register.css";

import registerImage from "../../assets/Medikart-logo.png";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    // Check password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    // Check existing user
    const existingUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    if (existingUser) {
      alert("User is already registered. Please login.");
      navigate("/login");
      return;
    }

    // Store user
    const user = {
      name: formData.name,
      username: formData.username,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    // Automatically login after registration
    localStorage.setItem("isLoggedIn", "true");

    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );

    alert("Registration successful!");

    navigate("/");
  };

  return (
    <div className="register-page">

      <div className="register-container">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="register-left">

          <img
            src={registerImage}
            alt="Medikart Healthcare"
            className="register-image"
          />

          <div className="register-overlay"></div>

          <div className="register-left-content">

            <h2>
              Your Health,
              <br />
              <strong>Our Priority</strong>
            </h2>

            <p>
              Join Medikart today and get
              <br />
              access to genuine medicines,
              <br />
              healthcare products and
              <br />
              wellness essentials.
            </p>

          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="register-right">

          <div className="register-content">

            {/* =================================================
                LOGO
            ================================================= */}

            <div className="register-logo">

              <div className="register-logo-icon">

                <FaShoppingCart />

                <FaPlus className="register-logo-plus" />

              </div>

              <div className="register-logo-details">

                <h1>MEDIKART</h1>

                <p>
                  Your Trusted Healthcare Partner
                </p>

              </div>

            </div>

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="register-header">

              <h2>Create Account</h2>

              <p>
                Register to start your healthcare journey
              </p>

            </div>

            {/* =================================================
                FORM
            ================================================= */}

            <form
              className="register-form"
              onSubmit={handleRegister}
            >

              {/* NAME */}

              <div className="register-input-box">

                <FaUser className="register-input-icon" />

                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* USERNAME */}

              <div className="register-input-box">

                <FaUser className="register-input-icon" />

                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* EMAIL */}

              <div className="register-input-box">

                <FaEnvelope className="register-input-icon" />

                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PHONE */}

              <div className="register-input-box">

                <FaPhone className="register-input-icon" />

                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

              </div>

              {/* PASSWORD */}

              <div className="register-input-box">

                <FaLock className="register-input-icon" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="register-eye-button"
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

              <div className="register-input-box">

                <FaLock className="register-input-icon" />

                <input
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="register-eye-button"
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

              {/* TERMS */}

              <label className="terms">

                <input
                  type="checkbox"
                  required
                />

                <span>
                  I agree to the Terms & Conditions
                </span>

              </label>

              {/* REGISTER BUTTON */}

              <button
                type="submit"
                className="register-submit"
              >
                Create Account
              </button>

            </form>



            <div className="register-or">

              <div></div>

              <span>Or register with</span>

              <div></div>

            </div>



            {/* =================================================
                LOGIN LINK
            ================================================= */}

            <div className="already-account">

              <span>
                Already have an account?
              </span>

              <button
                type="button"
                onClick={() => navigate("/login")}
              >
                Login
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Register;
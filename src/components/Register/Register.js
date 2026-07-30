import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
} from "react-icons/fa";
import "./Register.css";
import logo from "../../assets/Medikart-logo.png";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    terms: false,
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

    let validationErrors = {};

    if (!formData.name.trim()) {
      validationErrors.name = "Full Name is required";
    }

    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
    } else if (
      !/\S+@\S+\.\S+/.test(formData.email)
    ) {
      validationErrors.email = "Invalid email address";
    }

    if (!formData.mobile.trim()) {
      validationErrors.mobile = "Mobile Number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      validationErrors.mobile =
        "Enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password =
        "Password must be at least 6 characters";
    }

    if (
      formData.password !== formData.confirmPassword
    ) {
      validationErrors.confirmPassword =
        "Passwords do not match";
    }

    if (!formData.terms) {
      validationErrors.terms =
        "Accept Terms & Conditions";
    }

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      localStorage.setItem(
        "medikartUser",
        JSON.stringify(formData)
      );

      alert("Registration Successful!");

      navigate("/login");
    }
  };

  return (
    <div className="register-page">

      <div className="register-card">

        <img
          src={logo}
          alt="MEDIKART"
          className="register-logo"
        />

        <h2>Create Account</h2>

        <p>Join MEDIKART Today</p>

        <form onSubmit={handleSubmit}>

          <div className="input-box">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <span className="error">
            {errors.name}
          </span>

          <div className="input-box">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <span className="error">
            {errors.email}
          </span>

          <div className="input-box">
            <FaPhone className="input-icon" />
            <input
              type="tel"
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </div>

          <span className="error">
            {errors.mobile}
          </span>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <span className="error">
            {errors.password}
          </span>

          <div className="input-box">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          <span className="error">
            {errors.confirmPassword}
          </span>

          <div className="terms">
            <label>
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
              />
              I accept Terms & Conditions
            </label>
          </div>

          <span className="error">
            {errors.terms}
          </span>

          <button
            type="submit"
            className="register-btn"
          >
            Register
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <Link to="/login">
            {" "}
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;
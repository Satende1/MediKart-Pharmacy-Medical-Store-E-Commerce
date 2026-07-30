import React, { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!pattern.test(email)) {
      setError("Enter a valid email");
      return;
    }

    setError("");
    setSuccess("Reset link has been sent successfully.");
  };

  return (
    <div className="forgot-card">

      <h2>Forgot Password</h2>

      <p>
        Enter your registered email address.
      </p>

      <form onSubmit={handleSubmit}>

        <div className="forgot-input">

          <FaEnvelope className="forgot-icon" />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />

        </div>

        {error && <p className="error">{error}</p>}

        {success && (
          <p className="success">
            {success}
          </p>
        )}

        <button className="forgot-btn">
          Send Reset Link
        </button>

      </form>

    </div>
  );
}

export default ForgotPassword;
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ShippingAddress.css";

function ShippingAddress() {
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem(
      "shippingAddress",
      JSON.stringify(address)
    );

    // Navigate to Order Summary page
    navigate("/order-summary");
  };

  return (
    <div className="shipping-card">
      <h2>📍 Shipping Address</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={address.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="tel"
          name="phone"
          placeholder="Mobile Number"
          value={address.phone}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={address.email}
          onChange={handleChange}
          required
        />

        <textarea
          name="address"
          placeholder="House No, Street, Area"
          value={address.address}
          onChange={handleChange}
          required
        />

        <div className="address-row">
          <input
            type="text"
            name="city"
            placeholder="City"
            value={address.city}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={address.state}
            onChange={handleChange}
            required
          />
        </div>

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={address.pincode}
          onChange={handleChange}
          required
        />

        <button type="submit">
          Continue to Order Summary
        </button>
      </form>
    </div>
  );
}

export default ShippingAddress;
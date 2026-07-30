import React, { useState } from "react";
import "./Checkout.css";

function Checkout() {
  const [payment, setPayment] = useState("cod");

  return (
    <div className="checkout-page">

      <h1>Checkout</h1>

      <div className="checkout-container">

        {/* Left Side */}
        <div className="checkout-left">

          <div className="card">
            <h2>Delivery Address</h2>

            <input type="text" placeholder="Full Name" />
            <input type="text" placeholder="Mobile Number" />
            <input type="email" placeholder="Email Address" />
            <textarea placeholder="House No, Street, Area"></textarea>

            <div className="row">
              <input type="text" placeholder="City" />
              <input type="text" placeholder="State" />
            </div>

            <input type="text" placeholder="Pincode" />
          </div>

          <div className="card">
            <h2>Payment Method</h2>

            <label>
              <input
                type="radio"
                value="cod"
                checked={payment === "cod"}
                onChange={(e) => setPayment(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label>
              <input
                type="radio"
                value="upi"
                checked={payment === "upi"}
                onChange={(e) => setPayment(e.target.value)}
              />
              UPI
            </label>

            <label>
              <input
                type="radio"
                value="card"
                checked={payment === "card"}
                onChange={(e) => setPayment(e.target.value)}
              />
              Credit / Debit Card
            </label>

            <label>
              <input
                type="radio"
                value="netbanking"
                checked={payment === "netbanking"}
                onChange={(e) => setPayment(e.target.value)}
              />
              Net Banking
            </label>
          </div>

        </div>

        {/* Right Side */}
        <div className="checkout-right">

          <div className="card">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Products</span>
              <span>₹560</span>
            </div>

            <div className="summary-row">
              <span>Delivery</span>
              <span>FREE</span>
            </div>

            <div className="summary-row total">
              <span>Total</span>
              <span>₹560</span>
            </div>

            <button className="place-order-btn">
              Place Order
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Checkout;
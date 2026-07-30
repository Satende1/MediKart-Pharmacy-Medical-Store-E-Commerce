import React from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaTruck,
  FaCreditCard,
  FaShoppingCart,
} from "react-icons/fa";
import "./OrderSummary.css";

function OrderSummary() {
  const cartItems =
    JSON.parse(localStorage.getItem("cart")) || [];

  const address =
    JSON.parse(localStorage.getItem("shippingAddress")) || {};

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const hasDevice = cartItems.some(
    (item) =>
      item.category === "Medical Devices" ||
      item.category === "Device"
  );

  const deliveryCharge = hasDevice ? 100 : 0;

  const total = subtotal + deliveryCharge;

  return (
    <div className="order-summary-page">

      <h1>Order Summary</h1>

      {/* Shipping Address */}
      <div className="summary-card">
        <h2>
          <FaMapMarkerAlt /> Shipping Address
        </h2>

        <p><strong>{address.fullName}</strong></p>
        <p>{address.phone}</p>
        <p>{address.email}</p>
        <p>{address.address}</p>
        <p>
          {address.city}, {address.state} -
          {address.pincode}
        </p>
      </div>

      {/* Products */}
      <div className="summary-card">
        <h2>
          <FaShoppingCart /> Products
        </h2>

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="product-card"
          >
            <img
              src={item.image}
              alt={item.name}
            />

            <div className="product-info">
              <h3>{item.name}</h3>

              <p>Category : {item.category}</p>

              <p>Quantity : {item.quantity}</p>

              <p>
                Price : ₹
                {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bill Details */}
      <div className="summary-card">
        <h2>Bill Details</h2>

        <div className="row">
          <span>Total Items</span>
          <span>{totalItems}</span>
        </div>

        <div className="row">
          <span>Subtotal</span>
          <span>₹{subtotal.toLocaleString()}</span>
        </div>

        <div className="row">
          <span>
            <FaTruck /> Delivery
          </span>

          <span>
            {deliveryCharge === 0
              ? "FREE"
              : `₹${deliveryCharge}`}
          </span>
        </div>

        <hr />

        <div className="total">
          <span>Total Amount</span>

          <span>
            ₹{total.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Payment */}
      <div className="summary-card">
        <h2>
          <FaCreditCard /> Payment
        </h2>

        <p>
          Payment method will be selected
          on the next page.
        </p>
      </div>

      <Link
        to="/payment"
        className="payment-btn"
      >
        Continue to Payment
      </Link>

    </div>
  );
}

export default OrderSummary;
import React from "react";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaShoppingBag,
} from "react-icons/fa";
import "./OrderSuccess.css";

function OrderSuccess() {

  const orderId =
    "MK" + Math.floor(Math.random() * 1000000);

  return (
    <div className="success-page">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with
          <strong> MEDIKART</strong>.
        </p>

        <div className="order-box">
          <p>
            <strong>Order ID:</strong>
          </p>

          <h2>{orderId}</h2>

          <p>
            Estimated Delivery:
            <strong> 2-3 Days</strong>
          </p>
        </div>

        <Link to="/shop">
          <button className="shop-btn">
            <FaShoppingBag />
            &nbsp; Continue Shopping
          </button>
        </Link>

      </div>

    </div>
  );
}

export default OrderSuccess;
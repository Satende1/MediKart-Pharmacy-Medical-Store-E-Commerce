import React, { useState } from "react";
import "./Payment.css";

function Payment() {
  const [payment, setPayment] = useState("cod");

  const placeOrder = () => {
    alert("Order Placed Successfully!");

    localStorage.removeItem("cart");

    window.location.href = "/";
  };

  return (
    <div className="payment-card">

      <h2>💳 Payment Method</h2>

      <label>
        <input
          type="radio"
          value="cod"
          checked={payment === "cod"}
          onChange={(e) =>
            setPayment(e.target.value)
          }
        />
        Cash on Delivery
      </label>

      <label>
        <input
          type="radio"
          value="upi"
          checked={payment === "upi"}
          onChange={(e) =>
            setPayment(e.target.value)
          }
        />
        UPI
      </label>

      <label>
        <input
          type="radio"
          value="credit"
          checked={payment === "credit"}
          onChange={(e) =>
            setPayment(e.target.value)
          }
        />
        Credit Card
      </label>

      <label>
        <input
          type="radio"
          value="debit"
          checked={payment === "debit"}
          onChange={(e) =>
            setPayment(e.target.value)
          }
        />
        Debit Card
      </label>

      <label>
        <input
          type="radio"
          value="netbanking"
          checked={payment === "netbanking"}
          onChange={(e) =>
            setPayment(e.target.value)
          }
        />
        Net Banking
      </label>

      <button
        className="payment-btn"
        onClick={placeOrder}
      >
        Place Order
      </button>

    </div>
  );
}

export default Payment;
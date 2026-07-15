import React from "react";
import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaTruck,
  FaCreditCard,
} from "react-icons/fa";

import styles from "./CartSummary.module.css";

const CartSummary = ({ totalItems, totalPrice }) => {
  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>
        Order Summary
      </h2>

      <div className={styles.row}>
        <span>
          <FaShoppingCart /> Total Items
        </span>

        <span>{totalItems}</span>
      </div>

      <div className={styles.row}>
        <span>
          <FaTruck /> Delivery
        </span>

        <span className={styles.free}>
          FREE
        </span>
      </div>

      <div className={styles.row}>
        <span>Platform Fee</span>

        <span>₹0</span>
      </div>

      <hr />

      <div className={styles.total}>
        <span>Total Amount</span>

        <span>
          ₹{totalPrice.toLocaleString()}
        </span>
      </div>

      <div className={styles.buttons}>
        <Link
          to="/shop"
          className={styles.continueBtn}
        >
          Continue Shopping
        </Link>

        <button
          className={styles.checkoutBtn}
        >
          <FaCreditCard />
          &nbsp; Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default CartSummary;
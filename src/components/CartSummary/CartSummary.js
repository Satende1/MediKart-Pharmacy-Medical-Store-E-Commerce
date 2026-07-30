import React from "react";
import { Link } from "react-router-dom";
import {FaShoppingCart,FaTruck,FaCreditCard,FaTag,FaRupeeSign,} from "react-icons/fa";

import styles from "./CartSummary.module.css";

const CartSummary = ({
  cartItems = [],
  totalItems,
  totalPrice,
}) => {
  // Delivery charge only for medical devices
  const hasDevice = cartItems.some(
    (item) =>
      item.category === "Medical Devices" ||
      item.category === "Device"
  );

  const deliveryCharge = hasDevice ? 100 : 0;

  const finalAmount = totalPrice + deliveryCharge;

  return (
    <div className={styles.summary}>
      <h2 className={styles.title}>
        Order Summary
      </h2>

      {/* Product List */}
      {cartItems.map((item) => (
        <div
          key={item.id}
          className={styles.productRow}
        >
          <span>
            📦 {item.name} × {item.quantity}
          </span>

          <span>
            ₹{(
              item.price * item.quantity
            ).toLocaleString()}
          </span>
        </div>
      ))}

      <hr />

      {/* Total Items */}
      <div className={styles.row}>
        <span>
          <FaShoppingCart /> Total Items
        </span>

        <span>{totalItems}</span>
      </div>

      {/* Product Price */}
      <div className={styles.row}>
        <span>
          <FaTag /> Product Price
        </span>

        <span>
          ₹{totalPrice.toLocaleString()}
        </span>
      </div>

      {/* Delivery Charge */}
      <div className={styles.row}>
        <span>
          <FaTruck /> Delivery Charge
        </span>

        <span>
          {deliveryCharge === 0
            ? "FREE"
            : `₹${deliveryCharge}`}
        </span>
      </div>

      <hr />

      {/* Total Amount */}
      <div className={styles.total}>
        <span>
          <FaRupeeSign /> Total Amount
        </span>

        <span>
          ₹{finalAmount.toLocaleString()}
        </span>
      </div>

      <div className={styles.buttons}>
        {/* Continue Shopping */}
        <Link
          to="/shop"
          className={styles.continueBtn}
        >
          Continue Shopping
        </Link>

        {/* Proceed to Checkout */}
        <Link
          to="/shipping-address"
          className={styles.checkoutBtn}
        >
          <FaCreditCard />
          &nbsp; Proceed to Checkout
        </Link>
      </div>
    </div>
  );
};

export default CartSummary;
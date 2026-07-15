import React from "react";
import {FaHeart,FaShoppingCart,FaStar,FaTrash,} from "react-icons/fa";
import styles from "./WishlistItem.module.css";

const WishlistItem = ({
  item,
  onMoveToCart,
  onRemove,
}) => {
  return (
    <div className={styles.card}>
      {/* Product Image */}
      <div className={styles.imageContainer}>
        <img
          src={item.image}
          alt={item.name}
          className={styles.image}
        />
      </div>

      {/* Product Details */}
      <div className={styles.details}>
        <h3 className={styles.name}>
          {item.name}
        </h3>

        <p className={styles.category}>
          {item.category}
        </p>

        <div className={styles.rating}>
          <FaStar />
          <span>{item.rating}</span>
        </div>

        <p className={styles.price}>
          ₹{Number(item.price).toLocaleString()}
        </p>
      </div>

      {/* Buttons */}
      <div className={styles.actions}>
        <button
          className={styles.cartBtn}
          onClick={() => onMoveToCart(item.id)}
        >
          <FaShoppingCart />
          Move to Cart
        </button>

        <button
          className={styles.removeBtn}
          onClick={() => onRemove(item.id)}
        >
          <FaTrash />
          Remove
        </button>
      </div>

      {/* Wishlist Icon */}
      <div className={styles.heart}>
        <FaHeart />
      </div>
    </div>
  );
};

export default WishlistItem;
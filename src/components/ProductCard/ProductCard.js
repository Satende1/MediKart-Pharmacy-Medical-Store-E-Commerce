import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) => item.id === product.id
    );

    let updatedCart;

    if (existingProduct) {
      updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity || 1) + 1,
            }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Update cart notification
    window.dispatchEvent(new Event("cartUpdated"));

    // Go to Cart page
    navigate("/cart");
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
        />
      </div>

      <div className={styles.info}>
        <span className={styles.category}>
          {product.category}
        </span>

        <h3 className={styles.name}>
          {product.name}
        </h3>

        <p className={styles.price}>
          ₹{product.price}
        </p>

        <p className={styles.rating}>
          ⭐ {product.rating}
        </p>

        <div className={styles.buttons}>
          <Link
            to={`/product/${product.id}`}
            className={styles.details}
          >
            View Details
          </Link>

          <button
            className={styles.cart}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
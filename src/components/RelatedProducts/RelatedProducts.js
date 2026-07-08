import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./RelatedProducts.module.css";

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();
  const [added, setAdded] = useState({});

  const handleAddToCart = (e, id) => {
    e.stopPropagation();

    setAdded((prev) => ({
      ...prev,
      [id]: true,
    }));

    setTimeout(() => {
      setAdded((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 2000);
  };

  return (
    <section className={styles.relatedProducts}>
      <h2 className={styles.relatedTitle}>Our Products</h2>

      <div className={styles.relatedGrid}>
        {products.map((product) => (
          <div
            key={product.id}
            className={styles.relatedCard}
          >
            <div
              className={styles.imageBox}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img
                src={product.image}
                alt={product.name}
                className={styles.productImage}
              />
            </div>

            <div className={styles.productInfo}>
              <span className={styles.category}>
                {product.category}
              </span>

              <h3 className={styles.productName}>
                {product.name}
              </h3>

              <p className={styles.productPrice}>
                ₹{product.price}
              </p>

              <p className={styles.rating}>
                ⭐ {product.rating}
              </p>

              <div className={styles.buttonGroup}>
                <button
                  className={styles.detailsBtn}
                  onClick={() =>
                    navigate(`/product/${product.id}`)
                  }
                >
                  View Details
                </button>

                <button
                  className={`${styles.cartBtn} ${
                    added[product.id] ? styles.added : ""
                  }`}
                  onClick={(e) =>
                    handleAddToCart(e, product.id)
                  }
                >
                  {added[product.id]
                    ? "✓ Added"
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
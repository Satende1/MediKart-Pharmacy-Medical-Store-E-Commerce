import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product, onAddToCart }) => {
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
            onClick={() => onAddToCart?.(product)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
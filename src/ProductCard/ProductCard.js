import React from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  return (
    <div className="product-card">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-price">₹{product.price}</p>

        <p className="product-rating">
          ⭐ {product.rating}
        </p>

        <div className="product-buttons">
          <button className="details-btn">
            View Details
          </button>

          <button className="cart-btn">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
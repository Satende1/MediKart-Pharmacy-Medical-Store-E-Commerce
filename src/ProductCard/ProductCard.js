import React, { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    // Reset after 2 seconds
    setTimeout(() => { setIsAdded(false); }, 2000);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />

      <div className="product-info">
        <h3>{product.name}</h3>

        <p className="product-price">₹{product.price}</p>

        <p className="product-rating"> ⭐ {product.rating} </p>

        <div className="product-buttons">
          <button className="details-btn"> View Details </button>

          <button className={`cart ${isAdded ? 'added' : ''}`}onClick={handleAddToCart}>
            {isAdded ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
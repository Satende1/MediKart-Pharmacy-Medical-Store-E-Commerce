import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TrendingProducts.css";

import product5 from "../assets/products/product5.png";
import product6 from "../assets/products/product6.png";
import product7 from "../assets/products/product7.png";
import product8 from "../assets/products/product8.png";

const trendingProducts = [
  {
    id: 4,
    name: "Digital Thermometer",
    price: 299,
    rating: 4.8,
    image: product5,
  },
  {
    id: 5,
    name: "Protein Powder",
    price: 899,
    rating: 4.7,
    image: product6,
  },
  {
    id: 6,
    name: "Face Wash",
    price: 249,
    rating: 4.9,
    image: product7,
  },
  {
    id: 7,
    name: "Vitamin D Capsules",
    price: 399,
    rating: 4.6,
    image: product8,
  },
];

function TrendingProducts() {
  const [addedItems, setAddedItems] = useState({});

  const handleAddToCart = (id) => {
    setAddedItems((prev) => ({
      ...prev,
      [id]: true,
    }));

    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 2000);
  };

  return (
    <section className="trending-products">
      <div className="container">
        <div className="trending-header">
          <h2>Trending Products</h2>
          <p>Explore the most popular healthcare products on Medikart</p>
        </div>

        <div className="trending-grid">
          {trendingProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <div className="product-info">
                <span className="category">{product.category}</span>

                <h3>{product.name}</h3>

                <p className="price">
                  <strong>₹{product.price}</strong>
                </p>

                <p className="rating">⭐ {product.rating}</p>

                <div className="button-group">
                  <Link
                    to={`/product/${product.id}`}
                    className="view-btn"
                  >
                    View Details
                  </Link>

                  <button
                    className={`cart-btn ${
                      addedItems[product.id] ? "added" : ""
                    }`}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {addedItems[product.id]
                      ? "✓ Added"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrendingProducts;
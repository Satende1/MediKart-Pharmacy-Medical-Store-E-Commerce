import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./FeaturedProducts.css";

import product1 from "../assets/products/product1.png";
import product2 from "../assets/products/product2.png";
import product3 from "../assets/products/product3.png";
import product4 from "../assets/products/product4.png";

const products = [
  {
    id: 1,
    name: "Paracetamol Tablets",
    price: 99,
    rating: 4.8,
    image: product1,
  },
  {
    id: 7,
    name: "Vitamin D Capsules",
    price: 249,
    rating: 4.7,
    image: product2,
  },
  {
    id: 2,
    name: "Blood Pressure Monitor",
    price: 1499,
    rating: 4.9,
    image: product3,
  },
  {
    id: 3,
    name: "Hand Sanitizer",
    price: 199,
    rating: 4.6,
    image: product4,
  },
];

function FeaturedProducts() {
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
    <section className="featured-products">
      <div className="container">
        <div className="featured-header">
          <h2>Featured Products</h2>
          <p>Discover our most popular healthcare products</p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />

              <div className="product-info">
                <span className="category">{product.category}</span>

                <h3>{product.name}</h3>

                <p className="price">₹{product.price}</p>

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

export default FeaturedProducts;
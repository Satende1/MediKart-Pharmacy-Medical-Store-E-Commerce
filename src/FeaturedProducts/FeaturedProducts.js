import React from "react";
import ProductCard from "../ProductCard/ProductCard";
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
    id: 2,
    name: "Vitamin C Capsules",
    price: 249,
    rating: 4.7,
    image: product2,
  },
  {
    id: 3,
    name: "Blood Pressure Monitor",
    price: 1499,
    rating: 4.9,
    image: product3,
  },
  {
    id: 4,
    name: "Hand Sanitizer",
    price: 199,
    rating: 4.6,
    image: product4,
  },
];

function FeaturedProducts() {
  return (
    <section className="featured-products">
      <div className="container">
        <div className="featured-header">
          <h2>Featured Products</h2>
          <p>
            Discover our most popular healthcare products
          </p>
        </div>

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import "./TrendingProducts.css";

import product5 from "../assets/products/product5.png";
import product6 from "../assets/products/product6.png";
import product7 from "../assets/products/product7.png";
import product8 from "../assets/products/product8.png";

const trendingProducts = [
  {
    id: 1,
    name: "Digital Thermometer",
    price: 299,
    rating: 4.8,
    image: product5,
  },
  {
    id: 2,
    name: "Protein Powder",
    price: 899,
    rating: 4.7,
    image: product6,
  },
  {
    id: 3,
    name: "Face Wash",
    price: 249,
    rating: 4.9,
    image: product7,
  },
  {
    id: 4,
    name: "Vitamin D Capsules",
    price: 399,
    rating: 4.6,
    image: product8,
  },
];

function TrendingProducts() {
  return (
    <section className="trending-products">
      <div className="container">
        <div className="trending-header">
          <h2>Trending Products</h2>
          <p>
            Explore the most popular healthcare products on Medikart
          </p>
        </div>

        <div className="trending-grid">
          {trendingProducts.map((product) => (
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

export default TrendingProducts;
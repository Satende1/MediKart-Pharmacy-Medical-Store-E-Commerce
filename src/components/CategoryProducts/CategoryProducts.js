import React from "react";
import { useParams } from "react-router-dom";
import medicines from "../data/medicines/medicines";

function CategoryProducts() {
  const { categoryName } = useParams();

  let products = [];

  if (categoryName === "medicines") {
    products = medicines;
  }

  return (
    <div className="container">
      <h2>{categoryName.toUpperCase()}</h2>

      <div className="product-grid">
        {products.map((item) => (
          <div key={item.id} className="product-card">
            <img src={item.image} alt={item.name} />

            <h3>{item.name}</h3>

            <p>{item.brand}</p>

            <h4>₹{item.price}</h4>

            <p>⭐ {item.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryProducts;
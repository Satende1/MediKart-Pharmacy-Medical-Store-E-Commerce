import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./RelatedProducts.css";

const RelatedProducts = ({ products }) => {
  const navigate = useNavigate();

  return (
    <section className="related-products">

      <h2 className="related-title">
        Our Products
      </h2>

      <div className="related-grid">

        {products.map((product) => (

          <div
            key={product.id}
            className="related-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >

            <div className="image-box">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
            </div>

            <div className="product-info">
              <h3 className="product-name">
                {product.name}
              </h3>
              <div className="product-price">
                ₹{product.price}
              </div>
              <div className="product-offer">
                {product.discount ? `${product.discount}% OFF` : "Best price"}
              </div>
            </div>

          </div>

        ))}

      </div>

    </section>
  );
};

export default RelatedProducts;
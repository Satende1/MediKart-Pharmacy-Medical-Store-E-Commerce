import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";

import products from "../../data/products";

import ProductGallery from "../../components/ProductGallery/ProductGallery";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import ProductSpecifications from "../../components/ProductSpecifications/ProductSpecifications";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  if (!product) {
    return (
      <div className="not-found">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const parseNumber = (value) => {
    const normalized = String(value).replace(/[^0-9.]/g, "");
    return Number(normalized) || 0;
  };

  const rawPrice = parseNumber(product.price);
  const discount = parseNumber(product.discount);
  const discountPrice = rawPrice - (rawPrice * discount) / 100;
  const totalAmount = discountPrice * quantity;
  const hasDiscount = discount > 0;
  const productImages = product.images?.length ? product.images : [product.image];
  const productDescription = product.description || "A premium product selected for your health and wellness needs.";

  const relatedProducts = products.filter(
    (item) => item.id !== product.id
  );

  return (
    <div className="product-page">

      <div className="product-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
      </div>

      {/* Main */}

      <div className="product-wrapper">

        <div className="left-column">
          <ProductGallery images={productImages} />
        </div>

        <div className="right-column">
          <h1 className="product-name">
            {product.name}
          </h1>

          <div className="rating-box">
            <div className="rating-badge">
              <FaStar />
              {product.rating}
            </div>
            <span>{product.reviews} Ratings</span>
          </div>

          <div className="price-box">
            <span className="discount-price">
              ₹{discountPrice.toFixed(2)}
            </span>
            {hasDiscount && (
              <>
                <span className="actual-price">
                  ₹{rawPrice.toFixed(2)}
                </span>
                <span className="discount">
                  {discount}% OFF
                </span>
              </>
            )}
          </div>

          <div className="description">
            <h3>Description</h3>
            <p>{productDescription}</p>
          </div>

          <div className="quantity-area">
            <h3>Quantity</h3>
            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>

          <div className="total-box">
            <div className="row">
              <span>Unit Price</span>
              <strong>₹{discountPrice.toFixed(2)}</strong>
            </div>
            <div className="row">
              <span>Quantity</span>
              <strong>{quantity}</strong>
            </div>
            <div className="row total">
              <span>Total Amount</span>
              <strong>₹{totalAmount.toFixed(2)}</strong>
            </div>
          </div>

          <div className="button-group">
            <button className="cart-btn">
              <FaShoppingCart />
              Add to Cart
            </button>
            <button className="buy-btn">
              <FaBolt />
              Buy Now
            </button>
            <button
              aria-label="Add to Wishlist"
              className={`wish-btn ${wishlist ? "active" : ""}`}
              onClick={() => setWishlist(!wishlist)}
            >
              <FaHeart />
            </button>
          </div>
        </div>

      </div>

      {/* Specifications */}

      <ProductSpecifications
        product={product}
      />

      {/* Related */}

      <RelatedProducts
        products={relatedProducts}
      />

    </div>
    
  );
};

export default ProductDetails;
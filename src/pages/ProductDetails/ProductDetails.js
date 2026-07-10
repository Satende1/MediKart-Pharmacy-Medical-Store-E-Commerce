import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";

import products from "../../data/products";

import ProductGallery from "../../components/ProductGallery/ProductGallery";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import ProductSpecifications from "../../components/ProductSpecifications/ProductSpecifications";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";

import "./ProductDetails.css";

import Footer from "../../components/Footer/Footer";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (item) => item.id === Number(id)
  );

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuantity(1);

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });

    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="loader"></div>
        <h2>Loading Product...</h2>
      </div>
    );
  }

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

  const discountPrice =
    rawPrice - (rawPrice * discount) / 100;

  const totalAmount = discountPrice * quantity;

  const hasDiscount = discount > 0;

  const productImages = product.images?.length
    ? product.images
    : [product.image];

  const productDescription =
    product.description ||
    "A premium product selected for your health and wellness needs.";

  const relatedProducts = products.filter(
    (item) => item.id !== product.id
  );

  const handleAddToCart = () => {
    setIsAdded(true);

    console.log(
      "Added to cart:",
      product.name,
      "Quantity:",
      quantity
    );

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  return (
    <div className="product-page">

      <div className="product-topbar">
        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
      </div>

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

            <span>
              {product.reviews} Ratings
            </span>
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
              <strong>
                ₹{discountPrice.toFixed(2)}
              </strong>
            </div>

            <div className="row">
              <span>Quantity</span>
              <strong>{quantity}</strong>
            </div>

            <div className="row total">
              <span>Total Amount</span>
              <strong>
                ₹{totalAmount.toFixed(2)}
              </strong>
            </div>

          </div>

          <div className="button-group">

            <button
              className={`cart-btn ${
                isAdded ? "added" : ""
              }`}
              onClick={handleAddToCart}
            >
              <FaShoppingCart />
              {isAdded
                ? "✓ Added"
                : "Add to Cart"}
            </button>

            <button className="buy-btn">
              <FaBolt />
              Buy Now
            </button>

            <button
              className={`wish-btn ${
                wishlist ? "active" : ""
              }`}
              onClick={() =>
                setWishlist(!wishlist)
              }
            >
              <FaHeart />
            </button>

          </div>

        </div>

      </div>

      <ProductSpecifications product={product} />

      <RelatedProducts products={relatedProducts} />
      <Footer />

    </div>
  );
};

export default ProductDetails;
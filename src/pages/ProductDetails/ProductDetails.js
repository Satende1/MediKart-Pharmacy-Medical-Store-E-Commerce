import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  FaHeart,
  FaShoppingCart,
  FaBolt,
  FaStar,
} from "react-icons/fa";

import products from "../../data/products";

import ProductGallery from "../../components/ProductGallery/ProductGallery";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
import ProductSpecifications from "../../components/ProductSpecifications/ProductSpecifications";
import RelatedProducts from "../../components/RelatedProducts/RelatedProducts";
import Footer from "../../components/Footer/Footer";

import "./ProductDetails.css";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // ==========================================
  // FIND PRODUCT
  // ==========================================

  const product = products.find(
    (item) => Number(item.id) === Number(id)
  );

  // ==========================================
  // STATES
  // ==========================================

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // PRODUCT CHANGE
  // ==========================================

  useEffect(() => {
    setQuantity(1);
    setLoading(true);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700);

    return () => clearTimeout(timer);
  }, [id]);

  // ==========================================
  // CHECK WISHLIST
  // ==========================================

  useEffect(() => {
    if (!product) return;

    const wishlistData =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    const exists = wishlistData.some(
      (item) =>
        Number(item.id) === Number(product.id)
    );

    setWishlist(exists);
  }, [product]);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="loadingContainer">
        <div className="loader"></div>

        <h2>Loading Product...</h2>
      </div>
    );
  }

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {
    return (
      <div className="not-found">

        <h2>Product Not Found</h2>

        <button
          className="back-shop-btn"
          onClick={() => navigate("/shop")}
        >
          Go to Shop
        </button>

      </div>
    );
  }

  // ==========================================
  // PRICE
  // ==========================================
  //
  // originalPrice = MRP
  // price         = FINAL SELLING PRICE
  // discount      = DISCOUNT PERCENTAGE
  //
  // Example:
  //
  // originalPrice: 45
  // price: 35
  // discount: 22
  //
  // Product Details:
  // ₹35   ₹45   22% OFF
  //
  // ==========================================

  const originalPrice = Number(
    product.originalPrice ?? product.price
  );

  const sellingPrice = Number(product.price);

  const discount = Number(
    product.discount || 0
  );

  // ==========================================
  // TOTAL AMOUNT
  // ==========================================

  const totalAmount =
    sellingPrice * quantity;

  // ==========================================
  // PRODUCT IMAGES
  // ==========================================

  const productImages =
    product.images &&
    product.images.length > 0
      ? product.images
      : product.image
      ? [product.image]
      : [];

  // ==========================================
  // ADD TO CART
  // ==========================================

  const handleAddToCart = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const existingProduct = cart.find(
      (item) =>
        Number(item.id) === Number(product.id)
    );

    let updatedCart;

    // Product already exists
    if (existingProduct) {
      updatedCart = cart.map((item) => {

        if (
          Number(item.id) ===
          Number(product.id)
        ) {
          return {
            ...item,

            // Keep original selling price
            price: sellingPrice,

            quantity:
              (item.quantity || 1) +
              quantity,
          };
        }

        return item;
      });
    }

    // New product
    else {
      updatedCart = [
        ...cart,

        {
          ...product,

          // Use product price directly
          price: sellingPrice,

          quantity: quantity,
        },
      ];
    }

    // Save cart
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Update navbar cart count
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Show added state
    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  // ==========================================
  // WISHLIST
  // ==========================================

  const handleWishlist = () => {
    let wishlistData =
      JSON.parse(
        localStorage.getItem("wishlist")
      ) || [];

    const exists = wishlistData.some(
      (item) =>
        Number(item.id) === Number(product.id)
    );

    // Remove from wishlist
    if (exists) {
      wishlistData = wishlistData.filter(
        (item) =>
          Number(item.id) !==
          Number(product.id)
      );

      setWishlist(false);
    }

    // Add to wishlist
    else {
      wishlistData.push(product);

      setWishlist(true);
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(wishlistData)
    );

    window.dispatchEvent(
      new Event("wishlistUpdated")
    );
  };

  // ==========================================
  // BUY NOW
  // ==========================================

  const handleBuyNow = () => {
    const buyNowProduct = {
      ...product,

      // Use exact product price
      price: sellingPrice,

      quantity: quantity,
    };

    localStorage.setItem(
      "buyNow",
      JSON.stringify(buyNowProduct)
    );

    navigate("/checkout");
  };

  // ==========================================
  // RELATED PRODUCTS
  // ==========================================

  const relatedProducts = products
    .filter(
      (item) =>
        Number(item.id) !==
        Number(product.id)
    )
    .filter(
      (item) =>
        item.category === product.category
    )
    .slice(0, 8);

  // ==========================================
  // RETURN UI
  // ==========================================

  return (
    <div className="product-page">

      {/* ======================================
          TOP BAR
      ====================================== */}

      <div className="product-topbar">

        <button
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>

      </div>

      {/* ======================================
          PRODUCT MAIN SECTION
      ====================================== */}

      <div className="product-wrapper">

        {/* ====================================
            LEFT COLUMN
        ==================================== */}

        <div className="left-column">

          <ProductGallery
            images={productImages}
          />

        </div>

        {/* ====================================
            RIGHT COLUMN
        ==================================== */}

        <div className="right-column">

          {/* PRODUCT NAME */}

          <h1 className="product-name">
            {product.name}
          </h1>

          {/* BRAND */}

          {product.brand && (
            <p className="product-brand">
              Brand:{" "}

              <strong>
                {product.brand}
              </strong>
            </p>
          )}

          {/* =================================
              RATING
          ================================= */}

          <div className="rating-box">

            <div className="rating-badge">

              <FaStar />

              {product.rating}

            </div>

            <span>
              {product.reviews || 0} Ratings
            </span>

          </div>

          {/* =================================
              PRICE
          ================================= */}

          <div className="price-box">

            {/* FINAL PRICE */}

            <span className="discount-price">
              ₹{sellingPrice.toFixed(2)}
            </span>

            {/* ORIGINAL PRICE */}

            {originalPrice >
              sellingPrice && (
              <span className="actual-price">
                ₹{originalPrice.toFixed(2)}
              </span>
            )}

            {/* DISCOUNT */}

            {discount > 0 && (
              <span className="discount">
                {discount}% OFF
              </span>
            )}

          </div>

          {/* =================================
              DESCRIPTION
          ================================= */}

          <div className="description">

            <h3>
              Description
            </h3>

            <p>
              {product.description ||
                "No description available for this product."}
            </p>

          </div>

          {/* =================================
              PRODUCT DETAILS
          ================================= */}

          

          {/* =================================
              QUANTITY
          ================================= */}

          <div className="quantity-area">

            <h3>
              Quantity
            </h3>

            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
            />

          </div>

          {/* =================================
              TOTAL PRICE
          ================================= */}

          <div className="total-box">

            {/* UNIT PRICE */}

            <div className="row">

              <span>
                Unit Price
              </span>

              <strong>
                ₹{sellingPrice.toFixed(2)}
              </strong>

            </div>

            {/* QUANTITY */}

            <div className="row">

              <span>
                Quantity
              </span>

              <strong>
                {quantity}
              </strong>

            </div>

            {/* TOTAL */}

            <div className="row total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹{totalAmount.toFixed(2)}
              </strong>

            </div>

          </div>

          {/* =================================
              BUTTON GROUP
          ================================= */}

          <div className="button-group">

            {/* ADD TO CART */}

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

            {/* BUY NOW */}

            <button
              className="buy-btn"
              onClick={handleBuyNow}
            >

              <FaBolt />

              Buy Now

            </button>

            {/* WISHLIST */}

            <button
              className={`wish-btn ${
                wishlist ? "active" : ""
              }`}
              onClick={handleWishlist}
            >

              <FaHeart />

            </button>

          </div>

        </div>

      </div>

      {/* ======================================
          SPECIFICATIONS
      ====================================== */}

      <ProductSpecifications
        product={product}
      />

      {/* ======================================
          RELATED PRODUCTS
      ====================================== */}

      {relatedProducts.length > 0 && (
        <RelatedProducts
          products={relatedProducts}
        />
      )}

      {/* ======================================
          FOOTER
      ====================================== */}

      <Footer />

    </div>
  );
};

export default ProductDetails;
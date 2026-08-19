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
    (item) =>
      Number(item.id) === Number(id)
  );

  // ==========================================
  // STATES
  // ==========================================

  const [quantity, setQuantity] =
    useState(1);

  const [wishlist, setWishlist] =
    useState(false);

  const [isAdded, setIsAdded] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

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

    return () =>
      clearTimeout(timer);

  }, [id]);

  // ==========================================
  // CHECK WISHLIST
  // ==========================================

  useEffect(() => {

    if (!product) return;

    const wishlistData =
      JSON.parse(
        localStorage.getItem(
          "wishlist"
        )
      ) || [];

    const exists =
      wishlistData.some(
        (item) =>
          Number(item.id) ===
          Number(product.id)
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

        <h2>
          Loading Product...
        </h2>

      </div>
    );
  }

  // ==========================================
  // PRODUCT NOT FOUND
  // ==========================================

  if (!product) {

    return (
      <div className="not-found">

        <h2>
          Product Not Found
        </h2>

        <p>
          The product you are looking
          for does not exist.
        </p>

        <button
          className="back-shop-btn"
          onClick={() =>
            navigate("/shop")
          }
        >
          Go to Shop
        </button>

      </div>
    );
  }

  // ==========================================
  // PRICE
  // ==========================================

  const originalPrice = Number(
    product.originalPrice ??
    product.price
  );

  const sellingPrice =
    Number(product.price);

  const discount =
    Number(product.discount || 0);

  // ==========================================
  // TOTAL
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

    // Remove old buyNow
    localStorage.removeItem(
      "buyNow"
    );

    const cart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        )
      ) || [];

    const existingProduct =
      cart.find(
        (item) =>
          Number(item.id) ===
          Number(product.id)
      );

    let updatedCart;

    // Product already exists
    if (existingProduct) {

      updatedCart =
        cart.map((item) => {

          if (
            Number(item.id) ===
            Number(product.id)
          ) {

            return {
              ...item,

              price:
                sellingPrice,

              originalPrice:
                originalPrice,

              quantity:
                Number(
                  item.quantity ||
                  1
                ) +
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

          id: product.id,

          name: product.name,

          brand:
            product.brand ||
            "MEDIKART",

          category:
            product.category ||
            "",

          image:
            product.image ||
            "/images/medicine-placeholder.png",

          price:
            sellingPrice,

          originalPrice:
            originalPrice,

          quantity:
            quantity,
        },
      ];
    }

    // Save cart
    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    // Navbar cart update
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    // Added message
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
        localStorage.getItem(
          "wishlist"
        )
      ) || [];

    const exists =
      wishlistData.some(
        (item) =>
          Number(item.id) ===
          Number(product.id)
      );

    if (exists) {

      wishlistData =
        wishlistData.filter(
          (item) =>
            Number(item.id) !==
            Number(product.id)
        );

      setWishlist(false);

    } else {

      wishlistData.push({
        ...product,
      });

      setWishlist(true);
    }

    localStorage.setItem(
      "wishlist",
      JSON.stringify(
        wishlistData
      )
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

      id: product.id,

      name: product.name,

      brand:
        product.brand ||
        "MEDIKART",

      category:
        product.category ||
        "",

      image:
        product.image ||
        "/images/medicine-placeholder.png",

      price:
        sellingPrice,

      originalPrice:
        originalPrice,

      quantity:
        quantity,
    };

    // Remove cart checkout mode
    localStorage.removeItem(
      "cart"
    );

    // Save Buy Now
    localStorage.setItem(
      "buyNow",
      JSON.stringify(
        buyNowProduct
      )
    );

    // Navbar cart update
    window.dispatchEvent(
      new Event("cartUpdated")
    );

    navigate("/checkout");
  };

  // ==========================================
  // RELATED PRODUCTS
  // ==========================================

  const relatedProducts =
    products
      .filter(
        (item) =>
          Number(item.id) !==
          Number(product.id)
      )
      .filter(
        (item) =>
          item.category ===
          product.category
      )
      .slice(0, 8);

  // ==========================================
  // UI
  // ==========================================

  return (

    <div className="product-page">

      {/* TOP BAR */}

      <div className="product-topbar">

        <button
          className="back-btn"
          onClick={() =>
            navigate(-1)
          }
        >
          ← Back
        </button>

      </div>

      {/* PRODUCT MAIN */}

      <div className="product-wrapper">

        {/* LEFT */}

        <div className="left-column">

          <ProductGallery
            images={
              productImages
            }
          />

        </div>

        {/* RIGHT */}

        <div className="right-column">

          {/* NAME */}

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

          {/* RATING */}

          <div className="rating-box">

            <div className="rating-badge">

              <FaStar />

              {product.rating ||
                4.5}

            </div>

            <span>

              {product.reviews ||
                0}{" "}
              Ratings

            </span>

          </div>

          {/* PRICE */}

          <div className="price-box">

            <span className="discount-price">

              ₹
              {sellingPrice.toFixed(
                2
              )}

            </span>

            {originalPrice >
              sellingPrice && (

                <span className="actual-price">

                  ₹
                  {originalPrice.toFixed(
                    2
                  )}

                </span>

              )}

            {discount > 0 && (

              <span className="discount">

                {discount}%
                OFF

              </span>

            )}

          </div>

          {/* DESCRIPTION */}

          <div className="description">

            <h3>
              Description
            </h3>

            <p>

              {product.description ||
                "No description available for this product."}

            </p>

          </div>

          {/* QUANTITY */}

          <div className="quantity-area">

            <h3>
              Quantity
            </h3>

            <QuantitySelector
              quantity={
                quantity
              }
              setQuantity={
                setQuantity
              }
            />

          </div>

          {/* TOTAL */}

          <div className="total-box">

            <div className="row">

              <span>
                Unit Price
              </span>

              <strong>
                ₹
                {sellingPrice.toFixed(
                  2
                )}
              </strong>

            </div>

            <div className="row">

              <span>
                Quantity
              </span>

              <strong>
                {quantity}
              </strong>

            </div>

            <div className="row total">

              <span>
                Total Amount
              </span>

              <strong>
                ₹
                {totalAmount.toFixed(
                  2
                )}
              </strong>

            </div>

          </div>

          {/* BUTTONS */}

          <div className="button-group">

            {/* CART */}

            <button
              className={`cart-btn ${isAdded
                  ? "added"
                  : ""
                }`}
              onClick={
                handleAddToCart
              }
            >

              <FaShoppingCart />

              {isAdded
                ? "✓ Added"
                : "Add to Cart"}

            </button>

            {/* BUY NOW */}

            <button
              className="buy-btn"
              onClick={
                handleBuyNow
              }
            >

              <FaBolt />

              Buy Now

            </button>

            {/* WISHLIST */}

            <button
              className={`wish-btn ${wishlist
                  ? "active"
                  : ""
                }`}
              onClick={
                handleWishlist
              }
            >

              <FaHeart />

            </button>

          </div>

        </div>

      </div>

      {/* SPECIFICATIONS */}

      <ProductSpecifications
        product={product}
      />

      {/* RELATED */}

      {relatedProducts.length >
        0 && (

          <RelatedProducts
            products={
              relatedProducts
            }
          />

        )}

      {/* FOOTER */}

      <Footer />

    </div>
  );
};

export default ProductDetails;
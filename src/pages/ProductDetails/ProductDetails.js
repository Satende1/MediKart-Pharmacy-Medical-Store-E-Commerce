import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaShoppingCart, FaBolt, FaStar } from "react-icons/fa";
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
  const product = products.find((item) => item.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [wishlist, setWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setLoading(true);
    const timer = setTimeout(() => { setLoading(false); }, 700);

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
        <h2> Product Not Found </h2>
      </div>
    );
  }

  const rawPrice = Number(product.price);
  const discount = Number(product.discount);
  const discountPrice = rawPrice - (rawPrice * discount) / 100;
  const totalAmount = discountPrice * quantity;
  const productImages = product.images?.length ? product.images : [ product.image ];

  // ADD TO CART FUNCTION

  const handleAddToCart = () => {

    const cart = JSON.parse(localStorage.getItem("cart") ) || [];

    const existingProduct = cart.find( item => item.id === product.id);

    let updatedCart;

    if (existingProduct) { 
      updatedCart = cart.map(item =>
          item.id === product.id ? 
          { ...item,
            quantity: (item.quantity || 1) + quantity
          } : item
        );
    }else {
      updatedCart = 
      [ ...cart, { ...product, price: discountPrice, quantity: quantity }];
    }

    localStorage.setItem( "cart", JSON.stringify(updatedCart) );

    // Update Navbar Count

    window.dispatchEvent( new Event( "cartUpdated"));
    setIsAdded(true);
    setTimeout(() => { setIsAdded(false);}, 2000);
  };
  // ADD TO WISHLIST

  const handleWishlist = () => {
    const wishlistData = JSON.parse( localStorage.getItem("wishlist")) || [];
    const exists = wishlistData.find(item => item.id === product.id);
    if (!exists) {
      wishlistData.push(product);
      localStorage.setItem("wishlist",
        JSON.stringify(wishlistData));
      window.dispatchEvent( new Event( "wishlistUpdated"));
    }
    setWishlist(true);
  };

  const relatedProducts = products.filter( item => item.id !== product.id );
  return (
    <div className="product-page">
      <div className="product-topbar">
        <button className="back-btn" onClick={() => navigate(-1)}> ← Back</button>
      </div>
      <div className="product-wrapper">
        <div className="left-column">
          <ProductGallery images={productImages}/>
        </div>
        <div className="right-column">
          <h1 className="product-name"> {product.name} </h1>
          <div className="rating-box">
            <div className="rating-badge">
              <FaStar />{product.rating}
            </div>
            <span> {product.reviews} Ratings</span>
          </div>
          <div className="price-box">
            <span className="discount-price"> ₹{discountPrice.toFixed(2)} </span>
            <span className="actual-price"> ₹{rawPrice} </span>
            <span className="discount"> {discount}% OFF </span>
          </div>
          <div className="description">
            <h3> Description </h3>
            <p>{product.description}</p>
          </div>
          <div className="quantity-area">
            <h3>Quantity</h3>
            <QuantitySelector quantity={quantity} setQuantity={setQuantity}/>
          </div>
          <div className="total-box">
            <div className="row">
              <span>Unit Price</span>
              <strong> ₹{discountPrice} </strong>
            </div>
            <div className="row">
              <span>Quantity</span>
              <strong> {quantity} </strong>
            </div>
            <div className="row total">
              <span> Total Amount </span>
              <strong> ₹{totalAmount.toFixed(2)} </strong>
            </div>
          </div>
          <div className="button-group">
            <button className={`cart-btn ${isAdded ? "added" : "" }`} 
              onClick={handleAddToCart}>
              <FaShoppingCart />
              { isAdded ? "✓ Added" : "Add to Cart" } 
            </button>
            <button className="buy-btn"> <FaBolt /> Buy Now </button>
            <button
              className={`wish-btn ${wishlist ? "active" : "" }`}
              onClick={handleWishlist}>
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
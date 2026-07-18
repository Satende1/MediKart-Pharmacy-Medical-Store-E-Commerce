import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserAction.module.css";

function UserActions() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const updateCount = () => {
    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];

    setCartCount(cart.length);
    setWishlistCount(wishlist.length);
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("wishlistUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("wishlistUpdated", updateCount);
    };
  }, []);

  return (
    <div className={styles.userActions}>
      {/* Wishlist */}
      <Link to="/wishlist" className={styles.wishlistBtn}>
        ❤️ <span className={styles.label}>Wishlist</span>

        {wishlistCount > 0 && (
          <span className={styles.badge}>
            {wishlistCount}
          </span>
        )}
      </Link>

      {/* Cart */}
      <Link to="/cart" className={styles.cartBtn}>
        🛒 <span className={styles.label}>Cart</span>

        {cartCount > 0 && (
          <span className={styles.badge}>
            {cartCount}
          </span>
        )}
      </Link>

      {/* Login */}
      <button className={styles.loginBtn}>
        👤 <span className={styles.label}>Login</span>
      </button>
    </div>
  );
}

export default UserActions;
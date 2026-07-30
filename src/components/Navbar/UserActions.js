import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserAction.module.css";

import Login from "../Login/Login";

function UserActions() {
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [username, setUsername] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const updateCount = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    setCartCount(cart.length);
    setWishlistCount(wishlist.length);

    const user = localStorage.getItem("username");

    if (user) {
      setUsername(user);
    } else {
      setUsername("");
    }
  };

  useEffect(() => {
    updateCount();

    window.addEventListener("cartUpdated", updateCount);
    window.addEventListener("wishlistUpdated", updateCount);
    window.addEventListener("userUpdated", updateCount);

    return () => {
      window.removeEventListener("cartUpdated", updateCount);
      window.removeEventListener("wishlistUpdated", updateCount);
      window.removeEventListener("userUpdated", updateCount);
    };
  }, []);

  return (
    <>
      <div className={styles.userActions}>
        {/* Wishlist */}
        <Link
          to="/wishlist"
          className={styles.wishlistBtn}
        >
          ❤️ <span className={styles.label}>Wishlist</span>

          {wishlistCount > 0 && (
            <span className={styles.badge}>
              {wishlistCount}
            </span>
          )}
        </Link>

        {/* Cart */}
        <Link
          to="/cart"
          className={styles.cartBtn}
        >
          🛒 <span className={styles.label}>Cart</span>

          {cartCount > 0 && (
            <span className={styles.badge}>
              {cartCount}
            </span>
          )}
        </Link>

        {/* Login */}
        <button
          className={styles.loginBtn}
          onClick={() => setShowLogin(true)}
        >
          👤{" "}
          <span className={styles.label}>
            {username || "Login"}
          </span>
        </button>
      </div>

      {/* Login Popup */}
      {showLogin && (
        <div
          className={styles.overlay}
          onClick={() => setShowLogin(false)}
        >
          <div
            className={styles.popup}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setShowLogin(false)}
            >
              ✕
            </button>
            <Login onLoginSuccess={() => setShowLogin(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default UserActions;
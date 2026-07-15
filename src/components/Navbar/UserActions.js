import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./UserAction.module.css";

function UserActions() {

  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);


  // Get Cart and Wishlist Count
  const updateCount = () => {

    const cart =
      JSON.parse(localStorage.getItem("cart")) || [];

    const wishlist =
      JSON.parse(localStorage.getItem("wishlist")) || [];


    setCartCount(cart.length);
    setWishlistCount(wishlist.length);

  };


  useEffect(() => {

    // Initial load
    updateCount();


    // Listen for updates
    window.addEventListener(
      "cartUpdated",
      updateCount
    );

    window.addEventListener(
      "wishlistUpdated",
      updateCount
    );


    return () => {

      window.removeEventListener(
        "cartUpdated",
        updateCount
      );

      window.removeEventListener(
        "wishlistUpdated",
        updateCount
      );

    };

  }, []);



  return (

    <div className={styles.userActions}>


      {/* Wishlist Button */}

      <Link
        to="/wishlist"
        className={styles.wishlistBtn}
      >

        ❤️ Wishlist

        {
          wishlistCount > 0 &&

          <span className={styles.badge}>
            {wishlistCount}
          </span>

        }

      </Link>



      {/* Cart Button */}

      <Link
        to="/cart"
        className={styles.cartBtn}
      >

        🛒 Cart

        {
          cartCount > 0 &&

          <span className={styles.badge}>
            {cartCount}
          </span>

        }

      </Link>



      {/* Login */}

      <button
        className={styles.loginBtn}
      >
        👤 Login
      </button>


    </div>

  );
}


export default UserActions;
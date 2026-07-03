import React from "react";
import styles from"./UserAction.module.css";
function UserActions() {
  return (
    <div className={styles["user-actions"]}>
      <button className={styles["wishlist-btn"]}>
        ❤️ Wishlist
      </button>

      <button className={styles["cart-btn"]}>
        🛒 Cart
      </button>

      <button className={styles["login-btn"]}>
        👤 Login
      </button>
    </div>
  );
}

export default UserActions;
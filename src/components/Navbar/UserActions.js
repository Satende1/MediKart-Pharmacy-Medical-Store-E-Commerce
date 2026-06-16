import React from "react";
import "./UserAction.css";
function UserActions() {
  return (
    <div className="user-actions">
      <button className="wishlist-btn">
        ❤️ Wishlist
      </button>

      <button className="cart-btn">
        🛒 Cart
      </button>

      <button className="login-btn">
        👤 Login
      </button>
    </div>
  );
}

export default UserActions;
import React from "react";
import "./QuantitySelector.css";

const QuantitySelector = ({
  quantity,
  setQuantity,
}) => {

  const increase = () => {
    setQuantity(quantity + 1);
  };

  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="quantity-selector-wrapper">
      <div className="quantity-selector">

        <button
          className="qty-btn"
          onClick={decrease}
        >
          -
        </button>

        <span className="qty-value">
          {quantity}
        </span>

        <button
          className="qty-btn"
          onClick={increase}
        >
          +
        </button>

      </div>
    </div>
  );
};

export default QuantitySelector;
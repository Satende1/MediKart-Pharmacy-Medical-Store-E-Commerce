import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./FlashSale.module.css";

import Dolo650 from "../assets/FlashSale/Debo650.jpg";
import Crocin from "../assets/FlashSale/crocin.jpg";
import Revital from "../assets/FlashSale/revital.jpg";
import Limcee from "../assets/FlashSale/limcee.jpg";
import Glucometer from "../assets/FlashSale/glucometer.jpg";
import BPMonitor from "../assets/FlashSale/bpMonitor.jpg";
import N95Mask from "../assets/FlashSale/n95mask.jpg";
import Sanitizer from "../assets/FlashSale/sanitizer.jpg";
import "../data/products";

const flashSaleProducts = [
  {
    id: 8,
    title: "Dolo 650",
    image: Dolo650,
    originalPrice: 120,
    discountedPrice: 95,
  },
  {
    id: 9,
    title: "Pain Relief",
    image: Crocin,
    originalPrice: 350,
    discountedPrice: 275,
  },
  {
    id: 10,
    title: "Revital for Men/Women",
    image: Revital,
    originalPrice: 2499,
    discountedPrice: 1999,
  },
  {
    id: 11,
    title: "Vitamin C Chewable (Limcee)",
    image: Limcee,
    originalPrice: 250,
    discountedPrice: 180,
  },
  {
    id: 12,
    title: "Glucometer Kit",
    image: Glucometer,
    originalPrice: 1899,
    discountedPrice: 1499,
  },
  {
    id: 13,
    title: "BP Monitor",
    image: BPMonitor,
    originalPrice: 90,
    discountedPrice: 70,
  },
  {
    id: 3,
    title: "Sanitizer",
    image: Sanitizer,
    originalPrice: 450,
    discountedPrice: 349,
  },
  {
    id: 14,
    title: "N95 Mask",
    image: N95Mask,
    originalPrice: 399,
    discountedPrice: 299,
  },
];

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "24",
    minutes: "00",
    seconds: "00",
  });

  const [addedItems, setAddedItems] = useState({});

  useEffect(() => {
    const targetTime = Date.now() + 24 * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const difference = targetTime - Date.now();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleAddToCart = (id) => {
    setAddedItems((prev) => ({
      ...prev,
      [id]: true,
    }));

    setTimeout(() => {
      setAddedItems((prev) => ({
        ...prev,
        [id]: false,
      }));
    }, 5000);
  };

  return (
    <section className={styles.flashSale}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2>🔥 Flash Sale</h2>
          <p>Limited Time Deals</p>
        </div>

        <div className={styles.timer}>
          {["hours", "minutes", "seconds"].map((unit) => (
            <div key={unit} className={styles.timeBox}>
              <span className={styles.timeValue}>
                {timeLeft[unit]}
              </span>
              <span className={styles.timeLabel}>
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.productGrid}>
        {flashSaleProducts.map((product) => {
          const discountPercentage = Math.round(
            ((product.originalPrice - product.discountedPrice) /
              product.originalPrice) *
            100
          );

          return (
            <div
              key={product.id}
              className={styles.productCard}
            >
              <div className={styles.discountBadge}>
                {discountPercentage}% OFF
              </div>

              <div className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.productTitle}>
                  {product.title}
                </h3>

                <div className={styles.priceSection}>
                  <span className={styles.originalPrice}>
                    ₹{product.originalPrice}
                  </span>

                  <span className={styles.discountedPrice}>
                    ₹{product.discountedPrice}
                  </span>
                </div>

                <div className="button-group">
                  <Link
                    to={`/product/${product.id}`}
                    className="view-btn"
                  >
                    View Details
                  </Link>

                  <button
                    className={`cart-btn ${addedItems[product.id] ? "added" : ""
                      }`}
                    onClick={() => handleAddToCart(product.id)}
                  >
                    {addedItems[product.id]
                      ? "✓ Added"
                      : "Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default FlashSale;
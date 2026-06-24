import React, { useEffect, useState } from "react";
import styles from "./FlashSale.module.css";

import Debo650 from "../assets/FlashSale/Debo650.jpg";
import crocin from "../assets/FlashSale/crocin.jpg";
import revital from "../assets/FlashSale/revital.jpg";
import limcee from "../assets/FlashSale/limcee.jpg";
import glucometer from "../assets/FlashSale/glucometer.jpg";
import bpMonitor from "../assets/FlashSale/bpMonitor.jpg";
import sanitizer from "../assets/FlashSale/sanitizer.jpg";
import n95mask from "../assets/FlashSale/n95mask.jpg";

const flashSaleProducts = [
  {
    id: 1,
    title: "Dolo 650",
    image: Debo650,
    originalPrice: 120,
    discountedPrice: 95,
  },
  {
    id: 2,
    title: "Pain Relief",
    image: crocin,
    originalPrice: 350,
    discountedPrice: 275,
  },
  {
    id: 3,
    title: "Revital for Men/Women",
    image: revital,
    originalPrice: 2499,
    discountedPrice: 1999,
  },
  {
    id: 4,
    title: "Vitamin C Chewable (Limcee)",
    image: limcee,
    originalPrice: 250,
    discountedPrice: 180,
  },
  {
    id: 5,
    title: "Glucometer Kit",
    image: glucometer,
    originalPrice: 1899,
    discountedPrice: 1499,
  },
  {
    id: 6,
    title: "BP-Monitor",
    image: bpMonitor,
    originalPrice: 90,
    discountedPrice: 70,
  },
  {
    id: 7,
    title: "Sanitizer",
    image: sanitizer,
    originalPrice: 450,
    discountedPrice: 349,
  },
  {
    id: 8,
    title: "N95 Mask",
    image: n95mask,
    originalPrice: 399,
    discountedPrice: 299,
  }
];

const FlashSale = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "24",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    const targetTime =
      new Date().getTime() + 24 * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const difference =
        targetTime - new Date().getTime();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        hours: String(
          Math.floor(
            (difference / (1000 * 60 * 60)) % 24
          )
        ).padStart(2, "0"),

        minutes: String(
          Math.floor(
            (difference / (1000 * 60)) % 60
          )
        ).padStart(2, "0"),

        seconds: String(
          Math.floor((difference / 1000) % 60)
        ).padStart(2, "0"),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className={styles.flashSale}>
      <div className={styles.header}>
        <div className={styles.titleSection}>
          <h2>🔥 Flash Sale</h2>
          <p>Limited Time Deals</p>
        </div>

        <div className={styles.timer}>
          <div className={styles.timeBox}>
            <span className={styles.timeValue}>
              {timeLeft.hours}
            </span>
            <span className={styles.timeLabel}>
              Hours
            </span>
          </div>

          <div className={styles.timeBox}>
            <span className={styles.timeValue}>
              {timeLeft.minutes}
            </span>
            <span className={styles.timeLabel}>
              Minutes
            </span>
          </div>

          <div className={styles.timeBox}>
            <span className={styles.timeValue}>
              {timeLeft.seconds}
            </span>
            <span className={styles.timeLabel}>
              Seconds
            </span>
          </div>
        </div>
      </div>

      <div className={styles.productGrid}>
        {flashSaleProducts.map((product) => {
          const discountPercentage = Math.round(
            ((product.originalPrice -
              product.discountedPrice) /
              product.originalPrice) *
              100
          );

          return (
            <div
              key={product.id}
              className={styles.productCard}
            >
              <div
                className={styles.discountBadge}
              >
                {discountPercentage}% OFF
              </div>

              <div className={styles.imageWrapper}>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.productImage}
                  loading="lazy"
                />
              </div>

              <div className={styles.cardContent}>
                <h3 className={styles.productTitle}>
                  {product.title}
                </h3>

                <div
                  className={styles.priceSection}
                >
                  <span
                    className={styles.originalPrice}
                  >
                    ₹{product.originalPrice}
                  </span>

                  <span
                    className={
                      styles.discountedPrice
                    }
                  >
                    ₹{product.discountedPrice}
                  </span>
                </div>

                <div
                  className={styles.buttonGroup}
                >
                  <button
                    className={styles.detailsBtn}
                  >
                    View Details
                  </button>

                  <button
                    className={styles.cartBtn}
                  >
                    Add to Cart
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
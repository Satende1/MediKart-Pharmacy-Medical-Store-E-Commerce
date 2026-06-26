import { useEffect, useState } from "react";
import styles from "./ProductListing.module.css";
import ProductCard from "../ProductCard/ProductCard";
import productsData from "../../data/products";

const ProductListing = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(4);

  useEffect(() => {
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 1200);
  }, []);

  if (loading) {
    return (
      <div className={styles.loading}>
        Loading Products...
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className={styles.empty}>
        No Products Available
      </div>
    );
  }

  return (
    <section className={styles.container}>
      <h2>Our Products</h2>

      <div className={styles.grid}>
        {products
          .slice(0, visible)
          .map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={(p) => console.log("Add to cart", p.id)}
            />
          ))}
      </div>

      {visible < products.length && (
        <div className={styles.center}>
          <button
            className={styles.load}
            onClick={() => setVisible((prev) => prev + 4)}
          >
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductListing;
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import FilterPanel from "../../components/FilterPanel/FilterPanel";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import productsData from "../../data/products";
import "./ProductListings.css";

const ProductListing = () => {
  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    rating: "",
    availability: false,
    minPrice: "",
    maxPrice: "",
  });

  const [sortBy, setSortBy] = useState("");

  const filteredProducts = useMemo(() => {
    let products = [...productsData];

    // Category
    if (filters.category) {
      products = products.filter(
        (p) => p.category === filters.category
      );
    }

    // Brand
    if (filters.brand) {
      products = products.filter(
        (p) => p.brand === filters.brand
      );
    }

    // Rating
    if (filters.rating) {
      products = products.filter(
        (p) => p.rating >= Number(filters.rating)
      );
    }

    // Availability
    if (filters.availability) {
      products = products.filter((p) => p.stock);
    }

    // Min Price
    if (filters.minPrice) {
      products = products.filter(
        (p) => p.price >= Number(filters.minPrice)
      );
    }

    // Max Price
    if (filters.maxPrice) {
      products = products.filter(
        (p) => p.price <= Number(filters.maxPrice)
      );
    }

    switch (sortBy) {
      case "priceLowHigh":
        products.sort((a, b) => a.price - b.price);
        break;

      case "priceHighLow":
        products.sort((a, b) => b.price - a.price);
        break;

      case "nameAZ":
        products.sort((a, b) => a.name.localeCompare(b.name));
        break;

      case "nameZA":
        products.sort((a, b) => b.name.localeCompare(a.name));
        break;

      case "rating":
        products.sort((a, b) => b.rating - a.rating);
        break;

      default:
        break;
    }

    return products;
  }, [filters, sortBy]);

  return (
    <div className="listing-page">

      <aside>
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
        />
      </aside>

      <main className="products-section">

        <SortDropdown
          sortBy={sortBy}
          setSortBy={setSortBy}
        />

        <div className="product-grid">

          {filteredProducts.map((product) => (

            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className="product-card"
            >

              <img
                src={product.image}
                alt={product.name}
              />

              <h3>{product.name}</h3>

              <p>{product.brand}</p>

              <span>₹{product.price}</span>

              <div className="rating">
                ⭐ {product.rating}
              </div>

            </Link>

          ))}

        </div>

      </main>
    </div>
  );
};

export default ProductListing;

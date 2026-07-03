import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import SearchBar from "../components/SearchBar/SearchBar";
import ProductCard from "../components/ProductCard/ProductCard";
import products from "../data/products";
import "./ProductListingPage.css";

const ProductListing = () => {
  const { category } = useParams();
  const [search, setSearch] = useState("");

  const normalizedCategory = category
    ? category.toLowerCase().replace(/-/g, " ").trim()
    : "";

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const keywordMatch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const categoryMatch = normalizedCategory
        ? item.category.toLowerCase() === normalizedCategory
        : true;

      return keywordMatch && categoryMatch;
    });
  }, [search, normalizedCategory]);

  return (
    <div className="container">
      <h1>
        {normalizedCategory
          ? `Category: ${normalizedCategory}`
          : "MediKart Products"}
      </h1>

      <SearchBar
        searchTerm={search}
        setSearchTerm={setSearch}
      />

      <div className="grid">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        ) : (
          <div className="no-products">
            <h2>No Products Found</h2>
            <p>Try another keyword.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
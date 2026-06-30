import { useMemo, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import ProductCard from "../components/ProductCard/ProductCard";
import products from "../data/products";
import "./ProductListing.css";

const ProductListing = () => {

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {

    return products.filter((item) =>

      item.name.toLowerCase().includes(search.toLowerCase()) ||

      item.category.toLowerCase().includes(search.toLowerCase())

    );

  }, [search]);

  return (

    <div className="container">

      <h1>MediKart Products</h1>

      <SearchBar

        search={search}

        setSearch={setSearch}

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
import React, { useState } from "react";
import ProductListing from "../components/ProductListing/ProductListing";

function Shop() {
  const [sortBy, setSortBy] = useState("");

  return (
    <main>
      <ProductListing sortBy={sortBy} setSortBy={setSortBy} />
    </main>
  );
}

export default Shop;
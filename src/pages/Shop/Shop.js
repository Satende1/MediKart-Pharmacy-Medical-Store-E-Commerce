import React, { useState } from "react";
import ProductListing from "../../components/ProductListing/ProductListing";
import Footer from "../../components/Footer/Footer";
const Shop = () => {
  const [sortBy, setSortBy] = useState("");

  return (
    <main>
      <ProductListing
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Footer></Footer>
    </main>
  );
};

export default Shop;
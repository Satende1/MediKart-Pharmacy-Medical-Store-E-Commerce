import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProductListing from "../../components/ProductListing/ProductListing";
import Footer from "../../components/Footer/Footer";

const Shop = () => {
  const { category } = useParams();
  const [sortBy, setSortBy] = useState("");

  return (
    <main>
      <ProductListing
        category={category}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <Footer></Footer>
    </main>
  );
};

export default Shop;
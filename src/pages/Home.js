import React from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

function Home() {
  return (
    <>
      <HeroBanner />
      <Categories/>
      <FeaturedProducts/>
    </>
  );
}

export default Home;
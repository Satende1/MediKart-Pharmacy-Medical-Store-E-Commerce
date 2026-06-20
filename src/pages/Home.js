import React from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../TrendingProducts/TrendingProducts";

function Home() {
  return (
    <>
      <HeroBanner />
      <Categories/>
      <FeaturedProducts/>
      <TrendingProducts/>
    </>
  );
}

export default Home;
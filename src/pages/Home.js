import React from "react";
import HeroBanner from "../components/HeroBanner/HeroBanner";
import Categories from "../components/Categories/Categories";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import FlashSale from "../FlashSale/FlashSale";
import Newsletter from "../components/Newsletter/Newsletter";
function Home() {
  return (
    <>
      <HeroBanner />
      <Categories/>
      <FeaturedProducts/>
      <TrendingProducts/>
      <FlashSale/>
      <Newsletter/>
    </>
  );
}

export default Home;
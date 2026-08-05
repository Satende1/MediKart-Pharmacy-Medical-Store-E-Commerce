import React from "react";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import FeaturedProducts from "../../FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../../TrendingProducts/TrendingProducts";
import FlashSale from "../../FlashSale/FlashSale";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import ShopByCategory from "../../components/ShopByCategory/ShopByCategory";

import "./Home.css";
function Home() {
  return (
    <>
      <HeroBanner />
      <ShopByCategory />
      <FeaturedProducts/>
      <TrendingProducts/>
      <FlashSale/>
      <Newsletter/>
      <Footer/>
    </>
  );
}

export default Home;
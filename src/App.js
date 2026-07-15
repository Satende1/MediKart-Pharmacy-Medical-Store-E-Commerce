import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./ScrollToTop/ScrollToTop";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";

import ProductListingPage from "./pages/ProductListingPage";
import ProductListing from "./pages/ProductListing/ProductListing";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

// Wishlist & Cart Pages
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";

// Components (Demo)
import QuantitySelector from "./components/QuantitySelector/QuantitySelector";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import ProductSpecifications from "./components/ProductSpecifications/ProductSpecifications";

// Dummy Data
import products from "./data/products";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar />

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Main Pages */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />

        {/* Product Listing */}
        <Route
          path="/products"
          element={<ProductListingPage />}
        />

        <Route
          path="/product-listing"
          element={<ProductListing />}
        />

        <Route
          path="/category/:category"
          element={<ProductListingPage />}
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={<ProductDetails />}
        />

        {/* Wishlist */}
        <Route
          path="/wishlist"
          element={<Wishlist />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* Demo Components */}
        <Route
          path="/quantity-selector"
          element={
            <QuantitySelector
              quantity={1}
              setQuantity={() => {}}
            />
          }
        />

        <Route
          path="/related-products"
          element={
            <RelatedProducts products={products} />
          }
        />

        <Route
          path="/product-specifications"
          element={
            <ProductSpecifications
              product={products[0]}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
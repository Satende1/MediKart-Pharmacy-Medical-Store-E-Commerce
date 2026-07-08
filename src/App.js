import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";

import ProductListingPage from "./pages/ProductListingPage";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

// Components
import QuantitySelector from "./components/QuantitySelector/QuantitySelector";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import ProductSpecifications from "./components/ProductSpecifications/ProductSpecifications";
import ProductListing from "./pages/ProductListing/ProductListing";
import ScrollToTop from "./ScrollToTop/ScrollToTop";

// Dummy data
import products from "./data/products";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <ScrollToTop>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Route>
      </ScrollToTop>

      <Routes>

        <Route path="/" element={<Home />} />

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

        {/* Component Demo Routes */}

        <Route
          path="/quantity-selector"
          element={
            <QuantitySelector
              quantity={1}
              setQuantity={() => { }}
            />
          }
        />

        <Route
          path="/related-products"
          element={
            <RelatedProducts
              products={products}
            />
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
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar/Navbar";
import ScrollToTop from "./ScrollToTop/ScrollToTop";

// Pages
import Home from "./pages/Home/Home";
import Shop from "./pages/Shop/Shop";
import About from "./pages/About/About";
import Categories from "./pages/Categories/Categories";
import Contact from "./pages/Contact/Contact";

import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";

import ProductListingPage from "./pages/ProductListingPage";
import ProductListing from "./pages/ProductListing/ProductListing";
import ProductDetails from "./pages/ProductDetails/ProductDetails";

import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/Cart/Cart";

import QuantitySelector from "./components/QuantitySelector/QuantitySelector";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import ProductSpecifications from "./components/ProductSpecifications/ProductSpecifications";

import products from "./data/products";

function Layout() {
  const location = useLocation();

  // Hide Navbar on Login, Register and Forgot Password pages
  const hideNavbar =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password";

  return (
    <>
      <ScrollToTop />

      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

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
        <Route path="/cart" element={<Cart />} />

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
          element={<RelatedProducts products={products} />}
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

      <ToastContainer
        position="top-right"
        autoClose={2000}
        theme="colored"
      />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;
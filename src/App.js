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
import OrderConfirmation from "./pages/OrderConfirmation/OrderConfirmation";

import OrderHistory from "./pages/OrderHistory/OrderHistory";
import QuantitySelector from "./components/QuantitySelector/QuantitySelector";
import RelatedProducts from "./components/RelatedProducts/RelatedProducts";
import ProductSpecifications from "./components/ProductSpecifications/ProductSpecifications";

import Checkout from "./pages/Checkout/Checkout";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions/TermsConditions";
import ShippingPolicy from "./pages/ShippingPolicy/ShippingPolicy";
import Careers from "./pages/Careers/Careers";
import Blog from "./pages/Blog/Blog";

import TrackOrder from "./pages/TrackOrder/TrackOrder";
import Reviews from "./pages/Reviews/Reviews";
import CompareProducts from "./pages/CompareProducts/CompareProducts";
import Gallery from "./pages/Gallery/Gallery";
import FAQ from "./pages/FAQ/FAQ";
import Feedback from "./components/Feedback/Feedback";
import Error404 from "./pages/Error404/Error404";
import Error500 from "./pages/Error500/Error500";
import NoInternet from "./pages/NoInternet/NoInternet";
import AccessDenied from "./pages/AccessDenied/AccessDenied";
import Maintenance from "./pages/Maintenance/Maintenance";
import EmptyState from "./pages/EmptyState/EmptyState";

import Account from "./pages/Account/Account";
import Profile from "./pages/Profile/Profile";
import Orders from "./pages/Orders/Orders";
import Payments from "./pages/Payments/Payments";
import Addresses from "./pages/Addresses/Addresses";
import UploadPrescription from "./pages/UploadPrescription/UploadPrescription";
import HealthRecords from "./pages/HealthRecords/HealthRecords";
import Offers from "./pages/Offers/Offers";
import Notifications from "./pages/Notifications/Notifications";
import Settings from "./pages/Settings/Settings";
import TrackOrderPage from "./pages/TrackOrderPage";

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
        {/* Shop by Category - Dynamic Routes */}
        <Route path="/shop" element={<Shop />} />
        <Route path="/shop/:category" element={<Shop />} />

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Authentication */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Main Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />

        {/* Product Listing */}
        <Route path="/products" element={<ProductListingPage />} />
        <Route path="/product-listing" element={<ProductListing />} />

        {/* Product Details */}
        <Route path="/product/:id" element={<ProductDetails />} />


        {/* Wishlist */}
        <Route path="/wishlist" element={<Wishlist />} />

        {/* Cart */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />

        {/* Demo Components */}
        <Route path="/quantity-selector" element={<QuantitySelector quantity={1} setQuantity={() => { }} />} />

        <Route path="/related-products" element={<RelatedProducts />} />

        <Route path="/product-specifications" element={<ProductSpecifications product={[0]} />} />


        {/* Policies and Information Pages */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/shipping-policy" element={<ShippingPolicy />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/compare-products" element={<CompareProducts />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Error Pages */}
        <Route path="*" element={<Error404 />} />
        <Route path="/500" element={<Error500 />} />
        <Route path="/no-internet" element={<NoInternet />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/maintenance" element={<Maintenance />} />
        <Route path="/empty" element={<EmptyState />} />

        <Route path="/account" element={<Account />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-history" element={<OrderHistory />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/upload-prescription" element={<UploadPrescription />} />
        <Route path="/health-records" element={<HealthRecords />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/settings" element={<Settings />} />


        {/* Keep this LAST */}
        <Route path="*" element={<Error404 />} />
        <Route
          path="/track-order"
          element={<TrackOrderPage />}
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </>
  );
}

function App() {
  return (<BrowserRouter> <Layout /> </BrowserRouter>);
}

export default App;
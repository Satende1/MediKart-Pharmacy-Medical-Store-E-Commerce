import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Home from "./pages/Home";
import Shop from "./pages/Shop";
import About from "./pages/About";
import Categories from "./pages/Categories";
import Contact from "./pages/Contact";
import ProductListing from "./components/ProductListing/ProductListing";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductListing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
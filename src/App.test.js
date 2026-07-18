import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

// Mock all pages
jest.mock("./pages/Home/Home", () => () => <div>Home Page</div>);
jest.mock("./pages/Shop/Shop", () => () => <div>Shop Page</div>);
jest.mock("./pages/About/About", () => () => <div>About Page</div>);
jest.mock("./pages/Categories/Categories", () => () => <div>Categories Page</div>);
jest.mock("./pages/Contact/Contact", () => () => <div>Contact Page</div>);
jest.mock("./pages/ProductListingPage", () => () => (
  <div>Product Listing Page</div>
));
jest.mock("./pages/ProductListing/ProductListing", () => () => (
  <div>Product Listing</div>
));
jest.mock("./pages/ProductDetails/ProductDetails", () => () => (
  <div>Product Details</div>
));
jest.mock("./pages/Wishlist/Wishlist", () => () => (
  <div>Wishlist Page</div>
));
jest.mock("./pages/Cart/Cart", () => () => (
  <div>Cart Page</div>
));

// Mock components
jest.mock("./components/Navbar/Navbar", () => () => (
  <div>Navbar</div>
));

jest.mock("./ScrollToTop/ScrollToTop", () => () => null);

jest.mock("./components/QuantitySelector/QuantitySelector",
  () => () => <div>Quantity Selector</div>
);

jest.mock("./components/RelatedProducts/RelatedProducts",
  () => () => <div>Related Products</div>
);

jest.mock("./components/ProductSpecifications/ProductSpecifications",
  () => () => <div>Product Specifications</div>
);

// Mock product data
jest.mock("./data/products", () => [
  {
    id: 1,
    name: "Test Product",
  },
]);


const renderWithRoute = (route) => {
  window.history.pushState({}, "Test", route);
  return render(<App />);
};

describe("App Routing", () => {
  test("renders Navbar on every page", () => {
    renderWithRoute("/");

    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  test("renders Home page", () => {
    renderWithRoute("/");

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders Shop page", () => {
    renderWithRoute("/shop");

    expect(screen.getByText("Shop Page")).toBeInTheDocument();
  });

  test("renders About page", () => {
    renderWithRoute("/about");

    expect(screen.getByText("About Page")).toBeInTheDocument();
  });

  test("renders Categories page", () => {
    renderWithRoute("/categories");

    expect(screen.getByText("Categories Page")).toBeInTheDocument();
  });

  test("renders Contact page", () => {
    renderWithRoute("/contact");

    expect(screen.getByText("Contact Page")).toBeInTheDocument();
  });

  test("renders Product Listing page", () => {
    renderWithRoute("/products");

    expect(
      screen.getByText("Product Listing Page")
    ).toBeInTheDocument();
  });

  test("renders Product Details page", () => {
    renderWithRoute("/product/1");

    expect(
      screen.getByText("Product Details")
    ).toBeInTheDocument();
  });

  test("renders Wishlist page", () => {
    renderWithRoute("/wishlist");

    expect(
      screen.getByText("Wishlist Page")
    ).toBeInTheDocument();
  });

  test("renders Cart page", () => {
    renderWithRoute("/cart");

    expect(
      screen.getByText("Cart Page")
    ).toBeInTheDocument();
  });

  test("renders Quantity Selector page", () => {
    renderWithRoute("/quantity-selector");

    expect(
      screen.getByText("Quantity Selector")
    ).toBeInTheDocument();
  });

  test("renders Related Products page", () => {
    renderWithRoute("/related-products");

    expect(
      screen.getByText("Related Products")
    ).toBeInTheDocument();
  });

  test("renders Product Specifications page", () => {
    renderWithRoute("/product-specifications");

    expect(
      screen.getByText("Product Specifications")
    ).toBeInTheDocument();
  });
});
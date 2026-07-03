import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "./App";

// Mock all page components
jest.mock("./pages/Home", () => () => <h1>Home Page</h1>);
jest.mock("./pages/Shop", () => () => <h1>Shop Page</h1>);
jest.mock("./pages/About", () => () => <h1>About Page</h1>);
jest.mock("./pages/Categories", () => () => <h1>Categories Page</h1>);
jest.mock("./pages/Contact", () => () => <h1>Contact Page</h1>);
jest.mock("./pages/ProductListingPage", () => () => (
  <h1>Product Listing Page</h1>
));
jest.mock("./pages/ProductListing/ProductListing", () => () => (
  <h1>Product Listing</h1>
));
jest.mock("./pages/ProductDetails/ProductDetails", () => () => (
  <h1>Product Details</h1>
));

// Mock Navbar
jest.mock("./components/Navbar/Navbar", () => () => (
  <nav>Navbar</nav>
));

// Mock Components
jest.mock("./components/QuantitySelector/QuantitySelector", () => () => (
  <div>Quantity Selector</div>
));

jest.mock("./components/RelatedProducts/RelatedProducts", () => () => (
  <div>Related Products</div>
));

jest.mock(
  "./components/ProductSpecifications/ProductSpecifications",
  () => () => <div>Product Specifications</div>
);

// Mock product data
jest.mock("./data/products", () => [
  {
    id: 1,
    name: "Dolo 650",
  },
]);

describe("App Component", () => {
  beforeEach(() => {
    window.history.pushState({}, "", "/");
  });

  test("renders Navbar", () => {
    render(<App />);
    expect(screen.getByText("Navbar")).toBeInTheDocument();
  });

  test("renders Home page on '/' route", () => {
    window.history.pushState({}, "", "/");
    render(<App />);
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  test("renders Shop page", () => {
    window.history.pushState({}, "", "/shop");
    render(<App />);
    expect(screen.getByText("Shop Page")).toBeInTheDocument();
  });

  test("renders About page", () => {
    window.history.pushState({}, "", "/about");
    render(<App />);
    expect(screen.getByText("About Page")).toBeInTheDocument();
  });

  test("renders Categories page", () => {
    window.history.pushState({}, "", "/categories");
    render(<App />);
    expect(screen.getByText("Categories Page")).toBeInTheDocument();
  });

  test("renders Contact page", () => {
    window.history.pushState({}, "", "/contact");
    render(<App />);
    expect(screen.getByText("Contact Page")).toBeInTheDocument();
  });

  test("renders Product Listing Page", () => {
    window.history.pushState({}, "", "/products");
    render(<App />);
    expect(
      screen.getByText("Product Listing Page")
    ).toBeInTheDocument();
  });

  test("renders Product Listing component", () => {
    window.history.pushState({}, "", "/product-listing");
    render(<App />);
    expect(
      screen.getByText("Product Listing")
    ).toBeInTheDocument();
  });

  test("renders Product Details page", () => {
    window.history.pushState({}, "", "/product/1");
    render(<App />);
    expect(
      screen.getByText("Product Details")
    ).toBeInTheDocument();
  });

  test("renders Quantity Selector route", () => {
    window.history.pushState({}, "", "/quantity-selector");
    render(<App />);
    expect(
      screen.getByText("Quantity Selector")
    ).toBeInTheDocument();
  });

  test("renders Related Products route", () => {
    window.history.pushState({}, "", "/related-products");
    render(<App />);
    expect(
      screen.getByText("Related Products")
    ).toBeInTheDocument();
  });

  test("renders Product Specifications route", () => {
    window.history.pushState({}, "", "/product-specifications");
    render(<App />);
    expect(
      screen.getByText("Product Specifications")
    ).toBeInTheDocument();
  });
});
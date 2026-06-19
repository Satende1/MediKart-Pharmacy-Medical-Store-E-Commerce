// src/components/FeaturedProducts/FeaturedProducts.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import FeaturedProducts from "./FeaturedProducts";

// Mock ProductCard component
jest.mock("../ProductCard/ProductCard", () => ({ product }) => (
  <div data-testid="product-card">
    <h3>{product.name}</h3>
    <p>₹{product.price}</p>
  </div>
));

// Mock product images
jest.mock("../assets/products/product1.png", () => "product1.png");
jest.mock("../assets/products/product2.png", () => "product2.png");
jest.mock("../assets/products/product3.png", () => "product3.png");
jest.mock("../assets/products/product4.png", () => "product4.png");

describe("FeaturedProducts Component", () => {
  test("renders featured products heading", () => {
    render(<FeaturedProducts />);

    expect(
      screen.getByText("Featured Products")
    ).toBeInTheDocument();
  });

  test("renders featured products description", () => {
    render(<FeaturedProducts />);

    expect(
      screen.getByText(
        "Discover our most popular healthcare products"
      )
    ).toBeInTheDocument();
  });

  test("renders all product cards", () => {
    render(<FeaturedProducts />);

    const productCards = screen.getAllByTestId("product-card");
    expect(productCards).toHaveLength(4);
  });

  test("renders all product names", () => {
    render(<FeaturedProducts />);

    expect(
      screen.getByText("Paracetamol Tablets")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vitamin C Capsules")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Blood Pressure Monitor")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Hand Sanitizer")
    ).toBeInTheDocument();
  });
});
// src/components/ProductCard/ProductCard.test.js

import React from "react";
import { render, screen } from "@testing-library/react";
import ProductCard from "./ProductCard";

describe("ProductCard Component", () => {
  const mockProduct = {
    id: 1,
    name: "Paracetamol Tablets",
    price: 99,
    rating: 4.8,
    image: "product1.png",
  };

  test("renders product image", () => {
    render(<ProductCard product={mockProduct} />);

    const image = screen.getByAltText("Paracetamol Tablets");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "product1.png");
  });

  test("renders product name", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText("Paracetamol Tablets")
    ).toBeInTheDocument();
  });

  test("renders product price", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText("₹99")
    ).toBeInTheDocument();
  });

  test("renders product rating", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByText("⭐ 4.8")
    ).toBeInTheDocument();
  });

  test("renders View Details button", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("button", {
        name: /view details/i,
      })
    ).toBeInTheDocument();
  });

  test("renders Add to Cart button", () => {
    render(<ProductCard product={mockProduct} />);

    expect(
      screen.getByRole("button", {
        name: /add to cart/i,
      })
    ).toBeInTheDocument();
  });

  test("renders exactly two buttons", () => {
    render(<ProductCard product={mockProduct} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(2);
  });
});
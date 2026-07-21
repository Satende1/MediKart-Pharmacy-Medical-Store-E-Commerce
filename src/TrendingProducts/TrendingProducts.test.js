import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import TrendingProducts from "./TrendingProducts";
import { toast } from "react-toastify";

// Mock Images
jest.mock("../assets/products/product5.png", () => "product5.png");
jest.mock("../assets/products/product6.png", () => "product6.png");
jest.mock("../assets/products/product7.png", () => "product7.png");
jest.mock("../assets/products/product8.png", () => "product8.png");

// Mock toast
jest.mock("react-toastify", () => ({ toast: { success: jest.fn(), },}));

describe("TrendingProducts", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    window.dispatchEvent = jest.fn();
  });

  test("renders Trending Products heading", () => {
    render( <MemoryRouter> <TrendingProducts /> </MemoryRouter> );
    expect(screen.getByText("Trending Products")).toBeInTheDocument();
  });

  test("renders all product names", () => {
    render( <MemoryRouter> <TrendingProducts /> </MemoryRouter> );
    expect(screen.getByText("Digital Thermometer")).toBeInTheDocument();
    expect(screen.getByText("Protein Powder")).toBeInTheDocument();
    expect(screen.getByText("Face Wash")).toBeInTheDocument();
    expect(screen.getByText("Vitamin D Capsules")).toBeInTheDocument();
  });

  test("renders View Details buttons", () => {
    render( <MemoryRouter> <TrendingProducts /> </MemoryRouter> );
    expect(screen.getAllByText("View Details")).toHaveLength(4);
  });

  test("renders Add to Cart buttons", () => {
    render( <MemoryRouter> <TrendingProducts /> </MemoryRouter> );
    expect(screen.getAllByText("Add to Cart")).toHaveLength(4);
  });

  test("adds a product to cart", () => {
    render( <MemoryRouter> <TrendingProducts /> </MemoryRouter> );
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    const cart = JSON.parse(localStorage.getItem("cart"));
    expect(cart).toHaveLength(1);
    expect(cart[0].name).toBe("Digital Thermometer");
    expect(cart[0].quantity).toBe(1);
  });

  test("shows toast when product is added", () => {
    render( <MemoryRouter> <TrendingProducts /> </MemoryRouter> );
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    expect(toast.success).toHaveBeenCalled();
  });

  test("dispatches cartUpdated event", () => {
    render( <MemoryRouter> <TrendingProducts /> </MemoryRouter> );
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    expect(window.dispatchEvent).toHaveBeenCalled();
  });

  test("changes button text after adding product", () => {
    render( <MemoryRouter> <TrendingProducts /> </MemoryRouter> );
    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    expect(screen.getByText("✓ Added")).toBeInTheDocument();
  });
});
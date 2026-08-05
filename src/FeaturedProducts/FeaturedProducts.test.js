import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";
import { toast } from "react-toastify";

// Mock Images
jest.mock("../assets/products/product1.png", () => "product1.png");
jest.mock("../assets/products/product2.png", () => "product2.png");
jest.mock("../assets/products/product3.png", () => "product3.png");
jest.mock("../assets/products/product4.png", () => "product4.png");

// Mock react-toastify
jest.mock("react-toastify", () => ({
  ToastContainer: () => <div>ToastContainer</div>,
  toast: { success: jest.fn(), },
}));

describe("FeaturedProducts", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
    window.dispatchEvent = jest.fn();
  });

  test("renders Featured Products heading", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);
    expect(screen.getByText("Featured Products")).toBeInTheDocument();
  });

  test("renders all products", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);
    expect(screen.getByText("Paracetamol Tablets")).toBeInTheDocument();
    expect(screen.getByText("Vitamin D Capsules")).toBeInTheDocument();
    expect(screen.getByText("Blood Pressure Monitor")).toBeInTheDocument();
    expect(screen.getByText("Hand Sanitizer")).toBeInTheDocument();
  });

  test("renders View Details buttons", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);
    expect(screen.getAllByText("View Details")).toHaveLength(4);
  });

  test("renders Add to Cart buttons", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);

    expect(screen.getAllByText("Add to Cart")).toHaveLength(4);
  });

  test("adds product to localStorage cart", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);

    fireEvent.click(screen.getAllByText("Add to Cart")[0]);

    const cart = JSON.parse(localStorage.getItem("cart"));

    expect(cart).toHaveLength(1);
    expect(cart[0].name).toBe("Paracetamol Tablets");
    expect(cart[0].quantity).toBe(1);
  });

  test("calls toast.success when Add to Cart is clicked", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);

    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    expect(toast.success).toHaveBeenCalled();
  });

  test("dispatches cartUpdated event", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);

    fireEvent.click(screen.getAllByText("Add to Cart")[0]);

    expect(window.dispatchEvent).toHaveBeenCalled();
  });

  test("changes button text to Added", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);

    fireEvent.click(screen.getAllByText("Add to Cart")[0]);
    expect(screen.getByText("✓ Added")).toBeInTheDocument();
  });

  test("renders ToastContainer", () => {
    render(<MemoryRouter> <FeaturedProducts /> </MemoryRouter>);

    expect(screen.getByText("ToastContainer")).toBeInTheDocument();
  });
});
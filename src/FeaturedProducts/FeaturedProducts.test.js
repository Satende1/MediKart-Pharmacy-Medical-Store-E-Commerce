import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";

describe("FeaturedProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Featured Products heading", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    expect(screen.getByText("Featured Products")).toBeInTheDocument();
  });

  test("renders description", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Discover our most popular healthcare products")
    ).toBeInTheDocument();
  });

  test("renders all product names", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    expect(screen.getByText("Paracetamol Tablets")).toBeInTheDocument();
    expect(screen.getByText("Vitamin D Capsules")).toBeInTheDocument();
    expect(screen.getByText("Blood Pressure Monitor")).toBeInTheDocument();
    expect(screen.getByText("Hand Sanitizer")).toBeInTheDocument();
  });

  test("renders all prices", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    expect(screen.getByText("₹99")).toBeInTheDocument();
    expect(screen.getByText("₹249")).toBeInTheDocument();
    expect(screen.getByText("₹1499")).toBeInTheDocument();
    expect(screen.getByText("₹199")).toBeInTheDocument();
  });

  test("renders all ratings", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    expect(screen.getByText("⭐ 4.8")).toBeInTheDocument();
    expect(screen.getByText("⭐ 4.7")).toBeInTheDocument();
    expect(screen.getByText("⭐ 4.9")).toBeInTheDocument();
    expect(screen.getByText("⭐ 4.6")).toBeInTheDocument();
  });

  test("renders four product images", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  test("renders four View Details links", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link", {
      name: /view details/i,
    });

    expect(links).toHaveLength(4);
  });

  test("View Details links have correct href", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link", {
      name: /view details/i,
    });

    expect(links[0]).toHaveAttribute("href", "/product/1");
    expect(links[1]).toHaveAttribute("href", "/product/7");
    expect(links[2]).toHaveAttribute("href", "/product/2");
    expect(links[3]).toHaveAttribute("href", "/product/3");
  });

  test("renders four Add to Cart buttons", () => {
    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button", {
      name: /add to cart/i,
    });

    expect(buttons).toHaveLength(4);
  });

  test("changes button text after clicking Add to Cart", () => {
    jest.useFakeTimers();

    render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    const button = screen.getAllByRole("button", {
      name: /add to cart/i,
    })[0];

    fireEvent.click(button);

    expect(screen.getByText("✓ Added")).toBeInTheDocument();

    jest.advanceTimersByTime(2000);

    expect(
      screen.getAllByRole("button", {
        name: /add to cart/i,
      })[0]
    ).toBeInTheDocument();

    jest.useRealTimers();
  });

  test("renders exactly four product cards", () => {
    const { container } = render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );

    expect(container.querySelectorAll(".product-card")).toHaveLength(4);
  });
});
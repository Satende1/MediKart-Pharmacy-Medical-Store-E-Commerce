import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import TrendingProducts from "./TrendingProducts";

describe("TrendingProducts Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders Trending Products heading", () => {
    render(
      <MemoryRouter>
        <TrendingProducts />
      </MemoryRouter>
    );

    expect(screen.getByText("Trending Products")).toBeInTheDocument();
  });

  test("renders description", () => {
    render(
      <MemoryRouter>
        <TrendingProducts />
      </MemoryRouter>
    );

    expect(
      screen.getByText(
        "Explore the most popular healthcare products on Medikart"
      )
    ).toBeInTheDocument();
  });

  test("renders all product names", () => {
    render(
      <MemoryRouter>
        <TrendingProducts />
      </MemoryRouter>
    );

    expect(screen.getByText("Digital Thermometer")).toBeInTheDocument();
    expect(screen.getByText("Protein Powder")).toBeInTheDocument();
    expect(screen.getByText("Face Wash")).toBeInTheDocument();
    expect(screen.getByText("Vitamin D Capsules")).toBeInTheDocument();
  });

  test("renders all prices", () => {
    render(
      <MemoryRouter>
        <TrendingProducts />
      </MemoryRouter>
    );

    expect(screen.getByText("₹299")).toBeInTheDocument();
    expect(screen.getByText("₹899")).toBeInTheDocument();
    expect(screen.getByText("₹249")).toBeInTheDocument();
    expect(screen.getByText("₹399")).toBeInTheDocument();
  });

  test("renders all ratings", () => {
    render(
      <MemoryRouter>
        <TrendingProducts />
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
        <TrendingProducts />
      </MemoryRouter>
    );

    expect(screen.getAllByRole("img")).toHaveLength(4);
  });

  test("renders four View Details links", () => {
    render(
      <MemoryRouter>
        <TrendingProducts />
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
        <TrendingProducts />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link", {
      name: /view details/i,
    });

    expect(links[0]).toHaveAttribute("href", "/product/4");
    expect(links[1]).toHaveAttribute("href", "/product/5");
    expect(links[2]).toHaveAttribute("href", "/product/6");
    expect(links[3]).toHaveAttribute("href", "/product/7");
  });

  test("renders four Add to Cart buttons", () => {
    render(
      <MemoryRouter>
        <TrendingProducts />
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
        <TrendingProducts />
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
        <TrendingProducts />
      </MemoryRouter>
    );

    expect(container.querySelectorAll(".product-card")).toHaveLength(4);
  });
});
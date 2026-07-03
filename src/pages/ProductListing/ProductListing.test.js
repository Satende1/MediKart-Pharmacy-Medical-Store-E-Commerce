import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ProductListing from "./ProductListing";

// Mock products data
jest.mock("../../data/products", () => [
  {
    id: 1,
    name: "Paracetamol",
    brand: "Dolo",
    category: "Medicine",
    price: 50,
    rating: 4.5,
    stock: true,
    image: "/img1.jpg",
  },
  {
    id: 2,
    name: "Vitamin C",
    brand: "Revital",
    category: "Vitamin",
    price: 100,
    rating: 4.8,
    stock: true,
    image: "/img2.jpg",
  },
  {
    id: 3,
    name: "Thermometer",
    brand: "Himalaya",
    category: "Equipment",
    price: 250,
    rating: 4.2,
    stock: false,
    image: "/img3.jpg",
  },
]);

// Mock FilterPanel
jest.mock("../../components/FilterPanel/FilterPanel", () => (props) => (
  <div data-testid="filter-panel">
    <button
      onClick={() =>
        props.setFilters({
          ...props.filters,
          category: "Medicine",
        })
      }
    >
      Filter Medicine
    </button>
  </div>
));

// Mock SortDropdown
jest.mock("../../components/SortDropdown/SortDropdown", () => (props) => (
  <div data-testid="sort-dropdown">
    <button onClick={() => props.setSortBy("priceHighLow")}>
      Sort High-Low
    </button>
  </div>
));

describe("ProductListing Component", () => {
  test("renders FilterPanel and SortDropdown", () => {
    render(
      <MemoryRouter>
        <ProductListing />
      </MemoryRouter>
    );

    expect(screen.getByTestId("filter-panel")).toBeInTheDocument();
    expect(screen.getByTestId("sort-dropdown")).toBeInTheDocument();
  });

  test("renders all products", () => {
    render(
      <MemoryRouter>
        <ProductListing />
      </MemoryRouter>
    );

    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
    expect(screen.getByText("Vitamin C")).toBeInTheDocument();
    expect(screen.getByText("Thermometer")).toBeInTheDocument();
  });

  test("renders prices", () => {
    render(
      <MemoryRouter>
        <ProductListing />
      </MemoryRouter>
    );

    expect(screen.getByText("₹50")).toBeInTheDocument();
    expect(screen.getByText("₹100")).toBeInTheDocument();
    expect(screen.getByText("₹250")).toBeInTheDocument();
  });

  test("renders ratings", () => {
    render(
      <MemoryRouter>
        <ProductListing />
      </MemoryRouter>
    );

    expect(screen.getByText("⭐ 4.5")).toBeInTheDocument();
    expect(screen.getByText("⭐ 4.8")).toBeInTheDocument();
    expect(screen.getByText("⭐ 4.2")).toBeInTheDocument();
  });

  test("filters products", () => {
    render(
      <MemoryRouter>
        <ProductListing />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Filter Medicine"));

    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
    expect(screen.queryByText("Vitamin C")).not.toBeInTheDocument();
    expect(screen.queryByText("Thermometer")).not.toBeInTheDocument();
  });

  test("sort button updates state", () => {
    render(
      <MemoryRouter>
        <ProductListing />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Sort High-Low"));

    expect(screen.getByTestId("sort-dropdown")).toBeInTheDocument();
  });

  test("product links are rendered", () => {
    render(
      <MemoryRouter>
        <ProductListing />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(3);

    expect(links[0]).toHaveAttribute("href", "/product/1");
    expect(links[1]).toHaveAttribute("href", "/product/2");
    expect(links[2]).toHaveAttribute("href", "/product/3");
  });
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterPanel from "./FilterPanel";

describe("FilterPanel Component", () => {
  let filters;
  let setFilters;

  beforeEach(() => {
    filters = {
      category: "",
      brand: "",
      rating: "",
      availability: false,
      minPrice: "",
      maxPrice: "",
    };

    setFilters = jest.fn();
  });

  test("renders filter panel", () => {
    render(<FilterPanel filters={filters} setFilters={setFilters} />);

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("₹0")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("₹5000")).toBeInTheDocument();
    expect(screen.getByText("In Stock Only")).toBeInTheDocument();
    expect(screen.getByText("Clear Filters")).toBeInTheDocument();
  });

  test("changes category", () => {
    render(<FilterPanel filters={filters} setFilters={setFilters} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], {
      target: { name: "category", value: "Medicine" },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      category: "Medicine",
    });
  });

  test("changes brand", () => {
    render(<FilterPanel filters={filters} setFilters={setFilters} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[1], {
      target: { name: "brand", value: "Crocin" },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      brand: "Crocin",
    });
  });

  test("changes rating", () => {
    render(<FilterPanel filters={filters} setFilters={setFilters} />);

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[2], {
      target: { name: "rating", value: "4" },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      rating: "4",
    });
  });

  test("changes minimum price", () => {
    render(<FilterPanel filters={filters} setFilters={setFilters} />);

    fireEvent.change(screen.getByPlaceholderText("₹0"), {
      target: { name: "minPrice", value: "100" },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      minPrice: "100",
    });
  });

  test("changes maximum price", () => {
    render(<FilterPanel filters={filters} setFilters={setFilters} />);

    fireEvent.change(screen.getByPlaceholderText("₹5000"), {
      target: { name: "maxPrice", value: "500" },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      maxPrice: "500",
    });
  });

  test("toggles availability checkbox", () => {
    render(<FilterPanel filters={filters} setFilters={setFilters} />);

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      availability: true,
    });
  });

  test("clear filters button resets all filters", () => {
    filters = {
      category: "Medicine",
      brand: "Crocin",
      rating: "4",
      availability: true,
      minPrice: "100",
      maxPrice: "500",
    };

    render(<FilterPanel filters={filters} setFilters={setFilters} />);

    fireEvent.click(screen.getByText("Clear Filters"));

    expect(setFilters).toHaveBeenCalledWith({
      category: "",
      brand: "",
      rating: "",
      availability: false,
      minPrice: "",
      maxPrice: "",
    });
  });
});
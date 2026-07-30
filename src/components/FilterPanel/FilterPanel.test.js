import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import FilterPanel from "./FilterPanel";

describe("FilterPanel", () => {
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

  test("renders Filter Products heading", () => {
    render(
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
      />
    );

    expect(screen.getByText("Filter Products")).toBeInTheDocument();
  });

  test("changes category", () => {
    render(
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
      />
    );

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[0], {
      target: {
        name: "category",
        value: "Medicine",
      },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      category: "Medicine",
    });
  });

  test("changes brand", () => {
    render(
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
      />
    );

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[1], {
      target: {
        name: "brand",
        value: "Dolo",
      },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      brand: "Dolo",
    });
  });

  test("changes minimum price", () => {
    render(
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("₹0"), {
      target: {
        name: "minPrice",
        value: "100",
      },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      minPrice: "100",
    });
  });

  test("changes maximum price", () => {
    render(
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("₹5000"), {
      target: {
        name: "maxPrice",
        value: "500",
      },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      maxPrice: "500",
    });
  });

  test("changes rating", () => {
    render(
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
      />
    );

    const selects = screen.getAllByRole("combobox");

    fireEvent.change(selects[2], {
      target: {
        name: "rating",
        value: "4",
      },
    });

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      rating: "4",
    });
  });

  test("changes availability", () => {
    render(
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
      />
    );

    fireEvent.click(screen.getByRole("checkbox"));

    expect(setFilters).toHaveBeenCalledWith({
      ...filters,
      availability: true,
    });
  });

  test("clear filters button works", () => {
    render(
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /clear filters/i,
      })
    );

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
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderHistory from "./OrderHistory";

describe("OrderHistory Component", () => {
  test("renders page heading and description", () => {
    render(<OrderHistory />);

    expect(screen.getByText("My Orders")).toBeInTheDocument();

    expect(
      screen.getByText(
        "View all your MEDIKART orders in one place."
      )
    ).toBeInTheDocument();
  });

  test("renders table headings", () => {
    render(<OrderHistory />);

    expect(screen.getByText("Order ID")).toBeInTheDocument();
    expect(screen.getByText("Date")).toBeInTheDocument();
    expect(screen.getByText("Total")).toBeInTheDocument();
    expect(screen.getByText("Status")).toBeInTheDocument();
    expect(screen.getByText("Details")).toBeInTheDocument();
  });

  test("renders all order IDs", () => {
    render(<OrderHistory />);

    expect(screen.getByText("MK100245")).toBeInTheDocument();
    expect(screen.getByText("MK100246")).toBeInTheDocument();
    expect(screen.getByText("MK100247")).toBeInTheDocument();
    expect(screen.getByText("MK100248")).toBeInTheDocument();
    expect(screen.getByText("MK100249")).toBeInTheDocument();
  });

  test("renders all order statuses", () => {
    render(<OrderHistory />);

    expect(screen.getAllByText("Delivered")).toHaveLength(2);
    expect(screen.getByText("Shipped")).toBeInTheDocument();
    expect(screen.getByText("Processing")).toBeInTheDocument();
    expect(screen.getByText("Cancelled")).toBeInTheDocument();
  });

  test("renders all order totals", () => {
    render(<OrderHistory />);

    expect(screen.getByText("₹1250")).toBeInTheDocument();
    expect(screen.getByText("₹850")).toBeInTheDocument();
    expect(screen.getByText("₹2199")).toBeInTheDocument();
    expect(screen.getByText("₹430")).toBeInTheDocument();
    expect(screen.getByText("₹1675")).toBeInTheDocument();
  });

  test("renders five View buttons", () => {
    render(<OrderHistory />);

    const buttons = screen.getAllByRole("button", {
      name: /View/i,
    });

    expect(buttons).toHaveLength(5);
  });

  test("renders five table rows", () => {
    render(<OrderHistory />);

    const rows = screen.getAllByRole("row");

    // 1 header row + 5 order rows
    expect(rows).toHaveLength(6);
  });
});
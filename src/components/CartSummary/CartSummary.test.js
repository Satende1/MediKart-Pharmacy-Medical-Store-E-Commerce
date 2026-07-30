import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import CartSummary from "./CartSummary";

describe("CartSummary", () => {
  const cartItems = [
    {
      id: 1,
      name: "Dolo 650",
      category: "Medicine",
      price: 120,
      quantity: 2,
    },
    {
      id: 2,
      name: "BP Monitor",
      category: "Medical Devices",
      price: 1500,
      quantity: 1,
    },
  ];

  test("renders Order Summary", () => {
    render(
      <MemoryRouter>
        <CartSummary cartItems={cartItems} totalItems={3} totalPrice={1740} />
      </MemoryRouter>
    );

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });

  test("renders product names", () => {
    render(
      <MemoryRouter>
        <CartSummary cartItems={cartItems} totalItems={3} totalPrice={1740} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Dolo 650/i)).toBeInTheDocument();
    expect(screen.getByText(/BP Monitor/i)).toBeInTheDocument();
  });

  test("renders total items", () => {
    render(
      <MemoryRouter>
        <CartSummary cartItems={cartItems} totalItems={3} totalPrice={1740} />
      </MemoryRouter>
    );

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  test("shows product price", () => {
    render(
      <MemoryRouter>
        <CartSummary cartItems={cartItems} totalItems={3} totalPrice={1740} />
      </MemoryRouter>
    );

    expect(screen.getByText(/₹1,740/)).toBeInTheDocument();
  });

  test("shows delivery charge", () => {
    render(
      <MemoryRouter>
        <CartSummary cartItems={cartItems} totalItems={3} totalPrice={1740} />
      </MemoryRouter>
    );

    expect(screen.getByText(/₹100/)).toBeInTheDocument();
  });

  test("shows total amount", () => {
    render(
      <MemoryRouter>
        <CartSummary cartItems={cartItems} totalItems={3} totalPrice={1740} />
      </MemoryRouter>
    );

    expect(screen.getByText(/₹1,840/)).toBeInTheDocument();
  });

  test("has Continue Shopping link", () => {
    render(
      <MemoryRouter>
        <CartSummary cartItems={cartItems} totalItems={3} totalPrice={1740} />
      </MemoryRouter>
    );

    expect( screen.getByRole("link", {  name: /Continue Shopping/i, })).toHaveAttribute("href", "/shop");
  });

  test("has Proceed to Checkout link", () => {
    render(
      <MemoryRouter>
        <CartSummary
          cartItems={cartItems}
          totalItems={3}
          totalPrice={1740}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole("link", { name: /Proceed to Checkout/i, }) ).toHaveAttribute("href", "/shipping-address");
  });

  test("renders empty cart", () => {
    render(
      <MemoryRouter>
        <CartSummary cartItems={[]} totalItems={0} totalPrice={0} />
      </MemoryRouter>
    );

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });
});
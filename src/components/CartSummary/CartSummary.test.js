import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CartSummary from "./CartSummary";
describe("CartSummary Component", () => {

  test("renders order summary", () => {
    render(
      <MemoryRouter>
        <CartSummary
          totalItems={3}
          totalPrice={1500}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });
  test("displays total items", () => {
    render(
      <MemoryRouter>
        <CartSummary
          totalItems={5}
          totalPrice={2000}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("5")).toBeInTheDocument();

  });
  test("displays free delivery", () => {
    render(
      <MemoryRouter>
        <CartSummary
          totalItems={2}
          totalPrice={500}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("FREE")).toBeInTheDocument();
  });
  test("displays platform fee", () => {
    render(
      <MemoryRouter>
        <CartSummary
          totalItems={1}
          totalPrice={1000}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("₹0")).toBeInTheDocument();

  });
  test("displays total amount correctly", () => {
    render(
      <MemoryRouter>
        <CartSummary
          totalItems={2}
          totalPrice={2500}
        />
      </MemoryRouter>
    );
    expect(screen.getByText("₹2,500")).toBeInTheDocument();
  });
  test("renders Continue Shopping link", () => {
    render(
      <MemoryRouter>
        <CartSummary
          totalItems={2}
          totalPrice={1000}
        />
      </MemoryRouter>
    );
    const link =
      screen.getByText("Continue Shopping");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/shop");
  });
  test("renders Proceed to Checkout button", () => {
    render(
      <MemoryRouter>
        <CartSummary
          totalItems={2}
          totalPrice={1000}
        />
      </MemoryRouter>
    );
    const button =
      screen.getByText("Proceed to Checkout");
    expect(button).toBeInTheDocument();
  });

  test("checkout button is clickable", () => {
    render(
      <MemoryRouter>
        <CartSummary
          totalItems={2}
          totalPrice={1000}
        />
      </MemoryRouter>
    );
    const button =
      screen.getByText(
        "Proceed to Checkout"
      );
    fireEvent.click(button);
    expect(button).toBeInTheDocument();
  });
});
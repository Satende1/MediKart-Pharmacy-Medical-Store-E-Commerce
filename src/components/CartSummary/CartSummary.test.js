import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import CartSummary from "./CartSummary";

// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock alert
window.alert = jest.fn();

describe("CartSummary Component", () => {
  const cartItems = [
    {
      id: 1,
      name: "Paracetamol",
      price: 100,
      quantity: 2,
      category: "Medicines",
    },
    {
      id: 2,
      name: "BP Monitor",
      price: 1500,
      quantity: 1,
      category: "Medical Devices",
    },
  ];

  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
    window.alert.mockClear();
  });

  test("renders Order Summary heading", () => {
    render(
      <MemoryRouter>
        <CartSummary
          cartItems={cartItems}
          totalItems={3}
          totalPrice={1700}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("Order Summary")).toBeInTheDocument();
  });

  test("renders cart items", () => {
    render(
      <MemoryRouter>
        <CartSummary
          cartItems={cartItems}
          totalItems={3}
          totalPrice={1700}
        />
      </MemoryRouter>
    );

    expect(screen.getByText(/Paracetamol/)).toBeInTheDocument();
    expect(screen.getByText(/BP Monitor/)).toBeInTheDocument();
  });

  test("shows delivery charge for medical devices", () => {
    render(
      <MemoryRouter>
        <CartSummary
          cartItems={cartItems}
          totalItems={3}
          totalPrice={1700}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("₹100")).toBeInTheDocument();
  });

  test("shows FREE delivery when no medical devices", () => {
    const items = [
      {
        id: 1,
        name: "Crocin",
        price: 100,
        quantity: 1,
        category: "Medicines",
      },
    ];

    render(
      <MemoryRouter>
        <CartSummary
          cartItems={items}
          totalItems={1}
          totalPrice={100}
        />
      </MemoryRouter>
    );

    expect(screen.getByText("FREE")).toBeInTheDocument();
  });

  test("navigates to checkout when logged in", () => {
    localStorage.setItem("isLoggedIn", "true");

    render(
      <MemoryRouter>
        <CartSummary
          cartItems={cartItems}
          totalItems={3}
          totalPrice={1700}
        />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Proceed to Checkout/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/checkout");
  });

  test("shows alert and navigates to login when not logged in", () => {
    render(
      <MemoryRouter>
        <CartSummary
          cartItems={cartItems}
          totalItems={3}
          totalPrice={1700}
        />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Proceed to Checkout/i,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Please login first."
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("renders Continue Shopping link", () => {
    render(
      <MemoryRouter>
        <CartSummary
          cartItems={cartItems}
          totalItems={3}
          totalPrice={1700}
        />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", {
        name: /Continue Shopping/i,
      })
    ).toBeInTheDocument();
  });
});
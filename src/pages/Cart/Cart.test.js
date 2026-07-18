import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "./Cart";

// Mock child components
jest.mock("../../components/CartItem/CartItem", () => (props) => (
  <div data-testid="cart-item">
    <p>{props.item.name}</p>

    <button onClick={() => props.onIncrease(props.item.id)}> Increase </button>

    <button onClick={() => props.onDecrease(props.item.id)}> Decrease </button>

    <button onClick={() => props.onRemove(props.item.id)}> Remove </button>
  </div>
));

jest.mock("../../components/CartSummary/CartSummary", () => (props) => (
  <div data-testid="cart-summary">
    <p>Total Items: {props.totalItems}</p>
    <p>Total Price: {props.totalPrice}</p>
  </div>
));

jest.mock("../../components/AddressSection/AddressSection", () => () => (
  <div data-testid="address-section"> Address Section </div>
));

jest.mock("../../components/Footer/Footer", () => () => (
  <div data-testid="footer">Footer</div>
));

jest.mock("../../components/EmptyState/EmptyState", () => (props) => (
  <div data-testid="empty-state">
    <h2>{props.title}</h2>
    <p>{props.description}</p>
  </div>
));

describe("Cart Page", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders EmptyState when cart is empty", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();

    expect(screen.getByText("Your Cart is Empty")).toBeInTheDocument();
  });

  test("renders cart items", () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Paracetamol",
          price: 100,
          quantity: 2,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("Paracetamol")).toBeInTheDocument();

    expect(screen.getByTestId("cart-summary")).toBeInTheDocument();

    expect(screen.getByTestId("address-section")).toBeInTheDocument();
  });

  test("increases quantity", () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Medicine",
          price: 100,
          quantity: 1,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Increase"));

    const cart = JSON.parse(localStorage.getItem("cart"));

    expect(cart[0].quantity).toBe(2);
  });

  test("decreases quantity", () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Medicine",
          price: 100,
          quantity: 2,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Decrease"));

    const cart = JSON.parse(localStorage.getItem("cart"));

    expect(cart[0].quantity).toBe(1);
  });

  test("removes product from cart", () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Medicine",
          price: 100,
          quantity: 1,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Remove"));

    const cart = JSON.parse(localStorage.getItem("cart"));

    expect(cart).toHaveLength(0);
  });

  test("shows total items correctly", () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "A",
          price: 100,
          quantity: 2,
        },
        {
          id: 2,
          name: "B",
          price: 50,
          quantity: 3,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByText("5 Items")).toBeInTheDocument();
  });

  test("renders footer", () => {
    render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
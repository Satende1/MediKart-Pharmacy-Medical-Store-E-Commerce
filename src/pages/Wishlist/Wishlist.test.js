import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Wishlist from "./Wishlist";

// Mock WishlistItem
jest.mock("../../components/WishlistItem/WishlistItem", () => (props) => (
  <div data-testid="wishlist-item">
    <p>{props.item.name}</p>

    <button onClick={() => props.onMoveToCart(props.item.id)}>
      Move to Cart
    </button>

    <button onClick={() => props.onRemove(props.item.id)}>
      Remove
    </button>
  </div>
));

// Mock EmptyState
jest.mock("../../components/EmptyState/EmptyState", () => (props) => (
  <div data-testid="empty-state">
    <h2>{props.title}</h2>
    <p>{props.description}</p>
  </div>
));

// Mock Footer
jest.mock("../../components/Footer/Footer", () => () => (
  <div data-testid="footer">Footer</div>
));

describe("Wishlist Page", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders empty wishlist", () => {
    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId("empty-state")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Your Wishlist is Empty")
    ).toBeInTheDocument();
  });

  test("renders wishlist items", () => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify([
        {
          id: 1,
          name: "Paracetamol",
          price: 100,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Paracetamol")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("wishlist-item")
    ).toBeInTheDocument();
  });

  test("removes wishlist item", () => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify([
        {
          id: 1,
          name: "Medicine",
          price: 100,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("Remove"));

    const wishlist = JSON.parse(
      localStorage.getItem("wishlist")
    );

    expect(wishlist).toHaveLength(0);
  });

  test("moves product to cart", () => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify([
        {
          id: 1,
          name: "Medicine",
          price: 100,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByText("Move to Cart")
    );

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(1);
    expect(cart[0].name).toBe("Medicine");
    expect(cart[0].quantity).toBe(1);

    const wishlist = JSON.parse(
      localStorage.getItem("wishlist")
    );

    expect(wishlist).toHaveLength(0);
  });

  test("increments quantity if product already exists in cart", () => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify([
        {
          id: 1,
          name: "Medicine",
          price: 100,
        },
      ])
    );

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
        <Wishlist />
      </MemoryRouter>
    );

    fireEvent.click(
      screen.getByText("Move to Cart")
    );

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart[0].quantity).toBe(3);
  });

  test("renders Continue Shopping link", () => {
    localStorage.setItem(
      "wishlist",
      JSON.stringify([
        {
          id: 1,
          name: "Medicine",
          price: 100,
        },
      ])
    );

    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", {
      name: /Continue Shopping/i,
    });

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/shop");
  });

  test("renders footer", () => {
    render(
      <MemoryRouter>
        <Wishlist />
      </MemoryRouter>
    );

    expect(
      screen.getByTestId("footer")
    ).toBeInTheDocument();
  });
});
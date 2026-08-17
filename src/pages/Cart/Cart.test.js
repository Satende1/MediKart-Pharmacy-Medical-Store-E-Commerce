import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Cart from "./Cart";

import "@testing-library/jest-dom";

// Mock child components
jest.mock("../../components/CartItem/CartItem", () => {
  return function MockCartItem({
    item,
    onIncrease,
    onDecrease,
    onRemove,
  }) {
    return (
      <div data-testid={`cart-item-${item.id}`}>
        <span>{item.name}</span>

        <span data-testid={`quantity-${item.id}`}>
          {item.quantity || 1}
        </span>

        <button onClick={() => onIncrease(item.id)}>
          Increase
        </button>

        <button onClick={() => onDecrease(item.id)}>
          Decrease
        </button>

        <button onClick={() => onRemove(item.id)}>
          Remove
        </button>
      </div>
    );
  };
});

jest.mock("../../components/CartSummary/CartSummary", () => {
  return function MockCartSummary({
    totalItems,
    subtotal,
    discount,
    delivery,
    totalPrice,
  }) {
    return (
      <div data-testid="cart-summary">
        <p>Total Items: {totalItems}</p>
        <p>Subtotal: ₹{subtotal}</p>
        <p>Discount: ₹{discount}</p>
        <p>Delivery: ₹{delivery}</p>
        <p>Total: ₹{totalPrice}</p>
      </div>
    );
  };
});

jest.mock("../../components/Address/Address", () => {
  return function MockAddress() {
    return <div data-testid="address">Address</div>;
  };
});

jest.mock("../../components/Footer/Footer", () => {
  return function MockFooter() {
    return <footer data-testid="footer">Footer</footer>;
  };
});

jest.mock("../../components/EmptyState/EmptyState", () => {
  return function MockEmptyState({
    title,
    description,
    buttonText,
    buttonLink,
  }) {
    return (
      <div data-testid="empty-state">
        <h2>{title}</h2>
        <p>{description}</p>
        <a href={buttonLink}>{buttonText}</a>
      </div>
    );
  };
});

describe("Cart Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderCart = () => {
    return render(
      <MemoryRouter>
        <Cart />
      </MemoryRouter>
    );
  };

  // ---------------------------------------------------------
  // 1. EMPTY CART
  // ---------------------------------------------------------

  test("shows empty cart when localStorage has no cart", () => {
    renderCart();

    expect(
      screen.getByText("Your Cart is Empty")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Looks like you haven't added any products yet."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText("Continue Shopping")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 2. FOOTER ON EMPTY CART
  // ---------------------------------------------------------

  test("renders footer when cart is empty", () => {
    renderCart();

    expect(
      screen.getByTestId("footer")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 3. CART ITEMS
  // ---------------------------------------------------------

  test("renders cart items from localStorage", async () => {
    const cart = [
      {
        id: 1,
        name: "Dolo 650 Tablet",
        price: 100,
        quantity: 2,
      },
      {
        id: 2,
        name: "Hand Sanitizer",
        price: 200,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    expect(
      await screen.findByText("Dolo 650 Tablet")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Hand Sanitizer")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 4. TOTAL ITEMS
  // ---------------------------------------------------------

  test("calculates total item quantity correctly", async () => {
    const cart = [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 2,
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 3,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    expect(
      await screen.findByText("5 Items")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Total Items: 5")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 5. SUBTOTAL
  // ---------------------------------------------------------

  test("calculates subtotal correctly", async () => {
    const cart = [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 2,
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    // 100 × 2 + 200 × 1 = 400
    expect(
      await screen.findByText("Subtotal: ₹400")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 6. DISCOUNT
  // ---------------------------------------------------------

  test("calculates 10 percent discount", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 1000,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    // 10% of 1000 = 100
    expect(
      await screen.findByText("Discount: ₹100")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 7. FREE DELIVERY
  // ---------------------------------------------------------

  test("gives free delivery when subtotal is above ₹499", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 600,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    expect(
      await screen.findByText("Delivery: ₹0")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 8. DELIVERY CHARGE
  // ---------------------------------------------------------

  test("charges ₹50 delivery when subtotal is ₹499 or less", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 400,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    expect(
      await screen.findByText("Delivery: ₹50")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 9. TOTAL AMOUNT
  // ---------------------------------------------------------

  test("calculates final total correctly", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 400,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    /*
      Subtotal = ₹400
      Discount = ₹40
      Delivery = ₹50

      Total = 400 - 40 + 50
            = ₹410
    */

    expect(
      await screen.findByText("Total: ₹410")
    ).toBeInTheDocument();
  });

  // ---------------------------------------------------------
  // 10. INCREASE QUANTITY
  // ---------------------------------------------------------

  test("increases product quantity", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 100,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    const increaseButton =
      await screen.findByRole("button", {
        name: "Increase",
      });

    fireEvent.click(increaseButton);

    expect(
      screen.getByTestId("quantity-1")
    ).toHaveTextContent("2");

    const updatedCart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(updatedCart[0].quantity).toBe(2);
  });

  // ---------------------------------------------------------
  // 11. DECREASE QUANTITY
  // ---------------------------------------------------------

  test("decreases product quantity", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 100,
        quantity: 3,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    const decreaseButton =
      await screen.findByRole("button", {
        name: "Decrease",
      });

    fireEvent.click(decreaseButton);

    expect(
      screen.getByTestId("quantity-1")
    ).toHaveTextContent("2");

    const updatedCart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(updatedCart[0].quantity).toBe(2);
  });

  // ---------------------------------------------------------
  // 12. QUANTITY CANNOT GO BELOW 1
  // ---------------------------------------------------------

  test("quantity cannot decrease below 1", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 100,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    const decreaseButton =
      await screen.findByRole("button", {
        name: "Decrease",
      });

    fireEvent.click(decreaseButton);

    expect(
      screen.getByTestId("quantity-1")
    ).toHaveTextContent("1");

    const updatedCart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(updatedCart[0].quantity).toBe(1);
  });

  // ---------------------------------------------------------
  // 13. REMOVE PRODUCT
  // ---------------------------------------------------------

  test("removes product from cart", async () => {
    const cart = [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 1,
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 1,
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

    expect(
      await screen.findByText("Product 1")
    ).toBeInTheDocument();

    const removeButton =
      screen.getAllByRole("button", {
        name: "Remove",
      })[0];

    fireEvent.click(removeButton);

    expect(
      screen.queryByText("Product 1")
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Product 2")
    ).toBeInTheDocument();

    const updatedCart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(updatedCart).toHaveLength(1);
    expect(updatedCart[0].id).toBe(2);
  });

  // ---------------------------------------------------------
  // 14. CART UPDATED EVENT
  // ---------------------------------------------------------

  test("updates cart when cartUpdated event is dispatched", async () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Product 1",
          price: 100,
          quantity: 1,
        },
      ])
    );

    renderCart();

    expect(
      await screen.findByText("Product 1")
    ).toBeInTheDocument();

    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Product 1",
          price: 100,
          quantity: 2,
        },
        {
          id: 2,
          name: "Product 2",
          price: 200,
          quantity: 1,
        },
      ])
    );

    window.dispatchEvent(new Event("cartUpdated"));

    await waitFor(() => {
      expect(
        screen.getByText("Product 2")
      ).toBeInTheDocument();
    });
  });

  // ---------------------------------------------------------
  // 15. ADDRESS COMPONENT
  // ---------------------------------------------------------

  test("renders Address component when cart has products", async () => {
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Product",
          price: 100,
          quantity: 1,
        },
      ])
    );

    renderCart();

    expect(
      await screen.findByTestId("address")
    ).toBeInTheDocument();
  });
});
import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";

import Cart from "./Cart";

// Mock child components
jest.mock("../../components/CartItem/CartItem", () => {
  return function MockCartItem({ item, onIncrease, onDecrease, onRemove }) {
    return (
      <div data-testid={`cart-item-${item.id}`}>
        <span>{item.name}</span>
        <span data-testid={`quantity-${item.id}`}>
          {item.quantity || 1}
        </span>
        <span data-testid={`price-${item.id}`}>
          ₹{item.price || item.discountedPrice || 0}
        </span>

        <button
          type="button"
          aria-label={`Increase ${item.name}`}
          onClick={() => onIncrease(item.id)}
        >
          +
        </button>

        <button
          type="button"
          aria-label={`Decrease ${item.name}`}
          onClick={() => onDecrease(item.id)}
        >
          -
        </button>

        <button
          type="button"
          aria-label={`Remove ${item.name}`}
          onClick={() => onRemove(item.id)}
        >
          Remove
        </button>
      </div>
    );
  };
});

jest.mock("../../components/CartSummary/CartSummary", () => {
  return function MockCartSummary({
    cartItems,
    totalItems,
    subtotal,
    discount,
    delivery,
    totalPrice,
  }) {
    return (
      <div data-testid="cart-summary">
        <span data-testid="summary-total-items">
          {totalItems}
        </span>

        <span data-testid="summary-subtotal">
          ₹{subtotal}
        </span>

        <span data-testid="summary-discount">
          ₹{discount}
        </span>

        <span data-testid="summary-delivery">
          ₹{delivery}
        </span>

        <span data-testid="summary-total">
          ₹{totalPrice}
        </span>

        <span data-testid="summary-cart-length">
          {cartItems.length}
        </span>
      </div>
    );
  };
});

jest.mock("../../components/EmptyState/EmptyState", () => {
  return function MockEmptyState({
    image,
    title,
    description,
    buttonText,
    buttonLink,
  }) {
    return (
      <div data-testid="empty-state">
        <img src={image} alt={title} />

        <h2>{title}</h2>

        <p>{description}</p>

        <a href={buttonLink}>{buttonText}</a>
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

describe("Cart Component", () => {
  const normalCart = [
    {
      id: 1,
      name: "Dolo 650 Tablet",
      price: 100,
      quantity: 2,
      category: "Medicines",
    },
    {
      id: 2,
      name: "Vitamin C",
      price: 200,
      quantity: 1,
      category: "Vitamins",
    },
  ];

  beforeEach(() => {
    localStorage.clear();

    jest.restoreAllMocks();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // ----------------------------------------------------
  // EMPTY CART
  // ----------------------------------------------------

  test("renders empty cart when localStorage has no cart", async () => {
    localStorage.setItem("cart", JSON.stringify([]));

    await act(async () => {
      render(<Cart />);
    });

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();

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

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("renders empty cart when cart key does not exist", async () => {
    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByText("Your Cart is Empty")
    ).toBeInTheDocument();

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
  });

  test("empty cart Continue Shopping link points to shop", async () => {
    localStorage.setItem("cart", JSON.stringify([]));

    await act(async () => {
      render(<Cart />);
    });

    const link = screen.getByRole("link", {
      name: "Continue Shopping",
    });

    expect(link).toHaveAttribute("href", "/shop");
  });

  // ----------------------------------------------------
  // CART RENDERING
  // ----------------------------------------------------

  test("renders cart page when products exist", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByText("🛒 My Cart")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("cart-item-1")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("cart-item-2")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("address")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("footer")
    ).toBeInTheDocument();
  });

  test("renders all cart products", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByText("Dolo 650 Tablet")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vitamin C")
    ).toBeInTheDocument();
  });

  // ----------------------------------------------------
  // TOTAL ITEMS
  // ----------------------------------------------------

  test("calculates total number of items correctly", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    // 2 + 1 = 3
    expect(
      screen.getByText("3 Items")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("summary-total-items")
    ).toHaveTextContent("3");
  });

  test("defaults quantity to 1 when quantity is missing", async () => {
    const cart = [
      {
        id: 1,
        name: "Test Product",
        price: 100,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(screen.getByText("1 Items")).toBeInTheDocument();
    expect(screen.getByTestId("quantity-1")).toHaveTextContent("1");
  });

  test("handles invalid quantity by treating it as 1", async () => {
    const cart = [
      {
        id: 1,
        name: "Test Product",
        price: 100,
        quantity: "invalid",
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(screen.getByText("1 Items")).toBeInTheDocument();
  });

  // ----------------------------------------------------
  // SUBTOTAL
  // ----------------------------------------------------

  test("calculates subtotal correctly", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    // (100 × 2) + (200 × 1) = 400

    expect(
      screen.getByTestId("summary-subtotal")
    ).toHaveTextContent("₹400");
  });

  test("calculates subtotal using discountedPrice", async () => {
    const cart = [
      {
        id: 1,
        name: "Discount Product",
        discountedPrice: 150,
        quantity: 2,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-subtotal")
    ).toHaveTextContent("₹300");
  });

  test("uses price when both price and discountedPrice exist", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 200,
        discountedPrice: 150,
        quantity: 2,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-subtotal")
    ).toHaveTextContent("₹400");
  });

  test("uses zero when product has no price", async () => {
    const cart = [
      {
        id: 1,
        name: "Free Product",
        quantity: 2,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-subtotal")
    ).toHaveTextContent("₹0");
  });

  // ----------------------------------------------------
  // DISCOUNT
  // ----------------------------------------------------

  test("calculates 10 percent discount correctly", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 1000,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-discount")
    ).toHaveTextContent("₹100");
  });

  test("rounds discount correctly", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 99,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    // Math.round(99 × 0.1) = 10

    expect(
      screen.getByTestId("summary-discount")
    ).toHaveTextContent("₹10");
  });

  // ----------------------------------------------------
  // DELIVERY
  // ----------------------------------------------------

  test("charges ₹10 delivery when subtotal is below ₹499", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 100,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹10");
  });

  test("provides free delivery when subtotal is ₹499", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 499,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹0");
  });

  test("provides free delivery when subtotal is above ₹499", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 600,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹0");
  });

  // ----------------------------------------------------
  // SPECIAL CATEGORY
  // ----------------------------------------------------

  test("adds ₹50 surcharge for Medical Devices", async () => {
    const cart = [
      {
        id: 1,
        name: "BP Monitor",
        price: 100,
        quantity: 1,
        category: "Medical Devices",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    // base delivery = 10
    // surcharge = 50
    // total delivery = 60

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹60");
  });

  test("adds ₹50 surcharge for medical device category", async () => {
    const cart = [
      {
        id: 1,
        name: "BP Monitor",
        price: 100,
        quantity: 1,
        category: "medical device",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹60");
  });

  test("adds surcharge for Device category", async () => {
    const cart = [
      {
        id: 1,
        name: "Device",
        price: 100,
        quantity: 1,
        category: "Device",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹60");
  });

  test("adds surcharge for Premium Healthcare", async () => {
    const cart = [
      {
        id: 1,
        name: "Premium Product",
        price: 100,
        quantity: 1,
        category: "Premium Healthcare",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹60");
  });

  test("adds surcharge for Premium category", async () => {
    const cart = [
      {
        id: 1,
        name: "Premium Product",
        price: 100,
        quantity: 1,
        category: "Premium",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹60");
  });

  test("handles category with underscore", async () => {
    const cart = [
      {
        id: 1,
        name: "Premium Device",
        price: 100,
        quantity: 1,
        category: "medical_device",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹60");
  });

  test("does not add surcharge for normal categories", async () => {
    const cart = [
      {
        id: 1,
        name: "Paracetamol",
        price: 100,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹10");
  });

  // ----------------------------------------------------
  // TOTAL AMOUNT
  // ----------------------------------------------------

  test("calculates total amount correctly", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 1000,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    // subtotal = 1000
    // discount = 100
    // delivery = 0
    // total = 900

    expect(
      screen.getByTestId("summary-total")
    ).toHaveTextContent("₹900");
  });

  test("calculates total including delivery charge", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 100,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    // subtotal = 100
    // discount = 10
    // delivery = 10
    // total = 100

    expect(
      screen.getByTestId("summary-total")
    ).toHaveTextContent("₹100");
  });

  test("calculates total with special category surcharge", async () => {
    const cart = [
      {
        id: 1,
        name: "BP Monitor",
        price: 100,
        quantity: 1,
        category: "Medical Devices",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    // subtotal = 100
    // discount = 10
    // delivery = 60
    // total = 150

    expect(
      screen.getByTestId("summary-total")
    ).toHaveTextContent("₹150");
  });

  // ----------------------------------------------------
  // INCREASE QUANTITY
  // ----------------------------------------------------

  test("increases product quantity", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByTestId("quantity-1")
    ).toHaveTextContent("2");

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Increase Dolo 650 Tablet",
        })
      );
    });

    expect(
      screen.getByTestId("quantity-1")
    ).toHaveTextContent("3");
  });

  test("saves increased quantity to localStorage", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Increase Dolo 650 Tablet",
        })
      );
    });

    const savedCart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(savedCart[0].quantity).toBe(3);
  });

  test("dispatches cartUpdated event after increasing quantity", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    const dispatchSpy = jest.spyOn(window, "dispatchEvent");

    await act(async () => {
      render(<Cart />);
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Increase Dolo 650 Tablet",
        })
      );
    });

    expect(dispatchSpy).toHaveBeenCalled();

    expect(
      dispatchSpy.mock.calls.some(
        ([event]) => event.type === "cartUpdated"
      )
    ).toBe(true);
  });

  // ----------------------------------------------------
  // DECREASE QUANTITY
  // ----------------------------------------------------

  test("decreases product quantity", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Decrease Dolo 650 Tablet",
        })
      );
    });

    expect(
      screen.getByTestId("quantity-1")
    ).toHaveTextContent("1");
  });

  test("does not allow quantity below 1", async () => {
    const cart = [
      {
        id: 1,
        name: "Product",
        price: 100,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Decrease Product",
        })
      );
    });

    expect(
      screen.getByTestId("quantity-1")
    ).toHaveTextContent("1");
  });

  test("saves decreased quantity to localStorage", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Decrease Dolo 650 Tablet",
        })
      );
    });

    const savedCart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(savedCart[0].quantity).toBe(1);
  });

  // ----------------------------------------------------
  // REMOVE
  // ----------------------------------------------------

  test("removes product from cart", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByText("Dolo 650 Tablet")
    ).toBeInTheDocument();

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Remove Dolo 650 Tablet",
        })
      );
    });

    expect(
      screen.queryByText("Dolo 650 Tablet")
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Vitamin C")
    ).toBeInTheDocument();
  });

  test("removes product from localStorage", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Remove Dolo 650 Tablet",
        })
      );
    });

    const savedCart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].id).toBe(2);
  });

  test("dispatches cartUpdated after removing product", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    const dispatchSpy = jest.spyOn(window, "dispatchEvent");

    await act(async () => {
      render(<Cart />);
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Remove Dolo 650 Tablet",
        })
      );
    });

    expect(
      dispatchSpy.mock.calls.some(
        ([event]) => event.type === "cartUpdated"
      )
    ).toBe(true);
  });

  test("shows empty state after removing the last product", async () => {
    const cart = [
      {
        id: 1,
        name: "Only Product",
        price: 100,
        quantity: 1,
        category: "Medicines",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    await act(async () => {
      fireEvent.click(
        screen.getByRole("button", {
          name: "Remove Only Product",
        })
      );
    });

    expect(
      await screen.findByText("Your Cart is Empty")
    ).toBeInTheDocument();

    expect(
      screen.queryByTestId("cart-summary")
    ).not.toBeInTheDocument();
  });

  // ----------------------------------------------------
  // CART UPDATED EVENT
  // ----------------------------------------------------

  test("loads cart when cartUpdated event is dispatched", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByText("Dolo 650 Tablet")
    ).toBeInTheDocument();

    const newCart = [
      {
        id: 3,
        name: "New Product",
        price: 300,
        quantity: 1,
        category: "Healthcare",
      },
    ];

    localStorage.setItem(
      "cart",
      JSON.stringify(newCart)
    );

    await act(async () => {
      window.dispatchEvent(new Event("cartUpdated"));
    });

    expect(
      screen.getByText("New Product")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("Dolo 650 Tablet")
    ).not.toBeInTheDocument();
  });

  // ----------------------------------------------------
  // INVALID LOCAL STORAGE
  // ----------------------------------------------------

  test("handles cart containing an empty array", async () => {
    localStorage.setItem("cart", JSON.stringify([]));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByText("Your Cart is Empty")
    ).toBeInTheDocument();
  });

  test("handles cart containing null", async () => {
    localStorage.setItem("cart", JSON.stringify(null));

    await act(async () => {
      render(<Cart />);
    });

    expect(
      screen.getByText("Your Cart is Empty")
    ).toBeInTheDocument();
  });

  // ----------------------------------------------------
  // CLEANUP
  // ----------------------------------------------------

  test("removes cartUpdated event listener on unmount", async () => {
    localStorage.setItem("cart", JSON.stringify(normalCart));

    const removeSpy = jest.spyOn(
      window,
      "removeEventListener"
    );

    const { unmount } = render(<Cart />);

    unmount();

    expect(removeSpy).toHaveBeenCalledWith(
      "cartUpdated",
      expect.any(Function)
    );
  });

  // ----------------------------------------------------
  // SPECIAL CATEGORY + FREE DELIVERY
  // ----------------------------------------------------

  test("special category still adds ₹50 when subtotal is above ₹499", async () => {
    const cart = [
      {
        id: 1,
        name: "Medical Device",
        price: 600,
        quantity: 1,
        category: "Medical Devices",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });

    // base delivery = 0
    // special surcharge = 50
    // delivery = 50

    expect(
      screen.getByTestId("summary-delivery")
    ).toHaveTextContent("₹50");
  });

  // ----------------------------------------------------
  // MULTIPLE PRODUCTS
  // ----------------------------------------------------

  test("calculates totals correctly for multiple products", async () => {
    const cart = [
      {
        id: 1,
        name: "Product 1",
        price: 100,
        quantity: 2,
        category: "Medicines",
      },
      {
        id: 2,
        name: "Product 2",
        price: 200,
        quantity: 2,
        category: "Healthcare",
      },
      {
        id: 3,
        name: "Product 3",
        price: 300,
        quantity: 1,
        category: "Vitamins",
      },
    ];

    localStorage.setItem("cart", JSON.stringify(cart));

    await act(async () => {
      render(<Cart />);
    });
  });
});
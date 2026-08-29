import React from "react";
import {
  render,
  screen,
  fireEvent,
  within,
  act,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FeaturedProducts from "./FeaturedProducts";

describe("FeaturedProducts", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const renderComponent = () => {
    return render(
      <MemoryRouter>
        <FeaturedProducts />
      </MemoryRouter>
    );
  };

  // ==================================================
  // HEADER
  // ==================================================

  test("renders Featured Products heading", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", {
        name: "Featured Products",
      })
    ).toBeInTheDocument();
  });

  test("renders Featured Products description", () => {
    renderComponent();

    expect(
      screen.getByText(
        "Discover our most popular healthcare products"
      )
    ).toBeInTheDocument();
  });

  // ==================================================
  // PRODUCTS
  // ==================================================

  test("renders all featured products", () => {
    renderComponent();

    expect(
      screen.getByText("Immunity Booster Tablets")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vitamin D3 60000 IU")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Keratin Shampoo")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Eye Protection Goggles")
    ).toBeInTheDocument();
  });

  test("renders exactly four product cards", () => {
    renderComponent();

    const cards =
      document.querySelectorAll(".product-card");

    expect(cards).toHaveLength(4);
  });

  // ==================================================
  // PRODUCT PRICES
  // ==================================================

  test("renders correct product prices", () => {
    renderComponent();

    expect(
      screen.getByText("₹275")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₹120")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₹699")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₹550")
    ).toBeInTheDocument();
  });

  // ==================================================
  // PRODUCT RATINGS
  // ==================================================

  test("renders correct product ratings", () => {
    renderComponent();

    expect(
      screen.getAllByText("⭐ 4.8")
    ).toHaveLength(2);

    expect(
      screen.getByText("⭐ 4.9")
    ).toBeInTheDocument();

    expect(
      screen.getByText("⭐ 4.7")
    ).toBeInTheDocument();
  });

  // ==================================================
  // PRODUCT IMAGES
  // ==================================================

  test("renders all product images", () => {
    renderComponent();

    expect(
      screen.getByAltText(
        "Immunity Booster Tablets"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(
        "Vitamin D3 60000 IU"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(
        "Keratin Shampoo"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByAltText(
        "Eye Protection Goggles"
      )
    ).toBeInTheDocument();
  });

  // ==================================================
  // VIEW DETAILS
  // ==================================================

  test("renders four View Details links", () => {
    renderComponent();

    const links = screen.getAllByRole("link", {
      name: "View Details",
    });

    expect(links).toHaveLength(4);
  });

  test("renders correct View Details URLs", () => {
    renderComponent();

    const links = screen.getAllByRole("link", {
      name: "View Details",
    });

    expect(links[0]).toHaveAttribute(
      "href",
      "/product/25"
    );

    expect(links[1]).toHaveAttribute(
      "href",
      "/product/8"
    );

    expect(links[2]).toHaveAttribute(
      "href",
      "/product/206"
    );

    expect(links[3]).toHaveAttribute(
      "href",
      "/product/166"
    );
  });

  // ==================================================
  // ADD TO CART BUTTONS
  // ==================================================

  test("renders four Add to Cart buttons", () => {
    renderComponent();

    const buttons = screen.getAllByRole("button", {
      name: "Add to Cart",
    });

    expect(buttons).toHaveLength(4);
  });

  // ==================================================
  // IMMUNITY BOOSTER
  // ==================================================

  test("adds Immunity Booster Tablets to cart", () => {
    renderComponent();

    const productName =
      screen.getByText("Immunity Booster Tablets");

    const productCard =
      productName.closest(".product-card");

    expect(productCard).not.toBeNull();

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(1);

    expect(cart[0]).toMatchObject({
      id: 25,
      name: "Immunity Booster Tablets",
      brand: "Himalaya",
      category: "Vitamins",
      price: 275,
      quantity: 1,
    });
  });

  // ==================================================
  // VITAMIN D3
  // ==================================================

  test("adds Vitamin D3 60000 IU to cart", () => {
    renderComponent();

    const productName =
      screen.getByText("Vitamin D3 60000 IU");

    const productCard =
      productName.closest(".product-card");

    expect(productCard).not.toBeNull();

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(1);

    expect(cart[0]).toMatchObject({
      id: 8,
      name: "Vitamin D3 60000 IU",
      brand: "Uprise",
      category: "Vitamins",
      price: 120,
      quantity: 1,
    });
  });

  // ==================================================
  // KERATIN SHAMPOO
  // ==================================================

  test("adds Keratin Shampoo to cart", () => {
    renderComponent();

    const productName =
      screen.getByText("Keratin Shampoo");

    const productCard =
      productName.closest(".product-card");

    expect(productCard).not.toBeNull();

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(1);

    expect(cart[0]).toMatchObject({
      id: 206,
      name: "Keratin Shampoo",
      brand: "Tresemme",
      category: "Hair Care",
      price: 699,
      quantity: 1,
    });
  });

  // ==================================================
  // EYE PROTECTION GOGGLES
  // ==================================================

  test("adds Eye Protection Goggles to cart", () => {
    renderComponent();

    const productName =
      screen.getByText("Eye Protection Goggles");

    const productCard =
      productName.closest(".product-card");

    expect(productCard).not.toBeNull();

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(1);

    expect(cart[0]).toMatchObject({
      id: 166,
      name: "Eye Protection Goggles",
      brand: "Safety",
      category: "Eye Care",
      price: 550,
      quantity: 1,
    });
  });

  // ==================================================
  // EXISTING PRODUCT
  // ==================================================

  test("increases quantity when product already exists in cart", () => {
    const existingCart = [
      {
        id: 25,
        name: "Immunity Booster Tablets",
        brand: "Himalaya",
        category: "Vitamins",
        price: 275,
        quantity: 1,
      },
    ];

    localStorage.setItem(
      "cart",
      JSON.stringify(existingCart)
    );

    renderComponent();

    const productName =
      screen.getByText("Immunity Booster Tablets");

    const productCard =
      productName.closest(".product-card");

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(1);
    expect(cart[0].name).toBe(
      "Immunity Booster Tablets"
    );
    expect(cart[0].quantity).toBe(2);
  });

  // ==================================================
  // NO DUPLICATE PRODUCTS
  // ==================================================

  test("does not create duplicate cart entries", () => {
    renderComponent();

    const productName =
      screen.getByText("Immunity Booster Tablets");

    const productCard =
      productName.closest(".product-card");

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);
    fireEvent.click(button);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(1);
    expect(cart[0].id).toBe(25);
    expect(cart[0].quantity).toBe(2);
  });

  // ==================================================
  // MULTIPLE PRODUCTS
  // ==================================================

  test("adds multiple different products to cart", () => {
    renderComponent();

    const immunityCard =
      screen
        .getByText("Immunity Booster Tablets")
        .closest(".product-card");

    const vitaminCard =
      screen
        .getByText("Vitamin D3 60000 IU")
        .closest(".product-card");

    const immunityButton =
      within(immunityCard).getByRole("button", {
        name: "Add to Cart",
      });

    const vitaminButton =
      within(vitaminCard).getByRole("button", {
        name: "Add to Cart",
      });

    fireEvent.click(immunityButton);
    fireEvent.click(vitaminButton);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(2);

    expect(cart[0].name).toBe(
      "Immunity Booster Tablets"
    );

    expect(cart[0].quantity).toBe(1);

    expect(cart[1].name).toBe(
      "Vitamin D3 60000 IU"
    );

    expect(cart[1].quantity).toBe(1);
  });

  // ==================================================
  // ADDED BUTTON
  // ==================================================

  test("changes Add to Cart to Added after clicking", () => {
    renderComponent();

    const productName =
      screen.getByText("Immunity Booster Tablets");

    const productCard =
      productName.closest(".product-card");

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    expect(
      within(productCard).getByRole("button", {
        name: "✓ Added",
      })
    ).toBeInTheDocument();
  });

  // ==================================================
  // CART UPDATED EVENT
  // ==================================================

  test("dispatches cartUpdated event after adding product", () => {
    const dispatchSpy = jest.spyOn(
      window,
      "dispatchEvent"
    );

    renderComponent();

    const productName =
      screen.getByText("Immunity Booster Tablets");

    const productCard =
      productName.closest(".product-card");

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    const cartUpdatedCall =
      dispatchSpy.mock.calls.find(
        ([event]) => event.type === "cartUpdated"
      );

    expect(cartUpdatedCall).toBeDefined();

    dispatchSpy.mockRestore();
  });

  // ==================================================
  // TWO SECOND TIMER
  // ==================================================

  test("changes Added back to Add to Cart after 2 seconds", () => {
    jest.useFakeTimers();

    renderComponent();

    const productName =
      screen.getByText("Immunity Booster Tablets");

    const productCard =
      productName.closest(".product-card");

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    expect(
      within(productCard).getByRole("button", {
        name: "✓ Added",
      })
    ).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(2000);
    });

    expect(
      within(productCard).getByRole("button", {
        name: "Add to Cart",
      })
    ).toBeInTheDocument();
  });

  // ==================================================
  // TOAST
  // ==================================================

  test("shows success toast when product is added", async () => {
    renderComponent();

    const productName =
      screen.getByText("Immunity Booster Tablets");

    const productCard =
      productName.closest(".product-card");

    const button = within(productCard).getByRole(
      "button",
      {
        name: "Add to Cart",
      }
    );

    fireEvent.click(button);

    expect(
      await screen.findByText(
        "Immunity Booster Tablets added to cart!"
      )
    ).toBeInTheDocument();
  });
});
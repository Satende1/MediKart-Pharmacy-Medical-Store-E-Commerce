import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FlashSale from "./FlashSale";

describe("FlashSale", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  test("Flash Sale component renders", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    expect(
      screen.getByText("🔥 Flash Sale")
    ).toBeInTheDocument();
  });


  test("Limited Time Deals is displayed", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Limited Time Deals")
    ).toBeInTheDocument();
  });


  test("all products are displayed", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    expect(screen.getByText("Dolo 650")).toBeInTheDocument();

    expect(
      screen.getByText("Pain Relief")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Revital for Men/Women")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vitamin C Chewable")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Glucometer Kit")
    ).toBeInTheDocument();

    expect(
      screen.getByText("BP Monitor")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sanitizer")
    ).toBeInTheDocument();

    expect(
      screen.getByText("N95 Mask")
    ).toBeInTheDocument();
  });


  test("Add to Cart buttons are displayed", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button", {
      name: "Add to Cart",
    });

    expect(buttons).toHaveLength(8);
  });


  test("product is added to cart", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button", {
      name: "Add to Cart",
    });

    fireEvent.click(buttons[0]);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart).toHaveLength(1);

    expect(cart[0].id).toBe(9008);

    expect(cart[0].name).toBe("Dolo 650");

    expect(cart[0].price).toBe(24.09);

    expect(cart[0].quantity).toBe(1);
  });


  test("same product quantity increases", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole("button", {
      name: "Add to Cart",
    });

    fireEvent.click(buttons[0]);

    fireEvent.click(buttons[0]);

    const cart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(cart[0].quantity).toBe(2);
  });


  test("View Details links are displayed", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    const links = screen.getAllByText(
      "View Details"
    );

    expect(links).toHaveLength(8);
  });


  test("Dolo 650 View Details link is correct", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    const links = screen.getAllByText(
      "View Details"
    );

    expect(links[0]).toHaveAttribute(
      "href",
      "/product/9008"
    );
  });


  test("timer labels are displayed", () => {
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Hours")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Minutes")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Seconds")
    ).toBeInTheDocument();
  });

});
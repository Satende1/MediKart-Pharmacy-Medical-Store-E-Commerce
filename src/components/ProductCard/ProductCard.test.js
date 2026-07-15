import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ProductCard from "./ProductCard";


// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


describe("ProductCard Component", () => {

  const product = {
    id: 1,
    name: "Paracetamol 500mg",
    category: "Medicine",
    price: 100,
    rating: 4.8,
    image: "/product.png",
  };


  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });


  test("renders product details", () => {

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );


    expect(
      screen.getByText("Paracetamol 500mg")
    ).toBeInTheDocument();


    expect(
      screen.getByText("Medicine")
    ).toBeInTheDocument();


    expect(
      screen.getByText("₹100")
    ).toBeInTheDocument();


    expect(
      screen.getByText("⭐ 4.8")
    ).toBeInTheDocument();

  });



  test("renders product image", () => {

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );


    const image =
      screen.getByAltText(
        "Paracetamol 500mg"
      );


    expect(image).toBeInTheDocument();


    expect(image.src).toContain(
      "product.png"
    );

  });



  test("View Details link has correct path", () => {

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );


    const link =
      screen.getByText(
        "View Details"
      );


    expect(link).toHaveAttribute(
      "href",
      "/product/1"
    );

  });



  test("adds product to cart", () => {

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );


    fireEvent.click(
      screen.getByText(
        "Add to Cart"
      )
    );


    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      );


    expect(cart).toHaveLength(1);


    expect(cart[0].name)
      .toBe("Paracetamol 500mg");


    expect(cart[0].quantity)
      .toBe(1);

  });



  test("increases quantity if product already exists", () => {

    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          ...product,
          quantity: 2,
        },
      ])
    );


    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );


    fireEvent.click(
      screen.getByText(
        "Add to Cart"
      )
    );


    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      );


    expect(
      cart[0].quantity
    ).toBe(3);

  });



  test("navigates to cart after adding product", () => {

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );


    fireEvent.click(
      screen.getByText(
        "Add to Cart"
      )
    );


    expect(
      mockNavigate
    ).toHaveBeenCalledWith(
      "/cart"
    );

  });



  test("dispatches cartUpdated event", () => {

    const eventHandler = jest.fn();


    window.addEventListener(
      "cartUpdated",
      eventHandler
    );


    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );


    fireEvent.click(
      screen.getByText(
        "Add to Cart"
      )
    );


    expect(
      eventHandler
    ).toHaveBeenCalled();


    window.removeEventListener(
      "cartUpdated",
      eventHandler
    );

  });

});
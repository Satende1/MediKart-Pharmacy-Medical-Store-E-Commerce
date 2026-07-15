import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import FlashSale from "./FlashSale";


// Mock Images
jest.mock("../assets/FlashSale/Debo650.jpg", () => "dolo.jpg");
jest.mock("../assets/FlashSale/crocin.jpg", () => "crocin.jpg");
jest.mock("../assets/FlashSale/revital.jpg", () => "revital.jpg");
jest.mock("../assets/FlashSale/limcee.jpg", () => "limcee.jpg");
jest.mock("../assets/FlashSale/glucometer.jpg", () => "glucometer.jpg");
jest.mock("../assets/FlashSale/bpMonitor.jpg", () => "bp.jpg");
jest.mock("../assets/FlashSale/n95mask.jpg", () => "mask.jpg");
jest.mock("../assets/FlashSale/sanitizer.jpg", () => "sanitizer.jpg");


describe("FlashSale Component", () => {


  beforeEach(() => {

    localStorage.clear();

    jest.clearAllMocks();

  });



  test("renders Flash Sale heading", () => {

    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );


    expect(
      screen.getByText("🔥 Flash Sale")
    ).toBeInTheDocument();


    expect(
      screen.getByText("Limited Time Deals")
    ).toBeInTheDocument();

  });



  test("renders all flash sale products", () => {

    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );


    expect(
      screen.getByText("Dolo 650")
    ).toBeInTheDocument();


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


  });



  test("renders countdown timer", () => {

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



  test("renders View Details links", () => {

    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );


    const links =
      screen.getAllByText(
        "View Details"
      );


    expect(links.length)
      .toBeGreaterThan(0);


    expect(links[0])
      .toHaveAttribute(
        "href",
        "/product/8"
      );

  });



  test("adds product to cart", () => {

    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );


    const buttons =
      screen.getAllByText(
        "Add to Cart"
      );


    fireEvent.click(
      buttons[0]
    );


    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      );


    expect(cart)
      .toHaveLength(1);


    expect(cart[0].name)
      .toBe("Dolo 650");


    expect(cart[0].quantity)
      .toBe(1);


  });



  test("increases quantity when product already exists", () => {


    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id:8,
          name:"Dolo 650",
          price:95,
          quantity:2
        }
      ])
    );



    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );



    const buttons =
      screen.getAllByText(
        "Add to Cart"
      );



    fireEvent.click(
      buttons[0]
    );



    const cart =
      JSON.parse(
        localStorage.getItem("cart")
      );



    expect(
      cart[0].quantity
    ).toBe(3);



  });



  test("dispatches cartUpdated event", () => {


    const eventHandler =
      jest.fn();



    window.addEventListener(
      "cartUpdated",
      eventHandler
    );



    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );



    fireEvent.click(
      screen.getAllByText(
        "Add to Cart"
      )[0]
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
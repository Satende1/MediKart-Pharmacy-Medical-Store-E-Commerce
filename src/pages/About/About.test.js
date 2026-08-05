import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import About from "./About";

// Mock Footer
jest.mock("../../components/Footer/Footer", () => () => (
  <div data-testid="footer">Footer</div>
));

describe("About Component", () => {
  test("renders hero section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText("About MEDIKART")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Your trusted online healthcare and pharmacy partner/i
      )
    ).toBeInTheDocument();
  });

  test("renders Who We Are section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText("Who We Are")).toBeInTheDocument();

    expect(
      screen.getByText(/MEDIKART is an online pharmacy/i)
    ).toBeInTheDocument();
  });

  test("renders Why Choose MEDIKART section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Why Choose MEDIKART?")
    ).toBeInTheDocument();

    expect(
      screen.getByText("100% Genuine Medicines")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Fast Delivery")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Affordable Prices")
    ).toBeInTheDocument();

    expect(
      screen.getByText("24×7 Customer Support")
    ).toBeInTheDocument();
  });

  test("renders mission section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByText("Our Mission")).toBeInTheDocument();

    expect(
      screen.getByText(
        /Our mission is to provide trusted healthcare products/i
      )
    ).toBeInTheDocument();
  });

  test("renders contact section", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Need Assistance?")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/support@medikart.com/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/\+91 98765 43210/i)
    ).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
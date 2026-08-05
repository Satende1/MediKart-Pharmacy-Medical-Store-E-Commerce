import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import Checkout from "./Checkout";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

beforeEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

describe("Checkout Component", () => {
  beforeEach(() => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "John Doe",
        email: "john@example.com",
        phone: "9876543210",
      })
    );

    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Paracetamol",
          image: "test.jpg",
          price: 100,
          quantity: 2,
        },
      ])
    );
  });

  test("renders checkout page", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByText("PRICE DETAILS")).toBeInTheDocument();
    expect(screen.getByText("Paracetamol")).toBeInTheDocument();
  });

  test("renders user information", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("9876543210")).toBeInTheDocument();
  });

  test("renders address fields", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mobile Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("House / Flat No.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Street / Area")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("City")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("State")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Pincode")).toBeInTheDocument();
  });

  test("changes shipping method", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText(/Express Delivery/i));

    expect(screen.getByLabelText(/Express Delivery/i)).toBeChecked();
  });

  test("changes payment method", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByLabelText(/UPI/i));

    expect(screen.getByLabelText(/UPI/i)).toBeChecked();
  });

  test("shows place order button", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: /PLACE ORDER/i })
    ).toBeInTheDocument();
  });

  test("navigates to profile when CHANGE button is clicked", () => {
    render(
      <MemoryRouter>
        <Checkout />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("CHANGE"));

    expect(mockNavigate).toHaveBeenCalledWith("/profile");
  });
});
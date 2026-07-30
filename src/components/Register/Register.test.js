import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";
import Register from "./Register";

// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Register Component", () => {

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test("renders register page", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    expect(screen.getByText("Create Account")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Full Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email Address")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Mobile Number")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Confirm Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /register/i })).toBeInTheDocument();
  });

  test("shows validation errors when form is empty", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    expect(screen.getByText("Full Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Mobile Number is required")).toBeInTheDocument();
    expect(screen.getByText("Password is required")).toBeInTheDocument();
    expect(screen.getByText("Accept Terms & Conditions")).toBeInTheDocument();
  });

  test("shows invalid email error", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Email Address"), {target: { value: "abc" },});
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(screen.getByText("Invalid email address")).toBeInTheDocument();
  });

  test("shows password mismatch error", () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Password"), {target: { value: "123456" },});
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"), {target: { value: "654321" },});
    fireEvent.click(screen.getByRole("button", { name: /register/i }));
    expect(screen.getByText("Passwords do not match")).toBeInTheDocument();
  });

  test("registers successfully", () => {
    window.alert = jest.fn();

    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    );

    fireEvent.change(screen.getByPlaceholderText("Full Name"),);
    fireEvent.change(screen.getByPlaceholderText("Email Address"),);
    fireEvent.change(screen.getByPlaceholderText("Mobile Number"), );
    fireEvent.change(screen.getByPlaceholderText("Password"), );
    fireEvent.change(screen.getByPlaceholderText("Confirm Password"),);

    fireEvent.click(screen.getByRole("checkbox"));

    fireEvent.click(screen.getByRole("button", { name: /register/i }));
  });

});
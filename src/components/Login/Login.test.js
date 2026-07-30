import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "./Login";

// Mock image import
jest.mock("../../assets/Login pages.png", () => "banner.png");

// Mock useNavigate
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
    mockedNavigate.mockClear();
  });

  test("renders login page", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(screen.getByText(/Welcome Back!/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Username/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Password/i)
    ).toBeInTheDocument();
  });

  test("shows validation errors when fields are empty", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    expect(
      screen.getByText("Username is required")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Password is required")
    ).toBeInTheDocument();
  });

  test("updates username input", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const usernameInput =
      screen.getByPlaceholderText(/Username/i);

    fireEvent.change(usernameInput, {
      target: { value: "satender" },
    });

    expect(usernameInput.value).toBe("satender");
  });

  test("updates password input", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const passwordInput =
      screen.getByPlaceholderText(/Password/i);

    fireEvent.change(passwordInput, {
      target: { value: "123456" },
    });

    expect(passwordInput.value).toBe("123456");
  });

  test("logs in successfully", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText(/Username/i),
      {
        target: { value: "satender" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/Password/i),
      {
        target: { value: "123456" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(localStorage.getItem("username")).toBe(
      "satender"
    );

    expect(localStorage.getItem("isLoggedIn")).toBe(
      "true"
    );

    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  test("remember me checkbox works", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    const checkbox =
      screen.getByLabelText(/Remember Me/i);

    fireEvent.click(checkbox);

    expect(checkbox.checked).toBe(true);
  });

  test("forgot password link exists", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Forgot Password/i)
    ).toBeInTheDocument();
  });

  test("signup link exists", () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );

    expect(
      screen.getByText(/Sign Up/i)
    ).toBeInTheDocument();
  });
});
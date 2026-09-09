import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Register from "./Register";

const renderRegister = (props = {}) => {
  return render(
    <BrowserRouter>
      <Register {...props} />
    </BrowserRouter>
  );
};

describe("Register Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    window.alert = jest.fn();
  });

  test("renders registration page", () => {
    renderRegister();

    expect(
      screen.getByRole("heading", {
        name: /create account/i,
      })
    ).toBeInTheDocument();
  });

  test("renders all input fields", () => {
    renderRegister();

    expect(
      screen.getByPlaceholderText(/enter your full name/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/enter your email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/create a password/i)
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/confirm your password/i)
    ).toBeInTheDocument();
  });

  test("renders create account button", () => {
    renderRegister();

    expect(
      screen.getByRole("button", {
        name: /create account/i,
      })
    ).toBeInTheDocument();
  });

  test("renders login button", () => {
    renderRegister();

    expect(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    ).toBeInTheDocument();
  });

  test("shows validation error when fields are empty", () => {
    renderRegister();

    fireEvent.click(
      screen.getByRole("button", {
        name: /create account/i,
      })
    );

    expect(
      screen.getByText(/please fill in all fields/i)
    ).toBeInTheDocument();
  });

  test("updates name input", () => {
    renderRegister();

    const input = screen.getByPlaceholderText(
      /enter your full name/i
    );

    fireEvent.change(input, {
      target: {
        name: "name",
        value: "test",
      },
    });

    expect(input).toHaveValue("test");
  });

  test("updates email input", () => {
    renderRegister();

    const input = screen.getByPlaceholderText(
      /enter your email/i
    );

    fireEvent.change(input, {
      target: {
        name: "email",
        value: "test@test.com",
      },
    });

    expect(input).toHaveValue("test@test.com");
  });

  test("updates password input", () => {
    renderRegister();

    const input = screen.getByPlaceholderText(
      /create a password/i
    );

    fireEvent.change(input, {
      target: {
        name: "password",
        value: "123",
      },
    });

    expect(input).toHaveValue("123");
  });

  test("shows password length validation error", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText(/enter your full name/i),
      {
        target: {
          name: "name",
          value: "test",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/enter your email/i),
      {
        target: {
          name: "email",
          value: "test@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/create a password/i),
      {
        target: {
          name: "password",
          value: "123",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/confirm your password/i),
      {
        target: {
          name: "confirmPassword",
          value: "123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /create account/i,
      })
    );

    expect(
      screen.getByText(
        /password must be at least 6 characters/i
      )
    ).toBeInTheDocument();
  });

  test("shows password mismatch error", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText(/enter your full name/i),
      {
        target: {
          name: "name",
          value: "test",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/enter your email/i),
      {
        target: {
          name: "email",
          value: "test@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/create a password/i),
      {
        target: {
          name: "password",
          value: "123456",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/confirm your password/i),
      {
        target: {
          name: "confirmPassword",
          value: "654321",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /create account/i,
      })
    );

    expect(
      screen.getByText(/passwords do not match/i)
    ).toBeInTheDocument();
  });

  test("toggles password visibility", () => {
    renderRegister();

    const passwordInput = screen.getByPlaceholderText(
      /create a password/i
    );

    const toggleButtons = screen.getAllByRole("button", {
      name: "",
    });

    const passwordToggle = toggleButtons.find(
      (button) =>
        button.classList.contains("password-toggle")
    );

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );

    fireEvent.click(passwordToggle);

    expect(passwordInput).toHaveAttribute(
      "type",
      "text"
    );

    fireEvent.click(passwordToggle);

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("toggles confirm password visibility", () => {
    renderRegister();

    const confirmInput = screen.getByPlaceholderText(
      /confirm your password/i
    );

    const toggleButtons = screen
      .getAllByRole("button")
      .filter((button) =>
        button.classList.contains("password-toggle")
      );

    expect(confirmInput).toHaveAttribute(
      "type",
      "password"
    );

    fireEvent.click(toggleButtons[1]);

    expect(confirmInput).toHaveAttribute(
      "type",
      "text"
    );
  });

  test("clears error when input changes", () => {
    renderRegister();

    fireEvent.click(
      screen.getByRole("button", {
        name: /create account/i,
      })
    );

    expect(
      screen.getByText(/please fill in all fields/i)
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText(/enter your full name/i),
      {
        target: {
          name: "name",
          value: "test",
        },
      }
    );

    expect(
      screen.queryByText(/please fill in all fields/i)
    ).not.toBeInTheDocument();
  });

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    renderRegister({ onClose });

    fireEvent.click(
      screen.getByRole("button", {
        name: /close/i,
      })
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("calls onSwitchToLogin when login button is clicked", () => {
    const onSwitchToLogin = jest.fn();

    renderRegister({ onSwitchToLogin });

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(onSwitchToLogin).toHaveBeenCalledTimes(1);
  });

  test("renders healthcare image", () => {
    renderRegister();

    expect(
      screen.getByAltText(/medikart healthcare/i)
    ).toBeInTheDocument();
  });
});
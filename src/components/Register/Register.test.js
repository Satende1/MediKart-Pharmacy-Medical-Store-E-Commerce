import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Register Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  const renderRegister = () => {
    return render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  };

  // --------------------------------------------------
  // 1. RENDERING
  // --------------------------------------------------

  test("renders Create Account heading", () => {
    renderRegister();

    expect(
      screen.getByRole("heading", { name: "Create Account" })
    ).toBeInTheDocument();
  });

  test("renders register description", () => {
    renderRegister();

    expect(
      screen.getByText(
        "Join MEDIKART and manage your healthcare easily."
      )
    ).toBeInTheDocument();
  });

  test("renders all form fields", () => {
    renderRegister();

    expect(
      screen.getByPlaceholderText("Enter your full name")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Create a password")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Confirm your password")
    ).toBeInTheDocument();
  });

  test("renders Create Account button", () => {
    renderRegister();

    expect(
      screen.getByRole("button", { name: "Create Account" })
    ).toBeInTheDocument();
  });

  test("renders Login link", () => {
    renderRegister();

    const loginLink = screen.getByRole("link", {
      name: /login/i,
    });

    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute("href", "/login");
  });

  test("renders healthcare image", () => {
    renderRegister();

    const image = screen.getByAltText("MEDIKART Healthcare");

    expect(image).toBeInTheDocument();
  });

  test("renders image overlay content", () => {
    renderRegister();

    expect(
      screen.getByText("Your Health, Our Priority")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        /Get medicines, healthcare products and wellness essentials/i
      )
    ).toBeInTheDocument();
  });

  // --------------------------------------------------
  // 2. INPUT CHANGES
  // --------------------------------------------------

  test("updates full name input", () => {
    renderRegister();

    const nameInput = screen.getByPlaceholderText(
      "Enter your full name"
    );

    fireEvent.change(nameInput, {
      target: {
        name: "name",
        value: "John Doe",
      },
    });

    expect(nameInput).toHaveValue("John Doe");
  });

  test("updates email input", () => {
    renderRegister();

    const emailInput = screen.getByPlaceholderText(
      "Enter your email"
    );

    fireEvent.change(emailInput, {
      target: {
        name: "email",
        value: "john@example.com",
      },
    });

    expect(emailInput).toHaveValue("john@example.com");
  });

  test("updates password input", () => {
    renderRegister();

    const passwordInput = screen.getByPlaceholderText(
      "Create a password"
    );

    fireEvent.change(passwordInput, {
      target: {
        name: "password",
        value: "password123",
      },
    });

    expect(passwordInput).toHaveValue("password123");
  });

  test("updates confirm password input", () => {
    renderRegister();

    const confirmPasswordInput = screen.getByPlaceholderText(
      "Confirm your password"
    );

    fireEvent.change(confirmPasswordInput, {
      target: {
        name: "confirmPassword",
        value: "password123",
      },
    });

    expect(confirmPasswordInput).toHaveValue("password123");
  });

  // --------------------------------------------------
  // 3. VALIDATION
  // --------------------------------------------------

  test("shows error when fields are empty", () => {
    renderRegister();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Account",
      })
    );

    expect(
      screen.getByText("Please fill in all fields.")
    ).toBeInTheDocument();
  });

  test("shows error when password is less than 6 characters", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full name"),
      {
        target: {
          name: "name",
          value: "John Doe",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your email"),
      {
        target: {
          name: "email",
          value: "john@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Create a password"),
      {
        target: {
          name: "password",
          value: "12345",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm your password"),
      {
        target: {
          name: "confirmPassword",
          value: "12345",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Account",
      })
    );

    expect(
      screen.getByText(
        "Password must be at least 6 characters."
      )
    ).toBeInTheDocument();
  });

  test("shows error when passwords do not match", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full name"),
      {
        target: {
          name: "name",
          value: "John Doe",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your email"),
      {
        target: {
          name: "email",
          value: "john@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Create a password"),
      {
        target: {
          name: "password",
          value: "password123",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm your password"),
      {
        target: {
          name: "confirmPassword",
          value: "different123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Account",
      })
    );

    expect(
      screen.getByText("Passwords do not match.")
    ).toBeInTheDocument();
  });

  // --------------------------------------------------
  // 4. ERROR CLEARING
  // --------------------------------------------------

  test("clears error when user changes an input", () => {
    renderRegister();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Account",
      })
    );

    expect(
      screen.getByText("Please fill in all fields.")
    ).toBeInTheDocument();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full name"),
      {
        target: {
          name: "name",
          value: "John",
        },
      }
    );

    expect(
      screen.queryByText("Please fill in all fields.")
    ).not.toBeInTheDocument();
  });

  // --------------------------------------------------
  // 5. PASSWORD VISIBILITY
  // --------------------------------------------------

  test("toggles password visibility", () => {
    renderRegister();

    const passwordInput = screen.getByPlaceholderText(
      "Create a password"
    );

    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButtons = screen.getAllByRole("button");

    // First password toggle is after close button
    const passwordToggle = toggleButtons.find(
      (button) =>
        button.className === "password-toggle"
    );

    expect(passwordToggle).toBeInTheDocument();

    fireEvent.click(passwordToggle);

    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(passwordToggle);

    expect(passwordInput).toHaveAttribute("type", "password");
  });

  test("toggles confirm password visibility", () => {
    renderRegister();

    const confirmPasswordInput =
      screen.getByPlaceholderText(
        "Confirm your password"
      );

    expect(confirmPasswordInput).toHaveAttribute(
      "type",
      "password"
    );

    const toggleButtons = screen.getAllByRole("button");

    const passwordToggles = toggleButtons.filter(
      (button) =>
        button.className === "password-toggle"
    );

    expect(passwordToggles).toHaveLength(2);

    fireEvent.click(passwordToggles[1]);

    expect(confirmPasswordInput).toHaveAttribute(
      "type",
      "text"
    );

    fireEvent.click(passwordToggles[1]);

    expect(confirmPasswordInput).toHaveAttribute(
      "type",
      "password"
    );
  });

  // --------------------------------------------------
  // 6. SUCCESSFUL REGISTRATION
  // --------------------------------------------------

  test("registers user successfully with valid data", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full name"),
      {
        target: {
          name: "name",
          value: "John Doe",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your email"),
      {
        target: {
          name: "email",
          value: "john@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Create a password"),
      {
        target: {
          name: "password",
          value: "password123",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm your password"),
      {
        target: {
          name: "confirmPassword",
          value: "password123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Account",
      })
    );

    const storedUser = JSON.parse(
      localStorage.getItem("user")
    );

    expect(storedUser).toEqual({
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
    });

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBe("true");

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  // --------------------------------------------------
  // 7. LOCAL STORAGE
  // --------------------------------------------------

  test("stores user information in localStorage", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your full name"),
      {
        target: {
          name: "name",
          value: "Alice",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Enter your email"),
      {
        target: {
          name: "email",
          value: "alice@gmail.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Create a password"),
      {
        target: {
          name: "password",
          value: "alice123",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm your password"),
      {
        target: {
          name: "confirmPassword",
          value: "alice123",
        },
      }
    );

    fireEvent.submit(
      screen.getByRole("button", {
        name: "Create Account",
      }).closest("form")
    );

    expect(localStorage.getItem("user")).not.toBeNull();

    expect(
      JSON.parse(localStorage.getItem("user"))
    ).toEqual({
      name: "Alice",
      email: "alice@gmail.com",
      password: "alice123",
    });
  });

  // --------------------------------------------------
  // 8. CLOSE BUTTON
  // --------------------------------------------------

  test("navigates to home when close button is clicked", () => {
    renderRegister();

    const closeButton = screen.getByRole("button", {
      name: "Close",
    });

    fireEvent.click(closeButton);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
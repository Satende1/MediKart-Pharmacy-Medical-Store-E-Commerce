import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "./Register";

// Mock CSS
jest.mock("./Register.css", () => ({}));

// Mock image
jest.mock("../../assets/Medikart-logo.png", () => "logo.png");

// Mock react-icons
jest.mock("react-icons/fa", () => ({
  FaUser: () => <span data-testid="user-icon" />,
  FaEnvelope: () => <span data-testid="email-icon" />,
  FaPhone: () => <span data-testid="phone-icon" />,
  FaLock: () => <span data-testid="lock-icon" />,
  FaEye: () => <span data-testid="eye-icon" />,
  FaEyeSlash: () => <span data-testid="eye-slash-icon" />,
  FaShoppingCart: () => <span data-testid="cart-icon" />,
  FaPlus: () => <span data-testid="plus-icon" />,
}));

describe("Register Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  const renderRegister = () => {
    return render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>
    );
  };

  test("renders Register page", () => {
    renderRegister();

    expect(
      screen.getByRole("heading", {
        name: "Create Account",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Full Name")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Username")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Email Address")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Phone Number")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Password")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Confirm Password")
    ).toBeInTheDocument();
  });

  test("user can enter registration details", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText("Full Name"),
      {
        target: { value: "Test User" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: { value: "testuser" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),
      {
        target: { value: "test@gmail.com" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Phone Number"),
      {
        target: { value: "9876543210" },
      }
    );

    expect(
      screen.getByPlaceholderText("Full Name")
    ).toHaveValue("Test User");

    expect(
      screen.getByPlaceholderText("Username")
    ).toHaveValue("testuser");

    expect(
      screen.getByPlaceholderText("Email Address")
    ).toHaveValue("test@gmail.com");

    expect(
      screen.getByPlaceholderText("Phone Number")
    ).toHaveValue("9876543210");
  });

  test("password and confirm password can be entered", () => {
    renderRegister();

    const password = screen.getByPlaceholderText("Password");
    const confirmPassword =
      screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(password, {
      target: { value: "123456" },
    });

    fireEvent.change(confirmPassword, {
      target: { value: "123456" },
    });

    expect(password).toHaveValue("123456");
    expect(confirmPassword).toHaveValue("123456");
  });

  test("shows password when eye button is clicked", () => {
    renderRegister();

    const password =
      screen.getByPlaceholderText("Password");

    expect(password).toHaveAttribute(
      "type",
      "password"
    );

    const eyeButtons = screen.getAllByRole("button");

    // First eye button
    fireEvent.click(eyeButtons[0]);

    expect(password).toHaveAttribute(
      "type",
      "text"
    );
  });

  test("shows confirm password when eye button is clicked", () => {
    renderRegister();

    const confirmPassword =
      screen.getByPlaceholderText("Confirm Password");

    expect(confirmPassword).toHaveAttribute(
      "type",
      "password"
    );

    const eyeButtons = screen.getAllByRole("button");

    // Second eye button
    fireEvent.click(eyeButtons[1]);

    expect(confirmPassword).toHaveAttribute(
      "type",
      "text"
    );
  });

  test("shows alert when passwords do not match", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText("Full Name"),
      {
        target: { value: "Test User" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: { value: "testuser" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),
      {
        target: { value: "test@gmail.com" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Phone Number"),
      {
        target: { value: "9876543210" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: { value: "123456" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm Password"),
      {
        target: { value: "654321" },
      }
    );

    fireEvent.click(
      screen.getByRole("checkbox")
    );

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => { });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Account",
      })
    );

    expect(alertMock).toHaveBeenCalledWith(
      "Passwords do not match."
    );

    alertMock.mockRestore();
  });

  test("registers user successfully", () => {
    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText("Full Name"),
      {
        target: { value: "Test User" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: { value: "testuser" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),
      {
        target: { value: "test@gmail.com" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Phone Number"),
      {
        target: { value: "9876543210" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: { value: "123456" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm Password"),
      {
        target: { value: "123456" },
      }
    );

    // Agree to Terms
    fireEvent.click(
      screen.getByRole("checkbox")
    );

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => { });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Account",
      })
    );

    const savedUser = JSON.parse(
      localStorage.getItem("registeredUser")
    );

    expect(savedUser).toEqual({
      name: "Test User",
      username: "testuser",
      email: "test@gmail.com",
      phone: "9876543210",
      password: "123456",
    });

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBe("true");

    expect(
      JSON.parse(localStorage.getItem("user"))
    ).toEqual(savedUser);

    expect(alertMock).toHaveBeenCalledWith(
      "Registration successful!"
    );

    alertMock.mockRestore();
  });

  test("shows already registered message", () => {
    const existingUser = {
      name: "Old User",
      username: "olduser",
      email: "old@gmail.com",
      phone: "9999999999",
      password: "123456",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(existingUser)
    );

    renderRegister();

    fireEvent.change(
      screen.getByPlaceholderText("Full Name"),
      {
        target: { value: "New User" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: { value: "newuser" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),
      {
        target: { value: "new@gmail.com" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Phone Number"),
      {
        target: { value: "8888888888" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: { value: "123456" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Confirm Password"),
      {
        target: { value: "123456" },
      }
    );

    fireEvent.click(
      screen.getByRole("checkbox")
    );

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => { });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Create Account",
      })
    );

    expect(alertMock).toHaveBeenCalledWith(
      "User is already registered. Please login."
    );

    alertMock.mockRestore();
  });
});
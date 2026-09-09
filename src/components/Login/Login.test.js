import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

import Login from "./Login";

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("../../assets/Login.png", () => "login-image.png");

const renderLogin = (props = {}) => {
  return render(
    <BrowserRouter>
      <Login {...props} />
    </BrowserRouter>
  );
};

describe("Login Component", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();

    window.alert = jest.fn();
  });

  // --------------------------------------------------
  // RENDERING
  // --------------------------------------------------

  test("renders login heading", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", {
        name: /^login$/i,
      })
    ).toBeInTheDocument();
  });

  test("renders MEDIKART logo", () => {
    renderLogin();

    expect(screen.getByText("MEDI")).toBeInTheDocument();
    expect(screen.getByText("KART")).toBeInTheDocument();
  });

  test("renders login subtitle", () => {
    renderLogin();

    expect(
      screen.getByText(
        /login to continue shopping with medikart/i
      )
    ).toBeInTheDocument();
  });

  test("renders email or username input", () => {
    renderLogin();

    expect(
      screen.getByPlaceholderText(/email or username/i)
    ).toBeInTheDocument();
  });

  test("renders password input", () => {
    renderLogin();

    expect(
      screen.getByPlaceholderText(/^password$/i)
    ).toBeInTheDocument();
  });

  test("renders login button", () => {
    renderLogin();

    expect(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    ).toBeInTheDocument();
  });

  test("renders remember me checkbox", () => {
    renderLogin();

    expect(
      screen.getByRole("checkbox")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/remember me/i)
    ).toBeInTheDocument();
  });

  test("renders forgot password button", () => {
    renderLogin();

    expect(
      screen.getByRole("button", {
        name: /forgot password/i,
      })
    ).toBeInTheDocument();
  });

  test("renders create account button", () => {
    renderLogin();

    expect(
      screen.getByRole("button", {
        name: /create account/i,
      })
    ).toBeInTheDocument();
  });

  test("renders social login buttons", () => {
    renderLogin();

    expect(
      screen.getByRole("button", {
        name: /google login/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /facebook login/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /apple login/i,
      })
    ).toBeInTheDocument();
  });

  test("renders login image", () => {
    renderLogin();

    const image = screen.getByAltText(/medikart login/i);

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "login-image.png"
    );
  });

  // --------------------------------------------------
  // INPUT TESTS
  // --------------------------------------------------

  test("updates email or username input", () => {
    renderLogin();

    const input = screen.getByPlaceholderText(
      /email or username/i
    );

    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });

    expect(input).toHaveValue("test");
  });

  test("updates password input", () => {
    renderLogin();

    const input = screen.getByPlaceholderText(
      /^password$/i
    );

    fireEvent.change(input, {
      target: {
        value: "test",
      },
    });

    expect(input).toHaveValue("test");
  });

  // --------------------------------------------------
  // PASSWORD VISIBILITY
  // --------------------------------------------------

  test("password is hidden by default", () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText(
      /^password$/i
    );

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });

  test("shows password when eye button is clicked", () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText(
      /^password$/i
    );

    const showButton = screen.getByRole("button", {
      name: /show password/i,
    });

    fireEvent.click(showButton);

    expect(passwordInput).toHaveAttribute(
      "type",
      "text"
    );
  });

  test("hides password again when eye button is clicked", () => {
    renderLogin();

    const passwordInput = screen.getByPlaceholderText(
      /^password$/i
    );

    const showButton = screen.getByRole("button", {
      name: /show password/i,
    });

    fireEvent.click(showButton);

    expect(passwordInput).toHaveAttribute(
      "type",
      "text"
    );

    const hideButton = screen.getByRole("button", {
      name: /hide password/i,
    });

    fireEvent.click(hideButton);

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });

  // --------------------------------------------------
  // REMEMBER ME
  // --------------------------------------------------

  test("remember me is unchecked by default", () => {
    renderLogin();

    expect(
      screen.getByRole("checkbox")
    ).not.toBeChecked();
  });

  test("checks remember me", () => {
    renderLogin();

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  test("unchecks remember me", () => {
    renderLogin();

    const checkbox = screen.getByRole("checkbox");

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  // --------------------------------------------------
  // EMPTY LOGIN VALIDATION
  // --------------------------------------------------

  test("shows alert when login fields are empty", () => {
    renderLogin();

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter email/username and password."
    );
  });

  test("does not login when only email is entered", () => {
    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(/email or username/i),
      {
        target: {
          value: "test",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter email/username and password."
    );
  });

  test("does not login when only password is entered", () => {
    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(/^password$/i),
      {
        target: {
          value: "test",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter email/username and password."
    );
  });

  // --------------------------------------------------
  // FORGOT PASSWORD
  // --------------------------------------------------

  test("calls onSwitchToForgotPassword", () => {
    const onSwitchToForgotPassword = jest.fn();

    renderLogin({
      onSwitchToForgotPassword,
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /forgot password/i,
      })
    );

    expect(
      onSwitchToForgotPassword
    ).toHaveBeenCalledTimes(1);
  });

  // --------------------------------------------------
  // REGISTER
  // --------------------------------------------------

  test("calls onSwitchToRegister", () => {
    const onSwitchToRegister = jest.fn();

    renderLogin({
      onSwitchToRegister,
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /create account/i,
      })
    );

    expect(
      onSwitchToRegister
    ).toHaveBeenCalledTimes(1);
  });

  // --------------------------------------------------
  // CLOSE
  // --------------------------------------------------

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    renderLogin({
      onClose,
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /close login/i,
      })
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  // --------------------------------------------------
  // INVALID LOGIN
  // --------------------------------------------------

  test("shows invalid login message when no registered user exists", () => {
    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(/email or username/i),
      {
        target: {
          value: "test",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/^password$/i),
      {
        target: {
          value: "test",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Invalid email/username or password."
    );
  });

  // --------------------------------------------------
  // INVALID STORED USER
  // --------------------------------------------------

  test("handles incorrect email or username", () => {
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        email: "registered@test.com",
        username: "registered",
        password: "password",
      })
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(/email or username/i),
      {
        target: {
          value: "wrong",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/^password$/i),
      {
        target: {
          value: "password",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Email or username is incorrect."
    );
  });

  test("handles incorrect password", () => {
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        email: "registered@test.com",
        username: "registered",
        password: "correct",
      })
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(/email or username/i),
      {
        target: {
          value: "registered@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/^password$/i),
      {
        target: {
          value: "wrong",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Incorrect password."
    );
  });

  // --------------------------------------------------
  // REGISTERED USER LOGIN
  // --------------------------------------------------

  test("successfully logs in with registered user", () => {
    const onClose = jest.fn();

    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        email: "registered@test.com",
        username: "registered",
        password: "password",
        name: "test",
      })
    );

    renderLogin({
      onClose,
    });

    fireEvent.change(
      screen.getByPlaceholderText(/email or username/i),
      {
        target: {
          value: "registered@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/^password$/i),
      {
        target: {
          value: "password",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBe("true");

    expect(
      localStorage.getItem("user")
    ).not.toBeNull();

    expect(window.alert).toHaveBeenCalledWith(
      "Login successful!"
    );

    expect(onClose).toHaveBeenCalled();
  });

  // --------------------------------------------------
  // REMEMBER ME STORAGE
  // --------------------------------------------------

  test("stores rememberMe when checkbox is selected", () => {
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        email: "registered@test.com",
        username: "registered",
        password: "password",
        name: "test",
      })
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(/email or username/i),
      {
        target: {
          value: "registered@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/^password$/i),
      {
        target: {
          value: "password",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("checkbox")
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(
      localStorage.getItem("rememberMe")
    ).toBe("true");
  });

  test("removes rememberMe when checkbox is not selected", () => {
    localStorage.setItem("rememberMe", "true");

    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        email: "registered@test.com",
        username: "registered",
        password: "password",
        name: "test",
      })
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(/email or username/i),
      {
        target: {
          value: "registered@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/^password$/i),
      {
        target: {
          value: "password",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    expect(
      localStorage.getItem("rememberMe")
    ).toBeNull();
  });

  // --------------------------------------------------
  // USER UPDATED EVENT
  // --------------------------------------------------

  test("dispatches userUpdated event after successful login", () => {
    const dispatchSpy = jest.spyOn(
      window,
      "dispatchEvent"
    );

    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        email: "registered@test.com",
        username: "registered",
        password: "password",
        name: "test",
      })
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(/email or username/i),
      {
        target: {
          value: "registered@test.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText(/^password$/i),
      {
        target: {
          value: "password",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /^login$/i,
      })
    );

    const eventWasDispatched =
      dispatchSpy.mock.calls.some(
        ([event]) => event.type === "userUpdated"
      );

    expect(eventWasDispatched).toBe(true);

    dispatchSpy.mockRestore();
  });

  // --------------------------------------------------
  // SOCIAL BUTTONS
  // --------------------------------------------------

  test("Google login button is clickable", () => {
    renderLogin();

    const button = screen.getByRole("button", {
      name: /google login/i,
    });

    expect(button).toBeEnabled();

    fireEvent.click(button);
  });

  test("Facebook login button is clickable", () => {
    renderLogin();

    const button = screen.getByRole("button", {
      name: /facebook login/i,
    });

    expect(button).toBeEnabled();

    fireEvent.click(button);
  });

  test("Apple login button is clickable", () => {
    renderLogin();

    const button = screen.getByRole("button", {
      name: /apple login/i,
    });

    expect(button).toBeEnabled();

    fireEvent.click(button);
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "./Login";

import "@testing-library/jest-dom";

// Mock CSS
jest.mock("./Login.css", () => ({}));

// Mock login image
jest.mock("../../assets/Login pages.png", () => "login-image.png");


// Helper function
const renderLogin = (props = {}) => {
  return render(
    <MemoryRouter>
      <Login {...props} />
    </MemoryRouter>
  );
};


describe("Login Component", () => {

  beforeEach(() => {
    localStorage.clear();

    window.alert = jest.fn();
  });


  // ==========================================
  // TEST 1 - RENDER LOGIN PAGE
  // ==========================================

  test("renders login page correctly", () => {
    renderLogin();

    expect(
      screen.getByText("Welcome Back!")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Login to your account and continue"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Username")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Login",
      })
    ).toBeInTheDocument();
  });


  // ==========================================
  // TEST 2 - USER CAN ENTER USERNAME
  // ==========================================

  test("allows user to enter username", () => {
    renderLogin();

    const usernameInput =
      screen.getByPlaceholderText("Username");

    fireEvent.change(usernameInput, {
      target: {
        value: "satender",
      },
    });

    expect(usernameInput).toHaveValue("satender");
  });


  // ==========================================
  // TEST 3 - USER CAN ENTER PASSWORD
  // ==========================================

  test("allows user to enter password", () => {
    renderLogin();

    const passwordInput =
      screen.getByPlaceholderText("Password");

    fireEvent.change(passwordInput, {
      target: {
        value: "123456",
      },
    });

    expect(passwordInput).toHaveValue("123456");
  });


  // ==========================================
  // TEST 4 - SHOW PASSWORD
  // ==========================================

  test("shows password when eye button is clicked", () => {
    renderLogin();

    const passwordInput =
      screen.getByPlaceholderText("Password");

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );

    const showButton =
      screen.getByRole("button", {
        name: "Show password",
      });

    fireEvent.click(showButton);

    expect(passwordInput).toHaveAttribute(
      "type",
      "text"
    );

    expect(
      screen.getByRole("button", {
        name: "Hide password",
      })
    ).toBeInTheDocument();
  });


  // ==========================================
  // TEST 5 - HIDE PASSWORD
  // ==========================================

  test("hides password when eye button is clicked again", () => {
    renderLogin();

    const passwordInput =
      screen.getByPlaceholderText("Password");

    const showButton =
      screen.getByRole("button", {
        name: "Show password",
      });

    fireEvent.click(showButton);

    expect(passwordInput).toHaveAttribute(
      "type",
      "text"
    );

    const hideButton =
      screen.getByRole("button", {
        name: "Hide password",
      });

    fireEvent.click(hideButton);

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });


  // ==========================================
  // TEST 6 - REMEMBER ME
  // ==========================================

  test("allows user to select Remember me", () => {
    renderLogin();

    const checkbox =
      screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).not.toBeChecked();
  });


  // ==========================================
  // TEST 7 - USER NOT REGISTERED
  // ==========================================

  test("shows alert when user is not registered", () => {
    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: {
          value: "satender",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "You are not registered. Please register first."
    );
  });


  // ==========================================
  // TEST 8 - INVALID PASSWORD
  // ==========================================

  test("shows alert for invalid password", () => {

    const user = {
      name: "Satender Kashyap",
      username: "satender",
      email: "satender@gmail.com",
      phone: "9876543210",
      password: "correct123",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: {
          value: "satender",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "wrong123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Invalid username/email or password."
    );
  });


  // ==========================================
  // TEST 9 - CORRECT LOGIN
  // ==========================================

  test("logs in successfully with correct username and password", () => {

    const user = {
      name: "Satender Kashyap",
      username: "satender",
      email: "satender@gmail.com",
      phone: "9876543210",
      password: "123456",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    const onLoginSuccess = jest.fn();

    renderLogin({
      onLoginSuccess,
    });

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: {
          value: "satender",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBe("true");

    expect(
      localStorage.getItem("username")
    ).toBe("satender");

    expect(onLoginSuccess).toHaveBeenCalled();
  });


  // ==========================================
  // TEST 10 - LOGIN USING EMAIL
  // ==========================================

  test("allows login using email", () => {

    const user = {
      name: "Satender Kashyap",
      username: "satender",
      email: "satender@gmail.com",
      phone: "9876543210",
      password: "123456",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: {
          value: "satender@gmail.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBe("true");
  });


  // ==========================================
  // TEST 11 - LOGIN USING NAME
  // ==========================================

  test("allows login using name", () => {

    const user = {
      name: "Satender Kashyap",
      username: "satender",
      email: "satender@gmail.com",
      phone: "9876543210",
      password: "123456",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: {
          value: "Satender Kashyap",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBe("true");
  });


  // ==========================================
  // TEST 12 - REMEMBER ME LOGIN
  // ==========================================

  test("stores rememberMe when checkbox is selected", () => {

    const user = {
      name: "Satender Kashyap",
      username: "satender",
      email: "satender@gmail.com",
      phone: "9876543210",
      password: "123456",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: {
          value: "satender",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("checkbox")
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(
      localStorage.getItem("rememberMe")
    ).toBe("true");
  });


  // ==========================================
  // TEST 13 - REMEMBER ME NOT SELECTED
  // ==========================================

  test("does not store rememberMe when checkbox is not selected", () => {

    const user = {
      name: "Satender Kashyap",
      username: "satender",
      email: "satender@gmail.com",
      phone: "9876543210",
      password: "123456",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(user)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText("Username"),
      {
        target: {
          value: "satender",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "123456",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(
      localStorage.getItem("rememberMe")
    ).toBeNull();
  });


  // ==========================================
  // TEST 14 - SOCIAL BUTTONS
  // ==========================================

  test("renders social login buttons", () => {
    renderLogin();

    expect(
      screen.getByRole("button", {
        name: "Login with Google",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Login with Facebook",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Login with Twitter",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Login with Apple",
      })
    ).toBeInTheDocument();
  });


  // ==========================================
  // TEST 15 - IMAGE
  // ==========================================

  test("renders Medikart login image", () => {
    renderLogin();

    const image = screen.getByAltText(
      "Medikart Healthcare"
    );

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "login-image.png"
    );
  });
});
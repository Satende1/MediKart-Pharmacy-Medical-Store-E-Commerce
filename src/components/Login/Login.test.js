import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import Login from "./Login";


// ============================================================
// MOCK react-router-dom
// ============================================================

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
  const actual = jest.requireActual("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});


// ============================================================
// MOCK REACT ICONS
// ============================================================

jest.mock("react-icons/fa", () => ({
  FaUser: () => <span data-testid="user-icon">User</span>,
  FaLock: () => <span data-testid="lock-icon">Lock</span>,
  FaEye: () => <span data-testid="eye-icon">Eye</span>,
  FaEyeSlash: () => (
    <span data-testid="eye-slash-icon">EyeSlash</span>
  ),
  FaGoogle: () => (
    <span data-testid="google-icon">Google</span>
  ),
  FaFacebookF: () => (
    <span data-testid="facebook-icon">Facebook</span>
  ),
  FaApple: () => (
    <span data-testid="apple-icon">Apple</span>
  ),
  FaTimes: () => (
    <span data-testid="close-icon">X</span>
  ),
}));


// ============================================================
// HELPER
// ============================================================

const renderLogin = (props = {}) => {
  return render(
    <MemoryRouter>
      <Login {...props} />
    </MemoryRouter>
  );
};


// ============================================================
// SETUP
// ============================================================

beforeEach(() => {
  jest.clearAllMocks();

  localStorage.clear();

  window.alert = jest.fn();

  // Prevent console.error from making invalid JSON tests noisy.
  jest.spyOn(console, "error").mockImplementation(() => { });
});


afterEach(() => {
  cleanup();

  jest.restoreAllMocks();

  localStorage.clear();
});


// ============================================================
// TESTS
// ============================================================

describe("Login", () => {

  // ==========================================================
  // RENDERING
  // ==========================================================

  test("renders login page correctly", () => {
    renderLogin();

    expect(
      screen.getByRole("heading", {
        name: "Login",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText("Welcome to MEDIKART")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Your trusted online healthcare & pharmacy partner."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Login to continue shopping with MEDIKART"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(
        "Email or Username"
      )
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


  // ==========================================================
  // LOGO
  // ==========================================================

  test("renders MEDIKART logo", () => {
    renderLogin();

    expect(screen.getByText("MEDI")).toBeInTheDocument();

    expect(screen.getByText("KART")).toBeInTheDocument();
  });


  // ==========================================================
  // IMAGE
  // ==========================================================

  test("renders login image", () => {
    renderLogin();

    const image = screen.getByAltText("MEDIKART Login");

    expect(image).toBeInTheDocument();

    expect(image).toHaveAttribute(
      "src",
      "/images/login.png"
    );
  });


  // ==========================================================
  // EMAIL INPUT
  // ==========================================================

  test("updates email input", () => {
    renderLogin();

    const emailInput =
      screen.getByPlaceholderText(
        "Email or Username"
      );

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    expect(emailInput).toHaveValue(
      "test@example.com"
    );
  });


  // ==========================================================
  // PASSWORD INPUT
  // ==========================================================

  test("updates password input", () => {
    renderLogin();

    const passwordInput =
      screen.getByPlaceholderText("Password");

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    expect(passwordInput).toHaveValue(
      "password123"
    );
  });


  // ==========================================================
  // PASSWORD IS HIDDEN BY DEFAULT
  // ==========================================================

  test("password is hidden by default", () => {
    renderLogin();

    const passwordInput =
      screen.getByPlaceholderText("Password");

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });


  // ==========================================================
  // SHOW PASSWORD
  // ==========================================================

  test("shows password when eye button is clicked", () => {
    renderLogin();

    const passwordInput =
      screen.getByPlaceholderText("Password");

    const showButton =
      screen.getByRole("button", {
        name: "Show password",
      });

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );

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


  // ==========================================================
  // HIDE PASSWORD
  // ==========================================================

  test("hides password after clicking eye button again", () => {
    renderLogin();

    const passwordInput =
      screen.getByPlaceholderText("Password");

    fireEvent.click(
      screen.getByRole("button", {
        name: "Show password",
      })
    );

    expect(passwordInput).toHaveAttribute(
      "type",
      "text"
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Hide password",
      })
    );

    expect(passwordInput).toHaveAttribute(
      "type",
      "password"
    );
  });


  // ==========================================================
  // EMPTY FORM
  // ==========================================================

  test("shows alert when email and password are empty", () => {
    renderLogin();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter email and password."
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBeNull();
  });


  // ==========================================================
  // EMAIL EMPTY
  // ==========================================================

  test("shows alert when email is empty", () => {
    renderLogin();

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
      "Please enter email and password."
    );
  });


  // ==========================================================
  // PASSWORD EMPTY
  // ==========================================================

  test("shows alert when password is empty", () => {
    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "admin@medikart.com",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter email and password."
    );
  });


  // ==========================================================
  // DEMO LOGIN SUCCESS
  // ==========================================================

  test("logs in successfully with demo credentials", () => {
    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "admin@medikart.com",
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
    ).toBe("Satender");

    expect(
      JSON.parse(
        localStorage.getItem("user")
      )
    ).toEqual({
      name: "Satender",
      username: "Satender",
      email: "admin@medikart.com",
    });
  });


  // ==========================================================
  // DEMO LOGIN WRONG EMAIL
  // ==========================================================

  test("shows alert for invalid demo email", () => {
    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "wrong@example.com",
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
      "Invalid email/username or password."
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBeNull();
  });


  // ==========================================================
  // DEMO LOGIN WRONG PASSWORD
  // ==========================================================

  test("shows alert for invalid demo password", () => {
    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "admin@medikart.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "wrongpassword",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Invalid email/username or password."
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBeNull();
  });


  // ==========================================================
  // REGISTERED USER SUCCESS
  // ==========================================================

  test("logs in successfully with registered user email", () => {
    const registeredUser = {
      name: "Rahul",
      username: "rahul123",
      email: "rahul@example.com",
      password: "password123",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(registeredUser)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "rahul@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "password123",
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
    ).toBe("Rahul");

    expect(
      JSON.parse(
        localStorage.getItem("user")
      )
    ).toEqual(registeredUser);
  });


  // ==========================================================
  // REGISTERED USER USERNAME LOGIN
  // ==========================================================

  test("logs in using registered username", () => {
    const registeredUser = {
      name: "Rahul",
      username: "rahul123",
      email: "rahul@example.com",
      password: "password123",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(registeredUser)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "RAHUL123",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "password123",
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
    ).toBe("Rahul");
  });


  // ==========================================================
  // REGISTERED USER WRONG EMAIL
  // ==========================================================

  test("shows alert for incorrect registered email or username", () => {
    const registeredUser = {
      name: "Rahul",
      username: "rahul123",
      email: "rahul@example.com",
      password: "password123",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(registeredUser)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "wrong@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "password123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Email or username is incorrect."
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBeNull();
  });


  // ==========================================================
  // REGISTERED USER WRONG PASSWORD
  // ==========================================================

  test("shows alert for incorrect registered password", () => {
    const registeredUser = {
      name: "Rahul",
      username: "rahul123",
      email: "rahul@example.com",
      password: "password123",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(registeredUser)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "rahul@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "wrongpassword",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(window.alert).toHaveBeenCalledWith(
      "Incorrect password."
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBeNull();
  });


  // ==========================================================
  // INVALID REGISTERED USER JSON
  // ==========================================================

  test("handles invalid registeredUser JSON", () => {
    localStorage.setItem(
      "registeredUser",
      "{invalid-json"
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "wrong@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "wrongpassword",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    /*
     * Invalid JSON causes JSON.parse() to throw.
     * Login.js catches the error and then falls
     * through to the DEMO LOGIN section.
     */
    expect(window.alert).toHaveBeenCalledWith(
      "Invalid email/username or password."
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBeNull();

    expect(console.error).toHaveBeenCalled();
  });


  // ==========================================================
  // REMEMBER ME CHECKED
  // ==========================================================

  test("stores rememberMe when Remember me is checked", () => {
    renderLogin();

    const checkbox =
      screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "admin@medikart.com",
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
    ).toBe("true");
  });


  // ==========================================================
  // REMEMBER ME NOT CHECKED
  // ==========================================================

  test("does not store rememberMe when unchecked", () => {
    localStorage.setItem(
      "rememberMe",
      "true"
    );

    renderLogin();

    const checkbox =
      screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "admin@medikart.com",
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


  // ==========================================================
  // USER UPDATED EVENT
  // ==========================================================

  test("dispatches userUpdated event after successful login", () => {
    const eventSpy = jest.fn();

    window.addEventListener(
      "userUpdated",
      eventSpy
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "admin@medikart.com",
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

    expect(eventSpy).toHaveBeenCalledTimes(1);

    window.removeEventListener(
      "userUpdated",
      eventSpy
    );
  });


  // ==========================================================
  // CLOSE BUTTON WITH onClose
  // ==========================================================

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    renderLogin({ onClose });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close login",
      })
    );

    expect(onClose).toHaveBeenCalledTimes(1);

    expect(mockNavigate).not.toHaveBeenCalled();
  });


  // ==========================================================
  // CLOSE BUTTON WITHOUT onClose
  // ==========================================================

  test("navigates to home when close button is clicked without onClose", () => {
    renderLogin();

    fireEvent.click(
      screen.getByRole("button", {
        name: "Close login",
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });


  // ==========================================================
  // OVERLAY CLICK
  // ==========================================================

  test("closes login when clicking outside popup", () => {
    const onClose = jest.fn();

    const { container } = renderLogin({
      onClose,
    });

    const overlay =
      container.querySelector(
        ".login-popup-overlay"
      );

    expect(overlay).toBeInTheDocument();

    fireEvent.mouseDown(overlay);

    expect(onClose).toHaveBeenCalledTimes(1);
  });


  // ==========================================================
  // CLICK INSIDE POPUP DOES NOT CLOSE
  // ==========================================================

  test("does not close when clicking inside popup", () => {
    const onClose = jest.fn();

    renderLogin({
      onClose,
    });

    const popup =
      document.querySelector(
        ".login-popup"
      );

    fireEvent.mouseDown(popup);

    expect(onClose).not.toHaveBeenCalled();
  });


  // ==========================================================
  // FORGOT PASSWORD LINK
  // ==========================================================

  test("renders Forgot Password link", () => {
    renderLogin();

    const link =
      screen.getByRole("link", {
        name: "Forgot Password?",
      });

    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute(
      "href",
      "/forgot-password"
    );
  });


  // ==========================================================
  // CREATE ACCOUNT LINK
  // ==========================================================

  test("renders Create Account link", () => {
    renderLogin();

    const link =
      screen.getByRole("link", {
        name: "Create Account",
      });

    expect(link).toBeInTheDocument();

    expect(link).toHaveAttribute(
      "href",
      "/register"
    );
  });


  // ==========================================================
  // SOCIAL LOGIN BUTTONS
  // ==========================================================

  test("renders social login buttons", () => {
    renderLogin();

    expect(
      screen.getByRole("button", {
        name: "Google login",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Facebook login",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Apple login",
      })
    ).toBeInTheDocument();
  });


  // ==========================================================
  // SOCIAL BUTTONS DO NOT SUBMIT FORM
  // ==========================================================

  test("social buttons are type button", () => {
    renderLogin();

    expect(
      screen.getByRole("button", {
        name: "Google login",
      })
    ).toHaveAttribute("type", "button");

    expect(
      screen.getByRole("button", {
        name: "Facebook login",
      })
    ).toHaveAttribute("type", "button");

    expect(
      screen.getByRole("button", {
        name: "Apple login",
      })
    ).toHaveAttribute("type", "button");
  });


  // ==========================================================
  // REGISTERED USER WITH UPPERCASE EMAIL
  // ==========================================================

  test("accepts registered email regardless of case", () => {
    const registeredUser = {
      name: "Rahul",
      username: "rahul123",
      email: "Rahul@Example.com",
      password: "password123",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(registeredUser)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "RAHUL@EXAMPLE.COM",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "password123",
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


  // ==========================================================
  // REGISTERED USER NAME FALLBACK
  // ==========================================================

  test("uses username when registered user has no name", () => {
    const registeredUser = {
      username: "rahul123",
      email: "rahul@example.com",
      password: "password123",
    };

    localStorage.setItem(
      "registeredUser",
      JSON.stringify(registeredUser)
    );

    renderLogin();

    fireEvent.change(
      screen.getByPlaceholderText(
        "Email or Username"
      ),
      {
        target: {
          value: "rahul@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "password123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: "Login",
      })
    );

    expect(
      localStorage.getItem("username")
    ).toBe("rahul123");

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBe("true");
  });


  // ==========================================================
  // FORM SUBMISSION
  // ==========================================================

  test("submits login form", () => {
    renderLogin();

    const emailInput =
      screen.getByPlaceholderText(
        "Email or Username"
      );

    const passwordInput =
      screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, {
      target: {
        value: "admin@medikart.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(
      emailInput.closest("form")
    );

    expect(
      localStorage.getItem("isLoggedIn")
    ).toBe("true");
  });

});
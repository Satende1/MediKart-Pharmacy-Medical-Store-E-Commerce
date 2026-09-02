import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import ForgotPassword from "./ForgotPassword";


// =====================================================
// MOCK REACT ROUTER
// =====================================================

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));


// =====================================================
// MOCK FETCH
// =====================================================

global.fetch = jest.fn();


// =====================================================
// TEST HELPERS
// =====================================================

const renderForgotPassword = (props = {}) => {
  return render(<ForgotPassword {...props} />);
};


// Generic test values only.
// No real user/customer information is used.
const TEST_EMAIL = "test@example.com";
const TEST_OTP = "123456";
const TEST_PASSWORD = "password123";


// Move component to OTP screen
const goToOTPStep = async () => {
  const emailInput = screen.getByPlaceholderText("Enter your email");

  fireEvent.change(emailInput, {
    target: { value: TEST_EMAIL },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /send otp/i,
    })
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", {
        name: /verify otp/i,
      })
    ).toBeInTheDocument();
  });
};


// Move component to Reset Password screen
const goToResetStep = async () => {
  await goToOTPStep();

  const otpInput = screen.getByPlaceholderText("Enter OTP");

  fireEvent.change(otpInput, {
    target: { value: TEST_OTP },
  });

  fireEvent.click(
    screen.getByRole("button", {
      name: /verify otp/i,
    })
  );

  await waitFor(() => {
    expect(
      screen.getByRole("heading", {
        name: /reset password/i,
      })
    ).toBeInTheDocument();
  });
};


// =====================================================
// TESTS
// =====================================================

describe("ForgotPassword Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    fetch.mockReset();
  });


  // ===================================================
  // 1. RENDER
  // ===================================================

  test("renders forgot password screen", () => {
    renderForgotPassword();

    expect(
      screen.getByRole("heading", {
        name: /forgot password/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your email")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /send otp/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /back to login/i,
      })
    ).toBeInTheDocument();
  });


  // ===================================================
  // 2. EMPTY EMAIL
  // ===================================================

  test("shows error when email is empty", () => {
    renderForgotPassword();

    const form = screen
      .getByRole("button", { name: /send otp/i })
      .closest("form");

    fireEvent.submit(form);

    expect(
      screen.getByText("Please enter your email address.")
    ).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
  });


  // ===================================================
  // 3. SEND OTP SUCCESS
  // ===================================================

  test("sends OTP and moves to OTP screen", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "OTP sent successfully",
      }),
    });

    renderForgotPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your email"),
      {
        target: {
          value: TEST_EMAIL,
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /send otp/i,
      })
    );

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    expect(fetch).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/forgot-password/",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /verify otp/i,
        })
      ).toBeInTheDocument();
    });
  });


  // ===================================================
  // 4. SEND OTP FAILURE
  // ===================================================

  test("shows error when sending OTP fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        message: "Unable to send OTP.",
      }),
    });

    renderForgotPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your email"),
      {
        target: {
          value: TEST_EMAIL,
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /send otp/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText("Unable to send OTP.")
      ).toBeInTheDocument();
    });
  });


  // ===================================================
  // 5. INVALID OTP
  // ===================================================

  test("shows error for invalid OTP", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "OTP sent",
      }),
    });

    await renderForgotPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your email"),
      {
        target: {
          value: TEST_EMAIL,
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /send otp/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /verify otp/i,
        })
      ).toBeInTheDocument();
    });

    const otpInput = screen.getByPlaceholderText("Enter OTP");

    fireEvent.change(otpInput, {
      target: {
        value: "123",
      },
    });

    const form = otpInput.closest("form");

    fireEvent.submit(form);

    expect(
      screen.getByText("Please enter a valid 6-digit OTP.")
    ).toBeInTheDocument();

    expect(fetch).toHaveBeenCalledTimes(1);
  });


  // ===================================================
  // 6. OTP ONLY ACCEPTS NUMBERS
  // ===================================================

  test("allows only numeric OTP characters", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "OTP sent",
      }),
    });

    renderForgotPassword();

    fireEvent.change(
      screen.getByPlaceholderText("Enter your email"),
      {
        target: {
          value: TEST_EMAIL,
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /send otp/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText("Enter OTP")
      ).toBeInTheDocument();
    });

    const otpInput = screen.getByPlaceholderText("Enter OTP");

    fireEvent.change(otpInput, {
      target: {
        value: "12abc34xyz56",
      },
    });

    expect(otpInput).toHaveValue("123456");
  });


  // ===================================================
  // 7. VERIFY OTP SUCCESS
  // ===================================================

  test("verifies OTP and moves to reset password screen", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP verified",
        }),
      });

    renderForgotPassword();

    await goToOTPStep();

    fireEvent.change(
      screen.getByPlaceholderText("Enter OTP"),
      {
        target: {
          value: TEST_OTP,
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /verify otp/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /reset password/i,
        })
      ).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(2);
  });


  // ===================================================
  // 8. VERIFY OTP FAILURE
  // ===================================================

  test("shows error when OTP verification fails", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent",
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          message: "Invalid OTP.",
        }),
      });

    renderForgotPassword();

    await goToOTPStep();

    fireEvent.change(
      screen.getByPlaceholderText("Enter OTP"),
      {
        target: {
          value: TEST_OTP,
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /verify otp/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText("Invalid OTP.")
      ).toBeInTheDocument();
    });
  });


  // ===================================================
  // 9. PASSWORDS DO NOT MATCH
  // ===================================================

  test("shows error when passwords do not match", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP verified",
        }),
      });

    renderForgotPassword();

    await goToResetStep();

    const passwordInput = screen.getByPlaceholderText(
      "New Password"
    );

    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    fireEvent.change(confirmPasswordInput, {
      target: {
        value: "different123",
      },
    });

    // IMPORTANT:
    // Submit the form, not the button directly.
    const form = passwordInput.closest("form");

    fireEvent.submit(form);

    expect(
      screen.getByText("Passwords do not match.")
    ).toBeInTheDocument();

    // Reset API should NOT be called.
    expect(fetch).toHaveBeenCalledTimes(2);
  });


  // ===================================================
  // 10. RESET PASSWORD SUCCESS
  // ===================================================

  test("resets password successfully", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP verified",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "Password reset successfully",
        }),
      });

    renderForgotPassword();

    await goToResetStep();

    const passwordInput = screen.getByPlaceholderText(
      "New Password"
    );

    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(passwordInput, {
      target: {
        value: TEST_PASSWORD,
      },
    });

    fireEvent.change(confirmPasswordInput, {
      target: {
        value: TEST_PASSWORD,
      },
    });

    // IMPORTANT:
    // Submit the form directly.
    const form = passwordInput.closest("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: /password reset successfully/i,
        })
      ).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(3);

    expect(fetch).toHaveBeenLastCalledWith(
      "http://127.0.0.1:8000/api/reset-password/",
      expect.objectContaining({
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });


  // ===================================================
  // 11. RESET PASSWORD FAILURE
  // ===================================================

  test("shows error when password reset fails", async () => {
    fetch
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP verified",
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

    renderForgotPassword();

    await goToResetStep();

    const passwordInput = screen.getByPlaceholderText(
      "New Password"
    );

    const confirmPasswordInput =
      screen.getByPlaceholderText("Confirm Password");

    fireEvent.change(passwordInput, {
      target: {
        value: TEST_PASSWORD,
      },
    });

    fireEvent.change(confirmPasswordInput, {
      target: {
        value: TEST_PASSWORD,
      },
    });

    // Submit the FORM.
    const form = passwordInput.closest("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(
        screen.getByText("Unable to reset password.")
      ).toBeInTheDocument();
    });

    expect(fetch).toHaveBeenCalledTimes(3);
  });


  // ===================================================
  // 12. BACK FROM OTP
  // ===================================================

  test("goes back from OTP to email step", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        message: "OTP sent",
      }),
    });

    renderForgotPassword();

    await goToOTPStep();

    fireEvent.click(
      screen.getByRole("button", {
        name: /back/i,
      })
    );

    expect(
      screen.getByRole("heading", {
        name: /forgot password/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Enter your email")
    ).toBeInTheDocument();
  });


  // ===================================================
  // 13. CLOSE CALLBACK
  // ===================================================

  test("calls onClose when close button is clicked", () => {
    const onClose = jest.fn();

    renderForgotPassword({
      onClose,
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /close/i,
      })
    );

    expect(onClose).toHaveBeenCalledTimes(1);
  });


  // ===================================================
  // 14. SWITCH TO LOGIN CALLBACK
  // ===================================================

  test("calls onSwitchToLogin when Back to Login is clicked", () => {
    const onSwitchToLogin = jest.fn();

    renderForgotPassword({
      onSwitchToLogin,
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /back to login/i,
      })
    );

    expect(onSwitchToLogin).toHaveBeenCalledTimes(1);
  });


  // ===================================================
  // 15. NAVIGATE TO LOGIN
  // ===================================================

  test("navigates to login when no callback is provided", () => {
    renderForgotPassword();

    fireEvent.click(
      screen.getByRole("button", {
        name: /back to login/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });


  // ===================================================
  // 16. CLOSE WITHOUT CALLBACK
  // ===================================================

  test("navigates to login when close is clicked without onClose", () => {
    renderForgotPassword();

    fireEvent.click(
      screen.getByRole("button", {
        name: /close/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});

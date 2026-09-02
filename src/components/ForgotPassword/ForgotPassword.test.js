import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import ForgotPassword from "./ForgotPassword";

// ==========================================
// MOCK REACT ROUTER
// ==========================================

const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// ==========================================
// TEST HELPERS
// ==========================================

const renderForgotPassword = (props = {}) => {
  return render(<ForgotPassword {...props} />);
};

const mockFetch = (response, ok = true) => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok,
      json: () => Promise.resolve(response),
    })
  );
};

// ==========================================
// TEST SUITE
// ==========================================

describe("ForgotPassword Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // ========================================
  // 1. RENDER
  // ========================================

  test("renders forgot password screen", () => {
    renderForgotPassword();

    expect(
      screen.getByRole("heading", {
        name: /forgot password/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/enter your email/i)
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

  // ========================================
  // 2. EMPTY EMAIL
  // ========================================

  test("shows error when email is empty", async () => {
    renderForgotPassword();

    const form = screen
      .getByRole("button", {
        name: /send otp/i,
      })
      .closest("form");

    fireEvent.submit(form);

    expect(
      await screen.findByText(
        "Please enter your email address."
      )
    ).toBeInTheDocument();

    expect(global.fetch).not.toHaveBeenCalled();
  });

  // ========================================
  // 3. SEND OTP SUCCESS
  // ========================================

  test("sends OTP and moves to OTP screen", async () => {
    mockFetch({
      message: "OTP sent successfully",
    });

    renderForgotPassword();

    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    const form = emailInput.closest("form");

    fireEvent.submit(form);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        "http://127.0.0.1:8000/api/forgot-password/",
        expect.objectContaining({
          method: "POST",
        })
      );
    });

    expect(
      await screen.findByRole("heading", {
        name: /verify otp/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/enter otp/i)
    ).toBeInTheDocument();
  });

  // ========================================
  // 4. SEND OTP FAILURE
  // ========================================

  test("shows error when sending OTP fails", async () => {
    mockFetch(
      {
        message: "Unable to send OTP.",
      },
      false
    );

    renderForgotPassword();

    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    const form = emailInput.closest("form");

    fireEvent.submit(form);

    expect(
      await screen.findByText(
        "Unable to send OTP."
      )
    ).toBeInTheDocument();
  });

  // ========================================
  // 5. INVALID OTP
  // ========================================

  test("shows error for invalid OTP", async () => {
    renderForgotPassword();

    // Move to OTP screen
    mockFetch({
      message: "OTP sent successfully",
    });

    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.submit(emailInput.closest("form"));

    await screen.findByRole("heading", {
      name: /verify otp/i,
    });

    const otpInput =
      screen.getByPlaceholderText(/enter otp/i);

    fireEvent.change(otpInput, {
      target: {
        value: "123",
      },
    });

    fireEvent.submit(otpInput.closest("form"));

    expect(
      await screen.findByText(
        "Please enter a valid 6-digit OTP."
      )
    ).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // ========================================
  // 6. OTP ONLY NUMBERS
  // ========================================

  test("allows only numeric OTP characters", async () => {
    mockFetch({
      message: "OTP sent successfully",
    });

    renderForgotPassword();

    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.submit(emailInput.closest("form"));

    await screen.findByRole("heading", {
      name: /verify otp/i,
    });

    const otpInput =
      screen.getByPlaceholderText(/enter otp/i);

    fireEvent.change(otpInput, {
      target: {
        value: "12abc34!@",
      },
    });

    expect(otpInput).toHaveValue("1234");
  });

  // ========================================
  // 7. VERIFY OTP SUCCESS
  // ========================================

  test("verifies OTP and moves to reset password screen", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent successfully",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP verified successfully",
        }),
      });

    renderForgotPassword();

    // Email
    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.submit(emailInput.closest("form"));

    await screen.findByRole("heading", {
      name: /verify otp/i,
    });

    // OTP
    const otpInput =
      screen.getByPlaceholderText(/enter otp/i);

    fireEvent.change(otpInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(otpInput.closest("form"));

    expect(
      await screen.findByRole("heading", {
        name: /reset password/i,
      })
    ).toBeInTheDocument();
  });

  // ========================================
  // 8. OTP VERIFICATION FAILURE
  // ========================================

  test("shows error when OTP verification fails", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent successfully",
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({
          message: "Invalid OTP.",
        }),
      });

    renderForgotPassword();

    // Email
    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.submit(emailInput.closest("form"));

    await screen.findByRole("heading", {
      name: /verify otp/i,
    });

    // OTP
    const otpInput =
      screen.getByPlaceholderText(/enter otp/i);

    fireEvent.change(otpInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(otpInput.closest("form"));

    expect(
      await screen.findByText("Invalid OTP.")
    ).toBeInTheDocument();
  });

  // ========================================
  // HELPER - MOVE TO RESET PASSWORD
  // ========================================

  const goToResetPassword = async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent successfully",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP verified successfully",
        }),
      });

    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.submit(emailInput.closest("form"));

    await screen.findByRole("heading", {
      name: /verify otp/i,
    });

    const otpInput =
      screen.getByPlaceholderText(/enter otp/i);

    fireEvent.change(otpInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(otpInput.closest("form"));

    await screen.findByRole("heading", {
      name: /reset password/i,
    });
  };

  // ========================================
  // 9. PASSWORDS DON'T MATCH
  // ========================================

  test("shows error when passwords do not match", async () => {
    renderForgotPassword();

    await goToResetPassword();

    const passwordInput =
      screen.getByPlaceholderText(/new password/i);

    const confirmPasswordInput =
      screen.getByPlaceholderText(
        /confirm password/i
      );

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    fireEvent.change(confirmPasswordInput, {
      target: {
        value: "password456",
      },
    });

    const form = passwordInput.closest("form");

    // IMPORTANT:
    // Submit the form instead of clicking the button.
    fireEvent.submit(form);

    expect(
      await screen.findByText(
        "Passwords do not match."
      )
    ).toBeInTheDocument();

    // API should not be called for reset
    expect(global.fetch).toHaveBeenCalledTimes(2);
  });

  // ========================================
  // 10. RESET PASSWORD SUCCESS
  // ========================================

  test("resets password successfully", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent successfully",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP verified successfully",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "Password reset successfully",
        }),
      });

    renderForgotPassword();

    // Email
    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.submit(emailInput.closest("form"));

    await screen.findByRole("heading", {
      name: /verify otp/i,
    });

    // OTP
    const otpInput =
      screen.getByPlaceholderText(/enter otp/i);

    fireEvent.change(otpInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(otpInput.closest("form"));

    await screen.findByRole("heading", {
      name: /reset password/i,
    });

    // Password
    const passwordInput =
      screen.getByPlaceholderText(/new password/i);

    const confirmPasswordInput =
      screen.getByPlaceholderText(
        /confirm password/i
      );

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    fireEvent.change(confirmPasswordInput, {
      target: {
        value: "password123",
      },
    });

    // Submit FORM
    fireEvent.submit(passwordInput.closest("form"));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(3);
    });

    expect(
      await screen.findByRole("heading", {
        name: /password reset successfully/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /back to login/i,
      })
    ).toBeInTheDocument();
  });

  // ========================================
  // 11. RESET PASSWORD FAILURE
  // ========================================

  test("shows error when password reset fails", async () => {
    global.fetch = jest
      .fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP sent successfully",
        }),
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          message: "OTP verified successfully",
        }),
      })
      .mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

    renderForgotPassword();

    // Email
    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.submit(emailInput.closest("form"));

    await screen.findByRole("heading", {
      name: /verify otp/i,
    });

    // OTP
    const otpInput =
      screen.getByPlaceholderText(/enter otp/i);

    fireEvent.change(otpInput, {
      target: {
        value: "123456",
      },
    });

    fireEvent.submit(otpInput.closest("form"));

    await screen.findByRole("heading", {
      name: /reset password/i,
    });

    // Password
    const passwordInput =
      screen.getByPlaceholderText(/new password/i);

    const confirmPasswordInput =
      screen.getByPlaceholderText(
        /confirm password/i
      );

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    fireEvent.change(confirmPasswordInput, {
      target: {
        value: "password123",
      },
    });

    fireEvent.submit(passwordInput.closest("form"));

    expect(
      await screen.findByText(
        "Unable to reset password."
      )
    ).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(3);
  });

  // ========================================
  // 12. BACK FROM OTP
  // ========================================

  test("goes back from OTP to email step", async () => {
    mockFetch({
      message: "OTP sent successfully",
    });

    renderForgotPassword();

    const emailInput =
      screen.getByPlaceholderText(/enter your email/i);

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.submit(emailInput.closest("form"));

    await screen.findByRole("heading", {
      name: /verify otp/i,
    });

    const backButton =
      screen.getByRole("button", {
        name: /back/i,
      });

    fireEvent.click(backButton);

    expect(
      await screen.findByRole("heading", {
        name: /forgot password/i,
      })
    ).toBeInTheDocument();
  });

  // ========================================
  // 13. CLOSE CALLBACK
  // ========================================

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

  // ========================================
  // 14. SWITCH TO LOGIN
  // ========================================

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

    expect(
      onSwitchToLogin
    ).toHaveBeenCalledTimes(1);
  });

  // ========================================
  // 15. NAVIGATE TO LOGIN
  // ========================================

  test("navigates to login when no callback is provided", () => {
    renderForgotPassword();

    fireEvent.click(
      screen.getByRole("button", {
        name: /back to login/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/login"
    );
  });

  // ========================================
  // 16. CLOSE NAVIGATION
  // ========================================

  test("uses login navigation when close is clicked without onClose", () => {
    renderForgotPassword();

    fireEvent.click(
      screen.getByRole("button", {
        name: /close/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/login"
    );
  });
});

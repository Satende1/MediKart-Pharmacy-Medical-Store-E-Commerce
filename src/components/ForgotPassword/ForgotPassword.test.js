import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import ForgotPassword from "./ForgotPassword";


describe("Forgot Password Component", () => {

  test("renders forgot password form", () => {

    render(<ForgotPassword />);

    expect(
      screen.getByText("Forgot Password")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Email Address")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Send Reset Link")
    ).toBeInTheDocument();

  });


  test("shows error when email is empty", async () => {

    render(<ForgotPassword />);

    const button = screen.getByText("Send Reset Link");

    await userEvent.click(button);


    expect(
      screen.getByText("Email is required")
    ).toBeInTheDocument();

  });



  test("shows error for invalid email", async () => {

    render(<ForgotPassword />);


    const input = screen.getByPlaceholderText(
      "Email Address"
    );


    await userEvent.type(
      input,
      "wrongemail"
    );


    await userEvent.click(
      screen.getByText("Send Reset Link")
    );


    expect(
      screen.getByText("Enter a valid email")
    ).toBeInTheDocument();

  });



  test("submits successfully with valid email", async () => {

    render(<ForgotPassword />);


    const input = screen.getByPlaceholderText(
      "Email Address"
    );


    await userEvent.type(
      input,
      "test@gmail.com"
    );


    await userEvent.click(
      screen.getByText("Send Reset Link")
    );


    expect(
      screen.getByText(
        "Reset link has been sent successfully."
      )
    ).toBeInTheDocument();

  });



  test("email input updates value", async () => {

    render(<ForgotPassword />);


    const input = screen.getByPlaceholderText(
      "Email Address"
    );


    await userEvent.type(
      input,
      "user@gmail.com"
    );


    expect(input).toHaveValue(
      "user@gmail.com"
    );

  });


});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Contact from "./Contact";

// Mock Footer component
jest.mock("../../components/Footer/Footer", () => () => (
  <div data-testid="footer">Footer</div>
));

describe("Contact Component", () => {
  test("renders contact hero section", () => {
    render(<Contact />);

    expect(screen.getByText("Contact MEDIKART")).toBeInTheDocument();
    expect(
      screen.getByText("We're here to help you 24×7")
    ).toBeInTheDocument();
  });

  test("renders contact information", () => {
    render(<Contact />);

    expect(screen.getByText("Get In Touch")).toBeInTheDocument();
    expect(screen.getByText("+91 98765 43210")).toBeInTheDocument();
    expect(screen.getByText("support@medikart.com")).toBeInTheDocument();
    expect(
      screen.getByText(/Medikart Healthcare Pvt. Ltd./i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Monday - Sunday/i)
    ).toBeInTheDocument();
  });

  test("renders contact form fields", () => {
    render(<Contact />);

    expect(
      screen.getByPlaceholderText("Your Name")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Email Address")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Mobile Number")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Your Message")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /Send Message/i })
    ).toBeInTheDocument();
  });

  test("submits the form successfully", () => {
    render(<Contact />);

    fireEvent.change(
      screen.getByPlaceholderText("Your Name"),
      {
        target: { value: "John Doe" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email Address"),
      {
        target: { value: "john@example.com" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Mobile Number"),
      {
        target: { value: "9876543210" },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Your Message"),
      {
        target: { value: "Hello MEDIKART!" },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /Send Message/i,
      })
    );

    expect(
      screen.getByText("✅ Message sent successfully!")
    ).toBeInTheDocument();
  });

  test("renders Footer component", () => {
    render(<Contact />);

    expect(
      screen.getByTestId("footer")
    ).toBeInTheDocument();
  });
});
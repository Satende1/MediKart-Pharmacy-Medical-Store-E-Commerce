import { render, screen } from "@testing-library/react";
import Navbar from "./Navbar";

// Mock image imports
jest.mock("../../assets/Medikart-logo.png", () => "logo.png");

describe("Navbar Component", () => {
  test("renders MediKart logo text", () => {
    render(<Navbar />);
    expect(screen.getAllByText("MediKart")[0]).toBeInTheDocument();
  });

  // eslint-disable-next-line jest/no-identical-title
  test("renders MediKart logo text", function () {
          render(<Navbar />);
          expect(screen.getAllByText("MediKart")[0]).toBeInTheDocument();
      });

test("renders navigation links", () => {
  render(<Navbar />);
  expect(screen.getAllByText("MediKart")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Shop")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Categories")[0]).toBeInTheDocument();
  expect(screen.getAllByText("About")[0]).toBeInTheDocument();
  expect(screen.getAllByText("Contact")[0]).toBeInTheDocument();
});

  test("renders search input", () => {
    render(<Navbar />);

    expect(
      screen.getByPlaceholderText("Search Medicines...")
    ).toBeInTheDocument();
  });

  test("renders user action buttons", () => {
    render(<Navbar />);

    expect(screen.getByText(/Wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("renders mobile menu button", () => {
    render(<Navbar />);

    expect(screen.getByText("☰")).toBeInTheDocument();
  });
});
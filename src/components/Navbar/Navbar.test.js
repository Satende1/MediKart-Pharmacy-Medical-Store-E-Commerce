import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Mock image imports
jest.mock("../../assets/Medikart-logo.png", () => "logo.png");

const renderNavbar = () => {
  return render(
    <BrowserRouter>
      <Navbar />
    </BrowserRouter>
  );
};

describe("Navbar Component", () => {
  test("renders MediKart logo text", () => {
    renderNavbar();
    expect(screen.getAllByText("MediKart")[0]).toBeInTheDocument();
  });

  test("renders navigation links", () => {
    renderNavbar();
    expect(screen.getAllByText("Home")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Shop")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Categories")[0]).toBeInTheDocument();
    expect(screen.getAllByText("About")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Contact")[0]).toBeInTheDocument();
  });

  test("renders search input", () => {
    renderNavbar();
    expect(
      screen.getByPlaceholderText("Search Medicines...")
    ).toBeInTheDocument();
  });

  test("renders user action buttons", () => {
    renderNavbar();
    expect(screen.getByText(/Wishlist/i)).toBeInTheDocument();
    expect(screen.getByText(/Cart/i)).toBeInTheDocument();
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

  test("renders mobile menu button", () => {
    renderNavbar();
    expect(screen.getByText("☰")).toBeInTheDocument();
  });
});
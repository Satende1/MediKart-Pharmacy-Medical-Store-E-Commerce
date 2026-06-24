import { render, screen } from "@testing-library/react";
import FlashSale from "./FlashSale";

// Mock Images
jest.mock("../assets/FlashSale/Debo650.jpg", () => "dolo650.jpg");
jest.mock("../assets/FlashSale/crocin.jpg", () => "crocin.jpg");
jest.mock("../assets/FlashSale/revital.jpg", () => "revital.jpg");
jest.mock("../assets/FlashSale/limcee.jpg", () => "limcee.jpg");
jest.mock("../assets/FlashSale/glucometer.jpg", () => "glucometer.jpg");
jest.mock("../assets/FlashSale/bpMonitor.jpg", () => "bpMonitor.jpg");
jest.mock("../assets/FlashSale/sanitizer.jpg", () => "sanitizer.jpg");
jest.mock("../assets/FlashSale/n95mask.jpg", () => "n95mask.jpg");

describe("FlashSale Component", () => {
  test("renders Flash Sale heading", () => {
    render(<FlashSale />);

    expect(
      screen.getByText(/Flash Sale/i)
    ).toBeInTheDocument();
  });

  test("renders all product titles", () => {
    render(<FlashSale />);

    expect(
      screen.getByText("Dolo 650")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Pain Relief")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Revital for Men/Women")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vitamin C Chewable (Limcee)")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Glucometer Kit")
    ).toBeInTheDocument();

    expect(
      screen.getByText("BP-Monitor")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Sanitizer")
    ).toBeInTheDocument();

    expect(
      screen.getByText("N95 Mask")
    ).toBeInTheDocument();
  });

  test("renders View Details buttons", () => {
    render(<FlashSale />);

    const buttons = screen.getAllByText(
      /View Details/i
    );

    expect(buttons).toHaveLength(8);
  });

  test("renders Add to Cart buttons", () => {
    render(<FlashSale />);

    const buttons = screen.getAllByText(
      /Add to Cart/i
    );

    expect(buttons).toHaveLength(8);
  });

  test("renders countdown timer labels", () => {
    render(<FlashSale />);

    expect(
      screen.getByText("Hours")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Minutes")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Seconds")
    ).toBeInTheDocument();
  });

  test("renders all product images", () => {
    render(<FlashSale />);

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(8);
  });

  test("renders discounted prices", () => {
    render(<FlashSale />);

    expect(screen.getByText("₹95")).toBeInTheDocument();
    expect(screen.getByText("₹275")).toBeInTheDocument();
    expect(screen.getByText("₹1999")).toBeInTheDocument();
  });
});
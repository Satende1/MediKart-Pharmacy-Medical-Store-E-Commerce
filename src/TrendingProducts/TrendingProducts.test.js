import { render, screen } from "@testing-library/react";
import TrendingProducts from "./TrendingProducts";

// Mock ProductCard component
jest.mock("../ProductCard/ProductCard", () => ({ product }) => (
  <div data-testid="product-card">
    <img src={product.image} alt={product.name} />
    <h3>{product.name}</h3>
    <p>₹{product.price}</p>
    <p>{product.rating}</p>
  </div>
));

// Mock product images
jest.mock("../assets/products/product5.png", () => "product5.png");
jest.mock("../assets/products/product6.png", () => "product6.png");
jest.mock("../assets/products/product7.png", () => "product7.png");
jest.mock("../assets/products/product8.png", () => "product8.png");

describe("TrendingProducts Component", () => {
  test("renders Trending Products heading", () => {
    render(<TrendingProducts />);

    expect(
      screen.getByRole("heading", {
        name: /trending products/i,
      })
    ).toBeInTheDocument();
  });

  test("renders description text", () => {
    render(<TrendingProducts />);

    expect(
      screen.getByText(
        /explore the most popular healthcare products on medikart/i
      )
    ).toBeInTheDocument();
  });

  test("renders all product names", () => {
    render(<TrendingProducts />);

    expect(
      screen.getByText("Digital Thermometer")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Protein Powder")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Face Wash")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vitamin D Capsules")
    ).toBeInTheDocument();
  });

  test("renders exactly 4 product cards", () => {
    render(<TrendingProducts />);

    const cards = screen.getAllByTestId("product-card");

    expect(cards).toHaveLength(4);
  });

  test("renders product images", () => {
    render(<TrendingProducts />);

    expect(
      screen.getByAltText("Digital Thermometer")
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Protein Powder")
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Face Wash")
    ).toBeInTheDocument();

    expect(
      screen.getByAltText("Vitamin D Capsules")
    ).toBeInTheDocument();
  });
});
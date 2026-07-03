import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ProductDetails from "./ProductDetails";
import { MemoryRouter } from "react-router-dom";

const mockNavigate = jest.fn();

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: jest.fn(),
}));

const { useParams } = require("react-router-dom");

// Mock products
jest.mock("../../data/products", () => [
  {
    id: 1,
    name: "Paracetamol 500mg",
    image: "/image.jpg",
    images: ["/image.jpg"],
    price: "100",
    discount: "10",
    rating: "4.5",
    reviews: 120,
    description: "Pain relief tablet",
  },
  {
    id: 2,
    name: "Vitamin C",
    image: "/vitamin.jpg",
    images: ["/vitamin.jpg"],
    price: "200",
    discount: "20",
    rating: "4.7",
    reviews: 80,
    description: "Vitamin tablets",
  },
]);

// Mock ProductGallery
jest.mock("../../components/ProductGallery/ProductGallery", () => () => (
  <div data-testid="gallery">Gallery</div>
));

// Mock QuantitySelector
jest.mock("../../components/QuantitySelector/QuantitySelector", () => {
  return ({ quantity, setQuantity }) => (
    <div data-testid="quantity-selector">
      <span>{quantity}</span>
      <button onClick={() => setQuantity(quantity + 1)}>+</button>
    </div>
  );
});

// Mock ProductSpecifications
jest.mock("../../components/ProductSpecifications/ProductSpecifications", () => () => (
  <div data-testid="specifications">
    Specifications
  </div>
));

// Mock RelatedProducts
jest.mock("../../components/RelatedProducts/RelatedProducts", () => () => (
  <div data-testid="related-products">
    Related Products
  </div>
));

describe("ProductDetails", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders product information", () => {
    useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Paracetamol 500mg")).toBeInTheDocument();
    expect(screen.getByText("Pain relief tablet")).toBeInTheDocument();
    expect(screen.getByText("120 Ratings")).toBeInTheDocument();
    expect(screen.getByText("10% OFF")).toBeInTheDocument();
  });

  test("renders child components", () => {
    useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(screen.getByTestId("gallery")).toBeInTheDocument();
    expect(screen.getByTestId("quantity-selector")).toBeInTheDocument();
    expect(screen.getByTestId("specifications")).toBeInTheDocument();
    expect(screen.getByTestId("related-products")).toBeInTheDocument();
  });

  test("back button navigates back", () => {
    useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("← Back"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("wishlist button toggles active class", () => {
    useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    const button = screen.getByLabelText("Add to Wishlist");

    expect(button).not.toHaveClass("active");

    fireEvent.click(button);

    expect(button).toHaveClass("active");

    fireEvent.click(button);

    expect(button).not.toHaveClass("active");
  });

  test("quantity increases", () => {
    useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText("+"));
  });

  test("shows Product Not Found", () => {
    useParams.mockReturnValue({ id: "999" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Product Not Found")).toBeInTheDocument();
  });

  test("renders Add to Cart button", () => {
    useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  test("renders Buy Now button", () => {
    useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(screen.getByText("Buy Now")).toBeInTheDocument();
  });

  test("displays calculated prices", () => {
    useParams.mockReturnValue({ id: "1" });

    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );
  });
});
import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import ProductDetails from "./ProductDetails";

// Mock navigate
const mockNavigate = jest.fn();

// Mock react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: "1" }),
}));

// Mock child components
jest.mock(
  "../../components/ProductGallery/ProductGallery",
  () => () => <div>Product Gallery</div>
);

jest.mock(
  "../../components/QuantitySelector/QuantitySelector",
  () => ({ quantity }) => (
    <div>Quantity: {quantity}</div>
  )
);

jest.mock(
  "../../components/ProductSpecifications/ProductSpecifications",
  () => () => <div>Product Specifications</div>
);

jest.mock(
  "../../components/RelatedProducts/RelatedProducts",
  () => () => <div>Related Products</div>
);

// Mock product data
jest.mock("../../data/products", () => [
  {
    id: 1,
    name: "Paracetamol Tablets",
    price: 100,
    discount: 10,
    rating: 4.8,
    reviews: 120,
    image: "/image.png",
    description: "Test product description",
  },
  {
    id: 2,
    name: "Vitamin D",
    price: 200,
    discount: 0,
    rating: 4.5,
    reviews: 50,
    image: "/image2.png",
  },
]);

describe("ProductDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();

    window.scrollTo = jest.fn();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test("shows loading initially", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Loading Product...")
    ).toBeInTheDocument();
  });

  test("renders product after loading", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(
      screen.getByText("Paracetamol Tablets")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Test product description")
    ).toBeInTheDocument();
  });

  test("renders price correctly", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });
  });

  test("renders child components", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(
      screen.getByText("Product Gallery")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Product Specifications")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Related Products")
    ).toBeInTheDocument();
  });

  test("back button navigates back", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });

    fireEvent.click(screen.getByText("← Back"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  test("Add to Cart changes button text", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      })
    );

    expect(
      screen.getByText("✓ Added")
    ).toBeInTheDocument();
  });

  test("Buy Now button renders", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(
      screen.getByRole("button", {
        name: /buy now/i,
      })
    ).toBeInTheDocument();
  });

  test("wishlist button toggles", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[3]);

    expect(buttons[3]).toHaveClass("active");
  });

  test("renders total amount", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(
      screen.getByText("Total Amount")
    ).toBeInTheDocument();

    expect(screen.getAllByText("₹90.00")[0]).toBeInTheDocument();
  });

  test("renders ratings", () => {
    render(
      <MemoryRouter>
        <ProductDetails />
      </MemoryRouter>
    );

    act(() => {
      jest.advanceTimersByTime(700);
    });

    expect(
      screen.getByText("120 Ratings")
    ).toBeInTheDocument();
  });
});
import { render, screen, fireEvent } from "@testing-library/react";
import ProductCard from "./ProductCard";

const mockProduct = {
  id: 1,
  name: "Dolo 650",
  category: "Tablets",
  price: 35,
  rating: 4.6,
  image: "test-image.jpg",
};

describe("ProductCard Component", () => {
  test("renders product image", () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={jest.fn()}
      />
    );

    const image = screen.getByAltText("Dolo 650");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  test("renders product name", () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={jest.fn()}
      />
    );

    expect(screen.getByText("Dolo 650")).toBeInTheDocument();
  });

  test("renders product category", () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={jest.fn()}
      />
    );

    expect(screen.getByText("Tablets")).toBeInTheDocument();
  });

  test("renders product price", () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={jest.fn()}
      />
    );

    expect(screen.getByText("₹35")).toBeInTheDocument();
  });

  test("renders product rating", () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={jest.fn()}
      />
    );

    expect(screen.getByText("⭐ 4.6")).toBeInTheDocument();
  });

  test("renders View Details button", () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={jest.fn()}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /view details/i,
      })
    ).toBeInTheDocument();
  });

  test("renders Add to Cart button", () => {
    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={jest.fn()}
      />
    );

    expect(
      screen.getByRole("button", {
        name: /add to cart/i,
      })
    ).toBeInTheDocument();
  });

  test("calls onAddToCart when Add to Cart button is clicked", () => {
    const mockAddToCart = jest.fn();

    render(
      <ProductCard
        product={mockProduct}
        onAddToCart={mockAddToCart}
      />
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /add to cart/i,
      })
    );

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
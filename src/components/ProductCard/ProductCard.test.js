import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ProductCard from "./ProductCard";

const mockProduct = {
  id: 1,
  name: "Dolo 650",
  category: "Tablets",
  price: 35,
  rating: 4.6,
  image: "test-image.jpg",
};

const renderProductCard = (props = {}) => {
  return render(
    <MemoryRouter>
      <ProductCard
        product={mockProduct}
        onAddToCart={jest.fn()}
        {...props}
      />
    </MemoryRouter>
  );
};

describe("ProductCard Component", () => {
  test("renders product image", () => {
    renderProductCard();

    const image = screen.getByAltText("Dolo 650");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  test("renders product name", () => {
    renderProductCard();

    expect(screen.getByText("Dolo 650")).toBeInTheDocument();
  });

  test("renders product category", () => {
    renderProductCard();

    expect(screen.getByText("Tablets")).toBeInTheDocument();
  });

  test("renders product price", () => {
    renderProductCard();

    expect(screen.getByText("₹35")).toBeInTheDocument();
  });

  test("renders product rating", () => {
    renderProductCard();

    expect(screen.getByText("⭐ 4.6")).toBeInTheDocument();
  });

  test("renders View Details link", () => {
    renderProductCard();

    expect(
      screen.getByRole("link", {
        name: /view details/i,
      })
    ).toBeInTheDocument();
  });

  test("renders Add to Cart button", () => {
    renderProductCard();

    expect(
      screen.getByRole("button", {
        name: /add to cart/i,
      })
    ).toBeInTheDocument();
  });

  test("calls onAddToCart when Add to Cart button is clicked", () => {
    const mockAddToCart = jest.fn();

    render(
      <MemoryRouter>
        <ProductCard
          product={mockProduct}
          onAddToCart={mockAddToCart}
        />
      </MemoryRouter>
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
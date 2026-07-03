/* eslint-disable testing-library/no-container */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import RelatedProducts from "./RelatedProducts";

// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("RelatedProducts Component", () => {
  const products = [
    {
      id: 1,
      name: "Dolo 650 Tablet",
      image: "dolo.jpg",
      price: 35,
      discount: 10,
    },
    {
      id: 2,
      name: "Crocin Advance",
      image: "crocin.jpg",
      price: 50,
      discount: 0,
    },
  ];

  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test("renders section title", () => {
    render(<RelatedProducts products={products} />);

    expect(screen.getByText("Our Products")).toBeInTheDocument();
  });

  test("renders all product names", () => {
    render(<RelatedProducts products={products} />);

    expect(screen.getByText("Dolo 650 Tablet")).toBeInTheDocument();
    expect(screen.getByText("Crocin Advance")).toBeInTheDocument();
  });

  test("renders all product prices", () => {
    render(<RelatedProducts products={products} />);

    expect(screen.getByText("₹35")).toBeInTheDocument();
    expect(screen.getByText("₹50")).toBeInTheDocument();
  });

  test("renders product discounts", () => {
    render(<RelatedProducts products={products} />);

    expect(screen.getByText("10% OFF")).toBeInTheDocument();
    expect(screen.getByText("Best price")).toBeInTheDocument();
  });

  test("renders all product images", () => {
    render(<RelatedProducts products={products} />);

    const images = screen.getAllByRole("img");

    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "dolo.jpg");
    expect(images[0]).toHaveAttribute("alt", "Dolo 650 Tablet");

    expect(images[1]).toHaveAttribute("src", "crocin.jpg");
    expect(images[1]).toHaveAttribute("alt", "Crocin Advance");
  });

  test("navigates to product details when first card is clicked", () => {
    render(<RelatedProducts products={products} />);

    fireEvent.click(screen.getByText("Dolo 650 Tablet"));

    expect(mockNavigate).toHaveBeenCalledWith("/product/1");
  });

  test("navigates to second product when clicked", () => {
    render(<RelatedProducts products={products} />);

    fireEvent.click(screen.getByText("Crocin Advance"));

    expect(mockNavigate).toHaveBeenCalledWith("/product/2");
  });

  test("renders correct number of cards", () => {
    const { container } = render(
      <RelatedProducts products={products} />
    );

    expect(container.querySelectorAll(".related-card")).toHaveLength(2);
  });

  test("renders correct number of image containers", () => {
    const { container } = render(
      <RelatedProducts products={products} />
    );

    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelectorAll(".image-box")).toHaveLength(2);
  });

  test("renders correct number of product info sections", () => {
    const { container } = render(
      <RelatedProducts products={products} />
    );

    // eslint-disable-next-line testing-library/no-container
    expect(container.querySelectorAll(".product-info")).toHaveLength(2);
  });

  test("renders without crashing when products array is empty", () => {
    render(<RelatedProducts products={[]} />);

    expect(screen.getByText("Our Products")).toBeInTheDocument();
  });
});
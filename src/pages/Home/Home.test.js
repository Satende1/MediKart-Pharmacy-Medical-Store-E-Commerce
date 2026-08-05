import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./Home";

// Mock all child components
jest.mock("../../components/HeroBanner/HeroBanner", () => () => (
  <div data-testid="hero-banner">HeroBanner</div>
));

jest.mock("../../components/ShopByCategory/ShopByCategory", () => () => (
  <div data-testid="shop-by-category">ShopByCategory</div>
));

jest.mock("../../FeaturedProducts/FeaturedProducts", () => () => (
  <div data-testid="featured-products">FeaturedProducts</div>
));

jest.mock("../../TrendingProducts/TrendingProducts", () => () => (
  <div data-testid="trending-products">TrendingProducts</div>
));

jest.mock("../../FlashSale/FlashSale", () => () => (
  <div data-testid="flash-sale">FlashSale</div>
));

jest.mock("../../components/Newsletter/Newsletter", () => () => (
  <div data-testid="newsletter">Newsletter</div>
));

jest.mock("../../components/Footer/Footer", () => () => (
  <div data-testid="footer">Footer</div>
));

describe("Home Component", () => {
  test("renders HeroBanner", () => {
    render(<Home />);
    expect(screen.getByTestId("hero-banner")).toBeInTheDocument();
  });

  test("renders ShopByCategory", () => {
    render(<Home />);
    expect(screen.getByTestId("shop-by-category")).toBeInTheDocument();
  });

  test("renders FeaturedProducts", () => {
    render(<Home />);
    expect(screen.getByTestId("featured-products")).toBeInTheDocument();
  });

  test("renders TrendingProducts", () => {
    render(<Home />);
    expect(screen.getByTestId("trending-products")).toBeInTheDocument();
  });

  test("renders FlashSale", () => {
    render(<Home />);
    expect(screen.getByTestId("flash-sale")).toBeInTheDocument();
  });

  test("renders Newsletter", () => {
    render(<Home />);
    expect(screen.getByTestId("newsletter")).toBeInTheDocument();
  });

  test("renders Footer", () => {
    render(<Home />);
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
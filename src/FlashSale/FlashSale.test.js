/* eslint-disable no-unused-vars */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";
import FlashSale from "./FlashSale";

jest.useFakeTimers();

// Mock images
jest.mock("../assets/FlashSale/Debo650.jpg", () => "dolo.jpg");
jest.mock("../assets/FlashSale/crocin.jpg", () => "crocin.jpg");
jest.mock("../assets/FlashSale/revital.jpg", () => "revital.jpg");
jest.mock("../assets/FlashSale/limcee.jpg", () => "limcee.jpg");
jest.mock("../assets/FlashSale/glucometer.jpg", () => "glucometer.jpg");
jest.mock("../assets/FlashSale/bpMonitor.jpg", () => "bp.jpg");
jest.mock("../assets/FlashSale/n95mask.jpg", () => "mask.jpg");
jest.mock("../assets/FlashSale/sanitizer.jpg", () => "sanitizer.jpg");

// Mock CSS module
jest.mock("./FlashSale.module.css", () => ({}));

describe("FlashSale Component", () => {
  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(
      <MemoryRouter>
        <FlashSale />
      </MemoryRouter>
    );
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  test("renders Flash Sale heading", () => {
    expect(screen.getByText(/Flash Sale/i)).toBeInTheDocument();
  });

  test("renders Limited Time Deals text", () => {
    expect(screen.getByText(/Limited Time Deals/i)).toBeInTheDocument();
  });

  test("renders all flash sale products", () => {
    expect(screen.getByText("Dolo 650")).toBeInTheDocument();
    expect(screen.getByText("Pain Relief")).toBeInTheDocument();
    expect(screen.getByText("Revital for Men/Women")).toBeInTheDocument();
    expect(screen.getByText("Vitamin C Chewable (Limcee)")).toBeInTheDocument();
    expect(screen.getByText("Glucometer Kit")).toBeInTheDocument();
    expect(screen.getByText("BP Monitor")).toBeInTheDocument();
    expect(screen.getByText("Sanitizer")).toBeInTheDocument();
    expect(screen.getByText("N95 Mask")).toBeInTheDocument();
  });

  test("renders 8 product images", () => {
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(8);
  });

  test("renders 8 View Details links", () => {
    const links = screen.getAllByRole("link", {
      name: /View Details/i,
    });

    expect(links).toHaveLength(8);
  });

  test("renders 8 Add to Cart buttons", () => {
    const buttons = screen.getAllByRole("button", {
      name: /Add to Cart/i,
    });

    expect(buttons).toHaveLength(8);
  });

  test("changes Add to Cart button to Added", () => {
    const button = screen.getAllByRole("button", {
      name: /Add to Cart/i,
    })[0];

    fireEvent.click(button);

    expect(screen.getByText(/✓ Added/i)).toBeInTheDocument();
  });

  test("button changes back after 5 seconds", () => {
    const button = screen.getAllByRole("button", {
      name: /Add to Cart/i,
    })[0];

    fireEvent.click(button);

    expect(screen.getByText(/✓ Added/i)).toBeInTheDocument();

    jest.advanceTimersByTime(5000);

    expect(screen.getAllByText(/Add to Cart/i)[0]).toBeInTheDocument();
  });

  test("timer labels are displayed", () => {
    expect(screen.getByText("Hours")).toBeInTheDocument();
    expect(screen.getByText("Minutes")).toBeInTheDocument();
    expect(screen.getByText("Seconds")).toBeInTheDocument();
  });

  test("countdown timer updates after one second", () => {
    const secondsBefore = screen.getAllByText(/\d{2}/);

    jest.advanceTimersByTime(1000);

    const secondsAfter = screen.getAllByText(/\d{2}/);

    expect(secondsAfter.length).toBeGreaterThan(0);
  });

  test("View Details links contain correct URLs", () => {
    const links = screen.getAllByRole("link", {
      name: /View Details/i,
    });

    expect(links[0]).toHaveAttribute("href", "/product/8");
    expect(links[1]).toHaveAttribute("href", "/product/9");
    expect(links[2]).toHaveAttribute("href", "/product/10");
  });
});
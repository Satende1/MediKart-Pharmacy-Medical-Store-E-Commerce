import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import QuantitySelector from "./QuantitySelector";

describe("QuantitySelector Component", () => {
  let mockSetQuantity;

  beforeEach(() => {
    mockSetQuantity = jest.fn();
  });

  test("renders quantity selector", () => {
    render(
      <QuantitySelector
        quantity={1}
        setQuantity={mockSetQuantity}
      />
    );

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  test("renders increase and decrease buttons", () => {
    render(
      <QuantitySelector
        quantity={1}
        setQuantity={mockSetQuantity}
      />
    );

    expect(
      screen.getByRole("button", { name: "-" })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: "+" })
    ).toBeInTheDocument();
  });

  test("calls setQuantity when '+' button is clicked", () => {
    render(
      <QuantitySelector
        quantity={2}
        setQuantity={mockSetQuantity}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "+" })
    );

    expect(mockSetQuantity).toHaveBeenCalledTimes(1);
    expect(mockSetQuantity).toHaveBeenCalledWith(3);
  });

  test("calls setQuantity when '-' button is clicked and quantity > 1", () => {
    render(
      <QuantitySelector
        quantity={3}
        setQuantity={mockSetQuantity}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "-" })
    );

    expect(mockSetQuantity).toHaveBeenCalledTimes(1);
    expect(mockSetQuantity).toHaveBeenCalledWith(2);
  });

  test("does not decrease quantity below 1", () => {
    render(
      <QuantitySelector
        quantity={1}
        setQuantity={mockSetQuantity}
      />
    );

    fireEvent.click(
      screen.getByRole("button", { name: "-" })
    );

    expect(mockSetQuantity).not.toHaveBeenCalled();
  });

  test("displays the correct quantity", () => {
    render(
      <QuantitySelector
        quantity={5}
        setQuantity={mockSetQuantity}
      />
    );

    expect(screen.getByText("5")).toBeInTheDocument();
  });

  test("renders exactly two buttons", () => {
    render(
      <QuantitySelector
        quantity={1}
        setQuantity={mockSetQuantity}
      />
    );

    expect(screen.getAllByRole("button")).toHaveLength(2);
  });

  test("wrapper element is rendered", () => {
    const { container } = render(
      <QuantitySelector
        quantity={1}
        setQuantity={mockSetQuantity}
      />
    );

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(".quantity-selector-wrapper")
    ).toBeInTheDocument();
  });

  test("selector element is rendered", () => {
    const { container } = render(
      <QuantitySelector
        quantity={1}
        setQuantity={mockSetQuantity}
      />
    );

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(".quantity-selector")
    ).toBeInTheDocument();
  });

  test("quantity value has correct class", () => {
    const { container } = render(
      <QuantitySelector
        quantity={4}
        setQuantity={mockSetQuantity}
      />
    );

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(".qty-value")
    ).toHaveTextContent("4");
  });
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AddressModal from "./AddressModal";

// Mock GoogleMapPicker
jest.mock("./GoogleMapPicker", () => (props) => (
  <div>
    <button
      onClick={() =>
        props.onSelect({
          name: "Satender Kashyap",
          address: "123 MG Road",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500001",
          mobile: "9876543210",
        })
      }
    >
      Select Mock Address
    </button>
  </div>
));

describe("AddressModal Component", () => {
  beforeEach(() => {
    localStorage.clear();
    window.alert = jest.fn();
  });

  test("does not render when isOpen is false", () => {
    render(
      <AddressModal
        isOpen={false}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />
    );

    expect(
      screen.queryByText(/Select Delivery Address/i)
    ).not.toBeInTheDocument();
  });

  test("renders modal when isOpen is true", () => {
    render(
      <AddressModal
        isOpen={true}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />
    );

    expect(
      screen.getByText(/Select Delivery Address/i)
    ).toBeInTheDocument();
  });

  test("calls onClose when Cancel button is clicked", () => {
    const onClose = jest.fn();

    render(
      <AddressModal
        isOpen={true}
        onClose={onClose}
        onSave={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/Cancel/i));

    expect(onClose).toHaveBeenCalled();
  });

  test("shows alert if Save Address is clicked without selecting an address", () => {
    render(
      <AddressModal
        isOpen={true}
        onClose={jest.fn()}
        onSave={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText(/Save Address/i));

    expect(window.alert).toHaveBeenCalledWith(
      "Please select an address."
    );
  });

  test("saves selected address and calls onSave", () => {
    const onSave = jest.fn();
    const onClose = jest.fn();

    render(
      <AddressModal
        isOpen={true}
        onClose={onClose}
        onSave={onSave}
      />
    );

    fireEvent.click(screen.getByText(/Select Mock Address/i));

    fireEvent.click(screen.getByText(/Save Address/i));

    expect(onSave).toHaveBeenCalled();

    expect(localStorage.getItem("deliveryAddress")).not.toBeNull();

    expect(onClose).toHaveBeenCalled();
  });

  test("closes modal when X button is clicked", () => {
    const onClose = jest.fn();

    render(
      <AddressModal
        isOpen={true}
        onClose={onClose}
        onSave={jest.fn()}
      />
    );

    fireEvent.click(screen.getByText("✕"));

    expect(onClose).toHaveBeenCalled();
  });
});
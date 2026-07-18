import React from "react";
import { render, screen } from "@testing-library/react";
import AddressSection from "./AddressSection";

// Mock AddressModal
jest.mock("../Address/AddressModal", () => () => (
  <div>Address Modal</div>
));

// Mock address storage
jest.mock("../../utils/addressStorage", () => ({
  getAddress: () => ({
    name: "Satender",
    address: "123 Main Road",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500001",
    mobile: "9876543210",
  }),
  getDefaultAddress: () => ({
    name: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    mobile: "",
  }),
}));

describe("AddressSection", () => {
  test("renders address details", () => {
    render(<AddressSection />);

    expect(screen.getByText("Deliver to")).toBeInTheDocument();
    expect(screen.getByText("Satender")).toBeInTheDocument();
    expect(screen.getByText("123 Main Road")).toBeInTheDocument();
    expect(screen.getByText(/Hyderabad/i)).toBeInTheDocument();
    expect(screen.getByText(/9876543210/i)).toBeInTheDocument();
    expect(screen.getByText("Change Address")).toBeInTheDocument();
  });
});
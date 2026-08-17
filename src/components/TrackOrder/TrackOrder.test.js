// TrackOrder.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import TrackOrder from "./TrackOrder";

// Mock the modules BEFORE importing the component
jest.mock("react-router-dom", () => ({
  useNavigate: () => jest.fn(),
  BrowserRouter: ({ children }) => <div>{children}</div>,
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
  removeItem: jest.fn(),
};
Object.defineProperty(window, "localStorage", { value: localStorageMock });

// Mock clipboard
Object.defineProperty(navigator, "clipboard", {
  value: { writeText: jest.fn().mockResolvedValue(undefined) },
});

// Mock console.error to avoid test output clutter
console.error = jest.fn();

// Test data
const mockOrder = {
  orderId: "ORD-12345",
  status: "Shipped",
  totalAmount: 2999,
  estimatedDelivery: "15 Aug 2026",
  customer: {
    name: "John Doe",
    address: "123 Main Street",
    phone: "+91 9876543210",
  },
  courier: {
    name: "Blue Dart",
    trackingId: "BD-9876543210",
  },
  items: [
    {
      id: 1,
      name: "Vitamin C",
      price: 999,
      quantity: 2,
      image: "test.jpg",
    },
  ],
};

// Helper to render component
const renderComponent = () => {
  return render(
    <BrowserRouter>
      <TrackOrder />
    </BrowserRouter>
  );
};

describe("TrackOrder Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.getItem.mockReset();
  });

  // Test 1: Empty state
  test("shows empty state when no order exists", () => {
    localStorageMock.getItem.mockReturnValue(null);
    renderComponent();

    expect(screen.getByText("No Order Found")).toBeInTheDocument();
    expect(screen.getByText("Continue Shopping")).toBeInTheDocument();
  });

  // Test 2: Invalid JSON
  test("shows empty state when localStorage has invalid JSON", () => {
    localStorageMock.getItem.mockReturnValue("invalid json");
    renderComponent();

    expect(screen.getByText("No Order Found")).toBeInTheDocument();
  });

  // Test 3: Renders order details
  test("renders order details when valid order exists", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrder));
    renderComponent();
  });

  // Test 4: Delivered status
  test("shows delivered status correctly", () => {
    const deliveredOrder = { ...mockOrder, status: "Delivered" };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(deliveredOrder));
    renderComponent();

    expect(screen.getByText("Order Delivered")).toBeInTheDocument();
    expect(screen.getByText("Your order has been delivered successfully")).toBeInTheDocument();
  });

  // Test 5: Missing fields use defaults
  test("uses default values when fields are missing", () => {
    const minimalOrder = {
      orderId: "ORD-001",
      status: "Order Placed",
      items: [{ name: "Product", price: 100, quantity: 1 }],
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(minimalOrder));
    renderComponent();

    expect(screen.getByText("MEDIKART Delivery")).toBeInTheDocument();
    expect(screen.getByText("Not available")).toBeInTheDocument();
    expect(screen.getByText("Customer")).toBeInTheDocument();
    expect(screen.getByText("Delivery address not available")).toBeInTheDocument();
  });

  // Test 6: Copy order ID
  test("copies order ID to clipboard", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrder));
    renderComponent();

    const copyButton = screen.getByTitle("Copy Order ID");
    fireEvent.click(copyButton);

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith("ORD-12345");
  });

  // Test 7: Back button navigation
  test("navigates back when back button is clicked", () => {
    const navigateMock = jest.fn();
    const useNavigateSpy = jest.spyOn(require("react-router-dom"), "useNavigate");
    useNavigateSpy.mockReturnValue(navigateMock);

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrder));
    renderComponent();

    const backButton = screen.getByRole("button", { name: /back/i });
    fireEvent.click(backButton);

    expect(navigateMock).toHaveBeenCalledWith(-1);
  });

  // Test 8: Continue shopping navigation
  test("navigates to shop when continue shopping is clicked", () => {
    const navigateMock = jest.fn();
    const useNavigateSpy = jest.spyOn(require("react-router-dom"), "useNavigate");
    useNavigateSpy.mockReturnValue(navigateMock);

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrder));
    renderComponent();

    const continueButton = screen.getByText("Continue Shopping");
    fireEvent.click(continueButton);

    expect(navigateMock).toHaveBeenCalledWith("/shop");
  });

  // Test 9: Contact us navigation
  test("navigates to contact page when contact us is clicked", () => {
    const navigateMock = jest.fn();
    const useNavigateSpy = jest.spyOn(require("react-router-dom"), "useNavigate");
    useNavigateSpy.mockReturnValue(navigateMock);

    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrder));
    renderComponent();

    const contactButton = screen.getByText("Contact Us");
    fireEvent.click(contactButton);

    expect(navigateMock).toHaveBeenCalledWith("/contact");
  });

  // Test 10: Total calculation
  test("calculates total correctly from items", () => {
    const orderWithItems = {
      ...mockOrder,
      items: [
        { name: "Item 1", price: 100, quantity: 2, image: "test.jpg" },
        { name: "Item 2", price: 50, quantity: 3, image: "test.jpg" },
      ],
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(orderWithItems));
    renderComponent();
  });

  // Test 11: Shows ToastContainer
  test("renders ToastContainer", () => {
    localStorageMock.getItem.mockReturnValue(JSON.stringify(mockOrder));
    renderComponent();

    expect(screen.getByTestId("toast-container")).toBeInTheDocument();
  });

  // Test 12: Handles single product without items array
  test("renders single product when items array doesn't exist", () => {
    const singleProductOrder = {
      orderId: "ORD-999",
      status: "Order Placed",
      product: {
        name: "Single Product",
        price: 299,
        quantity: 1,
        image: "test.jpg",
      },
    };
    localStorageMock.getItem.mockReturnValue(JSON.stringify(singleProductOrder));
    renderComponent();

    expect(screen.getByText("Single Product")).toBeInTheDocument();
    expect(screen.getByText("1 Item")).toBeInTheDocument();
  });
});
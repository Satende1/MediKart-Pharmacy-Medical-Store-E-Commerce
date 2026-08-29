import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Checkout from "./Checkout";

// Mock react-router-dom
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Checkout Component", () => {
  const cartItems = [
    {
      id: 101,
      name: "Paracetamol 650mg",
      brand: "MediCare",
      category: "Medicines",
      price: 100,
      quantity: 2,
      image: "paracetamol.jpg",
    },
    {
      id: 102,
      name: "Digital Thermometer",
      brand: "Dr Trust",
      category: "Medical Devices",
      price: 500,
      quantity: 1,
      image: "thermometer.jpg",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    localStorage.clear();

    localStorage.setItem(
      "cart",
      JSON.stringify(cartItems)
    );

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify({
        name: "Test User",
        phone: "9876543210",
        address: "Test Street",
        city: "Hyderabad",
        state: "Telangana",
        pincode: "500001",
      })
    );

    // Mock Date.now so order ID is predictable
    jest.spyOn(Date, "now").mockReturnValue(
      1234567890123
    );
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // =====================================================
  // INITIAL RENDER
  // =====================================================

  test("renders checkout page with cart items", () => {
    render(<Checkout />);

    expect(
      screen.getByText("MediKart Checkout")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Your Order")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Paracetamol 650mg")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Digital Thermometer")
    ).toBeInTheDocument();
  });

  // =====================================================
  // CART ITEM COUNT
  // =====================================================

  test("shows correct cart item count", () => {
    render(<Checkout />);

    expect(
      screen.getByTestId("cart-item-count")
    ).toHaveTextContent("2 Items");
  });

  // =====================================================
  // PRODUCT TOTAL
  // =====================================================

  test("calculates product total correctly", () => {
    render(<Checkout />);

    // 100 * 2 + 500 * 1 = 700
    expect(
      screen.getByTestId("product-total")
    ).toHaveTextContent("₹700");
  });

  // =====================================================
  // DISCOUNT
  // =====================================================

  test("calculates 10 percent discount", () => {
    render(<Checkout />);

    // 10% of 700 = 70
    expect(
      screen.getByText("Flat 10% Discount")
    ).toBeInTheDocument();

    expect(
      screen.getByText("- ₹70")
    ).toBeInTheDocument();
  });

  // =====================================================
  // SPECIAL CATEGORY
  // =====================================================

  test("adds special handling charge for medical devices", () => {
    render(<Checkout />);

    expect(
      screen.getByText(/Includes ₹50 special handling/i)
    ).toBeInTheDocument();
  });

  // =====================================================
  // QUANTITY INCREASE
  // =====================================================

  test("increases product quantity", () => {
    render(<Checkout />);

    const increaseButton =
      screen.getByTestId("increase-101");

    fireEvent.click(increaseButton);

    expect(
      screen.getByTestId("quantity-101")
    ).toHaveTextContent("3");

    expect(
      screen.getByTestId("item-total-101")
    ).toHaveTextContent("₹300");
  });

  // =====================================================
  // QUANTITY DECREASE
  // =====================================================

  test("decreases product quantity", () => {
    render(<Checkout />);

    const decreaseButton =
      screen.getByTestId("decrease-101");

    fireEvent.click(decreaseButton);

    expect(
      screen.getByTestId("quantity-101")
    ).toHaveTextContent("1");
  });

  // =====================================================
  // QUANTITY CANNOT GO BELOW 1
  // =====================================================

  test("does not decrease quantity below one", () => {
    render(<Checkout />);

    const decreaseButton =
      screen.getByTestId("decrease-101");

    fireEvent.click(decreaseButton);
    fireEvent.click(decreaseButton);

    expect(
      screen.getByTestId("quantity-101")
    ).toHaveTextContent("1");

    expect(decreaseButton).toBeDisabled();
  });

  // =====================================================
  // REMOVE ITEM
  // =====================================================

  test("removes an item from cart", () => {
    render(<Checkout />);

    const removeButton =
      screen.getByTestId("remove-101");

    fireEvent.click(removeButton);

    expect(
      screen.queryByText("Paracetamol 650mg")
    ).not.toBeInTheDocument();

    expect(
      screen.getByText("Digital Thermometer")
    ).toBeInTheDocument();

    const storedCart = JSON.parse(
      localStorage.getItem("cart")
    );

    expect(storedCart).toHaveLength(1);
    expect(storedCart[0].id).toBe(102);
  });

  // =====================================================
  // PROCEED TO ADDRESS
  // =====================================================

  test("moves from order step to address step", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    expect(
      screen.getByText("Delivery Address")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Full Name")
    ).toBeInTheDocument();
  });

  // =====================================================
  // SAVED ADDRESS
  // =====================================================

  test("loads saved address from localStorage", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    expect(
      screen.getByLabelText("Full Name")
    ).toHaveValue("Test User");

    expect(
      screen.getByLabelText("Mobile Number")
    ).toHaveValue("9876543210");

    expect(
      screen.getByLabelText("City")
    ).toHaveValue("Hyderabad");

    expect(
      screen.getByLabelText("State")
    ).toHaveValue("Telangana");

    expect(
      screen.getByLabelText("Pincode")
    ).toHaveValue("500001");
  });

  // =====================================================
  // ADDRESS VALIDATION
  // =====================================================

  test("shows validation when address is incomplete", () => {
    localStorage.removeItem("deliveryAddress");

    const alertMock = jest
      .spyOn(window, "alert")
      .mockImplementation(() => { });

    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    expect(alertMock).toHaveBeenCalledWith(
      "Please enter your name."
    );

    alertMock.mockRestore();
  });

  // =====================================================
  // ADDRESS → PAYMENT
  // =====================================================

  test("moves to payment after valid address", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    expect(
      screen.getByText("Payment Method")
    ).toBeInTheDocument();
  });

  // =====================================================
  // SAVES ADDRESS
  // =====================================================

  test("saves delivery address to localStorage", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    const savedAddress = JSON.parse(
      localStorage.getItem("deliveryAddress")
    );

    expect(savedAddress).toEqual({
      name: "Test User",
      phone: "9876543210",
      address: "Test Street",
      city: "Hyderabad",
      state: "Telangana",
      pincode: "500001",
    });
  });

  // =====================================================
  // DELIVERY OPTIONS
  // =====================================================

  test("shows delivery options", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    expect(
      screen.getByText("Normal Delivery")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Express Delivery")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Today Delivery")
    ).toBeInTheDocument();
  });

  // =====================================================
  // EXPRESS DELIVERY
  // =====================================================

  test("allows express delivery when eligible", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    const expressRadio =
      screen.getByDisplayValue("express");

    expect(expressRadio).not.toBeDisabled();

    fireEvent.click(expressRadio);

    expect(expressRadio).toBeChecked();
  });

  // =====================================================
  // TODAY DELIVERY
  // =====================================================

  test("allows today delivery when eligible", () => {
    // Product total must be >= 999
    const expensiveCart = [
      {
        id: 200,
        name: "Premium Healthcare Product",
        category: "Premium Healthcare",
        price: 1200,
        quantity: 1,
      },
    ];

    localStorage.setItem(
      "cart",
      JSON.stringify(expensiveCart)
    );

    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    const todayRadio =
      screen.getByDisplayValue("today");

    expect(todayRadio).not.toBeDisabled();

    fireEvent.click(todayRadio);

    expect(todayRadio).toBeChecked();
  });

  // =====================================================
  // PAYMENT METHODS
  // =====================================================

  test("shows payment methods", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    expect(
      screen.getByLabelText(
        "Credit / Debit Card"
      )
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Net Banking")
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText("Cash on Delivery")
    ).toBeInTheDocument();
  });

  // =====================================================
  // CARD PAYMENT
  // =====================================================

  test("shows card form when card payment is selected", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    fireEvent.click(
      screen.getByLabelText(
        "Credit / Debit Card"
      )
    );

    expect(
      screen.getByPlaceholderText("Card Number")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("MM/YY")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("CVV")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(
        "Card Holder Name"
      )
    ).toBeInTheDocument();
  });

  // =====================================================
  // NET BANKING
  // =====================================================

  test("shows bank selection for net banking", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    fireEvent.click(
      screen.getByLabelText("Net Banking")
    );

    expect(
      screen.getByText("Select Bank")
    ).toBeInTheDocument();

    expect(
      screen.getByText("HDFC Bank")
    ).toBeInTheDocument();
  });

  // =====================================================
  // COD DEFAULT
  // =====================================================

  test("cash on delivery is selected by default", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    expect(
      screen.getByLabelText(
        "Cash on Delivery"
      )
    ).toBeChecked();
  });

  // =====================================================
  // PAYABLE AMOUNT
  // =====================================================

  test("shows payable amount", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    expect(
      screen.getByTestId("payable-amount")
    ).toBeInTheDocument();
  });

  // =====================================================
  // BACK BUTTON
  // =====================================================

  test("goes back from address to order", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Back")
    );

    expect(
      screen.getByText("Your Order")
    ).toBeInTheDocument();
  });

  // =====================================================
  // BACK FROM PAYMENT
  // =====================================================

  test("goes back from payment to address", () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    fireEvent.click(
      screen.getByText("Back")
    );

    expect(
      screen.getByText("Delivery Address")
    ).toBeInTheDocument();
  });

  // =====================================================
  // PLACE ORDER
  // =====================================================

  test("places order successfully", async () => {
    render(<Checkout />);

    // Step 1
    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    // Step 2
    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    // Step 3
    fireEvent.click(
      screen.getByTestId("place-order")
    );

    // Processing screen
    expect(
      screen.getByText("Placing Your Order...")
    ).toBeInTheDocument();

    await waitFor(
      () => {
        expect(
          screen.getByText(
            "Order Placed Successfully!"
          )
        ).toBeInTheDocument();
      },
      {
        timeout: 1500,
      }
    );
  });

  // =====================================================
  // ORDER ID
  // =====================================================

  test("generates an order ID after successful order", async () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    fireEvent.click(
      screen.getByTestId("place-order")
    );

    await waitFor(
      () => {
        const orderId =
          screen.getByTestId("order-id");

        expect(orderId).toBeInTheDocument();

        expect(orderId.textContent).toMatch(
          /^MK\d{10}$/
        );
      },
      {
        timeout: 1500,
      }
    );
  });

  // =====================================================
  // ORDER SAVED TO LOCAL STORAGE
  // =====================================================

  test("saves order to localStorage", async () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    fireEvent.click(
      screen.getByTestId("place-order")
    );

    await waitFor(
      () => {
        expect(
          screen.getByText(
            "Order Placed Successfully!"
          )
        ).toBeInTheDocument();
      },
      {
        timeout: 1500,
      }
    );

    const orders = JSON.parse(
      localStorage.getItem("orders")
    );

    expect(orders).toHaveLength(1);

    expect(orders[0]).toHaveProperty(
      "orderId"
    );

    expect(orders[0]).toHaveProperty(
      "items"
    );

    expect(orders[0]).toHaveProperty(
      "address"
    );

    expect(orders[0]).toHaveProperty(
      "paymentMethod"
    );

    expect(orders[0]).toHaveProperty(
      "totalAmount"
    );
  });

  // =====================================================
  // CART CLEARED AFTER ORDER
  // =====================================================

  test("clears cart after successful order", async () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    fireEvent.click(
      screen.getByTestId("place-order")
    );

    await waitFor(
      () => {
        expect(
          screen.getByText(
            "Order Placed Successfully!"
          )
        ).toBeInTheDocument();
      },
      {
        timeout: 1500,
      }
    );

    expect(
      localStorage.getItem("cart")
    ).toBeNull();
  });

  // =====================================================
  // VIEW ORDER
  // =====================================================

  test("navigates to order details", async () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    fireEvent.click(
      screen.getByTestId("place-order")
    );

    await waitFor(
      () => {
        expect(
          screen.getByTestId("view-order")
        ).toBeInTheDocument();
      },
      {
        timeout: 1500,
      }
    );

    fireEvent.click(
      screen.getByTestId("view-order")
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringMatching(/^\/orders\/MK\d{10}$/)
    );
  });

  // =====================================================
  // CONTINUE SHOPPING
  // =====================================================

  test("navigates to shop from success page", async () => {
    render(<Checkout />);

    fireEvent.click(
      screen.getByTestId("proceed-address")
    );

    fireEvent.click(
      screen.getByText("Continue to Payment")
    );

    fireEvent.click(
      screen.getByTestId("place-order")
    );

    await waitFor(
      () => {
        expect(
          screen.getByText(
            "Order Placed Successfully!"
          )
        ).toBeInTheDocument();
      },
      {
        timeout: 1500,
      }
    );

    fireEvent.click(
      screen.getByText("Continue Shopping")
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/shop"
    );
  });
});
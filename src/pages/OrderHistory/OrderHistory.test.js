import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import OrderHistory from "./OrderHistory";


// Mock Footer so the tests focus only on OrderHistory
jest.mock("../../components/Footer/Footer", () => () => (
  <div data-testid="footer">Footer</div>
));


describe("OrderHistory", () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });


  // ==================================================
  // EMPTY STATE
  // ==================================================

  test("renders Order History heading", () => {
    render(<OrderHistory />);

    expect(
      screen.getByRole("heading", {
        name: "Order History",
      })
    ).toBeInTheDocument();
  });


  test("renders Order History description", () => {
    render(<OrderHistory />);

    expect(
      screen.getByText(
        "View all your previous MEDIKART orders."
      )
    ).toBeInTheDocument();
  });


  test("shows empty state when there are no orders", () => {
    render(<OrderHistory />);

    expect(
      screen.getByRole("heading", {
        name: "No Orders Yet",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "You haven't placed any orders yet."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: "Start Shopping",
      })
    ).toBeInTheDocument();
  });


  test("does not show Clear History button when there are no orders", () => {
    render(<OrderHistory />);

    expect(
      screen.queryByRole("button", {
        name: "Clear History",
      })
    ).not.toBeInTheDocument();
  });


  // ==================================================
  // FOOTER
  // ==================================================

  test("renders Footer", () => {
    render(<OrderHistory />);

    expect(
      screen.getByTestId("footer")
    ).toBeInTheDocument();
  });


  // ==================================================
  // START SHOPPING
  // ==================================================

  test("Start Shopping button redirects to shop", () => {
    delete window.location;

    window.location = {
      href: "",
    };

    render(<OrderHistory />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Start Shopping",
      })
    );

    expect(window.location.href).toBe("/shop");
  });


  // ==================================================
  // ORDERS
  // ==================================================

  test("renders orders from localStorage", () => {
    const orders = [
      {
        orderId: "MED12345",
        orderDate: "20 August 2026",
        status: "Delivered",
        paymentMethod: "Cash on Delivery",
        totalAmount: 599,
        items: [
          {
            name: "Digital Thermometer",
            brand: "Dr Trust",
            price: 299,
            quantity: 1,
          },
        ],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Order #MED12345")
    ).toBeInTheDocument();

    expect(
      screen.getByText("20 August 2026")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Delivered")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Digital Thermometer")
    ).toBeInTheDocument();
  });


  test("renders Clear History button when orders exist", () => {
    const orders = [
      {
        orderId: "MED12345",
        orderDate: "20 August 2026",
        status: "Delivered",
        totalAmount: 299,
        items: [
          {
            name: "Digital Thermometer",
            price: 299,
            quantity: 1,
          },
        ],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByRole("button", {
        name: "Clear History",
      })
    ).toBeInTheDocument();
  });


  // ==================================================
  // ORDER ID
  // ==================================================

  test("renders order ID correctly", () => {
    const orders = [
      {
        orderId: "MED98765",
        orderDate: "20 August 2026",
        status: "Delivered",
        items: [],
        totalAmount: 500,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Order #MED98765")
    ).toBeInTheDocument();
  });


  test("uses order id when orderId is not available", () => {
    const orders = [
      {
        id: "ORD555",
        date: "20 August 2026",
        status: "Processing",
        items: [],
        totalAmount: 300,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Order #ORD555")
    ).toBeInTheDocument();
  });


  test("generates fallback order ID when no ID exists", () => {
    const orders = [
      {
        date: "20 August 2026",
        status: "Processing",
        items: [],
        totalAmount: 300,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Order #MED10000")
    ).toBeInTheDocument();
  });


  // ==================================================
  // DATE
  // ==================================================

  test("renders already formatted order date", () => {
    const orders = [
      {
        orderId: "MED10001",
        orderDate: "20 August 2026",
        status: "Delivered",
        items: [],
        totalAmount: 400,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("20 August 2026")
    ).toBeInTheDocument();
  });


  test("renders Date not available when date is missing", () => {
    const orders = [
      {
        orderId: "MED10002",
        status: "Processing",
        items: [],
        totalAmount: 400,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Date not available")
    ).toBeInTheDocument();
  });


  // ==================================================
  // ORDER STATUS
  // ==================================================

  test("renders Delivered status", () => {
    const orders = [
      {
        orderId: "MED10003",
        orderDate: "20 August 2026",
        status: "Delivered",
        items: [],
        totalAmount: 500,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Delivered")
    ).toBeInTheDocument();
  });


  test("renders Shipped status", () => {
    const orders = [
      {
        orderId: "MED10004",
        orderDate: "21 August 2026",
        status: "Shipped",
        items: [],
        totalAmount: 500,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Shipped")
    ).toBeInTheDocument();
  });


  test("renders Out for Delivery status", () => {
    const orders = [
      {
        orderId: "MED10005",
        orderDate: "22 August 2026",
        status: "Out for Delivery",
        items: [],
        totalAmount: 500,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Out for Delivery")
    ).toBeInTheDocument();
  });


  test("renders Cancelled status", () => {
    const orders = [
      {
        orderId: "MED10006",
        orderDate: "23 August 2026",
        status: "Cancelled",
        items: [],
        totalAmount: 500,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Cancelled")
    ).toBeInTheDocument();
  });


  test("uses Processing as default status", () => {
    const orders = [
      {
        orderId: "MED10007",
        orderDate: "23 August 2026",
        items: [],
        totalAmount: 500,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Processing")
    ).toBeInTheDocument();
  });


  // ==================================================
  // PRODUCTS
  // ==================================================

  test("renders products from order.items", () => {
    const orders = [
      {
        orderId: "MED20001",
        orderDate: "20 August 2026",
        status: "Delivered",
        totalAmount: 599,
        items: [
          {
            name: "Digital Thermometer",
            brand: "Dr Trust",
            price: 299,
            quantity: 1,
          },
          {
            name: "Cotton Roll",
            brand: "Johnson's",
            price: 100,
            quantity: 3,
          },
        ],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Digital Thermometer")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Cotton Roll")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Dr Trust")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Johnson's")
    ).toBeInTheDocument();
  });


  test("renders product quantity correctly", () => {
    const orders = [
      {
        orderId: "MED20002",
        orderDate: "20 August 2026",
        status: "Delivered",
        items: [
          {
            name: "Digital Thermometer",
            price: 299,
            quantity: 2,
          },
        ],
        totalAmount: 598,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("2", {
        selector: "p",
      })
    ).toBeInTheDocument();
  });


  test("uses Product as fallback when product name is missing", () => {
    const orders = [
      {
        orderId: "MED20003",
        orderDate: "20 August 2026",
        status: "Processing",
        items: [
          {
            price: 100,
            quantity: 1,
          },
        ],
        totalAmount: 100,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Product")
    ).toBeInTheDocument();
  });


  test("renders product placeholder when image is missing", () => {
    const orders = [
      {
        orderId: "MED20004",
        orderDate: "20 August 2026",
        status: "Processing",
        items: [
          {
            name: "Test Product",
            price: 100,
            quantity: 1,
          },
        ],
        totalAmount: 100,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Test Product")
    ).toBeInTheDocument();

    const placeholders =
      document.querySelectorAll(
        ".product-placeholder"
      );

    expect(placeholders).toHaveLength(1);
  });


  test("renders product image when image exists", () => {
    const orders = [
      {
        orderId: "MED20005",
        orderDate: "20 August 2026",
        status: "Delivered",
        items: [
          {
            name: "Vitamin D3",
            brand: "Uprise",
            image: "vitamin-d3.png",
            price: 120,
            quantity: 1,
          },
        ],
        totalAmount: 120,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    const image =
      screen.getByAltText("Vitamin D3");

    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      "vitamin-d3.png"
    );
  });


  // ==================================================
  // TOTAL AMOUNT
  // ==================================================

  test("renders totalAmount when available", () => {
    const orders = [
      {
        orderId: "MED30001",
        orderDate: "20 August 2026",
        status: "Delivered",
        totalAmount: 799,
        items: [],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("₹799")
    ).toBeInTheDocument();
  });


  test("renders total when totalAmount is unavailable", () => {
    const orders = [
      {
        orderId: "MED30002",
        orderDate: "20 August 2026",
        status: "Delivered",
        total: 650,
        items: [],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("₹650")
    ).toBeInTheDocument();
  });


  test("renders totalPrice when other totals are unavailable", () => {
    const orders = [
      {
        orderId: "MED30003",
        orderDate: "20 August 2026",
        status: "Delivered",
        totalPrice: 450,
        items: [],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("₹450")
    ).toBeInTheDocument();
  });


  test("calculates total from product prices and quantities", () => {
    const orders = [
      {
        orderId: "MED30004",
        orderDate: "20 August 2026",
        status: "Delivered",
        items: [
          {
            name: "Product A",
            price: 100,
            quantity: 2,
          },
          {
            name: "Product B",
            price: 200,
            quantity: 3,
          },
        ],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    // 100 × 2 + 200 × 3 = 800
    expect(
      screen.getByText("₹800")
    ).toBeInTheDocument();
  });


  // ==================================================
  // PAYMENT METHOD
  // ==================================================

  test("renders payment method when available", () => {
    const orders = [
      {
        orderId: "MED40001",
        orderDate: "20 August 2026",
        status: "Delivered",
        paymentMethod: "Cash on Delivery",
        totalAmount: 500,
        items: [],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Cash on Delivery")
    ).toBeInTheDocument();
  });


  test("does not render payment section when payment method is missing", () => {
    const orders = [
      {
        orderId: "MED40002",
        orderDate: "20 August 2026",
        status: "Delivered",
        totalAmount: 500,
        items: [],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.queryByText("Payment")
    ).not.toBeInTheDocument();
  });


  // ==================================================
  // PRODUCTS ARRAY FALLBACK
  // ==================================================

  test("uses products array when items array is unavailable", () => {
    const orders = [
      {
        orderId: "MED50001",
        orderDate: "20 August 2026",
        status: "Shipped",
        products: [
          {
            name: "Face Wash",
            brand: "Himalaya",
            price: 249,
            quantity: 1,
          },
        ],
        totalAmount: 249,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Face Wash")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Himalaya")
    ).toBeInTheDocument();
  });


  // ==================================================
  // SINGLE PRODUCT FALLBACK
  // ==================================================

  test("uses single product information when items and products are unavailable", () => {
    const orders = [
      {
        orderId: "MED60001",
        orderDate: "20 August 2026",
        status: "Delivered",
        productName: "Paracetamol",
        brand: "Crocin",
        price: 99,
        quantity: 2,
        totalAmount: 198,
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    render(<OrderHistory />);

    expect(
      screen.getByText("Paracetamol")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Crocin")
    ).toBeInTheDocument();

    expect(
      screen.getByText("₹99")
    ).toBeInTheDocument();
  });


  // ==================================================
  // CLEAR HISTORY
  // ==================================================

  test("does not clear history when user cancels confirmation", () => {
    const orders = [
      {
        orderId: "MED70001",
        orderDate: "20 August 2026",
        status: "Delivered",
        totalAmount: 299,
        items: [
          {
            name: "Digital Thermometer",
            price: 299,
            quantity: 1,
          },
        ],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    jest
      .spyOn(window, "confirm")
      .mockReturnValue(false);

    render(<OrderHistory />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Clear History",
      })
    );

    expect(
      localStorage.getItem("orders")
    ).not.toBeNull();

    expect(
      screen.getByText("Digital Thermometer")
    ).toBeInTheDocument();

    window.confirm.mockRestore();
  });


  test("clears order history when user confirms", () => {
    const orders = [
      {
        orderId: "MED70002",
        orderDate: "20 August 2026",
        status: "Delivered",
        totalAmount: 299,
        items: [
          {
            name: "Digital Thermometer",
            price: 299,
            quantity: 1,
          },
        ],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    jest
      .spyOn(window, "confirm")
      .mockReturnValue(true);

    render(<OrderHistory />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Clear History",
      })
    );

    expect(
      localStorage.getItem("orders")
    ).toBeNull();

    expect(
      screen.getByRole("heading", {
        name: "No Orders Yet",
      })
    ).toBeInTheDocument();

    window.confirm.mockRestore();
  });


  // ==================================================
  // ORDERS UPDATED EVENT
  // ==================================================

  test("reloads orders when ordersUpdated event is dispatched", () => {
    render(<OrderHistory />);

    expect(
      screen.getByRole("heading", {
        name: "No Orders Yet",
      })
    ).toBeInTheDocument();

    const orders = [
      {
        orderId: "MED80001",
        orderDate: "20 August 2026",
        status: "Delivered",
        totalAmount: 399,
        items: [
          {
            name: "Vitamin D3",
            price: 399,
            quantity: 1,
          },
        ],
      },
    ];

    localStorage.setItem(
      "orders",
      JSON.stringify(orders)
    );

    act(() => {
      window.dispatchEvent(
        new Event("ordersUpdated")
      );
    });

    expect(
      screen.getByText("Order #MED80001")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Vitamin D3")
    ).toBeInTheDocument();
  });


  // ==================================================
  // INVALID LOCAL STORAGE
  // ==================================================

  test("handles invalid orders data in localStorage", () => {
    localStorage.setItem(
      "orders",
      "invalid-json"
    );

    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => { });

    render(<OrderHistory />);

    expect(
      screen.getByRole("heading", {
        name: "No Orders Yet",
      })
    ).toBeInTheDocument();

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });


  // ==================================================
  // INVALID ORDERS TYPE
  // ==================================================

  test("handles non-array orders data", () => {
    localStorage.setItem(
      "orders",
      JSON.stringify({
        orderId: "MED999",
      })
    );

    render(<OrderHistory />);

    expect(
      screen.getByRole("heading", {
        name: "No Orders Yet",
      })
    ).toBeInTheDocument();
  });


  // ==================================================
  // CLEANUP EVENT LISTENER
  // ==================================================

  test("removes ordersUpdated event listener on unmount", () => {
    const removeEventListenerSpy =
      jest.spyOn(
        window,
        "removeEventListener"
      );

    const { unmount } = render(
      <OrderHistory />
    );

    unmount();

    expect(
      removeEventListenerSpy
    ).toHaveBeenCalledWith(
      "ordersUpdated",
      expect.any(Function)
    );

    removeEventListenerSpy.mockRestore();
  });
});
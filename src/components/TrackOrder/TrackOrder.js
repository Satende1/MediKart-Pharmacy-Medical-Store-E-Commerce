import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaBoxOpen, FaTruck, FaShippingFast, FaHome, FaMapMarkerAlt, FaArrowLeft, FaPhoneAlt, FaCopy, } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./TrackOrder.css";

const TrackOrder = () => {
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  // ==============================
  // GET ORDER FROM LOCAL STORAGE
  // ==============================

  useEffect(() => {
    const savedOrder = localStorage.getItem("latestOrder");

    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        setOrder(parsedOrder);
      } catch (error) {
        console.error("Invalid order data:", error);
        setOrder(null);
      }
    }
  }, []);

  // ==============================
  // TRACKING STEPS
  // ==============================

  const trackingSteps = [
    {
      id: 1,
      title: "Order Placed",
      icon: <FaCheckCircle />,
    },
    {
      id: 2,
      title: "Packed",
      icon: <FaBoxOpen />,
    },
    {
      id: 3,
      title: "Shipped",
      icon: <FaShippingFast />,
    },
    {
      id: 4,
      title: "Out for Delivery",
      icon: <FaTruck />,
    },
    {
      id: 5,
      title: "Delivered",
      icon: <FaHome />,
    },
  ];

  // ==============================
  // GET CURRENT STEP
  // ==============================

  const getCurrentStep = (status) => {
    switch (status?.toLowerCase()) {
      case "ordered":
      case "order placed":
        return 1;

      case "packed":
        return 2;

      case "shipped":
        return 3;

      case "out for delivery":
        return 4;

      case "delivered":
        return 5;

      default:
        return 1;
    }
  };

  // ==============================
  // COPY ORDER ID
  // ==============================

  const copyOrderId = () => {
    if (order?.orderId) {
      navigator.clipboard.writeText(order.orderId);

      toast.success("Order ID copied!", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  // ==============================
  // COPY TRACKING ID
  // ==============================

  const copyTrackingId = () => {
    if (order?.courier?.trackingId) {
      navigator.clipboard.writeText(order.courier.trackingId);

      toast.success("Tracking ID copied!", {
        position: "top-right",
        autoClose: 1500,
      });
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (order === null) {
    return (
      <div className="track-empty">
        <div className="empty-icon">
          <FaBoxOpen />
        </div>

        <h2>No Order Found</h2>

        <p>
          We couldn't find an order to track.
        </p>

        <button
          onClick={() => navigate("/shop")}
          className="shop-now-btn"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const currentStep = getCurrentStep(order.status);

  // ==============================
  // PRODUCTS
  // ==============================

  const products =
    order.items && order.items.length > 0
      ? order.items
      : order.product
        ? [order.product]
        : [];

  // ==============================
  // TOTAL
  // ==============================

  const calculatedTotal = products.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
      Number(item.quantity || 1),
    0
  );

  const totalAmount =
    order.totalAmount !== undefined
      ? order.totalAmount
      : calculatedTotal;

  return (
    <>
      <div className="track-page">

        {/* =================================
            BACK BUTTON
        ================================= */}

        <div className="track-top">
          <button
            className="track-back-btn"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            Back
          </button>
        </div>

        {/* =================================
            HEADER
        ================================= */}

        <div className="track-header">

          <div>
            <h1>Track Order</h1>

            <div className="order-id-row">
              <span>Order ID:</span>

              <strong>
                {order.orderId || "N/A"}
              </strong>

              {order.orderId && (
                <button
                  className="copy-btn"
                  onClick={copyOrderId}
                  title="Copy Order ID"
                >
                  <FaCopy />
                </button>
              )}
            </div>
          </div>

          <button
            className="continue-shopping"
            onClick={() => navigate("/shop")}
          >
            Continue Shopping
          </button>

        </div>

        <div className="track-container">

          {/* =================================
              DELIVERY SUMMARY
          ================================= */}

          <div className="delivery-summary">

            <div className="delivery-summary-left">

              <div className="delivery-truck">
                <FaTruck />
              </div>

              <div>
                <p className="small-title">
                  {order.status === "Delivered"
                    ? "Delivered"
                    : "Expected Delivery"}
                </p>

                <h2>
                  {order.status === "Delivered"
                    ? "Order Delivered"
                    : order.estimatedDelivery ||
                    "14 Aug"}
                </h2>

                <span>
                  {order.status === "Delivered"
                    ? "Your order has been delivered successfully"
                    : "Your order is on the way"}
                </span>
              </div>

            </div>

            <div className="delivery-status">

              <span>Current Status</span>

              <strong>
                {order.status || "Order Placed"}
              </strong>

            </div>

          </div>

          {/* =================================
              TRACKING CARD
          ================================= */}

          <div className="track-card">

            <div className="track-card-header">

              <div>
                <h2>Delivery Status</h2>

                <p>
                  Follow your order from placement
                  to delivery
                </p>
              </div>

              <span className="status-badge">
                {order.status || "Order Placed"}
              </span>

            </div>

            <div className="tracking-wrapper">

              {trackingSteps.map(
                (step, index) => {

                  const completed =
                    currentStep >= step.id;

                  const active =
                    currentStep === step.id;

                  return (
                    <React.Fragment
                      key={step.id}
                    >

                      <div
                        className={`tracking-step ${completed
                          ? "completed"
                          : ""
                          } ${active
                            ? "active"
                            : ""
                          }`}
                      >

                        <div className="tracking-icon">
                          {step.icon}
                        </div>

                        <div className="tracking-info">

                          <strong>
                            {step.title}
                          </strong>

                          {completed && (
                            <span>
                              Completed
                            </span>
                          )}

                        </div>

                      </div>

                      {index <
                        trackingSteps.length - 1 && (
                          <div
                            className={`tracking-connector ${currentStep >
                              step.id
                              ? "completed"
                              : ""
                              }`}
                          />
                        )}

                    </React.Fragment>
                  );
                }
              )}

            </div>

          </div>

          {/* =================================
              ORDER ITEMS
          ================================= */}

          <div className="track-card">

            <div className="track-card-header">

              <div>
                <h2>Order Items</h2>

                <p>
                  {products.length}{" "}
                  {products.length === 1
                    ? "Item"
                    : "Items"}
                </p>
              </div>

            </div>

            <div className="products-list">

              {products.map(
                (product, index) => (

                  <div
                    className="track-product"
                    key={
                      product.id || index
                    }
                  >

                    <div className="track-product-image">

                      <img
                        src={product.image}
                        alt={
                          product.name ||
                          "Product"
                        }
                      />

                    </div>

                    <div className="track-product-info">

                      <h3>
                        {product.name}
                      </h3>

                      {product.brand && (
                        <p>
                          Brand:{" "}
                          {product.brand}
                        </p>
                      )}

                      <span>
                        Quantity:{" "}
                        {product.quantity ||
                          1}
                      </span>

                    </div>

                    <div className="track-product-price">

                      ₹
                      {Number(
                        product.price || 0
                      ) *
                        Number(
                          product.quantity ||
                          1
                        )}

                    </div>

                  </div>

                )
              )}

            </div>

            <div className="track-total">

              <span>Total Amount</span>

              <strong>
                ₹{totalAmount}
              </strong>

            </div>

          </div>

          {/* =================================
              DELIVERY ADDRESS
          ================================= */}

          <div className="track-card">

            <div className="track-card-header">

              <h2>Delivery Address</h2>

            </div>

            <div className="address-box">

              <div className="address-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="address-content">

                <h3>
                  {order.customer?.name ||
                    order.name ||
                    "Customer"}
                </h3>

                <p>
                  {order.customer?.address ||
                    order.address ||
                    "Delivery address not available"}
                </p>

                {(order.customer?.phone ||
                  order.phone) && (
                    <p className="mobile-number">
                      <FaPhoneAlt />

                      Mobile:{" "}
                      {order.customer?.phone ||
                        order.phone}
                    </p>
                  )}

              </div>

            </div>

          </div>

          {/* =================================
              DELIVERY PARTNER
          ================================= */}

          <div className="track-card">

            <div className="track-card-header">

              <h2>Delivery Partner</h2>

            </div>

            <div className="courier-box">

              <div className="courier-icon">
                <FaTruck />
              </div>

              <div className="courier-info">

                <h3>
                  {order.courier?.name ||
                    "MEDIKART Delivery"}
                </h3>

                <p>
                  Tracking ID:
                  <strong>
                    {" "}
                    {order.courier
                      ?.trackingId ||
                      "Not available"}
                  </strong>

                  {order.courier
                    ?.trackingId && (
                      <button
                        className="copy-tracking"
                        onClick={
                          copyTrackingId
                        }
                      >
                        <FaCopy />
                      </button>
                    )}
                </p>

              </div>

            </div>

          </div>

          {/* =================================
              HELP SECTION
          ================================= */}

          <div className="track-help">

            <div>

              <h3>
                Need help with your order?
              </h3>

              <p>
                Contact MEDIKART support for
                assistance with your delivery.
              </p>

            </div>

            <button
              onClick={() =>
                navigate("/contact")
              }
            >
              Contact Us
            </button>

          </div>

        </div>

      </div>

      <ToastContainer />

    </>
  );
};

export default TrackOrder;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaCheckCircle,
    FaBox,
    FaTruck,
    FaHome,
    FaMapMarkerAlt,
    FaCreditCard,
    FaArrowLeft,
    FaShoppingBag,
    FaStar,
    FaTimesCircle,
    FaEye,
} from "react-icons/fa";

import FeedbackPopup from "../../components/Feedback/Feedback.js";

import "./Orders.css";

const Order = () => {
    const navigate = useNavigate();

    // =====================================================
    // STATES
    // =====================================================

    const [showFeedback, setShowFeedback] = useState(false);

    const [cancelled, setCancelled] = useState(false);

    const [showCancelConfirm, setShowCancelConfirm] =
        useState(false);

    const [order, setOrder] = useState(null);

    // =====================================================
    // LOAD ORDER
    // =====================================================

    useEffect(() => {
        let savedOrder = null;

        try {
            savedOrder = JSON.parse(
                localStorage.getItem("latestOrder")
            );
        } catch (error) {
            console.error(
                "Error loading latest order:",
                error
            );
        }

        // =================================================
        // DEMO ORDER
        // =================================================

        const demoOrder = {
            orderId: "MED20260818001",

            orderDate: "18 Aug 2026",

            paymentMethod: "Cash on Delivery",

            status: "Out for Delivery",

            customer: {
                name: "Satender Kashyap",
                phone: "9876543210",
                address: "New Delhi, Delhi, India",
                pincode: "110001",
            },

            items: [
                {
                    id: 300,

                    name: "Dolo 650 Tablet",

                    brand: "Micro Labs",

                    image: "/images/dolo650.png",

                    price: 35,

                    originalPrice: 45,

                    quantity: 2,
                },
            ],

            priceDetails: {
                deliveryCharge: 0,
            },
        };

        const finalOrder =
            savedOrder || demoOrder;

        setOrder(finalOrder);

        // =================================================
        // CHECK CANCELLED ORDER
        // =================================================

        const cancelledOrder =
            localStorage.getItem(
                `cancelled_${finalOrder.orderId}`
            );

        if (cancelledOrder === "true") {
            setCancelled(true);
        }
    }, []);

    // =====================================================
    // LOADING
    // =====================================================

    if (!order) {
        return (
            <div className="order-loading">
                <div className="order-loader"></div>

                <h2>
                    Loading Order...
                </h2>
            </div>
        );
    }

    // =====================================================
    // PRICE CALCULATION
    // =====================================================

    /*
        originalPrice = MRP
        price         = Selling Price

        Example:

        MRP = ₹45
        Selling Price = ₹35
        Quantity = 2

        Item Total:
        ₹45 × 2 = ₹90

        Discount:
        (₹45 - ₹35) × 2 = ₹20

        Final Amount:
        ₹90 - ₹20 = ₹70
    */

    // =====================================================
    // ITEM TOTAL / MRP TOTAL
    // =====================================================

    const itemTotal = (
        order.items || []
    ).reduce(
        (total, item) => {
            const mrp =
                Number(
                    item.originalPrice ??
                    item.price
                ) || 0;

            const quantity =
                Number(item.quantity) || 1;

            return (
                total +
                mrp * quantity
            );
        },
        0
    );

    // =====================================================
    // TOTAL DISCOUNT
    // =====================================================

    const discount = (
        order.items || []
    ).reduce(
        (total, item) => {
            const mrp =
                Number(
                    item.originalPrice ??
                    item.price
                ) || 0;

            const sellingPrice =
                Number(item.price) || 0;

            const quantity =
                Number(item.quantity) || 1;

            const itemDiscount =
                Math.max(
                    mrp - sellingPrice,
                    0
                ) * quantity;

            return (
                total +
                itemDiscount
            );
        },
        0
    );

    // =====================================================
    // DELIVERY CHARGE
    // =====================================================

    const deliveryCharge =
        Number(
            order.priceDetails
                ?.deliveryCharge
        ) || 0;

    // =====================================================
    // FINAL PAYABLE AMOUNT
    // =====================================================

    const totalAmount =
        itemTotal -
        discount +
        deliveryCharge;

    // =====================================================
    // FEEDBACK STATUS
    // =====================================================

    const feedbackSubmitted =
        localStorage.getItem(
            `feedbackSubmitted_${order.orderId}`
        ) === "true";

    // =====================================================
    // CANCEL ORDER
    // =====================================================

    const handleCancelOrder = () => {
        const updatedOrder = {
            ...order,
            status: "Cancelled",
        };

        setCancelled(true);

        setOrder(updatedOrder);

        setShowCancelConfirm(false);

        localStorage.setItem(
            `cancelled_${order.orderId}`,
            "true"
        );

        localStorage.setItem(
            "latestOrder",
            JSON.stringify(updatedOrder)
        );
    };

    // =====================================================
    // TRACK ORDER
    // =====================================================

    const handleTrackOrder = () => {
        navigate(
            `/track-order/${order.orderId}`
        );
    };

    // =====================================================
    // VIEW PRODUCT
    // =====================================================

    const handleViewProduct = (item) => {
        navigate(
            `/product/${item.id}`
        );
    };

    // =====================================================
    // STATUS STEPS
    // =====================================================

    const statusSteps = [
        {
            title: "Order Placed",

            description:
                "Your order has been placed successfully",

            icon: <FaCheckCircle />,

            completed:
                !cancelled,
        },

        {
            title: "Packed",

            description:
                "Your item has been packed",

            icon: <FaBox />,

            completed:
                !cancelled &&
                [
                    "Packed",
                    "Shipped",
                    "Out for Delivery",
                    "Delivered",
                ].includes(
                    order.status
                ),
        },

        {
            title: "Shipped",

            description:
                "Your order is on the way",

            icon: <FaTruck />,

            completed:
                !cancelled &&
                [
                    "Shipped",
                    "Out for Delivery",
                    "Delivered",
                ].includes(
                    order.status
                ),
        },

        {
            title: "Out for Delivery",

            description:
                "Your order is out for delivery",

            icon: <FaHome />,

            completed:
                !cancelled &&
                [
                    "Out for Delivery",
                    "Delivered",
                ].includes(
                    order.status
                ),
        },

        {
            title: "Delivered",

            description:
                "Your order has been delivered",

            icon: <FaCheckCircle />,

            completed:
                !cancelled &&
                order.status ===
                "Delivered",
        },
    ];

    // =====================================================
    // RETURN
    // =====================================================

    return (
        <div className="order-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="order-header">

                <button
                    className="back-button"
                    onClick={() =>
                        navigate(-1)
                    }
                >
                    <FaArrowLeft />

                    Back
                </button>

                <div>
                    <h1>
                        My Order
                    </h1>

                    <p>
                        MEDIKART Order Details
                    </p>
                </div>

            </div>

            <div className="order-container">

                {/* =================================================
                    ORDER TOP
                ================================================= */}

                <div className="order-top-card">

                    <div>

                        <h2>
                            Order #
                            {order.orderId}
                        </h2>

                        <p>
                            Ordered on{" "}
                            {order.orderDate}
                        </p>

                    </div>

                    <div className="order-status">

                        <span>
                            Current Status
                        </span>

                        <strong
                            className={
                                cancelled
                                    ? "cancelled-status"
                                    : ""
                            }
                        >
                            {cancelled
                                ? "Cancelled"
                                : order.status}
                        </strong>

                    </div>

                </div>

                {/* =================================================
                    CANCELLED MESSAGE
                ================================================= */}

                {cancelled && (
                    <div className="cancelled-box">

                        <FaTimesCircle />

                        <div>

                            <h3>
                                Order Cancelled
                            </h3>

                            <p>
                                This order has been
                                cancelled successfully.
                            </p>

                        </div>

                    </div>
                )}

                {/* =================================================
                    ORDER ITEMS
                ================================================= */}

                <div className="order-card">

                    <div className="section-title">

                        <FaShoppingBag />

                        <h2>
                            Order Items
                        </h2>

                    </div>

                    {order.items?.map(
                        (item, index) => (

                            <div
                                className="order-item"
                                key={
                                    item.id ||
                                    index
                                }
                            >

                                {/* PRODUCT IMAGE */}

                                <div className="product-image-box">

                                    <img
                                        src={
                                            item.image
                                        }
                                        alt={
                                            item.name
                                        }
                                        onError={(
                                            e
                                        ) => {
                                            e.currentTarget.src =
                                                "/images/medicine-placeholder.png";
                                        }}
                                    />

                                </div>

                                {/* PRODUCT INFO */}

                                <div className="product-info">

                                    <h3>
                                        {item.name}
                                    </h3>

                                    {item.brand && (
                                        <p className="brand">
                                            Brand:{" "}
                                            <strong>
                                                {
                                                    item.brand
                                                }
                                            </strong>
                                        </p>
                                    )}

                                    <p className="quantity">
                                        Quantity:{" "}
                                        <strong>
                                            {
                                                item.quantity
                                            }
                                        </strong>
                                    </p>

                                    <div className="product-price">

                                        <strong>
                                            ₹
                                            {
                                                item.price
                                            }
                                        </strong>

                                        {item.originalPrice &&
                                            Number(
                                                item.originalPrice
                                            ) >
                                            Number(
                                                item.price
                                            ) && (
                                                <span>
                                                    ₹
                                                    {
                                                        item.originalPrice
                                                    }
                                                </span>
                                            )}

                                    </div>

                                </div>

                                {/* VIEW PRODUCT */}

                                <button
                                    className="view-product-btn"
                                    onClick={() =>
                                        handleViewProduct(
                                            item
                                        )
                                    }
                                >
                                    <FaEye />

                                    View Product
                                </button>

                            </div>
                        )
                    )}

                </div>

                {/* =================================================
                    TRACK ORDER
                ================================================= */}

                <div className="order-card">

                    <div className="section-title">

                        <FaTruck />

                        <h2>
                            Track Your Order
                        </h2>

                    </div>

                    {cancelled ? (

                        <div className="cancelled-tracking">

                            <FaTimesCircle />

                            <h3>
                                Order Cancelled
                            </h3>

                            <p>
                                Tracking is unavailable
                                for cancelled orders.
                            </p>

                        </div>

                    ) : (

                        <div className="tracking">

                            {statusSteps.map(
                                (
                                    step,
                                    index
                                ) => (

                                    <div
                                        className={`tracking-step ${step.completed
                                            ? "completed"
                                            : ""
                                            }`}
                                        key={
                                            index
                                        }
                                    >

                                        <div className="tracking-icon">
                                            {
                                                step.icon
                                            }
                                        </div>

                                        <div className="tracking-content">

                                            <h3>
                                                {
                                                    step.title
                                                }
                                            </h3>

                                            <p>
                                                {
                                                    step.description
                                                }
                                            </p>

                                        </div>

                                        {index <
                                            statusSteps.length -
                                            1 && (
                                                <div
                                                    className={`tracking-line ${step.completed
                                                        ? "active"
                                                        : ""
                                                        }`}
                                                />
                                            )}

                                    </div>

                                )
                            )}

                        </div>

                    )}

                    {!cancelled && (
                        <button
                            className="track-order-btn"
                            onClick={
                                handleTrackOrder
                            }
                        >
                            <FaTruck />

                            Track Order
                        </button>
                    )}

                </div>

                {/* =================================================
                    ADDRESS + PAYMENT
                ================================================= */}

                <div className="two-column">

                    {/* ADDRESS */}

                    <div className="order-card">

                        <div className="section-title">

                            <FaMapMarkerAlt />

                            <h2>
                                Delivery Address
                            </h2>

                        </div>

                        <div className="address-box">

                            <h3>
                                {
                                    order.customer
                                        ?.name
                                }
                            </h3>

                            <p>
                                {
                                    order.customer
                                        ?.address
                                }
                            </p>

                            <p>
                                <strong>
                                    Pincode:
                                </strong>{" "}
                                {
                                    order.customer
                                        ?.pincode
                                }
                            </p>

                            <p>
                                <strong>
                                    Phone:
                                </strong>{" "}
                                {
                                    order.customer
                                        ?.phone
                                }
                            </p>

                        </div>

                        <button
                            className="map-button"
                            onClick={() =>
                                window.open(
                                    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                        order.customer
                                            ?.address ||
                                        ""
                                    )}`,
                                    "_blank"
                                )
                            }
                        >
                            <FaMapMarkerAlt />

                            Show on Map
                        </button>

                    </div>

                    {/* PAYMENT */}

                    <div className="order-card">

                        <div className="section-title">

                            <FaCreditCard />

                            <h2>
                                Payment Information
                            </h2>

                        </div>

                        <div className="payment-box">

                            <p>
                                <strong>
                                    Payment Method
                                </strong>
                            </p>

                            <p>
                                {
                                    order.paymentMethod
                                }
                            </p>

                            <div className="payment-status">

                                {order.paymentMethod ===
                                    "Cash on Delivery"
                                    ? "Payment will be collected on delivery"
                                    : "Payment Successful"}

                            </div>

                        </div>

                    </div>

                </div>

                {/* =================================================
                    PRICE DETAILS
                ================================================= */}

                <div className="order-card">

                    <div className="section-title">

                        <FaCreditCard />

                        <h2>
                            Price Details
                        </h2>

                    </div>

                    <div className="price-details">

                        {/* ITEM TOTAL */}

                        <div>

                            <span>
                                Item Total
                            </span>

                            <span>
                                ₹
                                {itemTotal.toFixed(
                                    2
                                )}
                            </span>

                        </div>

                        {/* DISCOUNT */}

                        <div className="discount-row">

                            <span>
                                Discount
                            </span>

                            <span>
                                - ₹
                                {discount.toFixed(
                                    2
                                )}
                            </span>

                        </div>

                        {/* DELIVERY */}

                        <div>

                            <span>
                                Delivery Charges
                            </span>

                            <span>

                                {deliveryCharge ===
                                    0
                                    ? "FREE"
                                    : `₹${deliveryCharge.toFixed(
                                        2
                                    )}`}

                            </span>

                        </div>

                        <hr />

                        {/* TOTAL */}

                        <div className="total-row">

                            <strong>
                                Total Amount
                            </strong>

                            <strong>
                                ₹
                                {totalAmount.toFixed(
                                    2
                                )}
                            </strong>

                        </div>

                    </div>

                </div>

                {/* =================================================
                    ACTION BUTTONS
                ================================================= */}

                <div className="order-actions">

                    {/* CANCEL */}

                    {!cancelled && (
                        <button
                            className="cancel-order-btn"
                            onClick={() =>
                                setShowCancelConfirm(
                                    true
                                )
                            }
                        >
                            <FaTimesCircle />

                            Cancel Order
                        </button>
                    )}

                    {/* FEEDBACK */}

                    {!feedbackSubmitted &&
                        !cancelled && (
                            <button
                                className="feedback-btn"
                                onClick={() =>
                                    setShowFeedback(
                                        true
                                    )
                                }
                            >
                                <FaStar />

                                Give Feedback
                            </button>
                        )}

                    {/* CONTINUE SHOPPING */}

                    <button
                        className="continue-button"
                        onClick={() =>
                            navigate("/shop")
                        }
                    >
                        Continue Shopping
                    </button>

                    {/* HOME */}

                    <button
                        className="home-button"
                        onClick={() =>
                            navigate("/")
                        }
                    >
                        Go to Home
                    </button>

                </div>

            </div>

            {/* =================================================
                CANCEL CONFIRMATION POPUP
            ================================================= */}

            {showCancelConfirm && (

                <div className="cancel-overlay">

                    <div className="cancel-popup">

                        <div className="cancel-icon">
                            <FaTimesCircle />
                        </div>

                        <h2>
                            Cancel Order?
                        </h2>

                        <p>
                            Are you sure you want
                            to cancel this order?
                        </p>

                        <div className="cancel-actions">

                            <button
                                className="keep-order-btn"
                                onClick={() =>
                                    setShowCancelConfirm(
                                        false
                                    )
                                }
                            >
                                No, Keep Order
                            </button>

                            <button
                                className="confirm-cancel-btn"
                                onClick={
                                    handleCancelOrder
                                }
                            >
                                Yes, Cancel Order
                            </button>

                        </div>

                    </div>

                </div>
            )}

            {/* =================================================
                FEEDBACK POPUP
            ================================================= */}

            {showFeedback && (

                <FeedbackPopup
                    order={order}
                    onClose={() =>
                        setShowFeedback(
                            false
                        )
                    }
                />

            )}

        </div>
    );
};

export default Order;
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaBoxOpen,
    FaTruck,
    FaCheckCircle,
    FaTimesCircle,
    FaEye,
    FaShoppingBag,
    FaArrowLeft,
    FaTrash,
} from "react-icons/fa";

import "./OrderHistory.css";

const OrderHistory = () => {
    const navigate = useNavigate();

    const [orders, setOrders] = useState([]);

    // =====================================================
    // LOAD ALL ORDERS
    // =====================================================

    useEffect(() => {
        loadOrders();

        window.addEventListener(
            "ordersUpdated",
            loadOrders
        );

        return () => {
            window.removeEventListener(
                "ordersUpdated",
                loadOrders
            );
        };
    }, []);

    const loadOrders = () => {
        try {
            const savedOrders =
                JSON.parse(
                    localStorage.getItem("orders")
                ) || [];

            setOrders(savedOrders);
        } catch (error) {
            console.error(
                "Error loading order history:",
                error
            );

            setOrders([]);
        }
    };

    // =====================================================
    // VIEW ORDER
    // =====================================================

    const handleViewOrder = (order) => {
        // Save selected order
        localStorage.setItem(
            "latestOrder",
            JSON.stringify(order)
        );

        navigate("/orders");
    };

    // =====================================================
    // VIEW PRODUCT
    // =====================================================

    const handleViewProduct = (item) => {
        navigate(`/product/${item.id}`);
    };

    // =====================================================
    // DELETE ORDER
    // =====================================================

    const handleDeleteOrder = (orderId) => {
        const confirmDelete =
            window.confirm(
                "Are you sure you want to remove this order from your order history?"
            );

        if (!confirmDelete) {
            return;
        }

        const updatedOrders =
            orders.filter(
                (order) =>
                    order.orderId !== orderId
            );

        setOrders(updatedOrders);

        localStorage.setItem(
            "orders",
            JSON.stringify(updatedOrders)
        );

        // If latest order is deleted
        const latestOrder =
            JSON.parse(
                localStorage.getItem(
                    "latestOrder"
                )
            );

        if (
            latestOrder?.orderId ===
            orderId
        ) {
            localStorage.removeItem(
                "latestOrder"
            );
        }
    };

    // =====================================================
    // CLEAR ALL ORDERS
    // =====================================================

    const handleClearHistory = () => {
        const confirmClear =
            window.confirm(
                "Are you sure you want to clear your complete order history?"
            );

        if (!confirmClear) {
            return;
        }

        localStorage.removeItem(
            "orders"
        );

        setOrders([]);
    };

    // =====================================================
    // ORDER STATUS
    // =====================================================

    const getStatusClass = (status) => {
        if (
            status === "Delivered"
        ) {
            return "status-delivered";
        }

        if (
            status === "Cancelled"
        ) {
            return "status-cancelled";
        }

        if (
            status === "Out for Delivery"
        ) {
            return "status-out";
        }

        if (
            status === "Shipped"
        ) {
            return "status-shipped";
        }

        if (
            status === "Packed"
        ) {
            return "status-packed";
        }

        return "status-placed";
    };

    // =====================================================
    // STATUS ICON
    // =====================================================

    const getStatusIcon = (status) => {
        if (
            status === "Delivered"
        ) {
            return <FaCheckCircle />;
        }

        if (
            status === "Cancelled"
        ) {
            return <FaTimesCircle />;
        }

        return <FaTruck />;
    };

    // =====================================================
    // EMPTY ORDER HISTORY
    // =====================================================

    if (orders.length === 0) {
        return (
            <div className="order-history-page">

                <div className="order-history-header">

                    <button
                        className="history-back-btn"
                        onClick={() =>
                            navigate(-1)
                        }
                    >
                        <FaArrowLeft />
                        Back
                    </button>

                    <div>
                        <h1>
                            My Orders
                        </h1>

                        <p>
                            Your MEDIKART Order History
                        </p>
                    </div>

                </div>

                <div className="empty-orders">

                    <FaBoxOpen />

                    <h2>
                        No Orders Yet
                    </h2>

                    <p>
                        You haven't placed any
                        orders yet.
                    </p>

                    <button
                        onClick={() =>
                            navigate("/shop")
                        }
                    >
                        <FaShoppingBag />
                        Start Shopping
                    </button>

                </div>

            </div>
        );
    }

    // =====================================================
    // MAIN UI
    // =====================================================

    return (
        <div className="order-history-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="order-history-header">

                <button
                    className="history-back-btn"
                    onClick={() =>
                        navigate(-1)
                    }
                >
                    <FaArrowLeft />
                    Back
                </button>

                <div>
                    <h1>
                        My Orders
                    </h1>

                    <p>
                        Your MEDIKART Order History
                    </p>
                </div>

                <button
                    className="clear-history-btn"
                    onClick={
                        handleClearHistory
                    }
                >
                    <FaTrash />
                    Clear History
                </button>

            </div>

            {/* =================================================
                ORDER COUNT
            ================================================= */}

            <div className="order-history-container">

                <div className="history-summary">

                    <div>
                        <FaBoxOpen />

                        <div>
                            <strong>
                                {orders.length}
                            </strong>

                            <span>
                                Total Orders
                            </span>
                        </div>

                    </div>

                    <button
                        className="shop-more-btn"
                        onClick={() =>
                            navigate("/shop")
                        }
                    >
                        <FaShoppingBag />
                        Continue Shopping
                    </button>

                </div>

                {/* =================================================
                    ORDERS
                ================================================= */}

                <div className="orders-list">

                    {orders.map(
                        (order, index) => {

                            const totalAmount =
                                Number(
                                    order
                                        .priceDetails
                                        ?.totalAmount
                                ) || 0;

                            const items =
                                order.items || [];

                            return (
                                <div
                                    className="history-order-card"
                                    key={
                                        order.orderId ||
                                        index
                                    }
                                >

                                    {/* =================================
                                        ORDER HEADER
                                    ================================= */}

                                    <div className="history-card-header">

                                        <div>

                                            <h2>
                                                Order #
                                                {
                                                    order.orderId
                                                }
                                            </h2>

                                            <p>
                                                Ordered on{" "}
                                                {
                                                    order.orderDate
                                                }
                                            </p>

                                        </div>

                                        <div
                                            className={`history-status ${getStatusClass(
                                                order.status
                                            )}`}
                                        >
                                            {
                                                getStatusIcon(
                                                    order.status
                                                )
                                            }

                                            <span>
                                                {
                                                    order.status
                                                }
                                            </span>

                                        </div>

                                    </div>

                                    {/* =================================
                                        ORDER ITEMS
                                    ================================= */}

                                    <div className="history-items">

                                        {items.map(
                                            (
                                                item,
                                                itemIndex
                                            ) => (

                                                <div
                                                    className="history-item"
                                                    key={
                                                        item.id ||
                                                        itemIndex
                                                    }
                                                >

                                                    {/* IMAGE */}

                                                    <div className="history-image">

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

                                                    {/* DETAILS */}

                                                    <div className="history-item-info">

                                                        <h3>
                                                            {
                                                                item.name
                                                            }
                                                        </h3>

                                                        {item.brand && (
                                                            <p>
                                                                Brand:{" "}
                                                                <strong>
                                                                    {
                                                                        item.brand
                                                                    }
                                                                </strong>
                                                            </p>
                                                        )}

                                                        <p>
                                                            Quantity:{" "}
                                                            {
                                                                item.quantity
                                                            }
                                                        </p>

                                                        <strong className="history-price">
                                                            ₹
                                                            {
                                                                item.price
                                                            }
                                                        </strong>

                                                    </div>

                                                    <button
                                                        className="history-view-product"
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

                                    {/* =================================
                                        ORDER FOOTER
                                    ================================= */}

                                    <div className="history-card-footer">

                                        <div className="history-total">

                                            <span>
                                                Total Amount
                                            </span>

                                            <strong>
                                                ₹
                                                {totalAmount.toFixed(
                                                    2
                                                )}
                                            </strong>

                                        </div>

                                        <div className="history-actions">

                                            <button
                                                className="view-order-btn"
                                                onClick={() =>
                                                    handleViewOrder(
                                                        order
                                                    )
                                                }
                                            >
                                                <FaEye />
                                                View Order
                                            </button>

                                            {order.status !==
                                                "Cancelled" && (
                                                    <button
                                                        className="track-history-btn"
                                                        onClick={() =>
                                                            navigate(
                                                                `/track-order/${order.orderId}`
                                                            )
                                                        }
                                                    >
                                                        <FaTruck />
                                                        Track Order
                                                    </button>
                                                )}

                                            <button
                                                className="delete-order-btn"
                                                onClick={() =>
                                                    handleDeleteOrder(
                                                        order.orderId
                                                    )
                                                }
                                            >
                                                <FaTrash />
                                            </button>

                                        </div>

                                    </div>

                                </div>
                            );
                        }
                    )}

                </div>

            </div>

        </div>
    );
};

export default OrderHistory;
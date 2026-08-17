import React, { useEffect, useState } from "react";
import {
    FaBoxOpen,
    FaCheckCircle,
    FaTruck,
    FaClock,
} from "react-icons/fa";
import "./Orders.css";

const Orders = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const savedOrders =
            JSON.parse(localStorage.getItem("orders")) || [
                {
                    id: "MK100001",
                    product: "Dolo 650 Tablet",
                    image: "https://via.placeholder.com/100",
                    price: 120,
                    quantity: 2,
                    status: "Delivered",
                    date: "06 Aug 2026",
                },
                {
                    id: "MK100002",
                    product: "Digital Thermometer",
                    image: "https://via.placeholder.com/100",
                    price: 299,
                    quantity: 1,
                    status: "Shipped",
                    date: "05 Aug 2026",
                },
                {
                    id: "MK100003",
                    product: "Vitamin C Tablets",
                    image: "https://via.placeholder.com/100",
                    price: 399,
                    quantity: 1,
                    status: "Processing",
                    date: "04 Aug 2026",
                },
            ];

        setOrders(savedOrders);
    }, []);

    const statusIcon = (status) => {
        if (status === "Delivered")
            return <FaCheckCircle className="delivered" />;

        if (status === "Shipped")
            return <FaTruck className="shipped" />;

        return <FaClock className="processing" />;
    };

    return (
        <div className="orders-page">
            <h2>My Orders</h2>

            {orders.length === 0 ? (
                <div className="empty-orders">
                    <FaBoxOpen />
                    <h3>No Orders Found</h3>
                </div>
            ) : (
                orders.map((order) => (
                    <div className="order-card" key={order.id}>
                        <img src={order.image} alt={order.product} />

                        <div className="order-details">
                            <h3>{order.product}</h3>

                            <p>
                                <strong>Order ID:</strong> {order.id}
                            </p>

                            <p>
                                <strong>Price:</strong> ₹{order.price}
                            </p>

                            <p>
                                <strong>Quantity:</strong> {order.quantity}
                            </p>

                            <p>
                                <strong>Date:</strong> {order.date}
                            </p>

                            <div className="status">
                                {statusIcon(order.status)}
                                <span>{order.status}</span>
                            </div>
                        </div>

                        <button className="view-btn">
                            View Details
                        </button>
                    </div>
                ))
            )}
        </div>
    );
};

export default Orders;
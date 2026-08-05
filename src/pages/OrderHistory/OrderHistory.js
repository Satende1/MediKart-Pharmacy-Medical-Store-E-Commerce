import React from "react";
import "./OrderHistory.css";

const orders = [
    {
        id: "MK100245",
        date: "02 Aug 2026",
        total: 1250,
        status: "Delivered",
    },
    {
        id: "MK100246",
        date: "28 Jul 2026",
        total: 850,
        status: "Shipped",
    },
    {
        id: "MK100247",
        date: "20 Jul 2026",
        total: 2199,
        status: "Processing",
    },
    {
        id: "MK100248",
        date: "15 Jul 2026",
        total: 430,
        status: "Cancelled",
    },
    {
        id: "MK100249",
        date: "10 Jul 2026",
        total: 1675,
        status: "Delivered",
    },
];

function OrderHistory() {
    return (
        <div className="order-history">

            <div className="history-header">
                <h1>My Orders</h1>
                <p>
                    View all your MEDIKART orders in one place.
                </p>
            </div>

            <div className="table-container">

                <table>

                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Total</th>
                            <th>Status</th>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>

                        {orders.map((order) => (

                            <tr key={order.id}>

                                <td>{order.id}</td>

                                <td>{order.date}</td>

                                <td>₹{order.total}</td>

                                <td>
                                    <span
                                        className={`status ${order.status.toLowerCase()}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>

                                <td>
                                    <button>
                                        View
                                    </button>
                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default OrderHistory;
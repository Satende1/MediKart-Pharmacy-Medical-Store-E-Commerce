import React, { useState } from "react";
import "./TrackOrder.css";

function TrackOrder() {
    const [orderId, setOrderId] = useState("");
    const [showStatus, setShowStatus] = useState(false);

    const handleTrack = () => {
        if (orderId.trim() === "") {
            alert("Please enter your Order ID");
            return;
        }

        setShowStatus(true);
    };

    return (
        <div className="track-order">

            <div className="track-header">
                <h1>Track Your Order</h1>

                <p>
                    Enter your Order ID to check the current status of your order.
                </p>
            </div>

            <div className="track-box">

                <input
                    type="text"
                    placeholder="Enter Order ID (Example: MK100245)"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                />

                <button onClick={handleTrack}>
                    Track Order
                </button>

            </div>

            {showStatus && (

                <div className="status-card">

                    <h2>Order ID: {orderId}</h2>

                    <div className="timeline">

                        <div className="step active">
                            <div className="circle">✓</div>
                            <p>Order Placed</p>
                        </div>

                        <div className="line"></div>

                        <div className="step active">
                            <div className="circle">✓</div>
                            <p>Confirmed</p>
                        </div>

                        <div className="line"></div>

                        <div className="step active">
                            <div className="circle">✓</div>
                            <p>Packed</p>
                        </div>

                        <div className="line"></div>

                        <div className="step active">
                            <div className="circle">✓</div>
                            <p>Shipped</p>
                        </div>

                        <div className="line"></div>

                        <div className="step">
                            <div className="circle">5</div>
                            <p>Out for Delivery</p>
                        </div>

                        <div className="line"></div>

                        <div className="step">
                            <div className="circle">6</div>
                            <p>Delivered</p>
                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}

export default TrackOrder;
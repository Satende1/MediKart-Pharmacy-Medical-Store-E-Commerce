import React, { useState } from "react";
import {
    FaCreditCard,
    FaUniversity,
    FaWallet,
    FaMoneyBillWave,
    FaPlus,
} from "react-icons/fa";
import "./Payments.css";

const Payments = () => {
    const [payments, setPayments] = useState([
        {
            id: 1,
            type: "Credit Card",
            holder: "Satender Kashyap",
            number: "**** **** **** 4567",
            icon: <FaCreditCard />,
        },
        {
            id: 2,
            type: "UPI",
            holder: "satender@upi",
            number: "",
            icon: <FaWallet />,
        },
        {
            id: 3,
            type: "Net Banking",
            holder: "State Bank of India",
            number: "",
            icon: <FaUniversity />,
        },
    ]);

    const removePayment = (id) => {
        const updated = payments.filter((item) => item.id !== id);
        setPayments(updated);
        localStorage.setItem("payments", JSON.stringify(updated));
    };

    return (
        <div className="payments-page">

            <div className="payments-header">
                <h2>Saved Payment Methods</h2>

                <button className="add-btn">
                    <FaPlus />
                    Add Payment Method
                </button>
            </div>

            {payments.length === 0 ? (
                <div className="empty-payment">
                    <FaMoneyBillWave />
                    <h3>No Payment Methods Found</h3>
                </div>
            ) : (
                payments.map((item) => (
                    <div className="payment-card" key={item.id}>

                        <div className="payment-icon">
                            {item.icon}
                        </div>

                        <div className="payment-details">
                            <h3>{item.type}</h3>
                            <p>{item.holder}</p>

                            {item.number && (
                                <p>{item.number}</p>
                            )}
                        </div>

                        <button
                            className="remove-btn"
                            onClick={() => removePayment(item.id)}
                        >
                            Remove
                        </button>

                    </div>
                ))
            )}

        </div>
    );
};

export default Payments;
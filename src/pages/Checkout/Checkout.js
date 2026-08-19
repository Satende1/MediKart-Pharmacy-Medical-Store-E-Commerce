import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaCheck,
    FaMapMarkerAlt,
    FaCreditCard,
    FaUniversity,
    FaMoneyBillWave,
    FaTruck,
    FaBolt,
    FaClock,
    FaPlus,
    FaMinus,
} from "react-icons/fa";

import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();

    /* ============================
       STATES
    ============================ */

    const [step, setStep] = useState(1);

    const [cartItems, setCartItems] = useState([]);

    const [address, setAddress] = useState({
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const [deliveryType, setDeliveryType] =
        useState("normal");

    const [orderId, setOrderId] = useState("");

    /* ============================
       LOAD CART
    ============================ */

    useEffect(() => {
        const cart =
            JSON.parse(localStorage.getItem("cart")) || [];

        setCartItems(cart);
    }, []);

    /* ============================
       PRICE
    ============================ */

    const getPrice = (item) => {
        return Number(
            item.discountedPrice ||
            item.price ||
            item.sellingPrice ||
            0
        );
    };

    const totalItems = cartItems.reduce(
        (total, item) =>
            total + Number(item.quantity || 1),
        0
    );

    const productTotal = cartItems.reduce(
        (total, item) =>
            total +
            getPrice(item) *
            Number(item.quantity || 1),
        0
    );

    /* ============================
       DELIVERY ELIGIBILITY
    ============================ */

    const normalDeliveryCharge =
        productTotal >= 499 ? 0 : 40;

    /*
      Express is available for orders
      above ₹299.
    */

    const expressAvailable =
        productTotal >= 299;

    /*
      Today Delivery is available for
      orders above ₹999.
  
      You can change this amount later.
    */

    const todayAvailable =
        productTotal >= 999;

    /* ============================
       DELIVERY CHARGE
    ============================ */

    let deliveryCharge = 0;

    if (deliveryType === "normal") {
        deliveryCharge = normalDeliveryCharge;
    }

    if (deliveryType === "express") {
        deliveryCharge = 49;
    }

    if (deliveryType === "today") {
        deliveryCharge = 99;
    }

    const platformFee = 0;

    const totalAmount =
        productTotal +
        deliveryCharge +
        platformFee;

    /* ============================
       DELIVERY DATE
    ============================ */

    const getDeliveryDate = () => {
        const date = new Date();

        if (deliveryType === "today") {
            return "Today";
        }

        if (deliveryType === "express") {
            date.setDate(date.getDate() + 2);
        } else {
            date.setDate(date.getDate() + 5);
        }

        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    };

    /* ============================
       QUANTITY
    ============================ */

    const updateQuantity = (id, change) => {
        const updatedCart = cartItems
            .map((item) => {
                if (item.id === id) {
                    const quantity =
                        Number(item.quantity || 1) +
                        change;

                    if (quantity <= 0) {
                        return null;
                    }

                    return {
                        ...item,
                        quantity,
                    };
                }

                return item;
            })
            .filter(Boolean);

        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );
    };

    /* ============================
       ADDRESS CHANGE
    ============================ */

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setAddress((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    /* ============================
       VALIDATE ADDRESS
    ============================ */

    const validateAddress = () => {
        if (!address.name.trim()) {
            alert("Please enter your name.");
            return false;
        }

        if (!address.phone.trim()) {
            alert("Please enter your phone number.");
            return false;
        }

        if (address.phone.length !== 10) {
            alert(
                "Please enter a valid 10 digit phone number."
            );
            return false;
        }

        if (!address.address.trim()) {
            alert("Please enter your address.");
            return false;
        }

        if (!address.city.trim()) {
            alert("Please enter your city.");
            return false;
        }

        if (!address.state.trim()) {
            alert("Please enter your state.");
            return false;
        }

        if (!address.pincode.trim()) {
            alert("Please enter your pincode.");
            return false;
        }

        return true;
    };

    /* ============================
       STEP 1 → STEP 2
    ============================ */

    const continueToAddress = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        setStep(2);
    };

    /* ============================
       STEP 2 → STEP 3
    ============================ */

    const continueToPayment = () => {
        if (!validateAddress()) {
            return;
        }

        localStorage.setItem(
            "deliveryAddress",
            JSON.stringify(address)
        );

        setStep(3);
    };

    /* ============================
       STEP 3 → PLACE ORDER
    ============================ */

    const placeOrder = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        /*
          Generate MediKart Order ID
        */

        const generatedOrderId =
            "MK" +
            Date.now().toString().slice(-10);

        setOrderId(generatedOrderId);

        /* ============================
           SAVE ORDER
        ============================ */

        const newOrder = {
            orderId: generatedOrderId,

            orderDate:
                new Date().toLocaleDateString("en-IN"),

            items: cartItems,

            address,

            paymentMethod,

            deliveryType,

            deliveryCharge,

            productAmount: productTotal,

            platformFee,

            totalAmount,

            estimatedDelivery:
                getDeliveryDate(),

            status: "Order Confirmed",
        };

        const existingOrders =
            JSON.parse(
                localStorage.getItem("orders")
            ) || [];

        existingOrders.unshift(newOrder);

        localStorage.setItem(
            "orders",
            JSON.stringify(existingOrders)
        );

        /*
          Clear cart
        */

        localStorage.removeItem("cart");

        /*
          Go to successful step
        */

        setStep(5);
    };

    /* ============================
       EMPTY CART
    ============================ */

    if (cartItems.length === 0 && step !== 5) {
        return (
            <div className="checkout-empty">

                <h2>
                    Your Cart is Empty
                </h2>

                <p>
                    Add products before checkout.
                </p>

                <button
                    onClick={() => navigate("/shop")}
                >
                    Continue Shopping
                </button>

            </div>
        );
    }

    return (
        <div className="checkout-page">

            {/* ============================
          HEADER
      ============================ */}

            <div className="checkout-header">

                <h1>
                    MediKart Checkout
                </h1>

                <span>
                    🔒 100% Secure Checkout
                </span>

            </div>

            {/* ============================
          STEP INDICATOR
      ============================ */}

            <div className="checkout-steps">

                <div
                    className={`checkout-step ${step >= 1 ? "active" : ""
                        }`}
                >

                    <div className="step-circle">
                        {step > 1 ? <FaCheck /> : "1"}
                    </div>

                    <span>
                        Order
                    </span>

                </div>

                <div className="step-line"></div>

                <div
                    className={`checkout-step ${step >= 2 ? "active" : ""
                        }`}
                >

                    <div className="step-circle">
                        {step > 2 ? <FaCheck /> : "2"}
                    </div>

                    <span>
                        Address
                    </span>

                </div>

                <div className="step-line"></div>

                <div
                    className={`checkout-step ${step >= 3 ? "active" : ""
                        }`}
                >

                    <div className="step-circle">
                        {step > 3 ? <FaCheck /> : "3"}
                    </div>

                    <span>
                        Payment
                    </span>

                </div>

                <div className="step-line"></div>

                <div
                    className={`checkout-step ${step >= 4 ? "active" : ""
                        }`}
                >

                    <div className="step-circle">
                        {step > 4 ? <FaCheck /> : "4"}
                    </div>

                    <span>
                        Order ID
                    </span>

                </div>

                <div className="step-line"></div>

                <div
                    className={`checkout-step ${step >= 5 ? "active" : ""
                        }`}
                >

                    <div className="step-circle">
                        {step >= 5 ? <FaCheck /> : "5"}
                    </div>

                    <span>
                        Success
                    </span>

                </div>

            </div>

            {/* ============================
          STEP 1
          ORDER
      ============================ */}

            {step === 1 && (

                <div className="checkout-card">

                    <div className="card-heading">

                        <div className="heading-icon">
                            🛒
                        </div>

                        <div>
                            <h2>
                                Your Order
                            </h2>

                            <p>
                                Review your products before
                                continuing.
                            </p>
                        </div>

                    </div>

                    <div className="checkout-products">

                        {cartItems.map((item) => (

                            <div
                                className="checkout-product"
                                key={item.id}
                            >

                                <div className="product-image">

                                    <img
                                        src={item.image}
                                        alt={
                                            item.name ||
                                            item.title
                                        }
                                    />

                                </div>

                                <div className="product-info">

                                    <h3>
                                        {item.name ||
                                            item.title}
                                    </h3>

                                    <p>
                                        {item.category ||
                                            "Medicine"}
                                    </p>

                                    <strong>
                                        ₹{getPrice(item)}
                                    </strong>

                                </div>

                                <div className="quantity-box">

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                -1
                                            )
                                        }
                                    >
                                        <FaMinus />
                                    </button>

                                    <span>
                                        {item.quantity || 1}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.id,
                                                1
                                            )
                                        }
                                    >
                                        <FaPlus />
                                    </button>

                                </div>

                            </div>

                        ))}

                    </div>

                    <div className="order-total">

                        <span>
                            Total Product Price
                        </span>

                        <strong>
                            ₹{productTotal}
                        </strong>

                    </div>

                    <button
                        className="continue-btn"
                        onClick={continueToAddress}
                    >
                        Continue to Address
                    </button>

                </div>

            )}

            {/* ============================
          STEP 2
          ADDRESS + DELIVERY
      ============================ */}

            {step === 2 && (

                <div className="checkout-card">

                    <div className="card-heading">

                        <div className="heading-icon">
                            <FaMapMarkerAlt />
                        </div>

                        <div>
                            <h2>
                                Delivery Address
                            </h2>

                            <p>
                                Enter where you want your
                                MediKart order delivered.
                            </p>
                        </div>

                    </div>

                    <div className="address-form">

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    name="name"
                                    value={address.name}
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="Enter full name"
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Mobile Number
                                </label>

                                <input
                                    type="tel"
                                    name="phone"
                                    value={address.phone}
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="10 digit mobile number"
                                    maxLength="10"
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label>
                                Complete Address
                            </label>

                            <textarea
                                name="address"
                                value={address.address}
                                onChange={
                                    handleAddressChange
                                }
                                placeholder="House No, Street, Area"
                                rows="3"
                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label>
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={address.city}
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="City"
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    State
                                </label>

                                <input
                                    type="text"
                                    name="state"
                                    value={address.state}
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="State"
                                />

                            </div>

                            <div className="form-group">

                                <label>
                                    Pincode
                                </label>

                                <input
                                    type="text"
                                    name="pincode"
                                    value={address.pincode}
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="Pincode"
                                    maxLength="6"
                                />

                            </div>

                        </div>

                    </div>

                    {/* ============================
              DELIVERY OPTIONS
          ============================ */}

                    <div className="delivery-section">

                        <h2>
                            Choose Delivery Option
                        </h2>

                        <p className="delivery-subtitle">
                            Faster delivery is available
                            on eligible orders.
                        </p>

                        {/* NORMAL */}

                        <label
                            className={`delivery-option ${deliveryType === "normal"
                                    ? "selected"
                                    : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="delivery"
                                value="normal"
                                checked={
                                    deliveryType === "normal"
                                }
                                onChange={() =>
                                    setDeliveryType(
                                        "normal"
                                    )
                                }
                            />

                            <div className="delivery-icon normal">
                                <FaTruck />
                            </div>

                            <div className="delivery-content">

                                <strong>
                                    Normal Delivery
                                </strong>

                                <span>
                                    Delivery by{" "}
                                    <b>
                                        {(() => {
                                            const d =
                                                new Date();

                                            d.setDate(
                                                d.getDate() + 5
                                            );

                                            return d.toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                }
                                            );
                                        })()}
                                    </b>
                                </span>

                            </div>

                            <div className="delivery-price">

                                {normalDeliveryCharge === 0
                                    ? "FREE"
                                    : `₹${normalDeliveryCharge}`}

                            </div>

                        </label>

                        {/* EXPRESS */}

                        <label
                            className={`delivery-option ${!expressAvailable
                                    ? "disabled"
                                    : deliveryType ===
                                        "express"
                                        ? "selected"
                                        : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="delivery"
                                value="express"
                                disabled={!expressAvailable}
                                checked={
                                    deliveryType ===
                                    "express"
                                }
                                onChange={() =>
                                    setDeliveryType(
                                        "express"
                                    )
                                }
                            />

                            <div className="delivery-icon express">
                                <FaBolt />
                            </div>

                            <div className="delivery-content">

                                <strong>
                                    Express Delivery
                                </strong>

                                <span>
                                    Delivery in{" "}
                                    <b>1–2 days</b>
                                </span>

                                {!expressAvailable && (
                                    <small>
                                        Available for orders
                                        above ₹299
                                    </small>
                                )}

                            </div>

                            <div className="delivery-price">
                                ₹49
                            </div>

                        </label>

                        {/* TODAY */}

                        <label
                            className={`delivery-option ${!todayAvailable
                                    ? "disabled"
                                    : deliveryType ===
                                        "today"
                                        ? "selected"
                                        : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="delivery"
                                value="today"
                                disabled={!todayAvailable}
                                checked={
                                    deliveryType === "today"
                                }
                                onChange={() =>
                                    setDeliveryType(
                                        "today"
                                    )
                                }
                            />

                            <div className="delivery-icon today">
                                <FaClock />
                            </div>

                            <div className="delivery-content">

                                <strong>
                                    Today Delivery
                                </strong>

                                <span>
                                    Get it{" "}
                                    <b>Today</b>
                                </span>

                                {!todayAvailable && (
                                    <small>
                                        Available for orders
                                        above ₹999
                                    </small>
                                )}

                            </div>

                            <div className="delivery-price">
                                ₹99
                            </div>

                        </label>

                    </div>

                    {/* BUTTON */}

                    <div className="button-row">

                        <button
                            className="back-btn"
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>

                        <button
                            className="continue-btn"
                            onClick={
                                continueToPayment
                            }
                        >
                            Continue to Payment
                        </button>

                    </div>

                </div>

            )}

            {/* ============================
          STEP 3
          PAYMENT
      ============================ */}

            {step === 3 && (

                <div className="checkout-card">

                    <div className="card-heading">

                        <div className="heading-icon">
                            <FaCreditCard />
                        </div>

                        <div>
                            <h2>
                                Payment Method
                            </h2>

                            <p>
                                Select your preferred
                                payment method.
                            </p>
                        </div>

                    </div>

                    <div className="payment-options">

                        {/* CARD */}

                        <label
                            className={`payment-option ${paymentMethod === "CARD"
                                    ? "selected"
                                    : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="CARD"
                                checked={
                                    paymentMethod === "CARD"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            <FaCreditCard />

                            <div>
                                <strong>
                                    Credit / Debit Card
                                </strong>

                                <span>
                                    Visa, Mastercard,
                                    RuPay
                                </span>
                            </div>

                        </label>

                        {/* NET BANKING */}

                        <label
                            className={`payment-option ${paymentMethod ===
                                    "NETBANKING"
                                    ? "selected"
                                    : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="NETBANKING"
                                checked={
                                    paymentMethod ===
                                    "NETBANKING"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            <FaUniversity />

                            <div>
                                <strong>
                                    Net Banking
                                </strong>

                                <span>
                                    All major banks
                                </span>
                            </div>

                        </label>

                        {/* COD */}

                        <label
                            className={`payment-option ${paymentMethod === "COD"
                                    ? "selected"
                                    : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                checked={
                                    paymentMethod === "COD"
                                }
                                onChange={(e) =>
                                    setPaymentMethod(
                                        e.target.value
                                    )
                                }
                            />

                            <FaMoneyBillWave />

                            <div>
                                <strong>
                                    Cash on Delivery
                                </strong>

                                <span>
                                    Pay when the order
                                    arrives
                                </span>
                            </div>

                        </label>

                    </div>

                    {paymentMethod === "CARD" && (

                        <div className="payment-form">

                            <input
                                placeholder="Card Number"
                            />

                            <div className="form-row">

                                <input
                                    placeholder="MM/YY"
                                />

                                <input
                                    placeholder="CVV"
                                />

                            </div>

                            <input
                                placeholder="Card Holder Name"
                            />

                        </div>

                    )}

                    {paymentMethod ===
                        "NETBANKING" && (

                            <div className="payment-form">

                                <select>

                                    <option>
                                        Select Bank
                                    </option>

                                    <option>
                                        State Bank of India
                                    </option>

                                    <option>
                                        HDFC Bank
                                    </option>

                                    <option>
                                        ICICI Bank
                                    </option>

                                    <option>
                                        Axis Bank
                                    </option>

                                    <option>
                                        Punjab National Bank
                                    </option>

                                </select>

                            </div>

                        )}

                    <div className="payment-summary">

                        <div>
                            <span>
                                Products
                            </span>

                            <strong>
                                ₹{productTotal}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Delivery
                            </span>

                            <strong>
                                {deliveryCharge === 0
                                    ? "FREE"
                                    : `₹${deliveryCharge}`}
                            </strong>
                        </div>

                        <div className="final-total">

                            <span>
                                Payable Amount
                            </span>

                            <strong>
                                ₹{totalAmount}
                            </strong>

                        </div>

                    </div>

                    <div className="button-row">

                        <button
                            className="back-btn"
                            onClick={() => setStep(2)}
                        >
                            Back
                        </button>

                        <button
                            className="place-order-btn"
                            onClick={() => {

                                setStep(4);

                                setTimeout(() => {
                                    placeOrder();
                                }, 800);

                            }}
                        >
                            Place Order
                        </button>

                    </div>

                </div>

            )}

            {/* ============================
          STEP 4
          ORDER ID
      ============================ */}

            {step === 4 && (

                <div className="processing-card">

                    <div className="processing-loader">
                        <div></div>
                    </div>

                    <h2>
                        Placing Your Order...
                    </h2>

                    <p>
                        Please wait while we confirm
                        your order.
                    </p>

                </div>

            )}

            {/* ============================
          STEP 5
          SUCCESS
      ============================ */}

            {step === 5 && (

                <div className="success-card">

                    <div className="success-circle">

                        <FaCheck />

                    </div>

                    <h1>
                        Order Placed Successfully!
                    </h1>

                    <p>
                        Thank you for choosing
                        MediKart.
                    </p>

                    <div className="order-id-box">

                        <span>
                            Your Order ID
                        </span>

                        <strong>
                            {orderId}
                        </strong>

                    </div>

                    <div className="success-details">

                        <div>
                            <span>
                                Payment
                            </span>

                            <strong>
                                {paymentMethod === "COD"
                                    ? "Cash on Delivery"
                                    : paymentMethod ===
                                        "CARD"
                                        ? "Credit/Debit Card"
                                        : "Net Banking"}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Delivery
                            </span>

                            <strong>
                                {deliveryType === "today"
                                    ? "Today Delivery"
                                    : deliveryType ===
                                        "express"
                                        ? "Express Delivery"
                                        : "Normal Delivery"}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Estimated Delivery
                            </span>

                            <strong>
                                {getDeliveryDate()}
                            </strong>
                        </div>

                        <div>
                            <span>
                                Total Amount
                            </span>

                            <strong>
                                ₹{totalAmount}
                            </strong>
                        </div>

                    </div>

                    <div className="success-buttons">

                        <button
                            onClick={() =>
                                navigate(
                                    `/orders/${orderId}`
                                )
                            }
                        >
                            View Order
                        </button>

                        <button
                            className="secondary"
                            onClick={() =>
                                navigate("/shop")
                            }
                        >
                            Continue Shopping
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
};

export default Checkout;
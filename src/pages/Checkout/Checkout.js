import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { FaCheck, FaMapMarkerAlt, FaCreditCard, FaUniversity, FaMoneyBillWave, FaTruck, FaBolt, FaClock, FaPlus, FaMinus, } from "react-icons/fa";

import "./Checkout.css";

const Checkout = () => {
    const navigate = useNavigate();

    // =======================STATES==================================
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
    const [deliveryType, setDeliveryType] = useState("normal");
    const [orderId, setOrderId] = useState("");

    /* =========================================================
       LOAD CART
    ========================================================= */

    useEffect(() => {
        try {
            const storedCart = JSON.parse(
                localStorage.getItem("cart")
            );

            if (Array.isArray(storedCart)) {
                setCartItems(storedCart);
            } else {
                setCartItems([]);
            }
        } catch (error) {
            console.error("Failed to load cart:", error);
            setCartItems([]);
        }
    }, []);

    // ===================== LOAD SAVED ADDRESS====================================


    useEffect(() => {
        try {
            const savedAddress = JSON.parse(
                localStorage.getItem("deliveryAddress")
            );

            if (savedAddress) {
                setAddress({
                    name: savedAddress.name || "",
                    phone: savedAddress.phone || "",
                    address: savedAddress.address || "",
                    city: savedAddress.city || "",
                    state: savedAddress.state || "",
                    pincode: savedAddress.pincode || "",
                });
            }
        } catch (error) {
            console.error("Failed to load address:", error);
        }
    }, []);

    // =========================GET PRODUCT PRICE================================


    const getPrice = (item) => {
        return Number(
            item.discountedPrice ??
            item.price ??
            item.sellingPrice ??
            0
        );
    };

    // =========================PRODUCT TOTAL================================


    const productTotal = cartItems.reduce((total, item) => {
        const price = getPrice(item);
        const quantity = Number(item.quantity || 1);

        return total + price * quantity;
    }, 0);

    // =======================DISCOUNT==================================


    const discount = Math.round(productTotal * 0.1);

    // ========================SPECIAL CATEGORY=================================


    const isSpecialCategory = (category) => {
        if (!category) {
            return false;
        }

        const cat = String(category)
            .toLowerCase()
            .replace(/[-_]/g, " ");

        return (
            cat.includes("medical device") ||
            cat.includes("medicaldevices") ||
            cat.includes("device") ||
            cat.includes("premium healthcare") ||
            cat.includes("premiumhealthcare") ||
            cat.includes("premium")
        );
    };

    /* =========================================================
       CHECK SPECIAL ITEMS
    ========================================================= */

    const hasSpecialItem = cartItems.some((item) =>
        isSpecialCategory(item.category)
    );

    /* =========================================================
       DELIVERY CHARGES
    ========================================================= */

    const baseDelivery = productTotal >= 499 ? 0 : 10;

    const specialSurcharge = hasSpecialItem ? 50 : 0;

    const normalDeliveryCharge =
        baseDelivery + specialSurcharge;

    /* =========================================================
       DELIVERY ELIGIBILITY
    ========================================================= */

    const expressAvailable = productTotal >= 299;

    const todayAvailable = productTotal >= 999;

    /* =========================================================
       CURRENT DELIVERY CHARGE
    ========================================================= */

    let deliveryCharge = 0;

    if (deliveryType === "normal") {
        deliveryCharge = normalDeliveryCharge;
    }

    if (deliveryType === "express") {
        deliveryCharge = 49 + specialSurcharge;
    }

    if (deliveryType === "today") {
        deliveryCharge = 99 + specialSurcharge;
    }

    /* =========================================================
       PLATFORM FEE
    ========================================================= */

    const platformFee = 0;

    /* =========================================================
       TOTAL AMOUNT
    ========================================================= */

    const totalAmount =
        productTotal -
        discount +
        deliveryCharge +
        platformFee;

    /* =========================================================
       REMOVE ITEM
    ========================================================= */

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(
            (item) => item.id !== id
        );

        setCartItems(updatedCart);

        localStorage.setItem(
            "cart",
            JSON.stringify(updatedCart)
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    /* =========================================================
       UPDATE QUANTITY
    ========================================================= */

    const updateQuantity = (id, change) => {
        const updatedCart = cartItems
            .map((item) => {
                if (item.id === id) {
                    const currentQuantity = Number(
                        item.quantity || 1
                    );

                    const newQuantity =
                        currentQuantity + change;

                    if (newQuantity < 1) {
                        return item;
                    }

                    return {
                        ...item,
                        quantity: newQuantity,
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

        window.dispatchEvent(
            new Event("cartUpdated")
        );
    };

    /* =========================================================
       GET DELIVERY DATE
    ========================================================= */

    const getDeliveryDate = () => {
        const today = new Date();

        if (deliveryType === "today") {
            return "Today (Within 4-6 Hours)";
        }

        if (deliveryType === "express") {
            const tomorrow = new Date(today);

            tomorrow.setDate(
                tomorrow.getDate() + 1
            );

            return (
                "Tomorrow, " +
                tomorrow.toLocaleDateString(
                    "en-IN",
                    {
                        day: "numeric",
                        month: "short",
                    }
                )
            );
        }

        const expectedDate = new Date(today);

        expectedDate.setDate(
            expectedDate.getDate() + 3
        );

        return (
            "By " +
            expectedDate.toLocaleDateString(
                "en-IN",
                {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                }
            )
        );
    };

    /* =========================================================
       NORMAL DELIVERY DISPLAY DATE
    ========================================================= */

    const getNormalDeliveryDate = () => {
        const date = new Date();

        date.setDate(date.getDate() + 5);

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "numeric",
                month: "short",
            }
        );
    };

    /* =========================================================
       ADDRESS CHANGE
    ========================================================= */

    const handleAddressChange = (e) => {
        const { name, value } = e.target;

        setAddress((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    /* =========================================================
       ADDRESS VALIDATION
    ========================================================= */

    const validateAddress = () => {
        if (!address.name.trim()) {
            alert("Please enter your name.");
            return false;
        }

        if (
            !address.phone.trim() ||
            address.phone.length !== 10
        ) {
            alert(
                "Please enter a valid 10-digit phone number."
            );
            return false;
        }

        if (!address.address.trim()) {
            alert(
                "Please enter your full delivery address."
            );
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

        if (
            !address.pincode.trim() ||
            address.pincode.length !== 6
        ) {
            alert("Please enter a valid 6-digit pincode.");
            return false;
        }

        return true;
    };

    /* =========================================================
       STEP 1 → STEP 2
    ========================================================= */

    const continueToAddress = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        setStep(2);
    };

    /* =========================================================
       STEP 2 → STEP 3
    ========================================================= */

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

    /* =========================================================
       PLACE ORDER
    ========================================================= */

    const placeOrder = () => {
        if (!paymentMethod) {
            alert("Please select a payment method.");
            return;
        }

        if (cartItems.length === 0) {
            alert("Your cart is empty.");
            return;
        }

        /*
         * Generate unique MediKart Order ID.
         *
         * Example:
         * MK7822001722
         */

        const generatedOrderId =
            "MK" +
            Date.now()
                .toString()
                .slice(-10);

        setOrderId(generatedOrderId);

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

            discount,

            platformFee,

            totalAmount,

            estimatedDelivery:
                getDeliveryDate(),

            status: "Order Confirmed",
        };

        let existingOrders = [];

        try {
            existingOrders =
                JSON.parse(
                    localStorage.getItem("orders")
                ) || [];
        } catch (error) {
            console.error(
                "Failed to load previous orders:",
                error
            );

            existingOrders = [];
        }

        existingOrders.unshift(newOrder);

        localStorage.setItem(
            "orders",
            JSON.stringify(existingOrders)
        );

        /*
         * Clear cart after successful order
         */

        localStorage.removeItem("cart");

        setCartItems([]);

        window.dispatchEvent(
            new Event("ordersUpdated")
        );

        window.dispatchEvent(
            new Event("cartUpdated")
        );

        setStep(5);
    };

    /* =========================================================
       EMPTY CART
    ========================================================= */

    if (
        cartItems.length === 0 &&
        step !== 5
    ) {
        return (
            <div className="checkout-empty">
                <h2>Your Cart is Empty</h2>

                <p>
                    Add products before checkout.
                </p>

                <button
                    onClick={() =>
                        navigate("/shop")
                    }
                >
                    Continue Shopping
                </button>
            </div>
        );
    }

    /* =========================================================
       RENDER
    ========================================================= */

    return (
        <div className="checkout-page">

            {/* =================================================
                HEADER
            ================================================= */}

            <div className="checkout-header">

                <h1>
                    MediKart Checkout
                </h1>

                <span>
                    100% Secure Checkout
                </span>

            </div>

            {/* =================================================
                STEP INDICATOR
            ================================================= */}

            <div className="checkout-steps">

                <div
                    className={`checkout-step ${step >= 1
                        ? "active"
                        : ""
                        }`}
                >
                    <div className="step-circle">
                        {step > 1 ? (
                            <FaCheck />
                        ) : (
                            "1"
                        )}
                    </div>

                    <span>
                        Order
                    </span>
                </div>

                <div className="step-line" />

                <div
                    className={`checkout-step ${step >= 2
                        ? "active"
                        : ""
                        }`}
                >
                    <div className="step-circle">
                        {step > 2 ? (
                            <FaCheck />
                        ) : (
                            "2"
                        )}
                    </div>

                    <span>
                        Address
                    </span>
                </div>

                <div className="step-line" />

                <div
                    className={`checkout-step ${step >= 3
                        ? "active"
                        : ""
                        }`}
                >
                    <div className="step-circle">
                        {step > 3 ? (
                            <FaCheck />
                        ) : (
                            "3"
                        )}
                    </div>

                    <span>
                        Payment
                    </span>
                </div>

                <div className="step-line" />

                <div
                    className={`checkout-step ${step >= 4
                        ? "active"
                        : ""
                        }`}
                >
                    <div className="step-circle">
                        {step > 4 ? (
                            <FaCheck />
                        ) : (
                            "4"
                        )}
                    </div>

                    <span>
                        Order ID
                    </span>
                </div>

                <div className="step-line" />

                <div
                    className={`checkout-step ${step >= 5
                        ? "active"
                        : ""
                        }`}
                >
                    <div className="step-circle">
                        {step >= 5 ? (
                            <FaCheck />
                        ) : (
                            "5"
                        )}
                    </div>

                    <span>
                        Success
                    </span>
                </div>

            </div>

            {/* =================================================
                STEP 1 - ORDER
            ================================================= */}

            {step === 1 && (
                <div className="checkout-card">

                    <div
                        className="card-heading"
                        style={{
                            display: "flex",
                            justifyContent:
                                "space-between",
                            alignItems: "center",
                        }}
                    >

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "14px",
                            }}
                        >

                            <div className="heading-icon">
                                🛒
                            </div>

                            <div>

                                <h2>
                                    Your Order
                                </h2>

                                <p>
                                    Review medicines and
                                    healthcare items in
                                    your bag.
                                </p>

                            </div>

                        </div>

                        <span
                            data-testid="cart-item-count"
                            style={{
                                background:
                                    "#eef5ff",
                                color:
                                    "#2874f0",
                                fontWeight: "700",
                                fontSize: "13px",
                                padding:
                                    "5px 12px",
                                borderRadius:
                                    "16px",
                            }}
                        >
                            {cartItems.length}{" "}
                            {cartItems.length === 1
                                ? "Item"
                                : "Items"}
                        </span>

                    </div>

                    {/* PRODUCTS */}

                    <div
                        className="checkout-products"
                        style={{
                            display: "flex",
                            flexDirection:
                                "column",
                            gap: "14px",
                            marginTop: "16px",
                        }}
                    >

                        {cartItems.map((item) => {

                            const unitPrice =
                                Number(
                                    getPrice(item)
                                );

                            const quantity =
                                Number(
                                    item.quantity || 1
                                );

                            const itemTotal =
                                unitPrice *
                                quantity;

                            const isSpecial =
                                isSpecialCategory(
                                    item.category
                                );

                            const productName =
                                item.name ||
                                item.title ||
                                "Healthcare Product";

                            return (
                                <div
                                    className="checkout-product"
                                    key={item.id}
                                    data-testid={`checkout-product-${item.id}`}
                                    style={{
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        justifyContent:
                                            "space-between",
                                        padding:
                                            "16px",
                                        background:
                                            "#fafbfc",
                                        borderRadius:
                                            "10px",
                                        border:
                                            "1px solid #eef0f3",
                                        gap: "16px",
                                    }}
                                >

                                    {/* PRODUCT INFO */}

                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "14px",
                                            flex: 1,
                                        }}
                                    >

                                        {/* IMAGE */}

                                        <div
                                            className="product-image"
                                            style={{
                                                width:
                                                    "64px",
                                                height:
                                                    "64px",
                                                borderRadius:
                                                    "8px",
                                                background:
                                                    "#ffffff",
                                                border:
                                                    "1px solid #e1e4e8",
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                justifyContent:
                                                    "center",
                                                overflow:
                                                    "hidden",
                                                flexShrink:
                                                    0,
                                            }}
                                        >

                                            {item.image ? (
                                                <img
                                                    src={
                                                        item.image
                                                    }
                                                    alt={
                                                        productName
                                                    }
                                                    style={{
                                                        width:
                                                            "100%",
                                                        height:
                                                            "100%",
                                                        objectFit:
                                                            "contain",
                                                    }}
                                                />
                                            ) : (
                                                <span
                                                    style={{
                                                        fontSize:
                                                            "24px",
                                                    }}
                                                >
                                                    💊
                                                </span>
                                            )}

                                        </div>

                                        {/* INFO */}

                                        <div
                                            className="product-info"
                                            style={{
                                                flex: 1,
                                            }}
                                        >

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    gap: "8px",
                                                    flexWrap:
                                                        "wrap",
                                                }}
                                            >

                                                <h3
                                                    style={{
                                                        margin:
                                                            0,
                                                        fontSize:
                                                            "15px",
                                                        fontWeight:
                                                            "700",
                                                        color:
                                                            "#222",
                                                    }}
                                                >
                                                    {productName}
                                                </h3>

                                                {isSpecial && (
                                                    <span
                                                        style={{
                                                            fontSize:
                                                                "11px",
                                                            background:
                                                                "#fff3cd",
                                                            color:
                                                                "#856404",
                                                            fontWeight:
                                                                "700",
                                                            padding:
                                                                "2px 8px",
                                                            borderRadius:
                                                                "10px",
                                                        }}
                                                    >
                                                        Special Care
                                                    </span>
                                                )}

                                            </div>

                                            <p
                                                style={{
                                                    margin:
                                                        "4px 0 6px",
                                                    color:
                                                        "#666",
                                                    fontSize:
                                                        "13px",
                                                }}
                                            >
                                                {item.brand
                                                    ? `Brand: ${item.brand} | `
                                                    : ""}
                                                {item.category ||
                                                    "Healthcare"}
                                            </p>

                                            <div
                                                style={{
                                                    display:
                                                        "flex",
                                                    alignItems:
                                                        "center",
                                                    gap:
                                                        "10px",
                                                }}
                                            >

                                                <strong
                                                    data-testid={`unit-price-${item.id}`}
                                                    style={{
                                                        fontSize:
                                                            "15px",
                                                        color:
                                                            "#2874f0",
                                                    }}
                                                >
                                                    ₹
                                                    {unitPrice}
                                                </strong>

                                                <span
                                                    style={{
                                                        fontSize:
                                                            "12px",
                                                        color:
                                                            "#888",
                                                    }}
                                                >
                                                    each
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                    {/* RIGHT SIDE */}

                                    <div
                                        style={{
                                            display:
                                                "flex",
                                            alignItems:
                                                "center",
                                            gap: "16px",
                                        }}
                                    >

                                        {/* QUANTITY */}

                                        <div
                                            className="quantity-box"
                                            style={{
                                                display:
                                                    "flex",
                                                alignItems:
                                                    "center",
                                                background:
                                                    "#ffffff",
                                                border:
                                                    "1px solid #d1d5db",
                                                borderRadius:
                                                    "6px",
                                                overflow:
                                                    "hidden",
                                            }}
                                        >

                                            {/* MINUS */}

                                            <button
                                                type="button"
                                                aria-label={`Decrease quantity of ${productName}`}
                                                data-testid={`decrease-${item.id}`}
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        -1
                                                    )
                                                }
                                                style={{
                                                    padding:
                                                        "6px 10px",
                                                    border:
                                                        "none",
                                                    background:
                                                        "transparent",
                                                    cursor:
                                                        quantity <=
                                                            1
                                                            ? "not-allowed"
                                                            : "pointer",
                                                    color:
                                                        quantity <=
                                                            1
                                                            ? "#ccc"
                                                            : "#333",
                                                }}
                                                disabled={
                                                    quantity <=
                                                    1
                                                }
                                            >
                                                <FaMinus
                                                    size={11}
                                                />
                                            </button>

                                            {/* QUANTITY VALUE */}

                                            <span
                                                data-testid={`quantity-${item.id}`}
                                                style={{
                                                    padding:
                                                        "0 10px",
                                                    fontWeight:
                                                        "700",
                                                    fontSize:
                                                        "14px",
                                                }}
                                            >
                                                {quantity}
                                            </span>

                                            {/* PLUS */}

                                            <button
                                                type="button"
                                                aria-label={`Increase quantity of ${productName}`}
                                                data-testid={`increase-${item.id}`}
                                                onClick={() =>
                                                    updateQuantity(
                                                        item.id,
                                                        1
                                                    )
                                                }
                                                style={{
                                                    padding:
                                                        "6px 10px",
                                                    border:
                                                        "none",
                                                    background:
                                                        "transparent",
                                                    cursor:
                                                        "pointer",
                                                    color:
                                                        "#333",
                                                }}
                                            >
                                                <FaPlus
                                                    size={11}
                                                />
                                            </button>

                                        </div>

                                        {/* ITEM TOTAL */}

                                        <div
                                            style={{
                                                textAlign:
                                                    "right",
                                                minWidth:
                                                    "80px",
                                            }}
                                        >

                                            <span
                                                style={{
                                                    display:
                                                        "block",
                                                    fontSize:
                                                        "11px",
                                                    color:
                                                        "#888",
                                                }}
                                            >
                                                Total
                                            </span>

                                            <strong
                                                data-testid={`item-total-${item.id}`}
                                                style={{
                                                    fontSize:
                                                        "16px",
                                                    color:
                                                        "#111827",
                                                }}
                                            >
                                                ₹
                                                {itemTotal.toLocaleString()}
                                            </strong>

                                        </div>

                                        {/* DELETE */}

                                        <button
                                            type="button"
                                            aria-label={`Remove ${productName}`}
                                            data-testid={`remove-${item.id}`}
                                            onClick={() =>
                                                removeItem(
                                                    item.id
                                                )
                                            }
                                            title="Remove item"
                                            style={{
                                                background:
                                                    "#fee2e2",
                                                border:
                                                    "none",
                                                color:
                                                    "#dc2626",
                                                padding:
                                                    "7px 10px",
                                                borderRadius:
                                                    "6px",
                                                cursor:
                                                    "pointer",
                                                fontSize:
                                                    "12px",
                                                fontWeight:
                                                    "600",
                                            }}
                                        >
                                            ✕
                                        </button>

                                    </div>

                                </div>
                            );
                        })}

                    </div>

                    {/* =================================================
                        PRICE SUMMARY
                    ================================================= */}

                    <div
                        style={{
                            background:
                                "#f9fafb",
                            border:
                                "1px solid #e5e7eb",
                            borderRadius:
                                "10px",
                            padding:
                                "16px 20px",
                            marginTop:
                                "20px",
                        }}
                    >

                        {/* SUBTOTAL */}

                        <div
                            style={{
                                display:
                                    "flex",
                                justifyContent:
                                    "space-between",
                                marginBottom:
                                    "10px",
                                fontSize:
                                    "14px",
                                color:
                                    "#4b5563",
                            }}
                        >

                            <span>
                                Items Subtotal
                            </span>

                            <strong
                                data-testid="product-total"
                                style={{
                                    color:
                                        "#111827",
                                }}
                            >
                                ₹
                                {productTotal.toLocaleString()}
                            </strong>

                        </div>

                        {/* DISCOUNT */}

                        {discount > 0 && (
                            <div
                                style={{
                                    display:
                                        "flex",
                                    justifyContent:
                                        "space-between",
                                    marginBottom:
                                        "10px",
                                    fontSize:
                                        "14px",
                                    color:
                                        "#16a34a",
                                }}
                            >

                                <span>
                                    Flat 10% Discount
                                </span>

                                <strong>
                                    - ₹
                                    {discount.toLocaleString()}
                                </strong>

                            </div>
                        )}

                        {/* DELIVERY */}

                        <div
                            style={{
                                display:
                                    "flex",
                                justifyContent:
                                    "space-between",
                                marginBottom:
                                    "10px",
                                fontSize:
                                    "14px",
                                color:
                                    "#4b5563",
                            }}
                        >

                            <span>
                                Delivery Charges
                            </span>

                            <strong
                                style={{
                                    color:
                                        normalDeliveryCharge ===
                                            0
                                            ? "#16a34a"
                                            : "#111827",
                                }}
                            >
                                {normalDeliveryCharge ===
                                    0
                                    ? "FREE"
                                    : `₹${normalDeliveryCharge}`}
                            </strong>

                        </div>

                        {/* SPECIAL CHARGE */}

                        {hasSpecialItem && (
                            <div
                                style={{
                                    fontSize:
                                        "12px",
                                    color:
                                        "#856404",
                                    background:
                                        "#fff3cd",
                                    padding:
                                        "6px 10px",
                                    borderRadius:
                                        "6px",
                                    marginBottom:
                                        "10px",
                                }}
                            >
                                ℹ️ Includes ₹50 special
                                handling for Medical
                                Devices / Premium
                                Healthcare items.
                            </div>
                        )}

                        {/* FINAL */}

                        <div
                            style={{
                                display:
                                    "flex",
                                justifyContent:
                                    "space-between",
                                borderTop:
                                    "2px dashed #d1d5db",
                                paddingTop:
                                    "12px",
                                marginTop:
                                    "6px",
                            }}
                        >

                            <span
                                style={{
                                    fontSize:
                                        "16px",
                                    fontWeight:
                                        "700",
                                    color:
                                        "#111827",
                                }}
                            >
                                Estimated Total
                            </span>

                            <strong
                                data-testid="estimated-total"
                                style={{
                                    fontSize:
                                        "20px",
                                    color:
                                        "#2874f0",
                                }}
                            >
                                ₹
                                {(
                                    productTotal -
                                    discount +
                                    normalDeliveryCharge
                                ).toLocaleString()}
                            </strong>

                        </div>

                    </div>

                    {/* CONTINUE */}

                    <button
                        className="continue-btn"
                        data-testid="proceed-address"
                        onClick={
                            continueToAddress
                        }
                        style={{
                            width:
                                "100%",
                            marginTop:
                                "18px",
                            padding:
                                "14px",
                            background:
                                "#2874f0",
                            color:
                                "#ffffff",
                            border:
                                "none",
                            borderRadius:
                                "8px",
                            fontSize:
                                "16px",
                            fontWeight:
                                "700",
                            cursor:
                                "pointer",
                            transition:
                                "background 0.2s",
                        }}
                    >
                        Proceed to Delivery
                        Address →
                    </button>

                </div>
            )}

            {/* =================================================
                STEP 2 - ADDRESS
            ================================================= */}

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
                                Enter where you want
                                your MediKart order
                                delivered.
                            </p>

                        </div>

                    </div>

                    {/* ADDRESS FORM */}

                    <div className="address-form">

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="checkout-name">
                                    Full Name
                                </label>

                                <input
                                    id="checkout-name"
                                    type="text"
                                    name="name"
                                    value={
                                        address.name
                                    }
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="Enter full name"
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="checkout-phone">
                                    Mobile Number
                                </label>

                                <input
                                    id="checkout-phone"
                                    type="tel"
                                    name="phone"
                                    value={
                                        address.phone
                                    }
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="10 digit mobile number"
                                    maxLength="10"
                                />

                            </div>

                        </div>

                        <div className="form-group">

                            <label htmlFor="checkout-address">
                                Complete Address
                            </label>

                            <textarea
                                id="checkout-address"
                                name="address"
                                value={
                                    address.address
                                }
                                onChange={
                                    handleAddressChange
                                }
                                placeholder="House No, Street, Area"
                                rows="3"
                            />

                        </div>

                        <div className="form-row">

                            <div className="form-group">

                                <label htmlFor="checkout-city">
                                    City
                                </label>

                                <input
                                    id="checkout-city"
                                    type="text"
                                    name="city"
                                    value={
                                        address.city
                                    }
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="City"
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="checkout-state">
                                    State
                                </label>

                                <input
                                    id="checkout-state"
                                    type="text"
                                    name="state"
                                    value={
                                        address.state
                                    }
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="State"
                                />

                            </div>

                            <div className="form-group">

                                <label htmlFor="checkout-pincode">
                                    Pincode
                                </label>

                                <input
                                    id="checkout-pincode"
                                    type="text"
                                    name="pincode"
                                    value={
                                        address.pincode
                                    }
                                    onChange={
                                        handleAddressChange
                                    }
                                    placeholder="Pincode"
                                    maxLength="6"
                                />

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        DELIVERY OPTIONS
                    ================================================= */}

                    <div className="delivery-section">

                        <h2>
                            Choose Delivery Option
                        </h2>

                        <p className="delivery-subtitle">
                            Faster delivery is
                            available on eligible
                            orders.
                        </p>

                        {/* NORMAL */}

                        <label
                            className={`delivery-option ${deliveryType ===
                                "normal"
                                ? "selected"
                                : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="delivery"
                                value="normal"
                                checked={
                                    deliveryType ===
                                    "normal"
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
                                        {getNormalDeliveryDate()}
                                    </b>
                                </span>

                            </div>

                            <div className="delivery-price">
                                {normalDeliveryCharge ===
                                    0
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
                                disabled={
                                    !expressAvailable
                                }
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
                                    <b>
                                        1–2 days
                                    </b>
                                </span>

                                {!expressAvailable && (
                                    <small>
                                        Available for
                                        orders above
                                        ₹299
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
                                disabled={
                                    !todayAvailable
                                }
                                checked={
                                    deliveryType ===
                                    "today"
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
                                    <b>
                                        Today
                                    </b>
                                </span>

                                {!todayAvailable && (
                                    <small>
                                        Available for
                                        orders above
                                        ₹999
                                    </small>
                                )}

                            </div>

                            <div className="delivery-price">
                                ₹99
                            </div>

                        </label>

                    </div>

                    {/* BUTTONS */}

                    <div className="button-row">

                        <button
                            className="back-btn"
                            onClick={() =>
                                setStep(1)
                            }
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

            {/* =================================================
                STEP 3 - PAYMENT
            ================================================= */}

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

                    {/* PAYMENT OPTIONS */}

                    <div className="payment-options">

                        {/* CARD */}

                        <label
                            className={`payment-option ${paymentMethod ===
                                "CARD"
                                ? "selected"
                                : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="CARD"
                                aria-label="Credit / Debit Card"
                                checked={
                                    paymentMethod ===
                                    "CARD"
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
                                aria-label="Net Banking"
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
                            className={`payment-option ${paymentMethod ===
                                "COD"
                                ? "selected"
                                : ""
                                }`}
                        >

                            <input
                                type="radio"
                                name="payment"
                                value="COD"
                                aria-label="Cash on Delivery"
                                checked={
                                    paymentMethod ===
                                    "COD"
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
                                    Pay when the
                                    order arrives
                                </span>

                            </div>

                        </label>

                    </div>

                    {/* CARD FORM */}

                    {paymentMethod ===
                        "CARD" && (
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

                    {/* NET BANKING */}

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

                    {/* =================================================
                        PAYMENT SUMMARY
                    ================================================= */}

                    <div className="payment-summary">

                        <div>

                            <span>
                                Products
                            </span>

                            <strong>
                                ₹
                                {productTotal.toLocaleString()}
                            </strong>

                        </div>

                        {discount > 0 && (
                            <div>

                                <span>
                                    Discount (10%)
                                </span>

                                <strong
                                    style={{
                                        color:
                                            "#388e3c",
                                    }}
                                >
                                    - ₹
                                    {discount.toLocaleString()}
                                </strong>

                            </div>
                        )}

                        <div>

                            <span>
                                Delivery
                            </span>

                            <strong>
                                {deliveryCharge ===
                                    0
                                    ? "FREE"
                                    : `₹${deliveryCharge}`}
                            </strong>

                        </div>

                        <div className="final-total">

                            <span>
                                Payable Amount
                            </span>

                            <strong
                                data-testid="payable-amount"
                            >
                                ₹
                                {totalAmount.toLocaleString()}
                            </strong>

                        </div>

                    </div>

                    {/* BUTTONS */}

                    <div className="button-row">

                        <button
                            className="back-btn"
                            onClick={() =>
                                setStep(2)
                            }
                        >
                            Back
                        </button>

                        <button
                            className="place-order-btn"
                            data-testid="place-order"
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

            {/* =================================================
                STEP 4 - PROCESSING
            ================================================= */}

            {step === 4 && (
                <div className="processing-card">

                    <div className="processing-loader">
                        <div></div>
                    </div>

                    <h2>
                        Placing Your Order...
                    </h2>

                    <p>
                        Please wait while we
                        confirm your order.
                    </p>

                </div>
            )}

            {/* =================================================
                STEP 5 - SUCCESS
            ================================================= */}

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

                    {/* ORDER ID */}

                    <div className="order-id-box">

                        <span>
                            Your Order ID
                        </span>

                        <strong
                            data-testid="order-id"
                        >
                            {orderId}
                        </strong>

                    </div>

                    {/* SUCCESS DETAILS */}

                    <div className="success-details">

                        <div>

                            <span>
                                Payment
                            </span>

                            <strong>
                                {paymentMethod ===
                                    "COD"
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
                                {deliveryType ===
                                    "today"
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
                                ₹
                                {totalAmount.toLocaleString()}
                            </strong>

                        </div>

                    </div>

                    {/* SUCCESS BUTTONS */}

                    <div className="success-buttons">

                        <button
                            data-testid="view-order"
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
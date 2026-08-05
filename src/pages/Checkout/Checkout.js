import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [cartItems, setCartItems] = useState([]);

    const [address, setAddress] = useState({
        fullName: "",
        phone: "",
        house: "",
        street: "",
        landmark: "",
        city: "",
        state: "",
        pincode: "",
    });

    const [shipping, setShipping] = useState("Standard");

    const [paymentMethod, setPaymentMethod] = useState("COD");

    useEffect(() => {
        const loggedUser = JSON.parse(localStorage.getItem("user"));

        if (loggedUser) {
            setUser(loggedUser);

            setAddress((prev) => ({
                ...prev,
                fullName: loggedUser.name || "",
                phone: loggedUser.phone || "",
            }));
        }

        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        setCartItems(cart);
    }, []);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
    const shippingCharge = shipping === "Standard" ? 0 : shipping === "Express" ? 99 : 199;
    const gst = Math.round(subtotal * 0.05);
    const discount = subtotal > 1000 ? 100 : 0;
    const total = subtotal + shippingCharge + gst - discount;
    const orderId = "MK" + new Date().getFullYear() + Math.floor(100000 + Math.random() * 900000);

    const handleAddress = (e) => { setAddress({ ...address, [e.target.name]: e.target.value, }); };
    const handlePlaceOrder = () => {
        if (!address.fullName || !address.phone || !address.house || !address.street || !address.city || !address.state || !address.pincode) { alert("Please fill in your delivery address."); return; }

        const order = {
            orderId, customer: user, address, paymentMethod, shipping, items: cartItems, subtotal, shippingCharge, gst, discount, total, paymentStatus:
                paymentMethod === "COD" ? "Pending" : "Paid",
            orderDate: new Date().toLocaleString(),
        };

        localStorage.setItem("lastOrder", JSON.stringify(order));
        localStorage.removeItem("cart");
        window.dispatchEvent(new Event("cartUpdated"));
        alert(`🎉 Order Placed Successfully!\n\nOrder ID: ${orderId}`);
        navigate("/");
    };

    return (
        <div className="checkout-page">

            <div className="checkout-container">

                {/* LEFT SECTION */}

                <div className="checkout-left">

                    {/* LOGIN */}

                    <div className="user-info">
                        <h3>{user?.name || "Guest User"}</h3>
                        <p>{user?.email || "guest@medikart.com"}</p>
                        <p>{user?.phone || "Not Available"}</p>

                        <button
                            className="change-btn"
                            onClick={() => navigate("/profile")}
                        >
                            CHANGE
                        </button>
                    </div>

                    {/* DELIVERY ADDRESS */}

                    <div className="checkout-card">
                        <div className="step-title"> ✓ DELIVERY ADDRESS </div>

                        <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleAddress} />
                        <input type="text" name="phone" placeholder="Mobile Number" value={address.phone} onChange={handleAddress} />
                        <input type="text" name="house" placeholder="House / Flat No." value={address.house} onChange={handleAddress} />
                        <input type="text" name="street" placeholder="Street / Area" value={address.street} onChange={handleAddress} />
                        <input type="text" name="landmark" placeholder="Landmark" value={address.landmark} onChange={handleAddress} />
                        <input type="text" name="city" placeholder="City" value={address.city} onChange={handleAddress} />
                        <input type="text" name="state" placeholder="State" value={address.state} onChange={handleAddress} />
                        <input type="text" name="pincode" placeholder="Pincode" value={address.pincode} onChange={handleAddress} />

                    </div>

                    {/* SHIPPING */}

                    <div className="checkout-card">

                        <div className="step-title"> ✓ SHIPPING METHOD </div>

                        <label>
                            <input type="radio" checked={shipping === "Standard"} onChange={() => setShipping("Standard")} />
                            Standard Delivery (FREE)
                        </label>

                        <label>
                            <input type="radio" checked={shipping === "Express"} onChange={() => setShipping("Express")} /> Express Delivery ₹99
                        </label>

                        <label>
                            <input type="radio" checked={shipping === "Same Day"} onChange={() => setShipping("Same Day")} />Same Day Delivery ₹199
                        </label>

                    </div>

                    {/* PAYMENT */}

                    <div className="checkout-card">

                        <div className="step-title"> ✓ PAYMENT OPTIONS</div>

                        <label>
                            <input type="radio" checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} /> Cash on Delivery
                        </label>

                        <label>
                            <input type="radio" checked={paymentMethod === "UPI"} onChange={() => setPaymentMethod("UPI")} />UPI
                        </label>

                        <label>
                            <input type="radio" checked={paymentMethod === "CARD"} onChange={() => setPaymentMethod("CARD")} /> Credit / Debit Card
                        </label>

                        <label>
                            <input type="radio" checked={paymentMethod === "NETBANKING"} onChange={() => setPaymentMethod("NETBANKING")} />Net Banking
                        </label>
                    </div>
                </div>

                {/* RIGHT SECTION */}
                <div className="checkout-right">
                    <div className="price-card">
                        <h3>PRICE DETAILS</h3>
                        <hr />
                        {cartItems.length === 0 ? (
                            <p>Your cart is empty.</p>) : (
                            <>
                                {cartItems.map((item) => (
                                    <div className="product-row" key={item.id} >
                                        <div className="product-info">
                                            <img src={item.image} alt={item.name} className="product-image"
                                            />

                                            <div>
                                                <h4>{item.name}</h4>
                                                <p>Qty : {item.quantity || 1}</p>
                                            </div>
                                        </div>

                                        <strong>
                                            ₹{item.price * (item.quantity || 1)}
                                        </strong>
                                    </div>
                                ))}

                                <hr />
                                <div className="price-row">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal}</span>
                                </div>
                                <div className="price-row">
                                    <span>Shipping</span>
                                    <span>
                                        {shippingCharge === 0 ? "FREE" : `₹${shippingCharge}`}
                                    </span>
                                </div>
                                <div className="price-row">
                                    <span>GST (5%)</span>
                                    <span>₹{gst}</span>
                                </div>
                                <div className="price-row">
                                    <span>Discount</span>
                                    <span style={{ color: "green" }}> -₹{discount} </span>
                                </div>
                                <hr />
                                <div className="total-row">
                                    <strong>Total Amount</strong>
                                    <strong>₹{total}</strong>
                                </div>
                                <hr />

                                <div className="order-info">
                                    <p>
                                        <strong>Order ID:</strong> {" "} {orderId}
                                    </p>
                                    <p>
                                        <strong>Payment:</strong> {" "} {paymentMethod}
                                    </p>
                                    <p>
                                        <strong>Shipping:</strong> {" "} {shipping}
                                    </p>
                                    <p>
                                        <strong>Status:</strong>
                                        {" "}
                                        {paymentMethod === "COD" ? "Pending" : "Paid"}
                                    </p>
                                    <p>
                                        <strong>Estimated Delivery:</strong>
                                        {" "}
                                        {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                                    </p>
                                </div>
                                <button className="place-order-btn" onClick={handlePlaceOrder} >PLACE ORDER</button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
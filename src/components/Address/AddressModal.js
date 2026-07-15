import React, { useState } from "react";
import GoogleMapPicker from "./GoogleMapPicker";
import styles from "./AddressModal.module.css";

const AddressModal = ({ isOpen, onClose, onSave }) => {
  const [selectedAddress, setSelectedAddress] = useState(null);

  if (!isOpen) return null;

  const handleSave = () => {
    if (!selectedAddress) {
      alert("Please select an address.");
      return;
    }

    localStorage.setItem(
      "deliveryAddress",
      JSON.stringify(selectedAddress)
    );

    if (onSave) {
      onSave(selectedAddress);
    }

    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>

        <div className={styles.header}>
          <h2>Select Delivery Address</h2>

          <button
            className={styles.closeBtn}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <GoogleMapPicker
          onSelect={(address) =>
            setSelectedAddress(address)
          }
        />

        <div className={styles.footer}>
          <button
            className={styles.cancelBtn}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className={styles.saveBtn}
            onClick={handleSave}
          >
            Save Address
          </button>
        </div>

      </div>
    </div>
  );
};

export default AddressModal;
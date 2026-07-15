import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaEdit, FaPhoneAlt } from "react-icons/fa";

import AddressModal from "../Address/AddressModal";

import {
  getAddress,
  getDefaultAddress,
} from "../../utils/addressStorage";

import styles from "./AddressSection.module.css";

const AddressSection = () => {
  const [address, setAddress] = useState(
    getDefaultAddress()
  );

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const saved = getAddress();

    if (saved) {
      setAddress({
        ...getDefaultAddress(),
        ...saved,
      });
    }

    const updateAddress = () => {
      const latest = getAddress();

      if (latest) {
        setAddress({
          ...getDefaultAddress(),
          ...latest,
        });
      }
    };

    window.addEventListener(
      "addressUpdated",
      updateAddress
    );

    return () => {
      window.removeEventListener(
        "addressUpdated",
        updateAddress
      );
    };
  }, []);

  return (
    <>
      <div className={styles.card}>

        <div className={styles.left}>

          <div className={styles.icon}>
            <FaMapMarkerAlt />
          </div>

          <div>

            <p className={styles.label}>
              Deliver to
            </p>

            <h3 className={styles.name}>
              {address.name}
            </h3>

            <p className={styles.address}>
              {address.address}
            </p>

            {address.city && (
              <p className={styles.city}>
                {address.city},
                {address.state}
                {" - "}
                {address.pincode}
              </p>
            )}

            <p className={styles.mobile}>
              <FaPhoneAlt />
              {address.mobile}
            </p>

          </div>

        </div>

        <button
          className={styles.changeBtn}
          onClick={() => setShowModal(true)}
        >
          <FaEdit />
          Change Address
        </button>

      </div>

      <AddressModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={(data) => {
          setAddress({
            ...address,
            ...data,
          });
        }}
      />
    </>
  );
};

export default AddressSection;
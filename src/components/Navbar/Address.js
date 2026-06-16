import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import "./Address.css";

function Address() {
  const location = "Hyderabad 500001";

  const handleLocationClick = () => {
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        location
      )}`,
      "_blank"
    );
  };

  return (
    <div
      className="address-container"
      onClick={handleLocationClick}
    >
      <FaMapMarkerAlt className="location-icon" />

      <div className="address-info">
        <span className="deliver-text">
          Deliver to
        </span>

        <span className="location-text">
          Satender, {location}
        </span>
      </div>
    </div>
  );
}

export default Address;
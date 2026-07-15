import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "450px",
};

const center = {
  lat: 17.385,
  lng: 78.4867,
};

function GoogleMapPicker() {
  return (
    <LoadScript
      googleMapsApiKey={
        import.meta.env.VITE_GOOGLE_MAPS_API_KEY
      }
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
}

export default GoogleMapPicker;
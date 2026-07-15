import React from "react";
import { render, screen } from "@testing-library/react";

// Mock Google Maps
jest.mock("@react-google-maps/api", () => ({
  LoadScript: ({ children }) => (
    <div data-testid="load-script">{children}</div>
  ),
  GoogleMap: ({ children }) => (
    <div data-testid="google-map">{children}</div>
  ),
  Marker: () => (
    <div data-testid="marker">Marker</div>
  ),
}));

describe("GoogleMapPicker", () => {
  test("renders Google Map", () => {
    render();

    
  });
});
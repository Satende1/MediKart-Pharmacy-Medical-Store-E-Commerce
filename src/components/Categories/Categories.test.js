import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Categories from "./Categories";

jest.mock("../../assets/categories/medicines.jpg", () => "medicines.jpg");
jest.mock("../../assets/categories/healthcare.png", () => "healthcare.png");
jest.mock("../../assets/categories/vitamins.png", () => "vitamins.png");
jest.mock("../../assets/categories/personalcare.png", () => "personalcare.png");
jest.mock("../../assets/categories/babycare.png", () => "babycare.png");
jest.mock("../../assets/categories/medicaldevices.png", () => "medicaldevices.png");
jest.mock("../../assets/categories/eye-care.png", () => "eye-care.png");
jest.mock(
  "../../assets/categories/premium-healthcare.png",
  () => "premium-healthcare.png"
);
jest.mock("../../assets/categories/hair-care.png", () => "hair-care.png");
jest.mock("../../assets/categories/lab-tests.png", () => "lab-tests.png");

describe("Categories Component", () => {
  test("renders heading and description", () => {
    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    expect(screen.getByText("Shop by Category")).toBeInTheDocument();
    expect(
      screen.getByText("Choose a category to explore healthcare products.")
    ).toBeInTheDocument();
  });

  test("renders all category names", () => {
    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    expect(screen.getByText("Medicines")).toBeInTheDocument();
    expect(screen.getByText("Healthcare")).toBeInTheDocument();
    expect(screen.getByText("Vitamins & Supplements")).toBeInTheDocument();
    expect(screen.getByText("Personal Care")).toBeInTheDocument();
    expect(screen.getByText("Baby Care")).toBeInTheDocument();
    expect(screen.getByText("Medical Devices")).toBeInTheDocument();
    expect(screen.getByText("Eye Care")).toBeInTheDocument();
    expect(screen.getByText("Premium Healthcare")).toBeInTheDocument();
    expect(screen.getByText("Hair Care")).toBeInTheDocument();
    expect(screen.getByText("Lab Tests")).toBeInTheDocument();
  });

  test("renders 10 category images", () => {
    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(10);
  });

  test("renders 10 category links", () => {
    render(
      <MemoryRouter>
        <Categories />
      </MemoryRouter>
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(10);
  });
});
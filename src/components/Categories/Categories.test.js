import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Categories from "./Categories";

// Mock image imports
jest.mock("../../assets/categories/medicines.png", () => "medicines.png");
jest.mock("../../assets/categories/healthcare.png", () => "healthcare.png");
jest.mock("../../assets/categories/vitamins.png", () => "vitamins.png");
jest.mock("../../assets/categories/personalcare.png", () => "personalcare.png");
jest.mock("../../assets/categories/babycare.png", () => "babycare.png");
jest.mock("../../assets/categories/medicaldevices.png", () => "medicaldevices.png");

describe("Categories Component", () => {
  test("renders Shop by Category heading", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", { name: /shop by category/i })
    ).toBeInTheDocument();
  });

  test("renders all category names", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(screen.getByText("Medicines")).toBeInTheDocument();
    expect(screen.getByText("Healthcare")).toBeInTheDocument();
    expect(screen.getByText("Vitamins")).toBeInTheDocument();
    expect(screen.getByText("Personal Care")).toBeInTheDocument();
    expect(screen.getByText("Baby Care")).toBeInTheDocument();
    expect(screen.getByText("Medical Devices")).toBeInTheDocument();
  });

  test("renders all category images", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    expect(screen.getByAltText("Medicines")).toBeInTheDocument();
    expect(screen.getByAltText("Healthcare")).toBeInTheDocument();
    expect(screen.getByAltText("Vitamins")).toBeInTheDocument();
    expect(screen.getByAltText("Personal Care")).toBeInTheDocument();
    expect(screen.getByAltText("Baby Care")).toBeInTheDocument();
    expect(screen.getByAltText("Medical Devices")).toBeInTheDocument();
  });

  test("renders correct category links", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("Medicines").closest("a")).toHaveAttribute(
      "href",
      "/category/medicines"
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("Healthcare").closest("a")).toHaveAttribute(
      "href",
      "/category/healthcare"
    );

    // eslint-disable-next-line testing-library/no-node-access
    expect(screen.getByText("Vitamins").closest("a")).toHaveAttribute(
      "href",
      "/category/vitamins"
    );
  });

  test("renders exactly 6 category cards", () => {
    render(
      <BrowserRouter>
        <Categories />
      </BrowserRouter>
    );

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(6);
  });
});
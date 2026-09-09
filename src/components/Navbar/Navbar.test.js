import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

// Mock child components
jest.mock("./Logo", () => () => <div>Logo</div>);
jest.mock("./NavLinks", () => () => <div>NavLinks</div>);
jest.mock("./SearchBar", () => () => <div>SearchBar</div>);
jest.mock("./UserActions", () => () => <div>UserActions</div>);
jest.mock("./MobileMenu", () => () => <div>MobileMenu</div>);

describe("Navbar", () => {
  test("renders all navbar components", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByText("Logo")).toBeInTheDocument();
    expect(screen.getByText("NavLinks")).toBeInTheDocument();
    expect(screen.getByText("SearchBar")).toBeInTheDocument();
    expect(screen.getByText("UserActions")).toBeInTheDocument();
    expect(screen.getByText("MobileMenu")).toBeInTheDocument();
  });

  test("renders desktop navbar", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(".navbar-desktop")
    ).toBeInTheDocument();
  });

  test("renders mobile navbar", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(".navbar-mobile")
    ).toBeInTheDocument();
  });

  test("renders navbar element", () => {
    const { container } = render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(
      // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
      container.querySelector(".navbar")
    ).toBeInTheDocument();
  });
});
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavLinks from "./NavLinks";

import "@testing-library/jest-dom";

describe("NavLinks Component", () => {
    beforeEach(() => {
        window.scrollTo = jest.fn();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const renderComponent = () => {
        return render(
            <MemoryRouter>
                <NavLinks />
            </MemoryRouter>
        );
    };

    // ==========================================
    // 1. RENDER NAVIGATION LINKS
    // ==========================================

    test("renders all navigation links", () => {
        renderComponent();

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Shop")).toBeInTheDocument();
        expect(screen.getByText("Categories")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(screen.getByText("Contact")).toBeInTheDocument();
    });

    // ==========================================
    // 2. CHECK NUMBER OF LINKS
    // ==========================================

    test("renders exactly five navigation links", () => {
        renderComponent();

        const links = screen.getAllByRole("link");

        expect(links).toHaveLength(5);
    });

    // ==========================================
    // 3. HOME LINK
    // ==========================================

    test("Home link has correct path", () => {
        renderComponent();

        const homeLink = screen.getByRole("link", {
            name: "Home",
        });

        expect(homeLink).toHaveAttribute(
            "href",
            "/"
        );
    });

    // ==========================================
    // 4. SHOP LINK
    // ==========================================

    test("Shop link has correct path", () => {
        renderComponent();

        const shopLink = screen.getByRole("link", {
            name: "Shop",
        });

        expect(shopLink).toHaveAttribute(
            "href",
            "/shop"
        );
    });

    // ==========================================
    // 5. CATEGORIES LINK
    // ==========================================

    test("Categories link has correct path", () => {
        renderComponent();

        const categoriesLink = screen.getByRole(
            "link",
            {
                name: "Categories",
            }
        );

        expect(categoriesLink).toHaveAttribute(
            "href",
            "/categories"
        );
    });

    // ==========================================
    // 6. ABOUT LINK
    // ==========================================

    test("About link has correct path", () => {
        renderComponent();

        const aboutLink = screen.getByRole("link", {
            name: "About",
        });

        expect(aboutLink).toHaveAttribute(
            "href",
            "/about"
        );
    });

    // ==========================================
    // 7. CONTACT LINK
    // ==========================================

    test("Contact link has correct path", () => {
        renderComponent();

        const contactLink = screen.getByRole(
            "link",
            {
                name: "Contact",
            }
        );

        expect(contactLink).toHaveAttribute(
            "href",
            "/contact"
        );
    });

    // ==========================================
    // 8. HOME CLICK SCROLL
    // ==========================================

    test("scrolls to the top when Home is clicked", () => {
        renderComponent();

        const homeLink = screen.getByRole("link", {
            name: "Home",
        });

        fireEvent.click(homeLink);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    });

    // ==========================================
    // 9. SHOP CLICK SCROLL
    // ==========================================

    test("scrolls to the top when Shop is clicked", () => {
        renderComponent();

        const shopLink = screen.getByRole("link", {
            name: "Shop",
        });

        fireEvent.click(shopLink);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    });

    // ==========================================
    // 10. CATEGORIES CLICK SCROLL
    // ==========================================

    test("scrolls to the top when Categories is clicked", () => {
        renderComponent();

        const categoriesLink = screen.getByRole(
            "link",
            {
                name: "Categories",
            }
        );

        fireEvent.click(categoriesLink);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    });

    // ==========================================
    // 11. ABOUT CLICK SCROLL
    // ==========================================

    test("scrolls to the top when About is clicked", () => {
        renderComponent();

        const aboutLink = screen.getByRole("link", {
            name: "About",
        });

        fireEvent.click(aboutLink);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    });

    // ==========================================
    // 12. CONTACT CLICK SCROLL
    // ==========================================

    test("scrolls to the top when Contact is clicked", () => {
        renderComponent();

        const contactLink = screen.getByRole(
            "link",
            {
                name: "Contact",
            }
        );

        fireEvent.click(contactLink);

        expect(window.scrollTo).toHaveBeenCalledWith({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    });

    // ==========================================
    // 13. NAVIGATION LIST
    // ==========================================

    test("renders navigation links inside nav-links list", () => {
        renderComponent();

        const navList = document.querySelector(
            ".nav-links"
        );

        expect(navList).toBeInTheDocument();
        expect(navList.tagName).toBe("UL");
    });

    // ==========================================
    // 14. EACH LINK IS INSIDE LI
    // ==========================================

    test("each navigation link is inside a list item", () => {
        renderComponent();

        const links = screen.getAllByRole("link");

        links.forEach((link) => {
            expect(link.parentElement.tagName).toBe("LI");
        });
    });

    // ==========================================
    // 15. SCROLL FUNCTION CALLED ON EVERY LINK
    // ==========================================

    test("calls scrollTo when every navigation link is clicked", () => {
        renderComponent();

        const links = screen.getAllByRole("link");

        links.forEach((link) => {
            fireEvent.click(link);
        });

        expect(window.scrollTo).toHaveBeenCalledTimes(5);
    });
});
import React from "react";
import { render, screen, fireEvent, } from "@testing-library/react";
import { MemoryRouter, useNavigate, } from "react-router-dom";
import MobileMenu from "./MobileMenu";

// Mock react-icons
jest.mock("react-icons/fa", () => ({
    FaHome: () => <span data-testid="home-icon">HomeIcon</span>,
    FaShoppingCart: () => (
        <span data-testid="shopping-cart-icon"> CartIcon </span>
    ),
    FaThLarge: () => (
        <span data-testid="categories-icon"> CategoriesIcon </span>
    ),
    FaHeart: () => (
        <span data-testid="heart-icon">HeartIcon</span>
    ),
    FaInfoCircle: () => (
        <span data-testid="info-icon">InfoIcon</span>
    ),
    FaPhone: () => (
        <span data-testid="phone-icon">PhoneIcon</span>
    ),
    FaSignOutAlt: () => (
        <span data-testid="logout-icon">LogoutIcon</span>
    ),
    FaSignInAlt: () => (
        <span data-testid="login-icon">LoginIcon</span>
    ),
    FaBars: () => (
        <span data-testid="bars-icon">BarsIcon</span>
    ),
    FaTimes: () => (
        <span data-testid="times-icon">TimesIcon</span>
    ),
}));

// Mock useNavigate
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => {
    const actual = jest.requireActual("react-router-dom");

    return {
        ...actual,
        useNavigate: jest.fn(),
    };
});

describe("MobileMenu Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();

        useNavigate.mockReturnValue(mockNavigate);
    });

    // ==========================================
    // RENDER TEST
    // ==========================================

    test("renders mobile menu button", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            screen.getByTestId("bars-icon")
        ).toBeInTheDocument();
    });

    // ==========================================
    // SIDEBAR CONTENT TEST
    // ==========================================

    test("renders MEDIKART logo and title", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            screen.getByAltText("Medikart Logo")
        ).toBeInTheDocument();

        expect(
            screen.getByText("MEDIKART")
        ).toBeInTheDocument();
    });

    // ==========================================
    // MENU ITEMS TEST
    // ==========================================

    test("renders all navigation menu items", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(screen.getByText("Home")).toBeInTheDocument();
        expect(screen.getByText("Shop")).toBeInTheDocument();
        expect(
            screen.getByText("Categories")
        ).toBeInTheDocument();
        expect(
            screen.getByText("Wishlist")
        ).toBeInTheDocument();
        expect(screen.getByText("Cart")).toBeInTheDocument();
        expect(screen.getByText("About")).toBeInTheDocument();
        expect(
            screen.getByText("Contact")
        ).toBeInTheDocument();
    });

    // ==========================================
    // LOGIN TEST
    // ==========================================

    test("shows Login when no user exists", () => {
        localStorage.removeItem("user");

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("button", {
                name: /Login/i,
            })
        ).toBeInTheDocument();
    });

    // ==========================================
    // LOGOUT TEST
    // ==========================================

    test("shows Logout when a test user exists", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: "Test User",
            })
        );

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("button", {
                name: /Logout/i,
            })
        ).toBeInTheDocument();
    });

    // ==========================================
    // OPEN MENU TEST
    // ==========================================

    test("opens sidebar when menu button is clicked", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        const menuButton = screen.getByTestId(
            "bars-icon"
        ).closest("button");

        fireEvent.click(menuButton);

        const sidebar =
            document.querySelector(".mobile-sidebar");

        expect(sidebar).toHaveClass("open");

        expect(
            document.querySelector(".mobile-overlay")
        ).toBeInTheDocument();
    });

    // ==========================================
    // CLOSE BUTTON TEST
    // ==========================================

    test("closes sidebar when close button is clicked", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        const menuButton = screen.getByTestId(
            "bars-icon"
        ).closest("button");

        fireEvent.click(menuButton);

        const closeButton = screen
            .getByTestId("times-icon")
            .closest("button");

        fireEvent.click(closeButton);

        expect(
            document.querySelector(".mobile-sidebar")
        ).not.toHaveClass("open");
    });

    // ==========================================
    // OVERLAY CLOSE TEST
    // ==========================================

    test("closes sidebar when overlay is clicked", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        const menuButton = screen.getByTestId(
            "bars-icon"
        ).closest("button");

        fireEvent.click(menuButton);

        const overlay =
            document.querySelector(".mobile-overlay");

        expect(overlay).toBeInTheDocument();

        fireEvent.click(overlay);

        expect(
            document.querySelector(".mobile-sidebar")
        ).not.toHaveClass("open");
    });

    // ==========================================
    // NAVIGATION LINK TEST
    // ==========================================

    test("contains correct navigation paths", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            screen.getByRole("link", { name: /Home/i })
        ).toHaveAttribute("href", "/");

        expect(
            screen.getByRole("link", { name: /Shop/i })
        ).toHaveAttribute("href", "/shop");

        expect(
            screen.getByRole("link", {
                name: /Categories/i,
            })
        ).toHaveAttribute("href", "/categories");

        expect(
            screen.getByRole("link", { name: /Wishlist/i, })
        ).toHaveAttribute("href", "/wishlist");

        expect(
            screen.getByRole("link", { name: /About/i, })
        ).toHaveAttribute("href", "/about");

        expect(
            screen.getByRole("link", { name: /Contact/i, })
        ).toHaveAttribute("href", "/contact");
    });

    // ==========================================
    // LINK CLOSE MENU TEST
    // ==========================================

    test("closes sidebar when navigation link is clicked", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        const menuButton = screen.getByTestId(
            "bars-icon"
        ).closest("button");

        fireEvent.click(menuButton);

        expect(
            document.querySelector(".mobile-sidebar")
        ).toHaveClass("open");

        fireEvent.click(
            screen.getByRole("link", {
                name: /Shop/i,
            })
        );

        expect(
            document.querySelector(".mobile-sidebar")
        ).not.toHaveClass("open");
    });

    // ==========================================
    // LOGIN NAVIGATION TEST
    // ==========================================

    test("navigates to login when Login button is clicked", () => {
        localStorage.removeItem("user");

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        const loginButton = screen.getByRole(
            "button",
            {
                name: /Login/i,
            }
        );

        fireEvent.click(loginButton);

        expect(mockNavigate).toHaveBeenCalledWith(
            "/login"
        );
    });

    // ==========================================
    // LOGIN CLOSE MENU TEST
    // ==========================================

    test("closes menu before navigating to login", () => {
        localStorage.removeItem("user");

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        const menuButton = screen.getByTestId(
            "bars-icon"
        ).closest("button");

        fireEvent.click(menuButton);

        expect(
            document.querySelector(".mobile-sidebar")
        ).toHaveClass("open");

        const loginButton = screen.getByRole(
            "button",
            {
                name: /Login/i,
            }
        );

        fireEvent.click(loginButton);

        expect(mockNavigate).toHaveBeenCalledWith(
            "/login"
        );

        expect(
            document.querySelector(".mobile-sidebar")
        ).not.toHaveClass("open");
    });

    // ==========================================
    // LOGOUT TEST
    // ==========================================

    test("removes user from localStorage on logout", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: "Test User",
            })
        );

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            localStorage.getItem("user")
        ).not.toBeNull();

        const logoutButton = screen.getByRole(
            "button",
            {
                name: /Logout/i,
            }
        );

        fireEvent.click(logoutButton);

        expect(
            localStorage.getItem("user")
        ).toBeNull();
    });

    // ==========================================
    // LOGOUT NAVIGATION TEST
    // ==========================================

    test("navigates to login after logout", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: "Test User",
            })
        );

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        const logoutButton = screen.getByRole(
            "button",
            {
                name: /Logout/i,
            }
        );

        fireEvent.click(logoutButton);

        expect(mockNavigate).toHaveBeenCalledWith(
            "/login"
        );
    });

    // ==========================================
    // LOGOUT CLOSE MENU TEST
    // ==========================================

    test("closes menu after logout", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: "Test User",
            })
        );

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        const menuButton = screen.getByTestId(
            "bars-icon"
        ).closest("button");

        fireEvent.click(menuButton);

        expect(
            document.querySelector(".mobile-sidebar")
        ).toHaveClass("open");

        const logoutButton = screen.getByRole(
            "button",
            {
                name: /Logout/i,
            }
        );

        fireEvent.click(logoutButton);

        expect(
            document.querySelector(".mobile-sidebar")
        ).not.toHaveClass("open");
    });

    // ==========================================
    // ICON TEST
    // ==========================================

    test("renders navigation icons", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            screen.getByTestId("home-icon")
        ).toBeInTheDocument();

        expect(
            screen.getAllByTestId(
                "shopping-cart-icon"
            ).length
        ).toBeGreaterThanOrEqual(2);

        expect(
            screen.getByTestId("categories-icon")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("heart-icon")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("info-icon")
        ).toBeInTheDocument();

        expect(
            screen.getByTestId("phone-icon")
        ).toBeInTheDocument();
    });

    // ==========================================
    // LOGIN ICON TEST
    // ==========================================

    test("renders login icon when user is not logged in", () => {
        localStorage.removeItem("user");

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            screen.getByTestId("login-icon")
        ).toBeInTheDocument();
    });

    // ==========================================
    // LOGOUT ICON TEST
    // ==========================================

    test("renders logout icon when user is logged in", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: "Test User",
            })
        );

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            screen.getByTestId("logout-icon")
        ).toBeInTheDocument();
    });

    // ==========================================
    // USER JSON TEST
    // ==========================================

    test("handles valid user data in localStorage", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: "Test User",
                email: "test@example.com",
            })
        );

        expect(() => {
            render(
                <MemoryRouter>
                    <MobileMenu />
                </MemoryRouter>
            );
        }).not.toThrow();

        expect(
            screen.getByRole("button", {
                name: /Logout/i,
            })
        ).toBeInTheDocument();
    });

    // ==========================================
    // SIDEBAR CLOSED BY DEFAULT TEST
    // ==========================================

    test("sidebar is closed by default", () => {
        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        expect(
            document.querySelector(".mobile-sidebar")
        ).not.toHaveClass("open");

        expect(
            document.querySelector(".mobile-overlay")
        ).not.toBeInTheDocument();
    });

    // ==========================================
    // LOGOUT FUNCTION TEST
    // ==========================================

    test("logout removes only the user information", () => {
        localStorage.setItem(
            "user",
            JSON.stringify({
                name: "Test User",
            })
        );

        localStorage.setItem(
            "testData",
            "test-value"
        );

        render(
            <MemoryRouter>
                <MobileMenu />
            </MemoryRouter>
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /Logout/i,
            })
        );

        expect(
            localStorage.getItem("user")
        ).toBeNull();

        expect(
            localStorage.getItem("testData")
        ).toBe("test-value");
    });
});

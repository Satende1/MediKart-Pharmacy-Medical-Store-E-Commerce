import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductListing from "./ProductListing";

jest.mock("../../data/products", () => [
    {
        id: 1,
        name: "Dolo 650",
        category: "Tablets",
        price: 35,
        rating: 4.6,
        image: "dolo.jpg",
    },
    {
        id: 2,
        name: "Crocin Advance",
        category: "Medicine",
        price: 48,
        rating: 4.4,
        image: "crocin.jpg",
    },
    {
        id: 3,
        name: "Revital H",
        category: "Supplements",
        price: 325,
        rating: 4.8,
        image: "revital.jpg",
    },
    {
        id: 4,
        name: "Digital Glucometer",
        category: "Devices",
        price: 899,
        rating: 4.7,
        image: "glucometer.jpg",
    },
    {
        id: 5,
        name: "BP Monitor",
        category: "Devices",
        price: 1599,
        rating: 4.5,
        image: "bp.jpg",
    },
]);

describe("ProductListing Component", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test("shows loading state initially", () => {
        render(<ProductListing />);

        expect(screen.getByText(/Loading Products/i)).toBeInTheDocument();
    });

    test("renders products after loading", async () => {
        render(<ProductListing />);

        jest.advanceTimersByTime(1200);

        await waitFor(() => {
            <>
                expect(screen.getByText("Dolo 650")).toBeInTheDocument();
                expect(screen.getByText("Crocin Advance")).toBeInTheDocument();
            </>
        });
    });

    test("renders heading", async () => {
        render(<ProductListing />);

        jest.advanceTimersByTime(1200);

        await waitFor(() => {
            expect(screen.getByText("Our Products")).toBeInTheDocument();
        });
    });

    test("shows Load More button", async () => {
        render(<ProductListing />);

        jest.advanceTimersByTime(1200);

        await waitFor(() => {
            expect(
                screen.getByRole("button", { name: /Load More/i })
            ).toBeInTheDocument();
        });
    });

    test("loads more products when Load More is clicked", async () => {
        render(<ProductListing />);

        jest.advanceTimersByTime(1200);

        const button = await screen.findByRole("button", {
            name: /Load More/i,
        });

        fireEvent.click(button);

        expect(screen.getByText("BP Monitor")).toBeInTheDocument();
    });
});
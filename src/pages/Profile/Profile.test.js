import React from "react";
import {
    render,
    screen,
    fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";

import Profile from "./Profile";

describe("Profile Component", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();

        jest.spyOn(window, "alert").mockImplementation(() => { });
    });

    afterEach(() => {
        localStorage.clear();
        jest.restoreAllMocks();
    });

    // -----------------------------------------
    // INITIAL RENDER
    // -----------------------------------------

    test("renders profile page", () => {
        const { container } = render(<Profile />);

        expect(container.querySelector(".profile-page")).toBeInTheDocument();
    });

    test("renders profile card", () => {
        const { container } = render(<Profile />);

        expect(container.querySelector(".profile-card")).toBeInTheDocument();
    });

    test("renders profile top section", () => {
        const { container } = render(<Profile />);

        expect(container.querySelector(".profile-top")).toBeInTheDocument();
    });

    test("renders profile body", () => {
        const { container } = render(<Profile />);

        expect(container.querySelector(".profile-body")).toBeInTheDocument();
    });

    test("renders profile buttons section", () => {
        const { container } = render(<Profile />);

        expect(container.querySelector(".profile-buttons")).toBeInTheDocument();
    });

    // -----------------------------------------
    // PROFILE LABELS
    // -----------------------------------------

    test("renders customer label", () => {
        render(<Profile />);

        expect(screen.getByText("MEDIKART Customer")).toBeInTheDocument();
    });

    test("renders Edit Profile button initially", () => {
        render(<Profile />);

        expect(
            screen.getByRole("button", {name: /edit profile/i,})
        ).toBeInTheDocument();
    });

    test("does not render Save button initially", () => {
        render(<Profile />);

        expect(
            screen.queryByRole("button", {name: /^save$/i,})
        ).not.toBeInTheDocument();
    });

    // -----------------------------------------
    // PROFILE ROWS
    // -----------------------------------------

    test("renders four profile rows", () => {
        const { container } = render(<Profile />);

        expect(container.querySelectorAll(".profile-row")).toHaveLength(4);
    });

    test("renders profile information without input fields initially", () => {
        const { container } = render(<Profile />);

        expect(container.querySelectorAll("input")).toHaveLength(0);
    });

    // -----------------------------------------
    // EDIT MODE
    // -----------------------------------------

    test("opens edit mode when Edit Profile is clicked", () => {
        render(<Profile />);

        const editButton =
            screen.getByRole("button", {
                name: /edit profile/i,
            });

        fireEvent.click(editButton);

        expect(
            screen.getByRole("button", {
                name: /^save$/i,
            })
        ).toBeInTheDocument();
    });

    test("shows input fields in edit mode", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        expect(container.querySelectorAll("input")).toHaveLength(4);
    });

    test("hides Edit Profile button in edit mode", () => {
        render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        expect(
            screen.queryByRole("button", {
                name: /edit profile/i,
            })
        ).not.toBeInTheDocument();
    });

    test("shows Save button in edit mode", () => {
        render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        expect(
            screen.getByRole("button", {
                name: /^save$/i,
            })
        ).toBeInTheDocument();
    });

    // -----------------------------------------
    // INPUT TYPES
    // -----------------------------------------

    test("renders email input in edit mode", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        const emailInput =
            container.querySelector(
                'input[name="email"]'
            );

        expect(emailInput).toBeInTheDocument();
        expect(emailInput).toHaveAttribute(
            "type",
            "email"
        );
    });

    test("renders name input in edit mode", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        expect(
            container.querySelector(
                'input[name="name"]'
            )
        ).toBeInTheDocument();
    });

    test("renders phone input in edit mode", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        expect(
            container.querySelector(
                'input[name="phone"]'
            )
        ).toBeInTheDocument();
    });

    test("renders address input in edit mode", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        expect(
            container.querySelector(
                'input[name="address"]'
            )
        ).toBeInTheDocument();
    });

    // -----------------------------------------
    // INPUT CHANGE
    // -----------------------------------------

    test("allows name input to be changed", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        const input =
            container.querySelector(
                'input[name="name"]'
            );

        fireEvent.change(input, {
            target: {
                value: "Test Name",
            },
        });

        expect(input).toHaveValue("Test Name");
    });

    test("allows email input to be changed", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        const input =
            container.querySelector(
                'input[name="email"]'
            );

        fireEvent.change(input, {
            target: {
                value: "test@example.com",
            },
        });

        expect(input).toHaveValue(
            "test@example.com"
        );
    });

    test("allows phone input to be changed", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        const input =
            container.querySelector(
                'input[name="phone"]'
            );

        fireEvent.change(input, {
            target: {
                value: "0000000000",
            },
        });

        expect(input).toHaveValue(
            "0000000000"
        );
    });

    test("allows address input to be changed", () => {
        const { container } = render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        const input =
            container.querySelector(
                'input[name="address"]'
            );

        fireEvent.change(input, {
            target: {
                value: "Test Address",
            },
        });

        expect(input).toHaveValue(
            "Test Address"
        );
    });

    // -----------------------------------------
    // SAVE
    // -----------------------------------------

    test("save button is clickable", () => {
        render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        const saveButton =
            screen.getByRole("button", {
                name: /^save$/i,
            });

        expect(saveButton).toBeEnabled();
    });

    test("saves profile to localStorage", () => {
        render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /^save$/i,
            })
        );

        expect(
            localStorage.getItem("userProfile")
        ).not.toBeNull();
    });

    test("stores valid JSON in localStorage", () => {
        render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /^save$/i,
            })
        );

        const savedProfile =
            localStorage.getItem(
                "userProfile"
            );

        expect(() => {
            JSON.parse(savedProfile);
        }).not.toThrow();
    });

    test("closes edit mode after saving", () => {
        render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /^save$/i,
            })
        );

        expect(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        ).toBeInTheDocument();

        expect(
            screen.queryByRole("button", {
                name: /^save$/i,
            })
        ).not.toBeInTheDocument();
    });

    test("removes input fields after saving", () => {
        const { container } = render(
            <Profile />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        expect(
            container.querySelectorAll("input")
        ).toHaveLength(4);

        fireEvent.click(
            screen.getByRole("button", {
                name: /^save$/i,
            })
        );

        expect(
            container.querySelectorAll("input")
        ).toHaveLength(0);
    });

    // -----------------------------------------
    // ALERT
    // -----------------------------------------

    test("shows success alert after saving", () => {
        render(<Profile />);

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /^save$/i,
            })
        );

        expect(
            window.alert
        ).toHaveBeenCalledWith(
            "Profile Updated Successfully!"
        );
    });

    // -----------------------------------------
    // EDIT -> CHANGE -> SAVE
    // -----------------------------------------

    test("allows editing and saving profile data", () => {
        const { container } = render(
            <Profile />
        );

        fireEvent.click(
            screen.getByRole("button", {
                name: /edit profile/i,
            })
        );

        const nameInput =
            container.querySelector(
                'input[name="name"]'
            );

        fireEvent.change(nameInput, {
            target: {
                value: "Updated Test",
            },
        });

        fireEvent.click(screen.getByRole("button", { name: /^save$/i, }));

    });

    // -----------------------------------------
    // CSS STRUCTURE
    // -----------------------------------------

    test("renders profile avatar", () => {
        const { container } = render(<Profile />);

        expect(container.querySelector(".profile-avatar")).toBeInTheDocument();
    });

    test("renders profile row elements", () => {
        const { container } = render(<Profile />);

        const rows = container.querySelectorAll(".profile-row");

        rows.forEach((row) => { expect(row).toBeInTheDocument(); });
    });
});
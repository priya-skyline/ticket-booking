import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Form from "..";
import { convertCentsToDollars, getCurrentTime } from "../../../util/function";

describe("<Form />", () => {
  test("renders Form component", () => {
    render(<Form />);
    // Test if specific text elements are present
    expect(screen.getByText("The Mac & Cheeses")).toBeInTheDocument();
    expect(screen.getByText(getCurrentTime())).toBeInTheDocument();

    // Test if an image is present
    expect(screen.getByAltText("Profile Image")).toBeInTheDocument();
  });

  test("getCurrentTime function returns correct value", () => {
    const toLocaleDateStringMock = jest
      .spyOn(global.Date.prototype, "toLocaleDateString")
      .mockReturnValue("Tuesday, November 10");

    const result = getCurrentTime();

    // Assertions
    expect(result).toBe("Tuesday, November 10");

    // Restore the original function to avoid affecting other tests
    toLocaleDateStringMock.mockRestore();
  });

  test("convertCentsToDollars function converts cents to dollars correctly", () => {
    // Test when 100 cents are passed, it should return 2.5 dollars
    expect(convertCentsToDollars(100)).toBe(1);

    // Test when 250 cents are passed, it should return 2.5 dollars
    expect(convertCentsToDollars(250)).toBe(2.5);

    // Test for an edge case (0 cents)
    expect(convertCentsToDollars(0)).toBe(0);
  });

  test("matches snapshot", () => {
    const { asFragment } = render(<Form />);

    expect(asFragment()).toMatchSnapshot();
  });
});

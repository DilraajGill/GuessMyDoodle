import Store from "./Store";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("test store display", () => {
  test("display welcome message", () => {
    render(<Store />);
    expect(screen.getByText("Welcome To The Store!")).toBeInTheDocument();
  });
  test("display fill tool", () => {
    render(<Store />);
    expect(screen.getByText("Fill Tool")).toBeInTheDocument();
    expect(screen.getByText("Buy Fill Tool")).toBeInTheDocument();
  });
});

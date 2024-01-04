import Store from "./Store";
import React from "react";
import { render, screen } from "@testing-library/react";

describe("test store display", () => {
  test("display welcome message", () => {
    render(<Store />);
    expect(screen.getByText("Welcome To The Store!")).toBeInTheDocument();
  });
});
